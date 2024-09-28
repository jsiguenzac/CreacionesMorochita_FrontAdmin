export const IS_PRODUCTION = false;
export const ALLOW_DURATION_EVENT_UPDATE = false;
const API_URL_GROUP = {
    LOCAL_DEV: "http://localhost",
    DEV: "http://",
    TEST: "http://",
    PROD: ""  
};
export const API_URL = IS_PRODUCTION ? API_URL_GROUP.PRE_PROD : API_URL_GROUP.DEV; 