// import Navbar from "../components/Navbar"
import InputForm from "../components/InputForm"
import OutputForm from "../components/OutputForm"

import styles from "../css/Dashboard.module.css";

const Dashboard = () => {
  return (
    <>
      {/* <Navbar /> */}
      <main className={styles.mainContainer}>
        <InputForm />
        <OutputForm />
      </main>
    </>
  )
}

export default Dashboard;