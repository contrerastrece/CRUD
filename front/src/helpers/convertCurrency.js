export const formatearMoneda = (valor) => {
  return valor.toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
  });
}