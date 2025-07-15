import { Request, Response } from "express";
import { Appointment } from "../entities/Appointment";
import { cancelAppointmentService, getAllAppointmentsService, getAppointmentByIdService, scheduleAppointmentService } from "../services/appointmentService";

// GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.
export const getAllAppointments = async (req: Request, res: Response) => {
   try {
      const appointments: Appointment[] = await getAllAppointmentsService();
      res.status(200).json(appointments);
   } catch (error:any) {
         res.status(404).json ({message: error.message});
   }
}
// GET /appointments/:id => Obtener el detalle de un turno específico.
export const getAppointmentById = async (req: Request <{id: string}>, res: Response) => {
   const {id} = req.params;
   try {
   const appointment: Appointment = await getAppointmentByIdService (Number(id));
      res.status(200).json(appointment);
   } catch (error: any) {
       res.status(404).json ({message: error.message});
   }
}
// POST /appointments/schedule => Agendar un nuevo turno.
export const schedule = async (req: Request, res: Response) => {
   try {
      const newAppointment: Appointment = await scheduleAppointmentService(req.body);
      res.status(201).json(newAppointment);
   } catch (error: any) {
      res.status(400).json ({message: error.message});
   }
   
}

// PUT /appointments/cancel/:id => Cambiar el estatus de un turno a “cancelled”.
export const cancel = async (req: Request <{id: string}>, res: Response) => {
    const { id } = req.params;
   try {   
      const cancelledAppointment= await cancelAppointmentService (Number(id));  
    res.status(200).json(cancelledAppointment);
      
   } catch (error: any) {
       res.status(404).json ({message: error.message});
   }
  
}


// // GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.
// export const getAllAppointments = async (req: Request, res: Response) => {
//    res.status(200).json ({message: "Obtener el listado de todos los turnos de todos los usuarios."});
// }
// // GET /appointments/:id => Obtener el detalle de un turno específico.
// export const getAppointmentById = async (req: Request, res: Response) => {
//    res.status(200).json ({message: " Obtener el detalle de un turno específico."});
// }
// // POST /appointments/schedule => Agendar un nuevo turno.
// export const schedule = async (req: Request, res: Response) => {
//    res.status(200).json ({message: "Agendar un nuevo turno."});
// }

// // PUT /appointments/cancel => Cambiar el estatus de un turno a “cancelled”.
// export const cancel = async (req: Request, res: Response) => {
//    res.status(200).json ({message: "Cambiar el estatus de un turno a “cancelled”."});
// }