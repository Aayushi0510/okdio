import React from "react";
// library
import { Box } from "@mui/material";
import moment from "moment";
import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useTheme } from "@mui/styles";

const DatePickerRangeModal = (props) => {
  const theme = useTheme();

  const {
    startDate,
    endDate,
    onChange,
    dateFormat = "DD.MM.YYYY",
    // closeModal,
  } = props;

  const onSelectDateRanges = ({ selection }) => {
    let { startDate, endDate } = selection;

    startDate = moment(startDate);
    startDate = startDate.isValid() ? startDate.toDate() : undefined;

    endDate = moment(endDate);
    endDate = endDate.isValid() ? endDate.toDate() : undefined;

    let inputValue = "";
    if (startDate) inputValue += moment(startDate).format(dateFormat);
    if (endDate) inputValue += " - " + moment(endDate).format(dateFormat);

    onChange({
      fromDate: startDate,
      toDate: endDate,
      inputValue,
    });
  };
  // console.log("startDate-endDate", startDate, endDate);
  return (
    <>
      <Box>
        <DateRange
          ranges={[
            {
              startDate: startDate ? new Date(startDate) : new Date(),
              endDate: endDate ? new Date(endDate) : new Date(),
              key: "selection",
            },
          ]}
          onChange={onSelectDateRanges}
          staticRanges={undefined}
          inputRanges={undefined}
          showMonthAndYearPickers={true}
          moveRangeOnFirstSelection={false}
          // showDateDisplay={false}
          editableDateInputs={true}
          scroll={{ enabled: true }}
          locale={locales["de"]}
          rangeColors={[theme.palette.primary.main]}
          minDate={startDate ? new Date(startDate) : new Date()}
        />
      </Box>
    </>
  );
};

export default DatePickerRangeModal;
