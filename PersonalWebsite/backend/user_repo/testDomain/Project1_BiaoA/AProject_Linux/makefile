output: Client.o FileMgr.o TextSearch.o
	g++ Client.o FileMgr.o TextSearch.o -o -output

Client.o: ./Client/Client.cpp
	g++ -c ./Client/Client.cpp

FileMgr.o: ./FileMgr/FileMgr.cpp ./FileMgr/FileMgr.h ./IUnknown/IUnknown.h FileSystem.o
	g++ -c ./FileMgr/FileMgr.cpp

TextSearch.o: ./TextSearch/TextSearch.cpp ./TextSearch/TextSearch.h ./IUnknown/IUnknown.h
	g++ -c ./TextSearch/TextSearch.cpp

FileSystem.o: ./FileMgr/FileSystem.cpp ./FileMgr/FileSystem.h
	g++ -c -g ./FileMgr/FileSystem.cpp

clean:
	rm *.o output