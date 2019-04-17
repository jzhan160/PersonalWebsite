

/* this ALWAYS GENERATED file contains the definitions for the interfaces */


 /* File created by MIDL compiler version 8.01.0622 */
/* at Mon Jan 18 22:14:07 2038
 */
/* Compiler settings for HelperComp.idl:
    Oicf, W1, Zp8, env=Win32 (32b run), target_arch=X86 8.01.0622 
    protocol : dce , ms_ext, c_ext, robust
    error checks: allocation ref bounds_check enum stub_data 
    VC __declspec() decoration level: 
         __declspec(uuid()), __declspec(selectany), __declspec(novtable)
         DECLSPEC_UUID(), MIDL_INTERFACE()
*/
/* @@MIDL_FILE_HEADING(  ) */

#pragma warning( disable: 4049 )  /* more than 64k source lines */


/* verify that the <rpcndr.h> version is high enough to compile this file*/
#ifndef __REQUIRED_RPCNDR_H_VERSION__
#define __REQUIRED_RPCNDR_H_VERSION__ 475
#endif

#include "rpc.h"
#include "rpcndr.h"

#ifndef __RPCNDR_H_VERSION__
#error this stub requires an updated version of <rpcndr.h>
#endif /* __RPCNDR_H_VERSION__ */

#ifndef COM_NO_WINDOWS_H
#include "windows.h"
#include "ole2.h"
#endif /*COM_NO_WINDOWS_H*/

#ifndef __HelperComp_i_h__
#define __HelperComp_i_h__

#if defined(_MSC_VER) && (_MSC_VER >= 1020)
#pragma once
#endif

/* Forward Declarations */ 

#ifndef __IHelper_FWD_DEFINED__
#define __IHelper_FWD_DEFINED__
typedef interface IHelper IHelper;

#endif 	/* __IHelper_FWD_DEFINED__ */


#ifndef __Helper_FWD_DEFINED__
#define __Helper_FWD_DEFINED__

#ifdef __cplusplus
typedef class Helper Helper;
#else
typedef struct Helper Helper;
#endif /* __cplusplus */

#endif 	/* __Helper_FWD_DEFINED__ */


/* header files for imported files */
#include "oaidl.h"
#include "ocidl.h"
#include "shobjidl.h"

#ifdef __cplusplus
extern "C"{
#endif 


#ifndef __IHelper_INTERFACE_DEFINED__
#define __IHelper_INTERFACE_DEFINED__

/* interface IHelper */
/* [unique][nonextensible][dual][uuid][object] */ 


EXTERN_C const IID IID_IHelper;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("04d3b298-0a3d-46db-8899-18ed9167fcca")
    IHelper : public IDispatch
    {
    public:
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE SendPath( 
            /* [in] */ BSTR path) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE getResult( 
            /* [retval][out] */ BSTR *pResult) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct IHelperVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            IHelper * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            IHelper * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            IHelper * This);
        
        HRESULT ( STDMETHODCALLTYPE *GetTypeInfoCount )( 
            IHelper * This,
            /* [out] */ UINT *pctinfo);
        
        HRESULT ( STDMETHODCALLTYPE *GetTypeInfo )( 
            IHelper * This,
            /* [in] */ UINT iTInfo,
            /* [in] */ LCID lcid,
            /* [out] */ ITypeInfo **ppTInfo);
        
        HRESULT ( STDMETHODCALLTYPE *GetIDsOfNames )( 
            IHelper * This,
            /* [in] */ REFIID riid,
            /* [size_is][in] */ LPOLESTR *rgszNames,
            /* [range][in] */ UINT cNames,
            /* [in] */ LCID lcid,
            /* [size_is][out] */ DISPID *rgDispId);
        
        /* [local] */ HRESULT ( STDMETHODCALLTYPE *Invoke )( 
            IHelper * This,
            /* [annotation][in] */ 
            _In_  DISPID dispIdMember,
            /* [annotation][in] */ 
            _In_  REFIID riid,
            /* [annotation][in] */ 
            _In_  LCID lcid,
            /* [annotation][in] */ 
            _In_  WORD wFlags,
            /* [annotation][out][in] */ 
            _In_  DISPPARAMS *pDispParams,
            /* [annotation][out] */ 
            _Out_opt_  VARIANT *pVarResult,
            /* [annotation][out] */ 
            _Out_opt_  EXCEPINFO *pExcepInfo,
            /* [annotation][out] */ 
            _Out_opt_  UINT *puArgErr);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *SendPath )( 
            IHelper * This,
            /* [in] */ BSTR path);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *getResult )( 
            IHelper * This,
            /* [retval][out] */ BSTR *pResult);
        
        END_INTERFACE
    } IHelperVtbl;

    interface IHelper
    {
        CONST_VTBL struct IHelperVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define IHelper_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define IHelper_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define IHelper_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define IHelper_GetTypeInfoCount(This,pctinfo)	\
    ( (This)->lpVtbl -> GetTypeInfoCount(This,pctinfo) ) 

#define IHelper_GetTypeInfo(This,iTInfo,lcid,ppTInfo)	\
    ( (This)->lpVtbl -> GetTypeInfo(This,iTInfo,lcid,ppTInfo) ) 

#define IHelper_GetIDsOfNames(This,riid,rgszNames,cNames,lcid,rgDispId)	\
    ( (This)->lpVtbl -> GetIDsOfNames(This,riid,rgszNames,cNames,lcid,rgDispId) ) 

#define IHelper_Invoke(This,dispIdMember,riid,lcid,wFlags,pDispParams,pVarResult,pExcepInfo,puArgErr)	\
    ( (This)->lpVtbl -> Invoke(This,dispIdMember,riid,lcid,wFlags,pDispParams,pVarResult,pExcepInfo,puArgErr) ) 


#define IHelper_SendPath(This,path)	\
    ( (This)->lpVtbl -> SendPath(This,path) ) 

#define IHelper_getResult(This,pResult)	\
    ( (This)->lpVtbl -> getResult(This,pResult) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __IHelper_INTERFACE_DEFINED__ */



#ifndef __HelperCompLib_LIBRARY_DEFINED__
#define __HelperCompLib_LIBRARY_DEFINED__

/* library HelperCompLib */
/* [version][uuid] */ 


EXTERN_C const IID LIBID_HelperCompLib;

EXTERN_C const CLSID CLSID_Helper;

#ifdef __cplusplus

class DECLSPEC_UUID("024f9769-6e26-44f9-b353-c6cf5ae07281")
Helper;
#endif
#endif /* __HelperCompLib_LIBRARY_DEFINED__ */

/* Additional Prototypes for ALL interfaces */

unsigned long             __RPC_USER  BSTR_UserSize(     unsigned long *, unsigned long            , BSTR * ); 
unsigned char * __RPC_USER  BSTR_UserMarshal(  unsigned long *, unsigned char *, BSTR * ); 
unsigned char * __RPC_USER  BSTR_UserUnmarshal(unsigned long *, unsigned char *, BSTR * ); 
void                      __RPC_USER  BSTR_UserFree(     unsigned long *, BSTR * ); 

/* end of Additional Prototypes */

#ifdef __cplusplus
}
#endif

#endif


