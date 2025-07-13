import { Request, Response } from "express";
import { createUserService, findUserByCredentialId, getAllUsersService, getUserByIdService } from "../services/userService";
import IUser from "../interfaces/IUser";
import ICredential from "../interfaces/ICredential";
import { validateCredentialService } from "../services/credentialService";

// GET /users => Obtener el listado de todos los usuarios.
export const getAllUsers = async (req: Request, res: Response) => {
   try {
       const users: IUser[] = await getAllUsersService();
       res.status(200).json (users);
   } catch (error:any) {
      res.status(404).json({message: error.message});
   }
};

// GET /users/:id => Obtener el detalle de un usuario específico.
export const getUserById = async (req: Request<{id:string},{},{}>, res: Response) => {
   const {id} = req.params;
   try {
      const user: IUser = await getUserByIdService (Number(id));
      res.status(200).json(user);
   } catch (error:any) {
       res.status(404).json({message: error.message});
   }
};

// POST /users/register => Registro de un nuevo usuario.
export const register = async (req: Request, res: Response) => {
   try {
      const {name, email, birthdate, nDni, username, password } = req.body;
      const newUser: IUser = await createUserService({
         name, email, birthdate, nDni, username, password
      })
      res.status(200).json(newUser);
   } catch (error:any) {
      res.status(404).json({message: error.message});
   }
};

// POST /users/login => Login del usuario a la aplicación.
export const login = async (req: Request, res: Response) => {
   try {
      const {username, password} = req.body;
      // VALIDAR
      const credential: ICredential = await validateCredentialService({username, password})
      // buscar usuario por credentialId
      const user = await findUserByCredentialId(credential.id);
      res.status(200).json ({
         login: true,
         user,
         // credential,  //QUITAR: SOLO PARA PRUEBA 
      });
   } catch (error:any) {
       res.status(404).json({message: error.message});
   }
   
};