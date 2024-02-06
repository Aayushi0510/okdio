import React, { useState, useEffect } from "react";
// npm
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Paper,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { useSelector } from "react-redux";
// Components
import { CustomBackdrop } from "src/components";
import { useExport, useTable } from "src/hooks";
import { StyledTableRow } from "src/components/@material-extend";
// utils
import { API_URL } from "src/constants/url.constant";

const TABLE_HEAD = [
  {
    id: "Sıra",
    name: "id",
    label: "Sıra",
    alignRight: false,
    sort: false,
  },

  {
    id: "En çok kitap okuyan öğrenci",
    name: "class_read",
    label: "En çok kitap okuyan öğrenci",
    alignRight: false,
    sort: false,
  },
  {
    id: "En çok kitap dinleyen öğrenci",
    name: "class_listen",
    label: "En çok kitap dinleyen öğrenci",
    alignRight: false,
    sort: false,
  },
];

const ReportLeaderBoardTable = (props) => {
  const { t, classReports } = props;
  const user = useSelector(({ user }) => user);
  const userType = user?.data?.user_type;
  const [tableHead, setTableHead] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [allData, setAllData] = useState(null);

  const totalRows = Array.isArray(classReports) ? classReports?.length : 0;

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { exportFile, exportLoading } = useExport();

  const { TblContainer, TblHead } = useTable(
    tableData || classReports || [],
    tableHead,
    "id",
    "reportLead",
    totalRows,
    page,
    rowsPerPage,
    setPage,
    allData
  );
  useEffect(() => {
    if (userType === "3") {
      const teacherHead = TABLE_HEAD;
      setTableHead(teacherHead);
    } else {
      const schoolHead = [
        {
          id: "Sıra",
          name: "id",
          label: "Sıra",
          alignRight: false,
        },

        {
          id: "En çok kitap okuyan sınıflar",
          name: "class_read",
          label: "En çok kitap okuyan sınıflar",
          alignRight: false,
        },
        {
          id: "En çok kitap dinleyen sınıflar",
          name: "class_listen",
          label: "En çok kitap dinleyen sınıflar",
          alignRight: false,
        },
      ];
      setTableHead(schoolHead);
    }

    setTableData(classReports);
  }, [userType, classReports]);

  const handleExportExcel = () => {
    exportFile(API_URL.GET_CLASS_REPORT_CSV, "classReport");
  };

  const emptyRows = 0;

  // console.log("leader-b-table", tableData, exportLoading);
  const isDisabled = tableData && tableData?.length > 0;

  return (
    <CustomBackdrop loading={loading || exportLoading}>
      <Container maxWidth="xl">
        <Card sx={{ padding: "20px" }}>
          {/* title bar start */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent=""
            spacing={3}
          >
            <Stack mb={2} sx={{ width: "100%" }}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  color: "#6A707E",
                  fontFamily: "fontFamily2",
                  fontSize: "24px !important",
                  fontWeight: "400",
                }}
              >
                {t("reports.table.title")}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={3}
              sx={{ width: "100%" }}
            >
              <Stack padding={1}>
                <Button
                  variant="contained"
                  onClick={() => handleExportExcel()}
                  sx={{ backgroundColor: "success.main" }}
                  className="okudio-btn"
                  disabled={!isDisabled}
                >
                  {t("Excel")}
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Paper
            sx={{
              marginTop: "15px",
            }}
            className="overflow-hidden"
          >
            <TblContainer name={"reportleaderBoard" || "table"}>
              <TblHead />
              <TableBody>
                {tableData &&
                  tableData?.length > 0 &&
                  tableData?.map((row, index) => {
                    return (
                      <StyledTableRow
                        hover
                        tabIndex={-1}
                        key={
                          index + row?.id + row?.class_read + row?.class_listen
                        }
                      >
                        <TableCell align="left">
                          {row?.id || index + 1}
                        </TableCell>
                        <TableCell align="left">{row?.class_read}</TableCell>
                        <TableCell align="left">{row?.class_listen}</TableCell>
                      </StyledTableRow>
                    );
                  })}

                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={TABLE_HEAD.length} />
                  </TableRow>
                )}
                {tableData?.length === 0 && (
                  <TableRow
                    style={{
                      height: 33,
                    }}
                  >
                    <TableCell colSpan={TABLE_HEAD.length} align="center">
                      {t("message.NO_RECORDS_FOUND")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </TblContainer>
          </Paper>
        </Card>
      </Container>
    </CustomBackdrop>
  );
};

export default ReportLeaderBoardTable;
