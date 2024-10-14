import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getTeams(): Observable<HttpResponse<Team[]>> {
    return this.http.get<Team[]>('http://localhost:3000/api/team', {
      observe: 'response',
    });
  }
}
