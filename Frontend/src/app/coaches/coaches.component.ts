import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Coach } from '../models/coach';

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [],
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.css',
})
export class CoachesComponent {
  coaches: Coach[] = [];

  constructor(private httpService: HttpService) {
    this.getCoaches();
  }

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
                coach.team
              )
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
                }
              )
            );
        });
      this.coaches = tempCoaches;
    });
  }
}
