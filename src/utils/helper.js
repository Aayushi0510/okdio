// import moment from "moment";
import moment from "moment";
// moment.locale('de')
require("moment/locale/de.js");

// Base 64 Encode
export const ENCODE = (code) =>
  Buffer.from(
    `Procuelite-Coding-$2y.S/${Buffer.from(`${code}`).toString(
      "base64"
    )}/$2y.vin-Procuelite-Coding`
  ).toString("base64");

// Base 64 Decode
export const DECODE = (code) => {
  Buffer.from(
    `${Buffer.from(`${code}`, "base64").toString("ascii")}`.split("/")[1],
    "base64"
  ).toString("ascii");
};

export const ReduceImages = (data) => {
  try {
    if (!data || data?.length === 0) return [];
    return data?.reduce((acc, curr) => {
      const { images } = curr;
      images.forEach((el) => acc.push(el));
      return acc;
    }, []);
  } catch (error) {
    console.error("ReduceImages-error", error);
  }
};

export const isEmpty = (value) => {
  try {
    switch (value) {
      case "":
      case null:
      case undefined:
      case "undefined":
      case "null":
        return true;
      default:
        return false;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @description util function to sort data.
 * @param {*} data - data in array format
 * @param {*} sortBy - string by data will be sort, default is label
 * @param {*} type - type can be string,number,date etc, default string
 * @param {*} order - order will asc or des, default asc
 * @memberof APIUtil
 */

export const sortDataFunc = (
  data,
  sortBy = "label",
  type = "",
  order = "asc"
) => {
  try {
    // console.log("sortDataFunc", data);

    data?.slice()?.sort(function (a, b) {
      var textA, textB;
      if (type === "number") {
        textA = Number(a[sortBy]);
        textB = Number(b[sortBy]);
        // console.log("type-number", textA, textB);
      } else if (type === "date") {
        textA = new Date(a[sortBy])?.getTime();
        textB = new Date(b[sortBy])?.getTime();
        // console.log("type-date", textA, textB);
      } else {
        textA = a[sortBy]?.toLowerCase();
        textB = b[sortBy]?.toLowerCase();
        // console.log("type-string", textA, textB);
      }
      if (order === "asc") {
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      }
      return textB < textA ? -1 : textB > textA ? 1 : 0;
    });
    return data;
  } catch (error) {
    console.log("sortDataFunc", error);
  }
};

export const changeCustomerObj = (
  value,
  Id = "CustomerId",
  Name = "CustomerName"
) => {
  try {
    if (value && Array.isArray(value)) {
      let newValue = value.map((v) => {
        return {
          [Id]: v.Id,
          [Name]: v.Name,
        };
      });
      return newValue;
    }
  } catch (error) {
    console.error(error);
  }
};

export const createSelectionData = (
  data,
  valueKey = "CustomerId",
  labelKey = "CustomerName",
  labelKey2 = ""
) => {
  try {
    if (Array.isArray(data)) {
      let newValue = data?.map((v) => {
        return {
          ...v,
          label: labelKey2 ? `${v[labelKey]} ${v[labelKey2]}` : v[labelKey],
          value: v[valueKey],
        };
      });
      return newValue;
    }
  } catch (error) {
    console.error(error);
  }
};

export const calculateDays = (startDate, endDate) => {
  try {
    if (!startDate) return 0;
    // To set two dates to two variables
    var date1 = new Date(startDate);
    var date2 = new Date(endDate);

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    let TotalDays = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
    return TotalDays === 0 ? TotalDays + 1 : TotalDays;
  } catch (error) {
    console.log(error);
  }
};

export const compareDates = (d1, d2) => {
  try {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    let isEqual = false;
    if (date1 > date2) {
      // console.log(`${d1} is greater than ${d2}`);
      isEqual = false;
    } else if (date1 < date2) {
      // console.log(`${d2} is greater than ${d1}`);
      isEqual = false;
    } else {
      // console.log(`Both dates are equal`);
      isEqual = true;
    }
    return isEqual;
  } catch (error) {
    console.log(error);
  }
};

export const checkEventDates = (d) => {
  try {
    const date1 = new Date(d);
    const date2 = new Date();
    let isUpcoming = true; //upcoming
    if (date1 > date2) {
      // console.log(`${d1} is greater than ${d2}`);
      isUpcoming = true;
    } else if (date1 < date2) {
      // console.log(`${d2} is greater than ${d1}`);
      isUpcoming = false;
    } else {
      // console.log(`Both dates are equal`);
      isUpcoming = true;
    }
    return isUpcoming;
  } catch (error) {
    console.log(error);
  }
};

export const uniqueArray = (arr, key) => {
  try {
    let resArr = [];

    Array.isArray(arr) &&
      arr?.filter((item) => {
        var i = resArr.findIndex((x) => x[key] === item[key]);

        if (i <= -1) {
          resArr.push(item);
        }
        return null;
      });
    return resArr;
  } catch (error) {
    console.error(error);
  }
};

export const uniqueNestedArray = (arr, key) => {
  try {
    const result = Array.isArray(arr)
      ? arr.reduce((acc, curr) => {
          const found = acc.find((a) => a[key] === curr[key]);
          if (!found) {
            acc.push({ ...curr, children: [curr] }); // not found, so need to add data property
          } else {
            found?.children?.push(curr); // if found, that means data property exists, so just push new element to found.data.
          }
          return acc;
        }, [])
      : [];
    return result;
  } catch (error) {
    console.error(error);
  }
};

export function datesGroupBy(arr, key, groupBy = "week") {
  try {
    return arr?.reduce((acc, r) => {
      // create a composed key: 'year-week'
      const yearWeek =
        groupBy === "week"
          ? `${moment(r[key]).year()}-${moment(r[key]).week()}`
          : groupBy === "month"
          ? `${moment(r[key]).year()}-${moment(r[key]).month() + 1}`
          : moment(r[key]).year();

      // add this key as a property to the result object
      if (!acc[yearWeek]) {
        acc[yearWeek] = [];
      }

      // push the current date that belongs to the year-week calculated befor
      acc[yearWeek].push(r);
      // acc?.push({ group: yearWeek, date: r[key] });

      return acc;
    }, []);
  } catch (error) {
    console.error(error);
  }
}

export const datesViewArray = (data, key = "EventDate") => {
  try {
    let newData =
      Array.isArray(data) &&
      data?.map((x) => {
        return {
          ...x,
          month: new Date(x[key])?.getMonth() + 1,
          monthName: moment(x[key]).format("MMMM"),
          monthGroup: `${moment(x[key]).year()}-${moment(x[key]).month() + 1}`,
          week: moment(x[key]).week(),
          weekGroup: `${moment(x[key]).year()}-${moment(x[key]).week()}`,
          year: moment(x[key]).format("YYYY"),
        };
      });
    return newData;
  } catch (error) {
    console.error(error);
  }
};

export const getClosestDateInArray = (array, dateToCompare, dateParam) => {
  try {
    let minDiff = null;
    let mostAccurateDate = null;
    array?.map(function (item) {
      const diff = Math.abs(
        moment(dateToCompare).diff(item[dateParam], "minutes", true)
      );

      if (!minDiff || diff < minDiff) {
        minDiff = diff;
        mostAccurateDate = item;
      }
      return null;
    });
    return mostAccurateDate;
  } catch (error) {
    console.error(error);
  }
};

export const calculateTimeDiff = (timeFrom, timeTo) => {
  try {
    const startTime = moment(timeFrom, "HH:mm:ss");
    const endTime = moment(timeTo, "HH:mm:ss");
    const duration = moment.duration(endTime.diff(startTime));
    // console.log('cal-tme-diff', timeFrom, timeTo, duration, duration.asHours())
    const hours = Math.abs(parseInt(duration.asHours()));
    const minutes = parseInt(duration.asMinutes()) % 60;
    return { hours, minutes };
  } catch (err) {
    console.log(err);
  }
};

export const dateRangeFilter = (
  arr,
  startDate,
  endDate,
  dateKey = "EventDate"
) => {
  try {
    if (!startDate && !endDate) return false;
    // To set two dates to two variables
    let date1 = new Date(startDate);
    let date2 = new Date(endDate);
    return Array.isArray(arr)
      ? arr.filter(
          (item) =>
            new Date(item[dateKey])?.getTime() >= date1?.getTime() &&
            new Date(item[dateKey])?.getTime() <= date2?.getTime()
        )
      : [];
  } catch (error) {
    console.log(error);
  }
};

export const hexToRgbA = (hex) => {
  try {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return (
        "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",1)"
      );
    }
  } catch (error) {
    console.error("hexToRgbA", error);
  }
};

/**
 *
 * @description util function to get mui avatar name letters.
 * @param {*} name - string
 */
export function stringAvatar(name) {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

// validations start

export const regexName = /^[a-zA-Zs]+$/;
export const regexNumber = /^\d+$/;
export const regexEmail =
  /^([A-Za-z0-9_\-àâèéêëîïôùûüç\.])+\@([A-Za-z0-9_\-àâèéêëîïôùûüç\.])+\.([A-Za-z]{2,20})$/;
export const regexPassword = /^.{8,}$/;

export const downloadFile = ({ data, fileName, fileType }) => {
  //   // Create a blob with the data we want to download as a file
  //   const blob = new Blob([data], { type: fileType });
  //   // Create an anchor element and dispatch a click event on it
  //   // to trigger a download
  //   const a = document.createElement("a");
  //   a.download = fileName;
  //   a.href = window.URL.createObjectURL(blob);
  //   const clickEvt = new MouseEvent("click", {
  //     view: window,
  //     bubbles: true,
  //     cancelable: true,
  //   });
  //   a.dispatchEvent(clickEvt);
  //   a.remove();
  // var element = document.createElement("a");
  // var file = new Blob([data], { type: "image/png" });
  // element.href = URL.createObjectURL(file);
  // element.download = "imageeee.png";
  // element.click();
  // fetch(data, { headers: { "Access-Control-Allow-Origin": "*" } })
  //   .then((response) => response.blob())
  //   .then((blob) => {
  //     const blobURL = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = blobURL;
  //     a.style = "display: none";
  //     if (fileName && fileName?.length) a.download = fileName;
  //     document.body.appendChild(a);
  //     a.click();
  //   });
};
