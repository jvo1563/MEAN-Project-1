const router = require("express").Router();
import { Request, Response, NextFunction } from "express";
import { Player } from "../entity/Player";
import { AppDataSource } from "../data-source";

// Route to get all players
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	const playerRepository = AppDataSource.getRepository(Player);
	await playerRepository
		.find()
		.then((players) => {
			return res.status(200).json(players);
		})
		.catch((error) => next(error));
});

// Route to get a specific player by ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
	const playerRepository = AppDataSource.getRepository(Player);
	const playerId = parseInt(req.params.id);

	await playerRepository
		.findOne({
			where: {
				id: playerId,
			},
		})
		.then((player) => {
			if (player) {
				return res.status(200).json(player);
			}
			return res.status(404).json({ message: "Player not found" });
		})
		.catch((error) => next(error));
});

// Route to create a new player
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const playerRepository = AppDataSource.getRepository(Player);
	await playerRepository
		.save(req.body)
		.then((player) => {
			return res.status(201).json(player);
		})
		.catch((error) => next(error));
});

// Route to update an existing player by ID
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
	const playerRepository = AppDataSource.getRepository(Player);
	const playerId = parseInt(req.params.id);

	// Prevent changing the player ID in the request body
	if (req.body.id && req.body.id != playerId) {
		return res.status(400).json({ message: "Player ID cannot be changed" });
	}

	await playerRepository
		.createQueryBuilder()
		.update(Player)
		.set(req.body)
		.where("id = :id", { id: playerId })
		.returning("*")
		.execute()
		.then((results) => {
			if (results.raw.length > 0) {
				return res.status(200).json(results.raw[0]);
			}
			return res.status(404).json({ message: "Player not found" });
		})
		.catch((error) => next(error));
});

// Route to delete a player by ID
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
	const playerRepository = AppDataSource.getRepository(Player);
	const playerId = parseInt(req.params.id);

	await playerRepository
		.delete({
			id: playerId,
		})
		.then((player) => {
			return res.status(204).send();
		})
		.catch((error) => next(error));
});

export const playerRouter = router;
