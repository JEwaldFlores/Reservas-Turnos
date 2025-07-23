import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Appointments.module.css";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
    
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          navigate("/home");
          return;
        }

        const user = JSON.parse(userData).user;

         const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${user.id}`);
         const userFromApi = response.data; //MODIFICACION 
        
         //MODIFICACION SE AGREGO ESTO
       
        setAppointments(userFromApi.appointments);

        const storedUser = JSON.parse(userData);
        storedUser.appointments = userFromApi.appointments;
        localStorage.setItem("user", JSON.stringify(storedUser));

        // setAppointments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al obtener turnos:", err);
        setError("No se pudieron obtener los turnos.");
        setAppointments([]); 
      }
    };

    fetchAppointments();
  }, [navigate]);

  const handleCancel = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/appointments/cancel/${id}`);
      const updatedAppointments = appointments.map((appt) =>
        appt.id === id ? { ...appt, status: "cancelled" } : appt
      );


      setAppointments(updatedAppointments);
      alert(" Turno cancelado con éxito.☑️");

      const userData = JSON.parse(localStorage.getItem("user"));
      userData.appointments = updatedAppointments;
      localStorage.setItem("user", JSON.stringify(userData));

    } 
      catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Error al cancelar el turno.";
      alert(msg);
    }
  };
      useEffect(() => {
      document.body.classList.add("fondo-appointments");

      return () => {
        document.body.classList.remove("fondo-appointments");
      };
    }, []);
  return (
    <div className={styles.container}>
      <h2>Mis Turnos</h2>

      {error && <p className={styles.error}>{error}</p>}

      {appointments === null ? (
        <p>Cargando turnos...</p>
      ) : appointments.length === 0 ? (
        <p>No hay turnos agendados todavía.</p>
      ) : (
        <ul className={styles.list}>
          {appointments.map((appt) => (
            <li key={appt.id} className={styles.item}>
              <p><strong>Fecha:</strong> {appt.date}</p>
              <p><strong>Hora:</strong> {appt.time}</p>
              <p><strong>Descripción:</strong> {appt.description}</p>
              <p><strong>Estado:</strong> {appt.status}</p>
              {appt.status !== "cancelled" && (
                <button
                  onClick={() => handleCancel(appt.id)}
                  className={styles.cancelButton}
                >
                  Cancelar turno
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointments;