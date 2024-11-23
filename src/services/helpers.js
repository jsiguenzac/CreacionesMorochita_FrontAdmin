import { API_URL } from "../config/deployMode";

export const handleReloadErr = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload();
};

const doRequest = async (
  endpoint,
  method = "GET",
  data = null,
  token = null,
  isBlob = false,
  alternativeAPIUrl = null
) => {
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

    if (isBlob) {
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        // Intentar obtener respuesta JSON si es un error
        const result = await response.json();
        if (result?.state === 0) {
          return [result, null];
        }
      }
      /* const contentDisposition = response.headers.get("Content-Disposition");]
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1].trim()
        : "archivo_descargado"; */
      // Procesar la respuesta como Blob para la descarga
      const blob = await response.blob();
      // Verificar si el archivo es un Blob válido (opcional)
      if (!blob || blob.size === 0) {
        return [null, new Error("Error al descargar el archivo. El contenido está vacío.")];
      }
      const now = new Date();
      const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}_${now
        .getHours()
        .toString()
        .padStart(2, "0")}-${now.getMinutes()
        .toString()
        .padStart(2, "0")}-${now.getSeconds().toString().padStart(2, "0")}`;
      
        let filename = "";
      if (contentType.includes("application/pdf")) {
        // filename += `Boleta_Venta_${timestamp}.pdf`;
      } else if (contentType.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
        filename += `Reporte_Ventas_${timestamp}.xlsx`;
      } else {
        filename += ".bin"; // Tipo genérico si no se reconoce el Content-Type
      }

      return [{ blob, filename }, null];
    } else {
      // Manejar respuesta JSON
      const result = await response.json();
      return [result, null];
    }
  } catch (error) {
    console.error("Err_Req", error);
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