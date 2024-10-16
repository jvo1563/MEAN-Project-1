import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../models/team';
import { HttpService } from '../services/http.service';
import { RefreshTeamsService } from '../services/refresh-teams.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-team-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-team-form.component.html',
  styleUrl: './edit-team-form.component.css',
})
export class EditTeamFormComponent {
  editForm: FormGroup;
  teamId: number = 0;
  errorMessage: string = '';
  successMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private refreshTeamsService: RefreshTeamsService,
  ) {
    this.route.params.subscribe((params) => {
      this.teamId = params['id'];
      this.getTeam();
    });

    this.editForm = new FormGroup({
      teamName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      teamLogo: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
        Validators.pattern(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        ),
      ]),
      teamCity: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      teamFoundingYear: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{4}$/),
      ]),
      teamMaxCapacity: new FormControl('', [Validators.pattern(/^\d+$/)]),
      wins: new FormControl('', [Validators.pattern(/^\d+$/)]),
      losses: new FormControl('', [Validators.pattern(/^\d+$/)]),
    });
  }
  get teamName() {
    return this.editForm.get('teamName');
  }

  get teamLogo() {
    return this.editForm.get('teamLogo');
  }

  get teamCity() {
    return this.editForm.get('teamCity');
  }

  get teamFoundingYear() {
    return this.editForm.get('teamFoundingYear');
  }

  get teamMaxCapacity() {
    return this.editForm.get('teamMaxCapacity');
  }

  get wins() {
    return this.editForm.get('wins');
  }

  get losses() {
    return this.editForm.get('losses');
  }

  resetEditForm() {
    this.getTeam();
  }

  submitEditForm() {
    if (this.editForm.valid) {
      let newTeam: Team = new Team(
        this.teamId, // id
        this.editForm.value.teamName,
        this.editForm.value.teamLogo,
        this.editForm.value.teamCity,
        this.editForm.value.teamFoundingYear,
        0, // total_players
        this.editForm.value.teamMaxCapacity || 20,
        this.editForm.value.wins,
        this.editForm.value.losses,
      );
      this.httpService.updateTeam(this.teamId, newTeam).subscribe({
        next: (response) => {
          this.successMessage = 'Team updated successfully';
          this.errorMessage = '';
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
          this.resetEditForm();
          this.refreshTeamsService.triggerRefresh();
        },
        error: (error) => {
          // console.log(error);
          this.errorMessage = 'Team name already taken';
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        },
      });
    }
  }
  getTeam() {
    this.httpService.getTeam(this.teamId).subscribe((response) => {
      if (response.body) {
        this.editForm.patchValue({
          teamName: response.body.team_name,
          teamLogo: response.body.team_logo,
          teamCity: response.body.team_city,
          teamFoundingYear: response.body.team_founded_year,
          teamMaxCapacity: response.body.max_capacity,
          wins: response.body.wins,
          losses: response.body.losses,
        });
      }
    });
  }
}
