import { useEffect, useState } from "react";
import axios from "axios";

import styles from "../css/inputForm.module.css";

// eslint-disable-next-line react/prop-types
const InputForm = ({ onDataUpdate }) => {
  const [allCircleNames, setAllCircleNames] = useState([]);
  // const [allDivisionNames, setAllDivisionNames] = useState([]);
  const [allSubDivisionNames, setAllSubDivisionNames] = useState([]);

  const [circleName, setCircleName] = useState('');
  const [divisionName, setDivisionName] = useState('');
  const [subDivisionName, setSubDivisionName] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    const getAllCircleNames = async () => {
      try {
        const response = await axios.get('https://apdcl-site-server.onrender.com/api/v1/circle/getAllNames',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        const data = response.data.circleNames;

        setAllCircleNames(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    // const getAllDivisionNames = async () => {
    //   try {
    //     const response = await axios.get(`https://apdcl-site-server.onrender.com/api/v1/division/getallnames?circleName=${circleName}`,
    //       {
    //         headers: {
    //           'Content-Type': 'applicationn/json',
    //         }
    //       }
    //     )
    //     const data = response.data.divisionNames;

    //     setAllDivisionNames(data);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }

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

    getAllCircleNames();
    // getAllDivisionNames();
    getAllSubDivisionNames();
  }, [circleName, divisionName])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://apdcl-site-server.onrender.com/api/v1/subdivision/getdetails?subDivisionName=${subDivisionName}&year=${year}&month=${month}`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )

      const data = response.data.subDivision;

      onDataUpdate(data);
      setTimeout(() => {
        window.scrollBy(0, 700);
      }, 200)
    } catch (error) {
      console.log(error.message);
      alert("Error. Please check submit the form the valid input.")
    } finally {
      // setAllDivisionNames([]);
      // setAllSubDivisionNames([]);
      // setCircleName('');
      // setDivisionName('');
      // setSubDivisionName('');
      // setYear('');
      // setMonth('');
    }
  }

  return (
    <form className={styles.inputFormContainer} onSubmit={handleSubmit}>
      <label htmlFor="circle">Circle</label>
      <input
        list="circleOptions"
        placeholder="Select a circle"
        required
        value={circleName}
        onChange={(e) => setCircleName(e.target.value)}
      />
      <datalist id='circleOptions'>
        {allCircleNames.map((circleName, idx) => (
          <option value={circleName} key={idx}>{circleName}</option>
        ))}
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

      <label>Year</label>
      <input
        list="yearOptions"
        placeholder="Select a year"
        required
        value={year}
        onChange={(e) => setYear(e.target.value)}
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
        value={month}
        onChange={(e) => setMonth(e.target.value)}
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

      <button className={styles.btn} type='submit'>
        Submit
      </button>

    </form >
  )
}

export default InputForm