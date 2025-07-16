import ICreateCredentialDto from "../dtos/ICreateCredentialDto";
import { Credential } from "../entities/Credential";
import { credentialRepository } from "../repositories/indexRepository";

// ESTO LO HARA LA BASE DE DATOS CREAR NUEVA CREDENCIAL
export const createCredentialService = async (createCredencialDto: ICreateCredentialDto): Promise<Credential> => {
    const {username, password} = createCredencialDto;

    // VALIDAR QUE NO EXISTA LA CREDENCIAL 
    const foundCredential: Credential | null = await credentialRepository.findOneBy({username});

    if (foundCredential) throw Error (`Ya existe credencial con el nombre ${username}`);

    // CREAR CREDENCIAL 
    const newCredential: Credential = credentialRepository.create ({
        username,
        password,
    }); 
    // GUARDAR CREDENCIAL EN BASE DE DATOS 
    await credentialRepository.save(newCredential);
        return newCredential;
};

// VALIDAR LAS CREDENCIALES
export const validateCredentialService = async(validateCredentialDto: ICreateCredentialDto): Promise<number> => {
    const { username, password} = validateCredentialDto;
    
    // VERIFICAR QUE EXISTA LA CREDENCIAL 
    const foundCredential: Credential | null = await credentialRepository.findOneBy({username});
    if (!foundCredential)
        throw Error ("Credenciales incorrectas");
    // VERIFICAR EL PASSWORD 
    if (password !==foundCredential.password)
        throw Error ("Credenciales incorrectas")
    
    return foundCredential.id;
};

      
    
  
