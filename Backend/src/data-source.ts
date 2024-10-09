import "reflect-metadata";
import { DataSource } from "typeorm";

import { Team } from "./entity/Team";
import { Coach } from "./entity/Coach";
import { Player } from "./entity/Player";

require("dotenv").config();

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || "5432"),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	synchronize: false,
	logging: process.env.NODE_ENV === "dev" ? true : false,
	entities: [Team, Coach, Player],
	migrations: [],
	subscribers: [],
});
