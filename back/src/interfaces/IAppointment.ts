export enum AppointmentStatus{
    ACTIVE = "active",
    CANCELLED = "cancelled"
}

interface IAppointment{
    id: number;
    date: string;
    time: string
    status: AppointmentStatus;
    description: string;
    userId: number;
}

export default IAppointment;