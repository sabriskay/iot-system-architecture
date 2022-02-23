import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function FormControlSelect ({ options, title, onSelectChange }) {

    const [ value, setValue ] = React.useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    
        if (onSelectChange) {
            onSelectChange(event.target.value);
        }
    }

    React.useEffect(() => {
        setValue(options[0])
    }, [0]);

    return (
        <FormControl style={{ width: '100%' }}>
            <InputLabel id={title}>{title}</InputLabel>
            <Select
                id={`${title}-select`}
                value={value}
                label={title}
                onChange={onChange}
            >
                { options.map((option, index) => {
                    return (
                        <MenuItem value={option} key={index}>{option}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}

