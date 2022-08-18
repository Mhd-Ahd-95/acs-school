import React from 'react';
import { Grid, Typography} from '@material-ui/core';
import {useStyles} from './copy.style'
export function Copy() {

    const classes = useStyles();

    return (
        <Grid container justifyContent='flex-start'>
            <Grid item className={classes.copy}>
                <Typography variant='h5' >
                    Copyright ACS School 2021. All rights reserved.
                </Typography>
            </Grid>
        </Grid>
    )
}