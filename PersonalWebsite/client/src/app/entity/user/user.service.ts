import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:8080';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

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
    this.cookieService.set('domainSource','');
    this.cookieService.set('domainDest','');

    return this.http.get(`${this.uri}/logout`);
  }

  completeInfo(uname, dname, addre, pho, pth, fname,tId,emai) {
      const user = {
         username: uname,
         domainName: dname,
         address: addre,
         phone: pho,
         path: pth,
         filename: fname,
         templateId: tId,
         email: emai
      };
      return this.http.post(`${this.uri}/submit_info`, user);
  }

 
}
