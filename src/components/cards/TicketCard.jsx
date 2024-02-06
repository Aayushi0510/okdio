import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Chip,
  CardActions,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// utils
import { fDate } from "src/utils";

export default function TicketCard(props) {
  const { data, clickable, onClick, isDetailPage } = props;
  const user = useSelector(({ user }) => user?.data);
  const { t } = useTranslation();

  const content = data?.description;

  const contentLength = content?.length;
  const contentMaxLength = 55;

  const contentVisible = isDetailPage
    ? content
    : contentLength > contentMaxLength
    ? content?.substring(0, contentMaxLength) + "..."
    : content;

  const showReadMore = !isDetailPage && contentLength > contentMaxLength;

  return (
    <Card
      sx={{
        cursor: !clickable ? "default" : "pointer",
        width: "100%",
      }}
      onClick={() => onClick(data)}
    >
      <CardHeader
        avatar={
          <Avatar
            src={user?.profile_img || user?.profileUrl}
            sx={{ bgcolor: "primary.main" }}
            aria-label="profile"
            alt={user?.name}
          />
        }
        action={
          <Chip
            color={data?.status === "1" ? "success" : "warning"}
            label={data?.status === "1" ? t("Completed") : t("Pending")}
            sx={{ color: "#ffffff" }}
          />
        }
        title={data?.ticket_id}
        subheader={fDate(data?.updated_at, "DD.MM.YYYY")}
      />

      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {data?.subject}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {contentVisible}
        </Typography>
      </CardContent>
      {showReadMore ? (
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="text"
            sx={{
              fontSize: "18px",
            }}
          >
            Read More
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
}
