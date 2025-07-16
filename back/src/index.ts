import { PORT } from "./config/envs";
import server from "./server";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

// levantar el servidor
AppDataSource.initialize()
    .then(res=>{
        console.log("Conexión a la base de datos exitosa");
        server.listen(PORT, ()=> {
         console.log(`Server listening on http://localhost:${PORT}`)
        })
    })
    .catch (error => console.log(error));

