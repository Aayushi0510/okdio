import React, { setGlobal } from "reactn";
import { Popover, Box } from "@mui/material";
import { withStyles } from "@mui/styles";
import moment from "moment";
import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { fDate2 } from "src/utils";

const styles = {
  calendarWrapper: {
    padding: "16px",
  },
};

class DateRangePicker extends React.Component {
  dateFormat = "DD.MM.YYYY";

  state = {
    displayCalendar: false,
    // inputValue: "",
    anchorEl: null,
    // fromDate: undefined,
    // toDate: undefined,
  };

  onAdornmentClick = (e) => {
    this.setState({ displayCalendar: true, anchorEl: e.currentTarget });
    setGlobal({ displayCalendar: true, dprAnchorEl: e.currentTarget });
  };

  onPopoverClose = (e, reason) => {
    // console.log("onPopoverClose", reason);
    this.setState({ displayCalendar: false, anchorEl: null });
  };

  onSelectDateRanges = ({ selection }) => {
    let { startDate, endDate } = selection;

    startDate = moment(startDate);
    startDate = startDate.isValid() ? startDate.toDate() : undefined;

    endDate = moment(endDate);
    endDate = endDate.isValid() ? endDate.toDate() : undefined;

    let inputValue = "";
    if (startDate) inputValue += moment(startDate).format(this.dateFormat);
    if (endDate) inputValue += " - " + moment(endDate).format(this.dateFormat);

    this.props.onChange({
      fromDate: startDate,
      toDate: endDate,
      inputValue,
    });
  };

  render() {
    const { classes, text, startDate, endDate } = this.props;

    return (
      <Box>
        <button
          type="button"
          className="date-btn"
          onClick={this.onAdornmentClick}
        >
          {fDate2(startDate, this.dateFormat)
            ? `${fDate2(startDate, this.dateFormat)}-${fDate2(
                endDate,
                this.dateFormat
              )}`
            : text}
        </button>

        <Popover
          open={this.state.displayCalendar || false}
          anchorEl={this.state.dprAnchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={this.onPopoverClose}
        >
          <div className={classes.calendarWrapper}>
            <DateRange
              ranges={[
                {
                  startDate: startDate ? new Date(startDate) : new Date(),
                  endDate: endDate ? new Date(endDate) : new Date(),
                  key: "selection",
                },
              ]}
              onChange={this.onSelectDateRanges}
              staticRanges={undefined}
              inputRanges={undefined}
              showMonthAndYearPickers={true}
              moveRangeOnFirstSelection={false}
              showDateDisplay={false}
              scroll={{ enabled: true }}
              locale={locales["de"]}
            />
          </div>
        </Popover>
      </Box>
    );
  }
}

export default withStyles(styles, { name: "DateRangePicker", index: 1 })(
  DateRangePicker
);
