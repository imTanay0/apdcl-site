import { useState } from 'react';
import styles from '../css/perfInputForm.module.css';

const PerfInputForm = () => {
  const [MUInjection, setMUInjection] = useState(0);

  const checkNumber = (e) => {
    const inputVal = e.target.value;

    if (inputVal >= 0) {
      setMUInjection(inputVal);
    } else {
      setMUInjection(0);
    }
  }
  
  return (
    <>
      <form className={styles.container}>
        <label htmlFor="circle">Circle</label>
        <input
          list="circleOptions"
          placeholder="Select a circle"
          required
        />
        <datalist id='circleOptions'>
        </datalist>

        <label>Division</label>
        <input
          list="divisionOptions"
          placeholder="Select a division"
          required
        />
        <datalist id="divisionOptions">
        </datalist>

        <label>Sub Division</label>
        <input
          list="subDivisionOptions"
          placeholder="Select a sub-division"
          required
        />
        <datalist id="subDivisionOptions">
        </datalist>

        <label>Year</label>
        <input
          list="yearOptions"
          placeholder="Select a year"
          required
        />
        <datalist id="yearOptions">
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
        </datalist>

        <label>Month</label>
        <input
          list="monthOptions"
          placeholder="Select a month"
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

        <label htmlFor="MUInjection">MU Injection</label>
        <input 
          id='MUInjection'
          type="text" 
          value={MUInjection === 0 ? '' : MUInjection}
          onChange={checkNumber}
        />

        <label htmlFor="currentDemandIRCA">Current Demand IRCA</label>
        <input 
          id='currentDemandIRCA'
          type="text"
          
        />

        <label htmlFor="unitBilled">Unit Billed</label>
        <input 
          id='unitBilled'
          type="text" 
          
        />

        <button className={styles.btn} type='submit'>
          Submit
        </button>
      </form>
    </>
  )
}

export default PerfInputForm;