import { calcBillingEfficiency, calcAT_CLossesIRCA, calcAvgBillingRate, calcARR } from '../utils/outputParameters';

import styles from '../css/outputForm.module.css';

// eslint-disable-next-line react/prop-types
const OutputForm = ({ data }) => {
  const subDivisionDetails = (data || {});

  // Output Parameters
  const billingEff = calcBillingEfficiency(subDivisionDetails.unitBilled, subDivisionDetails.MUinjection);
  const AT_CLossesIRCA = calcAT_CLossesIRCA(subDivisionDetails.totalCollectionIRCA, subDivisionDetails.currentDemandIRCA, billingEff);
  const avgBillingRate = calcAvgBillingRate(subDivisionDetails.currentDemandIRCA, subDivisionDetails.unitBilled);
  const ARR = calcARR(subDivisionDetails.totalCollectionIRCA, subDivisionDetails.MUinjection);

  return (
    <>
      <h2>Report</h2>
      <div className={styles.container}>
        {!subDivisionDetails.MUinjection ? (
          <p>Fill up and submit the above form with correct data to generate the report</p>
        ) : (
          <div>
            <label>MU injection</label>
            <input type="text" value={subDivisionDetails.MUinjection} readOnly />

            <label>Unit billed</label>
            <input type="text" value={subDivisionDetails.unitBilled} readOnly />

            <label>Number of consumers</label>
            <input type="text" value={subDivisionDetails.noOfConsumers} readOnly />

            <label>Current demand IRCA</label>
            <input type="text" value={subDivisionDetails.currentDemandIRCA} readOnly />

            <label>Total collection IRCA</label>
            <input type="text" value={subDivisionDetails.totalCollectionIRCA} readOnly />

            <label>Number of bills served</label>
            <input type="text" value={subDivisionDetails.noOfBillsServed} readOnly />

            <label>Total Arrear</label>
            <input type="text" value={subDivisionDetails.totalArrear} readOnly />

            <label>Billing efficiency</label>
            <input type="text" value={parseInt(billingEff * 100) + '%'} readOnly />

            <label>AT & C losses including IRCA</label>
            <input type="text" value={parseInt(AT_CLossesIRCA * 100) + '%'} readOnly />

            <label>Average billing rate</label>
            <input type="text" value={avgBillingRate} readOnly />

            <label>Average revenue realisation</label>
            <input type="text" value={ARR} readOnly />
          </div>
        )}
      </div>
    </>
  );
};

export default OutputForm;
