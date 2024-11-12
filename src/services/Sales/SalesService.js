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
