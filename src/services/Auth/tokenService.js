import { local } from "../storage/general";
import doRequest from "../helpers";

export const signinService = async (form) => {
    const body = {
        email: form.email,
        password: form.password
    };
    const [result, error] = await doRequest(
        "/Auth/auth/signin",
        "POST",
        body
    );
    if (error)
        return;
    const { data } = result;
    if (!data?.token)
        return false;
    const { token } = result.data.token;
    saveToken(token);
    return true;
}

export const saveToken = token => {
    local.set("token", token);
}
export const getToken = () => {
    return local.get("token");
}
export const isLogged = () => {
    return local.get("token") ? true : false;
}
export const clearAllStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
}