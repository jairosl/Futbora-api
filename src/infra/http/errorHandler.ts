import { ErrorRequestHandler } from "express";
import { ApplicationError } from "../../domain/errors/CustomError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  if(err instanceof ApplicationError) {
    res.status(err.statusCode)
    res.json({ message: err.message });
  }
  res.status(500).json({ message: err.message })
};