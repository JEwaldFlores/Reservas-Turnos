import { CredentialModel } from "../config/data-source";
import ICreateCredentialDto from "../dtos/ICreateCredentialDto";
import { Credential } from "../entities/Credential";



// ESTO LO HARA LA BASE DE DATOS CREAR NUEVA CREDENCIAL
export const createCredentialService = async (createCredencialDto: ICreateCredentialDto): Promise<Credential> => {
const credential: Credential = CredentialModel.create (createCredencialDto); 
await CredentialModel.save(credential);
return credential;
};

// VALIDAR LAS CREDENCIALES
export const validateCredentialService = async(CredentialDto: ICreateCredentialDto): Promise<Credential> => {
     const { username, password} = CredentialDto;
    const credential= await CredentialModel.findOneBy({username});
   
    
    if (!credential || credential.password !== password ){
        throw new Error ("Credenciales incorrectas");
    }
        return credential;
    };
  
