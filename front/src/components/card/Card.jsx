import styles from "./Card.module.css";
const Card = ({text,image}) => {
    return(
        <div className= {styles.container}>
            <img src= {image} alt="imagen de ejercicio"/>
            <p> {text}</p>
        </div>
    )
};

export default Card;
// import pilatesmat from "../../assets/pilatesmat.png";
// import styles from "./Card.module.css";

// const Card = () => {
//     return (
//         <div className={styles.card}>
//             <img src={pilatesmat} alt="pilates mat" className={styles.image} />
//             <div className={styles.overlay}>
//                 {/* <p className={styles.text}>Pilates Mat</p> */}
//                 <h2 className={styles.title}>PILATES MAT</h2>
//             </div>
//         </div>
//     );
// };

// export default Card;