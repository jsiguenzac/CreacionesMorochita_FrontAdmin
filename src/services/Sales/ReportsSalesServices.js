import { getToken } from "services/Auth/tokenService";
import doRequest from "../helpers";

export const ReportExportService = async (form) => {
    const body = {
        date_start: form.dateInit,
        date_end: form.dateEnd,
        id_seller: Number(form.seller) || 0,
    };
    const [result, error] = await doRequest(
        "/Sales/Report/Export",
        "POST",
        body,
        getToken(),
        true
    );
    
    if (error) {
        console.error("Error al descargar el reporte:", error);
        return { exito: false, msg: "ERROR_AL_EXPORTAR" };
    }
    const state = result?.state;
    if (state === 0) {
        return { exito: false, msg: result?.data?.mensaje || "ERROR_DESCONOCIDO" };
    }
    // Crear enlace para descargar el archivo
    const url = window.URL.createObjectURL(result.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = result.filename || "Reporte_Ventas.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    return { exito: true, msg: "REPORTE_DESCARGADO" };
}