import React, { useState, useEffect } from "react";
// npm
import { Box, Grid, Container, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
// constants
import { API_URL, ROUTES_URL } from "src/constants/url.constant";
import { API_STATUS_CODE } from "src/constants/content.constant";
// utils
import { getMethod } from "src/utils";
// component
import { CustomBackdrop, BackButton } from "src/components";
import BookQuiz from "src/components/activity/BookQuiz";
import BookDragDrop from "src/components/activity/BookDragDrop";
import BookMatching from "src/components/activity/BookMatching";
import BookVoice from "src/components/activity/BookVoice";
import BookPuzzle from "src/components/activity/BookPuzzle";

export default function BookContent(props) {
  const { t } = props;
  const location = useLocation();
  const { book, card } = location?.state;
  const type = card?.type;
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const url =
        type === "voice"
          ? API_URL.GET_VOICE_CONTENT
          : type === "mcq"
          ? API_URL.GET_MCQ_CONTENT
          : type === "match"
          ? API_URL.GET_MATCH_CONTENT
          : type === "drag"
          ? API_URL.GET_DRAG_DROP_CONTENT
          : API_URL.GET_PUZZLE_CONTENT; // puzzle
      const response = await getMethod(url + `/${book?.id}`, false, true);
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        const newData = response?.data;

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
    if (type) {
      fetchData();
    }
  }, [book, type]);

  const onBackClick = (action) => {
    if (action === "route") {
      navigate(ROUTES_URL.BOOK, { state: { book: book, tab: "info" } });
    } else {
    }
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

  const renderActivity = () => {
    return type === "mcq" ? (
      <BookQuiz post={data?.data} type={type} />
    ) : type === "drag" ? (
      <BookDragDrop post={data?.data} type={type} />
    ) : type === "match" ? (
      <BookMatching post={data?.data} type={type} />
    ) : type === "voice" ? (
      <BookVoice post={data?.data} type={type} />
    ) : (
      <BookPuzzle post={data?.data} type={type} />
    );
  };

  // console.log("bookContent", type, card, data);
  return (
    <CustomBackdrop loading={loading}>
      <Container maxWidth={false}>
        <Grid container spacing={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "5px",
              flexDirection: "column",
              marginTop: "30px",
              width: "100%",
            }}
          >
            <BackButton onClick={() => onBackClick("route")} />
            {/* {titleRender(card?.title)} */}
            <Grid container spacing={4}>
              {Array.isArray(data?.data) && data?.data?.length > 0 ? (
                <Grid item xs={12} sx={{ padding: "10px" }}>
                  {renderActivity()}
                </Grid>
              ) : (
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  {t("message.NO_RECORDS_FOUND")}
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Container>
    </CustomBackdrop>
  );
}
