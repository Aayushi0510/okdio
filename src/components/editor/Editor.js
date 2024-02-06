import React from "react";
import { TextareaAutosize } from "@mui/base";

const Editor = () => {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={5}
      style={{ width: 400, borderRadius: "4px", padding: "6px" }}
    />
  );
};

export default Editor;
