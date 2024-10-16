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

@Component({
  selector: 'app-new-player-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-player-form.component.html',
  styleUrl: './new-player-form.component.css',
})
export class NewPlayerFormComponent {
  createForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  teams: Team[] = [];

  constructor(private httpService: HttpService) {
    this.createForm = new FormGroup({
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
    return this.createForm.get('firstName');
  }
  get lastName() {
    return this.createForm.get('lastName');
  }
  get height() {
    return this.createForm.get('height');
  }
  get weight() {
    return this.createForm.get('weight');
  }
  get position() {
    return this.createForm.get('position');
  }
  get jerseyNumber() {
    return this.createForm.get('jerseyNumber');
  }
  get dateOfBirth() {
    return this.createForm.get('dateOfBirth');
  }
  get goalsScored() {
    return this.createForm.get('goalsScored');
  }
  get teamId() {
    return this.createForm.get('teamId');
  }
  resetCreateForm() {
    this.createForm.reset();
  }

  submitCreateForm() {
    if (this.createForm.valid) {
      let newPlayer: Player = new Player(
        0, // id
        this.createForm.value.firstName,
        this.createForm.value.lastName,
        this.createForm.value.height,
        this.createForm.value.weight,
        this.createForm.value.position,
        this.createForm.value.jerseyNumber,
        this.createForm.value.dateOfBirth,
        this.createForm.value.goalsScored || 0,
        this.createForm.value.teamId,
        {},
      );
      this.httpService.addPlayer(newPlayer).subscribe({
        next: (response) => {
          this.successMessage = 'Player created successfully';
          this.errorMessage = '';
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
          this.resetCreateForm();
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = error.error.error;
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        },
      });
    }
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
