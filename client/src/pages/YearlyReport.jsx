import { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import styles from '../css/YearlyReport.module.css';

const YearlyReport = () => {
  const [allSubDivisionNames, setAllSubDivisionNames] = useState([]);

  const [divisionName, setDivisionName] = useState('');
  const [subDivisionName, setSubDivisionName] = useState('');
  const [financialYear, setFinancialYear] = useState('');

  const [subDivisionYearly, setSubDivisionYearly] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllSubDivisionNames = async () => {
      try {
        const response = await axios.get(`https://apdcl-site-server.onrender.com/api/v1/subdivision/getallnames?divisionName=${divisionName}`,
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
  }, [divisionName])

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://apdcl-site-server.onrender.com/api/v1/subdivision/getyearlysum?subDivisionName=${subDivisionName}&financialYear=${financialYear}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const result = await response.json();

      if (result.success) {
        setSubDivisionYearly(result.updatedYearlySum);

        setTimeout(() => {
          window.scrollBy(0, 650);
        }, 150);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

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

      doc.save('Yearly_Report.pdf');

    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsLoading(false);
      const formBtn = document.getElementById('formBtn');
      formBtn.style.display = 'block';
    }
  };

  return (
    <section className={styles.YearlyReportSection}>
      <div id='downloadSection' className={styles.downloadSection}>
        <h1 className={styles.headingText}>Input Data</h1>
        <form className={styles.formContainer} onSubmit={handleFormSubmit}>
          <label htmlFor="circle">Circle</label>
          <input
            list="circleOptions"
            placeholder="Select a circle"
            required
          />
          <datalist id='circleOptions'>
            <option value="Nagaon">Nagaon</option>
          </datalist>

          <label>Division</label>
          <input
            list="divisionOptions"
            placeholder="Select a division"
            required
            value={divisionName}
            onChange={(e) => setDivisionName(e.target.value)}
          />
          <datalist id="divisionOptions">
            <option value="Nagaon Division-I">Nagaon Division-I</option>
            <option value="Nagaon Division-II">Nagaon Division-II</option>
            <option value="HED">HED</option>
          </datalist>

          <label>Sub Division</label>
          <input
            list="subDivisionOptions"
            placeholder="Select a sub-division"
            required
            value={subDivisionName}
            onChange={(e) => setSubDivisionName(e.target.value)}
          />
          <datalist id="subDivisionOptions">
            {
              allSubDivisionNames.map((subDivisionName, idx) => (
                <option value={subDivisionName} key={idx}>{subDivisionName}</option>
              ))
            }
          </datalist>

          <label>Financial Year</label>
          <input
            type='text'
            placeholder="eg, 2020-21"
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            required
          />
          <button id='formBtn' className={styles.btn} type='submit'>
            Submit
          </button>
        </form>

        <h1 className={styles.reportText}>Report</h1>
        <div className={styles.formContainer}>
          {!subDivisionYearly.MUinjection ? (
            <p>Please submit the form to retrieve the report for a specific sub-division within a designated financial year</p>
          ) : (
            <div>
              <label>MU Injection</label>
              <input type="text" value={subDivisionYearly.MUinjection} readOnly />

              <label>Unit Billed</label>
              <input type="text" value={subDivisionYearly.unitBilled} readOnly />

              <label>Current Demand including IRCA</label>
              <input type="text" value={subDivisionYearly.currentDemandIRCA} readOnly />

              <label>Total Collection including IRCA</label>
              <input type="text" value={subDivisionYearly.totalCollectionIRCA} readOnly />

              <label>Total Arrear</label>
              <input type="text" value={subDivisionYearly.totalArrear} readOnly />

              <label>Billing Efficiency</label>
              <input type="text" value={parseInt(subDivisionYearly.BE * 100) + '%'} readOnly />

              <label>Collection Efficiency</label>
              <input type="text" value={parseInt(subDivisionYearly.CE * 100) + '%'} readOnly />

              <label>AT&C Losses including IRCA</label>
              <input type="text" value={parseInt(subDivisionYearly.AT_CLosses * 100) + '%'} readOnly />

              <label>Average Billing Rate</label>
              <input type="text" value={subDivisionYearly.ABR} readOnly />

              <label>Average Revenue Realisation</label>
              <input type="text" value={subDivisionYearly.ARR} readOnly />
            </div>
          )}
        </div>
      </div>
      {subDivisionYearly.MUinjection &&
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
        </div>}
    </section>
  )
}

export default YearlyReport;