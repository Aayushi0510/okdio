import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import DropzoneReact from "react-dropzone-uploader";

const Dropzone = ({ handleChange }) => {
  //   const handleChangeStatus = ({ meta, file }, status) => {
  //     console.log(meta, file, status);
  //   };
  const handleSubmit = (files) => {
    // console.log(files);
    // console.log(files.map((f) => f.meta));

    // const obj = files
    //   .map((f, i) => {
    //     return {
    //       id: i,
    //       file: f.file,
    //     };
    //   })
    //   ?.reduce((obj, item) => {
    //     // console.log(obj, item);
    //     return {
    //       ...obj,
    //       [item?.id]: item?.file,
    //     };
    //   }, {});

    // console.log(obj);
    handleChange(
      "",
      "file",
      "files",
      files.map((f) => f.file)
    );
  };

  return (
    <DropzoneReact
      //   onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*"
      maxFiles={5}
      inputContent="Drop your files or click here to upload (Maximum 5 Files)"
    />
  );
};

export default Dropzone;
