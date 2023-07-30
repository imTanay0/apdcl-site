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

const BarDiagram = () => {

  const data = {
    labels: ['Sub-Division'],
    datasets: [
      {
        label: 'Hojai',
        data: [3],
        backgroundColor: 'aqua',
        borderColor: 'black',
        borderWidth: 1,
      },
      {
        label: 'Lanka',
        data: [12],
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