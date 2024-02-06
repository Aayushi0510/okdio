import { useState } from "react";
// npm
import toastr from "toastr";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// constants
// import { API_URL } from "src/constants/url.constant";
import { API_STATUS_CODE } from "src/constants/content.constant";
// utils
import { getMethod } from "src/utils";
import ExportFiles from "src/utils/exportFiles";

export const useExport = () => {
  const { t } = useTranslation();
  const user = useSelector(({ user }) => user);
  const userId = user?.data?.id;
  // console.log("user?.data", user?.data);
  const [loading, setLoading] = useState(false);

  /**
   * @description get api to export file in csv or excel
   * @memberof useExport
   */
  const handleExport = async (apiUrl, fileName, passUserType) => {
    try {
      setLoading(true);
      const url = passUserType
        ? apiUrl + "/" + user?.data?.user_type + "/" + userId
        : apiUrl + "/" + userId;
      const response = await getMethod(url, false, true);

      if (response?.status === API_STATUS_CODE.SUCCESS) {
        ExportFiles("", response?.data, "csv", fileName);
      } else {
        toastr.error(t("message.SOMETHING_WENT_WRONG"));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    exportFile: handleExport,
    exportLoading: loading,
  };
};
