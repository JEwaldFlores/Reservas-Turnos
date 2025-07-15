import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

export enum AppointmentStatus{
    ACTIVE = "active",
    CANCELLED = "cancelled"
}

@Entity({
    name: "appointments"
})

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

    @ManyToOne(()=> User, (user) => user.appointments)
    @JoinColumn ({name: "user_id"})
    user: User;

}

