import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const LineChart = ({ apiData }) => {
  // console.log( "apiData - ",  apiData.data?.expenses)

  const state = {
    // labels: [
    //  "28-Aug" , "29-Aug" , "30-Aug" , "31-Aug" , "01-Sep" , "02-Sep", "03-Sep" ,
    // ],

    labels:
      apiData.data?.expenses &&
      apiData.data?.expenses.map((data) => {
        return data.date.substring(0, 10);
      }),

    datasets: [
      {
        label: "Expense Money",
        backgroundColor: ["white"],
        fill: false,
        lineTension: 0.5,
        borderColor: "white",
        borderWidth: 2,
        // data: [14 , 10 , 7 , 18 , 7, 14 , 5],
        data:
          apiData.data?.expenses &&
          apiData.data?.expenses.map((data) => {
            return data.money;
          }),
      },

      {
        label: "Category Fund",
        backgroundColor: ["blue"],
        fill: false,
        lineTension: 0.5,
        borderColor: "blue",
        borderWidth: 2,
        // data: [14 , 10 , 7 , 18 , 7, 14 , 5],
        data:
          apiData.data?.expenses &&
          apiData.data?.expenses.map((data) => {
            return data.category.budget;
          }),
      },
    ],
  };

  return (
    <>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: "Class Strength",
            fontSize: 5,
          },
          legend: {
            display: true,
            position: "right",
          },
          responsive: true,
        }}
      />
    </>
  );
};

export default LineChart;
