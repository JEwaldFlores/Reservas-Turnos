import { AppointmentModel } from "../config/data-source";
import ICreateAppointmentDto from "../dtos/ICreateAppointmentDto";
import { Appointment, AppointmentStatus } from "../entities/Appointment";
import { getUserByIdService } from "./userService";


// Retorna todas las citas 
export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
  const allAppointments: Appointment[] = await AppointmentModel.find()
    return allAppointments;
};
// obtener cita por Id
export const getAppointmentByIdService = async (id: number): Promise <Appointment> =>{
    const appointment: Appointment | null = await AppointmentModel.findOneBy({id})
    if (!appointment) throw Error("Cita no encontrada");
    return appointment;
};

// crear una nueva cita, guardarla con el id del ususario que la creo 
export const scheduleAppointmentService = async (createAppointmentDto: ICreateAppointmentDto) : Promise <Appointment>=> {
 const {date, time, description, userId} = createAppointmentDto
  const user = await getUserByIdService(userId);
//   no puede haber una cita si el usuario no existe
  if (!user) throw new Error("Usuario no válido");

 const newAppointment: Appointment = AppointmentModel.create({ 
    date,
    time,
    description,
    status: AppointmentStatus.ACTIVE,
    user,
  });
  await AppointmentModel.save (newAppointment);
  return newAppointment;
};
   // cancelar la cita 
export const cancelAppointmentService = async (id: number): Promise<void> => {
  const appointment: Appointment | null = await AppointmentModel.findOneBy({id});
  if (!appointment) throw Error(`No existe turno con id: ${id}`);

  appointment.status = AppointmentStatus.CANCELLED;
  await AppointmentModel.save (appointment);
  return;
};