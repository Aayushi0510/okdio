import React from "react";
// css
import "./classes.scss";
import ClassesTable from "./ClassesTable";

const Classes = (props) => {
  const { t } = props;

  return (
    <div className="classesPage">
      <div className="classesPage-table">
        <ClassesTable t={t} />
      </div>
    </div>
  );
};

export default Classes;
