import React from "react";
// css
import "./bookActivity.scss";
// npm
import { useTranslation } from "react-i18next";
// constants
import { Grid } from "@mui/material";

const BookPuzzle = (props) => {
  const { post } = props;
  const { t } = useTranslation();
  // console.log("post", post);

  return (
    <div className="bookActivity">
      <div className="bookActivity-head">
        <span
          style={{
            width: "30px",
            height: "30px",
          }}
        >
          <img src="/svg/my-task-purple.svg" alt="" />
        </span>
        <span className="bookActivity-head-title">{t("Puzzle")}</span>
      </div>
      {Array.isArray(post) && post?.length > 0 ? (
        <Grid container spacing={4} className="bookActivity-content">
          {post.map((question) => {
            return (
              <Grid
                item
                xs={12}
                md={6}
                key={question?.id}
                className="bookActivity-content-wrapper"
              >
                <div className="question h-full">
                  <div
                    className="question-data"
                    dangerouslySetInnerHTML={{
                      __html: question?.data,
                    }}
                  />
                </div>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <div className="text-[#fff] text-center mt-10">
          {t("message.NO_RECORDS_FOUND")}
        </div>
      )}
    </div>
  );
};

export default BookPuzzle;
