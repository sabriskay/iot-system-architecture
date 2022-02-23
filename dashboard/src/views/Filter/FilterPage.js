import React from "react";
import DatePickerWeekFilterLayout from '../../components/layout/Filters/DatePicker/DatePickerFilterLayout';
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
            </Grid>
    } else {
        boxFilter = <DatePickerWeekFilterLayout startDate={new Date('2018-08-20')}/>;
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