import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import useTaskboardData from "../../hooks/useTaskboardData";

const AssigneIssueDistributionGraph = ({ data }) => {
  const { assigneeLabels } = useTaskboardData();
  const [state, setState] = useState({
    series: [{ name: "Issues", data: [] }],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      dataLabels: { enabled: false },
      xaxis: { categories: [] },
    },
  });

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const filteredData = data.filter((x) => x?.empid && x?.count);
      const counts = filteredData.map((x) => x?.count || 0);
      const empidswithlabels = filteredData.map((x) => assigneeLabels[x?.empid] || "Unknown")
      setState((prevData) => ({
        ...prevData,
        series: [{ data: counts }],
        options: {
          ...prevData.options,
          xaxis: { categories: empidswithlabels },
        },
      }));
    }
  }, [data, assigneeLabels]);

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="bar"
      height={180}
    />
  );
};

export default AssigneIssueDistributionGraph;
