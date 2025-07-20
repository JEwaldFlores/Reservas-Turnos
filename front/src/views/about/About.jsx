import styles from "./About.module.css"
const About= () => {
const imagesAndData1= [
    {
        src: "https://img.icons8.com/fluent/512/node-js.png",
        alt: "Node JS",
        href: "http://nodejs.org/en",

    },
    {   src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
        alt: "Typescript",
        href: "https://www.typescriptlang.org/es/",
    },
    {
        src: "https://images.credly.com/images/1c2c86e1-16ce-4e4d-a425-d1ac96bb026d/express.png",
        alt: "express",
        href:"https://expressjs.com/es/",
    },
    {
        src: "https://vectorseek.com/wp-content/uploads/2024/07/TypeORM-Logo-Vector-Logo-Vector.svg-.png",
        alt: "TypeORM",
        href: "https://typeorm.io/",
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/99px-Postgresql_elephant.svg.png",
        alt: "PostgreSQL",
        href: "https://www.postgresql.org/",
    },
];
const imagesAndData2 = [
        {
        src: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
        alt: "React",
        href: "https://es.react.dev/",
    },
        {
        src: "https://images.seeklogo.com/logo-png/29/3/react-router-logo-png_seeklogo-294311.png",
        alt: "React-Router-DOM",
        href: "https://reactrouter.com/en/main",
    },
        {
        src: "https://cdn.worldvectorlogo.com/logos/redux.svg",
        alt: "Redux",
        href: "https://redux.js.org/",
    },
];
return(
<div className={styles.aboutContainer}>
    <div className={styles.textSection}>
    <h2>Datos de esta aplicación</h2>
    <h3>Proyecto para el Módulo 3 - Henry</h3>
    <p><strong>Carrera:</strong> Desarrollo Full Stack</p>
    <p>Este proyecto fue desarrollado con las siguientes tecnologías...</p>
    </div>
<div>
    {imagesAndData1.map((image) =>(
    <a
    key= {image.alt}
    href= {image.href}
    target= "_blank"
    rel= "noopener noreferrer"
    >
    <img src={image.src} alt={image.alt}/>   
    </a>
))}
</div>
<div>
    {imagesAndData2.map((image) => (
    <a
    key= {image.alt}
    href= {image.href}
    target= "_blank"
    rel= "noopener noreferrer"
    >
    <img src={image.src} alt={image.alt}/>   
    </a> 
    ))}
    </div>
 </div>
);
}
export default About;