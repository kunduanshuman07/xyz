import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const PriorityRadialGraph = ({ data }) => {
    const [state, setState] = React.useState({

        series: [],
        options: {
            chart: {
                height: 150,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                        margin: 10,
                        size: '10%',
                        background: 'transparent',
                        image: undefined,
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            show: false,
                        }
                    },
                    barLabels: {
                        enabled: true,
                        useSeriesColors: true,
                        offsetX: -10,
                        fontSize: '12px',
                        fontFamily: "montserrat",
                        fontWeight: "bold",
                        formatter: function (seriesName, opts) {
                            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%"
                        },
                    },
                }
            },
            colors: ['#1ab7ea', '#0084ff', '#39539E'],
            labels: ['High Priority', 'Medium Priority', 'Low Priority'],
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        show: false
                    }
                }
            }]
        },


    });

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            const total = data[2]?.count + data[1]?.count + data[0]?.count;

            setState((prevData) => ({
                ...prevData,
                series: [
                    ((data[2]?.count*100)/total).toFixed(2) || 0,
                    ((data[1]?.count*100)/total).toFixed(2) || 0,
                    ((data[0]?.count*100)/total).toFixed(2) || 0,
                ],
            }));
        }
    }, [data]);

    return (
        <ReactApexChart options={state.options} series={state.series} type="radialBar" height={170} />
    );
}

export default PriorityRadialGraph;