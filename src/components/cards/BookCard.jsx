import { memo, useEffect, useState } from "react";
// css
import "./BookCard.scss";
// npm
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// constants
import { ROUTES_URL } from "src/constants/url.constant";
// redux
import { actionSelectedBook } from "src/store/slices/book.Slice";

const BookCard = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { card } = props;
  const bookRedux = useSelector(({ book }) => book);

  const onOptionClick = (action, book) => {
    if (action === "read") {
      navigate(ROUTES_URL.BOOK, { state: { book: book, tab: "read" } });
    } else if (action === "info") {
      navigate(ROUTES_URL.BOOK, { state: { book: book, tab: "info" } });
    } else {
      navigate(ROUTES_URL.BOOK, { state: { book: book, tab: "assign" } });
    }
  };

  const onBookClick = (book) => {
    dispatch(actionSelectedBook(book));
    props?.handleSelectedBook?.(book);
  };

  const selectedClass =
    window.location.pathname === ROUTES_URL.TASKS &&
    bookRedux?.selected?.id === card?.id
      ? "selected"
      : "";
  return (
    <div
      className={`bookCard ${selectedClass}`}
      onClick={() => onBookClick(card)}
    >
      <div className="bookImg">
        <img
          src={card?.image || "/svg/book-placeholder.svg"}
          alt={card?.title || " "}
        />
      </div>
      <div className="bookOptions">
        <div className="bookOption" onClick={() => onOptionClick("read", card)}>
          <img src="/svg/Group 148.svg" alt="read" />{" "}
          <span className="bookOptionText">{t("Oku")}</span>
        </div>
        <div className="bookOption" onClick={() => onOptionClick("info", card)}>
          <img src="/svg/Group 152.svg" alt="info" />{" "}
          <span className="bookOptionText">{t("Bilgi ver")}</span>
        </div>
        <div
          className="bookOption"
          onClick={() => onOptionClick("assign", card)}
        >
          <img src="/svg/Group 150.svg" alt="assign" />
          <span className="bookOptionText">{t("Görev Ver")}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(BookCard);
