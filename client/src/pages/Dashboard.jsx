import { useEffect, useState } from 'react';
import axios from 'axios';

import BarDiagram from '../components/BarDiagram';
import styles from '../css/Dashboard.module.css';

const Dashboard = () => {
  const [allSubDivisionNames, setAllSubDivisionNames] = useState([]);

  const [subDivisionName, setSubDivisionName] = useState('');
  const [financialYear, setFinancialYear] = useState('');
  const [param, setParam] = useState('');

  const [data, setData] = useState({
    subDivisionName: '',
    financialYear: '',
    param: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setData({
      subDivisionName,
      financialYear,
      param: param
    });

    setTimeout(() => {
      setIsSubmitted(true);
    }, 200);
  }

  return (
    <section className={styles.dashboardSection}>
      <h1 className={styles.headingText}>Comparison between parameters of a sub-division in a financial year</h1>
      <div className={styles.mainContainer}>
        <form className={styles.container} onSubmit={handleSubmit}>
          <label>Sub-Divisions</label>
          <input
            list='subDivisionOptions1'
            type="text"
            placeholder='Enter a Sub-Division'
            value={subDivisionName}
            onChange={(e) => setSubDivisionName(e.target.value)}
            required
          />
          <datalist id="subDivisionOptions1">
            {
              allSubDivisionNames.map((subDivisionName, idx) => (
                <option key={idx} value={subDivisionName}>{subDivisionName}</option>
              ))
            }
          </datalist>

          <label>Financial year</label>
          <input
            placeholder='eg, 2019-20'
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            required
          />

          <label>Select any of the 9 reporting parameters</label>
          <input
            list='paramOptions'
            type='text'
            value={param}
            onChange={(e) => setParam(e.target.value)}
            required
          />
          <datalist id='paramOptions'>
            <option value="MUinjection">MU Injection</option>
            <option value="unitBilled">Unit Billed</option>
            <option value="totalCollectionIRCA">Total Collection including IRCA</option>
            <option value="currentDemandIRCA">Current Demand including IRCA</option>
            <option value="CE">Collection Efficiency</option>
            <option value="BE">Billing Efficiency</option>
            <option value="ABR">Average Billing Rate</option>
            <option value="AT_CLosses">AT&C Losses</option>
            <option value="ARR">Average Revenue Realisation</option>
          </datalist>

          <button className={styles.btn} type='submit'>
            Submit
          </button>
        </form>
        {
          !isSubmitted
            ? (
              <main className={styles.diagramContainer}>
                <p>Fill up and submit the form with correct data</p>
              </main>
            )
            : (
              <main className={styles.diagramContainer}>
                <BarDiagram inputData={data} />
              </main>
            )
        }
      </div>
    </section>
  )
}

export default Dashboard;