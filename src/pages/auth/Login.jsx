import React, { useEffect, useState } from "react";
// css
import "./login.scss";
// npm
import { TextField, Grid, FormHelperText } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import toastr from "toastr";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// constants
import { API_URL, ROUTES_URL } from "../../constants/url.constant";
import { API_STATUS_CODE } from "../../constants/content.constant";
// utils
import {
  postMethod,
  StoredVariables,
  setSessionState,
  getSessionState,
  regexEmail,
  regexPassword,
} from "src/utils";
// components
import { CustomBackdrop, Logo } from "src/components";
// redux
import { actionUser } from "src/store/slices/user.slice";

export default function Login(props) {
  const { t } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location?.state?.role?.id) {
      navigate(ROUTES_URL.HOME);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleValidate = (fields) => {
    const newErrors = {};

    if (!fields?.email) {
      newErrors.email = t("message.FIELDS_REQUIRED");
    } else {
      if (!regexEmail.test(fields?.email)) {
        newErrors.email = t("message.INVALID_EMAIL");
      }
    }

    if (!fields?.password) {
      newErrors.password = t("message.FIELDS_REQUIRED");
    } else {
      if (!regexPassword.test(fields?.password)) {
        newErrors.password = t("message.PASSWORD_SHOULD_8_CHAR");
      }
    }

    setFormErrors(newErrors);
    // Return true if the form is valid (no errors)
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!handleValidate(formState)) return false;

      setLoading(true);
      const paylaod = { ...formState, user_type: location?.state?.role?.id };

      const response = await postMethod(API_URL.LOGIN, paylaod, false, false);
      // console.log("login-response", response);

      if (response?.status === API_STATUS_CODE.SUCCESS) {
        if (response?.data?.success) {
          toastr.success(t("message.LOGIN_SUCCESS"));
          setSessionState(
            StoredVariables.authToken,
            response?.data?.data?.token,
            false
          );
          dispatch(actionUser(response?.data?.data));
          window.location.href = ROUTES_URL.DASHBOARD;
        } else {
          toastr.error(response?.data?.message);
          // setSessionState(
          //   StoredVariables.authToken,
          //   "response?.data?.data?.token",
          //   false
          // );
        }
      } else {
        toastr.error(t("message.SOMETHING_WENT_WRONG"));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const isAuthenticated = getSessionState(StoredVariables.authToken);

  if (isAuthenticated) {
    return <Navigate to={ROUTES_URL.DASHBOARD} state={{ from: location }} />;
  }
  return (
    <CustomBackdrop loading={loading}>
      <Grid
        container
        className="login-page"
        style={{ backgroundImage: "url(/images/bg-pattern.png)" }}
      >
        <Grid item xs={12} md={6} className="login-right">
          <div className="logo-wrapper">
            <Logo src="/logo-purple.svg" sx={{ width: "350px" }} />
          </div>
        </Grid>
        <Grid item xs={12} md={6} className="login-left">
          <div className="login-here">
            <form
              onSubmit={(event) => handleSubmit(event)}
              className="login-form"
            >
              <div>
                <TextField
                  hiddenLabel
                  variant="filled"
                  id="email"
                  placeholder={t("Kullanıcı adı")}
                  type="email"
                  name="email"
                  className={`login-field ${
                    formErrors?.email ? "error" : null
                  }`}
                  fullWidth
                  onChange={(e) => handleChange(e)}
                  value={formState?.email || ""}
                  InputLabelProps={{ required: false }}
                />
                {formErrors?.email ? (
                  <FormHelperText className="login-error">
                    {formErrors?.email}
                  </FormHelperText>
                ) : null}
              </div>
              <div>
                <TextField
                  hiddenLabel
                  variant="filled"
                  id="password"
                  placeholder={t("Şifre")}
                  type="password"
                  name="password"
                  className={`login-field ${
                    formErrors?.password ? "error" : null
                  }`}
                  fullWidth
                  onChange={(e) => handleChange(e)}
                  value={formState?.password || ""}
                  InputLabelProps={{ required: false }}
                />
                {formErrors?.password ? (
                  <FormHelperText className="login-error">
                    {formErrors?.password}
                  </FormHelperText>
                ) : null}
              </div>
              <div className="login-submit">
                <LoadingButton
                  loading={loading}
                  variant="text"
                  color="secondary"
                  // className=" w-full mt-16"
                  className="login-submit-btn"
                  aria-label="Sign in"
                  type="submit"
                >
                  {loading ? t("Giriş") + "..." : t("Giriş")}
                </LoadingButton>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </CustomBackdrop>
  );
}
