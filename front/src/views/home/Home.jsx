
import Card from "../../components/card/Card";
import textCard from "../../helpers/textCard";
import { useState, useEffect } from "react";
import styles from "../../components/card/Card.module.css";
import Styles from "./Home.module.css";

const Home = () => {
    const [textCardToShow, setTextCardToShow] = useState(textCard);

      useEffect(() => {
    document.body.classList.add("fondo-home");

    return () => {
      document.body.classList.remove("fondo-home");
    };
  }, []);
    return(
        <div>
            <h1 className={styles.titulo}>Tu espacio para reconectar</h1>
                <div className={styles.card}>
                    {textCardToShow.map((item, index,) =>(
                        <Card key={index} text={item.text} image={item.image}/>
                    ))}
           
                </div>
        </div>
    );
};
export default Home; 