export const MESSAGE = {
  LOGIN_SUCCESS: "Anmeldung erfolgreich", // "Login Successfully",
  LOGIN_FAILED: "Ungültige E-Mail oder Passwort", //"Invalid Email or Password",
  REGISTER_SUCCESS: "Register Successfull. Please login here",
  REGISTER_FAILED: "Register Failed",
  LOGOUT_SUCCESS: "Abmeldung erfolgreich", // "Logout successfully",
  LOOGUT_FAILED: "Try again later !!",
  SESSION_EXPIRED: "Ihre Sitzung ist abgelaufen, melden Sie sich erneut an", //"Your session expired, login again"

  FIELDS_REQUIRED: "Gerekli alanlar!", // Fields required !
  DATE_REQUIRED: "Datum ist erforderlich !", // Date is required !

  CREATE_SUCCESS: "Erfolgreich erstellt", // "Created successfully",
  UPDATE_SUCCESS: "Erfolgreich geupdated", //"Updated successfully",
  DELETE_SUCCESS: "Erfolgreich gelöscht", //"Deleted successfully",
  DUPLICATE_SUCCESS: "Erfolgreich dupliziert", // "Duplicate successfully",
  EXPORT_SUCCESS: "Export erfolgreich gestarted", // "Export started successfully",
  ARE_YOU_SURE_TO_PROCEED: "Möchten Sie wirklich fortfahren?", //Are you sure to proceed?

  SOMETHING_WENT_WRONG: "SOMETHING_WENT_WRONG", // "Something went wrong, try again later !!",
};

export const API_STATUS_CODE = {
  NOT_FOUND: 404,
  SUCCESS: 200,
  INTERNAL_SERVER: 500,
  UPDATE: 204,
  EXIST: 406,
  CREATED: 201,
  UNAUTHORIZED: 401,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
};

export const QUALIFICATION_OPTIONS = [
  {
    id: "q1",
    label: "Qualifikation 1",
    img: <img src="/svg/guard-icon.svg" alt="" key="q1" />,
  },
  {
    id: "q2",
    label: "Qualifikation 2",
    img: <img src="/svg/car-icon.svg" alt="" key="q2" />,
  },
  {
    id: "q3",
    label: "Qualifikation 3",
    img: <img src="/svg/badge-icon.svg" alt="" key="q3" />,
  },
];

// react-dropdown-select library default props
export const RDSelectProps = {
  loading: false,
  searchBy: "CustomerName",
  labelField: "CustomerName",
  valueField: "CustomerId",
  separator: false,
  clearable: true,
  searchable: true,
  create: false,
  multi: true,
  dropdownGap: 0,
  keepSelectedInList: true,
  closeOnSelect: false,
  dropdownPosition: "bottom",
  direction: "ltr",
  dropdownHeight: "300px",
  placeholder: "",
  noDataLabel: "Keine Daten",
  color: "#CFA144",
};

export const CLASS_BRANCHES = [
  {
    label: "001",
    id: "001",
  },
  {
    label: "002",
    id: "002",
  },
  {
    label: "YIL1",
    id: "YIL1",
  },
  {
    label: "YIL2",
    id: "YIL2",
  },
  {
    label: "YIL3",
    id: "YIL3",
  },
  {
    label: "YIL4",
    id: "YIL4",
  },
];

export const FILE_TYPE_BY_VALUE = {
  1: "text",
  2: "image",
  3: "audio",
  4: "video",
};
