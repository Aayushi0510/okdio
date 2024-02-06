import * as React from "react";
// npm
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  IconButton,
  CardActions,
  Button,
} from "@mui/material";
import { Description } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
// utils
import { downloadFile } from "src/utils";

function FeaturedPostCard(props) {
  const { post, md, onClick, clickable, type, isDetailPage } = props;

  const { t } = useTranslation();
  const VIDEO_TYPE = ["mp4", "mkv", "webm", "mov", "avi", "wmv"];
  const AUDIO_TYPE = ["mp3", "aac", "wav", "aiff", "wma", "ogg", "m4a", "flac"];
  const IMAGE_TYPE = ["png", "jpg", "jpeg", "gif", "bmp"];

  const fileType = post?.file?.split(".").pop();
  // console.log("fileType", fileType);
  const mediaType = VIDEO_TYPE.includes(fileType)
    ? "video"
    : AUDIO_TYPE.includes(fileType)
    ? "audio"
    : IMAGE_TYPE.includes(fileType)
    ? "img"
    : "other";
  // console.log("post?.description", post?.description?.length);

  const getOptions = (arr) => {
    return arr?.map((el, i) => {
      return (
        <Typography variant="subtitle1" paragraph key={el + i}>
          {i + 1}. {el}
        </Typography>
      );
    });
  };

  const handleFile = (file) => {
    window.open(file, "_blank");
  };

  const handleDownloadFile = (file) => {
    try {
      const dfileType = file?.split(".").pop();
      console.log("dfileType", dfileType, file);
      downloadFile({
        data: file,
        fileName: file?.title || "academic",
        fileType: "image/*", // dfileType,
      });
    } catch (error) {
      console.log("download-err", error);
    }
  };
  const content = post?.description;

  const contentLength = content?.length;
  const contentMaxLength = 55;

  const contentVisible = isDetailPage
    ? content
    : contentLength > contentMaxLength
    ? content?.substring(0, contentMaxLength) + "..."
    : content;

  const showReadMore = !isDetailPage && contentLength > contentMaxLength;
  // console.log(
  //   "content?.substring(0, contentMaxLength)",

  //   content?.substring(0, contentMaxLength)
  // );
  // console.log("showReadMore", showReadMore);
  return (
    <Grid
      item
      xs={12}
      md={md || 4}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch",
      }}
    >
      <Card
        sx={{
          display: "flex",
          backgroundColor: "#ffffff",
          border: "1px solid grey",
          flexDirection: "column",
          cursor: !clickable ? "default" : "pointer",
          width: "100%",
        }}
        onClick={() => onClick(post)}
      >
        {post?.file ? (
          <CardContent
            sx={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: isDetailPage ? "center" : "flex-start",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: md === 12 ? "800px" : "100%",
                display: { xs: "block" },
                alignItems: "center",
                justifyContent: "center",
                height: isDetailPage ? "500px" : "200px",
              }}
            >
              {mediaType === "audio" ? (
                <audio className="audio-element" controls>
                  <source src={post?.file}></source>
                </audio>
              ) : mediaType === "video" ? (
                <video className="audio-element" controls>
                  <source src={post?.file}></source>
                </video>
              ) : mediaType === "img" ? (
                <img
                  src={post?.file || "/images/placeholder/product.svg"}
                  alt={post?.title || ""}
                  className="audio-element"
                />
              ) : (
                <IconButton onClick={() => handleFile(post?.file)}>
                  <Description
                    fontSize="large"
                    sx={{ width: "100px", height: "100px" }}
                  />
                </IconButton>
              )}{" "}
            </Box>
            {type === "2" && isDetailPage && (
              <Box
                sx={{
                  width: { xs: "15px", md: "20px" },
                  position: "absolute",
                  bottom: "30px",
                  right: "30px",
                  cursor: "pointer",
                }}
                component="span"
                onClick={() => handleDownloadFile(post.file)}
                // href={post.file}
                // download
                // target="_blank"
              >
                <img
                  src="/svg/download.svg"
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            )}
          </CardContent>
        ) : null}

        {type === "mcq" || type === "drag" ? (
          <CardContent sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography component="h2" variant="h4">
                {t("Question")}:
              </Typography>
              <Typography component="h3" variant="subtitle1">
                {post?.question}
              </Typography>
            </Box>
            <Typography component="h2" variant="h4">
              {t("Options")}:
            </Typography>
            {Array.isArray(post?.options) ? getOptions(post?.options) : null}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography component="h2" variant="h4">
                {t("Answer")}:
              </Typography>
              <Typography component="h3" variant="subtitle1">
                {post?.answer}
              </Typography>
            </Box>
          </CardContent>
        ) : type === "match" ? (
          <CardContent sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography component="h2" variant="h4">
                {t("Question")}:
              </Typography>
              <Typography component="h3" variant="subtitle1">
                {post?.question}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                {Array.isArray(post?.left_column)
                  ? getOptions(post?.left_column, "match")
                  : null}
              </Box>
              <Box>
                {Array.isArray(post?.right_column)
                  ? getOptions(post?.right_column, "match")
                  : null}
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography component="h2" variant="h4">
                {t("Answer")}:
              </Typography>
              <Typography component="h3" variant="subtitle1">
                {Array.isArray(post?.answer_column)
                  ? getOptions(post?.answer_column, "match")
                  : null}
              </Typography>
            </Box>
          </CardContent>
        ) : (
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h4">
              {post?.title || post?.question} {showReadMore ? "..." : ""}
            </Typography>
            <Typography
              variant="subtitle1"
              paragraph
              dangerouslySetInnerHTML={{
                __html: contentVisible,
              }}
            />
          </CardContent>
        )}
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
              {t("Read More")}
            </Button>
          </CardActions>
        ) : null}
      </Card>
    </Grid>
  );
}

export default FeaturedPostCard;
