/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

export default function FreeSoloCreateOption(props) {

    return (
        <Autocomplete
            multiple
            id="tags-standard"
            options={props.problems}
            getOptionLabel={(option) => option.name}
            value={props.value}
            onChange={(event, newValue) => {
                let v = newValue.map(val => {
                    if (val.inputValue)
                        return {name: val.inputValue };
                    return val;
                });
                // debugger
                    props.onChange(v);
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        name: `Добавить "${params.inputValue}"`,
                    });
                }
                return filtered;
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Используется для"
                    placeholder="Проблема"
                />
            )}
        />

    );
}

