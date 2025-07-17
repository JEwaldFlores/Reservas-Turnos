import { Request, Response } from "express";
import { Appointment } from "../entities/Appointment";
import { cancelAppointmentService, getAllAppointmentsService, getAppointmentByIdService, scheduleAppointmentService } from "../services/appointmentService";

// GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.
export const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
   try {
      const allAppointments: Appointment[] = await getAllAppointmentsService();
      res.status(200).json(allAppointments);
   } catch (error) { 
      if(error instanceof Error){
         res.status(404).json ({message: error.message});
      } else {
         res.status(500).json ({message: "Error Inesperado", error});
      }
   }
};
// GET /appointments/:id => Obtener el detalle de un turno específico.
export const getAppointmentById = async (req: Request <{turnId: string}, {}, {}>, res: Response): Promise <void> => {
   const {turnId} = req.params;
   try {
   const appointment = await getAppointmentByIdService (Number(turnId));
      res.status(200).json(appointment);
   } catch (error) { 
      if(error instanceof Error){
       res.status(404).json ({message: error.message});
      } else {
         res.status(500).json ({message: "Error Inesperado", error});
      }
   }
};

// POST /appointments/schedule => Agendar un nuevo turno.
export const schedule = async (req: Request, res: Response): Promise <void> => {
   const {date, time, description, userId} = req.body;
   try {
      const newAppointment: Appointment = await scheduleAppointmentService({
         date, time, description, userId,
      })
      res.status(201).json(newAppointment);
   } catch (error) { 
      if(error instanceof Error){
       res.status(400).json ({message: error.message});
      } else {
         res.status(500).json ({message: "Error Inesperado", error});
      }
   }
   
};

// PUT /appointments/cancel/:id => Cambiar el estatus de un turno a “cancelled”.
export const cancel = async (req: Request <{turnId: string}, {}, {}>, res: Response): Promise <void> => {
    const { turnId } = req.params;
   try {   
   await cancelAppointmentService (Number(turnId));  
    res.status(200).json({message:`Turno con id: ${turnId} cancelado`});  
   } catch (error) { 
      if(error instanceof Error){
       res.status(404).json ({message: error.message});
      } else {
          res.status(500).json ({message: "Error Inesperado", error});
      }
   }
  
};


