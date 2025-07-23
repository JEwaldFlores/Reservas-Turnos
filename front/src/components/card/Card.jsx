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
