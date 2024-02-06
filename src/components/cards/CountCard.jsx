import { Card, Typography } from "@mui/material";
import { memo } from "react";

const CountCard = (props) => {
  const { card, onClick, cardSx = {}, countSx = {} } = props;

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0px",
          backgroundColor: card.color,
          boxShadow: "0px 3px 6px #00000029",
          borderRadius: "0px",
          cursor: card?.route ? "pointer" : "auto",
          width: "100%",
          height: "100%",
          padding: "10px",
          ...cardSx,
        }}
        onClick={() => onClick(card)}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#ffffff",
            fontFamily: "fontFamilyBold",
            fontSize: { xs: "20px !important", md: "39px !important" },
            visibility: card?.count === "hidden" ? "hidden" : "visible",
            ...countSx,
          }}
        >
          {card?.count}
        </Typography>

        {card?.image ? <img src={card?.image} alt="" /> : null}
        <Typography
          component="div"
          sx={{
            color: "#ffffff",
            fontFamily: "fontFamilyBold",
            fontSize: { xs: "10px !important", md: "15px !important" },
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          {card.title}
        </Typography>
      </Card>
    </>
  );
};

export default memo(CountCard);
