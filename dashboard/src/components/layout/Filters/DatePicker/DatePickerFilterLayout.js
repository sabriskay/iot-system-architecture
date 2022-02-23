import React from "react";
import CalendarPickerWeek from 'src/components/DatePicker/CalendarPickerWeek';
import FormControlSelect from 'src/components/FormControl/FormControlSelect'
import { Divider, Grid, Typography } from "@mui/material";
import * as DataPointsMachine from 'src/machines/DataPoints';

export default function DatePickerFilterLayout () {

    const context = React.useContext(DataPointsMachine.context);
    const { send } = context.dataPoints;

    const handleChangeIntervalType = (value) =>{
        send({ type: 'UPDATE', interval_type: value });
    }

    const handleChangeInterval = (value) =>{
        send({ type: 'UPDATE', interval: value });
    }

    const onDateChange = (start_date, end_date) =>{
        send({ type: 'UPDATE', start_date, end_date });
    }

    const intervalOptions = ['1', '2', '5', '10', '12', '15', '24', '30'];
    const intervalTypeOptions = ['second', 'minute', 'hour'];

    return (
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center">
            <Grid item xs={12} md={6}>
            <Divider/>
                <Typography variant="h6">Select Week</Typography>
                <CalendarPickerWeek onDateChange={onDateChange} />
            </Grid>
            <Grid spacing={4} container direction="column" justifyContent="center">
                <Grid item style={{ width: '100%' }}>
                    <Divider/>
                    <FormControlSelect title={'Interval Type'} options={intervalTypeOptions} onSelectChange={handleChangeIntervalType}/>
                </Grid>
                <Grid item style={{ width: '100%' }}>
                    <FormControlSelect title={'Interval Options'} options={intervalOptions} onSelectChange={handleChangeInterval}/>
                </Grid>
            </Grid>
        </Grid>
    );
}