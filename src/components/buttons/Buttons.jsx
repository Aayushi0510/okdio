import React from "react";
// library
import { Button } from "@mui/material";
// components
import { SxButton } from "src/components/@material-extend";

export const CustomButton = (props) => {
  const {
    label,
    disabled = false,
    type = "button",
    id,
    form,
    className,
    size = "large",
    variant = "contained",
    onClick,
  } = props;

  return (
    <Button
      size={size}
      type={type}
      variant={variant}
      id={id}
      aria-label={label}
      disabled={disabled}
      onClick={() => onClick()}
      form={form}
      role="button"
      sx={{
        ...SxButton,
      }}
      className={className}
    >
      {label}
    </Button>
  );
};
