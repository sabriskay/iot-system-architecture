import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
    responsive: true,
    interaction: {
        intersect: false,
        mode: 'index',
    },
    plugins: {
        filler: {
            propagate: true,
        },
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: '',
        },
        tooltip: {
            callbacks: {
                footer: (dataPoints) => {
                    // TODO - Make dinamic
                    const averageDataPoint = dataPoints.find(dataPoint => dataPoint.dataset.label.toLowerCase() === 'average');
                    const value = averageDataPoint.raw;

                    if (value === 0) {
                        return "Status: On w/o Load (>0.1%)";
                    } else if (value <= 1) {
                        return "Status: Iddle (<20%)";
                    } else if (value <= 20) {
                        return "Status: On no Load";
                    }

                    return "Status: On w/Load (20-100+%)";
                },
                title: (dataPoints) => {
                    const { label } = dataPoints[0];
                    const date = new Date(parseInt(label));
                    return `${date.getHours()}:${date.getMinutes()} - ${date.getMonth()+1}/${date.getDate()}`
                },
            }
        }
    },
    elements: {
        line: {
            tension: 0.4
        }
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                maxRotation: 0,
                minRotation: 0,
                // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                callback: function(val, index) {
                    if (index % 4) {
                        return '';
                    }

                    const epoch = this.getLabelForValue(val);
                    const date = new Date(epoch);

                    return `${date.getHours()}:${date.getMinutes()} - ${date.getMonth()+1}/${date.getDate()}`
                },
            }
        },
        y: {
            position: 'left',
            ticks: {
                callback: function(value) {
                    if (value <= 1) {
                        return `On w/o Load (>0.1%)`;
                    } else if (value === 20) {
                        return `Iddle (<20%)`;
                    } else if (value === 100) {
                        return `On w/Load (20-100+%)`;
                    }

                    return '';
                },
            },
            grid: {
                display: true,
                drawBorder: false,
                drawOnChartArea: true,
                lineWidth: 2,
                color: function(context) {
                    if (context.tick.value <= 1) {
                        return "rgba(0,0,0,0.3)";
                    } else if (context.tick.value === 20) {
                        return "rgba(0,0,0,0.3)";
                    } else if (context.tick.value === 100) {
                        return "rgba(0,0,0,0.3)";
                    }

                    return "rgba(0,255,0,0)";;
                }

            },
        }
    },
};



export function LineChart (props) {
  return <Line options={options} data={props.data} />;
}
