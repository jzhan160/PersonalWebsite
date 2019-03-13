import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  userLogin(uname, pwd) {
    console.log(uname);

    const user = {
      username: uname,
      password: pwd
    };
    return this.http.post(`${this.uri}/do_login`, user);
  }

  userRegister(uname, pwd){
    const user = {
      username: uname,
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
  completeInfo(uname, emai, addre, pho) {
      const user = {
         username: uname,
         email: emai,
         address: addre,
         phone: pho
      };
      return this.http.post(`${this.uri}/submit_info`, user);

  }
}
