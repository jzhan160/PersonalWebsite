///////////////////////////////////////////////////////////////////////
// Client.cpp - Demo all the requirements                            //
//                                                                   //
// Biao A, CSE775 - Distributed Objects, Spring 2019                 //
///////////////////////////////////////////////////////////////////////

#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>
#include "../FileMgr/FileMgr.cpp"
#include "../TextSearch/TextSearch.cpp"
#include "../FileMgr/FileSystem.cpp"
using namespace std;

//----< Demo part of requirement 1: using VS >-----------
bool demo1()
{
    std::cout << "\n  CSE775 Project #1 Helper client";
    std::cout << "\n =================================";
    std::cout << "\n Demo part of requirement 1: write C++ program on Linux System";
    std::cout << "\n  Currently using Linux System on VM box";
    return true;
}

//----< Demo requirement 5: fileMgr Component >-----------
bool demo2()
{
    std::cout << "\n\n =================================";
    std::cout << "\n Demo requirement 5: fileMgr Component";

    // create a Helper instance
    FileMgrFactory fmF;
    IFileMgr *IFPtr = nullptr;
    bool create = fmF.CreateInstance(nullptr, "IFileMgr", (void **)&IFPtr);
    if (create)
    {
        std::cout << "\n  Searching for file in ./TestDirectory/ with pattern *.cpp\n";
        string path("./TestDirectory/*.cpp");
        IFPtr->sendPath(path);
    }
    else
        return false;
    vector<string> &&paths = IFPtr->getResult();
    for (string &path : paths)
    {
        cout << "  File Path: " + path << endl;
    }
    return true;
}

//----< Demo requirement 4: TextSearch Component >-----------
bool demo3()
{
    std::cout << "\n\n =================================";
    std::cout << "\n Demo requirement 4: TextSearch Component";

    FileMgrFactory fmF;
    IFileMgr *IFPtr = nullptr;
    bool createF = fmF.CreateInstance(nullptr, "IFileMgr", (void **)&IFPtr);
    if (!createF)
        return false;
    std::cout << "\n  Searching for file in ./TestDirectory/ with pattern *.txt";
    string path("./TestDirectory/*.txt");
    IFPtr->sendPath(path);

    TextSearchFactory tsF;
    ITextSearch *ITPtr = nullptr;
    //ITPtr->AddRef();
    bool createT = tsF.CreateInstance(nullptr, "ITextSearch", (void **)&ITPtr);
    if (!createT)
        return false;
    ITPtr->sendHelperPtr(IFPtr);
    std::cout << "\n  Searching for text pattern: love";
    string pattern("love");
    ITPtr->sendPattern(pattern);

    unordered_map<string, vector<int>>&& res = ITPtr->getLineNumbers();

    for(auto item : res){
        cout << "\n  File Path: " + item.first + "\n  Line Numbers: ";
        for(int n : item.second){
            cout<< to_string(n) + " ";
        }
    }

    return true;
}

int main()
{
    demo1();
    demo2();
    demo3();
    std::cout << "\n\n";
    return 1;
}
