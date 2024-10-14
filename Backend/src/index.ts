import { AppDataSource } from "./data-source";
import { teamRouter } from "./controllers/team.controllers";
import { playerRouter } from "./controllers/player.controller";
import { coachRouter } from "./controllers/coach.controller";
import { unknownEndpoint } from "./middleware/unknown-endpoint.middleware";
import { errorHandler } from "./middleware/error.middleware";

const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors({ origin: process.env.CORS_WHITELIST.split(",") }));

app.use("/api/team", teamRouter);
app.use("/api/player", playerRouter);
app.use("/api/coach", coachRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
AppDataSource.initialize()
	.then(async () => {
		app.listen(PORT, () => {
			console.log("Server is running on http://localhost:" + PORT);
		});
		console.log("Data Source has been initialized!");
	})
	.catch((error) => console.log(error));
