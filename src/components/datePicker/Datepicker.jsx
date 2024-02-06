import React from "react";
//library
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { Box } from "@mui/material";
import deLocale from "date-fns/locale/de";

const Datepicker = ({
  value,
  onChange,
  label,
  id,
  minDate,
  placeholder,
  dateFormat,
  mask = "__.__.____",
  disabled,
  className = "gr-datepicker",
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={deLocale}
      >
        <MobileDatePicker
          label={label}
          value={value}
          onChange={onChange}
          id={id}
          data-testid={id}
          // maxDate={new Date()}
          minDate={minDate}
          inputProps={{ "aria-label": label }}
          PopperProps={{
            role: "status",
          }}
          className={className}
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <>
              <Box className="datepicker-input">
                <input
                  ref={inputRef}
                  {...inputProps}
                  placeholder={placeholder}
                />
                {InputProps?.endAdornment}
              </Box>
            </>
          )}
          clearable
          // inputFormat={dateFormat}
          mask={mask}
          disabled={disabled}
          showToolbar={false}
          closeOnSelect={true}
          DialogProps={{ PaperProps: { id: "gr-datepicker" } }}
        />
      </LocalizationProvider>
    </>
  );
};

export default Datepicker;
