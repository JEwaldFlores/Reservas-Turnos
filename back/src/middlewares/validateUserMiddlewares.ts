import { NextFunction, Request, Response } from "express";
import ICreateUserDto from "../dtos/ICreateUserDto";


const validateUser = (
    req: Request <{}, {}, ICreateUserDto>,
    res: Response,
    next: NextFunction
) => {
    const {name, email, birthdate, nDni, username, password}= req.body
    try {
       
        if(!name) throw new Error("El campo name es obligatorio");
        if (name.length < 3) throw new Error( "El campo name debe tener al menos 3 caracteres");
        if (name.length > 50) throw new Error( "El campo name debe tener máximo 50 caracteres");
        const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        if (!nameRegex.test(name)) 
        throw new Error("El campo name solo puede contener letras y espacios");

     
        if(!email)  throw Error ("El campo mail es requerido");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email))
        throw new Error ("El campo email debe ser un email válido");

       
        if(!birthdate) throw Error ("El campo de birthdate es requerido");
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(birthdate)) throw new Error ("El campo birthdate debe estar en formato yyyy-mm-dd");
        const today = new Date();
        today.setHours (0, 0, 0, 0);
        const birthdateDate = new Date (birthdate);
        const ageDiff=
            new Date(today.getTime()- birthdateDate.getTime());
        const age = ageDiff.getUTCFullYear() - 1970;
        if(age < 16) throw new Error("La persona debe ser mayor a 16 años");

    
        if(!nDni) throw new Error("El campo nDni es obligatorio");
        if(typeof nDni !== "number") throw new Error("El campo nDni debe ser un número");
        if(nDni < 0) throw new Error("El campo nDni debe ser un número");

   
        if(!username) throw new Error ("El campo username es requerido");
        if(username.length < 4) throw new Error ("El campo username debe tener al menos 4 caracteres");
        if(username.length > 20) throw new Error ("El campo username debe tener como máximo 20 caracteres");

        
        if(!password) throw new Error ("El campo password es requerido");
        if(password.length < 4) throw new Error ("El campo password debe tener al menos 4 caracteres");
        if(password.length > 10) throw new Error ("El campo password debe tener máximo 10 caracteres");
        const passwordRegex = 
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%?&#])[A-Za-z\d@$!%*?&#]+$/;
        if (!passwordRegex.test(password))
        throw new Error ("Credenciales No Coinciden");
    } catch (error) {
        if (error instanceof Error){
            return res.status(400).json({error: error.message});
        }
    }
        next();
};
    export default validateUser;








