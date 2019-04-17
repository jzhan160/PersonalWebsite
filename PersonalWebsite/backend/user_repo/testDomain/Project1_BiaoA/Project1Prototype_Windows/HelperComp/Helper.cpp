///////////////////////////////////////////////////////////////////////
// Helper.cpp - FileMgrCom                                           //
//                                                                   //
// Biao A, CSE775 - Distributed Objects, Spring 2019                 //
///////////////////////////////////////////////////////////////////////

#include "stdafx.h"
#include "Helper.h"
#include <iostream>
#include <string>
#include <vector>

using namespace std;

//----< receives a path from client >----------------------------------
/*
* - used only as part of result sent to client from Using component
*/
STDMETHODIMP CHelper::SendPath(BSTR path)
{
	wstring parseStr(path);
	int index  = parseStr.find_last_of('/');
  path_.Append(parseStr.substr(0, index).c_str());
	if (index == parseStr.size())
		pattern_.Append("*.*");
	else
		pattern_.Append(parseStr.substr(index + 1).c_str());
  return S_OK;
}
//----< provides a string for Using to send back to client >-----------

STDMETHODIMP CHelper::getResult(BSTR* pResult)
{
	wstring wPath(path_), wPattern(pattern_);
	string path(wPath.begin(), wPath.end()), pattern(wPattern.begin(), wPattern.end());
	vector<string> res = fm.getFilesWithPattern(path, pattern);
	string temp;
	for (string s : res) {
		temp += path + "/" + s + ";";
	}
	CComBSTR result(temp.c_str());
  *pResult = result.Detach();
  return S_OK;
}
