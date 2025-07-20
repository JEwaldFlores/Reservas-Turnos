import logo from "../../assets/logo.png"
import avatar from "../../assets/avatar.png"
import styles from "./Navbar.module.css"

const Navbar = () =>{
    return(
       
        <div className={styles.container}>

            <div className={styles.logoSection}>
                <img src={logo} alt="Logo" />
            </div>
            <div className={styles.linkSection}>
                <span>HOME </span>
                <span>RESERVAS</span>
                <span>ABOUT</span>
             
            </div>
            <div className={styles.avatar}>
                <img src={avatar} alt="Avatar" />
            </div>


        </div>
     
            
        


    )


}
export default Navbar;