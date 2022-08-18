import React from "react";
import { Grid, Typography, Box, } from "@material-ui/core";
import { useStyles } from './details.style';
import Skeleton from '@mui/material/Skeleton';


export function DetailsSkeleton(props) {

    const classes = useStyles();

    return (
        <Grid container component={Box} py={2} px={3} direction='column' style={{ height: '100%' }}>
            <Grid container spacing={1} >
                <Grid item lg={7} md={6} xs={12}>
                    <Box pb={2}>
                        {props.action.father_name != null ?
                            <Typography variant='h5' gutterBottom>
                                <Skeleton variant="text" width={250} height={40} />
                            </Typography>
                            :
                            <Typography variant='h5' gutterBottom>
                                <Skeleton variant="text" width={250} height={40} />
                            </Typography>
                        }
                        <table>
                            <tbody>
                                {props.actionStudent != null ?
                                    <tr>
                                        <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Children</Typography></Box></td>
                                        {props.actionStudent.map((child, index) => (
                                            <tr key={index}>
                                                <td >
                                                    <Typography component='p' display='inline' className={classes.keytd}>
                                                        <Skeleton variant="text" className={classes.sekeltonText} />
                                                    </Typography>
                                                </td>
                                                <td className={classes.className}>
                                                    <Typography component='p' display='inline' className={classes.keytd}>
                                                        <Skeleton variant="text" width={70} height={25} />
                                                    </Typography>
                                                </td>
                                            </tr>
                                        ))}
                                    </tr>
                                    :
                                    null
                                }
                                {props.action.mother_name != null ?
                                    <tr>
                                        <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Mother Name</Typography></Box></td>
                                        <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                    </tr>
                                    :
                                    null
                                }
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Email</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Address</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Phone</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Role</Typography></Box></td>
                                    <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                </tr>
                                <tr>
                                    {props.action.classes != null ?
                                        <>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Classes</Typography></Box></td>
                                            <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                        </>
                                        :
                                        null
                                    }
                                </tr>
                                <tr>
                                    {props.action.courses != null ?
                                        <>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Courses</Typography></Box></td>
                                            <td><Typography component='p' display='inline'><Skeleton variant="text" className={classes.sekeltonText} /></Typography></td>
                                        </>
                                        :
                                        null}
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