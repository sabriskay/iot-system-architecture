import React from "react";
import FormControlSelect from 'src/components/FormControl/FormControlSelect';
import { Divider, Grid } from "@mui/material";
import * as HistoricalDataPointsMachine from 'src/machines/HistoricalDataPoints';

export default function IntervalFilterLayout () {

    const context = React.useContext(HistoricalDataPointsMachine.context);
    const { send } = context.historicalDataPoints;

    const handleChangeIntervalType = (value) =>{
        send({ type: 'UPDATE', interval_type: value });
    }

    const handleChangeInterval = (value) =>{
        send({ type: 'UPDATE', interval: value });
    }

    const intervalOptions = ['1', '2', '5', '10', '12', '15', '24', '30'];
    const intervalTypeOptions = ['second', 'minute', 'hour'];

    return (
        <Grid spacing={4} container direction="column" justifyContent="center">
            <Grid item style={{ width: '100%' }}>
                <FormControlSelect title={'Interval Type'} selectOptions={intervalTypeOptions} onSelectChange={handleChangeIntervalType}/>
            </Grid>
            <Grid item style={{ width: '100%' }}>
                <FormControlSelect title={'Interval Options'} selectOptions={intervalOptions} onSelectChange={handleChangeInterval}/>
            </Grid>
        </Grid>
    );
}