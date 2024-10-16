export class Coach {
  id: number;
  first_name: string;
  last_name: string;
  years_of_experience: number;
  salary: number;
  email: string;
  phone_number: string;
  team_id: number;
  team: any;
  constructor(
    id: number,
    first_name: string,
    last_name: string,
    years_of_experience: number,
    salary: number,
    email: string,
    phone_number: string,
    team_id: number,
    team: object
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.years_of_experience = years_of_experience;
    this.salary = salary;
    this.email = email;
    this.phone_number = phone_number;
    this.team_id = team_id;
    this.team = team;
  }
}
