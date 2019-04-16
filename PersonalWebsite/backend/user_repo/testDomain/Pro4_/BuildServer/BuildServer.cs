///////////////////////////////////////////////////////////////////////////
// MotherBuilder.cs - Build server for the federation                    //
//                                                                       //
// Biao A              ba1000@syr.edu                                    //    
// Application: CSE681 Project 4                                         //
// Environment: C# console                                               //
///////////////////////////////////////////////////////////////////////////
/* Ps: some codes come from 681 website
 * 
 * Package Operations:
 * -------------------
 *  This package includes the Mother Build Server which will assign work to child builder
 *  
 *  public interfaces:
 *  BuildServer               - constructor: set path and clean temp files
 *  initializeDispatcher      - add Actions to dictionary(message dispatcher)
 *  
 *  other functions:
 *  processPool               - create specific number of child processes
 *  createChildBuilder        - create a child process
 *  childBuilder_Exited       - a function will be invoked when one process dies
 *  AssignWork                - dequeue the ready queue and assign xml to child build server
 *  StartProcessPool          - receive the number of child processes from client and start process pool
 *  StopChildProcess          - stop all child processes
 *  RcvThreadProc             - receive thread for mother builder
 * 
 *  Required Files:
 * ---------------
 *  FileMgr.cs               - need some funcitons to deal with files
 *  CommServer.cs            - need Comm project to send and receive messages and files
 *  Environment.cs           - get information like path, port...
 *  TestUtilities.cs            - need some functions in it
 *  
 *  Maintenance History:
 *  --------------------
 *  ver 1.0 : 06 Dec 2017
 *  - first release
 */
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;


namespace Pro4
{
    class BuildServer
    {
        Dictionary<int, Process> processMap = new Dictionary<int, Process>();
        Dictionary<string, Action<CommMessage>> messageDispatcher = new Dictionary<string, Action<CommMessage>>();
        Comm comm { get; set; } = null;
        List<string> ports { get; set; } = new List<string>();
        
        //constructor: set path and clean temp files
        public BuildServer()
        {
            try
            {
                FileMgr mgr = new FileMgr();
                mgr.Cleaner(BuildServerEnvironment.childRoot);
                mgr.Cleaner(BuildServerEnvironment.root);
                comm = new Comm(BuildServerEnvironment.address);
                initializeDispatcher();
            }
            catch (Exception ex)
            {
                Console.WriteLine("\n  {0}", ex.Message);
            }
        }

        //initialize messageDispatcher - add Action to dictionary(message dispatcher)
        public void initializeDispatcher()
        {
            Action<CommMessage> assignWork = new Action<CommMessage>(AssignWork);
            messageDispatcher["BuildRequest"] = assignWork;

            Action<CommMessage> startProcessPool = new Action<CommMessage>(StartProcessPool);
            messageDispatcher["NumberOfChild"] = startProcessPool;


            Action<CommMessage> stopChildProcess = new Action<CommMessage>(StopChildProcess);
            messageDispatcher["Stop"] = stopChildProcess;
        }

        //create specific number of child processes
        private void processPool(int number)
        {
            string fileSpec = Path.GetFullPath(BuildServerEnvironment.childExePath);
            for (int i = 0;i<number;i++)
            {
                string port = BuildServerEnvironment.childport + i;
                ports.Add(port);
                createChildBuilder(port, fileSpec);
            }
        }

        //create a child process
        private void createChildBuilder(string port, string fileSpec)
        {
            try
            {
                Process childBuilder = new Process();
                childBuilder.StartInfo.FileName = fileSpec;
                childBuilder.StartInfo.Arguments = port;
                childBuilder.EnableRaisingEvents = true;
                childBuilder.Exited += new EventHandler(childBuilder_Exited);
                childBuilder.Start();
                processMap[childBuilder.Id] = childBuilder;
            }
            catch (Exception ex)
            {
                Console.WriteLine("\n {0}", ex.Message);
            }
        }
        
        //a function will be invoked when one process dies
        private void childBuilder_Exited(object sender, EventArgs e)
        {
            Process theDeadProcess = (Process)sender;
            Console.Write("\n ChildBuilder {0} exited", theDeadProcess.Id);
            processMap.Remove(theDeadProcess.Id);
            Console.Write("\n {0} child processes remain", processMap.Count);
        }

        //dequeue the ready queue and assign xml to child build server
        private void AssignWork(CommMessage msg)
        {
            CommMessage readyMsg = comm.getMessage(1);
            string notification = "Assign " + msg.Body+ " to "+ readyMsg.Source + " child process.";
            TestUtilities.notification(notification);
            string filePath = Path.GetFullPath(BuildServerEnvironment.root);
            string destination = Path.GetFullPath(BuildServerEnvironment.childRoot + "/" + readyMsg.Body);

            comm.postFile(msg.Body, filePath, destination, readyMsg.Source);
            Thread.Sleep(3000);//wait for the completion of file tranfer
            CommMessage buildRequest = new CommMessage();
            buildRequest.Body = msg.Body;
            buildRequest.Source = "Mother Build Server";
            buildRequest.Destinaiton = "Child Build Server: " + readyMsg.Source;
            buildRequest.Command = "BuildRequest";
            comm.postMessage(buildRequest, readyMsg.Source);
        }

        //receive the number of child processes from client and start process pool
        private void StartProcessPool(CommMessage msg)
        {
            Console.Write("\n");
            int numberOfChild = int.Parse(msg.Body);
            processPool(numberOfChild);
        }

        //stop all child processes
        private void StopChildProcess(CommMessage msg)
        {
            if (processMap.Count() == 0)
            {
                string notificaiton = "No child process!";
                TestUtilities.notification(notificaiton);
            }
            CommMessage stopMsg = new CommMessage();
            stopMsg.Body = "Stop!";
            stopMsg.Command = "Stop";
            stopMsg.Source = "Mother Build Server";
            foreach (string port in ports)
            {
                try
                {
                    comm.postMessage(stopMsg, port);
                }
                catch
                {
                    continue;
                }
            }
            ports.Clear();
            comm.cleanReadyQ();
        }

        //receive thread for mother builder
        public void RcvThreadProc()
        {
            Console.Write("\n  starting build server's receive thread");
            while (true)
            {
                CommMessage msg = comm.getMessage();
                Console.Write("\n  Get message from {0}!", msg.Source);
                messageDispatcher[msg.Command](msg);
            }
        }
    }

    class test
    {
        static void Main()
        {

            TestUtilities.title("This is Mother BuildServer");
            BuildServer builder = new BuildServer();
            Thread t = new Thread(() => builder.RcvThreadProc());
            t.Start();
            t.Join();
            Console.ReadKey();
        }
    }
}
