import { getToken } from "services/Auth/tokenService";
import doRequest from "../helpers";

export const UserListService = async (form) => {
    const body = {
        page: Number(form.page) || 1,
        name: form.name || "",
        id_rol: Number(form.idRol) || 0,
        date_creation: form.dateCreation || -1,
    };
    const [result, error] = await doRequest(
        "/User/List",
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