import { Router } from "express";
import { getAllUsers, getUserById, login, register } from "../controllers/userController";
import { cancel, getAllAppointments, getAppointmentById, schedule } from "../controllers/appointmentController";

const appointmentRouter = Router();

appointmentRouter.get("/", getAllAppointments);

appointmentRouter.get("/:id", getAppointmentById);

appointmentRouter.post("/schedule", schedule);

appointmentRouter.put("/cancel", cancel);

export default appointmentRouter;