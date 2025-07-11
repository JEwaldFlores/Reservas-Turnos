import { Router } from "express";
import { getAllUsers, getUserById, login, register } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUserById);

userRouter.post("/register", register);

userRouter.post("/login", login);

export default userRouter;