import routes from '../routes';
import { clearAllStorage } from '../services/Auth/tokenService';

export const getModulesAndPermissions = () => {
    const permissions = JSON.parse(localStorage.getItem("permissions"));
    if (!permissions) {
        clearAllStorage();
        window.reload();
    }
    return permissions;
};