import React from 'react';
import styles from '../css/Content.module.css';

const Content = () => {
  return (
    <main>
      <div className={styles.cont}>
        <div className={styles.contentBox}>
          <h2>About APDCL</h2>
          <p>
            The Assam Power Distribution Company Limited (APDCL) is a public sector undertaking that is responsible for electricity distribution in the state of Assam, India. APDCL strives to ensure the reliable supply of electricity to its consumers, covering both urban and rural areas.
          </p>
          <p>
            With a commitment to providing quality power supply, APDCL focuses on modernizing the distribution network, enhancing customer services, and promoting energy efficiency. Through its various initiatives, APDCL aims to meet the growing electricity demands of Assam and contribute to the socio-economic development of the region.
          </p>
        </div>

        <div className={styles.description}>
          <div className={styles.dashboardBox}>
            <h2 className={styles.dashboardHeading}>
              Explore the APDCL Performance Reporting Platform
            </h2>
            <p className={styles.dashboardContent}>
              We are pleased to provide you with a comprehensive tool to track and monitor your performance. The platform will allow you to enter your input parameters and generate real-time status reports, enabling you to make data-driven decisions and optimize your performance.
            </p>
            <div className={styles.btnContainer}>
              <button className={styles.startButton}>Start</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Content;
