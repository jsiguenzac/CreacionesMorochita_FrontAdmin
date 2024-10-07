// import
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Sales from "views/Dashboard/Sales.js";
import Users from "views/Dashboard/Users.js";
import Client from "views/Dashboard/Client.js";
import Billing from "views/Dashboard/Billing.js";
import RTLPage from "views/RTL/RTLPage.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
//import SignUp from "views/Pages/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  LogoutIcon,
  SupportIcon,
  ProfileIcon,
  GlobeIcon,
  CartIcon
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Inicio",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/ventas",
    name: "Ventas",
    rtlName: "لوحة القيادة",
    icon: <CartIcon color='inherit' />,
    component: Sales,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Inventario",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color='inherit' />,
    component: Billing,
    layout: "/admin",
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    rtlName: "لوحة القيادة",
    icon: <GlobeIcon color='inherit' />,
    component: Users,
    layout: "/admin",
  },
  {
    path: "/clientes",
    name: "Clientes",
    rtlName: "لوحة القيادة",
    icon: <GlobeIcon color='inherit' />,
    component: Client,
    layout: "/admin",
  },
  /* {
    path: "/rtl-support-page",
    name: "RTL",
    rtlName: "آرتيإل",
    icon: <SupportIcon color='inherit' />,
    component: RTLPage,
    layout: "/rtl",
  }, */
  {
    name: "CUENTA",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Perfil",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/login",
        name: "Cerrar Sesión",
        rtlName: "لوحة القيادة",
        icon: <LogoutIcon color='inherit' />,
        component: SignIn,
        layout: "/auth",
      },
      /* {
        path: "/signup",
        name: "Sign Up",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color='inherit' />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      }, */
    ],
  },
];
export default dashRoutes;
