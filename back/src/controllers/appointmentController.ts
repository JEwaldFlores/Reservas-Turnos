import { Request, Response } from "express";

// GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.
export const getAllAppointments = async (req: Request, res: Response) => {
   res.status(200).json ({mesagge: "Obtener el listado de todos los turnos de todos los usuarios."});
}
// GET /appointments/:id => Obtener el detalle de un turno específico.
export const getAppointmentById = async (req: Request, res: Response) => {
   res.status(200).json ({mesagge: " Obtener el detalle de un turno específico."});
}
// POST /appointments/schedule => Agendar un nuevo turno.
export const schedule = async (req: Request, res: Response) => {
   res.status(200).json ({mesagge: "Agendar un nuevo turno."});
}

// PUT /appointments/cancel => Cambiar el estatus de un turno a “cancelled”.
export const cancel = async (req: Request, res: Response) => {
   res.status(200).json ({mesagge: "Cambiar el estatus de un turno a “cancelled”."});
}