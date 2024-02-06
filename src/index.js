// css
import "./styles/main.scss";
import "simplebar/src/simplebar.css";
import "toastr/build/toastr.min.css";
// npm
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// redux
import store, { persistor } from "src/store";
// language
import "src/language/i18n";
// component
import App from "./App";

// ----------------------------------------------------------------------
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HelmetProvider>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </HelmetProvider>
);
