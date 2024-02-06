import React, { useState, useEffect } from "react";
// css
import "./help.scss";
// npm
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { Modal } from "src/components/Modal";
// Components
import { BackButton, CustomBackdrop } from "src/components";
import { CreateTicketModal } from "src/components/Modal";
// constants
import { API_URL } from "src/constants/url.constant";
import { API_STATUS_CODE } from "src/constants/content.constant";
// utils
import { getMethod } from "src/utils";
import TicketCard from "src/components/cards/TicketCard";

const Help = (props) => {
  const { t } = props;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCloseModal = () => {
    setAddModal(false);
  };
  const fetchData = async () => {
    try {
      handleCloseModal();

      setLoading(true);

      const response = await getMethod(API_URL.GET_TICKET_LIST, false, true);
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        // console.log("class response", response?.data);

        const newData = response?.data?.data;

        setData(newData);
        setLoading(false);
      } else {
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTicket = () => {
    setAddModal(true);
  };
  const onCardClick = (val) => {
    if (val) {
      setSelectedCard(val);
    }
  };
  const onBackClick = () => {
    setSelectedCard(null);
  };

  const titleRender = (title) => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        sx={{ width: "100%" }}
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
              paddingLeft: "5px",
            }}
          >
            {t(title)}
          </Typography>
        </Stack>
      </Stack>
    );
  };
  // console.log("help-data", data);

  return (
    <CustomBackdrop loading={loading}>
      <Container maxWidth="xl">
        {selectedCard?.id ? (
          <Card sx={{ padding: "5px" }}>
            <BackButton onClick={() => onBackClick()} />
            {titleRender("Yardim")}
            <Grid
              container
              spacing={4}
              sx={{
                marginTop: "15px",
              }}
            >
              <Grid item xs={12} md={12}>
                <TicketCard
                  data={selectedCard}
                  onClick={() => onCardClick()}
                  clickable
                  isDetailPage
                  key={selectedCard?.id + "selectedTicket"}
                />
              </Grid>
            </Grid>
          </Card>
        ) : (
          <Card sx={{ padding: "5px" }}>
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
                  {t("Yardım")}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={3}
                sx={{ width: "100%" }}
              >
                <Stack padding={1}>
                  <Button
                    variant="contained"
                    onClick={() => handleAddTicket()}
                    sx={{ backgroundColor: "success.main" }}
                    className="okudio-btn"
                    startIcon={<Add />}
                  >
                    {t("Add")}
                  </Button>
                </Stack>
              </Stack>
            </Stack>

            <Grid
              container
              spacing={4}
              sx={{
                marginTop: "15px",
              }}
            >
              {Array.isArray(data) && data?.length > 0 ? (
                data.map((x) => (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    key={x.id}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "stretch",
                    }}
                  >
                    <TicketCard
                      data={x}
                      onClick={(val) => onCardClick(val)}
                      clickable
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  {t("message.NO_RECORDS_FOUND")}
                </Grid>
              )}
            </Grid>
          </Card>
        )}
      </Container>

      {/* modal starts */}
      <Modal
        isOpen={addModal}
        closeModalClick={() => handleCloseModal()}
        title={t("Create Ticket")}
        closeIcon
        content={
          <CreateTicketModal
            callBack={() => fetchData()}
            closeModal={() => handleCloseModal()}
          />
        }
      />
    </CustomBackdrop>
  );
};

export default Help;
