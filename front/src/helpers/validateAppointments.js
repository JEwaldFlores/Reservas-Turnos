export const validTimes = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
];

export const validateAppointment = (values) => {
  const errors = {};

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const in14Days = new Date(today);
  in14Days.setDate(today.getDate() + 14);

  const selectedDate = new Date(values.date);
  selectedDate.setHours(0, 0, 0, 0);

  const dayOfWeek = selectedDate.getDay();

  // Fecha
  if (!values.date) {
    errors.date = "La fecha es obligatoria";
  } else if (selectedDate < tomorrow || selectedDate > in14Days) {
    errors.date = "Debe ser entre mañana y los próximos 14 días";
  } else if (dayOfWeek === 0 || dayOfWeek === 6) {
    errors.date = "🚩No se puede agendar en fin de semana";
  }

  // Hora
  if (!values.time) {
    errors.time = "La hora es obligatoria";
  } else if (!validTimes.includes(values.time)) {
    errors.time = "La hora no es válida. Espacios cada 30 minutos";
  }


  if (!values.description) {
    errors.description = "La descripción es obligatoria";
  } else if (
    values.description.length < 4 ||
    values.description.length > 50
  ) {
    errors.description = "Debe tener entre 4 y 50 caracteres";
  }

  return errors;
};