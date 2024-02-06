import { lazy, memo } from "react";
// library
import { Navigate, useRoutes, Outlet } from "react-router-dom";
// constants
import { ROUTES_URL } from "src/constants/url.constant";

// layouts
const DashboardLayout = lazy(() => import("src/layouts/dashboard"));
const LogoOnlyLayout = lazy(() => import("src/layouts/LogoOnlyLayout"));
// public pages
const LoginPage = lazy(() => import("src/pages/auth/Login"));
const HomePage = lazy(() => import("src/pages/home/Home"));
const AboutPage = lazy(() => import("src/pages/aboutus/AboutUs"));
const NotFound = lazy(() => import("src/pages/Page404/Page404.page"));
const LogoutPage = lazy(() => import("src/pages/auth/Logout"));
// private pages
const Dashboard = lazy(() => import("src/pages/dashboard/Dashboard"));

const Classes = lazy(() => import("src/pages/classes/Classes"));
const Evaluation = lazy(() => import("src/pages/evaluation/Evaluation"));
const Task = lazy(() => import("src/pages/task/Task"));
const Reports = lazy(() => import("src/pages/reports/Reports"));

const Bookcase = lazy(() => import("src/pages/bookcase/Bookcase"));
const SingleBook = lazy(() =>
  import("src/pages/bookcase/singleBook/SingleBook")
);

const BookContent = lazy(() => import("src/pages/bookContent/BookContent"));
const Blog = lazy(() => import("src/pages/blogs/Blog"));
const Resources = lazy(() => import("src/pages/resources/Resources"));
const Academy = lazy(() => import("src/pages/academy/Academy"));
const Help = lazy(() => import("src/pages/help/Help"));

const Profile = lazy(() => import("src/pages/profile/Profile"));

// components
const PrivateRoute = lazy(() =>
  import("src/components/privateRoute/PrivateRoute")
);

const RoutesWrap = (props) => {
  const { t, i18n } = props;

  const appSplitStr = "/app/";

  return useRoutes([
    {
      path: ROUTES_URL.DASHBOARD,
      element: (
        <PrivateRoute>
          <DashboardLayout t={t} i18n={i18n} />
        </PrivateRoute>
      ),
      children: [
        { element: <Navigate to={ROUTES_URL.DASHBOARD} replace /> },
        {
          path: "",
          element: <Outlet />,
          children: [{ path: "", element: <Dashboard t={t} i18n={i18n} /> }],
        },
        {
          path: ROUTES_URL.CLASSES.split(appSplitStr)[1],
          element: <Outlet />,
          children: [{ path: "", element: <Classes t={t} i18n={i18n} /> }],
        },
        {
          path: ROUTES_URL.TASKS.split(appSplitStr)[1],
          element: <Outlet />,
          children: [{ path: "", element: <Task t={t} i18n={i18n} /> }],
        },
        {
          path: ROUTES_URL.EVALUATION.split(appSplitStr)[1],
          element: <Outlet />,
          children: [{ path: "", element: <Evaluation t={t} i18n={i18n} /> }],
        },
        {
          path: ROUTES_URL.REPORTS.split(appSplitStr)[1],
          element: <Outlet />,
          children: [{ path: "", element: <Reports t={t} i18n={i18n} /> }],
        },
        {
          path: ROUTES_URL.BOOKCASE.split(appSplitStr)[1],
          element: <Outlet />,
          children: [{ path: "", element: <Bookcase t={t} i18n={i18n} /> }],
        },
        {
          path: ROUTES_URL.BOOK.split(appSplitStr)[1],
          element: <Outlet />,
          children: [{ path: "", element: <SingleBook t={t} i18n={i18n} /> }],
        },
        {
          path: ROUTES_URL.BOOK_CONTENT.split(appSplitStr)[1],
          element: <Outlet />,
          children: [{ path: "", element: <BookContent t={t} i18n={i18n} /> }],
        },
        {
          path: ROUTES_URL.BLOG.split(appSplitStr)[1],
          element: <Outlet />,
          children: [{ path: "", element: <Blog t={t} i18n={i18n} /> }],
        },
        {
          path: ROUTES_URL.RESOURCES.split(appSplitStr)[1],
          element: <Outlet />,
          children: [{ path: "", element: <Resources t={t} i18n={i18n} /> }],
        },
        {
          path: ROUTES_URL.ACADEMY.split(appSplitStr)[1],
          element: <Outlet />,
          children: [{ path: "", element: <Academy t={t} i18n={i18n} /> }],
        },
        {
          path: ROUTES_URL.PROFILE.split(appSplitStr)[1],
          element: <Outlet />,
          children: [{ path: "", element: <Profile t={t} i18n={i18n} /> }],
        },
        {
          path: ROUTES_URL.HELP.split(appSplitStr)[1],
          element: <Outlet />,
          children: [{ path: "", element: <Help t={t} i18n={i18n} /> }],
        },
        {
          path: ROUTES_URL.LOGOUT.split(appSplitStr)[1],
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <LogoutPage t={t} i18n={i18n} />,
            },
          ],
        },
      ],
    },

    {
      path: ROUTES_URL.HOME,
      element: <LogoOnlyLayout onlyChildren />,
      children: [
        {
          path: "/",
          element: <Outlet />,
          children: [{ path: "/", element: <HomePage t={t} i18n={i18n} /> }],
        },
        {
          path: ROUTES_URL.LOGIN.split("/")[1],
          element: <LoginPage t={t} i18n={i18n} />,
        },
        {
          path: ROUTES_URL.ABOUT.split("/")[1],
          element: <AboutPage t={t} i18n={i18n} />,
        },
        {
          path: ROUTES_URL.NOT_FOUND.split("/")[1],
          element: <NotFound t={t} i18n={i18n} />,
        },
        {
          path: "/",
          element: <Navigate to={ROUTES_URL.HOME} />,
        },
        { path: "*", element: <Navigate to={ROUTES_URL.NOT_FOUND} /> },
      ],
    },

    { path: "*", element: <Navigate to={ROUTES_URL.NOT_FOUND} replace /> },
  ]);
};

export default memo(RoutesWrap);
