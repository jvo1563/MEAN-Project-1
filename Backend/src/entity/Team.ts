import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Player } from "./Player";
import { Coach } from "./Coach";

@Entity()
export class Team {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", length: 255, unique: true })
	team_name: string;

	@Column({ type: "text", nullable: true })
	team_logo: string;

	@Column({ type: "varchar", length: 100, nullable: true })
	team_city: string;

	@Column({ type: "int", nullable: true })
	team_founded_year: number;

	@Column({ type: "int", default: 0 })
	total_players: number;

	@Column({ type: "int", default: 20 })
	max_capacity: number;

	@Column({ type: "int", default: 0 })
	wins: number;

	@Column({ type: "int", default: 0 })
	losses: number;

	@OneToMany(() => Player, (player) => player.team)
	players: Player[];

	@OneToMany(() => Coach, (coach) => coach.team)
	coaches: Coach[];
}
