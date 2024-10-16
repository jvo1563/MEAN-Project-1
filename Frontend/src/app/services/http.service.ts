import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { Player } from '../models/player';
import { Coach } from '../models/coach';

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
  getTeam(id: number): Observable<HttpResponse<Team>> {
    return this.http.get<Team>(`http://localhost:3000/api/team/${id}`, {
      observe: 'response',
    });
  }
  addTeam(team: Team): Observable<HttpResponse<Team>> {
    return this.http.post<Team>('http://localhost:3000/api/team', team, {
      observe: 'response',
    });
  }

  getPlayers(): Observable<HttpResponse<Player[]>> {
    return this.http.get<Player[]>('http://localhost:3000/api/player', {
      observe: 'response',
    });
  }

  getCoaches(): Observable<HttpResponse<Coach[]>> {
    return this.http.get<Coach[]>('http://localhost:3000/api/coach', {
      observe: 'response',
    });
  }
}
