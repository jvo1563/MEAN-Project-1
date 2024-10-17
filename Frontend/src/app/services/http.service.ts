import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { Player } from '../models/player';
import { Coach } from '../models/coach';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getTeams(): Observable<HttpResponse<Team[]>> {
    return this.http.get<Team[]>(`${environment.apiUrl}/team`, {
      observe: 'response',
    });
  }
  getTeam(id: number): Observable<HttpResponse<Team>> {
    return this.http.get<Team>(`${environment.apiUrl}/team/${id}`, {
      observe: 'response',
    });
  }
  addTeam(team: Team): Observable<HttpResponse<Team>> {
    return this.http.post<Team>(`${environment.apiUrl}/team`, team, {
      observe: 'response',
    });
  }
  deleteTeam(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${environment.apiUrl}/team/${id}`, {
      observe: 'response',
    });
  }
  updateTeam(id: number, team: Team): Observable<HttpResponse<Team>> {
    // Removing total players because we don't want the user to be able to change it
    let updatedTeam = {
      team_name: team.team_name,
      team_logo: team.team_logo,
      team_city: team.team_city,
      team_founded_year: team.team_founded_year,
      max_capacity: team.max_capacity,
      wins: team.wins,
      losses: team.losses,
    };
    return this.http.put<Team>(
      `${environment.apiUrl}/team/${id}`,
      updatedTeam,
      {
        observe: 'response',
      },
    );
  }

  getPlayers(): Observable<HttpResponse<Player[]>> {
    return this.http.get<Player[]>(`${environment.apiUrl}/player`, {
      observe: 'response',
    });
  }
  getPlayer(id: number): Observable<HttpResponse<Player>> {
    return this.http.get<Player>(`${environment.apiUrl}/player/${id}`, {
      observe: 'response',
    });
  }
  addPlayer(player: Player): Observable<HttpResponse<Player>> {
    // Delete teams from player
    delete player.team;
    return this.http.post<Player>(`${environment.apiUrl}/player`, player, {
      observe: 'response',
    });
  }
  deletePlayer(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${environment.apiUrl}/player/${id}`, {
      observe: 'response',
    });
  }
  updatePlayer(id: number, player: Player): Observable<HttpResponse<Player>> {
    delete player.team;
    return this.http.put<Player>(`${environment.apiUrl}/player/${id}`, player, {
      observe: 'response',
    });
  }

  getCoaches(): Observable<HttpResponse<Coach[]>> {
    return this.http.get<Coach[]>(`${environment.apiUrl}/coach`, {
      observe: 'response',
    });
  }
  getCoach(id: number): Observable<HttpResponse<Coach>> {
    return this.http.get<Coach>(`${environment.apiUrl}/coach/${id}`, {
      observe: 'response',
    });
  }
  addCoach(coach: Coach): Observable<HttpResponse<Coach>> {
    // Delete teams from coach
    delete coach.team;
    return this.http.post<Coach>(`${environment.apiUrl}/coach`, coach, {
      observe: 'response',
    });
  }
  deleteCoach(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${environment.apiUrl}/coach/${id}`, {
      observe: 'response',
    });
  }
  updateCoach(id: number, coach: Coach): Observable<HttpResponse<Coach>> {
    delete coach.team;
    return this.http.put<Coach>(`${environment.apiUrl}/coach/${id}`, coach, {
      observe: 'response',
    });
  }
}
