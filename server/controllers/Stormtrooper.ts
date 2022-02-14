import repository from "../repository/Stormtrooper";
import createError from "http-errors";
import { Request, Response, NextFunction, response } from "express";
import { handleNotFound } from "./util";



const Stormtrooper = {
  list(request: Request, response: Response, next: NextFunction) {
    const { q, page } = request.params;
    repository
      .list(q, page)
      .then((result: object) => response.status(200).json(result))
      .catch(next);
  },
  async byId(request: Request, response: Response, next: NextFunction) {
    await repository
      .byId(request.params.id)
      .then(handleNotFound)
      .then((result: object) => response.status(200).json(result))
      .catch(next);
  },
  async create(request: Request, response: Response, next: NextFunction) {
    await repository
      .create(request.body)
      .then((result: object) => response.status(200).json(result))
      .catch(next);
  },
  async updateById(request: Request, response: Response, next: NextFunction) {
    await repository
      .updateById(request.params.id, request.body)
      .then((result: object) => response.status(200).json(result))
      .catch(next);
  },
  deletebyId(request: Request, response: Response, next: NextFunction) {
    repository
      .deleteById(request.params.id)
      .then((_: Object) => response.sendStatus(204))
      .catch(next);
  },
};
export default Stormtrooper;
