import { getToken } from "services/Auth/tokenService";
import doRequest from "../helpers";

export const RolLisService = async () => {
    const [result, error] = await doRequest(
        "/Rol/List",
        "GET",
        null,
        getToken()
    );
    
    if (error)
        return;

    const state = result?.state;
    if(state === 1)
        return { data: result?.data?.roles, msg: result?.data?.mensaje};
    else
        return { exito: false, msg: "Error desconocido"};
}