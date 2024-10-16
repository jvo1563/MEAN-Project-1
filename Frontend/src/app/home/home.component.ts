import { Component } from '@angular/core';
import { Team } from '../models/team';
import { HttpService } from '../services/http.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  teams: Team[] = [];

  // Fetches the list of teams when the component is initialized
  constructor(private httpService: HttpService) {
    this.getTeams();
  }

  // Fetches the list of teams from the API
  getTeams() {
    this.httpService.getTeams().subscribe((response) => {
      let tempTeams: Team[] = [];
      if (response.body)
        response.body.forEach((team) => {
          tempTeams.push(
            new Team(
              team.id,
              team.team_name,
              team.team_logo,
              team.team_city,
              team.team_founded_year,
              team.total_players,
              team.max_capacity,
              team.wins,
              team.losses,
            ),
          );
        });
      this.teams = tempTeams;
    });
  }
}
