import cors from "cors";
import morgan from "morgan";
import express, { Request, Response } from "express";
import indexRouter from "./routes";

const server = express();

// MIDDLEWARES
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

server.use(indexRouter);

server.get ("/", ( req: Request, res: Response,) => {
res.send ("Hola Mundo!");
});



export default server; 