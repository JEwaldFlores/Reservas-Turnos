import { Router } from "express";
import { cancel, getAllAppointments, getAppointmentById, schedule } from "../controllers/appointmentController";
import validateAppointment from "../middlewares/validateAppointmentMiddlewares";

const appointmentRouter = Router();

appointmentRouter.get("/", getAllAppointments);

appointmentRouter.get("/:turnId", getAppointmentById);

appointmentRouter.post("/schedule", validateAppointment, schedule);

appointmentRouter.put("/cancel/:turnId", cancel);

export default appointmentRouter;