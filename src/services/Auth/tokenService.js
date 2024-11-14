import { local } from "../storage/general";
import doRequest from "../helpers";

export const LoginService = async (form) => {
    const body = {
        email: form.email,
        password: form.password,
        remind: form.remind
    };
    const [result, error] = await doRequest(
        "/Login/Authenticate",
        "POST",
        body
    );
    
    if (error)
        return { logged: false, msg: error.message};
        
    const token = result?.token;
    if (!token)
        return { logged: false, msg: result?.detail?.mensaje};
    
    saveToken(token);
    saveUser(result?.user);
    return { logged: true, msg: null};
}

export const RecoverAccessService = async (form) => {
    const body = {
        email: form.email
    };
    const [result, error] = await doRequest(
        "/Login/RecoverPassword",
        "POST",
        body
    );
    
    if (error)
        return { exito: false, msg: error.message};
    
    const state = result?.state;
    if(state === 1)
        return { exito: result?.data?.exito, msg: result?.data?.mensaje};
    else
        return { exito: false, msg: result?.data?.mensaje};
}

export const saveToken = (token) => {
    local.set("token", token);
}
export const saveUser = (user) => {
    local.set("user", user);
}
export const savePermissions = (permssions) => {
    local.set("permissions", permssions);
}
export const removeUser = () => {
    local.remove("user");
}
export const getToken = () => {
    return local.get("token");
}
export const getUser = () => {
    return local.get("user");
}
export const getPermissions = () => {
    return local.get("permissions");
}
export const isLogged = () => {
    return local.get("token") ? true : false;
}
export const clearAllStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
}