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
import { FeaturedPostCard } from "src/components/cards";
import BookQuiz from "src/components/activity/quiz/BookQuiz";

export default function BookContent(props) {
  const { t } = props;
  const location = useLocation();
  const { book, card } = location?.state;
  const type = card?.type;
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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
          : API_URL.GET_DRAG_DROP_CONTENT;
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

  const onCardClick = (val) => {
    if (val) {
      setSelectedCard(val);
    }
  };
  const onBackClick = (action) => {
    if (action === "route") {
      navigate(ROUTES_URL.BOOK, { state: { book: book, tab: "info" } });
    } else {
      setSelectedCard(null);
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

  console.log("bookContent", type, card, data);
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
            {selectedCard?.id ? (
              <>
                <BackButton onClick={() => onBackClick()} />
                {/* {titleRender(card?.title)} */}
                {/* <FeaturedPostCard
                  key={selectedCard?.id + "selectedCard"}
                  post={selectedCard}
                  onClick={() => onCardClick()}
                  md={12}
                  type={type}
                /> */}
                {type === "mcq" && <BookQuiz post={selectedCard} type={type} />}
              </>
            ) : (
              <>
                <BackButton onClick={() => onBackClick("route")} />
                {titleRender(card?.title)}
                <Grid container spacing={4}>
                  {Array.isArray(data?.data) && data?.data?.length > 0 ? (
                    data?.data.map((post) => (
                      <FeaturedPostCard
                        key={post?.id}
                        post={post}
                        onClick={(val) => onCardClick(val)}
                        clickable
                        md={12}
                        type={type}
                      />
                    ))
                  ) : (
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      {t("message.NO_RECORDS_FOUND")}
                    </Grid>
                  )}
                </Grid>
              </>
            )}
          </Box>
        </Grid>
      </Container>
    </CustomBackdrop>
  );
}
