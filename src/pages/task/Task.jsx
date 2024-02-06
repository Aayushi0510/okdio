import React, { useState, useEffect } from "react";
// css
import "./task.scss";
// npm
import { useSelector } from "react-redux";
//
import TaskTable from "./TaskTable";
import TaskHistoryTable from "./TaskHistoryTable";
import Bookcase from "../bookcase/Bookcase";

const Task = (props) => {
  const { t } = props;
  const user = useSelector(({ user }) => user);
  const userType = user?.data?.user_type;
  const book = useSelector(({ book }) => book);

  const [selectedBook, setSelectedBook] = useState(null);
  useEffect(() => {
    if (book?.selected) {
      setSelectedBook(book?.selected);
    }
  }, [book?.selected]);

  const handleSelectedBook = (val) => {
    setSelectedBook(val);
  };

  return (
    <div className="taskPage">
      <div className="taskPage-table">
        <Bookcase t={t} handleSelectedBook={(b) => handleSelectedBook(b)} />
      </div>
      <div className="taskPage-table">
        <TaskTable t={t} userType={userType} book={selectedBook} />
      </div>
      <div className="taskPage-table">
        <TaskHistoryTable t={t} />
      </div>
    </div>
  );
};

export default Task;
