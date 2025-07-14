import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

export enum AppointmentStatus{
    ACTIVE = "active",
    CANCELLED = "cancelled"
}

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column()
    time: string;

    @Column({
        type: "enum",
        enum: AppointmentStatus,
        default: AppointmentStatus.ACTIVE
    })
    status: AppointmentStatus;
    
    @Column()
    description: string;

    @ManyToOne(()=> User, user => user.appointments)
    user: User;

}

