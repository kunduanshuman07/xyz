import React from "react";
import ReactApexChart from "react-apexcharts";

const SprintStatusGraph = () => {
    const [chartData, setChartData] = React.useState({
        series: [44, 55, 67],
        options: {
            chart: {
                height: 350,
                type: "radialBar",
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: "18px",
                            fontFamily: "montserrat"
                        },
                        value: {
                            fontSize: "16px",
                            fontFamily: "montserrat",
                            offsetY: 2,
                        },
                        total: {
                            show: true,
                            label: "Total Issues",
                            formatter: function (w) {
                                return 249;
                            },
                        },
                    },
                },
            },
            labels: ["Setup", "In Progress", "Completed"],
        },
    });
    return (
        <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="radialBar"
            height={200}
        />
    );
};

export default SprintStatusGraph;
