import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import Home from "./views/home/Home";
import AppointmentForm from "./views/appointmentForm/AppointmentForm";
import Appointments from "./views/appointments/Appointments";
import About from "./views/about/About";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/appointments" element={<AppointmentForm />} /> 
        <Route path="/myappointments" element={<Appointments />} /> 
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;






























// import Navbar from "./components/navbar/Navbar";
// import Appointments from "./views/appointments/Appointments";
// import Home from "./views/home/Home";
// import About from "./views/about/About"
// import Register from "./views/register/Register"
// import Login from "./views/login/Login";


// function App() {
 

//   return (
    
//     <div>
//       <Navbar/>
//       <Appointments/>
//       {/* <About/> */}
//       {/* <Home/> */}
//       {/* <Register/> */}
//       {/* <Login/> */}
//     </div>
     
      
//   )
// }

// export default App;
