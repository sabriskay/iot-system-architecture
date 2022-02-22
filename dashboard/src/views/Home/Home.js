import React from "react";
import MetricPage from "../Metric/MetricPage";
import FilterPage from "../Filter/FilterPage";
import { Paper, Box } from '@mui/material';

export default function Home () {
  console.log('hola');

  return ( 
    <div style={{ width: '90%', height: '100%' }}>
      <Paper elevation={3}>
        <Box>
          <FilterPage/>
          <MetricPage/>
        </Box>
      </Paper>
    </div>
  );
}
