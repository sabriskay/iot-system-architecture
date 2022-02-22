import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

export const pluging = [{
        afterLayout: c => {
            console.log(c)
          let dataset = c.data.datasets[0];
          let yScale = c.scales['y-axis-0'];
          let yBottom = yScale.getPixelForValue(0);
          let yGradientStart = yScale.getPixelForValue(dataset.data.find(v => v > 0));
          let yTop = yScale.getPixelForValue(Math.max(...dataset.data));
          let gradientFill = c.ctx.createLinearGradient(0, yBottom, 0, yTop);
          gradientFill.addColorStop(0, "#fff");
          let offset = (yBottom - yGradientStart) / (yBottom - yTop); 
          gradientFill.addColorStop(offset, "#fff");
          gradientFill.addColorStop(1, "#7E0100");
          dataset.backgroundColor = gradientFill;
        }
}];

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
            display: false,
            text: 'Compresor Status',
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
                        return "rgba(0,0,0,0.5)";
                    } else if (context.tick.value === 20) {
                        return "rgba(0,0,0,0.5)";
                    } else if (context.tick.value === 100) {
                        return "rgba(0,0,0,0.5)";
                    }

                    return "rgba(0,255,0,0)";;
                }

            },
        }
    },
};



export function LineChart (props) {
  return <Line options={options} plugings={pluging} data={props.data} />;
}
