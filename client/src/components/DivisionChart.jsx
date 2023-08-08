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

import styles from '../css/BarDiagramSubDivision.module.css';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
)


const DivisionChart = ({ circleName, divisionName, financialYear, param }) => {
  const [divisionYearlyDetails, setDivisionYearlyDetails] = useState([]);

  useEffect(() => {
    const getYearlyPerformanceDetail = async () => {
      try {
        const res = await axios.get(
          `https://apdcl-site-server.onrender.com/api/v1/division/getyearly?circleName=${circleName}&divisionName=${divisionName}&financialYear=${financialYear}`,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        setDivisionYearlyDetails(res.data.updatedDivisionResult);
      } catch (error) {
        console.log(error.message);
      }
    };

    getYearlyPerformanceDetail();
  }, [circleName, divisionName, financialYear]);

  const months = divisionYearlyDetails.map(entry => `${entry.month}, ${entry.year}`);
  const arrValues = divisionYearlyDetails.map(entry => entry[param]);

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

export default DivisionChart;
