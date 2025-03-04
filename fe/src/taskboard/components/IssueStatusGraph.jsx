import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const IssueStatusGraph = ({ data = [] }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "polarArea",
      },
      labels: ["Setup", "In Progress", "Resolved"],
      fill: {
        opacity: 1,
      },
      stroke: {
        width: 1,
        colors: undefined,
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: "bottom",
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
          spokes: {
            strokeWidth: 0,
          },
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          shadeTo: "light",
          shadeIntensity: 0.6,
        },
      },
    },
  });

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setChartData((prevData) => ({
        ...prevData,
        series: [
          data[1]?.count || 0,
          data[0]?.count || 0,
          data[2]?.count || 0,
        ],
      }));
    }
  }, [data]);

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="polarArea"
      height={170}
    />
  );
};

export default IssueStatusGraph;
