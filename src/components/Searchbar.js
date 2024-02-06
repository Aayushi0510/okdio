// library
import { styled } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
}));

const SearchStyle = styled(TextField)(({ theme }) => ({
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

export default function Searchbar(props) {
  const {
    placeholder = "Search",
    handleSearchChange,
    searchStr,
    handleSearchClear,
    startIcon,
    endIcon = "clear",
    variant = "standard",
    id = "search",
    type = "default",
  } = props;

  return (
    <RootStyle>
      <SearchStyle
        onChange={handleSearchChange}
        placeholder={placeholder}
        size="small"
        value={searchStr}
        id={id}
        variant={variant}
        InputProps={{
          startAdornment: startIcon ? (
            <InputAdornment position="start" className="pointer">
              <IconButton
                sx={{ color: type === "default" ? "#ABAFB3" : "#ABAFB3" }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
          endAdornment:
            endIcon === "clear" && searchStr ? (
              <InputAdornment
                position="end"
                className="pointer"
                onClick={handleSearchClear}
              >
                <IconButton
                  sx={{ color: type === "default" ? "#AAAAAA" : "#000" }}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ) : endIcon === "search" ? (
              <InputAdornment position="end" className="pointer">
                <IconButton
                  sx={{ color: type === "default" ? "#ABAFB3" : "#ABAFB3" }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
        sx={{
          ...(type === "default"
            ? {
                color: "secondary.main",
                bgcolor: "#ffffff",
                borderRadius: "0px",
                border: "1px solid #ABAFB3",
                borderColor: "#fff",
                fontFamily: "fontFamily2",
                fontSize: "15px",
                fontWeight: "fontWeightRegular",
                height: "34px",
                fieldset: {
                  borderColor: "#ABAFB3 !important",
                },
                input: {
                  "&::placeholder": {
                    color: "#ABAFB3",
                  },
                },
              }
            : {
                color: "#000000",
                bgcolor: "#F3F3F3",
                borderRadius: "2px",
              }),
        }}
      />
    </RootStyle>
  );
}
