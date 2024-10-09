import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Team } from "./Team";

@Entity()
export class Player {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", length: 255 })
	first_name: string;

	@Column({ type: "varchar", length: 255 })
	last_name: string;

	@Column({ type: "numeric", precision: 4, scale: 2, nullable: true })
	height: number;

	@Column({ type: "numeric", precision: 5, scale: 2, nullable: true })
	weight: number;

	@Column({ type: "varchar", length: 50, nullable: true })
	position: string;

	@Column({ type: "int", nullable: true })
	jersey_number: number;

	@Column({ type: "date", nullable: true })
	date_of_birth: string;

	@Column({ type: "int", default: 0 })
	goals_scored: number;

	@ManyToOne(() => Team, (team) => team.players, { nullable: true, onDelete: "SET NULL" })
	@JoinColumn({ name: "team_id" })
	team: Team;
}
