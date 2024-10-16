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

export const UserCreateService = async (form) => {
    const body = {
        dni: Number(form.dni) || null,
        name: form.nameForm.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        id_rol: Number(form.role) || null,
        phone: Number(form.phone) || null,
    };
    const [result, error] = await doRequest(
        "/User/Create",
        "POST",
        body,
        getToken()
    );
    
    if (error)
        return;

    const state = result?.state;
    if(state === 1)
        return { exito: result?.data?.exito, msg: result?.data?.mensaje};
    else
        return { exito: false, msg: result?.data?.mensaje};
}

export const UserUpdateService = async (form) => {
    const body = {
        id_user: Number(form.id),
        dni: Number(form.dni) || null,
        name: form.nameForm.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        id_rol: Number(form.role) || null,
        phone: Number(form.phone) || null,
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
        return { exito: false, msg: result?.data?.mensaje};
}
