///////////////////////////////////////////////////////////////////////
// Client.cpp - Demo all the requirements                            //
//                                                                   //
// Biao A, CSE775 - Distributed Objects, Spring 2019                 //
///////////////////////////////////////////////////////////////////////



#include <atlbase.h>
#include <iostream>
#include <string>
#include "../HelperComp/HelperComp_i.h"
#include "../UsingComp/UsingComp_i.h"
#include <vector>
using namespace std;

//----< Demo part of requirement 1: using VS >-----------
bool demo1() {
	std::cout << "\n  CSE775 Project #1 Helper client";
	std::cout << "\n =================================";
	std::cout << "\n Demo part of requirement 1: using VS";
	std::cout << "\n  Currently using VS. Version: Visual Studio Community 2017 15.3.2";
	return true;
}

//----< Demo requirement 5: fileMgr Component >-----------
bool demo2() {
	std::cout << "\n\n =================================";
	std::cout << "\n Demo requirement 5: fileMgr Component";
	CoInitialize(NULL);
	{
		// create a Helper instance

		CComQIPtr<IHelper> pHelper;
		pHelper.CoCreateInstance(CLSID_Helper);
		if (pHelper)
		{
			std::cout << "\n  Searching for file in ../TestDirectory/ with pattern *.cpp\n";
			CComBSTR path("../TestDirectory/*.cpp");
			pHelper->SendPath(path);
		}
		else
			return false;
		BSTR helperResult;
		HRESULT hr = pHelper->getResult(&helperResult);
		wstring ws(helperResult);
		string strPaths(ws.begin(), ws.end());
		int start = 0;
		for (int i = 0; i < strPaths.size(); i++) {
			if (strPaths[i] == ';') {
				cout << "  File Path: " + strPaths.substr(start, i - start) << endl;
				start = i + 1;
			}
		}

	}
	CoUninitialize();
	return true;
}

//----< Demo requirement 4: TextSearch Component >-----------
bool demo3() {
	std::cout << "\n\n =================================";
	std::cout << "\n Demo requirement 4: TextSearch Component";
	CoInitialize(NULL);
	{
		// create a Helper instance

		CComQIPtr<IHelper> pHelper;
		pHelper.CoCreateInstance(CLSID_Helper);
		if (pHelper)
		{
			std::cout << "\n  Searching for file in ../TestDirectory/ with pattern *.txt";
			CComBSTR path("../TestDirectory/*.txt");
			pHelper->SendPath(path);
		}
		else
			return false;
		// create a Using instance

		CComQIPtr<IUsing> pUsing;
		pUsing.CoCreateInstance(CLSID_Using);
		if (pUsing)
		{
			pUsing->sendHelperIF(pHelper);

			std::cout << "\n  Searching for text pattern: love";
			CComBSTR pattern("love");
			pUsing->SendPattern(pattern);

			// get result from Using

			BSTR result;
			pUsing->getResult(&result);
			std::wcout << "\n  " << result;
		}
		else
			return false;
		std::wcout << "\n\n";
	}
	CoUninitialize();
	return true;
}


int main()
{
	demo1();
	demo2();
	demo3();
	std::cin.get();
}

