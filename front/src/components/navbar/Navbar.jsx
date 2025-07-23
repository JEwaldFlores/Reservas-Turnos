
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import avatar from "../../assets/avatar.png";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData).user : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoSection}>
        <img src={logo} alt="logo" />
      </div>

      <div className={styles.linkSection}>
            <Link to="/home" className={styles.link}>HOME</Link>
           
            {user && (
            <>
            <Link to="/appointments" className={styles.link}>RESERVAR</Link>
            <Link to="/myappointments" className={styles.link}>MIS TURNOS</Link>
            </>
            )}
            {!user && (
            <>
                <Link to="/login" className={styles.link}>LOGIN</Link>
                <Link to="/register" className={styles.link}>REGISTER</Link>
            </>
            )}
            <Link to="/about" className={styles.link}>ABOUT</Link>
            {user && (
            <button className={styles.logoutButton} onClick={handleLogout}>
                Cerrar sesión
            </button>
            )}
      </div>

      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" className={styles.avatarImg}/>
         {user && <p className={styles.username}>{user.name}</p>}
      </div>
    </div>
  );
};

export default Navbar;