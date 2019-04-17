///////////////////////////////////////////////////////////////////////
// FileMgr.cpp - FileMgrCom                                           //
//                                                                   //
// Biao A, CSE775 - Distributed Objects, Spring 2019                 //
///////////////////////////////////////////////////////////////////////

#include "FileMgr.h"
#include <iostream>
#include <string>
#include <vector>

using namespace std;

///////////////////////////////////////////////////////////////
// Class FileMgr implementation
//
//----< Query interface implementation >----------------------------------
bool FileMgr::QueryInterface(const std::string &iid, void **ppv)
{
    if (iid == "IUnknown")
    {
        *ppv = static_cast<IUnknown *>(this);
    }
    else if (iid == "IFileMgr")
    {
        *ppv = static_cast<IFileMgr *>(this);
    }
    else
    {
        *ppv = NULL;
        return false; //no such pointer
    }
    reinterpret_cast<IUnknown *>(*ppv)->AddRef();
    return true;
}

//----< add reference count and release>----------------------------------
long FileMgr::AddRef()
{
    m_cRef++;
    return m_cRef;
}

long FileMgr::Release()
{
    m_cRef--;
    if (m_cRef == 0)
    {
        delete this;
        return 0;
    }
    return m_cRef;
}

//----< receives a path from client >----------------------------------
/*
* - used only as part of result sent to client from Using component
*/
bool FileMgr::sendPath(const std::string path)
{
    int index = path.find_last_of('/');
    path_ = path.substr(0, index).c_str();
    if (index == path.size())
        pattern_ = "*.*";
    else
        pattern_ = path.substr(index + 1).c_str();
    return true;
}
//----< provides a string for Using to send back to client >-----------

std::vector<std::string> FileMgr::getResult()
{
    vector<string>&& res = fs.getFilesWithPattern(path_, pattern_);
    vector<string> resPaths;
    for (string s : res)
    {
        resPaths.push_back(path_ + "/" + s);
    }
    return resPaths;
}

///////////////////////////////////////////////////////////////
// Class FileMgrFactory implementation
//
bool FileMgrFactory::QueryInterface(const std::string &iid, void **ppv)
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
    reinterpret_cast<IUnknown *>(*ppv)->AddRef();
    return true;
}

long FileMgrFactory::AddRef()
{
    m_cRef++;
    return m_cRef;
}

long FileMgrFactory::Release()
{
    m_cRef--;
    if (m_cRef == 0)
    {
        delete this;
        return 0;
    }
    return m_cRef;
}

bool FileMgrFactory::CreateInstance(IUnknown *pUnknownOuter, const std::string &iid, void **ppv)
{
    if (pUnknownOuter != NULL)
    {
        return false;
    }

    // Create component.
    FileMgr *fm = new FileMgr;
    if (fm == NULL)
    {
        return false; //out of memory
    }

    // Get the requested interface.
    bool hr = fm->QueryInterface(iid, ppv);

    // Release the IUnknown pointer.
    // (If QueryInterface failed, component will delete itself.)
    fm->Release();
    return hr;
}