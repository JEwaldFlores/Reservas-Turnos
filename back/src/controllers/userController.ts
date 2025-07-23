import { Request, Response } from "express";
import { createUserService, findUserByCredentialId, getAllUsersService, getUserByIdService } from "../services/userService";
import { validateCredentialService } from "../services/credentialService";
import { User } from "../entities/User";


// GET /users => Obtener el listado de todos los usuarios.
export const getAllUsers = async (req: Request, res: Response) => {
   try {
       const users: User[] = await getAllUsersService();
       res.status(200).json (users);
   } catch (error) { 
      if(error instanceof Error){
       res.status(404).json({message: error.message});
      } else{
       res.status(500).json({message: "Error Inesperado", error});
      }
   }
};


// GET /users/:id => Obtener el detalle de un usuario específico.
export const getUserById = async (req: Request<{id:string},{},{}>, res: Response) => {
   const {id} = req.params;
   try {
      const user: User | null = await getUserByIdService (Number(id));
      res.status(200).json(user);
   } catch (error) { 
      if(error instanceof Error){
        res.status(404).json({message: error.message});  
      } else {
       res.status(500).json({message: "Error Inesperado", error});
      }
   }
};

                        // *CREDENTIALS* 
// POST /users/register => Registro de un nuevo usuario.
export const register = async (req: Request, res: Response) => {
   try {
      const {name, email, birthdate, nDni, username, password } = req.body;
      await createUserService({
         name, email, birthdate, nDni, username, password
      });
      res.status(201).json({message:"Usuario registrado con éxito"});
   } catch (error) { 
      if(error instanceof Error){
         res.status(400).json({message: error.message});
      } else{
         res.status(500).json({message: "Error Inesperado", error});   
      }
      
   }
};

// POST /users/login => Login del usuario a la aplicación.
export const login = async (req: Request, res: Response) => {
   try {
      const {username, password} = req.body;
      // VALIDAR
      const credentialId: number = await validateCredentialService({username, password})
      // buscar usuario por credentialId
      const user = await findUserByCredentialId(credentialId);
      if (!user) throw new Error ("Usuario no encontrado")
      res.status(200).json ({
         login: true,
         user,
      });
   } catch (error) { 
      if(error instanceof Error){
           res.status(400).json({message: error.message});
      } else {
           res.status(500).json({message: "Error Inesperado", error});
      }
     
   }
};