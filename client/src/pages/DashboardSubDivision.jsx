import { useEffect, useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import BarDiagramSubDivision from '../components/BarDiagramSubDivision';
import styles from '../css/DashboardSubDivision.module.css';

const DashboardSubDivision = () => {
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
  const [isLoading, setIsLoading] = useState(false);


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
  }, [subDivisionName, financialYear]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setData({
      subDivisionName,
      financialYear,
      param: param
    });

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

      doc.save('Sub-Division_Yearly_Graph.pdf');

    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsLoading(false);
      const formBtn = document.getElementById('formBtn');

      formBtn.style.display = 'block';
    }
  };

  return (
    <section className={styles.DashboardSubDivisionSection}>
      <div id='downloadSection' className={styles.downloadSection}>
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
                  <BarDiagramSubDivision subDivisionName={subDivisionName} financialYear={financialYear} param={data.param} />
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

export default DashboardSubDivision;