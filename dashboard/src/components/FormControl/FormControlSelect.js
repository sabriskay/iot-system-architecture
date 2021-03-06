import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function FormControlSelect ({ selectOptions, title, onSelectChange }) {

    const [ value, setValue ] = React.useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    
        if (onSelectChange) {
            onSelectChange(event.target.value);
        }
    }

    React.useEffect(() => {
        if (selectOptions && selectOptions.length > 0) {
            setValue(selectOptions[0])
        }
    }, [selectOptions]);

    return (
        <FormControl style={{ width: '100%' }}>
            <InputLabel id={title}>{title}</InputLabel>
            <Select
                id={`${title}-select`}
                value={value}
                label={title}
                onChange={onChange}
            >
                { selectOptions.map((option, index) => {
                    return (
                        <MenuItem value={option} key={index}>{option}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}

