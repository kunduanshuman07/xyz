import React from "react"
import ReactApexChart from "react-apexcharts"

const IssuePriorityTime = () => {
    const [state, setState] = React.useState({
      series: [
        {
          name: "High",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "Medium",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
        {
            name: "Low",
            data: [1, 2, 4, 2, 4, 2, 1],
          },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
          toolbar: {
            show: false,
          }
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
          ],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
    });
  
    return (
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="area"
            height={180}
          />
    );
  };
  
  export default IssuePriorityTime;
  