/** importando modulos */
import Express from "express";
import cors from "cors";
import routes from "./routes/index";
import AppController from "./controllers/AppController";
import { Request, Response, NextFunction } from "express";

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(routes);

//CORS de forma manual
app.use((request: Request, response: Response, next: NextFunction) => {
  response.header("Access-Controll-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(AppController.notFound)
app.use(AppController.handleError);

export default app;
