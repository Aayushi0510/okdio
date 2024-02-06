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
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Refresh, Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import debounce from "lodash/debounce";
import { useSelector } from "react-redux";
import toastr from "toastr";
// Components
import {
  CustomAutoComplete,
  CustomBackdrop,
  Searchbar,
  Selection,
} from "src/components";
import { useTable, useExport } from "src/hooks";
import { StyledTableRow } from "src/components/@material-extend";
import { Modal } from "src/components/Modal";
// constants
import { API_URL } from "src/constants/url.constant";
import {
  API_STATUS_CODE,
  CLASS_BRANCHES,
} from "src/constants/content.constant";
// utils
import { getMethod, postMethod, regexPassword } from "src/utils";

const TABLE_HEAD = [
  {
    id: "Sıra",
    name: "id",
    label: "Sıra",
    alignRight: false,
  },

  {
    id: "Öğretmen",
    name: "teachers",
    label: "Öğretmen",
    alignRight: false,
  },

  {
    id: "Öğrenci",
    name: "name",
    label: "Öğrenci",
    alignRight: false,
  },
  {
    id: "Kullanıcı Adı",
    name: "email",
    label: "Kullanıcı Adı",
    alignRight: false,
  },
  {
    id: "Şifre",
    name: "original_password",
    label: "Şifre",
    alignRight: false,
  },
  {
    id: "Kaydet",
    name: "Kaydet",
    label: "Kaydet",
    alignRight: false,
    sort: false,
  },
];

const ClassesTable = (props) => {
  const { t } = props;
  const user = useSelector(({ user }) => user);
  const userType = user?.data?.user_type;
  // console.log("user", user);

  // console.log("TABLE_HEAD", userType, TABLE_HEAD);
  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState([]);
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
  const [editModal, setEditModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { exportFile, exportLoading } = useExport();

  const handleCloseModal = () => {
    setEditModal(false);
    setSelectedRow(null);
    setNewPassword("");
    setFormErrors({});
  };
  const { TblContainer, TblHead, TblPagination, finalRecords } = useTable(
    tableData || [],
    TABLE_HEAD,
    "id",
    "classes",
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
  /**
   *
   * @description fetch post api to fetch student list
   * @param {*} classId - class Id in body
   * @param {*} search - search String in body
   * @param {*} perPage - rows per page || '10' in body
   * @param {*} pageNumber - pageNumber || '1' in param
   * @memberof FetchStudentList
   */
  const fetchData = async (req) => {
    // console.log("fetch-student", req);
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

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (userType === "3") {
      const updateTableHead = delete TABLE_HEAD[1];
      // delete TABLE_HEAD[5];
      setTableHead(updateTableHead);
      setSchoolSelected(user?.data);
      fetchTeacherClassList();
    } else {
      setTableHead(TABLE_HEAD);
      fetchSchool();
    }
  }, [userType]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(1);
    let debounceReq = {
      classId: classSelected,
      search: searchStr,
      perPage: event.target.value,
      pageNumber: page,
    };
    fetchData(debounceReq);
  };

  const handleReloadData = () => {
    let req = {
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
    exportFile(API_URL.GET_CLASSES_CSV, "classes");
  };

  const handleSchoolSelect = (val) => {
    // console.log("handleSchoolSelect", val);
    setSchoolSelected(val);
    setClassBranchSelected("");
    setClassSelected("");
  };

  const handleClassBranchSelect = (val) => {
    // console.log("handleClassBranchSelect", val);
    setClassBranchSelected(val);
    fetchClassList({
      schoolId: schoolSelected?.id,
      classBranch: val?.id,
    });
  };

  const handleClassSelect = (val) => {
    // console.log("handleClasselect", val);
    setClassSelected(val);
    const debounceReq = {
      classId: val?.id,
      search: searchStr,
      perPage: rowsPerPage,
      pageNumber: page,
    };
    fetchData(debounceReq);
  };

  const handleEdit = (row) => {
    setEditModal(true);
    setSelectedRow(row);
    setNewPassword("");
  };
  const handleChange = (e) => {
    e.preventDefault();

    setNewPassword(e.target.value);

    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };
  const handleValidate = () => {
    const newErrors = {};

    if (!newPassword) {
      newErrors.newPassword = t("message.FIELDS_REQUIRED");
    } else {
      if (!regexPassword.test(newPassword)) {
        newErrors.newPassword = t("message.PASSWORD_SHOULD_8_CHAR");
      }
    }

    setFormErrors(newErrors);
    // Return true if the form is valid (no errors)
    return Object.keys(newErrors).length === 0;
  };

  const submitEdit = async () => {
    try {
      if (!handleValidate()) return false;
      setLoading(true);
      const paylaod = {
        id: selectedRow?.id,
        password: newPassword,
      };
      const response = await postMethod(
        API_URL.UPDATE_USER_PASSWORD,
        paylaod,
        false,
        true
      );
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        setLoading(false);
        handleCloseModal();
        handleReloadData();
        toastr.success(t("message.UPDATE_SUCCESS"));
      } else {
        setLoading(false);
        toastr.error(response?.data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const emptyRows = 0;

  // console.log("classes-table", tableData);

  const classListOption =
    userType === "3"
      ? classList
      : schoolSelected && classBranchSelected
      ? classList
      : [];
  // const isDisabled = tableData && tableData?.length > 0;

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
                {t("classes.card.title")}
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
            <TblContainer name={"classestable"}>
              <TblHead />
              <TableBody>
                {tableData &&
                  tableData?.length > 0 &&
                  finalRecords()?.map((row) => {
                    return (
                      <StyledTableRow
                        hover
                        tabIndex={-1}
                        key={row?.id + row?.email}
                      >
                        <TableCell align="left">{row?.id}</TableCell>
                        {userType === "5" && (
                          <TableCell align="left">{row?.teachers}</TableCell>
                        )}
                        <TableCell align="left">{row?.name}</TableCell>
                        <TableCell align="left">{row?.email}</TableCell>
                        <TableCell align="left">
                          {row?.original_password}
                        </TableCell>
                        <TableCell align="left">
                          <IconButton onClick={() => handleEdit(row)}>
                            <Edit color="primary" />
                          </IconButton>
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
          {tableData?.length > 0 ? <TblPagination /> : null}
        </Card>
      </Container>

      {/* modal starts */}
      <Modal
        isOpen={editModal}
        closeModalClick={() => handleCloseModal()}
        title={t("Change Password")}
        closeIcon
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
                type="email"
                label={t("Kullanıcı adı")}
                defaultValue={selectedRow?.email}
                disabled
                fullWidth
              />
              <TextField
                name="newPassword"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => handleChange(e)}
                error={Boolean(formErrors?.newPassword)}
                helperText={formErrors?.newPassword}
                label={t("New Password")}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {!showPassword ? (
                          <VisibilityOff color="primary" />
                        ) : (
                          <Visibility color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="outlined"
                disabled={loading}
                onClick={() => handleCloseModal()}
              >
                {t("Cancel")}
              </Button>
              <Button
                variant="contained"
                disabled={loading}
                onClick={() => submitEdit()}
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

export default ClassesTable;
