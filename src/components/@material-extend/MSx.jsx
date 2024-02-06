export const SxButton = {
  borderRadius: "20px",
  color: "#F8FAFC",
  backgroundColor: "primary",
  fontSize: "14px",
  fontWeight: "fontWeightSemiBold",
  lineHeight: "24px",
  width: "132px",
  height: "30px",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  cursor: "pointer",
};

export const SxLightButton = {
  borderRadius: "20px",
  border: ".25px solid #419BCD",
  backgroundColor: "#ffffff",
  color: "primary.main",
  fontSize: "14px",
  fontWeight: "fontWeightSemiBold",
  lineHeight: "24px",
  width: "132px",
  height: "30px",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  marginLeft: "15px",

  "&:hover": { color: "#F8FAFC" },
};

// modal top right side text
export const SxModalToolbarText = {
  color: "secondary.main",
  fontFamily: "fontFamily2",
  fontSize: "16px",
  fontWeight: "fontWeightRegular",
  lineHeight: "24px",
};

export const SxDatePlaceholder = {
  fontSize: "14px",
  fontFamily: "fontFamily2",
  fontWeight: "fontWeightMedium",
  color: "#011632",
  lineHeight: "15px",
  padding: "10px 12px 10px 0px",
};

export const SxInputPlaceholder = {
  borderRadius: 4,
  position: "relative",
  backgroundColor: "#ffffff",
  border: "1px solid #D0DAE9",
  fontSize: 14,
  fontFamily: "Inter",
  fontWeight: 500,
  color: "#011632",
  lineHeight: "15px",
  padding: "10px 12px",
  "&:focus": {
    boxShadow: "0px 5px 10px 1px rgba(4, 10, 63, 0.1)",
    borderColor: "#ffffff",
  },
};
