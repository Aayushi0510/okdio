import React, { useState, useEffect } from "react";
// npm
import { Box, Grid, Container, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
// constants
import { API_URL, ROUTES_URL } from "src/constants/url.constant";
import { API_STATUS_CODE } from "src/constants/content.constant";
// utils
import { postMethod } from "src/utils";
// component
import { BackButton, CustomBackdrop } from "src/components";
import { FeaturedPostCard } from "src/components/cards";

export default function Content(props) {
  const { title, type } = props;
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const fetchData = async (req) => {
    try {
      setLoading(true);

      const paylaod = {
        type: type || "4",
        search: req?.search || "",
        per_page: req?.perPage || "0",
      };

      const response = await postMethod(
        API_URL.GET_CONTENT + `?page=${req?.pageNumber || 1}`,
        paylaod,
        false,
        true
      );
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        // console.log("blog response?.data", response?.data);

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
    fetchData();
  }, []);

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
  // console.log("blogs", data);
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
                {titleRender(title)}
                <FeaturedPostCard
                  key={selectedCard?.id + "selectedCard"}
                  post={selectedCard}
                  onClick={() => onCardClick()}
                  md={12}
                  isDetailPage
                  type={type}
                />
              </>
            ) : (
              <>
                {titleRender(title)}
                <Grid container spacing={4}>
                  {Array.isArray(data?.data) && data?.data?.length > 0 ? (
                    data?.data.map((post) => (
                      <FeaturedPostCard
                        key={post?.id}
                        post={post}
                        onClick={(val) => onCardClick(val)}
                        clickable
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
