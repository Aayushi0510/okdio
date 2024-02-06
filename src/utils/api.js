/**
 * @description Class with functions with post, put, get, delete method api call
 */

// core module
import axios from "axios";
import { getSessionState, StoredVariables } from "./session";
import toastr from "toastr";
import { API_STATUS_CODE, MESSAGE } from "src/constants/content.constant";
import { ROUTES_URL } from "src/constants/url.constant";

const tokenGet = getSessionState(StoredVariables.authToken)
  ? getSessionState(StoredVariables.authToken).replace(/"/g, "")
  : "";

const accessToken = tokenGet || "";

// Set headers for All APIs
const headers2 = {
  "Content-Type": "application/x-www-form-urlencoded", // "application/json",
};

const headers = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
};

// var headers3 = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
// };

/**
 *
 * @description function to call external api with url
 * @param {*} url - API URL
 * @returns error.response.
 * @memberof api
 */

/**
 *
 * @description action to call post api with/without auth token and post data
 * @param {*} url - API URL
 * @param {*} data - Post data object
 * @param {*} contenType - true for form-data and false for json
 * @param {*} auth - true/false for auth token pass or not
 * @memberof APIUtil
 */

export const postMethod = (url, data, contenType = true, auth = true) => {
  if (url !== false) {
    let headersSet = {};
    if (contenType === "file") {
      headersSet = headers2;
    }
    if (auth === true) {
      headersSet["Authorization"] = `Bearer ${accessToken}`;
    }
    try {
      return axios
        .post(url, data, { headers: headersSet })
        .then((response) => response)
        .catch((error) => {
          // console.log("error", error?.response);
          if (error?.response) {
            if (error.response?.status) {
              // if error status is 401 then logout
              if (error.response?.status === API_STATUS_CODE.UNAUTHORIZED) {
                toastr.error(MESSAGE.SESSION_EXPIRED);
                window.location.href = ROUTES_URL.LOGOUT;
              } else {
                // else show error
                if (error.response?.data) {
                  if (error.response.data?.error) {
                    toastr.error(error.response.data?.error);
                  }
                  if (error.response.data?.message) {
                    toastr.error(
                      error.response.data?.message ||
                        error.response.data?.Message
                    );
                  }
                }
              }
            }
          }
        });
    } catch (error) {
      return { success: false, message: "500 (Internal Server Error)!" };
    }
  } else {
    return {
      success: false,
      message: "Url is not defined!",
    };
  }
};

/**
 *
 * @description action to call get api with/without auth token
 * @param {*} url - API URL
 * @param {*} contenType - true for form-data and false for json
 * @param {*} auth - true/false for auth token pass or not
 * @memberof APIUtil
 */

export const getMethod = (url, contenType = true, auth = true) => {
  if (url !== false) {
    let headersSet = "";
    if (contenType === true) {
      headersSet = headers2;
    } else {
      headersSet = headers;
    }

    if (auth === true) {
      headersSet["Authorization"] = `Bearer ${accessToken}`;
    }

    try {
      return axios
        .get(url, { headers: headersSet })
        .then((response) => response)
        .catch((error) => {
          if (error?.response) {
            if (error.response?.status) {
              // if error status is 401 then logout
              if (error.response?.status === API_STATUS_CODE.UNAUTHORIZED) {
                toastr.error(MESSAGE.SESSION_EXPIRED);
                window.location.href = ROUTES_URL.LOGOUT;
              } else {
                // else show error
                if (error.response?.data) {
                  if (error.response.data?.error) {
                    toastr.error(error.response.data?.error);
                  }
                  if (error.response.data?.message) {
                    toastr.error(
                      error.response.data?.message ||
                        error.response.data?.Message
                    );
                  }
                }
              }
            }
          }
        });
    } catch (error) {
      return { success: false, message: "500 (Internal Server Error)!" };
    }
  } else {
    return {
      success: false,
      message: "Url is not defined!",
    };
  }
};

/**
 *
 * @description action to call put api with/without auth token
 * @param {*} url - API URL
 * @param {*} data - Put data object
 * @param {*} contenType - true for form-data and false for json
 * @param {*} auth - true/false for auth token pass or not
 * @memberof APIUtil
 */

export const putMethod = (url, data, contenType = true, auth = true) => {
  if (url !== false) {
    let headersSet = "";
    if (contenType === true) {
      headersSet = headers2;
    } else {
      headersSet = headers;
    }

    if (auth === true) {
      headersSet["Authorization"] = `Bearer ${accessToken}`;
    }

    try {
      return axios
        .put(url, data, { headers: headersSet })
        .then((response) => response)
        .catch((error) => {
          if (error?.response) {
            if (error.response?.status) {
              // if error status is 401 then logout
              if (error.response?.status === API_STATUS_CODE.UNAUTHORIZED) {
                toastr.error(MESSAGE.SESSION_EXPIRED);
                window.location.href = ROUTES_URL.LOGOUT;
              } else {
                // else show error
                if (error.response?.data) {
                  if (error.response.data?.error) {
                    toastr.error(error.response.data?.error);
                  }
                  if (error.response.data?.message) {
                    toastr.error(
                      error.response.data?.message ||
                        error.response.data?.Message
                    );
                  }
                }
              }
            }
          }
        });
    } catch (error) {
      return { success: false, message: "500 (Internal Server Error)!" };
    }
  } else {
    return {
      success: false,
      message: "Url is not defined!",
    };
  }
};

/**
 *
 * @description action to call delete api with/without auth token
 * @param {*} url - API URL
 * @param {*} data - Delete data object
 * @param {*} auth - true/false for auth token pass or not,default true
 * @memberof APIUtil
 */

export const deleteMethod = (url, data, auth = true) => {
  if (url !== false) {
    let headersSet = {};
    // if (contenType === true) {
    //   headersSet = headers2;
    // } else {
    //   headersSet = headers;
    // }

    if (auth === true) {
      headersSet["Authorization"] = `Bearer ${accessToken}`;
    }
    try {
      return axios
        .delete(url, { headers: headersSet, data })
        .then((response) => response)
        .catch((error) => {
          if (error?.response) {
            if (error.response?.status) {
              // if error status is 401 then logout
              if (error.response?.status === API_STATUS_CODE.UNAUTHORIZED) {
                toastr.error(MESSAGE.SESSION_EXPIRED);
                window.location.href = ROUTES_URL.LOGOUT;
              } else {
                // else show error
                if (error.response?.data) {
                  if (error.response.data?.error) {
                    toastr.error(error.response.data?.error);
                  }
                  if (error.response.data?.message) {
                    toastr.error(
                      error.response.data?.message ||
                        error.response.data?.Message
                    );
                  }
                }
              }
            }
          }
        });
    } catch (error) {
      return { success: false, message: "500 (Internal Server Error)!" };
    }
  } else {
    return {
      success: false,
      message: "Url is not defined!",
    };
  }
};
