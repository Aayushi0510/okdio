import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)`
  // .MuiBackdrop-root {
  //   background: linear-gradient(
  //     75deg,
  //     rgba(0, 0, 0, 0) 0%,
  //     rgba(0, 0, 0, 0) 100%
  //   );
  // }
`;

function Modal({
  isOpen,
  closeModal,
  title,
  titleClass = "",
  closeIcon,
  onlyCloseIcon,
  closeIconStyle,
  content,
  action,
  dialogStyle = {},
  paperStyle = {},
  contentStyle = {},
  actionStyle = {},
  titleStyle = {},
  contentClass = "",
  dialogProps,
  closeModalClick,
}) {
  return (
    <>
      <StyledDialog
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={dialogStyle}
        PaperProps={{ sx: paperStyle }}
        {...dialogProps}
      >
        {title && (
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              ...titleStyle,
            }}
            className={titleClass}
            id="alert-dialog-title"
          >
            {title}{" "}
            {closeIcon ? (
              <Close
                onClick={closeModalClick}
                className="pointer"
                sx={closeIconStyle}
              />
            ) : null}
          </DialogTitle>
        )}{" "}
        {onlyCloseIcon && (
          <DialogTitle
            sx={titleStyle}
            className={titleClass}
            id="alert-dialog-title"
          >
            <Close
              onClick={closeModalClick}
              className="pointer"
              sx={closeIconStyle}
            />
          </DialogTitle>
        )}
        {content && (
          <DialogContent sx={contentStyle} className={contentClass}>
            {content}
          </DialogContent>
        )}
        {action && <DialogActions sx={actionStyle}>{action}</DialogActions>}
      </StyledDialog>
    </>
  );
}

export default Modal;
