import { Component } from '@angular/core';
import { Team } from '../models/team';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Player } from '../models/player';
import { Coach } from '../models/coach';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent {
  team: Team = new Team(0, '', '', '', 0, 0, 0, 0, 0);
  teamID = 0;
  players: Player[] = [];
  coaches: Coach[] = [];

  constructor(private route: ActivatedRoute, private httpService: HttpService) {
    this.route.params.subscribe((params) => {
      this.teamID = params['id'];
      this.getTeam();
      this.getTeamPlayers();
      this.getTeamCoaches();
    });
  }

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
          response.body.losses
        );
      }
    });
  }

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
                player.team
              )
            );
          }
        });
      this.players = tempPlayers;
    });
  }

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
                coach.team
              )
            );
        });
      this.coaches = tempCoaches;
    });
  }
}
