import { useState } from "react";
import InputForm from "../components/InputForm"
import OutputForm from "../components/OutputForm"

import styles from "../css/Report.module.css";

const Report = () => {
  const [subDivisionDetails, setSubDivisionDetails] = useState({});

  const getSDDetails = (detailFromChild) => {
    setSubDivisionDetails(detailFromChild);
  }

  return (
    <>
      <main className={styles.mainContainer}>
        <InputForm onDataUpdate={getSDDetails}/>
        <OutputForm data={subDivisionDetails}/>
      </main>
    </>
  )
}

export default Report;