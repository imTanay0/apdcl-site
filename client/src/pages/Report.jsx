import { useState } from "react";
import InputForm from "../components/InputForm"
import OutputForm from "../components/OutputForm"

import styles from "../css/Dashboard.module.css";

const Report = () => {
  const [subDivisionDetails, setSubDivisionDetails] = useState({});

  const getSDDetails = (detailFromChild) => {
    setSubDivisionDetails(detailFromChild);
  }

  return (
    <>
      <main className={styles.mainContainer}>
        <InputForm onDataUpdate={getSDDetails}/>
        <OutputForm />
      </main>
    </>
  )
}

export default Report;