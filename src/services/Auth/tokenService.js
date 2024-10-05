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
    
    saveToken(token, result?.user);
    return { logged: true, msg: null};
}
export const saveToken = (token, user) => {
    local.set("token", token);
    local.set("user", user);
}
export const getToken = () => {
    return local.get("token");
}
export const getUser = () => {
    return local.get("user");
}
export const isLogged = () => {
    return local.get("token") ? true : false;
}
export const clearAllStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
}