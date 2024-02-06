import React from "react";
// css
import "./aboutus.scss";
// library
import { Grid } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
// constants
import { ROUTES_URL } from "../../constants/url.constant";
// utils
import { StoredVariables, getSessionState } from "src/utils";
import { Trans } from "react-i18next";
// components
import { Logo } from "src/components";

export default function Home(props) {
  const { t } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = getSessionState(StoredVariables.authToken);

  if (isAuthenticated) {
    return <Navigate to={ROUTES_URL.DASHBOARD} state={{ from: location }} />;
  }
  return (
    <Grid
      container
      className="about-page"
      style={{ backgroundImage: "url(/images/bg-pattern.png)" }}
    >
      <Grid item xs={12} md={6} className="about-right">
        <div className="logo-wrapper">
          <Logo src="/logo-blue.svg" sx={{ width: "350px" }} />
        </div>
      </Grid>
      <Grid item xs={12} md={6} className="about-left">
        <div className="about-here">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>

          <p>
            <Trans t={t} i18nKey={"about.p3"}>
              <span>OKUDIO</span> ilkokul çağında öğrenciler için farklı öğrenme
              maceraları sunuyor.
            </Trans>
          </p>
          <p>{t("about.p4")}</p>
        </div>
      </Grid>
    </Grid>
  );
}
