import React from "react";
import CalendarPickerWeek from 'src/components/DatePicker/CalendarPickerWeek';
import { Divider, Grid } from "@mui/material";
import * as HistoricalDataPointsMachine from 'src/machines/HistoricalDataPoints';

export default function DatePickerFilterLayout () {

    const context = React.useContext(HistoricalDataPointsMachine.context);
    const { send } = context.historicalDataPoints;

    const onDateChange = (start_date, end_date) =>{
        send({ type: 'UPDATE', start_date, end_date });
    }

    return (
        <Grid item xs={12} md={6}>
            <Divider/>
            <CalendarPickerWeek onDateChange={onDateChange} />
        </Grid>
    );
}