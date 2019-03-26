import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';3
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  uri = 'http://localhost:8080/story';
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  addStory(title, content, urlPath){
    const story = {
      domain: this.cookieService.get('domainSource'),
      title: title,
      content: content,
      urlPath: urlPath,
      createTime: (new Date).toString()
    }
    return this.http.post(`${this.uri}/add`, story);
  }
}
