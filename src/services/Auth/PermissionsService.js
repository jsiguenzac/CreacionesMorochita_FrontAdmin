import { getToken } from "services/Auth/tokenService";
import doRequest from "../helpers";

export const PermissionsListService = async () => {
    const [result, error] = await doRequest(
        "/User/Permissions",
        "GET",
        null,
        getToken()
    );
    
    if (error)
        return;

    const state = result?.state;
    if(state === 1)
        return { permssions: result?.data?.permissions, msg: result?.data?.mensaje};
    else
        return { permssions: null, msg: "Error desconocido"};
}