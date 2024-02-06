import React from "react";
// npm
import { Box, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// constants
import { ROUTES_URL } from "src/constants/url.constant";

const BackButton = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { path, onClick } = props;
  const onClickBtn = () => {
    if (path) {
      navigate(ROUTES_URL);
    }
    if (onClick) {
      onClick();
    } else {
      window.history.back();
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "5px",
        width: "100%",
      }}
    >
      <IconButton onClick={() => onClickBtn()}>
        <ArrowBack fontSize="medium" />
      </IconButton>
      <Box component="span" sx={{ fontSize: "14px" }}>
        {t("Back")}
      </Box>
    </Box>
  );
};

export default BackButton;
