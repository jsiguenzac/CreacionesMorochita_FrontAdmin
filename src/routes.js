// import
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import SalesV2 from "views/Dashboard/SalesV2.js";
import SalesDetails from "views/Dashboard/SalesDetails.js";
import Users from "views/Dashboard/Users.js";
import Reports from "views/Dashboard/Reports.js";
import Inventory from "views/Dashboard/Inventory.js";
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
import { FaSignOutAlt } from "react-icons/fa";

export const pagesRoutes = [
  {
    path: "/ventas/detalle",
    name: "Detalle de Venta",
    component: SalesDetails,
    layout: "/admin",
  }
];

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Inicio",
    id: 0,
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/sales",
    name: "Ventas",
    id: 1,
    rtlName: "لوحة القيادة",
    icon: <CartIcon color='inherit' />,
    component: SalesV2,
    layout: "/admin",
  },
  {
    path: "/inventory",
    name: "Inventario",
    id: 2,
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color='inherit' />,
    component: Inventory,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Usuarios",
    id: 3,
    rtlName: "لوحة القيادة",
    icon: <GlobeIcon color='inherit' />,
    component: Users,
    layout: "/admin",
  },
  {
    path: "/reports",
    name: "Reportes",
    id: 4,
    rtlName: "لوحة القيادة",
    icon: <GlobeIcon color='inherit' />,
    component: Reports,
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
    id: -1,
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
        icon: <FaSignOutAlt color='inherit' />,
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
