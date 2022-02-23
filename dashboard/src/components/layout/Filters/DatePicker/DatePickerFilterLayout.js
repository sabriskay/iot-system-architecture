import React from "react";
import CalendarPickerWeek from 'src/components/DatePicker/CalendarPickerWeek';
import FormControlSelect from 'src/components/FormControl/FormControlSelect'
import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import * as DataPointsMachine from 'src/machines/DataPoints';

export default function DatePickerFilterLayout () {

    const context = React.useContext(DataPointsMachine.context);
    const { send } = context.dataPoints;
    const [ intervalType, setIntervalType ] = React.useState('minute');
    const [ interval, setIntervalLength ] = React.useState('10');

    const handleChangeIntervalType = (event) =>{
        setIntervalType(event.target.value);
        send({ type: 'UPDATE', interval_type: event.target.value });
    }

    const handleChangeInterval = (event) =>{
        setIntervalLength(event.target.value);
        send({ type: 'UPDATE', interval: event.target.value });
    }

    const onDateChange = (start_date, end_date) =>{
        send({ type: 'UPDATE', start_date, end_date });
    }

    const intervalOptions = [1, 2, 5, 10, 15, 13];
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
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Interval {intervalType}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={interval}
                            label={`Interval ${intervalType}`}
                            onChange={handleChangeInterval}
                        >
                            <MenuItem value={'1'}>1</MenuItem>
                            <MenuItem value={'2'}>2</MenuItem>
                            <MenuItem value={'5'}>5</MenuItem>
                            <MenuItem value={'10'}>10</MenuItem>
                            <MenuItem value={'15'}>15</MenuItem>
                            <MenuItem value={'13'}>30</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item style={{ width: '100%' }}>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-label">Interval Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={intervalType}
                            label="Interval Type"
                            onChange={handleChangeIntervalType}
                        >
                            <MenuItem value={'minute'}>Minutes</MenuItem>
                            <MenuItem value={'hour'}>Hours</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    );
}