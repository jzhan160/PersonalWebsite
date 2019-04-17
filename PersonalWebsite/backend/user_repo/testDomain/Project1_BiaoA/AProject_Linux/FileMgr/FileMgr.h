#ifndef FILEMGR_H
#define FILEMGR_H
///////////////////////////////////////////////////////////////////////
// FileMgr.h - Declaration of IFileMgr and FileMgr                   //
//                                                                   //
// Biao A, CSE775 - Distributed Objects, Spring 2019                 //
///////////////////////////////////////////////////////////////////////
/*
* Module Operations:
* ==================
* This module provides Interface: IFileMgr, classes: FileMgr and FileMgrFactory
*
* Public Interface:
* =================
* class IFileMgr:
* SendPath(filePath) : send file path and pattern to component, for Example: ../test/*.txt
* getResult()        : get a list of file paths which match the received path and pattern 
*
* class FileMgrFactory:
* CreateInstance(IUnknown*, string id, void** ptr)   : get a pointer for required interface
*
* Required Files:
* ===============
* FileSystem.h
*
* Maintenance History:
* ====================
* ver 1.0 : 4 Apr 2019
* - first release
*/
#include <string>
#include <vector>
#include "../IUnknown/IUnknown.h"
#include "FileSystem.h"

struct IFileMgr : public IUnknown
{
  virtual bool sendPath(const std::string path) = 0;
  virtual std::vector<std::string> getResult() = 0;
};

class FileMgr : public IFileMgr
{
public:
  //IUnknown
  virtual bool QueryInterface(const std::string &iid, void **ppv);
  virtual long AddRef();
  virtual long Release();

  //IFileMgr
  virtual bool sendPath(const std::string path);
  virtual std::vector<std::string> getResult();

  FileMgr() : m_cRef(1){};
  ~FileMgr(){};

private:
  long m_cRef; // Reference count
  std::string path_;
  std::string pattern_;
  FileSystem::FileSys fs;
};

class FileMgrFactory : public IFactory
{
public:
  //IUnknown
  virtual bool QueryInterface(const std::string &iid, void **ppv);
  virtual long AddRef();
  virtual long Release();

  //IFactory
  virtual bool CreateInstance(IUnknown *pUnknownOuter, const std::string &iid, void **ppv);


  FileMgrFactory() : m_cRef(1){}
  ~FileMgrFactory(){}
private:
  long m_cRef;
};

#endif