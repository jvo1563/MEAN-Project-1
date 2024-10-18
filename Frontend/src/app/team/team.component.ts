import { Component } from '@angular/core';
import { Team } from '../models/team';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Player } from '../models/player';
import { Coach } from '../models/coach';
import { CommonModule } from '@angular/common';
import { RefreshTeamsService } from '../services/refresh-teams.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent {
  // Initialize variables we will be using
  team: Team = new Team(0, '', '', '', 0, 0, 0, 0, 0);
  teamID = 0;
  players: Player[] = [];
  coaches: Coach[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private refreshTeamsService: RefreshTeamsService,
  ) {
    // Subscribes to route parameters and fetches team, players, and coaches
    this.route.params.subscribe((params) => {
      this.teamID = params['id'];
      this.getTeam();
      this.getTeamPlayers();
      this.getTeamCoaches();
    });
  }

  // Fetches the team details based on teamID
  getTeam(): void {
    this.httpService.getTeam(this.teamID).subscribe((response) => {
      if (response.body) {
        this.team = new Team(
          response.body.id,
          response.body.team_name,
          response.body.team_logo,
          response.body.team_city,
          response.body.team_founded_year,
          response.body.total_players,
          response.body.max_capacity,
          response.body.wins,
          response.body.losses,
        );
      }
      this.reloadPreline();
    });
  }

  // Fetches players belonging to the team
  getTeamPlayers() {
    this.httpService.getPlayers().subscribe((response) => {
      let tempPlayers: Player[] = [];
      if (response.body)
        response.body.forEach((player) => {
          if (player.team_id == this.teamID) {
            tempPlayers.push(
              new Player(
                player.id,
                player.first_name,
                player.last_name,
                player.height,
                player.weight,
                player.position,
                player.jersey_number,
                player.date_of_birth,
                player.goals_scored,
                player.team_id,
                player.team,
              ),
            );
          }
        });
      this.players = tempPlayers;
      this.reloadPreline();
    });
  }

  // Fetches coaches belonging to the team
  getTeamCoaches() {
    this.httpService.getCoaches().subscribe((response) => {
      let tempCoaches: Coach[] = [];
      if (response.body)
        response.body.forEach((coach) => {
          if (coach.team_id == this.teamID)
            tempCoaches.push(
              new Coach(
                coach.id,
                coach.first_name,
                coach.last_name,
                coach.years_of_experience,
                coach.salary,
                coach.email,
                coach.phone_number,
                coach.team_id,
                coach.team,
              ),
            );
        });
      this.coaches = tempCoaches;
      this.reloadPreline();
    });
  }
  // Deletes a player by their ID and refreshes the list of players
  deletePlayer(id: number) {
    this.httpService.deletePlayer(id).subscribe((response) => {
      this.getTeam();
      this.getTeamPlayers();
    });
  }
  // Deletes a coach by their ID and refreshes the list of coaches
  deleteCoach(id: number) {
    this.httpService.deleteCoach(id).subscribe((response) => {
      this.getTeam();
      this.getTeamCoaches();
    });
  }
  // Deletes the team and navigates back to the teams page
  deleteTeam() {
    this.httpService.deleteTeam(this.team.id).subscribe((response) => {
      this.refreshTeamsService.triggerRefresh();
      this.router.navigate(['teams']);
    });
  }
  // Function to reload dropdowns or other UI elements after changes
  reloadPreline() {
    setTimeout(() => {
      window.HSStaticMethods.autoInit(['dropdown']);
    }, 100);
    setTimeout(() => {
      window.HSStaticMethods.autoInit(['dropdown']);
    }, 500);
  }
}
