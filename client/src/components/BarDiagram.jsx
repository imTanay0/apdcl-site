import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import styles from '../css/barDiagram.module.css';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

// eslint-disable-next-line react/prop-types
const BarDiagram = ({ inputData }) => {
  const [SD1Details, setSD1Details] = useState({});
  const [SD2Details, setSD2Details] = useState({});

  useEffect(() => {

    const getYearlyPerformanceDetail1 = async () => {

      try {
        const res = await axios.get(
          // eslint-disable-next-line react/prop-types
          `https://apdcl-site-server.onrender.com/api/v1/yearlyPerformance/getdetail?subDivisionName=${inputData.SD1}&year=${inputData.year}`,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )

        const data = res.data.yearlyPerformance;

        setSD1Details(data);
      } catch (error) {
        console.log(error.message);
        // alert('Error. Check the form details again')
      }
    }

    const getYearlyPerformanceDetail2 = async () => {

      try {
        const res = await axios.get(
          // eslint-disable-next-line react/prop-types
          `https://apdcl-site-server.onrender.com/api/v1/yearlyPerformance/getdetail?subDivisionName=${inputData.SD2}&year=${inputData.year}`,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )

        const data = res.data.yearlyPerformance;

        setSD2Details(data);
      } catch (error) {
        console.log(error.message);
        // alert('Error. Check the form details again')
      }
    }

    getYearlyPerformanceDetail1();
    getYearlyPerformanceDetail2();

  }, [inputData])

  // eslint-disable-next-line react/prop-types
  const label1 = inputData.SD1;
  // eslint-disable-next-line react/prop-types
  const param1 = SD1Details[inputData.param];
  // eslint-disable-next-line react/prop-types
  const label2 = inputData.SD2
  // eslint-disable-next-line react/prop-types
  const param2 = SD2Details[inputData.param];

  const data = {
    labels: ['Sub-Division'],
    datasets: [
      {
        label: label1,
        data: [param1],
        backgroundColor: 'aqua',
        borderColor: 'black',
        borderWidth: 1,
      },
      {

        label: label2,
        data: [param2],
        backgroundColor: 'pink',
        borderColor: 'black',
        borderWidth: 1,
      }
    ]
  }

  const options = {}

  return (
    <div className={styles.diagramContainer}>
      <Bar
        data={data}
        options={options}
      />
    </div>
  )
}

export default BarDiagram