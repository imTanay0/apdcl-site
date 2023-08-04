/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from '../css/options.module.css';

const Options = ({ label, circle, division, subDivision, link }) => {
  return (
    <section className={styles.optionsSection}>
      <div className={styles.optionsContainer}>
        {circle &&
        <div className={styles.circleDiv}>
          <p>{`Click the button to check ${label} of Circle`}</p>
          <Link to={`/${link}`} className={styles.btnContainer}><button className={styles.btn}>Explore Now</button></Link>
        </div>}

        {division &&
        <div className={styles.divisionDiv}>
          <p>{`Click the button to check ${label} of Division`}</p>
          <Link to={`/${link}-division`} className={styles.btnContainer}>
            <button className={styles.btn}>Explore Now</button>
          </Link>
        </div>}

        {subDivision &&
        <div className={styles.subDivisionDiv}>
          <p>{`Click the button to check ${label} of Sub-Division`}</p>
          <Link to={`/${link}-subdivision`} className={styles.btnContainer}>
            <button className={styles.btn}>Explore Now</button>
          </Link>
        </div>}
      </div>
    </section>
  )
}

export default Options