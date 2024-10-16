import { Component } from '@angular/core';
import { Coach } from '../models/coach';
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
  selector: 'app-edit-coach-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-coach-form.component.html',
  styleUrl: './edit-coach-form.component.css',
})
export class EditCoachFormComponent {
  editForm: FormGroup;
  coachId: number = 0;
  teams: Team[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
  ) {
    this.route.params.subscribe((params) => {
      this.coachId = params['id'];
      this.getCoach();
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
      yearsOfExperience: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.maxLength(10),
      ]),
      salary: new FormControl('', [
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
        Validators.maxLength(10),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        ),
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
  get yearsOfExperience() {
    return this.editForm.get('yearsOfExperience');
  }
  get salary() {
    return this.editForm.get('salary');
  }
  get email() {
    return this.editForm.get('email');
  }
  get phoneNumber() {
    return this.editForm.get('phoneNumber');
  }
  get teamId() {
    return this.editForm.get('teamId');
  }
  resetEditForm() {
    this.getCoach();
  }

  submitEditForm() {
    if (this.editForm.valid) {
      let newCoach: Coach = new Coach(
        this.coachId, // id
        this.editForm.value.firstName,
        this.editForm.value.lastName,
        this.editForm.value.yearsOfExperience || 0,
        this.editForm.value.salary || 0,
        this.editForm.value.email,
        this.editForm.value.phoneNumber,
        this.editForm.value.teamId,
        {},
      );
      this.httpService.updateCoach(this.coachId, newCoach).subscribe({
        next: (response) => {
          this.successMessage = 'Coach updated successfully';
          this.errorMessage = '';
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
          this.resetEditForm();
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = 'Unexpected error';
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        },
      });
    }
  }
  getCoach() {
    this.httpService.getCoach(this.coachId).subscribe((response) => {
      if (response.body) {
        this.editForm.patchValue({
          firstName: response.body.first_name,
          lastName: response.body.last_name,
          yearsOfExperience: response.body.years_of_experience,
          salary: response.body.salary,
          email: response.body.email,
          phoneNumber: response.body.phone_number,
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
