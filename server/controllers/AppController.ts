import { Request, Response, NextFunction } from "express";
interface ResponseError extends Error {
  status?: number;
}
const AppController = {
  notFound(
    err: ResponseError,
    request: Request,
    respone: Response,
    next: NextFunction
  ) {
    err = new Error("Not Found");
    err.status = 404;
    next(err);
  },
  handleError(
    err: ResponseError,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (err.status !== 404) console.log(err.stack);
    response.status(err.status || 500).json({ err: err.message });
  },
};
export default AppController;
