import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { LineChart } from '../Chart/LineChart';
import * as DataPointsMachine from '../../machines/DataPoints';
import { useActor } from '@xstate/react';

export default function MetricsChart () {
  const context = React.useContext(DataPointsMachine.context);
  const [ state ] = useActor(context.dataPoints);

  const data = {
    labels: state.context.data_points.periods,
    datasets: [
      {
        label: "Average",
        data: state.context.data_points.averages,
        fill: '-1',
        borderColor: "rgba(0,0,255,1.0)",
        pointRadius: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
      },
      {
        label: "Min",
        data: state.context.data_points.mins,
        fill: '-1',
        borderColor: "rgba(255,0,0,0.1)",
        pointRadius: 0,
      },
      {
        label: "Max",
        data: state.context.data_points.maxs,
        fill: '-1',
        borderColor: "rgba(0,255,0,0.1)",
        pointRadius: 0,
      }
    ]
  };

  return (        
    <Grid container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <LineChart data={data} style={{ minHeight: '40vh' }}/> 
    </Grid>);
}




/**
 *   useEffect(
    async () => {
      const response = await axios.get(baseURL, {
        params: {
          start_date: startDate,
          end_date: new Date(startDate.getTime() + 86400000),
          interval: 10,
          intervalType: 'minute'
        }
      });

      setSets({
        maxs: response.data['maxs'].map((value) => parseFloat(value)),
        mins: response.data['mins'].map((value) => parseFloat(value)),
        averages: response.data['averages'].map((value) => parseFloat(value)),
        periods: response.data['periods'].map((value) => new Date(value).getTime())
      });
  }, [ startDate ]);
 */