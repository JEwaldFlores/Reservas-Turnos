
import { IScheduleCreateAppointmentDto } from "../dtos/ICreateAppointmentDto";
import { Appointment, AppointmentStatus } from "../entities/Appointment";
import { User } from "../entities/User";
import { appointmentRepository, userRepository } from "../repositories/indexRepository";



// Retorna todas las citas 
export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
  const allAppointments: Appointment[] = await appointmentRepository.find()
  return allAppointments;
};
// obtener cita por Id
export const getAppointmentByIdService = async (turnId: number): Promise <Appointment> =>{
    const appointment: Appointment | null = await appointmentRepository.findOneBy({id: turnId})
    if (!appointment) throw Error("Turno no encontrado");
    return appointment;
};

// crear una nueva cita, guardarla con el id del ususario que la creo 
export const scheduleAppointmentService = async (scheduleAppointmentDto: IScheduleCreateAppointmentDto) : Promise <Appointment>=> {
 const {date, time, description, userId} = scheduleAppointmentDto

//  verificamos que exista el usuario
 const user: User | null = await userRepository.findOneBy({id: userId})
  if (!user) throw Error(`No existe usuario con id: ${userId}`);

// creamos el nuevo turno 
 const newAppointment: Appointment = appointmentRepository.create({ 
    date, time, description,
  });
//asociamos el usuario al turno creado 
newAppointment.user = user;
// guardamos el turno en la base de datos
  await appointmentRepository.save (newAppointment);
  return newAppointment;
};


   // cancelar la cita 
export const cancelAppointmentService = async (turnId: number): Promise<void> => {
  const appointment: Appointment | null = await appointmentRepository.findOneBy({id: turnId});
  if (!appointment) throw Error(`No existe turno con id: ${turnId}`);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const appointmentDate = new Date(appointment.date);
  appointmentDate.setHours(0, 0, 0, 0);

  if(appointmentDate <= today){
    throw new Error ("🚩El turno solo puede cancelarse hasta el dia anterior a la cita");
  }

  appointment.status = AppointmentStatus.CANCELLED;
  await appointmentRepository.save (appointment);
  return;
};