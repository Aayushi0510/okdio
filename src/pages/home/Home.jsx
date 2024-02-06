import React from "react";
// css
import "./home.scss";
// npm
import { Button, Grid } from "@mui/material";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
// constants
import { ROUTES_URL } from "../../constants/url.constant";
// utils
import { StoredVariables, getSessionState } from "src/utils";
// components
import { Logo } from "src/components";

export default function Home(props) {
  const { t } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigateButton = (user) =>
    navigate(ROUTES_URL.LOGIN, { state: { role: user } });

  const isAuthenticated = getSessionState(StoredVariables.authToken);

  if (isAuthenticated) {
    return <Navigate to={ROUTES_URL.DASHBOARD} state={{ from: location }} />;
  }
  return (
    <Grid
      container
      className="home-page"
      style={{ backgroundImage: "url(/images/bg-pattern.png)" }}
    >
      <Grid item xs={12} md={6} className="home-right">
        <div className="logo-wrapper">
          <Logo src="/logo.svg" sx={{ width: "350px" }} />
        </div>
      </Grid>
      <Grid item xs={12} md={6} className="home-left">
        <div className="home-here">
          <div className="home-user">
            <Button
              variant="contained"
              color="secondary"
              className="home-user-btn bg-secondary"
              onClick={() => handleNavigateButton({ name: "teacher", id: "3" })}
            >
              {t("Öğretmen Girişi")}
            </Button>
          </div>
          {/* <div className="home-user">
            <Button
              variant="contained"
              color="primary"
              className="home-user-btn bg-primary"
              onClick={() => handleNavigateButton({ name: "student", id: "2" })}
            >
              {t("Öğrenci Girişi")}
            </Button>
          </div> */}
          <div className="home-user">
            <Button
              variant="contained"
              color="primary"
              className="home-user-btn bg-primary"
              onClick={() =>
                handleNavigateButton({ name: "schoolAdmin", id: "5" })
              }
            >
              {t("Yöneticisi Girişi")}
            </Button>
          </div>
        </div>
        <div className="home-footer">
          <Link to={ROUTES_URL.ABOUT} className="link">
            {t("Hakkımızda")}
          </Link>
        </div>
      </Grid>
    </Grid>
  );
}
