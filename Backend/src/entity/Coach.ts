import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Team } from "./Team";

@Entity()
export class Coach {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", length: 255 })
	first_name: string;

	@Column({ type: "varchar", length: 255 })
	last_name: string;

	@Column({ type: "int", nullable: true })
	years_of_experience: number;

	@Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
	salary: number;

	@Column({ type: "varchar", length: 255, nullable: true })
	email: string;

	@Column({ type: "varchar", length: 15, nullable: true })
	phone_number: string;

	@Column({ type: "int" })
	team_id: number;

	@ManyToOne(() => Team, (team) => team.coaches, { nullable: true, onDelete: "SET NULL", eager: true })
	// @ManyToOne(() => Team, (team) => team.coaches, { nullable: true, onDelete: "SET NULL" })
	@JoinColumn({ name: "team_id" })
	team: Team;
}
