import styles from "../css/inputForm.module.css"

const InputForm = () => {
  return (
    <form className={styles.inputFormContainer}>
      <label htmlFor="circle">Circle</label>
      <input
        list="circleOptions"
        placeholder="Select a circle"
        required
        onChange={(e) => console.log(e.target.value)}
      />
      <datalist id='circleOptions'>
        <option value="Nagaon">Nagaon</option>
        <option value="Tinsukia">Tinsukia</option>
      </datalist>

      <label>Division</label>
      <input
        list="divisionOptions"
        placeholder="Select a division"
        required
        onChange={(e) => console.log(e.target.value)}
      />
      <datalist id="divisionOptions">
        <option value="Nagaon Division-I">Nagaon Division-I</option>
        <option value="Nagaon Division-II">Nagaon Division-II</option>
        <option value="Nagaon Division-III">Nagaon Division-III</option>
      </datalist>

      <label>Division</label>
      <input
        list="subDivisionOptions"
        placeholder="Select a sub-division"
        required
        onChange={(e) => console.log(e.target.value)}
      />
      <datalist id="subDivisionOptions">
        <option value="Nagaon S/D-I">Nagaon S/D-I</option>
        <option value="Nagaon S/D-II">Nagaon S/D-II</option>
        <option value="Nagaon S/D-III">Nagaon S/D-III</option>
      </datalist>

      <label>Year</label>
      <input 
        list="yearOptions"
        placeholder="Select a year"
        required
        onChange={(e) => console.log(e.target.value)}
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
        onChange={(e) => console.log(e.target.value)}
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

      <button className={styles.btn}>
        Submit
      </button>
      
    </form>
  )
}

export default InputForm