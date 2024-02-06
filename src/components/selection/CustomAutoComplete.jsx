import * as React from "react";
// library
import { Checkbox, TextField, Autocomplete, Box } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SearchStyle = styled(TextField)(({ theme }) => ({
  width: "100%",
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&::placeholder": {
    textOverflow: "ellipsis !important",
    color: "#ABAFB3",
  },
}));

const CustomAutoComplete = (props) => {
  const { t } = useTranslation();
  const {
    placeholder,
    id,
    options,
    labelField,
    multiple = false,
    startAdornment,
    endAdornment,
    onChange,
  } = props;

  return (
    <>
      <Autocomplete
        multiple={multiple}
        id={id}
        options={options || []}
        getOptionLabel={(option) => option[labelField]}
        onChange={(event, newValue) => {
          event?.preventDefault();
          onChange(newValue);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option, { selected }) => (
          <Box
            component="li"
            {...props}
            sx={{
              color: "#ABAFB3",
              fontFamily: "fontFamily2",
              fontSize: "15px",
              fontWeight: "fontWeightMedium",
            }}
          >
            {multiple && (
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
            )}
            <span>{option[labelField]}</span>
          </Box>
        )}
        sx={{ width: "100%" }}
        noOptionsText={t("message.NO_OPTIONS")}
        renderInput={(params) => (
          <SearchStyle
            {...params}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
            }}
            sx={{
              color: "primary.main",
              bgcolor: "#ffffff",
              borderRadius: "0px",
              // ">div": {
              //   paddingRight: "0px !important",
              // },
            }}
          />
        )}
      />
    </>
  );
};
export default CustomAutoComplete;
