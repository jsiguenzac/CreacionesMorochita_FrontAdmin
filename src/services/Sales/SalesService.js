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