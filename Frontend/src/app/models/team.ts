export class Team {
  id: number;
  team_name: string;
  team_logo: string;
  team_city: string;
  team_founded_year: number;
  total_players: number;
  max_capacity: number;
  wins: number;
  losses: number;

  constructor(
    id: number,
    team_name: string,
    team_logo: string,
    team_city: string,
    team_founded_year: number,
    total_players: number,
    max_capacity: number,
    wins: number,
    losses: number
  ) {
    this.id = id;
    this.team_name = team_name;
    this.team_logo = team_logo;
    this.team_city = team_city;
    this.team_founded_year = team_founded_year;
    this.total_players = total_players;
    this.max_capacity = max_capacity;
    this.wins = wins;
    this.losses = losses;
  }
}
