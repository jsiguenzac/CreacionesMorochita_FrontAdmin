import { getToken } from "services/Auth/tokenService";
import doRequest from "../helpers";

export const UpdateUser = async (form) => {
    const body = {
        id_user: Number(form.id_user),
        name: form.name,
        last_name: form.last_name,
        dni: Number(form.dni),
        phone: Number(form.phone)
    };
    const [result, error] = await doRequest(
        "/User/Update",
        "PUT",
        body,
        getToken()
    );
    
    if (error)
        return;

    const state = result?.state;
    if(state === 1)
        return { exito: result?.data?.exito, msg: result?.data?.mensaje};
    else
        return { exito: false, msg: "Error desconocido"};
}