import { Router, Request, Response, NextFunction } from "express";
import trooperRoutes from "./trooper";
import createError from "http-errors";
import jwt from "jwt-simple";
import moment from "moment";
import config from "config";

const routes = Router();

routes.post(
  "/login",
  (request: Request, response: Response, next: NextFunction) => {
    const { username, password } = request.body;
    if (username === "rebels" && password === "1138") {
      const token = jwt.encode(
        {
          user: username,
          exp: moment().add(7, "days").valueOf(),
        },
        config.get("jwtTokenSecret")
      );
      return response.json({ token });
    }
    next(createError(401, "Unauthorized"));
  }
);

const verifyJwt = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token: any = request.query.token || request.headers["x-token"];
  if (!token) {
    return next(createError(401, "Unauthorized"));
  }
  try {
    const decoded = jwt.decode(token, config.get("jwtTokenSecret"));
    const isExpired = moment(decoded.exp).isBefore(new Date());
    if (isExpired) {
      next(createError(401, "Unauthorized"));
    } else {
      request.body.user = decoded.user;
      next();
    }
  } catch (error) {
    return next(error);
  }
};

routes.use("/troopers", verifyJwt, trooperRoutes);
export default routes;
