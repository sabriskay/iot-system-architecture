import axios from "axios";
import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
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
)

const baseURL = `http://localhost:3000/historical-data/demo_ca1_t_axm`;

export default function MachineList () {
  const [sets, setSets] = useState({ mins: [], maxs: [], averages: [], periods: [] });
  const [startDate, setStartDate] = useState(new Date('2018-08-20'));

  useEffect(
    async () => {
      const response = await axios.get(baseURL, {
        params: {
          start_date: startDate,
          end_date: new Date(startDate.getTime() + 86400000)
        }
      });

      setSets({
        maxs: response.data['maxs'].map((value) => parseFloat(value)),
        mins: response.data['mins'].map((value) => parseFloat(value)),
        averages: response.data['averages'].map((value) => parseFloat(value)),
        periods: response.data['periods'].map((value) => new Date(value).getTime())
      });

  }, [ startDate ]);

  const data = {
    labels: sets.periods,
    datasets: [
      {
        label: "Average",
        data: sets.averages,
        fill: true,
        borderColor: "#742774"
      },
      {
        label: "Mins",
        data: sets.mins,
        fill: false,
        borderColor: "#FFF000"
      },
      {
        label: "Maxs",
        data: sets.maxs,
        fill: false,
        borderColor: "#000FFF"
      }
    ]
  };

  return ( 
    <div style={{ width: '100%', height: '100%' }}>
        <Line data={data} />
    </div>
  );
}
