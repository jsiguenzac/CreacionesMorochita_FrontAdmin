// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar7 from "assets/img/avatars/avatar7.png";
import avatar8 from "assets/img/avatars/avatar8.png";
import avatar9 from "assets/img/avatars/avatar9.png";
import avatar10 from "assets/img/avatars/avatar10.png";
// Custom icons
import {
  AdobexdLogo,
  AtlassianLogo,
  InvisionLogo,
  JiraLogo,
  SlackLogo,
  SpotifyLogo,
} from "components/Icons/Icons.js";
import { AiOutlineExclamation } from "react-icons/ai";
import {
  FaArrowDown,
  FaArrowUp,
  FaBell,
  FaCreditCard,
  FaFilePdf,
  FaHtml5,
  FaShoppingCart,
} from "react-icons/fa";
import { SiDropbox } from "react-icons/si";

export const dashboardTableData = [
  {
    logo: AdobexdLogo,
    name: "Chakra Soft UI Version",
    members: [avatar1, avatar2, avatar3, avatar4, avatar5],
    budget: "$14,000",
    progression: 60,
  },
  {
    logo: AtlassianLogo,
    name: "Add Progress Track",
    members: [avatar3, avatar2],
    budget: "$3,000",
    progression: 10,
  },
  {
    logo: SlackLogo,
    name: "Fix Platform Errors",
    members: [avatar10, avatar4],
    budget: "Not set",
    progression: 100,
  },
  {
    logo: SpotifyLogo,
    name: "Launch our Mobile App",
    members: [avatar2, avatar3, avatar7, avatar8],
    budget: "$32,000",
    progression: 100,
  },
  {
    logo: JiraLogo,
    name: "Add the New Pricing Page",
    members: [avatar10, avatar3, avatar7, avatar2, avatar8],
    budget: "$400",
    progression: 25,
  },
  {
    logo: InvisionLogo,
    name: "Redesign New Online Shop",
    members: [avatar9, avatar3, avatar2],
    budget: "$7,600",
    progression: 40,
  },
];

export const timelineData = [
  {
    logo: FaBell,
    title: "$2400, Design changes",
    date: "22 DEC 7:20 PM",
    color: "brand.200",
  },
  {
    logo: FaHtml5,
    title: "New order #4219423",
    date: "21 DEC 11:21 PM",
    color: "orange",
  },
  {
    logo: FaShoppingCart,
    title: "Server Payments for April",
    date: "21 DEC 9:28 PM",
    color: "blue.400",
  },
  {
    logo: FaCreditCard,
    title: "New card added for order #3210145",
    date: "20 DEC 3:52 PM",
    color: "orange.300",
  },
  {
    logo: SiDropbox,
    title: "Unlock packages for Development",
    date: "19 DEC 11:35 PM",
    color: "purple",
  },
  {
    logo: AdobexdLogo,
    title: "New order #9851258",
    date: "18 DEC 4:41 PM",
  },
];
export const rtlDashboardTableData = [
  {
    logo: AdobexdLogo,
    name: "نسخة Vision UI",
    members: [avatar1, avatar2, avatar3, avatar4, avatar5],
    budget: "$14,000",
    progression: 60,
  },
  {
    logo: AtlassianLogo,
    name: "إضافة مسار التقدم",
    members: [avatar3, avatar2],
    budget: "$3,000",
    progression: 10,
  },
  {
    logo: SlackLogo,
    name: "إصلاح أخطاء النظام الأساسي",
    members: [avatar10, avatar4],
    budget: "غير مضبوط",
    progression: 100,
  },
  {
    logo: SpotifyLogo,
    name: "إطلاق تطبيق الهاتف المحمول الخاص بنا",
    members: [avatar2, avatar3, avatar7, avatar8],
    budget: "$32,000",
    progression: 100,
  },
  {
    logo: JiraLogo,
    name: "أضف صفحة التسعير الجديدة",
    members: [avatar10, avatar3, avatar7, avatar2, avatar8],
    budget: "$400",
    progression: 25,
  },
  {
    logo: InvisionLogo,
    name: "إعادة تصميم متجر جديد على الإنترنت",
    members: [avatar9, avatar3, avatar2],
    budget: "$7,600",
    progression: 40,
  },
];

