import React, { Suspense } from "react";
// npm
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router } from "react-router-dom";
// routes
import RoutesWrap from "src/routes/Routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import { Loader } from "./components";

export default function App() {
  const { t, i18n } = useTranslation();
  console.log("......App.js..........");
  return (
    <ThemeConfig>
      <Router>
        <GlobalStyles />

        <Suspense fallback={<Loader fallback={true} />}>
          <RoutesWrap t={t} i18n={i18n} />
        </Suspense>
      </Router>
    </ThemeConfig>
  );
}
