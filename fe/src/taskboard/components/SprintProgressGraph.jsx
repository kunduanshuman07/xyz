import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const SprintProgressGraph = ({ data }) => {
    const [chartData, setChartData] = React.useState({
        series: [],
        options: {
            chart: {
                height: 170,
                type: "radialBar",
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 225,
                    hollow: {
                        margin: 0,
                        size: "70%",
                        background: "#fff",
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: "front",
                        dropShadow: {
                            enabled: true,
                            top: 3,
                            left: 0,
                            blur: 4,
                            opacity: 0.5,
                        },
                    },
                    track: {
                        background: "#fff",
                        strokeWidth: "67%",
                        margin: 0,
                        dropShadow: {
                            enabled: true,
                            top: -3,
                            left: 0,
                            blur: 4,
                            opacity: 0.7,
                        },
                    },
                    dataLabels: {
                        show: true,
                        name: {
                            offsetY: -10,
                            show: true,
                            color: "#888",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "montserrat",
                        },
                        value: {
                            formatter: function (val) {
                                return `${parseInt(val)} %`;
                            },
                            color: "#111",
                            fontSize: "20px",
                            fontFamily: "montserrat",
                            show: true,
                            offsetY: 2,
                        },
                    },
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    type: "horizontal",
                    shadeIntensity: 0.5,
                    gradientToColors: ["#ABE5A1"],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                },
            },
            stroke: {
                lineCap: "round",
            },
            labels: ["Sprint Progress"],
        },
    });
    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            const total = data[1]?.count||0 + data[2]?.count||0 + data[0]?.count||0;
            const done = data[2]?.count;
            const progress = done? ((done * 100) / total).toFixed(2) : 0;
            setChartData((prevData) => ({
                ...prevData,
                series: [
                    progress
                ],
            }));
        }
    }, [data]);
    return (
        <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="radialBar"
            height={170}
        />
    );
};

export default SprintProgressGraph;
