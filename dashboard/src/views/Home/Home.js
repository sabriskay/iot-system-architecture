import React from "react";
import MetricPage from "../Metric/MetricPage";
import ResponsiveDrawer from '../Header/Header';

export default function Home () {
  return ( 
    <div style={{ width: '95%', height: '95%', display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <div>
        <ResponsiveDrawer/>
      </div>
      <div style={{ width: '100%', display: 'grid' }}>
        <MetricPage/>
      </div>
    </div>
  );
}
