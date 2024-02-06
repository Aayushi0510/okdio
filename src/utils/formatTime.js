import moment from "moment";

// ----------------------------------------------------------------------
export function fDate2(date, dFormat = "dd MMMM yyyy") {
  if (!date || new Date(date) === "Invalid Date") return false;
  let newDate =
    moment(date).format(dFormat) !== "01.01.0001"
      ? moment(date).format(dFormat)
      : "";
  return newDate;
}

export function fDate(date, dFormat = "DD MMMM yyyy") {
  if (!date || new Date(date) === "Invalid Date") return false;
  let newDate =
    moment(date).format(dFormat) !== "01.01.0001"
      ? moment(date).format(dFormat)
      : "";
  return newDate;
}

// export function fDate(date, dFormat = "dd MMMM yyyy") {
//   if (!date || new Date(date) === "Invalid Date") return false;
//   let newDate =
//     format(new Date(date), dFormat) !== "01.01.0001"
//       ? format(new Date(date), dFormat)
//       : "";
//   return newDate;
// }

export const toValidDate = (dateStr, sign = ".") => {
  if (!dateStr) return false;

  const [day, month, year] = dateStr.split(sign);
  // return new Date(dateStr?.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

  return new Date(year, month - 1, day);
};

export function fDateTime(date) {
  if (!date || new Date(date) === "Invalid Date") return false;
  return moment(date).format("dd MMM yyyy HH:mm");
}

export function fDateTimeSuffix(date) {
  if (!date || new Date(date) === "Invalid Date") return false;
  return moment(date).format("dd/MM/yyyy hh:mm p");
}

// Function to validate the
// time in
// 24-hour format
export const isValidTime = (str) => {
  // Regex to check valid
  // time in 24-hour format
  let regex = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);

  //  if str
  // is empty return false
  if (str == null) {
    return false;
  }

  // Return true if the str
  // matched the ReGex
  if (regex.test(str) === true) {
    return true;
  } else {
    return false;
  }
};
