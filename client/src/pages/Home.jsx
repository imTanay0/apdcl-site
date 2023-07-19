import styles from "../css/Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <nav className={styles.navbar}>
        <div className={styles.heady}>
          <img
            src="https://www.apdcl.org/website/img/apdcl_logo.b56b6858.png"
            alt="APDCL Logo"
            className={styles.logoap}
          />
          <div className={styles.headerContent}>
            <h1 className={styles.fir}>অসম শক্তি বিতৰণ কোম্পানী লিমিটেড</h1>
            <h1 className={styles.sec}>ASSAM POWER DISTRIBUTION COMPANY LIMITED</h1>
          </div>
          <div className={styles.customerSupport}>
            <div className={styles.supportDetails}>
              <svg
                viewBox="0 0 16 16"
                width="1em"
                height="1em"
                focusable="false"
                role="img"
                alt="icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-headphones b-icon bi-text-danger"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3a5 5 0 0 0-5 5v4.5H2V8a6 6 0 1 1 12 0v4.5h-1V8a5 5 0 0 0-5-5z"
                ></path>
                <path
                  d="M11 10a1 1 0 0 1 1-1h2v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3zm-6 0a1 1 0 0 0-1-1H2v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-3z"
                ></path>
              </svg>
              <span> 24x7 Customer Support (1912)</span>
              <t></t>
            </div>
            <div className={styles.supportEmail}>
              <svg
                viewBox="0 0 16 16"
                width="1em"
                height="1em"
                focusable="false"
                role="img"
                alt="icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-envelope b-icon bi-text-danger"
              >
                <path
                  fillRule="evenodd"
                  d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"
                ></path>
                <path
                  d="M.05 3.555C.017 3.698 0 3.847 0 4v.697l5.803 3.546L0 11.801V12c0 .306.069.596.192.856l6.57-4.027L8 9.586l1.239-.757 6.57 4.027c.122-.26.191-.55.191-.856v-.2l-5.803-3.557L16 4.697V4c0-.153-.017-.302-.05-.445L8 8.414.05 3.555z"
                ></path>
              </svg>
              <a href="mailto:support@apdcl.org">support@apdcl.org</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Home;
