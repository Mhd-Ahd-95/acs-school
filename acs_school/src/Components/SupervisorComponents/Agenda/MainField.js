import React from 'react';
import { Grid, TextField, Box, MenuItem } from '@material-ui/core';

export function MainForm(props) {


    return (
        <Grid container spacing={2} direction='column'>
            <Grid item component={Box} mt={2}>
                <Grid container spacing={2} >
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            label='Select Date'
                            type='date'
                            onChange={props.handleChange}
                            name='date_agenda'
                            required
                            fullWidth
                            value={props.date}
                            InputLabelProps={{ shrink: true }}
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            label={props.label}
                            onChange={props.handleChangeClass}
                            name='className'
                            required
                            fullWidth
                            disabled={props.agendas === null ? true : false}
                            select
                            error={props.error}
                            variant='outlined'
                            value={props.clas}
                        >
                            <MenuItem value=''>
                                <em>None</em>
                            </MenuItem>
                            {props.allClasses.map(cls => (
                                <MenuItem value={cls.cls_school} key={cls.id}>
                                    {cls.cls_school}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}