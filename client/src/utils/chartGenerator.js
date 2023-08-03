// import { Chart } from 'chart.js';
import ChartJSNodeCanvas from "chartjs-node-canvas";

const generateBarChartImage = async (labels, data, param) => {
  const chartCallback = (ChartJS) => {
    ChartJS.defaults.global.defaultFontFamily = "Arial";
    ChartJS.defaults.global.defaultFontSize = 12;
  };
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width: 800,
    height: 400,
    chartCallback,
  });

  const configuration = {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: param,
          data: data,
          backgroundColor: "aqua",
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: Math.max(...data) + 1,
        },
      },
    },
  };

  const image = await chartJSNodeCanvas.renderToDataURL(configuration);
  return image;
};

export default generateBarChartImage;
