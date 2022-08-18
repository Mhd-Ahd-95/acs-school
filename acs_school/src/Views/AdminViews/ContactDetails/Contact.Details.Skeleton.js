import React from "react";
import { Grid, Typography, Box, } from "@material-ui/core";
import { useStyles } from './Contact.Details.Style';
import Skeleton from '@mui/material/Skeleton';


export function DetailsSkeleton() {

    const classes = useStyles();

    return (
        <Grid container component={Box} py={2} px={3} direction='column' style={{ height: '100%' }}>
            <Grid container spacing={1} >
                <Grid item lg={7} md={6} xs={12}>
                    <Box pb={2}>
                        <table>
                            <tbody>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Name</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Email</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Subject</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Message</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Creation Date</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}