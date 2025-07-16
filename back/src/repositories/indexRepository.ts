import { DataSource } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";

export const credentialRepository = AppDataSource.getRepository(Credential);
export const userRepository = AppDataSource.getRepository(User);
