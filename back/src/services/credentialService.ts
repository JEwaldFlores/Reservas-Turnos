import ICreateCredentialDto from "../dtos/ICreateCredentialDto";
import ICredential from "../interfaces/ICredential";
import Icredential from "../interfaces/ICredential"

const credentials: Icredential[] = [
{
    id: 1,
    username: "pablo",
    password: "1234"
}
];
let credentialId: number = 10

// ESTO LO HARA LA BASE DE DATOS CREAR NUEVA CREDENCIAL
export const createCredentialService = async (
    createCredencialDto: ICreateCredentialDto 
): Promise<Icredential> => {
const { username, password} = createCredencialDto;
const newCredential: Icredential= {
    id: credentialId++,
    username,
    password,
}
    credentials.push(newCredential);
    return newCredential; 
};

// VALIDAR LAS CREDENCIALES
export const validateCredentialService = (validateCredentialDto: ICreateCredentialDto) => {
    const { username, password} = validateCredentialDto;
    const foundCredential: ICredential | undefined = credentials.find(
        credential => credential.username === username
    )
    if (!foundCredential) throw Error ("Credenciales incorrectas");
    if (password !== foundCredential.password) {
        throw Error ("Credenciales incorrectas");
    }
    return foundCredential;
}