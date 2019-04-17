#ifndef IUNKNOWN_H
#define IUNKNOWN_H
///////////////////////////////////////////////////////////////////////
// IUnknown.h - Declaration of IUnknown and IFactory                 //
//                                                                   //
// Biao A, CSE775 - Distributed Objects, Spring 2019                 //
///////////////////////////////////////////////////////////////////////
/*
* Module Operations:
* ==================
* This module provides Interface: IUnknown and IFactory
*
* Public Interface:
* =================
* struct IUnknown:
* QueryInterface(string id, void** ppv) : query if a specfic interface is supported if so, return the pointer
* AddRef()                              : add reference count by one 
* Release()                             : minus reference count by one 
*
* class IFactory:
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

struct IUnknown{
    virtual bool QueryInterface(const std::string& iid, void** ppv) = 0;        
    virtual long AddRef() = 0;
    virtual long Release() = 0;
};

struct IFactory: public IUnknown{
    virtual bool  CreateInstance(IUnknown* pUnknownOuter, const std::string& iid, void** ppv) = 0;
};

#endif