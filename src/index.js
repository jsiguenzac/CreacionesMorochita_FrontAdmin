import React from "react";
import ReactDOM from "react-dom";
import { isLogged } from "./services/Auth/tokenService";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
//import RTLLayout from "layouts/RTL.js";

ReactDOM.render(
  <HashRouter>
    <Switch>
      {/* Ruta de autenticación, sin verificación del token */}
      <Route path={`/auth`} component={AuthLayout} />
      
      {/* Ruta protegida para admin, solo permite acceso si está autenticado */}
      <Route path={`/admin`} render={(props) => (
        isLogged() ? (
          <AdminLayout {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      )} />      
      {/* Redirección por defecto al login si no se encuentra ninguna ruta */}
      <Redirect from={`*`} to='/auth/login' />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
