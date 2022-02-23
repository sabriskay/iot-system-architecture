import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function FormControlSelect ({ options, title, onSelectChange }) {
    const [ value, setValue ] = React.useState(options[0]);

    const onChange = (newValue) => {
        setValue(newValue);
    
        if (onSelectChange) {
            onSelectChange(newValue);
        }
      }

    return (
        <FormControl style={{ width: '100%' }}>
            <InputLabel id="`${title}`">${title}</InputLabel>
            <Select
                labelId="`${title}-label-select`"
                id="`${title}-select`"
                value={value}
                label={`${title}`}
                onChange={onChange}
            >
                <MenuItem value={'1'}>1</MenuItem>
                <MenuItem value={'2'}>2</MenuItem>
                <MenuItem value={'5'}>5</MenuItem>
                <MenuItem value={'10'}>10</MenuItem>
                <MenuItem value={'15'}>15</MenuItem>
                <MenuItem value={'13'}>30</MenuItem>
            </Select>
        </FormControl>
    )
}

