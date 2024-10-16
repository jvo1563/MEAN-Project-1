const router = require("express").Router();
import { Request, Response, NextFunction } from "express";
import { Coach } from "../entity/Coach";
import { AppDataSource } from "../data-source";

// Route to get all coaches
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	const coachRepository = AppDataSource.getRepository(Coach);
	await coachRepository
		.find()
		.then((coaches) => {
			return res.status(200).json(coaches);
		})
		.catch((error) => next(error));
});

// Route to get a specific coach by ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
	const coachRepository = AppDataSource.getRepository(Coach);
	const coachId = parseInt(req.params.id);

	await coachRepository
		.findOne({
			where: {
				id: coachId,
			},
		})
		.then((coach) => {
			if (coach) {
				return res.status(200).json(coach);
			}
			return res.status(404).json({ message: "Coach not found" });
		})
		.catch((error) => next(error));
});

// Route to create a new coach
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const coachRepository = AppDataSource.getRepository(Coach);
	await coachRepository
		.save(req.body)
		.then((coach) => {
			return res.status(201).json(coach);
		})
		.catch((error) => next(error));
});

// Route to update an existing coach by ID
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
	const coachRepository = AppDataSource.getRepository(Coach);
	const coachId = parseInt(req.params.id);

	// Prevent changing the coach ID in the request body
	if (req.body.id && req.body.id != coachId) {
		return res.status(400).json({ message: "Coach ID cannot be changed" });
	}

	await coachRepository
		.createQueryBuilder()
		.update(Coach)
		.set(req.body)
		.where("id = :id", { id: coachId })
		.returning("*")
		.execute()
		.then((results) => {
			if (results.raw.length > 0) {
				return res.status(200).json(results.raw[0]);
			}
			return res.status(404).json({ message: "Coach not found" });
		})
		.catch((error) => next(error));
});

// Route to delete a coach by ID
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
	const coachRepository = AppDataSource.getRepository(Coach);
	const coachId = parseInt(req.params.id);

	await coachRepository
		.delete({
			id: coachId,
		})
		.then((coach) => {
			return res.status(204).send();
		})
		.catch((error) => next(error));
});

export const coachRouter = router;
