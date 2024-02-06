import React, { useState } from "react";
// npm
import { useTranslation } from "react-i18next";
import { Button, Grid, TextField } from "@mui/material";
import toastr from "toastr";
// constants
import { API_URL } from "src/constants/url.constant";
import { API_STATUS_CODE } from "src/constants/content.constant";
// utils
import { postMethod } from "src/utils";

const CreateTicketModal = (props) => {
  const { callBack, closeModal } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e, type) => {
    e.preventDefault();
    if (type === "file") {
      setFormState({
        ...formState,
        files: e.target.files[0],
      });
      e.target.value = null;
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleValidate = (fields) => {
    const newErrors = {};

    if (!fields?.subject) {
      newErrors.subject = t("message.FIELDS_REQUIRED");
    }

    if (!fields?.discription) {
      newErrors.discription = t("message.FIELDS_REQUIRED");
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
      formData.append("subject", formState?.subject);
      formData.append("discription", formState?.discription);
      // formData.append("files", formState?.files);

      const response = await postMethod(
        API_URL.CREATE_TICKET,
        formData,
        true,
        true
      );
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        console.log("create ticket response", response?.data);

        setFormState({});
        setLoading(false);
        callBack?.();
        toastr.success(t("message.UPDATE_SUCCESS"));
      } else {
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    closeModal?.();
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={(e) => handleSubmit(e)}
      spacing={4}
    >
      <Grid item xs={12}>
        <TextField
          name="subject"
          value={formState?.subject}
          onChange={handleChange}
          label={t("Title") + "*"}
          id="subject"
          error={Boolean(formErrors?.subject)}
          helperText={formErrors?.subject}
          fullWidth
        />
      </Grid>{" "}
      <Grid item xs={12}>
        <TextField
          name="discription"
          value={formState?.discription}
          onChange={handleChange}
          label={t("Message") + "*"}
          id="discription"
          error={Boolean(formErrors?.discription)}
          helperText={formErrors?.discription}
          fullWidth
          multiline
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "20px",
        }}
      >
        <Button
          variant="outlined"
          type="button"
          className="btn"
          onClick={() => handleCancel()}
        >
          {t("Cancel")}
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          className="btn"
        >
          {t("Send")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateTicketModal;
