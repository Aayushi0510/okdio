import { styled } from "@mui/material/styles";
import { InputBase, InputLabel, TableRow } from "@mui/material";
import RDSelect from "react-dropdown-select";

export const StyledInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#2b2b2b",
    border: "1px solid #D0DAE9",
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: 500,
    color: "#011632",
    lineHeight: "15px",
    // width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),

    "&:focus": {
      boxShadow: "0px 5px 10px 1px rgba(4, 10, 63, 0.1)",
      borderColor: theme.palette.secondary.light,
    },
  },
}));

export const BootstrapLabel = ({ children, id, extraSX, className }) => (
  <InputLabel
    shrink
    htmlFor={id}
    sx={{
      color: "#000000",
      fontSize: 14,
      fontFamily: "fontFamily2",
      fontWeight: 500,
      lineHeight: "15px",
      letterSpacing: "0.26px",
      "&.Mui-focused": {
        color: "#000000",
      },
      ...extraSX,
    }}
    className={className}
  >
    {children}
  </InputLabel>
);

export const StyledRDSelect = styled(RDSelect)`
  ${({ dropdownRenderer }) =>
    dropdownRenderer &&
    `
		.react-dropdown-select-dropdown {
			overflow: initial;
		}
	`}
`;

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#ffffff",
  "&:nth-of-type(odd)": {
    backgroundColor: "#1838871A",
  },
  "& td": {
    color: "#ABAFB3",
    fontWeight: "400",
    border: "1px solid #DDDFE1",
  },
}));
