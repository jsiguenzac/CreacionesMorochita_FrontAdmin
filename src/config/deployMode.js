export const IS_PRODUCTION = false;
const API_URL_GROUP = {
    LOCAL_DEV: "http://127.0.0.1:8000",
    DEV: "https://api-morochita-dev.onrender.com",
    TEST: "http://",
    PROD: ""
};
export const API_URL = !IS_PRODUCTION ? API_URL_GROUP.DEV : API_URL_GROUP.LOCAL_DEV; 