import React, { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@mui/styles";

import { Stack } from "@mui/material";

const useStyles = makeStyles(
  {
    dropzoneFile: {
      outline: " none",
      alignItems: " center",
      flexDirection: "column",
      justifyContent: "center",
      padding: "40px 8px",
      borderRadius: "8px",
      backgroundColor: "rgb(244, 246, 248)",
      textAlign: "center",
      border: "1px #919eab52 dashed",
      height: "300px",
      "&:hover": {
        opacity: 0.72,
        cursor: "pointer",
      },
    },
    DragFont: {
      fontSize: "20px",
      textAlign: "left",
    },

    UploadImg: {
      width: "250px",
      height: "250px",
      float: "right",
      marginRight: "50px",
    },
  },
  { index: 1 }
);
export default function MyDropzone({ addAttachment }) {
  const classes = useStyles();
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      addAttachment({
        filename: file.name,
        size: file.size,
        ext: file.name.substr(file.name.lastIndexOf(".") + 1),
      });
    },
    [addAttachment]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const inputRef = useRef();

  function handleDropzoneClick() {
    inputRef.current.click();
  }

  return (
    <div className={classes.dropzoneFile} onClick={handleDropzoneClick}>
      <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
        <img
          src="/static/mock-images/covers/drop-file.svg"
          className={classes.UploadImg}
          alt=""
        />

        <div {...getRootProps()} className={classes.titleDiv}>
          <input {...getInputProps()} ref={inputRef} />
          {isDragActive ? (
            <p className={classes.DragFont}>Drop the files here ...</p>
          ) : (
            <p className={classes.DragFont}>
              {" "}
              <strong>Drop or Select File </strong> <br /> Drag 'n' drop some
              files here, or click to select files
            </p>
          )}
        </div>
      </Stack>
    </div>
  );
}
