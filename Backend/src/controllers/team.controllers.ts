const router = require("express").Router();
import { Request, Response, NextFunction } from "express";
import { Team } from "../entity/Team";
import { AppDataSource } from "../data-source";

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	const teamRepository = AppDataSource.getRepository(Team);
	await teamRepository
		.find()
		.then((teams) => {
			return res.status(200).json(teams);
		})
		.catch((error) => next(error));
});

router.get("/:team_id", async (req: Request, res: Response, next: NextFunction) => {
	const teamRepository = AppDataSource.getRepository(Team);
	const teamId = parseInt(req.params.team_id);

	await teamRepository
		.findOne({
			where: {
				id: teamId,
			},
		})
		.then((team) => {
			if (team) {
				return res.status(200).json(team);
			}
			return res.status(404).json({ message: "Team not found" });
		})
		.catch((error) => next(error));
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const teamRepository = AppDataSource.getRepository(Team);
	await teamRepository
		.save(req.body)
		.then((team) => {
			return res.status(201).json(team);
		})
		.catch((error) => next(error));
});

router.put("/:team_id", async (req: Request, res: Response, next: NextFunction) => {
	const teamRepository = AppDataSource.getRepository(Team);
	const teamId = parseInt(req.params.team_id);

	if (req.body.team_id && req.body.team_id != teamId) {
		return res.status(400).json({ message: "Team ID cannot be changed" });
	}

	await teamRepository
		.createQueryBuilder()
		.update(Team)
		.set(req.body)
		.where("team_id = :id", { id: teamId })
		.returning("*")
		.execute()
		.then((results) => {
			if (results.raw.length > 0) {
				return res.status(200).json(results.raw[0]);
			}
			return res.status(404).json({ message: "Team not found" });
		})
		.catch((error) => next(error));
});

router.delete("/:team_id", async (req: Request, res: Response, next: NextFunction) => {
	const teamRepository = AppDataSource.getRepository(Team);
	const teamId = parseInt(req.params.team_id);

	await teamRepository
		.delete({
			id: teamId,
		})
		.then((team) => {
			return res.status(204).send();
		})
		.catch((error) => next(error));
});

export const teamRouter = router;
