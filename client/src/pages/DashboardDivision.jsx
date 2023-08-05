import { useEffect, useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import DivisionChart from '../components/DivisionChart';
import styles from '../css/DashboardDivision.module.css';

const DashboardDivision = () => {
  const [allCircleNames, setAllCircleNames] = useState([]);
  const [allbDivisionNames, setAllDivisionNames] = useState([]);
  const [circleName, setCircleName] = useState('');
  const [divisionName, setDivisionName] = useState('');
  const [financialYear, setFinancialYear] = useState('');
  const [param, setParam] = useState('');

  // const [data, setData] = useState({
  //   divisionName: '',
  //   financialYear: '',
  //   param: ''
  // });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const getAllCircleNames = async () => {
      try {
        const response = await fetch(
          'https://apdcl-site-server.onrender.com/api/v1/circle/getAllNames',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        const result = await response.json();

        if (result.success) {
          const allCircleNamesDuplicate = result.circleNames;
          const uniqueAllCircleNames = [...new Set(allCircleNamesDuplicate)];
          setAllCircleNames(uniqueAllCircleNames);
        }

      } catch (error) {
        alert(error.message);
      }
    }

    const getAllDivisionNames = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/division/getallnames?circleName=${circleName}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        const data = response.data.divisionNames;
        const uniqueData = [...new Set(data)];
        setAllDivisionNames(uniqueData);
      } catch (error) {
        console.log(error.message);
      }
    }

    getAllCircleNames();
    getAllDivisionNames();
  }, [circleName]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // setData({
    //   divisionName,
    //   financialYear,
    //   param: param
    // });

    setTimeout(() => {
      setIsSubmitted(true);
    }, 100);
  }

  const downloadPDF = async () => {
    try {
      setIsLoading(true);
      const capture = document.getElementById('downloadSection');
      const formBtn = document.getElementById('formBtn');

      formBtn.style.display = 'none';

      // Capture the canvas without scaling
      const canvas = await html2canvas(capture);

      const imgData = canvas.toDataURL('image/jpeg', 0.8); // Adjust the image quality here (0.0 to 1.0)

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const contentWidth = doc.internal.pageSize.getWidth();
      const contentHeight = doc.internal.pageSize.getHeight();

      // Add the border box
      doc.setDrawColor(0); // Black color
      doc.setLineWidth(1); // 1px width
      doc.rect(10, 10, contentWidth - 20, contentHeight - 20); // Draw the border box

      doc.addImage(imgData, 'JPEG', 10, 10, contentWidth - 20, contentHeight - 20); // Adjust image position to fit inside the border

      doc.save('Division_Yearly_Graph.pdf');

    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsLoading(false);
      const formBtn = document.getElementById('formBtn');

      formBtn.style.display = 'block';
    }
  };

  return (
    <section className={styles.DashboardDivisionSection}>
      <div id='downloadSection' className={styles.downloadSection}>
        <h1 className={styles.headingText}>Comparison between parameters of a division in a financial year</h1>
        <div className={styles.mainContainer}>
          <form className={styles.container} onSubmit={handleSubmit}>
            <label htmlFor='circle'>Circle</label>
            <input
              id='circle'
              list='circleOptions'
              type="text"
              placeholder='Select a Circle'
              value={circleName}
              onChange={(e) => setCircleName(e.target.value)}
              required
            />
            <datalist id='circleOptions'>
              {allCircleNames.map((name, idx) => (
                <option key={idx} value={name}>{name}</option>
              ))}
            </datalist>

            <label>Divisions</label>
            <input
              list='subDivisionOptions1'
              type="text"
              placeholder='Select a Division'
              value={divisionName}
              onChange={(e) => setDivisionName(e.target.value)}
              required
            />
            <datalist id="subDivisionOptions1">
              {
                allbDivisionNames.map((divisionName, idx) => (
                  <option key={idx} value={divisionName}>{divisionName}</option>
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
              <option value="totalCollection">Total Collection including IRCA</option>
              <option value="currentDemand">Current Demand including IRCA</option>
              <option value="CE">Collection Efficiency</option>
              <option value="BE">Billing Efficiency</option>
              <option value="ABR">Average Billing Rate</option>
              <option value="AT_CLosses">AT&C Losses</option>
              <option value="ARR">Average Revenue Realisation</option>
            </datalist>

            <button
              id='formBtn'
              className={styles.btn}
              type='submit'
              onClick={() => setTimeout(() => {
                window.scrollBy(0, 680);
              }, 200)}
            >
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
                  <DivisionChart
                    circleName={circleName}
                    divisionName={divisionName}
                    financialYear={financialYear}
                    param={param}
                  />
                </main>
              )
          }
        </div>
      </div>
      {
        isSubmitted ? (
          <div className={styles.btnContainer}>
            <button className={styles.btnPDF} onClick={downloadPDF} disabled={!(isLoading === false)}>
              {
                isLoading ? (
                  <span>Downloading...</span>
                ) : (
                  <span>Download</span>
                )
              }
            </button>
          </div>
        ) : null
      }
    </section>
  )
}

export default DashboardDivision;