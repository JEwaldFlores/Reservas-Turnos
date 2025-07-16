
import ICreateUserDto from "../dtos/ICreateUserDto";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import { userRepository } from "../repositories/indexRepository";
import { createCredentialService } from "./credentialService";


export const getAllUsersService = async (): Promise<User[]> => {
    const allUsers: User [] = await userRepository.find({
        relations:{appointments:true},
    });
    return allUsers;
}

export const getUserByIdService = async (id: number): Promise <User | null> => {
    const user: User| null = await userRepository.findOne({
        where: {id},
        relations: [ "appointments"],
     });
        if (!user) throw new Error (`Usuario con id ${id} no encontrado`);
        return user;
};

export const createUserService  = async (createUserDto: ICreateUserDto) => {
    const {name, email, birthdate, nDni, username, password} = createUserDto;

    // verificamos que el usuario no se ecuentre registrado
    const foundUser: User | null = await userRepository.findOneBy({email});
    if (foundUser)
        throw new Error (`El email ${email} ya se encuentra registrado`);

    // Crear credencial 
    const newCredential: Credential = await createCredentialService({username,password});
   
    // crear usuario 
    const newUser: User = userRepository.create ({
        name, email, birthdate,nDni,
    });
    await userRepository.save(newUser);
    // asociamos "credencial" al usuario y guardamos en base de datos
    newUser.credential = newCredential;
    await userRepository.save(newUser)
    return newUser;
};

export const findUserByCredentialId= async (credentialId: number): Promise <User | null> => {
    // verificamos que exista el usuario 
    const user: User | null = await userRepository.findOneBy ({
        credential: {id: credentialId},
    });
    if (!user) throw new Error (`Usuario con ${credentialId} no encontrado`);
    return user;
};

