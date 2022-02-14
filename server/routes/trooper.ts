import { Router, Request, Response, NextFunction } from "express";
import controller from "../controllers/Stormtrooper";
import verifyId from "../middleware/verifyId";
// import { getAsync } from "../config/redis";

const trooperRoutes = Router();
// const fromCache = (request:Request, response:Response, next: NextFunction) => {
//   getAsync(`trooper:${request.params.id}`)
//   .then((result:string) => {
//     if(!result)return next()
//     response.send(JSON.parse(result))
//   })
//   .catch((_:object) => next())
// }

trooperRoutes.get("/", controller.list);
trooperRoutes.get("/:id", verifyId, /**fromCache */ controller.byId);
trooperRoutes.post("/", controller.create);
trooperRoutes.put("/:id", verifyId, controller.updateById);
trooperRoutes.delete("/:id", verifyId, controller.deletebyId);

export default trooperRoutes;
