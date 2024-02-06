import { useRef, useState } from "react";
// material
import { alpha } from "@mui/material/styles";
import { Box, Avatar, IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import toastr from "toastr";
// components
import MenuPopover from "../MenuPopover";
// constants
import { API_STATUS_CODE, MESSAGE } from "../../constants/content.constant";
import { API_URL, ROUTES_URL } from "src/constants/url.constant";
// components
import { CustomBackdrop } from "src/components";
// redux
import { actionCLearUser } from "src/store/slices/user.slice";
// utils
import { getMethod } from "src/utils";
// ----------------------------------------------------------------------

export default function ProfilePopover(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { user } = props;
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);

      const response = await getMethod(API_URL.LOGOUT, false, true);
      // console.log("logout-response", response);

      if (response?.status === API_STATUS_CODE.SUCCESS) {
        if (response?.data?.success) {
          dispatch(actionCLearUser());
          sessionStorage.clear();
          localStorage.clear();

          toastr.success(t("message.LOGOUT_SUCCESS"));
          // navigate(ROUTES_URL.HOME);
          window.location.href = ROUTES_URL.HOME;
        } else {
          toastr.error(response?.data?.message);
        }
      } else {
        toastr.error(t("message.SOMETHING_WENT_WRONG"));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleMenuClick = (action) => {
    handleClose();
    if (action === "LOGOUT") {
      handleLogout();
    }
    if (action === "PROFILE") {
      navigate(ROUTES_URL.PROFILE);
    }
  };

  return (
    <>
      <CustomBackdrop loading={loading}>
        <IconButton
          ref={anchorRef}
          onClick={handleOpen}
          sx={{
            padding: 0,
            width: 44,
            height: 44,
            ...(open && {
              "&:before": {
                zIndex: 1,
                content: "''",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
          }}
        >
          <Avatar
            src={user?.profile_img || user?.profileUrl}
            alt={user?.name || ""}
            sx={{ border: "1px solid #183887" }}
          />
        </IconButton>

        <MenuPopover
          open={open}
          onClose={handleClose}
          anchorEl={anchorRef.current || ""}
          sx={{ width: 220 }}
        >
          <Box sx={{ p: 2, pt: 1.5 }}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              onClick={() => handleMenuClick("PROFILE")}
            >
              {t("PROFİL")}
            </Button>
          </Box>
          <Box sx={{ p: 2, pt: 0 }}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              onClick={() => handleMenuClick("LOGOUT")}
            >
              {t("ÇIKIŞ")}
            </Button>
          </Box>
        </MenuPopover>
      </CustomBackdrop>
    </>
  );
}
