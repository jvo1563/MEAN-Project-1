import { Component } from '@angular/core';
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
  selector: 'app-new-team-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-team-form.component.html',
  styleUrl: './new-team-form.component.css',
})
export class NewTeamFormComponent {
  createForm: FormGroup;

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private httpService: HttpService,
    private refreshTeamsService: RefreshTeamsService,
  ) {
    this.createForm = new FormGroup({
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
    });
  }
  get teamName() {
    return this.createForm.get('teamName');
  }

  get teamLogo() {
    return this.createForm.get('teamLogo');
  }

  get teamCity() {
    return this.createForm.get('teamCity');
  }

  get teamFoundingYear() {
    return this.createForm.get('teamFoundingYear');
  }

  get teamMaxCapacity() {
    return this.createForm.get('teamMaxCapacity');
  }

  resetCreateForm() {
    this.createForm.reset();
  }

  submitCreateForm() {
    if (this.createForm.valid) {
      // console.log(this.createForm.value);
      let newTeam: Team = new Team(
        0, // id
        this.createForm.value.teamName,
        this.createForm.value.teamLogo,
        this.createForm.value.teamCity,
        this.createForm.value.teamFoundingYear,
        0, // total_players
        this.createForm.value.teamMaxCapacity || 0,
        0, // wins
        0, // losses
      );
      this.httpService.addTeam(newTeam).subscribe({
        next: (response) => {
          this.successMessage = 'Team created successfully';
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
          this.resetCreateForm();
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
}
