import React, { useState, useEffect, useCallback } from "react";
// css
import "./singleBook.scss";
// npm
import { useLocation, useNavigate } from "react-router-dom";
import toastr from "toastr";
import { Container, Box, Card } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
// constants
import { API_URL, ROUTES_URL } from "src/constants/url.constant";
import { API_STATUS_CODE } from "src/constants/content.constant";
// components
import { Modal } from "src/components/Modal";
import { CountCard } from "src/components/cards";
import { CustomAudioPlayer, CustomBackdrop } from "src/components";
// utils
import { getMethod } from "src/utils";
//
import Bookinfo from "../bookinfo/Bookinfo";
import Bookread from "../bookread/Bookread";
import TaskTable from "src/pages/task/TaskTable";

export default function SingleBook(props) {
  const { t } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("info");
  const [isPlay, setIsPlay] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [eventModal, setEventModal] = useState(false);
  const handleCloseModal = () => {
    setEventModal(false);
  };
  const CARDS = [
    {
      id: "1",
      count: "hidden",
      title: t("Recording Audio"),
      color: "#67B695",
      type: "voice",
    },
    {
      id: "2",
      count: "hidden",
      title: t("Quiz"),
      color: "#419B9F",
      type: "mcq",
    },
    {
      id: "3",
      count: "hidden",
      title: t("Pairing"),
      color: "#A9C353",
      type: "match",
    },
    {
      id: "4",
      count: "hidden",
      title: t("Drag Drop"),
      color: "#50B3E8",
      type: "drag",
    },
    {
      id: "5",
      count: "hidden",
      title: t("Puzzle"),
      color: "#F3913D",
      type: "puzzle",
    },
  ];
  const onClickCard = (data) => {
    handleCloseModal();
    navigate(ROUTES_URL.BOOK_CONTENT, {
      state: { book: location?.state?.book, card: data },
    });
  };
  const fetchData = async (bookId) => {
    try {
      setLoading(true);
      const response = await getMethod(
        API_URL.GET_BOOK_DETAILS + `/${bookId}`,
        false,
        true
      );
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        const newData = response?.data?.data;
        setBook(newData);
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
    fetchData(location?.state?.book?.id);
    setTab(location?.state?.tab);
  }, [location?.state?.book?.id]);

  const handlePdf = (pdf) => {
    if (pdf) {
      window.open(pdf?.file);
    } else {
      toastr.error(t("message.NO_RECORDS_FOUND"));
    }
  };

  const handlePlay = () => {
    setIsPlay(!isPlay);
  };

  // console.log("book-info-location", tab, book);
  // console.log("book-tab", tab);

  const isPdfFiles = Array.isArray(book?.pdfData) && book?.pdfData?.length > 0;
  const isAudioFiles =
    Array.isArray(book?.audioData) && book?.audioData?.length > 0;
  const lastPageIndex =
    Array.isArray(book?.audioData) && book?.audioData.length > 0
      ? book?.audioData.length - 1
      : 0;

  const handleTab = (val) => {
    setTab(val);
  };

  const handleIndex = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const handleClickPrevious = () => {
    if (book?.audioData?.length > 1) {
      setCurrentIndex((prevState) =>
        prevState === 0 ? lastPageIndex : prevState - 1
      );
    }
  };

  const handleClickNext = () => {
    if (book?.audioData?.length > 1) {
      setCurrentIndex((prevState) =>
        prevState === lastPageIndex ? 0 : prevState + 1
      );
    }
  };
  // console.log("signle-book-currentIndex", currentIndex, book?.audioData);
  return (
    <CustomBackdrop loading={loading}>
      <Container maxWidth="lg">
        <div className="book-container">
          <Box className="book-tab pointer" onClick={() => handleTab("listen")}>
            <div className="book-listen">
              <img src="/svg/file-audio.svg" alt="listen book" />
              <span>{t("Dinle")}</span>
            </div>
            <ArrowDropDown
              className={`book-tab-icon ${tab === "listen" ? "active" : null}`}
              fontSize="large"
              sx={{ color: tab === "listen" ? "primary.main" : null }}
            />
          </Box>
          <Box className="book-tab pointer" onClick={() => setEventModal(true)}>
            <div className="book-events">
              <img src="/svg/Group 156.svg" alt="Events of book" />
              <span>{t("Etkinlikler")}</span>
            </div>
          </Box>
          <Box className="book-tab pointer" onClick={() => setTab("read")}>
            <div className="book-read pointer">
              <img src="/svg/Group 149.svg" alt="read book" />
              <span>{t("Oku")}</span>
            </div>{" "}
            <ArrowDropDown
              className={`book-tab-icon ${tab === "read" ? "active" : null}`}
              fontSize="large"
              sx={{ color: tab === "read" ? "#50b3e8" : null }}
            />
          </Box>
          <Box className="book-tab pointer" onClick={() => setTab("assign")}>
            <div className="book-task pointer">
              <img src="/svg/assign.svg" alt="tasks of book" />
              <span>{t("Görev Ver")}</span>
            </div>
            <ArrowDropDown
              className={`book-tab-icon ${tab === "assign" ? "active" : null}`}
              fontSize="large"
              sx={{ color: tab === "assign" ? "#f3913d" : null }}
            />
          </Box>

          <Box className="book-tab pointer" onClick={() => setTab("pdf")}>
            <div className="book-pdf pointer">
              <img src="/svg/file-pdf.svg" alt="PDF of book" />
              <span>{t("Materyaller ")}</span>
            </div>
            <ArrowDropDown
              className={`book-tab-icon ${tab === "pdf" ? "active" : null}`}
              fontSize="large"
              sx={{ color: tab === "pdf" ? "#d33a3a" : null }}
            />
          </Box>

          <Box className="book-tab pointer" onClick={() => setTab("info")}>
            <div className="book-back pointer">
              <img src="/svg/book-info.svg" alt="back to book" />
              <span>{t("Kitaba dön")}</span>
            </div>{" "}
            <ArrowDropDown
              className={`book-tab-icon ${tab === "info" ? "active" : null}`}
              fontSize="large"
              sx={{ color: tab === "info" ? "#67b695" : null }}
            />
          </Box>
        </div>
        {tab === "info" ? <Bookinfo t={t} book={book} key="info" /> : null}

        {tab === "listen" || tab === "read" ? (
          <Bookread
            t={t}
            book={book}
            handleIndex={(idx) => handleIndex(idx)}
            tab={tab}
            key={tab}
            currentIndex={currentIndex}
            setCurrentIndex={(cidx) => setCurrentIndex(cidx)}
          />
        ) : null}
        {tab === "assign" ? <TaskTable t={t} book={book} key="assign" /> : null}
        {tab === "pdf" ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {isPdfFiles ? (
              book?.pdfData?.map((x, i) => {
                const fileType = x?.file?.split(".").pop();
                return (
                  <Card
                    key={i + x?.id}
                    onClick={() => handlePdf(x)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "20px",
                      backgroundColor: "#ffffff",
                      color: "#d33a3a",
                      border: "1px solid #d33a3a",
                      cursor: "pointer",
                      textTransform: "uppercase",
                    }}
                  >
                    {fileType || ""} {i + 1}
                  </Card>
                );
              })
            ) : (
              <div>{t("message.NO_RECORDS_FOUND")}</div>
            )}
          </Box>
        ) : null}
      </Container>
      {isAudioFiles && tab === "listen" ? (
        <Box
          sx={{ width: "100%", position: "absolute", bottom: "0", left: "0" }}
        >
          <Box
            component="span"
            sx={{
              color: "#ffffff",
              fontFamily: "fontFamilyBold",
              fontSize: "15px !important",
              fontWeight: "400",
              position: "absolute",
              left: "15%",
              top: "15%",
            }}
          >
            {book?.book_name}
          </Box>
          <CustomAudioPlayer
            id={
              currentIndex > 0
                ? book?.audioData[currentIndex - 1]?.id
                : "myAudio"
            }
            file={
              currentIndex > 0 ? book?.audioData[currentIndex - 1]?.file : "/"
            }
            currentIndex={currentIndex}
            handlePlay={() => handlePlay()}
            handleClickNext={(currIdx) => handleClickNext(currIdx)}
            handleClickPrevious={(currIdx) => handleClickPrevious(currIdx)}
          />
        </Box>
      ) : null}
      {/* modal starts */}
      <Modal
        isOpen={eventModal}
        closeModal={() => handleCloseModal()}
        closeModalClick={() => handleCloseModal()}
        onlyCloseIcon
        content={
          <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            {CARDS.map((x) => (
              <Box
                key={x.id}
                sx={{
                  width: { xs: "150px", md: "200px" },
                  height: { xs: "150px", md: "200px" },
                  cursor: "pointer",
                }}
              >
                <CountCard
                  key={x.id}
                  card={x}
                  onClick={(data) => onClickCard(data)}
                  countSx={{ display: "none" }}
                />
              </Box>
            ))}
          </Box>
        }
        contentStyle={{ boxShadow: "none" }}
        paperStyle={{ backgroundColor: "transparent" }}
        dialogProps={{ maxWidth: "xl", fullWidth: true }}
        closeIconStyle={{ color: "#ffffff" }}
        titleStyle={{ display: "flex", justifyContent: "flex-end" }}
      />
    </CustomBackdrop>
  );
}
