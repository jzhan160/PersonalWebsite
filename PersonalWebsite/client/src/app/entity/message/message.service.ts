import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  uri = 'http://localhost:8080';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  sendMsg(email, domainName, msgContent, name) {
    const msg = {
      from: email,
      to: domainName,
      name: name,
      msg: msgContent
    }
    return this.http.post(`${this.uri}/message/sendMsg`, msg);
  }
  getUnReadMsg(domainName){
      const query = {domainName:domainName};
      return this.http.post(`${this.uri}/message/getUnReadMsg`, query);

  }

  setRead(_id){
    const update = {msgId:_id};
    return this.http.post(`${this.uri}/message/setRead`, update);
  }

  deleteMsg(_id){
    const update = {msgId:_id};
    return this.http.post(`${this.uri}/message/deleteMsg`, update);
  }
}
