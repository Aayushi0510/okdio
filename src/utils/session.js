import { DECODE, ENCODE } from "./helper";

// StoredVariables
export const StoredVariables = {
  authToken:
    "$2y$12$NtOL9A.vXLbLRpXds8BYEuS6fyu4UiloyR563WoPkqhBoiewzXCSy/$2y$12$NtOL9A.vXLbLRpXds8BYEuS6fyu4UiloyR563WoPkqhBoiew",
  userName: "783d934kk5q5q5",
  expiresIn: "Z22bt5eegWF1INbx",
  gClientId:
    "842248715576-juoa8re6ij3raikia8bsia7to8dlnddh.apps.googleusercontent.com",
  fAppId: "1459906007513429",
  isProviser:
    "$2y$12$IQd.vnwjNS0LF4.NVQZhL.d/8rcoz0rryIvhrQDkYqOdH2UXb7P1q/$2y$12$IQd.vnwjNS0LF4.NVQZhL",
  email:
    "$2y$12$fK3/auDVdR9rh2s.W8XOGe53SjHVZALYXBwYNGVcVDJQp4k.i49/m$2y$12$fK3/auDVdR9rh2s.W8XOGe53SjHVZALYXBwYNG",
  forgotemail:
    "$2y$12$fK3/auDVdR9rh2s.W8XOGe53SjHVZALYXBwYNGVcVDJQp4k.i49/m$2y$12$fK3/auDVdR9rh2s.W8XOGe53SjHVZALYXBwYNGVDJQp4k.i49/",
  lat: "$2y$12$NtOL9A.vXLbLRpXds8BYEuS6fyu4UiloyR563WoPkqhBoiewzXCSy/$2y$12$NtOL9A.vXLbLRpXds8BYEuS6fyu4UiloyR5",
  lot: "$2y$12$NtOL9A.vXLbLRpXds8BYEuS6fyu4Uilo.vXLbLRpXds8BYEuS6fyu4UiloyR5HVZALYXBwYNGVDJQp4k.i49/HVZALYXBwY",
  confimmodal:
    "2$IQd.vnwjNS0LF4.NVQZhL.d/8rcoz0rryIvhrQDkYqOdH2UXb/2$IQd.vnwjNS0LF4.NVQZhL.d/8rcoz0rryIvhrQDkYqOdH2UXb",
  contrycode:
    "$2y$12$2$IQd.vnwjNS0LF4.NVQZhL.d/8rcoz0rryIvhrQDkYqOdH2UXb/2$IQd.C",
  mobile:
    "$2y$12$2$IQd.vnwjNS0LF4.NVQZhL.d/8rcoz0rryIvhrQDkYqOdH2UXb/2$IQd.pXds8BYEuS6fyu4Uiloy",
  location:
    "$2y$12$eMjjEIcRORDWnnbgRMWmm.oADfIXygQnTwKp1p4A.UNhTbM0kXZOi/$2y$12$eMjjEIcRORDWnnbgRMWmm.oADfIXygQnTwKp1p4A.U",
  logindate:
    "$2y$13$ELXq7eX9rphEPXYl.fRExuh.kd3it7vHsfhhUMApGh1DhXvuuTuIS/$2y$13$ELXq7eX9rphEPXYl.fRExuh.kd3it7vHsfhhUMApGh1",
  provider_category:
    "$2y$12$8ZjxMZD8bVYiD2O4jdocQ.FPu6IjSaBPzSS.vHiP2MTi40jP3De4S/.jdf$2y$12$8ZjxMZD8bVYiD2O4jdocQ",
};

/**
 *
 * @description util function to store data in sessionStorage
 * @param {*} key - session key
 * @param {*} value - session value
 * @param {*} encrypt - true for encode value , default false
 * @memberof APIUtil
 */

export const setSessionState = (key, value, encrypt = false) => {
  try {
    const serializedState = JSON.stringify(value);
    if (encrypt === true) {
      sessionStorage.setItem(key, ENCODE(serializedState));
    } else {
      sessionStorage.setItem(key, serializedState);
    }
  } catch (err) {
    console.log("setLocalState", err);
  }
};

/**
 *
 * @description util function to get data from sessionStorage
 * @param {*} key - session key
 * @param {*} json - true for convert value in json, default false
 * @param {*} decrypt - true for encode value , default false
 * @memberof APIUtil
 */
export const getSessionState = (key, json = false, decrypt = false) => {
  try {
    let serializedState;
    if (decrypt === true) {
      serializedState = DECODE(sessionStorage.getItem(key))?.replace(/"/g, "");
    } else {
      serializedState = sessionStorage.getItem(key);
    }

    if (serializedState === null) {
      return undefined;
    }

    if (!json) {
      return serializedState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const RemoveSession = (key) => sessionStorage.removeItem(key);

// localStorage
export const getLocalState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const setLocalState = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.log("setLocalState", err);
    // ignore write errors
  }
};

// export default StoredVariables;
