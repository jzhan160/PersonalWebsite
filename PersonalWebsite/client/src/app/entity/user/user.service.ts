import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // getUser() {
  //   return this.http.get(`${this.uri}/issues`);
  // }

  // getIssueById(id) {
  //   return this.http.get(`${this.uri}/issues/${id}`);
  // }

  searchDomainName(dname){
    const domain = {
      domainName: dname
     };
     return this.http.post(`${this.uri}/searchDomainName`, domain);
  }

  userLogin(emai, pwd) {
    const user = {
      email: emai,
      password: pwd
    };

    return this.http.post(`${this.uri}/do_login`, user);
  }

  userRegister(emai, pwd){
    const user = {
      email: emai,
      password: pwd
    };
    return this.http.post(`${this.uri}/do_register`, user);
  }

  userLogout(){
    return this.http.get(`${this.uri}/logout`);
  }

  selectTemplate(tId){
    const tempalte = {
      templateId: tId
     };
    // // return this.http.post(`${this.uri}/set_up`, tempalte);
    return this.http.post(`${this.uri}/template`, tempalte);

  }
  completeInfo(uname, dname,emai, addre, pho) {
      const user = {
         username: uname,
         domainName: dname,
         email: emai,
         address: addre,
         phone: pho
      };
      return this.http.post(`${this.uri}/submit_info`, user);

  }
}
