/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import sortByMonthAndYear from '../utils/sortMonthlyYearly';
import styles from '../css/barDiagram.module.css';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
)


const BarDiagram = ({ subDivisionName, financialYear, param }) => {
  const [subDivisionYearlyDetails, setsubDivisionYearlyDetails] = useState([]);

  useEffect(() => {
    const getYearlyPerformanceDetail = async () => {
      try {
        const res = await axios.get(
          `https://apdcl-site-server.onrender.com/api/v1/subdivision/yearlydetails?subDivisionName=${subDivisionName}&financialYear=${financialYear}`,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        const data = res.data.updatedSubDivisions;
        const sortedData = data.sort(sortByMonthAndYear);

        setsubDivisionYearlyDetails(sortedData);
      } catch (error) {
        console.log(error.message);
      }
    };

    getYearlyPerformanceDetail();
  }, [subDivisionName, financialYear]);

  const months = subDivisionYearlyDetails.map(entry => `${entry.date.month}, ${entry.date.year}`);
  const arrValues = subDivisionYearlyDetails.map(entry => {
    if (param === 'totalCollection') {
      return entry.totalCollectionIRCA;
    } else if (param === 'currentDemand') {
      return entry.currentDemandIRCA;
    }
    return entry[param];
  });


  const chartData = {
    labels: months,
    datasets: [
      {
        label: param,
        data: arrValues,
        backgroundColor: 'aqua',
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.diagramContainer}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: Math.max(...arrValues) + 1,
            },
          },
        }}
      />
    </div>
  );
};

export default BarDiagram;
