import React from "react";
// css
import "./bookActivity.scss";
// npm
import { useTranslation } from "react-i18next";
// constants
import { FILE_TYPE_BY_VALUE } from "src/constants/content.constant";
import { Grid } from "@mui/material";

const BookVoice = (props) => {
  const { post } = props;
  const { t } = useTranslation();
  // console.log("post", post);

  const renderQuestion = (q, qType) => {
    return qType === "image" ? (
      <div className="image">
        <img src={q?.question} alt="" />
      </div>
    ) : qType === "audio" ? (
      <audio className="audio-element" controls>
        <source src={q?.question}></source>
      </audio>
    ) : qType === "video" ? (
      <video
        src={q?.question}
        controls
        style={{ width: "100px", height: "100px" }}
      >
        <source src={q?.question}></source>
      </video>
    ) : (
      q?.question
    );
  };

  const renderOption = (q) => {
    const optionType = FILE_TYPE_BY_VALUE[q?.options_type];

    return optionType === "image" ? (
      <img src={q?.option} alt="" style={{ width: "100px", height: "100px" }} />
    ) : optionType === "audio" ? (
      <audio className="audio-element" controls>
        <source src={q?.option}></source>
      </audio>
    ) : optionType === "video" ? (
      <video
        src={q?.option}
        controls
        style={{ width: "100px", height: "100px" }}
      >
        <source src={q?.option}></source>
      </video>
    ) : (
      q?.option
    );
  };

  const optionABCD = { 0: "A.", 1: "B.", 2: "C.", 3: "D." };

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
        <span className="bookActivity-head-title">{t("Recording Audio")}</span>
      </div>
      {Array.isArray(post) && post?.length > 0 ? (
        <Grid container spacing={4} className="bookActivity-content">
          {post.map((question, questionIndex) => {
            const questionType = FILE_TYPE_BY_VALUE[question?.question_type];

            return (
              <Grid
                item
                xs={12}
                md={6}
                key={question?.id}
                className="bookActivity-content-wrapper"
              >
                <div className="question h-full">
                  <div className="question-number">
                    {`${questionIndex + 1}.`}
                  </div>
                  <div className={`question-data ${questionType}`}>
                    {renderQuestion(question, questionType)}
                  </div>
                </div>
                {Array.isArray(question.data) && question?.data?.length > 0
                  ? question.data.map((option, optionIndex) => {
                      const label = optionABCD[optionIndex];

                      return (
                        <button key={option?.id} className="options">
                          <span>{label}</span>
                          {renderOption(option)}
                        </button>
                      );
                    })
                  : null}
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

export default BookVoice;
