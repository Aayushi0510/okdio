import React from "react";
// css
import "./bookinfo.scss";

export default function Bookinfo(props) {
  const { t, book } = props;

  // console.log("book-info-location", book);
  return (
    <div className="book-info">
      <div className="book-infoimg">
        <img
          src={book?.image || "/svg/book-placeholder.svg"}
          alt={book?.title || " "}
        />
      </div>
      <div className="book-infotext">
        <p>
          {t("Kitap Adı")}: {book?.book_name}{" "}
        </p>
        <p>
          {t("Sayfa Sayısı")}: {book?.imageData?.length}{" "}
        </p>
        <p>
          {t("Konusu")}: {book?.book_description}
        </p>
        {/* <p>
          {t("Hedef Sınıf Düzeyi")}: {book?.grade}{" "}
        </p>
        <p>
          {t("Grade Name")}: {book?.grade_name}{" "}
        </p> */}
        <p>
          {t("Series Name")}: {book?.series_name}{" "}
        </p>
        <p>
          {t("Earnings")}: {book?.objectives_name}{" "}
        </p>
        <p>
          {t("General Theme Name")}: {book?.generalthemes_name}{" "}
        </p>
        <p>
          {t("PYP Theme Name")}: {book?.pypthemes_name}{" "}
        </p>
        {/* <p>
          {t("Description")}: {book?.book_description}
        </p> */}
      </div>
    </div>
  );
}
