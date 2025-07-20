import { useEffect, useState } from "react";
import AppointmentCard from "../../components/appointmentCard/AppointmentCard";
import axios from "axios";
const GETAPPOINTMENTS_URL="http://localhost:3000/appointments";


const Appointments =() => {
    const [ appointments, setAppointments] = useState([]); //*[estado, funcion]

    useEffect(() =>{
        axios
        .get(GETAPPOINTMENTS_URL)
        .then(response => response.data)
        .then(appointmentsFromDB => setAppointments(appointmentsFromDB))
        .catch(error => {
            alert("Error al hacer el request." + error.message);
            console.log(error);
        })
    }, []);

    return(
        <div>
        <h1>Mis Reservas</h1>
        {appointments.map((appointment, index)=> (

            <AppointmentCard
                key={index}
                id={appointment.id}
                date={appointment.date}
                time={appointment.time}
                status={appointment.status}
                description={appointment.description}
            />
        ))}
        </div>
    );
    
};

export default Appointments;