import React from "react";
import ReactDOM from "react-dom";
import { isLogged } from "./services/Auth/tokenService";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
//import RTLLayout from "layouts/RTL.js";
import ConnectionStatusModal from "./views/components/utils/ConnectionStatusModal";
import useConnectionStatus from "./utils/useConnectionStatus";

function App() {
  const isOnline = useConnectionStatus();

  return (
    <>
      <ConnectionStatusModal isOnline={isOnline}/>
      <HashRouter>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} render={(props) => (
            isLogged() ? (
              <AdminLayout {...props} />
            ) : (
              <Redirect to="/auth/login" />
            )
          )} />
          <Redirect from={`*`} to='/auth/login' />
        </Switch>
      </HashRouter>
    </>
  );
}

ReactDOM.render(
  <ChakraProvider>
  <App />
  </ChakraProvider>,
  document.getElementById("root")
);
