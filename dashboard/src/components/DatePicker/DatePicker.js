import React, { useState } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { styled } from '@mui/material/styles';

const CustomizedCalendar = styled(CalendarPicker)`
  color: #20b2aa;
  font-size: 0.9rem;

  :hover {
    color: #2e8b57;
  }
`;

       
export default function DatePickerComponent (props) {
    const [startDate, setStartDate] = useState(props.startDate);
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CustomizedCalendar date={startDate} onChange={(newDate) => setStartDate(newDate)} />
        </LocalizationProvider>
    )
}
