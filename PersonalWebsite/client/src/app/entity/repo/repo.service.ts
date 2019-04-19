import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpHandler, HttpHeaders } from '@angular/common/http';3
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  uri = 'http://localhost:8080/repo';
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getFoldersList(path){
    const req = {
      path: path 
    }
    return this.http.post(`${this.uri}/showFolderList`, req);
  }

  getFileList(path){
    const req = {
      path: path 
    }
    return this.http.post(`${this.uri}/showFileList`, req);
  }

  getFileContent(path){
    const req = {
      filePath: path
    }
    return this.http.post(`${this.uri}/showFileContent`, req);
  }

  delFolder(path){
    const req = {
      filePath: path
    }
    return this.http.post(`${this.uri}/delFolder`, req);
  }
  
  delFile(filePath){
    const req = {
      filePath: filePath
    }
    return this.http.post(`${this.uri}/delFile`, req);
  }

  downloadFile(filePath){
    const req = {
      filePath: filePath
    }
    return this.http.post(`${this.uri}/downloadFile`, req, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }
}
