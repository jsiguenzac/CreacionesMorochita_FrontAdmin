// Función para convertir fecha a timestamp en milisegundos o segundos
export const dateToTimestamp = (dateStr, inMilliseconds = true) => {
    if (dateStr == "") return -1;
    const dateObject = new Date(dateStr); // Crear objeto Date
    const timestamp = dateObject.getTime(); // Obtener timestamp en milisegundos
    return inMilliseconds ? timestamp : Math.floor(timestamp / 1000);
};