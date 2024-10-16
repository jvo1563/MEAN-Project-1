import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Player } from '../models/player';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
})
export class PlayersComponent {
  players: Player[] = [];

  constructor(private httpService: HttpService) {
    this.getPlayers();
  }

  getPlayers() {
    this.httpService.getPlayers().subscribe((response) => {
      let tempPlayers: Player[] = [];
      if (response.body)
        response.body.forEach((player) => {
          if (player.team_id) {
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
          } else {
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
                0,
                {
                  team_name: 'No Team',
                  team_logo:
                    'https://i.pinimg.com/originals/c9/af/8e/c9af8efe164f75b2d3aaebf5534892b0.png',
                },
              ),
            );
          }
        });
      this.players = tempPlayers;
    });
  }

  deletePlayer(id: number) {
    this.httpService.deletePlayer(id).subscribe((response) => {
      this.getPlayers();
    });
  }
}
