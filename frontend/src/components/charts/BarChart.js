import React from "react";
import { Bar } from "react-chartjs-2";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const BarChart = ({ apiData }) => {
  console.log(apiData.data?.expenses);

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Horizontal Bar Chart",
      },
    },
  };

  const labels = ["", "", "", "", "", ""].reverse();

  const fetchedData = [];

  const data = {
    labels,
    datasets: [
      {
        label: "Expense",
        // data: labels.map((item) => item ),
        data:
          apiData.data?.expenses &&
          apiData.data?.expenses.map((data) => {
            return data.money;
          }),
        borderColor: "white",
        backgroundColor: "white",
      },

      {
        label: "Category Budget",
        // data: labels.map((item) => item ),
        data:
          apiData.data?.expenses &&
          apiData.data?.expenses.map((data) => {
            return data.category.budget;
          }),
        borderColor: "blue",
        backgroundColor: "blue",
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
};

export default BarChart;
