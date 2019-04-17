#ifndef TEXTSEARCH_H
#define TEXTSEARCH_H
///////////////////////////////////////////////////////////////////////
// TextSearch.h - Declaration of ITextSearch and TextSearch          //
//                                                                   //
// Biao A, CSE775 - Distributed Objects, Spring 2019                 //
///////////////////////////////////////////////////////////////////////
/*
* Module Operations:
* ==================
* This module provides Interface: ITextSearch, classes: TextSearch and TextSearchFactory
*
* Public Interface:
* =================
* class TextSearch:
* sendHelperIF(IUnknown*) : receive a pointer point to a helper component
* SendPattern(pattern)    : receive a pattern from client
* getResult()             : get a list of file line numbers which match the received pattern
*
* class TextSearchFactory:
* CreateInstance(IUnknown*, string id, void** ptr)   : get a pointer for required interface
*
* Required Files:
* ===============
*
* Maintenance History:
* ====================
* ver 1.0 : 4 Apr 2019
* - first release
*/
#include <string>
#include <vector>
#include "../IUnknown/IUnknown.h"
#include <unordered_map>

// Text Searcher
class TextSearcher
{
public:
  TextSearcher(){};
  void setPath(std::string path)
  {
    path_ = path;
  }
  std::vector<int> searchFor(std::string regex);

private:
  std::string path_;
};

struct ITextSearch : public IUnknown
{
  virtual bool sendPattern(const std::string pattern) = 0;
  virtual bool sendHelperPtr(IUnknown *ptr) = 0;
  virtual std::unordered_map<std::string, std::vector<int>> getLineNumbers() = 0;
};


class TextSearch : public ITextSearch
{
public:
  //IUnknown
  virtual bool QueryInterface(const std::string &iid, void **ppv);
  virtual long AddRef();
  virtual long Release();

  //ITextSearch
  virtual bool sendPattern(const std::string pattern);
  virtual bool sendHelperPtr(IUnknown *ptr);
  virtual std::unordered_map<std::string, std::vector<int>> getLineNumbers();

  TextSearch() : m_cRef(1){};
  ~TextSearch(){};

private:
  long m_cRef;
  std::string pattern_;
  IUnknown *pHelperUnk_;
  TextSearcher ts_;
};



class TextSearchFactory : public IFactory
{
public:
  //IUnknown
  virtual bool QueryInterface(const std::string &iid, void **ppv);
  virtual long AddRef();
  virtual long Release();

  //IFactory
  virtual bool CreateInstance(IUnknown *pUnknownOuter, const std::string &iid, void **ppv);

  TextSearchFactory() : m_cRef(1){};
  ~TextSearchFactory(){};

private:
  long m_cRef;
};

#endif