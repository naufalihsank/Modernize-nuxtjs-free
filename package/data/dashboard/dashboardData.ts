import type { productCardType } from "@/types/dashboard/index";
import proimg1 from "/images/products/s4.jpg";
import proimg2 from "/images/products/s5.jpg";
import proimg3 from "/images/products/s7.jpg";
import proimg4 from "/images/products/s11.jpg";

interface logEntryType {
  title: string;
  subtitle: string;
  textcolor: string;
  boldtext: boolean;
  line: boolean;
  link: string;
  url: string;
}

interface productPerformanceType {
  id: number;
  name: string;
  post: string;
  pname: string;
  status: string;
  statuscolor: string;
  budget: string;
}

export interface productCardType {
  title: string;
  link: string;
  photo: string;
  salesPrice: number;
  price: number;
  rating: number;
}

/*-- Recent API Logs --*/
export const recentLogs: logEntryType[] = [
  {
    title: "09:30 am",
    subtitle: "200 OK - GET /api/users",
    textcolor: "success",
    boldtext: true,
    line: true,
    link: "",
    url: "",
  },
  {
    title: "10:00 am",
    subtitle: "500 Error - POST /api/orders",
    textcolor: "error",
    boldtext: false,
    line: true,
    link: "",
    url: "",
  },
  {
    title: "10:15 am",
    subtitle: "404 Not Found - GET /api/products/99",
    textcolor: "warning",
    boldtext: false,
    line: true,
    link: "",
    url: "",
  },
  {
    title: "11:00 am",
    subtitle: "201 Created - POST /api/users",
    textcolor: "success",
    boldtext: false,
    line: false,
    link: "",
    url: "",
  },
  {
    title: "12:00 pm",
    subtitle: "401 Unauthorized - GET /api/admin",
    textcolor: "error",
    boldtext: false,
    line: false,
    link: "",
    url: "",
  },
];
export const productPerformance: productPerformanceType[] = [
  {
    id: 1,
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    status: "Low",
    statuscolor: "primary",
    budget: "$3.9k",
  },
  {
    id: 2,
    name: "Andrew McDownland",
    post: "Project Manager",
    pname: "Real Homes WP Theme",
    status: "Medium",
    statuscolor: "secondary",
    budget: "$24.5k",
  },
  {
    id: 3,
    name: "Christopher Jamil",
    post: "Project Manager",
    pname: "MedicalPro WP Theme",
    status: "High",
    statuscolor: "error",
    budget: "$12.8k",
  },
  {
    id: 4,
    name: "Nirav Joshi",
    post: "Frontend Engineer",
    pname: "Hosting Press HTML",
    status: "Critical",
    statuscolor: "success",
    budget: "$2.4k",
  },
];

export const productsCard: productCardType[] = [
  {
    title: "Boat Headphone",
    link: "/",
    photo: proimg1,
    salesPrice: 375,
    price: 285,
    rating: 4,
  },
  {
    title: "MacBook Air Pro",
    link: "/",
    photo: proimg2,
    salesPrice: 650,
    price: 900,
    rating: 5,
  },
  {
    title: "Red Velvet Dress",
    link: "/",
    photo: proimg3,
    salesPrice: 150,
    price: 200,
    rating: 3,
  },
  {
    title: "Cute Soft Teddybear",
    link: "/",
    photo: proimg4,
    salesPrice: 285,
    price: 345,
    rating: 2,
  },
];
