import React, { memo } from "react";
// library
import { Box } from "@mui/material";

const CustomNoDataRender = (props) => {
  const { reloadData, loading = false } = props;
  return (
    <Box
      className="fcc"
      sx={{
        gap: "30px",
        padding: "10px",
      }}
    >
      Kenine Daten{" "}
      <img
        src="/svg/reloadIcon.svg"
        width={20}
        height={20}
        alt=""
        title="Refresh Data"
        loading="lazy"
        onClick={() => reloadData()}
        className="pointer"
      />{" "}
      {loading ? "..." : null}
    </Box>
  );
};

export default memo(CustomNoDataRender);
