export class Player {
  id: number;
  first_name: string;
  last_name: string;
  height: number;
  weight: number;
  position: string;
  jersey_number: number;
  date_of_birth: string;
  goals_scored: number;
  team_id: number;
  team: any;

  constructor(
    id: number,
    first_name: string,
    last_name: string,
    height: number,
    weight: number,
    position: string,
    jersey_number: number,
    date_of_birth: string,
    goals_scored: number,
    team_id: number,
    team: object
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.height = height;
    this.weight = weight;
    this.position = position;
    this.jersey_number = jersey_number;
    this.date_of_birth = date_of_birth;
    this.goals_scored = goals_scored;
    this.team_id = team_id;
    this.team = team;
  }
}
