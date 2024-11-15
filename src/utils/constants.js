import routes from '../routes';
import { handleReloadErr } from '../services/helpers';

export const getModulesAndPermissions = () => {
    const permissions = JSON.parse(localStorage.getItem("permissions"));
    if (!permissions) {
        handleReloadErr();
    }
    return permissions;
};