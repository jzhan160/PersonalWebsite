import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';3
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


}
