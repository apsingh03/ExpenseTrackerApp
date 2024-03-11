import React from "react";

import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const LineChart = ({ apiData, filteredData }) => {
  let uniqueDates;

  apiData &&
    apiData.map((data) => {
      // console.log(data.Day)

      uniqueDates = new Set();
      uniqueDates.add(data.Day);
    });

  const state = {
    // labels: [
    //  "28-Aug" , "29-Aug" , "30-Aug" , "31-Aug" , "01-Sep" , "02-Sep", "03-Sep" ,
    // ],

    labels: filteredData.map((data) => {
      let unique = [];

      if (!unique.includes(data.Day.substring(0, 10))) {
        unique.push(data.Day.substring(0, 10));
      }

      return unique;
    }),

    datasets: [
      {
        label: "",
        backgroundColor: ["blue"],
        fill: false,
        lineTension: 0.5,
        borderColor: "blue",
        borderWidth: 2,
        // data: [14 , 10 , 7 , 18 , 7, 14 , 5],
        data: filteredData.map((data) => {
          return data.A;
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
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </>
  );
};

export default LineChart;
