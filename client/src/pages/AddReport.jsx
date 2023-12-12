import { useEffect, useState } from 'react';
import axios from 'axios';

import { calcBillingEfficiency, calcAT_CLossesIRCA, calcAvgBillingRate, calcARR } from '../utils/outputParameters';

import styles from '../css/AddReport.module.css';

const AddReport = () => {
  const [name, setName] = useState('');
  const [MUinjection, setMUinjection] = useState(0);
  const [unitBilled, setUnitBilled] = useState(0);
  const [noOfConsumers, setNoOfConsumers] = useState(0);
  const [noOfBillsServed, setNoOfBillsServed] = useState(0);
  const [totalCollectionIRCA, setTotalCollectionIRCA] = useState(0);
  const [currentDemandIRCA, setCurrentDemandIRCA] = useState(0);
  const [totalArrear, setTotalArrear] = useState(0);
  const [date, setDate] = useState({
    month: '',
    year: 0,
  });
  const [divisionName, setDivisionName] = useState('');

  const [allSubDivisionNames, setAllSubDivisionNames] = useState([]);
  const [subDivisionDetail, setSubDivisionDetail] = useState();

  const [outPutParams, setOutPutParams] = useState({
    billingEff: 0,
    AT_CLossesIRCA: 0,
    avgBillingRate: 0,
    ARR: 0
  });

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
        'https://apdcl-site-server.onrender.com/api/v1/subdivision/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            MUinjection,
            unitBilled,
            noOfConsumers,
            noOfBillsServed,
            totalCollectionIRCA,
            currentDemandIRCA,
            totalArrear,
            date,
            divisionName
          })
        }
      )

      const result = await response.json();

      if (result.success) {
        alert('Sub-Division Added Successfully.');
        setSubDivisionDetail(result.subDivision);
        setOutPutParams({
          billingEff: calcBillingEfficiency(subDivisionDetail.unitBilled, subDivisionDetail.MUinjection),
          AT_CLossesIRCA: calcAT_CLossesIRCA(subDivisionDetail.totalCollectionIRCA, subDivisionDetail.currentDemandIRCA, outPutParams.billingEff),
          avgBillingRate: calcAvgBillingRate(subDivisionDetail.currentDemandIRCA, subDivisionDetail.unitBilled),
          ARR: calcARR(subDivisionDetail.totalCollectionIRCA, subDivisionDetail.MUinjection),
        })

        setTimeout(() => {
          window.scrollBy(0, 650);
        }, 150);
      } else {
        alert(`Failed to Submit the Form: ${result.message}`)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <section className={styles.addReportSection}>
      <h1 className={styles.headingText}>Add Details of a Sub-Division to the Database</h1>
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <datalist id="subDivisionOptions">
          {
            allSubDivisionNames.map((subDivisionName, idx) => (
              <option value={subDivisionName} key={idx}>{subDivisionName}</option>
            ))
          }
        </datalist>

        <label>Year</label>
        <input
          type='number'
          placeholder="Enter a year"
          value={date.year === 0 ? '' : date.year}
          onChange={(e) => setDate({ ...date, year: e.target.value })}
          required
        />

        <label>Month</label>
        <input
          list="monthOptions"
          placeholder="Select a month"
          value={date.month}
          onChange={(e) => setDate({ ...date, month: e.target.value })}
          required
        />
        <datalist id="monthOptions">
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </datalist>

        <label htmlFor="MUinjection">MU Injection</label>
        <input
          id='MUinjection'
          type="number"
          value={MUinjection === 0 ? '' : MUinjection}
          onChange={(e) => setMUinjection(e.target.value)}
          required
        />

        <label htmlFor="unitBilled">Unit Billed</label>
        <input
          id='unitBilled'
          type="number"
          value={unitBilled === 0 ? '' : unitBilled}
          onChange={(e) => setUnitBilled(e.target.value)}
          required
        />

        <label htmlFor="noOfConsumers">Number of Consumers</label>
        <input type="number" id="noOfConsumers" value={noOfConsumers === 0 ? '' : noOfConsumers} onChange={(e) => setNoOfConsumers(e.target.value)}
          required
        />

        <label htmlFor="noOfBillsServed">Number of Bills Served</label>
        <input id='noOfBillsServed' type="number" value={noOfBillsServed === 0 ? '' : noOfBillsServed} onChange={(e) => setNoOfBillsServed(e.target.value)}
          required
        />

        <label htmlFor="totalCollectionIRCA">Total Collection including IRCA</label>
        <input
          id='totalCollectionIRCA'
          type='number'
          value={totalCollectionIRCA === 0 ? '' : totalCollectionIRCA}
          onChange={(e) => setTotalCollectionIRCA(e.target.value)}
          required
        />

        <label htmlFor="currentDemandIRCA">Current Demand including IRCA</label>
        <input
          id='currentDemandIRCA'
          type="number"
          value={currentDemandIRCA === 0 ? '' : currentDemandIRCA}
          onChange={(e) => setCurrentDemandIRCA(e.target.value)}
          required
        />

        <label htmlFor="totalArrear">Total Arrear</label>
        <input
          id='totalArrear'
          type='number'
          value={totalArrear === 0 ? '' : totalArrear}
          onChange={(e) => setTotalArrear(e.target.value)}
          required
        />

        <button className={styles.btn} type='submit'>
          Submit
        </button>
      </form>

      {/* <div className={styles.formContainer}>
        {
          !subDivisionDetail
            ? (
              <p>Fill up and submit the above form with correct data to generate the report</p>
            )
            : (
              <div>
                <label>Billing Efficiency</label>
                <input type="text" readOnly value={parseInt(outPutParams.billingEff * 100) + '%'} />

                <label>AT&C Losses including IRCA</label>
                <input type="text" readOnly value={parseInt(outPutParams.AT_CLossesIRCA * 100) + '%'} />

                <label>Average Billing Rate</label>
                <input type="text" readOnly value={outPutParams.avgBillingRate} />

                <label>Average Revenue Realisation</label>
                <input type="text" readOnly value={outPutParams.ARR} />
              </div>
            )
        }
      </div> */}
    </section>
  )
}

export default AddReport;
