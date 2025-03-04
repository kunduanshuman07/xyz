import React from "react";
import ReactApexChart from "react-apexcharts";

const PriorityLineGraph = () => {
    const [state, setState] = React.useState({
        series: [
            {
                name: "Issues Count",
                data: [10, 25, 35, 45, 30, 50, 60, 80, 100]
            }
        ],
        options: {
            chart: {
                type: "area",
                height: 120,
                width: "100%",  // Ensure it takes full width
                parentHeightOffset: 0, // Remove extra spacing
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth"
            },
            grid: {
                padding: {
                    left: 0, right: 0, top: 0, bottom: 0  // Remove padding
                },
                show: false
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
                labels: { show: false },
                axisBorder: { show: false },
                axisTicks: { show: false }
            },
            yaxis: {
                show: false
            },
            legend: {
                show: false
            }
        }
    });

    return (
        <div style={{ width: "100%", padding: 0, marginTop: -10 }}> 
            <ReactApexChart options={state.options} series={state.series} type="area" height={120} width="100%" />
        </div>
    );
}

export default PriorityLineGraph;
