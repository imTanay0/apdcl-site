import styles from '../css/outputForm.module.css';

// eslint-disable-next-line react/prop-types
const OutputForm = ({ data }) => {
  const subDivisionDetails = (data || {});

  return (
    <>
      <h2>Report</h2>
      <div className={styles.container}>
        {!subDivisionDetails.MUinjection ? (
          <p>Fill up and submit the above form to check the report.</p>
        ) : (
          <div>
            <label>MU injection</label>
            <input type="text" value={subDivisionDetails.MUinjection} />

            <label>Unit billed</label>
            <input type="text" value={subDivisionDetails.unitBilled} />

            <label>Number of consumers</label>
            <input type="text" value={subDivisionDetails.noOfConsumers} />

            <label>Current demand IRCA</label>
            <input type="text" value={subDivisionDetails.currentDemandIRCA} />

            <label>Total collection IRCA</label>
            <input type="text" value={subDivisionDetails.totalCollectionIRCA} />

            <label>Number of bills served</label>
            <input type="text" value={subDivisionDetails.noOfBillsServed} />

            <label>Total arrear</label>
            <input type="text" value={subDivisionDetails.totalArrear} />

            <label>Billing efficiency</label>
            <input type="text" />

            <label>AT & C losses including IRCA</label>
            <input type="text" />

            <label>Average billing rate</label>
            <input type="text" />

            <label>Average revenue realisation</label>
            <input type="text" />
          </div>
        )}
      </div>
    </>
  );
};

export default OutputForm;
