import { useEffect, useState } from 'react';
import axios from 'axios';

import BarDiagram from '../components/BarDiagram';
import styles from '../css/Dashboard.module.css';

const Dashboard = () => {
  const [allSubDivisionNames, setAllSubDivisionNames] = useState([]);

  const [SD1, setSD1] = useState('');
  const [SD2, setSD2] = useState('');
  const [year, setYear] = useState('');
  const [param, setParam] = useState('');

  useEffect(() => {
    const getAllSubDivisionNames = async () => {
      try {
        const response = await axios.get(
          'https://apdcl-site-server.onrender.com/api/v1/subdivision/getnames',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        const data = response.data.subDivisionNames;
        const uniqueData = [...new Set(data)];
        setAllSubDivisionNames(uniqueData);
      } catch (error) {
        console.log(error.message);
      }
    }

    getAllSubDivisionNames();
  }, [])

  return (
    <section className={styles.dashboardSection}>
      <h1 className={styles.headingText}>Comparison between yearly parameters of various sub-division</h1>
      <div className={styles.mainContainer}>
        <form className={styles.container}>
          <label>Select any two sub-divisions</label>
          <div className={styles.horizontalInputs}>
            <input
              list='subDivisionOptions1'
              type="text"
              value={SD1}
              onChange={(e) => setSD1(e.target.value)}
            />
            <datalist id="subDivisionOptions1">
              {
                allSubDivisionNames.map((subDivisionName, idx) => (
                  <option key={idx} value={subDivisionName}>{subDivisionName}</option>
                ))
              }
            </datalist>

            <input
              list='subDivisionOptions2'
              type="text"
              value={SD2}
              onChange={(e) => setSD2(e.target.value)}
            />
            <datalist id="subDivisionOptions2">
              {
                allSubDivisionNames.map((subDivisionName, idx) => (
                  <option key={idx} value={subDivisionName}>{subDivisionName}</option>
                ))
              }
            </datalist>
          </div>
          <label>Year</label>
          <input
            list="yearOptions"
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <datalist id="yearOptions">
            <option value="2018-19">2018-19</option>
            <option value="2019-20">2019-20</option>
            <option value="2020-21">2020-21</option>
          </datalist>

          <label>Select any of the 4 reporting parameters</label>
          <input
            list='paramOptions'
            type='text'
            value={param}
            onChange={(e) => setParam(e.target.value)}
          />
          <datalist id='paramOptions'>
            <option value="BE">Billing Efficiency</option>
            <option value="ABR">Average Billing Rate</option>
            <option value="AT&C">AT&C Losses</option>
            <option value="ARR">Average Revenue Realisation</option>
          </datalist>

          <button className={styles.btn} type='submit'>
            Submit
          </button>
        </form>

        <main className={styles.diagramContainer}>
          <BarDiagram />
        </main>

      </div>
    </section>
  )
}

export default Dashboard;