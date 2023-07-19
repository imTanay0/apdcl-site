// import Navbar from "../components/Navbar"
import InputForm from "../components/InputForm"
import OutputForm from "../components/OutputForm"

import styles from "../css/Contact.module.css";

const Contact = () => {
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

export default Contact