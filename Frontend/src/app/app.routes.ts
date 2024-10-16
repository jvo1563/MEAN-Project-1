import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { PlayersComponent } from './players/players.component';
import { CoachesComponent } from './coaches/coaches.component';
import { NewTeamFormComponent } from './new-team-form/new-team-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'teams', component: HomeComponent },
  { path: 'teams/create', component: NewTeamFormComponent },
  { path: 'teams/:id', component: TeamComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'coaches', component: CoachesComponent },
];
