import React, { useEffect, useState } from "react";
// css
import "./bookread.scss";
// npm
import ArrowBackIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box } from "@mui/material";

export default function Bookread(props) {
  const { tab, book, handleIndex, currentIndex } = props;
  const [pageData, setPageData] = useState([]);
  const [imageData, setImageData] = useState([]);

  const lastPageIndex =
    Array.isArray(pageData) && pageData.length > 0 ? pageData.length - 1 : 0;
  useEffect(() => {
    setImageData(book?.imageData);
    if (tab === "listen") {
      setPageData(book?.audioData);
    } else {
      setPageData(book?.imageData);
    }
  }, [book, tab]);

  const handlePagesDec = () => {
    const isCoverPage = currentIndex === 0;
    const newIndex = isCoverPage ? lastPageIndex : currentIndex - 1;

    handleIndex(newIndex);
  };

  const handlePagesInc = () => {
    const isLastPage = currentIndex === lastPageIndex;
    const newIndex = isLastPage ? 0 : currentIndex + 1;

    handleIndex(newIndex);
  };
  // console.log("book-read-pageData", tab, pageData);
  // console.log("book-read-currentIndex", currentIndex);
  // console.log("lastPageIndex", lastPageIndex);
  // console.log("imaedtata", book?.imageData);

  // const tabCurrentIndex =
  //   tab === "listen" && currentIndex === 0 ? 1 : currentIndex;
  const bookImage =
    Array.isArray(imageData) && imageData?.length > 0
      ? imageData[currentIndex]?.file || "/svg/book-placeholder.svg"
      : "/svg/book-placeholder.svg";
  return (
    <>
      <Box className={`book-cover ${tab}`}>
        {Array.isArray(pageData) && pageData?.length > 0 ? (
          <>
            <ArrowBackIcon
              className="arrowicon"
              onClick={() => handlePagesDec()}
              fontSize="large"
              sx={{
                visibility: currentIndex === 0 ? "hidden" : "visible",
              }}
            />
            <div className="book-coverimg">
              <p>
                {tab === "listen" ? (
                  <img src={bookImage} alt="" />
                ) : (
                  <img
                    src={
                      pageData[currentIndex]?.file ||
                      "/svg/book-placeholder.svg"
                    }
                    alt=""
                  />
                )}
              </p>
            </div>

            <ArrowForwardIcon
              className="arrowicon"
              onClick={() => handlePagesInc()}
              fontSize="large"
              sx={{
                visibility:
                  currentIndex === lastPageIndex ? "hidden" : "visible",
              }}
            />
          </>
        ) : null}
      </Box>
    </>
  );
}
