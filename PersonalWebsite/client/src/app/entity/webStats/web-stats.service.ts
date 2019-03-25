import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebStatsService {
  uri = 'http://localhost:8080/webStats';

  constructor(private http: HttpClient) { }

  getStats(domainName) {
    return this.http.post(`${this.uri}/getHistory`, domainName);
  }
}
