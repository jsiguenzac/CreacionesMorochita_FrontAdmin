//#region Helpers
export const session = {
    get:  key => sessionStorage.getItem(key),
    set: (key, value) => sessionStorage.setItem(key, value),
    remove: key => sessionStorage.removeItem(key)
};
export const local = {
    get:  key => localStorage.getItem(key),
    set: (key, value) => localStorage.setItem(key, value),
    remove: key => localStorage.removeItem(key)
};
//#endregion
export const currentUserLocalStorage = {
    get: () => JSON.parse(local.get("currentUser")), 
    set: value => local.set("currentUser", JSON.stringify(value))
};
export const getUserId = () => {
    return currentUserLocalStorage.get()?.id || null;
}
export const getUserRole = () => {
    return currentUserLocalStorage.get()?.role || null;
}