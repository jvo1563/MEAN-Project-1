import { Component } from '@angular/core';
import { Player } from '../models/player';
import { HttpService } from '../services/http.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Team } from '../models/team';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-player-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-player-form.component.html',
  styleUrl: './edit-player-form.component.css',
})
export class EditPlayerFormComponent {
  editForm: FormGroup;
  playerId: number = 0;
  teams: Team[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
  ) {
    this.route.params.subscribe((params) => {
      this.playerId = params['id'];
      this.getPlayer();
    });

    this.editForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      height: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^\d+(\.\d+)?$/),
      ]),
      weight: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^\d+(\.\d+)?$/),
      ]),
      position: new FormControl('', [Validators.required]),
      jerseyNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(5),
        Validators.pattern(/^\d+$/),
      ]),
      dateOfBirth: new FormControl('', [Validators.required]),
      goalsScored: new FormControl('', [
        Validators.maxLength(10),
        Validators.pattern(/^\d+$/),
      ]),
      teamId: new FormControl('', [Validators.required]),
    });
    this.getTeams();
  }
  get firstName() {
    return this.editForm.get('firstName');
  }
  get lastName() {
    return this.editForm.get('lastName');
  }
  get height() {
    return this.editForm.get('height');
  }
  get weight() {
    return this.editForm.get('weight');
  }
  get position() {
    return this.editForm.get('position');
  }
  get jerseyNumber() {
    return this.editForm.get('jerseyNumber');
  }
  get dateOfBirth() {
    return this.editForm.get('dateOfBirth');
  }
  get goalsScored() {
    return this.editForm.get('goalsScored');
  }
  get teamId() {
    return this.editForm.get('teamId');
  }
  resetEditForm() {
    this.getPlayer();
  }

  submitEditForm() {
    if (this.editForm.valid) {
      let newPlayer: Player = new Player(
        this.playerId, // id
        this.editForm.value.firstName,
        this.editForm.value.lastName,
        this.editForm.value.height,
        this.editForm.value.weight,
        this.editForm.value.position,
        this.editForm.value.jerseyNumber,
        this.editForm.value.dateOfBirth,
        this.editForm.value.goalsScored || 0,
        this.editForm.value.teamId,
        {},
      );
      this.httpService.updatePlayer(this.playerId, newPlayer).subscribe({
        next: (response) => {
          this.successMessage = 'Player updated successfully';
          this.errorMessage = '';
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
          this.resetEditForm();
        },
        error: (error) => {
          // console.log(error);
          this.errorMessage = error.error.error;
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        },
      });
    }
  }
  getPlayer() {
    this.httpService.getPlayer(this.playerId).subscribe((response) => {
      if (response.body) {
        this.editForm.patchValue({
          firstName: response.body.first_name,
          lastName: response.body.last_name,
          height: response.body.height,
          weight: response.body.weight,
          position: response.body.position,
          jerseyNumber: response.body.jersey_number,
          dateOfBirth: response.body.date_of_birth,
          goalsScored: response.body.goals_scored,
          teamId: response.body.team_id,
        });
      }
    });
  }
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
