// constants
import { ROUTES_URL } from "src/constants/url.constant";
// ----------------------------------------------------------------------

const sidebarConfig = [
  {
    title: "ANASAYFA",
    path: ROUTES_URL.DASHBOARD,
  },
  {
    title: "SINIFLAR",
    path: ROUTES_URL.CLASSES,
  },
  {
    title: "GÖREVLER",
    path: ROUTES_URL.TASKS,
  },
  { title: "DEĞERLENDİRME", path: ROUTES_URL.EVALUATION },
  { title: "RAPORLAR", path: ROUTES_URL.REPORTS },

  {
    title: "KİTAPLIK",
    path: ROUTES_URL.BOOKCASE,
  },
  {
    title: "KAYNAKLAR",
    path: ROUTES_URL.RESOURCES,
  },
  {
    title: "AKADEMİ",
    path: ROUTES_URL.ACADEMY,
  },
  {
    title: "BLOG",
    path: ROUTES_URL.BLOG,
  },

  {
    title: "YARDIM",
    path: ROUTES_URL.HELP,
  },
];

export default sidebarConfig;
