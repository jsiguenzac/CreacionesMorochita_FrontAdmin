import { getToken } from "services/Auth/tokenService";
import doRequest from "../helpers";

export const PaymentsListService = async () => {
    const [result, error] = await doRequest(
        "/Payments/List",
        "GET",
        null,
        getToken()
    );
    
    if (error)
        return;

    const state = result?.state;
    if(state === 1)
        return { data: result?.data?.payments, msg: result?.data?.mensaje};
    else
        return { exito: false, msg: "Error desconocido"};
}