import { Component } from '@angular/core';
import { Coach } from '../models/coach';
import { Team } from '../models/team';
import { HttpService } from '../services/http.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-coach-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-coach-form.component.html',
  styleUrl: './new-coach-form.component.css',
})
export class NewCoachFormComponent {
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
    return this.createForm.get('firstName');
  }
  get lastName() {
    return this.createForm.get('lastName');
  }
  get yearsOfExperience() {
    return this.createForm.get('yearsOfExperience');
  }
  get salary() {
    return this.createForm.get('salary');
  }
  get email() {
    return this.createForm.get('email');
  }
  get phoneNumber() {
    return this.createForm.get('phoneNumber');
  }
  get teamId() {
    return this.createForm.get('teamId');
  }
  resetCreateForm() {
    this.createForm.reset();
  }

  submitCreateForm() {
    if (this.createForm.valid) {
      let newCoach: Coach = new Coach(
        0, // id
        this.createForm.value.firstName,
        this.createForm.value.lastName,
        this.createForm.value.yearsOfExperience || 0,
        this.createForm.value.salary || 0,
        this.createForm.value.email,
        this.createForm.value.phoneNumber,
        this.createForm.value.teamId,
        {},
      );
      this.httpService.addCoach(newCoach).subscribe({
        next: (response) => {
          this.successMessage = 'Coach created successfully';
          this.errorMessage = '';
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
          this.resetCreateForm();
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
