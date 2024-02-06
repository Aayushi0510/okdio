// library
import { Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
// utils
import { fDate } from "src/utils";

const Selection = (props) => {
  const {
    value,
    onChange,
    name,
    options = [],
    multiple = false,
    className = "",
    paperSx = {},
    reload,
    loading = false,
    placeholder = "",
    callFrom,
    disabled,
    variant = "outlined",
    size = "small",
    label,
  } = props;
  return (
    <>
      <Select
        onChange={onChange}
        multiple={multiple}
        name={name}
        value={value || ""}
        defaultValue=""
        disabled={disabled}
        // renderValue={(selected) =>
        //   multiple ? (
        //     selected?.join(", ")
        //   ) : selected.length === 0 ? (
        //     <em>{placeholder}</em>
        //   ) : (
        //     selected
        //   )
        // }
        // renderValue={undefined}
        inputProps={{ "aria-label": label || name }}
        size={size}
        variant={variant}
        className={`${className}`}
        classes={{ select: "py-0 flex items-center" }}
        displayEmpty={!!placeholder}
        placeholder={placeholder}
        sx={{
          backgroundColor: "#ffffff",
          "&.Mui-focused": { backgroundColor: "#ffffff" },
          "&:hover": { backgroundColor: "#ffffff" },
          borderRadius: 0,
          border: "1px solid #DDDFE1",
        }}
        // MenuProps={{
        //   PaperProps: {
        //     sx: {
        //       ...paperSx,
        //       bgcolor: "#ECECEC",
        //       borderRadius: 0,
        //       borderBottomLeftRadius: 20,
        //       borderBottomRightRadius: 20,
        //       // minWidth: "235px !important",
        //       "& .MuiList-root": {
        //         paddingTop: 0,
        //         paddingBottom: 0,
        //       },
        //       "& .MuiMenuItem-root": {
        //         padding: 1,
        //       },
        //     },
        //   },
        // }}
      >
        {placeholder ? (
          <MenuItem
            value=""
            disabled
            sx={{
              color: "#ABAFB3",
              fontFamily: "fontFamily2",
              fontSize: "15px",
              fontWeight: "400",
              cursor: "pointer",
              padding: 0,
              textAlign: "center",
            }}
          >
            <ListItemText primary={placeholder} />
          </MenuItem>
        ) : null}
        {options?.length > 0 ? (
          options?.map((x, i) => (
            <MenuItem
              key={x.id + x.value + i}
              value={x.value}
              sx={{
                color: "#ABAFB3",
                fontFamily: "fontFamily2",
                fontSize: "15px",
                fontWeight: "fontWeightMedium",
                cursor: "pointer",
              }}
            >
              {multiple && <Checkbox checked={value?.indexOf(x.value) > -1} />}
              {callFrom === "date" ? (
                <ListItemText primary={fDate(x.label)} />
              ) : (
                <ListItemText primary={x.label} />
              )}
            </MenuItem>
          ))
        ) : reload ? (
          <MenuItem>
            <ListItemText
              primary={loading ? "Loading..." : "Reload"}
              onClick={() => reload(true)}
            />
          </MenuItem>
        ) : (
          <MenuItem>
            <ListItemText primary="No Data Found !" />
          </MenuItem>
        )}
      </Select>
    </>
  );
};

export default Selection;
