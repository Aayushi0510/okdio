import React, { useEffect, useState } from "react";
// css
import "./dashboard.scss";
// npm
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
// components
import { CountCard } from "src/components/cards";
import DashboardTable from "./DashboardTable";
// constants
import { ROUTES_URL } from "src/constants/url.constant";

const Dashboard = (props) => {
  const { t } = props;
  const navigate = useNavigate();
  const [cards, setCards] = useState(null);

  useEffect(() => {
    setCards([
      {
        id: "1",
        count: "0",
        title: t("Okunan Kitap Sayısı"),
        image: "/svg/book-count.svg",
        color: "#67B695",
      },
      {
        id: "2",
        count: "0",
        title: t("Dinlenen Kitap Sayısı"),
        image: "/svg/book-listened.svg",
        color: "#419B9F",
      },
      {
        id: "3",
        count: "0 saat",
        title: t("Aktivite Süresi"),
        image: "/svg/activity.svg",
        color: "#A9C353",
      },
      {
        id: "4",
        count: "hidden",
        title: t("Rapor Görüntüleme"),
        image: "/svg/report.svg",
        color: "#50B3E8",
        route: ROUTES_URL.REPORTS,
      },
      {
        id: "5",
        count: "hidden",
        title: t("Ödevlendirme"),
        image: "/svg/assignment.svg",
        color: "#F3913D",
        route: ROUTES_URL.TASKS,
      },
      {
        id: "6",
        count: "hidden",
        title: t("Kitapları İncele"),
        image: "/svg/review.svg",
        color: "#A52C67",
        route: ROUTES_URL.BOOKCASE,
      },
    ]);
  }, []);

  const onClickCard = (data) => {
    if (data?.route) {
      navigate(data.route);
    }
  };

  const updateCards = (data) => {
    if (data && cards) {
      const newCards = [...cards];
      newCards[0].count = data?.total_books_read || 0;
      newCards[1].count = data?.total_books_listen || 0;
      newCards[2].count = data?.total_activity_completed || 0 + " saat";

      setCards(newCards);
    }
  };
  return (
    <div className="dashboardPage">
      <div className="dashboardPage-table">
        <DashboardTable t={t} updateCards={(data) => updateCards(data)} />
      </div>
      <div className="dashboardPage-cards">
        {Array.isArray(cards) &&
          cards?.map((x) => (
            <Box
              key={x.id}
              sx={{
                width: { xs: "150px", md: "200px" },
              }}
            >
              <CountCard
                key={x.id}
                card={x}
                onClick={(data) => onClickCard(data)}
              />
            </Box>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
