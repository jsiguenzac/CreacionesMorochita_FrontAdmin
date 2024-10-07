import { getToken } from "services/Auth/tokenService";
import doRequest from "../helpers";
import { saveUser, removeUser } from "services/Auth/tokenService";

export const DetailUser = async (id_user) => {
    const [result, error] = await doRequest(
        "/User/Detail/" + id_user,
        "GET",
        null,
        getToken()
    );
    
    if (error)
        return;

    const state = result?.state;
    if (state === 0)
        return { data: null, msg: result?.data?.mensaje};
    else if(state === 1)
        return { data: result?.data, msg: null};
    else
        return { data: null, msg: "Error desconocido"};
}