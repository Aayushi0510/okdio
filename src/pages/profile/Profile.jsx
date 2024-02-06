import React, { useEffect, useRef, useState } from "react";
// css
import "./profile.scss";
// npm
import {
  Button,
  IconButton,
  Container,
  Card,
  Stack,
  Paper,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useSelector } from "react-redux";
import toastr from "toastr";
// hooks
import { useFetchProfile } from "src/hooks/useFetchProfile";
// components
import { CustomBackdrop } from "src/components";
import { postMethod } from "src/utils";
// constants
import { API_URL } from "src/constants/url.constant";
import { API_STATUS_CODE } from "src/constants/content.constant";

const Profile = ({ t }) => {
  const { profileLoading, fetchProfile } = useFetchProfile();
  const reduxData = useSelector(({ user }) => user?.data);
  const [formState, setFormState] = useState(reduxData);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // console.log("profile", reduxData);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
    if (reduxData) {
      setFormState({
        ...reduxData,
        image: reduxData?.profileUrl || reduxData?.profile_img,
      });
      setFormErrors({});
    }
  }, []);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e, type) => {
    e.preventDefault();
    if (type === "file") {
      setFormState({
        ...formState,
        image: e.target.files[0],
      });
      e.target.value = null;
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleValidate = (fields) => {
    const newErrors = {};

    if (!fields?.name) {
      newErrors.name = t("message.FIELDS_REQUIRED");
    }

    setFormErrors(newErrors);
    // Return true if the form is valid (no errors)
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!handleValidate(formState)) return false;

      setLoading(true);
      const formData = new FormData();
      formData.append("name", formState?.name);
      formData.append("image", formState?.image);

      const response = await postMethod(
        API_URL.UPDATE_PROFILE,
        formData,
        true,
        true
      );

      if (response?.status === API_STATUS_CODE.SUCCESS) {
        if (response?.data?.success) {
          toastr.success(t("message.UPDATE_SUCCESS"));
          fetchProfile();
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
  const imageValue = formState?.image
    ? typeof formState?.image === "object"
      ? URL.createObjectURL(formState?.image)
      : formState?.image
    : "/images/avatar.png";
  // console.log("formState", imageValue, formState);

  return (
    <CustomBackdrop loading={loading || profileLoading}>
      <Container maxWidth="md" className="profilePage">
        <Card sx={{ padding: "20px" }}>
          {/* title bar start */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent=""
            spacing={3}
          >
            <Stack mb={2} sx={{ width: "100%" }}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  color: "#6A707E",
                  fontFamily: "fontFamily2",
                  fontSize: "24px !important",
                  fontWeight: "400",
                }}
              >
                {t("PROFİL")}
              </Typography>
            </Stack>
          </Stack>

          <Paper
            sx={{
              marginTop: "15px",
            }}
          >
            <Grid container component="form" onSubmit={(e) => handleSubmit(e)}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="img_div">
                  <img
                    src={imageValue || "/images/avatar.png"}
                    alt=""
                    className="profile_image"
                    loading="lazy"
                  />
                  <IconButton
                    className="edit_btn"
                    onClick={() => handleEditClick()}
                    color="primary"
                  >
                    <PhotoCamera htmlColor="#ffffff" fontSize="small" />
                  </IconButton>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => handleChange(e, "file")}
                  />
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  name="name"
                  value={formState?.name}
                  onChange={handleChange}
                  label={t("Name") + "*"}
                  id="name"
                  error={Boolean(formErrors?.name)}
                  helperText={formErrors?.name}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="contained" type="submit" className="btn">
                  {t("Kaydet")}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Card>
      </Container>
    </CustomBackdrop>
  );
};

export default Profile;
