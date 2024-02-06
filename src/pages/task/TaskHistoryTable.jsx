import React, { useState, useEffect, useCallback, useRef } from "react";
// npm
import {
  Card,
  Stack,
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
import { useSelector } from "react-redux";
// Components
import {
  CustomAutoComplete,
  CustomBackdrop,
  Searchbar,
  Selection,
} from "src/components";
import { useTable, useExport } from "src/hooks";
import { StyledTableRow } from "src/components/@material-extend";
// constants
import { API_URL } from "src/constants/url.constant";
import {
  API_STATUS_CODE,
  CLASS_BRANCHES,
} from "src/constants/content.constant";
// utils
import { fDate, getMethod, postMethod } from "src/utils";

const TABLE_HEAD = [
  {
    id: "Tür",
    name: "Tür",
    label: "Öğrenci",
    alignRight: false,
  },

  { id: "Kitap", name: "Kitap", label: "Kitap", alignRight: false },
  {
    id: "Başlangıç Zamanı",
    name: "Başlangıç Zamanı",
    label: "Başlangıç Zamanı",
    alignRight: false,
  },
  {
    id: "Bitiş Zamanı",
    name: "Bitiş Zamanı",
    label: "Bitiş Zamanı",
    alignRight: false,
  },
  {
    id: "Görev Durumu ",
    name: "Görev Durumu ",
    label: "Görev Durumu ",
    alignRight: false,
  },
];

const TaskHistoryTable = (props) => {
  const { t } = props;
  const user = useSelector(({ user }) => user);
  const userType = user?.data?.user_type;

  const reduxClasses = useSelector(({ classes }) => classes);
  const reduxSchool = useSelector(({ school }) => school);

  const [tableData, setTableData] = useState([]);
  const [allData, setAllData] = useState(null);

  const totalRows = allData ? Number(allData?.total_record) : 0;
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

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [schoolList, setSchoolList] = useState([]);
  const [schoolSelected, setSchoolSelected] = useState("");
  const [classList, setClassList] = useState([]);
  const [classBranchSelected, setClassBranchSelected] = useState("");

  const [classSelected, setClassSelected] = useState("");

  const { exportFile, exportLoading } = useExport();

  const { TblContainer, TblHead, TblPagination, finalRecords } = useTable(
    tableData || [],
    TABLE_HEAD,
    "id",
    "taskHistory",
    totalRows,
    page,
    rowsPerPage,
    setPage,
    allData
  );

  const fetchSchool = async (req) => {
    try {
      setLoading(true);

      const paylaod = {
        search: req?.search || "",
        per_page: req?.perPage || "0",
      };

      const response = await postMethod(
        API_URL.GET_SCHOOL_LIST + `?page=${req?.pageNumber || 1}`,
        paylaod,
        false,
        true
      );
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        const newData = response?.data?.data;

        setSchoolList(newData);
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

  const fetchClassList = async (req) => {
    try {
      setLoading(true);
      const response = await getMethod(
        API_URL.GET_CLASS_LIST + `/${req?.schoolId}/${req?.classBranch}`,
        false,
        true
      );
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        const newData = response?.data?.data;

        setClassList(newData);
        setLoading(false);
      } else {
        setLoading(false);
        setClassList([]);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchData = async (req) => {
    try {
      setLoading(true);
      const paylaod = {
        class_id: req?.classId || "",
        search: req?.search || "",
        per_page: req?.perPage || "10",
      };
      const response = await postMethod(
        API_URL.GET_STUDENT_LIST + `?page=${req?.pageNumber || 1}`,
        paylaod,
        false,
        true
      );
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        const newData = response?.data?.data;

        setTableData(newData);
        setAllData(response?.data);
        setRowsPerPage(newData?.per_page || "10");
        setPage(newData?.currentPage);
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

  const fetchTeacherClassList = async (req) => {
    try {
      setLoading(true);
      const payload = {
        search: req?.search || "",
        per_page: req?.perPage || "0",
      };
      const response = await postMethod(
        API_URL.GET_TEACHER_CLASS_LIST + `?page=${req?.pageNumber || 1}`,
        payload,
        false,
        true
      );
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        const newData = response?.data?.data;

        setClassList(newData);
        setLoading(false);
      } else {
        setLoading(false);
        setClassList([]);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userType === "3") {
      setSchoolSelected(user?.data);
      if (reduxClasses?.teacherClasses) {
        setClassList(reduxClasses?.teacherClasses);
      } else {
        fetchTeacherClassList();
      }
    } else {
      if (reduxSchool?.data) {
        setSchoolList(reduxSchool?.data);
      } else {
        const req = {
          search: searchStr,
          perPage: rowsPerPage,
          pageNumber: page,
        };
        fetchSchool(req);
      }
    }
  }, [userType]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    let debounceReq = {
      schoolId: schoolSelected?.id,
      classId: classSelected,
      search: searchStr,
      perPage: event.target.value,
      pageNumber: page,
    };
    fetchData(debounceReq);
  };
  const handleReloadData = () => {
    const req = {
      schoolId: schoolSelected?.id,
      classId: classSelected,
      search: searchStr,
      perPage: rowsPerPage,
      pageNumber: page,
    };
    fetchData(req);
  };

  // Delay search by 600ms
  const delayedSearch = useRef(
    debounce((q) => fetchData(q), 600),
    []
  );

  const handleSearchChange = useCallback((event) => {
    event.preventDefault();
    setSearchStr(event.target.value);
    let debounceReq = {
      schoolId: schoolSelected?.id,
      classId: classSelected,
      search: event.target.value,
      perPage: rowsPerPage,
      pageNumber: page,
    };
    delayedSearch?.current(debounceReq);
  }, []);

  const handleSearchClear = useCallback(() => {
    setSearchStr("");
    const debounceReq = {
      classId: classSelected,
      search: "",
      perPage: rowsPerPage,
      pageNumber: page,
    };
    fetchData(debounceReq);
  }, []);

  const handleExportExcel = () => {
    exportFile(API_URL.GET_TASK_HISTORY_CSV, "task-history");
  };

  const handleSchoolSelect = (val) => {
    setSchoolSelected(val);
    setClassBranchSelected("");
    setClassSelected("");
  };

  const handleClassBranchSelect = (val) => {
    setClassBranchSelected(val);
    fetchClassList({
      schoolId: schoolSelected?.id,
      classBranch: val?.id,
    });
  };

  const handleClassSelect = (val) => {
    setClassSelected(val);
    const debounceReq = {
      search: searchStr,
      perPage: rowsPerPage,
      pageNumber: page,
      classId: val?.id,
      schoolId: schoolSelected?.id,
    };
    fetchData(debounceReq);
  };

  const emptyRows = 0;

  // console.log("task-history-table", tableData);

  const classListOption =
    userType === "3"
      ? classList
      : schoolSelected && classBranchSelected
      ? classList
      : [];
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
                {t("task.table.title2")}
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
                {/* <Button
                  variant="contained"
                  onClick={() => handleExportExcel()}
                  sx={{ backgroundColor: "success.main" }}
                  className="okudio-btn"
                  disabled={!isDisabled}
                >
                  {t("Excel")}
                </Button> */}
              </Stack>
            </Stack>
          </Stack>
          {/* search bar start */}
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
          {/* selection bar start */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "start", sm: "center" }}
            justifyContent={{ xs: "flex-start", sm: "space-between" }}
          >
            {userType === "3" ? null : (
              <Box
                sx={{
                  width: "300px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  component="label"
                  sx={{
                    color: "#ABAFB3",
                    fontFamily: "fontFamily2",
                    fontSize: "18px",
                    fontWeight: "fontWeightMedium",
                  }}
                >
                  {t("Okul")}
                </Box>
                <CustomAutoComplete
                  options={schoolList || []}
                  id="schoolList"
                  labelField="school_name"
                  onChange={(val) => handleSchoolSelect(val)}
                />
              </Box>
            )}
            {userType === "3" ? null : (
              <Box
                sx={{
                  width: "300px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  component="label"
                  sx={{
                    color: "#ABAFB3",
                    fontFamily: "fontFamily2",
                    fontSize: "18px",
                    fontWeight: "fontWeightMedium",
                  }}
                >
                  {t("Seviye")}
                </Box>
                <CustomAutoComplete
                  options={CLASS_BRANCHES || []}
                  id="classSelect"
                  labelField="label"
                  onChange={(val) => handleClassBranchSelect(val)}
                />
              </Box>
            )}
            <Box
              sx={{ width: "300px", display: "flex", flexDirection: "column" }}
            >
              <Box
                component="label"
                sx={{
                  color: "#ABAFB3",
                  fontFamily: "fontFamily2",
                  fontSize: "18px",
                  fontWeight: "fontWeightMedium",
                }}
              >
                {t("Sınıf")}
              </Box>
              <CustomAutoComplete
                options={classListOption || []}
                id="classBranch"
                labelField="class_name"
                onChange={(val) => handleClassSelect(val)}
              />
            </Box>
          </Stack>
          <Paper
            sx={{
              marginTop: "15px",
            }}
            className="overflow-hidden"
          >
            <TblContainer name={"classes" || "table"}>
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
                        <TableCell align="left">{row?.name}</TableCell>
                        <TableCell align="left">{row?.book_name}</TableCell>
                        <TableCell align="left">
                          {fDate(row?.start_date, "DD.MM.yyyy")}
                        </TableCell>
                        <TableCell align="left">
                          {fDate(row?.end_date, "DD.MM.yyyy")}
                        </TableCell>
                        <TableCell align="left">{row?.status}</TableCell>
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

export default TaskHistoryTable;
