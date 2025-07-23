import { useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { validateLogin } from "../../helpers/validateUser";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/users/login`,
          values
        );

        localStorage.setItem("user", JSON.stringify(data));

        alert("⭐ Inicio de sesión exitoso");
        resetForm();

        navigate("/home");
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        setStatus(error.response?.data?.error || "Error al iniciar sesión");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const fields = [
    {
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Nombre de usuario",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Contraseña",
    },
  ];


 useEffect(() => {
  document.body.classList.add("fondo-login");

      return () => {
        document.body.classList.remove("fondo-login");
      };
 }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.text}>Iniciar sesión</h2>
      <form onSubmit={formik.handleSubmit}>
        {fields.map(({ id, name, type, placeholder }) => (
          <div key={id}>
            <input
              id={id}
              name={name}
              type={type}
              placeholder={placeholder}
              className={styles.input}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched[name] && formik.errors[name] && (
              <div className={styles.error}>{formik.errors[name]}</div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className={styles.button}
          disabled={formik.isSubmitting}
        >
          Iniciar sesión
        </button>
      </form>

      {formik.status && (
        <p className={styles.message}>{formik.status}</p>
      )}
    </div>
  );
};

export default Login;