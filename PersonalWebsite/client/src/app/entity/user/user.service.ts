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

  // updateIssue(id, title, responsible, description, severity, status) {
  //   const issue = {
  //     title: title,
  //     responsible: responsible,
  //     description: description,
  //     severity: severity,
  //     status: status
  //   };
  //   return this.http.post(`${this.uri}/issues/update/${id}`, issue);
  // }

  // deleteIssue(id) {
  //   return this.http.get(`${this.uri}/issues/delete/${id}`);
  // }
}
