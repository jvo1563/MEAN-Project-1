import { Component } from '@angular/core';
import { Team } from '../models/team';
import { HttpService } from '../services/http.service';
import { RefreshTeamsService } from '../services/refresh-teams.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  teams: Team[] = [];

  constructor(
    private httpService: HttpService,
    private refreshTeamsService: RefreshTeamsService,
  ) {
    this.getTeams();
    // Using a data pass service to know when teams is updated to reload sidebar
    this.refreshTeamsService.refreshObservable$.subscribe(() => {
      this.getTeams();
    });
  }

  // Get all teams
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
