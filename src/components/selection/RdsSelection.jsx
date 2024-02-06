import { memo } from "react";
// library
import { styled } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  Checkbox,
} from "@mui/material";
// import ClearIcon from "@mui/icons-material/Clear";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";
// components
import { StyledRDSelect } from "src/components/@material-extend";
// constants
import { RDSelectProps } from "src/constants/content.constant";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: "100%",
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&::placeholder": {
    textOverflow: "ellipsis !important",
    color: "#AAAAAA",
  },
}));

// ----------------------------------------------------------------------

// event for react-select-dropdown on checkbox click
export const rdsItemRenderer = ({ item, itemIndex, props, state, methods }) => (
  <div key={item[props.valueField]} onClick={() => methods.addItem(item)}>
    <Checkbox checked={methods.isSelected(item)} color="secondary" />
    &nbsp;&nbsp;&nbsp;{item[props.labelField]}
  </div>
);

export const contentRenderer = ({ props, state }) => {
  return (
    <div>
      {state.values.length} von {props.options.length} Ausgewählt
    </div>
  );
};

const RdsSelection = ({
  placeholder = "Suchen..",
  startIcon = true,
  endIcon = false,
  variant = "default",
  options,
  id,
  itemRenderer,
  isSettingsOpen,
  setIsSettingsOpen,
  onChange,
  ...rest
}) => {
  return (
    <RootStyle>
      <FormControl variant="standard" id="rdSelectFC" fullWidth>
        <StyledRDSelect
          {...RDSelectProps}
          id={id}
          className={id}
          values={[]}
          options={options || []}
          onChange={(values) => onChange(values)}
          inputRenderer={(props) => {
            const { state, methods, inputRef } = props;

            return (
              <SearchStyle
                tabIndex="1"
                onChange={(e) => methods?.setSearch(e)}
                placeholder={placeholder}
                // value={state?.search}
                value={
                  Array.isArray(state?.values) && state?.values?.length > 0
                    ? state?.values[0][props?.props?.labelField]
                    : ""
                }
                sx={{
                  color: "#000000",
                  border: "0px solid #f3f3f3",
                  borderRadius: "0px",
                  "& fieldset": {
                    border: "none",
                  },
                }}
                ref={inputRef}
                startAdornment={
                  startIcon ? (
                    <InputAdornment position="start">
                      <Box
                        component={Icon}
                        icon={searchFill}
                        sx={{
                          color: variant === "default" ? "#AAAAAA" : "#000",
                        }}
                      />
                    </InputAdornment>
                  ) : null
                }
                endAdornment={
                  endIcon ? (
                    <InputAdornment
                      position="end"
                      className="pointer"
                      onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    >
                      <IconButton color="primary">
                        <SettingsOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }
              />
            );
          }}
          itemRenderer={itemRenderer || undefined}
          {...rest}
        />
      </FormControl>
    </RootStyle>
  );
};

export default memo(RdsSelection);
