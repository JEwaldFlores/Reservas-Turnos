const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%?&#])[A-Za-z\d@$!%*?&#]+$/;

const validateUser = (values) => {
  const errors = {};

  const rules = [
    {
      field: "name",
      validate: (v) => {
        if (!v) return "El campo name es obligatorio";
        if (v.length < 3) return "Debe tener al menos 3 caracteres";
        if (v.length > 50) return "Máximo 50 caracteres";
        if (!nameRegex.test(v)) return "Solo letras y espacios";
      },
    },
    {
      field: "email",
      validate: (v) => {
        if (!v) return "El campo email es obligatorio";
        if (!emailRegex.test(v)) return "Email no válido";
      },
    },
    {
      field: "birthdate",
      validate: (v) => {
        if (!v) return "Fecha de nacimiento obligatoria";
        const today = new Date();
        const birth = new Date(v);
        const age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (age < 16 || (age === 16 && m < 0)) return "Debes ser mayor de 16 años";
      },
    },
    {
      field: "nDni",
      validate: (v) => {
        if (!v) return "El campo DNI es obligatorio";
        if (!/^\d+$/.test(v)) return "Debe ser un número válido";
        if (Number(v) <= 0) return "Debe ser mayor a cero";
      },
    },
    {
      field: "username",
      validate: (v) => {
        if (!v) return "El campo username es obligatorio";
        if (v.length < 4) return "Mínimo 4 caracteres";
        if (v.length > 20) return "Máximo 20 caracteres";
      },
    },
    {
      field: "password",
      validate: (v) => {
        if (!v) return "El campo password es obligatorio";
        if (v.length < 4 || v.length > 10)
          return "Debe tener entre 4 y 10 caracteres";
        if (!passwordRegex.test(v))
          return "Debe tener letras, números y un símbolo especial";
      },
    },
    {
      field: "confirmPassword",
      validate: (v) => {
        if (!v) return "Confirmar contraseña es obligatorio";
        if (v !== values.password) return "Las contraseñas no coinciden";
      },
    },
  ];

  rules.forEach(({ field, validate }) => {
    const error = validate(values[field]);
    if (error) errors[field] = error;
  });

  return errors;
};


const validateLogin = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "El campo username es obligatorio";
  }

  if (!values.password) {
    errors.password = "El campo password es obligatorio";
  } else {
    if (values.password.length < 4 || values.password.length > 10) {
      errors.password = "Debe tener entre 4 y 10 caracteres";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Debe contener al menos una letra, un número y un símbolo";
    }
  }

  return errors;
};

export default validateUser;
export { validateLogin};