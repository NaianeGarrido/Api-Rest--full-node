import createError from "http-errors";
import { Request, Response, NextFunction } from "express";
const verifyId = (request: Request, response: Response, next: NextFunction) => {
  const id = request.params.id;
  if (!/^[0-9a-f]{24}$/.test(id)) {
    return next(createError(422, "invalid id"));
  }
  next();
};
export  default verifyId ;
