///////////////////////////////////////////////////////////////////////
// TextSearch.cpp - Text Search Component                           //
//                                                                   //
// Biao A, CSE775 - Distributed Objects, Spring 2019                 //
///////////////////////////////////////////////////////////////////////


#include "TextSearch.h"
#include <string>
#include <vector>
#include <fstream>
#include<regex>
#include "../FileMgr/FileMgr.h"
#include <unordered_map>

using namespace std;

///////////////////////////////////////////////////////////////
// Class TextSearcher implementation
//

vector<int> TextSearcher::searchFor(string reg) {
	fstream fin;
	fin.open(path_.c_str(), ios::in);

	vector<int> res;
	string tmp;
	int lineNum = 0;
	while (getline(fin, tmp))
	{
		if (regex_search(tmp, regex(reg)))
			res.push_back(lineNum);
		lineNum++;
	}

	return res;
}


///////////////////////////////////////////////////////////////
// Class TextSearch implementation
//
//----< Query interface implementation >----------------------------------
bool TextSearch::QueryInterface(const std::string &iid, void **ppv)
{
    if (iid == "IUnknown")
    {
        *ppv = static_cast<IUnknown *>(this);
    }
    else if (iid == "ITextSearch")
    {
        *ppv = static_cast<ITextSearch *>(this);
    }
    else
    {
        *ppv = NULL;
        return false; //no such pointer
    }
    reinterpret_cast<IUnknown*>(*ppv)->AddRef();
    return true;
}

//----< add reference count and release>----------------------------------
long TextSearch::AddRef(){
    m_cRef++;
    return m_cRef;
}

long TextSearch::Release(){
    m_cRef--;
    if(m_cRef == 0){
        delete this;
        return 0;
    }
    return m_cRef;
}


/*----< receive pattern string from client >--------------*/

bool TextSearch::sendPattern(const std::string pattern) {
	pattern_ = pattern;
	return true;
}

/*----< receive interface pointer to helper component >--------------*/

bool TextSearch::sendHelperPtr(IUnknown* pHelperIF)
{
  pHelperUnk_ = pHelperIF;
  return true;
}

/*----< return result to client> --------------------------------*/
std::unordered_map<std::string, std::vector<int>> TextSearch::getLineNumbers()
{

  IFileMgr* IFMPtr = static_cast<IFileMgr*>(pHelperUnk_); 
  vector<string>&& paths = IFMPtr->getResult();
  unordered_map<string, vector<int>> res;
  for(string path : paths){
      ts_.setPath(path);
      res[path] = ts_.searchFor(pattern_);
  }
  return res;
}

///////////////////////////////////////////////////////////////
// Class FileMgrFactory implementation
//
bool TextSearchFactory::QueryInterface(const std::string &iid, void **ppv)
{
    if ((iid == "IUnknown") || (iid == "IFactory"))
    {
        *ppv = static_cast<IFactory *>(this);
    }
    else
    {
        *ppv = NULL;
        return false;
    }
    reinterpret_cast<IUnknown*>(*ppv)->AddRef() ;
    return true;
}


long TextSearchFactory::AddRef(){
    m_cRef++;
    return m_cRef;
}

long TextSearchFactory::Release(){
    m_cRef--;
    if(m_cRef == 0){
        delete this;
        return 0;
    }
    return m_cRef;
}


bool TextSearchFactory::CreateInstance(IUnknown *pUnknownOuter, const std::string &iid, void **ppv)
{
    if (pUnknownOuter != NULL)
    {
        return false;
    }

    // Create component.
    TextSearch *ts = new TextSearch;
    if (ts == NULL)
    {
        return false; //out of memory
    }

    // Get the requested interface.
    bool hr = ts->QueryInterface(iid, ppv);

    // Release the IUnknown pointer.
    // (If QueryInterface failed, component will delete itself.)
    ts->Release();
    return hr;
}