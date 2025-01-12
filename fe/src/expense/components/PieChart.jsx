import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
    const [state, setState] = useState({
        series: [44, 55, 41, 17, 15],
        options: {
            chart: {
                type: 'donut',
            },
            legend: {
                show: false, 
            },
            dataLabels: {
                enabled: false, 
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 100
                    },
                    legend: {
                        show: false
                    }
                }
            }]
        },
    });

    return (
        <ReactApexChart options={state.options} series={state.series} type="donut" />
    );
}

export default PieChart;
