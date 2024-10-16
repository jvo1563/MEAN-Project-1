import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { PlayersComponent } from './players/players.component';
import { CoachesComponent } from './coaches/coaches.component';
import { NewTeamFormComponent } from './new-team-form/new-team-form.component';
import { NewPlayerFormComponent } from './new-player-form/new-player-form.component';
import { NewCoachFormComponent } from './new-coach-form/new-coach-form.component';
import { EditTeamFormComponent } from './edit-team-form/edit-team-form.component';
import { EditPlayerFormComponent } from './edit-player-form/edit-player-form.component';
import { EditCoachFormComponent } from './edit-coach-form/edit-coach-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'teams', component: HomeComponent },
  { path: 'teams/create', component: NewTeamFormComponent },
  { path: 'teams/:id', component: TeamComponent },
  { path: 'teams/:id/edit', component: EditTeamFormComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'players/create', component: NewPlayerFormComponent },
  // { path: 'players/:id', component: PlayerComponent },
  { path: 'players/:id/edit', component: EditPlayerFormComponent },
  { path: 'coaches', component: CoachesComponent },
  { path: 'coaches/create', component: NewCoachFormComponent },
  // { path: 'coaches/:id', component: CoachComponent },
  { path: 'coaches/:id/edit', component: EditCoachFormComponent },
];
