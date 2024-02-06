import React, { useState, useEffect } from "react";
// css
import "./reports.scss";
// components
import ReportLeaderBoardTable from "./ReportLeaderBoardTable";
import ReportFilterTable from "./ReportFilterTable";
import ReportProgress from "./ReportProgress";
import { CustomBackdrop } from "src/components";
// npm
import { Grid } from "@mui/material";
// constants
import { API_URL } from "src/constants/url.constant";
import { API_STATUS_CODE } from "src/constants/content.constant";
// utils
import { postMethod } from "src/utils";

const Reports = (props) => {
  const { t } = props;
  const [loading, setLoading] = useState(false);

  const [classReports, setClassReports] = useState([]);
  const [classReportsAll, setClassReportsAll] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await postMethod(API_URL.GET_CLASS_REPORT, false, true);
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        const newData = response?.data?.data;

        setClassReports(newData);
        setClassReportsAll(response?.data);

        setLoading(false);
      } else {
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CustomBackdrop loading={loading}>
      <div className="reportsPage">
        <Grid container className="reportsPage-top">
          <Grid item xs={12} md={7}>
            <ReportLeaderBoardTable t={t} classReports={classReports} />
          </Grid>
          <Grid item xs={12} md={5}>
            <ReportProgress t={t} classReportsAll={classReportsAll} />
          </Grid>
        </Grid>

        <div className="reportsPage-table">
          <ReportFilterTable t={t} />
        </div>
      </div>
    </CustomBackdrop>
  );
};

export default Reports;
