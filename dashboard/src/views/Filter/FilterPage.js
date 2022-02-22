import React from "react";
import DatePickerStartEndDateFilterLayout from '../../components/layout/Filters/DatePicker/DatePickerFilterLayout';
import DatePickerRealTimeFilterLayout from '../../components/layout/Filters/DatePicker/DatePickerFilterLayout';
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
                <DatePickerRealTimeFilterLayout startDate={undefined}/>
            </Grid>
    } else {
        boxFilter = <DatePickerStartEndDateFilterLayout startDate={new Date('2018-08-20')}/>;
    }
    return (
        <Container>
            <FormGroup>
                <FormControlLabel control={<Switch checked={activedLive} onChange={handleChange} />} label="On Live" />
                {boxFilter}
            </FormGroup>
        </Container>
    )
}