import { getToken } from "services/Auth/tokenService";
import doRequest from "../helpers";

export const UpdatePass = async (current_pass, new_pass) => {
    const body = {
        current_pass: current_pass,
        new_pass: new_pass
    };
    const [result, error] = await doRequest(
        "/User/Update/Password",
        "PUT",
        body,
        getToken()
    );
    
    if (error)
        return;

    const state = result?.state;
    if(state === 1)
        return { exito: result?.data?.exito, msg: result?.data?.mensaje};
    else if (state === 0)
        return { exito: false, msg: result?.data?.mensaje};
    else
        return { exito: false, msg: "Error desconocido"};
}