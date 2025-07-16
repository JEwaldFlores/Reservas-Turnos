import { Router } from "express";
import { getAllUsers, getUserById, login, register } from "../controllers/userController";
import validateUser from "../middlewares/validateUserMiddlewares";
import validateCredential from "../middlewares/validateCredentialMiddleware";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUserById);

userRouter.post("/register", validateUser, register);

userRouter.post("/login", validateCredential, login);

export default userRouter;