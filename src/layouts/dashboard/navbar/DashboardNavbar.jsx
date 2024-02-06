// css
import "./dashboardNavbar.scss";
// npm
import { alpha, styled } from "@mui/material/styles";
import { AppBar, Grid, Toolbar, Avatar } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// constants
import { ROUTES_URL } from "src/constants/url.constant";
// import { stringAvatar } from "src/utils";
// components
import { NavSection } from "src/components";
import sidebarConfig from "../SidebarConfig";
import ProfilePopover from "src/components/selection/ProfilePopover";
// ----------------------------------------------------------------------

// const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 163;
const APPBAR_DESKTOP = 163;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: "#ffffff",
  zIndex: 0,
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  padding: "0px",
  alignItems: "flex-start",
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: "0px",
  },
}));

// ----------------------------------------------------------------------

export default function DashboardNavbar(props) {
  const { t } = props;
  const navigate = useNavigate();
  const user = useSelector(({ user }) => user?.data);

  return (
    <RootStyle>
      <ToolbarStyle>
        <Grid container className="header-container">
          <Grid item xs={12} className="header-top">
            <div className="header-top-logo">
              <img
                src="/logo.svg"
                alt="logo"
                onClick={() => navigate(ROUTES_URL.DASHBOARD)}
                className="pointer"
              />
            </div>
            <div className="header-top-icons">
              {/* <span>
                <EmailIcon className="icon" />
                <div className="notification-dot"></div>
              </span>
              <span>
                <NotificationsIcon className="icon" />
                <div className="notification-dot bell"></div>
              </span> */}
              <span className="avatar">
                <ProfilePopover user={user} />
                <span className="avatar-detail">
                  <span className="avatar-name">{user?.name || ""}</span>
                  <span className="avatar-email">{user?.email || ""}</span>
                </span>
              </span>
            </div>
          </Grid>
          <Grid item xs={12} className="header-nav">
            <NavSection navConfig={sidebarConfig} anchor={"top"} t={t} />
          </Grid>
        </Grid>
      </ToolbarStyle>
    </RootStyle>
  );
}
