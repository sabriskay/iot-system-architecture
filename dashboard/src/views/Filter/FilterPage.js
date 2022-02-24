import React from "react";
import DatePickerWeekFilterLayout from '../../components/layout/Filters/DatePicker/DatePickerFilterLayout';
import IntervalFilterLayout from 'src/components/layout/Filters/IntervalFilterLayout/IntervalFilterLayout';
import MetricStatus from '../../components/layout/MetricStatus/MetricStatus';
import { Grid, Container, FormControlLabel, FormGroup, Switch } from '@mui/material';


export default function FilterPage () {
    const [activedLive, setActivedLive] = React.useState(false);
    let boxFilter;

    const handleChange = (event) => {
        setActivedLive(event.target.checked)
    }

    if (activedLive) {
        boxFilter =
            <Grid>
                <MetricStatus/>
                <IntervalFilterLayout/>
            </Grid>
    } else {
        boxFilter = 
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <DatePickerWeekFilterLayout/>
                <IntervalFilterLayout/>
            </Grid>
    }
    return (
        <Container>
            <FormGroup >
                <FormControlLabel style={{ alignSelf:'flex-end' }} control={<Switch checked={activedLive} onChange={handleChange} />} label="Live" />
                    {boxFilter}
            </FormGroup>
        </Container>
    )
}