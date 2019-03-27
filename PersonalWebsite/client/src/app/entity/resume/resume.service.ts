import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  uri = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // edu[] :[{},{},...]
  save(dname, edu, exp, skill ){
     const resume = {
        domainName: dname,
        education: edu,
        experience: exp,
        skills: skill
     }
     return this.http.post(`${this.uri}/resume/save`,resume);
  }

  get(dname){
     const domainName = {domainName:dname};
     return this.http.post(`${this.uri}/resume/get`,domainName);
  }

}
