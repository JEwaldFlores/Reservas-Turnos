import { Router } from "express";
import { cancel, getAllAppointments, getAppointmentById, schedule } from "../controllers/appointmentController";

const appointmentRouter = Router();

appointmentRouter.get("/", getAllAppointments);

appointmentRouter.get("/:id", getAppointmentById);

appointmentRouter.post("/schedule", schedule);

appointmentRouter.put("/cancel/:id", cancel);

export default appointmentRouter;