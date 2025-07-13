import ICreateAppointmentDto from "../dtos/ICreateAppointmentDto";
import IAppointment, {AppointmentStatus} from "../interfaces/IAppointment";
import { getUserByIdService } from "./userService";

const appointments: IAppointment[] = [
  {
    id: 1,
    date: "2025-07-12",
    time: "10:00",
    status: AppointmentStatus.ACTIVE,
    description: "Consulta general",
    userId: 1
  },
  {
    id: 2,
    date: "2025-07-15",
    time: "14:30",
    status: AppointmentStatus.ACTIVE,
    description: "Chequeo odontológico",
    userId: 2
  }
];

let nextId = 3
// Retorna todas las citas 
export const getAllAppointmentsService = async (): Promise<IAppointment []> => {
    return appointments;
};
// obtener cita por Id
export const getAppointmentByIdService = async (id: number): Promise <IAppointment> =>{
    const appointment = appointments.find(appointment=> appointment.id === id);
    if (!appointment) throw new Error("Cita no encontrada");
    return appointment;
};

// crear una nueva cita, guardarla con el id del ususario que la creo 
export const scheduleAppointmentService = async (createAppointmentDto: ICreateAppointmentDto) => {
 const {date, time, description, userId} = createAppointmentDto
  const user = await getUserByIdService(createAppointmentDto.userId);
//   no puede haber una cita si el usuario no existe
  if (!user) throw new Error("Usuario no válido");

  const newAppointment: IAppointment = {
    id: nextId++,
    date,
    time,
    description,
    status:AppointmentStatus.ACTIVE,
    userId: createAppointmentDto.userId
  };
  appointments.push(newAppointment);
  return newAppointment;
};
   // cancelar la cita 
export const cancelAppointmentService = async (id: number): Promise<IAppointment> => {
  const appointment = appointments.find(appointment => appointment.id === id);
  if (!appointment) throw new Error("Cita no encontrada");

  appointment.status = AppointmentStatus.CANCELLED;
  return appointment;
};