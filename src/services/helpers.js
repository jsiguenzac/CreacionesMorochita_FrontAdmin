import { API_URL } from "../config/deployMode";

export const handleReloadErr = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = window.location.href;
};

const doRequest = async (endpoint, method = "GET", data = null, token = null, alternativeAPIUrl = null) => {
  // Construir la URL base
  const url = `${alternativeAPIUrl || API_URL}${endpoint}`;
  
  // Configurar las opciones del request
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  };

  // Añadir el token si se proporciona
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    // Hacer la petición utilizando fetch
    const response = await fetch(url, options);

    // Verificar si la respuesta no está autorizada (401)
    if (response.status === 401) {
      handleReloadErr();
      return [null, new Error("No autorizado")];
    }

    // Parsear la respuesta JSON si está disponible
    const result = await response.json();
    return [result, null];
  } catch (error) {
    console.error("Err_Req", error);
    handleReloadErr();
    // Devolver error en caso de fallo
    return [null, error];
  }
};

// Utilidad para lanzar un error si no hay datos de respuesta
export const throwError = (fetchData) => {
  if (!fetchData) {
    throw new Error("Error al obtener datos");
  }
};

export default doRequest;