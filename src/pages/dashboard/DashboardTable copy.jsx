import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
// npm
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import debounce from "lodash/debounce";
// Components
import { CustomBackdrop, Searchbar, Selection } from "src/components";
import { useFetchStudentList, useTable } from "src/hooks";
import { StyledTableRow } from "src/components/@material-extend";

const TABLE_HEAD = [
  {
    id: "Sıra",
    name: "id",
    label: "Sıra",
    alignRight: false,
  },

  { id: "Okul", name: "Okul", label: "Okul", alignRight: false },
  {
    id: "Sınıf",
    name: "Sınıf",
    label: "Sınıf",
    alignRight: false,
  },
  {
    id: "Öğrenci",
    name: "Öğrenci",
    label: "Öğrenci",
    alignRight: false,
  },
  {
    id: "Okunan Kitap Sayısı",
    name: "Okunan Kitap Sayısı",
    label: "Okunan Kitap Sayısı",
    alignRight: false,
  },
  {
    id: "Toplam Okuma Süresi",
    name: "Toplam Okuma Süresi",
    label: "Toplam Okuma Süresi",
    alignRight: false,
  },
  {
    id: "Toplam Dinleme Süresi",
    name: "Toplam Dinleme Süresi",
    label: "Toplam Dinleme Süresi",
    alignRight: false,
  },
  {
    id: "Tamamlanan Etkinlik Sayısı",
    name: "Tamamlanan Etkinlik Sayısı",
    label: "Tamamlanan Etkinlik Sayısı",
    alignRight: false,
  },
];

