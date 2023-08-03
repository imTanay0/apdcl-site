import { useEffect, useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { pdf } from '@react-pdf/renderer';


import BarDiagram from '../components/BarDiagram';
import PDFDocument from '../documents/PdfDocument';

// import sortByMonthAndYear from './../utils/sortMonthlyYearly';
import styles from '../css/Dashboard.module.css';

const Dashboard = () => {
  const [allSubDivisionNames, setAllSubDivisionNames] = useState([]);
  // const [subDivisionYearlyDetails, setsubDivisionYearlyDetails] = useState([]);

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

    // const getYearlyPerformanceDetail = async () => {

    //   try {
    //     const res = await axios.get(
    //       `https://apdcl-site-server.onrender.com/api/v1/subdivision/yearlydetails?subDivisionName=${subDivisionName}&financialYear=${financialYear}`,
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //         }
    //       }
    //     )

    //     const data = res.data.updatedSubDivisions;
    //     const sortedData = data.sort(sortByMonthAndYear);

    //     setsubDivisionYearlyDetails(sortedData);

    //     setTimeout(() => {
    //       window.scrollBy(0, 700);
    //     }, 200)
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }
    // getYearlyPerformanceDetail();


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

      // Capture the canvas without scaling
      const canvas = await html2canvas(capture);

      const imgData = canvas.toDataURL('image/jpeg', 0.8); // Adjust the image quality here (0.0 to 1.0)

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      doc.addImage(imgData, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
      doc.save('Yearly_Report.pdf');

      setIsLoading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsLoading(false);
    }
  };

  // const downloadPDF = async () => {
  //   try {
  //     setIsLoading(true);

  //     // Generate the PDF content using the PDFDocument component
  //     const pdfContent = (
  //       <PDFDocument
  //         subDivisionName={subDivisionName}
  //         financialYear={financialYear}
  //         param={data.param}
  //       />
  //     );

  //     // Render the PDF content to a blob
  //     const blob = await pdf(pdfContent).toBlob();

  //     setIsLoading(false);

  //     // Create a download link and trigger the download

  //     setTimeout(() => {
  //       const downloadLink = document.createElement('a');
  //       downloadLink.href = URL.createObjectURL(blob);
  //       downloadLink.download = 'Yearly_Report.pdf';
  //       downloadLink.click();
  //     }, 100);

  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //     setIsLoading(false);
  //   }
  // };


  return (
    <section id='downloadSection' className={styles.dashboardSection}>
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
                <BarDiagram subDivisionName={subDivisionName} financialYear={financialYear} param={data.param}/>

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
              </main>
            )
        }
      </div>
      {/* {
        isSubmitted && (
          <PDFDocument
            subDivisionName={subDivisionName}
            financialYear={financialYear}
            param={data.param}
            data={subDivisionYearlyDetails} // Pass the fetched data here
          />
        )
      } */}
    </section>
  )
}

export default Dashboard;