export const rtlTimelineData = [
  {
    logo: FaBell,
    title: "$2400, تغييرات في التصميم",
    date: "22 DEC 7:20 PM",
    color: "teal.300",
  },
  {
    logo: FaHtml5,
    title: "طلب جديد #4219423",
    date: "21 DEC 11:21 PM",
    color: "orange",
  },
  {
    logo: FaShoppingCart,
    title: "مدفوعات الخادم لشهر أبريل",
    date: "21 DEC 9:28 PM",
    color: "blue.400",
  },
  {
    logo: FaCreditCard,
    title: "تمت إضافة بطاقة جديدة للطلب #3210145",
    date: "20 DEC 3:52 PM",
    color: "orange.300",
  },
  {
    logo: SiDropbox,
    title: "فتح الحزم من أجل التنمية",
    date: "19 DEC 11:35 PM",
    color: "purple",
  },
  {
    logo: AdobexdLogo,
    title: "طلب جديد #9851258",
    date: "18 DEC 4:41 PM",
  },
];

export const tablesTableData = [
  {
    logo: avatar1,
    name: "Joel Sigüenza",
    email: "siguenzajoel10@gmail.com",
    dni: 76411904,
    subdomain: "Manager",
    domain: "Administrador",
    status: true,
    date: "01/10/24",
  },
  {
    logo: avatar1,
    name: "User 02",
    email: "user2@gmail.com",
    dni: 70011904,
    subdomain: "Manager",
    domain: "Administrador",
    status: false,
    date: "01/10/24",
  },
  {
    logo: avatar1,
    name: "User 03",
    email: "user3@gmail.com",
    dni: 77711904,
    subdomain: "Manager",
    domain: "Vendedor",
    status: true,
    date: "05/10/24",
  },
  {
    logo: avatar1,
    name: "User 04",
    email: "user4@gmail.com",
    dni: 87712004,
    subdomain: "Manager",
    domain: "Administrador",
    status: false,
    date: "05/10/24",
  },
  {
    logo: avatar1,
    name: "User 05",
    email: "user5@gmail.com",
    dni: 87811904,
    subdomain: "Manager",
    domain: "Vendedor",
    status: true,
    date: "05/10/24",
  },
  {
    logo: avatar1,
    name: "User 06",
    email: "user6@gmail.com",
    dni: 71111904,
    subdomain: "Manager",
    domain: "Administrador",
    status: true,
    date: "05/10/24",
  },
  {
    logo: avatar1,
    name: "User 07",
    email: "user7@gmail.com",
    dni: 77000904,
    subdomain: "Manager",
    domain: "Administrador",
    status: true,
    date: "05/10/24",
  },
  /* {
    logo: avatar2,
    name: "Alexa Liras",
    email: "laurent@simmmple.com",
    subdomain: "Programmer",
    domain: "Developer",
    status: "Offline",
    date: "12/05/21",
  },
  {
    logo: avatar3,
    name: "Laurent Michael",
    email: "laurent@simmmple.com",
    subdomain: "Executive",
    domain: "Projects",
    status: "Online",
    date: "07/06/21",
  },
  {
    logo: avatar4,
    name: "Freduardo Hill",
    email: "freduardo@simmmple.com",
    subdomain: "Manager",
    domain: "Organization",
    status: "Online",
    date: "14/11/21",
  },
  {
    logo: avatar5,
    name: "Daniel Thomas",
    email: "daniel@simmmple.com",
    subdomain: "Programmer",
    domain: "Developer",
    status: "Offline",
    date: "21/01/21",
  },
  {
    logo: avatar7,
    name: "Mark Wilson",
    email: "mark@simmmple.com",
    subdomain: "Designer",
    domain: "UI/UX Design",
    status: "Offline",
    date: "04/09/20",
  }, */
];

