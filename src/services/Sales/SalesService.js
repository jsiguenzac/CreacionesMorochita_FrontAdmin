import { getToken } from "services/Auth/tokenService";
import doRequest from "../helpers";

export const SalesListService = async (form) => {
    const body = {
        page: Number(form.page) || 1,
        id_seller: Number(form.idSeller) || 0,
        id_status: Number(form.idStatus) || 0,
        date_sale: form.dateSale || -1,
    };
    const [result, error] = await doRequest(
        "/Sales/List",
        "POST",
        body,
        getToken()
    );
    
    if (error)
        return;

    const state = result?.state;
    if(state === 1)
        return { data: result?.data, msg: result?.data?.mensaje};
    else
        return { exito: false, msg: "Error desconocido"};
}

export const SalesCreateService = async (form) => {
    const body = {
        name_client: form.nameClientForm,
        dni_client: Number(form.dniClientForm) || null,
        id_payment: Number(form.payment),
        id_status: Number(form.status),
        total: Number(form.total),
        products: form.products.map(p => ({
            id_product: Number(p.id),
            talla: p.talla,
            price: Number(p.price),
            quantity: Number(p.quantity),
            subtotal: Number(p.subtotal)
        }))
    }
    const [result, error] = await doRequest(
        "/Sales/Add",
        "POST",
        body,
        getToken()
    );
    
    if (error)
        return;

    const state = result?.state;
    if(state === 1)
        return { exito: result?.data?.exito, msg: result?.data?.mensaje, product: result?.data?.product};
    else
        return { exito: false, msg: result?.data?.mensaje, product: result?.data?.product};
}

export const SalesUpdateService = async (form) => {
    const body = {
        id_sale: Number(form.id),
        name_client: form.nameClientForm,
        dni_client: Number(form.dniClientForm) || null,
        id_payment: Number(form.payment),
        id_status: Number(form.status),
        total: Number(form.total),
        products: form.products.map(p => ({
            id_product: Number(p.id),
            talla: p.talla,
            price: Number(p.price),
            quantity: Number(p.quantity),
            subtotal: Number(p.subtotal)
        }))
    }
    const [result, error] = await doRequest(
        "/Sales/Update",
        "POST",
        body,
        getToken()
    );
    
    if (error)
        return;

    const state = result?.state;
    if(state === 1)
        return { exito: result?.data?.exito, msg: result?.data?.mensaje, product: result?.data?.product};
    else
        return { exito: false, msg: result?.data?.mensaje, product: result?.data?.product};
}

export const SalesDetailsService = async (id_sale) => {
    const [result, error] = await doRequest(
        `/Sales/Details/${Number(id_sale)}`,
        "POST",
        null,
        getToken()
    );
    
    if (error)
        return;

    const state = result?.state;
    if(state === 1)
        return { data: result?.data?.details, msg: result?.data?.mensaje};
    else
        return { data: null, msg: "Error desconocido"};
}

export const GenerateBoletaService = async (id_sale) => {
    const [result, error] = await doRequest(
        `/Sales/Boleta/Generate/${Number(id_sale)}`,
        "POST",
        null,
        getToken(),
        true
    );
    
    if (error) {
        console.error("Error al descargar la boleta:", error);
        return { exito: false, msg: "ERROR_AL_DESCARGAR" };
    }
    const state = result?.state;
    if (state === 0) {
        return { exito: false, msg: result?.data?.mensaje || "ERROR_DESCONOCIDO" };
    }
    // Crear enlace para descargar el archivo
    const url = window.URL.createObjectURL(result.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = result.filename || `Boleta_Venta_${Number(id_sale)}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    return { exito: true, msg: "BOLETA_DESCARGADA" };
}