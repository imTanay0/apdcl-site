import { useState } from "react";
import InputForm from "../components/InputForm"
import OutputForm from "../components/OutputForm"

import styles from "../css/MonthlyReport.module.css";

const MonthlyReport = () => {
  const [subDivisionDetails, setSubDivisionDetails] = useState({});

  const getSDDetails = (detailFromChild) => {
    setSubDivisionDetails(detailFromChild);
  }

  return (
    <>
      <main className={styles.mainContainer}>
        <InputForm onDataUpdate={getSDDetails} />
        <OutputForm data={subDivisionDetails} />
      </main>
    </>
  )
}

export default MonthlyReport;