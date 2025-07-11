import { PORT } from "./config/envs";
import server from "./server";

// levantar el servidor
server.listen(PORT, ()=> {
    console.log(`Server listening on http://localhost:${PORT}`)
})
