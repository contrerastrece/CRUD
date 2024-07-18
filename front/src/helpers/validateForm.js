export const validateForm = (formData) => {
  const { nombre, precio } = formData;
  const errors = {};

  if (!nombre.trim()) {
    errors.nombre = "El nombre es requerido 🎁";
  }
  if (!precio) {
    errors.precio = "El precio es requerido 🪙";
  } else if (isNaN(precio) || Number(precio) <= 0) {
    errors.precio = "El precio debe ser un número positivo 🚩";
  }

  return {
    response: errors,
    isOk: Object.keys(errors).length === 0
  };

};
