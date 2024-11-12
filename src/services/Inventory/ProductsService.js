import { getToken } from "services/Auth/tokenService";
import doRequest from "../helpers";

export const ProductsListService = async (form) => {
    const body = {
        page: Number(form.page) || 1,
        name: form.name || "",
        id_category: Number(form.idCategory) || 0
    };
    const [result, error] = await doRequest(
        "/Products/List",
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

export const ProductCreateService = async (form) => {
    const body = {
        name: form.nameForm.trim(),
        codesku: form.talla.trim(),
        stock: Number(form.stock) || null,
        price: Number(form.price) || null,
        id_category: Number(form.category) || null,
        id_provider: Number(form.provider) || null,
    };
    const [result, error] = await doRequest(
        "/Products/Add",
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

export const ProductUpdateService = async (form) => {
    const body = {
        id_product: Number(form.id),
        name: form.nameForm.trim(),
        codesku: form.talla.trim(),
        stock: Number(form.stock) || null,
        price: Number(form.price) || null,
        id_category: Number(form.category) || null,
        id_provider: Number(form.provider) || null,
    };
    const [result, error] = await doRequest(
        "/Products/Update",
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

export const ProductFindByNameService = async (nameForm) => {
    const body = {
        name: nameForm.trim()
    };
    const [result, error] = await doRequest(
        "/Products/ByName",
        "POST",
        body,
        getToken()
    );
    
    if (error)
        return;

    const state = result?.state;
    if(state === 1)
        return { data: result?.data?.products, msg: result?.data?.mensaje};
    else
        return { exito: false, msg: result?.data?.mensaje};
}