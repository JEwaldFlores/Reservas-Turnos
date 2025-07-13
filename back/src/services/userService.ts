import ICreateUserDto from "../dtos/ICreateUserDto";
import IUser from "../interfaces/IUser";
import { createCredentialService } from "./credentialService";
const users: IUser[] = [
    {
        id: 1,
        name: "Ana Martínez",
        email: "ana.martinez@example.com",
        birthdate: "1990-05-12",
        nDni: 45678901,
        credentialsId: 1
    },
    {
        id: 2,
        name: "Carlos Pérez",
        email: "carlos.perez@example.com",
        birthdate: "1985-11-03",
        nDni: 12345678,
        credentialsId: 2
    },
    {
        id: 3,
        name: "Lucía Gómez",
        email: "lucia.gomez@example.com",
        birthdate: "1993-07-21",
        nDni: 23456789,
        credentialsId: 3
    },
    {
        id: 4,
        name: "Mario Rodríguez",
        email: "mario.rodriguez@example.com",
        birthdate: "1988-01-17",
        nDni: 34567890,
        credentialsId: 4
    },
    {
        id: 5,
        name: "Sofía Herrera",
        email: "sofia.herrera@example.com",
        birthdate: "1995-09-30",
        nDni: 56789012,
        credentialsId: 5
    }
];
let id: number = 10;

export const getAllUsersService = async () => {
    const allUsers: IUser[] = users;
    return allUsers;
};

export const getUserByIdService = async (id: number) => {
     const user: IUser | undefined = users.find(user => user.id === id);
    if (!user) throw Error ("Usuario no encontrado");
    return user;
};

export const createUserService  = async (createUserDto: ICreateUserDto): Promise<IUser> =>{
    const {name, email, birthdate, nDni, username, password} = createUserDto;
    
    // Crear credencial 
    const newCredential = await createCredentialService({username,password});
    console.log(newCredential);
    // crear usuario 
    const newUser: IUser ={
        id: id++,
        name,
        email,
        birthdate,
        nDni,
        credentialsId: newCredential.id
    }
    users.push(newUser);
    return newUser;
};

export const findUserByCredentialId= async (credentialId: number) => {
    const user: IUser | undefined= users.find(user => user.id === credentialId);
    return user;
};

