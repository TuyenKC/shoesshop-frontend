import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import {format} from "date-fns";
function BarChart({ data }) {
  const chartData = {
    labels: data.map((data) => format(new Date(data.date), 'dd-MM-yyyy')),
    datasets: [
      {
        label: "Doanh thu",
        data: data.map((data) => data.revenue),
        backgroundColor: [
          "rgba(75,192,192,1)"
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  }
  return (
    <Bar data={chartData}/>
  );
};

export default BarChart;