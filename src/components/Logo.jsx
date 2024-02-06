import PropTypes from "prop-types";
// npm
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
// constants
import { ROUTES_URL } from "src/constants/url.constant";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo(props) {
  const navigate = useNavigate();

  const { sx, src = "/logo.svg" } = props;
  return (
    <Box
      component="img"
      src={src}
      sx={{ width: { sm: "80px", md: "150px" }, ...sx }}
      loading="lazy"
      onClick={() => navigate(ROUTES_URL.HOME)}
      className="pointer"
      alt="logo"
    />
  );
}
