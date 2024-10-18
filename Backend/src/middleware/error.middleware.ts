import { NextFunction, Request, Response } from "express";

//  Centralized place to handle errors
//  Checks the type of errors and throws an apprioriate response.
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(`${error.name}: ${error.message}`);
	if (error.name === "QueryFailedError") {
		return res.status(400).json({ error: error.message });
	}
	if (error.name === "EntityPropertyNotFoundError") {
		return res.status(400).json({ error: error.message });
	}
	if (error.name === "SyntaxError") {
		return res.status(400).json({ error: "Invalid Body" });
	}
	// return res.status(500).json({ message: "Internal server error" });
	return res.status(500).send(error);
};
