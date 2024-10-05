//#region Helpers
export const session = {
    get:  key => sessionStorage.getItem(key),
    set: (key, value) => sessionStorage.setItem(key, value),
    remove: key => sessionStorage.removeItem(key)
};
/* export const local = {
    get:  key => localStorage.getItem(key),
    set: (key, value) => localStorage.setItem(key, value),
    remove: key => localStorage.removeItem(key)
}; */
export const local = {
    get: key => {
        const item = localStorage.getItem(key);
        try {
            return JSON.parse(item); // Deserializa el valor si es un objeto/array
        } catch (e) {
            return item; // Si no es JSON, devuelve el valor como está
        }
    },
    set: (key, value) => {
        const serializedValue = typeof value === "string" ? value : JSON.stringify(value);
        localStorage.setItem(key, serializedValue); // Guarda siempre como string
    },
    remove: key => {
        localStorage.removeItem(key);
    }
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