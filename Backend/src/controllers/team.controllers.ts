const router = require("express").Router();
import { Request, Response, NextFunction } from "express";
import { Team } from "../entity/Team";
import { AppDataSource } from "../data-source";

// Get all
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	const teamRepository = AppDataSource.getRepository(Team);
	await teamRepository
		.find()
		.then((teams) => {
			return res.status(200).json(teams);
		})
		.catch((error) => next(error));
});

// Get by ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
	const teamRepository = AppDataSource.getRepository(Team);
	const teamId = parseInt(req.params.id);

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

// POST
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const teamRepository = AppDataSource.getRepository(Team);
	await teamRepository
		.save(req.body)
		.then((team) => {
			return res.status(201).json(team);
		})
		.catch((error) => next(error));
});

// UPDATE
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
	const teamRepository = AppDataSource.getRepository(Team);
	const teamId = parseInt(req.params.id);

	// Prevent changing of id
	if (req.body.id && req.body.id != teamId) {
		return res.status(400).json({ message: "Team ID cannot be changed" });
	}

	await teamRepository
		.createQueryBuilder()
		.update(Team)
		.set(req.body)
		.where("id = :id", { id: teamId })
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

// Delete
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
	const teamRepository = AppDataSource.getRepository(Team);
	const teamId = parseInt(req.params.id);

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
