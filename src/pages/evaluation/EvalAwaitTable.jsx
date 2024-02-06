import React, { useState, useEffect, useCallback, useRef } from "react";
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
  TextField,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import debounce from "lodash/debounce";
import { useSelector, useDispatch } from "react-redux";
import toastr from "toastr";
// Components
import { CustomAutoComplete, CustomBackdrop, Searchbar } from "src/components";
import { useTable } from "src/hooks";
import { StyledTableRow } from "src/components/@material-extend";
import { Modal } from "src/components/Modal";
// constants
import { API_URL } from "src/constants/url.constant";
import {
  API_STATUS_CODE,
  CLASS_BRANCHES,
} from "src/constants/content.constant";
// utils
import { getMethod, postMethod } from "src/utils";
// redux
import { actionTeacherClasses } from "src/store/slices/classes.slice";

const TABLE_HEAD = [
  // {
  //   id: "Sıra",
  //   name: "Sıra",
  //   label: "Sıra",
  //   alignRight: false,
  // },

  // { id: "Sınıf", name: "Sınıf", label: "Sınıf", alignRight: false },
  {
    id: "Öğrenci",
    name: "Öğrenci",
    label: "Öğrenci",
    alignRight: false,
  },
  {
    id: "Ses Kaydı Yapılan Kitap",
    name: "Ses Kaydı Yapılan Kitap",
    label: "Ses Kaydı Yapılan Kitap",
    alignRight: false,
  },
  {
    id: "Dinle",
    name: "Dinle",
    label: "Dinle",
    alignRight: false,
  },
  {
    id: "Geri Bildirim",
    name: "Geri Bildirim",
    label: "Geri Bildirim",
    alignRight: false,
  },
  {
    id: "Kaydet",
    name: "Kaydet",
    label: "Kaydet",
    alignRight: false,
  },
];

const EvalAwaitTable = (props) => {
  const { t } = props;

  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const userType = user?.data?.user_type;

  const [tableData, setTableData] = useState([]);
  const [allData, setAllData] = useState(null);

  const totalRows = tableData ? Number(tableData?.total_record) : 0;
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
  const [studentSelected, setStudentSelected] = useState("");

  const [rowSelected, setRowSelected] = useState({});
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  const { TblContainer, TblHead, TblPagination, finalRecords } = useTable(
    tableData || [],
    TABLE_HEAD,
    "id",
    "evalAawit",
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
    // console.log("fetch-student", req);
    try {
      if (!req?.classId) return false;

      setLoading(true);

      // const payload = {
      //   // class_id: req?.classId || "",
      //   search: req?.search || "",
      //   per_page: req?.perPage || "10",
      // };
      const response = await getMethod(
        API_URL.GET_EVALUATION_LIST + `/${req?.classId || ""}/1`,
        // +
        // `?page=${req?.pageNumber || 1}`,
        // payload,
        false,
        true
      );
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        // console.log("response?.data?.data", response?.data);

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
        dispatch(actionTeacherClasses(newData));
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
      fetchTeacherClassList();
    } else {
      fetchSchool();
    }
  }, [userType]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    let debounceReq = {
      classId: classSelected,
      search: searchStr,
      perPage: event.target.value,
      pageNumber: page,
    };
    fetchData(debounceReq);
  };

  const handleReloadData = () => {
    const req = {
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
    const debounceReq = {
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
      classId: val?.id,
      search: searchStr,
      perPage: rowsPerPage,
      pageNumber: page,
    };
    fetchData(debounceReq);
  };

  const onChangeFeedback = (e) => {
    e.preventDefault();
    setFeedback(e.target.value);
  };

  const handleFeedback = (row) => {
    setFeedbackModal(true);
    setRowSelected(row);
    setFeedback(row?.feedback);
  };

  const handleCloseModal = () => {
    setFeedbackModal(false);
    setFeedback("");
  };

  const submitFeedback = async () => {
    try {
      setLoading(true);
      const paylaod = {
        feedback: feedback,
        id: rowSelected?.id,
      };
      const response = await postMethod(
        API_URL.POST_BOOK_FEEDBACK,
        paylaod,
        false,
        true
      );
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        setLoading(false);

        if (response?.data?.status === API_STATUS_CODE.SUCCESS) {
          toastr.success(t("message.UPDATE_SUCCESS"));
          handleReloadData();
        } else {
          toastr.error(response?.data?.message);
        }
      } else {
        toastr.error(response?.data?.message);
        setLoading(false);
      }
      setLoading(false);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const emptyRows = 0;

  console.log("eval-await-table", tableData);

  const classListOption =
    userType === "3"
      ? classList
      : schoolSelected && classBranchSelected
      ? classList
      : [];
  const isDisabled = tableData && tableData?.length > 0;

  return (
    <CustomBackdrop loading={loading}>
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
                {t("evaluation.table.title")}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={3}
              sx={{ width: "100%" }}
            >
              {/* nothing */}
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
            ></Stack>
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
            <TblContainer name={"evaluationAwait" || "table"}>
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
                          {row?.file ? (
                            <audio controls>
                              <source src={row?.file}></source>
                            </audio>
                          ) : null}
                        </TableCell>
                        <TableCell align="left">{row?.feedback}</TableCell>
                        <TableCell align="left">
                          <Button
                            variant="contained"
                            color="secondary"
                            className="tbl-action-btn okudio-btn"
                            id="save_feedback"
                            onClick={() => handleFeedback(row)}
                          >
                            {t("Kaydet")}
                          </Button>
                        </TableCell>
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
          {/* {tableData?.length > 0 ? <TblPagination /> : null} */}
        </Card>
      </Container>

      {/* modal starts */}
      <Modal
        isOpen={feedbackModal}
        closeModal={() => handleCloseModal()}
        closeModalClick={() => handleCloseModal()}
        content={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                name="email"
                type="textarea"
                label={t("Geri Bildirim")}
                value={feedback || ""}
                fullWidth
                onChange={(e) => onChangeFeedback(e)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button variant="outlined" onClick={() => handleCloseModal()}>
                {t("Cancel")}
              </Button>
              <Button
                disabled={loading || !feedback}
                variant="contained"
                onClick={() => submitFeedback()}
              >
                {t("Giriş")}
              </Button>
            </Box>
          </Box>
        }
      />
    </CustomBackdrop>
  );
};

export default EvalAwaitTable;
