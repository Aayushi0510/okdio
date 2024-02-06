import React from "react";
// css
import "./evaluation.scss";
import EvalAssessedTable from "./EvalAssessedTable";
import EvalAwaitTable from "./EvalAwaitTable";

const Evaluation = (props) => {
  const { t } = props;

  return (
    <div className="evaluationPage">
      <div className="evaluationPage-table">
        <EvalAwaitTable t={t} />
      </div>
      <div className="evaluationPage-table">
        <EvalAssessedTable t={t} />
      </div>
    </div>
  );
};

export default Evaluation;
