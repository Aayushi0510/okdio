import { useState } from "react";
// npm
import { useDispatch } from "react-redux";
import toastr from "toastr";
import { useTranslation } from "react-i18next";
// constants
import { API_URL, ROUTES_URL } from "src/constants/url.constant";
import { API_STATUS_CODE } from "src/constants/content.constant";
// utils
import { getMethod } from "src/utils";
// redux
import { actionCLearUser } from "src/store/slices/user.slice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  /**
   * @description get api to logout
   * @memberof useLogout
   */
  const handleLogout = async (req) => {
    try {
      setLoading(true);

      const response = await getMethod(API_URL.LOGOUT, false, true);

      if (response?.status === API_STATUS_CODE.SUCCESS) {
        if (response?.data?.success) {
          dispatch(actionCLearUser());
          sessionStorage.clear();
          localStorage.clear();

          toastr.success(t("message.LOGOUT_SUCCESS"));
          // navigate(ROUTES_URL.HOME);
          window.location.href = ROUTES_URL.HOME;
        } else {
          toastr.error(response?.data?.message);
        }
      } else {
        toastr.error(t("message.SOMETHING_WENT_WRONG"));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    logout: handleLogout,
    logoutLoading: loading,
  };
};
