import { UserModel } from "../config/data-source";
import ICreateUserDto from "../dtos/ICreateUserDto";
import { User } from "../entities/User";
import { createCredentialService } from "./credentialService";


export const getAllUsersService = async (): Promise<User[]> => {
    const allUsers = await UserModel.find();
    return allUsers;
}

export const getUserByIdService = async (id: number): Promise <User>=> {
     const user = await UserModel.findOne({
        where: {id},
        relations: ["credential", "appointments"],
     })
    if (!user) throw Error ("Usuario no encontrado");
    return user;
};

export const createUserService  = async (createUserDto: ICreateUserDto): Promise<User> =>{
    const {name, email, birthdate, nDni, username, password} = createUserDto;
    
    // Crear credencial 
    const credential = await createCredentialService({username,password});
    // console.log(credential);
    // crear usuario 
    const newUser= UserModel.create ({
        // id: id++,
        name,
        email,
        birthdate,
        nDni,
        credential,
    });
    // users.push(newUser);
    await UserModel.save(newUser);
    return newUser;
};

export const findUserByCredentialId= async (credentialId: number): Promise <User | null> => {
    return await UserModel.findOne({
        where: { credential: {id: credentialId}},
        relations: ["credential"],
    })
};

