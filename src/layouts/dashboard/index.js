// import { useState } from "react";
import { Outlet } from "react-router-dom";
// library
import { styled } from "@mui/material/styles";
// components
import DashboardNavbar from "./navbar/DashboardNavbar";

// ----------------------------------------------------------------------
// const PATH = [];
const NAV_HEIGHT = 163 + 30;
const NAV_HEIGHT_MOBILE = 163 + 80;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  // paddingTop: 10,
  // paddingBottom: theme.spacing(2),
  position: "relative",
  marginTop: NAV_HEIGHT + "px",
  padding: `10px 30px`,

  [theme.breakpoints.down("md")]: {
    padding: `10px`,
    marginTop: NAV_HEIGHT_MOBILE + "px",
  },
  // [theme.breakpoints.between(500, 930)]: {
  //   paddingTop: PATH.includes(window.location.pathname)
  //     ? NAV_HEIGHT +
  //       (window.location.pathname === "/dashboard/routenplaner" ? 60 : 30)
  //     : NAV_HEIGHT - 10,
  //   paddingLeft: 0,
  //   paddingRight: 0,
  // },
  // [theme.breakpoints.between(930, 1024)]: {
  //   paddingTop: NAV_HEIGHT - 50,
  //   paddingLeft: 0,
  //   paddingRight: 0,
  // },
  // [theme.breakpoints.up(1000)]: {
  //   paddingTop: PATH.includes(window.location.pathname) ? 30 : 45,
  //   paddingLeft: theme.spacing(2),
  //   paddingRight: theme.spacing(2),
  // },
}));

// ----------------------------------------------------------------------
export default function DashboardLayout(props) {
  const { t } = props;
  return (
    <RootStyle>
      <DashboardNavbar t={t} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
