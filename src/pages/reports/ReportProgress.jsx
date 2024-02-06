import React, { useState, useEffect } from "react";
// npm
import { Card, Stack, Container, Typography, Paper, Box } from "@mui/material";
// utils
import { CountCard } from "src/components/cards";

const ReportProgress = (props) => {
  const { t, classReportsAll } = props;
  const [cards, setCards] = useState(null);

  const updateCards = (data) => {
    if (data && cards) {
      const newCards = [...cards];
      newCards[0].count = data?.total_books_read || 0;
      newCards[1].count = data?.total_books_listen || 0;
      newCards[2].count = data?.total_activity_completed || 0;

      setCards(newCards);
    }
  };

  useEffect(() => {
    setCards([
      {
        id: "1",
        count: "1234",
        title: t("Okunan Kitap Sayısı"),
        image: "/svg/book-count.svg",
        color: "#67B695",
      },
      {
        id: "2",
        count: "125",
        title: t("Dinlenen Kitap Sayısı"),
        image: "/svg/book-listened.svg",
        color: "#419B9F",
      },

      {
        id: "3",
        count: "586",
        title: t("Tamamlanan Aktivite Sayısı"),
        image: "/svg/activity-done.svg",
        color: "#DA393E",
      },
    ]);
    updateCards(classReportsAll);
  }, [classReportsAll]);

  const onClickCard = () => {};
  return (
    <Container maxWidth="xl">
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
              {t("reports.card.title")}
            </Typography>
          </Stack>
        </Stack>

        <Paper
          sx={{
            marginTop: "15px",
            display: "flex",
            gap: "20px",
          }}
          className="overflow-hidden"
        >
          {Array.isArray(cards) &&
            cards?.map((x) => (
              <Box
                key={x.id}
                sx={{
                  width: { xs: "150px", md: "150px" },
                }}
              >
                <CountCard card={x} onClick={(data) => onClickCard(data)} />
              </Box>
            ))}
        </Paper>
      </Card>
    </Container>
  );
};

export default ReportProgress;
