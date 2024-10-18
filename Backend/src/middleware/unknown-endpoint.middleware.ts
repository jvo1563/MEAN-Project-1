import { Request, Response } from "express";

// Returns 404 Unknwon endpoint is the route is not found
export const unknownEndpoint = (request: Request, response: Response) => {
	response.status(404).send({ error: "Unknown Endpoint" });
};
