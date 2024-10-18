import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Coach } from '../models/coach';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.css',
})
export class CoachesComponent {
  coaches: Coach[] = [];

  // Fetches the coaches when the component is initialized
  constructor(private httpService: HttpService) {
    this.getCoaches();
  }

  // Fetches the list of coaches from the API
  getCoaches() {
    this.httpService.getCoaches().subscribe((response) => {
      let tempCoaches: Coach[] = [];
      if (response.body)
        response.body.forEach((coach) => {
          if (coach.team_id)
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
          else
            tempCoaches.push(
              new Coach(
                coach.id,
                coach.first_name,
                coach.last_name,
                coach.years_of_experience,
                coach.salary,
                coach.email,
                coach.phone_number,
                0,
                {
                  team_name: 'No Team',
                  team_logo:
                    'https://i.pinimg.com/originals/c9/af/8e/c9af8efe164f75b2d3aaebf5534892b0.png',
                },
              ),
            );
        });
      this.coaches = tempCoaches;
      this.reloadPreline();
    });
  }

  // Deletes a coach by ID and refreshes the coach list
  deleteCoach(id: number) {
    this.httpService.deleteCoach(id).subscribe((response) => {
      this.getCoaches();
    });
  }

  // Reloads dropdowns or other UI elements after changes
  reloadPreline() {
    setTimeout(() => {
      window.HSStaticMethods.autoInit(['dropdown']);
    }, 100);
    setTimeout(() => {
      window.HSStaticMethods.autoInit(['dropdown']);
    }, 500);
  }
}
