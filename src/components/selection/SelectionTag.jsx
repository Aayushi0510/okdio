import React, { memo } from "react";
// library
import { Box, Select, MenuItem } from "@mui/material";

const SelectionTag = (props) => {
  const { value, text, handleChange, name, optionCount = 25, parentSx } = props;
  
  return (
    <>
      <Box className="employee-box" sx={{ ...parentSx }}>
        <Box component="button" className="employee-button">
          {text}
        </Box>
        <Select
          onChange={(event) => handleChange(event)}
          name={name}
          value={value || ""}
          inputProps={{ "aria-label": "NumberOfEmployee" }}
          size="small"
          className="employee-select"
          sx={{
            fieldset: { border: "none" },
            svg: {
              display: "none",
            },
            ">div": {
              padding: 0,
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                minWidth: "70px !important",
                // left: "750px !important",

                "& .MuiList-root": {
                  paddingTop: 0,
                  paddingBottom: 0,
                  "& .Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "#ffffff",
                    ":hover": {
                      backgroundColor: "primary.light",
                      // color: "#fff",
                    },
                  },
                },
                "& .MuiMenuItem-root": {
                  padding: 1,
                },
                "& .MuiButtonsBase-root": {
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "#ffffff",
                    ":hover": {
                      backgroundColor: "primary.light",
                      // color: "#fff",
                    },
                  },
                },
              },
            },
          }}
        >
          {Array.from(Array(optionCount).keys()).map((x, i) => (
            <MenuItem key={x + i} value={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </>
  );
};

export default memo(SelectionTag);
