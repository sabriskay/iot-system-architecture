import React from "react";
import DatePicker from '../../../DatePicker/DatePicker';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Card } from "@mui/material";


export default function DatePickerFilterLayout (props) {
    const date = new Date('2018-08-20');
    let startBox;

    if (props.startDate) {
        startBox = 
            <Grid item xs={12} md={6}>
                <Typography variant="h6">Start Date</Typography>
                <DatePicker date={date} startDate={props.startDate}/>
            </Grid>
    }
    
    return (
        <Grid container spacing={2}>
            {startBox}
            <Grid item xs={12} md={6}>
                <Typography variant="h6">End Date</Typography>
                <DatePicker date={date} startDate={props.startDate} />
            </Grid>
        </Grid>
    );
}