import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { useStyles } from './Details.Style';
import Skeleton from '@mui/material/Skeleton';


export function DetailsSkeleton() {

    const classes = useStyles();

    return (
        <Grid container component={Box} py={2} px={3} direction='column' style={{ height: '100%' }}>
            <Grid container spacing={5} justifyContent='center'>
                <Grid item lg={5} md={6} xs={12}>
                    <Skeleton variant="rectangular" width='100%' height='300px' />
                </Grid>
                <Grid item lg={7} md={6} xs={12}>
                    <Box pb={2}>
                        <Typography variant='h5' gutterBottom>
                            <Skeleton variant="text" width={250} height={40} />
                        </Typography>
                        <table>
                            <tbody>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Current School</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText}/></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Class Name</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Birth Date</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Current Grade</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text"className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Gender</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Parent Name</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Phone</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Email</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText}/></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Address</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Status Registration</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Creation Date</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText}/></Typography></td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}