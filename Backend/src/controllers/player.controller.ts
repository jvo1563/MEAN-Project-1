const router = require("express").Router();
import { Request, Response } from "express";
import { Player } from "../entity/Player";
import { AppDataSource } from "../data-source";

router.get("/", async (req: Request, res: Response) => {
	const playerRepository = AppDataSource.getRepository(Player);
	await playerRepository
		.find()
		.then((players) => {
			return res.status(200).json(players);
		})
		.catch((error) => {
			return res.status(500).send(error);
		});
});

router.get("/:id", async (req: Request, res: Response) => {
	const playerRepository = AppDataSource.getRepository(Player);
	await playerRepository
		.findOne({
			where: {
				id: parseInt(req.params.id),
			},
		})
		.then((player) => {
			if (player) {
				return res.status(200).json(player);
			}
			return res.status(404).json({ message: "Player not found" });
		})
		.catch((error) => {
			return res.status(500).send(error);
		});
});
export const playerRouter = router;