export const tablesProjectDataInventory = [
  {
    logo: AdobexdLogo,
    name: "Pantalón Jean de Caballero",
    budget: "S/. 65",
    status: "45",
    category: "Pantalones",
    progression: 60,
  },
  {
    logo: AtlassianLogo,
    name: "Polo de Algodón Cuello V",
    budget: "S/. 25",
    status: "20",
    progression: 40,
    category: "Polos",
  },
  {
    logo: SlackLogo,
    name: "Cafarena de Dama",
    budget: "S/. 25",
    status: "10",
    category: "Cafarenas",
    progression: 100,
  },
  {
    logo: SpotifyLogo,
    name: "Pant. Jean Palazo",
    budget: "S/. 60",
    status: "12",
    category: "Pantalones",
    progression: 100,
  },
];

export const tablesProjectDataClient = [
  {
    logo: AdobexdLogo,
    name: "Gabriel Palacios",
    dni: 76411904,
    phone: "987654321",
    budget: "S/. 1400",
    email: "gpal@gmail.com",
    status: "Working",
  },
  {
    logo: AtlassianLogo,
    name: "Maria Guevara",
    dni: 76411904,
    phone: "987653331",
    budget: "S/. 400",
    email: "mgar@gmail.com",
    status: "Working",
  },
  {
    logo: SlackLogo,
    name: "Felipe Castillo",
    dni: 76411900,
    phone: "987653300",
    budget: "S/. 40",
    email: "fcast@gmail.com",
    status: "Working",
  },
  {
    logo: SpotifyLogo,
    name: "Ana Sandoval",
    dni: 76412000,
    phone: "98744653",
    budget: "S/. 240",
    email: "sand@gmail.com",
    status: "Working",
  },
];

export const invoicesData = [
  {
    date: "March, 01, 2020",
    code: "#MS-415646",
    price: "$180",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "February, 10, 2020",
    code: "#RV-126749",
    price: "$250",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "April, 05, 2020",
    code: "#FB-212562",
    price: "$560",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "June, 25, 2019",
    code: "#QW-103578",
    price: "$120",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "March, 01, 2019",
    code: "#AR-803481",
    price: "$300",
    logo: FaFilePdf,
    format: "PDF",
  },
];

export const billingData = [
  {
    name: "Oliver Liam",
    company: "Viking Burrito",
    email: "oliver@burrito.com",
    number: "FRB1235476",
  },
  {
    name: "Lucas Harper",
    company: "Stone Tech Zone",
    email: "lucas@stone-tech.com",
    number: "FRB1235476",
  },
  {
    name: "Ethan James",
    company: "Fiber Notion",
    email: "ethan@fiber.com",
    number: "FRB1235476",
  },
];

export const newestTransactions = [
  {
    name: "Netflix",
    date: "27 March 2021, at 12:30 PM",
    price: "- $2,500",
    logo: FaArrowDown,
  },
  {
    name: "Apple",
    date: "27 March 2021, at 12:30 PM",
    price: "+ $2,500",
    logo: FaArrowUp,
  },
];

export const olderTransactions = [
  {
    name: "Stripe",
    date: "26 March 2021, at 13:45 PM",
    price: "+ $800",
    logo: FaArrowUp,
  },
  {
    name: "HubSpot",
    date: "26 March 2021, at 12:30 PM",
    price: "+ $1,700",
    logo: FaArrowUp,
  },
  {
    name: "Webflow",
    date: "26 March 2021, at 05:00 PM",
    price: "Pending",
    logo: AiOutlineExclamation,
  },
  {
    name: "Microsoft",
    date: "25 March 2021, at 16:30 PM",
    price: "- $987",
    logo: FaArrowDown,
  },
];

export const salesData = [
  {
    customerName: "Carlos Pérez",
    product: "Camiseta Deportiva",
    saleDate: "2024-10-10",
    payment: "Tarjeta de Crédito",
    totalSale: "$35",
    status: "Completa",
  },
  {
    customerName: "Ana Gomez",
    product: "Vestido de Fiesta",
    saleDate: "2024-10-12",
    payment: "Yape",
    totalSale: "$120",
    status: "Completa",
  },
  {
    customerName: "Luis Rojas",
    product: "Zapatos de Cuero",
    saleDate: "2024-10-14",
    payment: "Plin",
    totalSale: "$85",
    status: "Pendiente",
  },
];