const DashboardTable = (props) => {
  const { t } = props;
  const reduxData = useSelector(({ student }) => student?.data);
  const reduxDataTable = reduxData ? reduxData?.data : [];
  const totalRows = reduxData ? Number(reduxData?.total_record) : 0;
  const perPage = reduxData?.per_page || "10";
  const rowsPerPageOptions = [
    { label: 10, value: 10, id: 10 },
    { label: 20, value: 20, id: 20 },
    { label: 50, value: 50, id: 50 },
    { label: 100, value: 100, id: 100 },
    ...(totalRows > 100
      ? [{ label: totalRows, value: totalRows, id: "all" }]
      : []),
  ];

  const [loading, setLoading] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [searchTyped, setSearchTyped] = useState("");
  const [tableData, setTableData] = useState(reduxDataTable);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [schoolSelected, setSchoolSelected] = useState("");
  const [classSelected, setClassSelected] = useState("");
  const [studentSelected, setStudentSelected] = useState("");

  const { studentList, studentLoading, fetchStudent } = useFetchStudentList();
  const { TblContainer, TblHead, TblPagination, finalRecords } = useTable(
    tableData || [],
    TABLE_HEAD,
    "id",
    "student",
    totalRows,
    rowsPerPage,
    setPage,
    reduxData
  );
  console.log("reduxData", reduxData);

  console.log("studentList", studentList);
  console.log("rowsPerPage", rowsPerPage, perPage);
  useEffect(() => {
    if (reduxData) {
      setRowsPerPage(perPage);
      setTableData(reduxDataTable);
    } else {
      fetchStudent();
    }
  }, [reduxData]);

  // useEffect(() => {
  //   fetchStudent(classSelected, searchStr, rowsPerPage, page);
  // }, [classSelected, searchStr, rowsPerPage, page]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(1);
    fetchStudent(classSelected, searchStr, event.target.value, page);
  };

  const handleReloadData = () => {
    fetchStudent();
  };

  // Delay search by 600ms
  const delayedSearch = useRef(
    debounce((q) => fetchStudent(q), 600),
    []
  );

  const handleSearchChange = useCallback((event) => {
    event.preventDefault();
    setSearchStr(event.target.value);
    let debounceReq = {
      classId: classSelected,
      search: event.target.value,
      perPage: rowsPerPage,
      pageNumber: page,
    };
    delayedSearch?.current(debounceReq);
    // delayedSearch(debounceReq);
  }, []);

  const handleSearchClear = useCallback(() => {
    setSearchStr("");
    setSearchTyped("");
    //   setPage(1);
    fetchStudent(classSelected, "", rowsPerPage, page);
  }, []);

  const handleExportExcel = () => {
    // api will be call here
  };

  const emptyRows = 0;
  // page > 0
  //   ? Math.max(0, (1 + page) * rowsPerPage - finalRecords()?.length)
  //   : 0;

  console.log("table", reduxDataTable);
  return (
    <CustomBackdrop loading={loading || studentLoading}>
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
                {t("dashboard.card.title")}
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
                >
                  Excel
                </Button>
              </Stack>
            </Stack>
          </Stack>
          {/* toolbar bar start */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "start", sm: "center" }}
            justifyContent={{ xs: "flex-start", sm: "space-between" }}
          >
            <Stack
              mt={{ xs: 2, sm: 0 }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
              alignItems={{ xs: "start", sm: "center" }}
              gap={3}
            >
              <Box
                component="span"
                sx={{
                  color: "#ABAFB3",
                  fontFamily: "fontFamily2",
                  fontSize: "16px !important",
                  fontWeight: "400",
                }}
              >
                {t("Rows per page")}
              </Box>
              <Selection
                onChange={(e) => handleChangeRowsPerPage(e)}
                multiple={false}
                name="rowsPerPage"
                value={rowsPerPage || ""}
                options={rowsPerPageOptions || []}
                // disabled={pageLimit === 1}
              />
            </Stack>
            <Stack
              mt={{ xs: 2, sm: 0 }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
              alignItems={{ xs: "start", sm: "center" }}
              gap={2}
            >
              <Searchbar
                placeholder={`${t("Search")}`}
                handleSearchChange={handleSearchChange}
                handleSearchClear={handleSearchClear}
                endIcon={searchStr ? "clear" : "search"}
                sxClasses={{ minWidth: "355px" }}
                searchStr={searchStr}
              />
              <Refresh
                onClick={() => handleReloadData()}
                className="pointer"
                title="Reload"
                fontSize="large"
                htmlColor="#ABAFB3"
              />
            </Stack>
          </Stack>
          <Paper className="flex flex-col flex-auto p-0 shadow rounded-2xl overflow-hidden">
            <TblContainer name={"students" || "table"}>
              <TblHead />
              <TableBody>
                {tableData &&
                  tableData?.length > 0 &&
                  finalRecords()?.map((row, index) => {
                    return (
                      <StyledTableRow
                        hover
                        tabIndex={-1}
                        key={index + row?.id + row?.email}
                      >
                        <TableCell align="left">{row?.id}</TableCell>
                        <TableCell align="left">{row?.school}</TableCell>
                        <TableCell align="left">{row?.class}</TableCell>
                        <TableCell align="left">{row?.name}</TableCell>
                        <TableCell align="left">{row?.books_read}</TableCell>
                        <TableCell align="left">
                          {row?.reading_duraton}
                        </TableCell>
                        <TableCell align="left">
                          {row?.listening_duraton}
                        </TableCell>
                        <TableCell align="left">
                          {row?.activity_completed}
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
                {finalRecords()?.length > 0 ? (
                  <StyledTableRow
                    sx={{
                      backgroundColor: "primary.main",
                      "&:nth-of-type(odd)": {
                        backgroundColor: "primary.main",
                      },
                      "& td": { color: "#ffffff !important" },
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {t("total")}
                    </TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left">
                      {reduxData?.total_books_read}
                    </TableCell>
                    <TableCell align="left">
                      {reduxData?.total_reading_duraton}
                    </TableCell>
                    <TableCell align="left">
                      {reduxData?.total_listening_duraton}
                    </TableCell>
                    <TableCell align="left">
                      {reduxData?.total_activity_completed}
                    </TableCell>
                  </StyledTableRow>
                ) : null}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={TABLE_HEAD.length} />
                  </TableRow>
                )}
                {finalRecords()?.length === 0 && (
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
          {tableData?.length > 0 ? <TblPagination /> : null}
        </Card>
      </Container>
    </CustomBackdrop>
  );
};

export default DashboardTable;
