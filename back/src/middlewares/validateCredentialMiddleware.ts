import { NextFunction, Response, Request } from "express";
import ICreateCredentialDto from "../dtos/ICreateCredentialDto";


const validateCredential = (
    req: Request <{}, {}, ICreateCredentialDto>,
    res: Response,
    next: NextFunction

) =>{
    const { username, password} = req.body;
    try {
        if(!username) throw new Error ("El campo username es requerido");
        if(!password) throw new Error ("El campo password es requerido");
        if(password.length < 4) throw new Error ("El campo password debe tener al menos 4 caracteres");
        if(password.length > 10) throw new Error ("El campo password debe tener máximo 10 caracteres");
        const passwordRegex = 
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%?&#])[A-Za-z\d@$!%*?&#]+$/;
        if (!passwordRegex.test(password))
        throw new Error ("Credenciales No coinciden");
        
    } catch (error) {
        if (error instanceof Error){
            return res.status(400).json({error: error.message});
        }
        
    }
    next();
};
    export default validateCredential;
