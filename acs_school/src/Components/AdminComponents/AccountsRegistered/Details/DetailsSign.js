import React from 'react';
import { Appbar } from '../../AppBar/Appbar';
import { Paper, Grid, Typography, Button, Box, Divider } from '@material-ui/core';
import { useStyles } from './details.style';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import * as UserAPI from '../../../../API/user_api';
import { useParams } from "react-router-dom";
import { DetailsSkeleton } from './details.skeleton'
import { Footer } from '../../Footer/footer';
import { Copy } from '../../../../User/Components/Copy/copy'
import moment from 'moment';
import {useSnackbar} from 'notistack';

function FormatDate(date) {
    return (
        moment(date).format('DD-MMM-YYYY - h:mm A')
    )
}

export function DetailsSign() {

    const { enqueueSnackbar} = useSnackbar()
    let searchParams = useParams();
    const classes = useStyles();
    const navigate = useNavigate();
    const [actionItem, setActionItem] = React.useState({})
    const [loading, setLoading] = React.useState(true);
    const [students, setStudents] = React.useState([]);

    const FindUser = React.useCallback(() => {
        const id = searchParams.user_id
        UserAPI.getUser(id)
            .then(res => {
                setActionItem(res.data)
                setStudents(res.data.students_info)
            })
            .catch(err => {
                enqueueSnackbar(` — Try again!`, { variant: 'error', })
            })
    }, [])

    React.useEffect(() => {
        FindUser()
    }, [FindUser])

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [loading])


    return (
        <>
            <Appbar />
            <Paper elevation={3} className={classes.paper}>

                <Grid container justifyContent="center" style={{ padding: '30px' }}>
                    <Grid item>
                        <Typography variant='h4' className={classes.title}>
                            Details {actionItem.user_role}
                        </Typography>
                    </Grid>
                </Grid>
                {loading ?
                    <DetailsSkeleton action={actionItem} actionStudent={students} />
                    :
                    <Grid container component={Box} py={2} px={3} direction='column' style={{ height: '100%' }}>
                        <Grid container spacing={5} >
                            <Grid item lg={9} md={9} sm={8} xs={12} >
                                <Box pb={2}>
                                    {actionItem.father_name != null ?
                                        <Typography variant='h5' gutterBottom>
                                            {actionItem.father_name}
                                        </Typography>
                                        :
                                        <Typography variant='h5' gutterBottom>
                                            {actionItem.first_name} {actionItem.last_name}
                                        </Typography>
                                    }
                                    <table>
                                        <tbody>
                                            {students != null ?
                                                <tr>
                                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Children</Typography></Box></td>
                                                    {students.map((std, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <Typography component='p' display='inline' className={classes.keytd}>
                                                                    {index + 1} - {std.firstName} {std.middleName} {std.lastname}
                                                                </Typography>
                                                            </td>
                                                            <td className={classes.className}>
                                                                <Typography component='p' display='inline' className={classes.keytd}>
                                                                    <strong style={{ color: 'red' }}> Class : </strong>{std.className}
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tr>
                                                :
                                                null
                                            }
                                            {actionItem.mother_name != null ?
                                                <tr>
                                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Mother Name</Typography></Box></td>
                                                    <td><Typography component='p' display='inline' className={classes.keytd}>{actionItem.mother_name}</Typography></td>
                                                </tr>
                                                :
                                                null
                                            }
                                            <tr>
                                                <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Email</Typography></Box></td>
                                                <td><Typography component='p' display='inline' className={classes.keytd}>{actionItem.email}</Typography></td>
                                            </tr>
                                            <tr>
                                                <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Address</Typography></Box></td>
                                                <td><Typography component='p' display='inline' className={classes.keytd}>{actionItem.address}</Typography></td>
                                            </tr>
                                            <tr>
                                                <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Phone</Typography></Box></td>
                                                <td><Typography component='p' display='inline' className={classes.keytd}>{actionItem.phone}</Typography></td>
                                            </tr>
                                            <tr>
                                                <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Role</Typography></Box></td>
                                                <td><Typography component='p' display='inline' className={classes.keytd}>{actionItem.user_role}</Typography></td>
                                            </tr>
                                            <tr>
                                                {actionItem.classes != null ?
                                                    <>
                                                        <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Classes</Typography></Box></td>
                                                        <td><Typography component='p' display='inline' className={classes.keytd}>{actionItem.classes.join(' - ')}</Typography></td>
                                                    </>
                                                    :
                                                    null
                                                }
                                            </tr>
                                            <tr>
                                                {actionItem.courses != null ?
                                                    <>
                                                        <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Courses</Typography></Box></td>
                                                        <td><Typography component='p' display='inline' className={classes.keytd}>{actionItem.courses.join(' - ')}</Typography></td>
                                                    </>
                                                    :
                                                    null
                                                }
                                            </tr>
                                            <tr>
                                                <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Creation Date</Typography></Box></td>
                                                <td><Typography component='p' display='inline' className={classes.keytd}>{FormatDate(actionItem.creation_date)}</Typography></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Box>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <Grid container spacing={1} direction='column'>
                                    <Grid item xs={12} md lg={12}>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            startIcon={<EditIcon />}
                                            fullWidth
                                            onClick={() => navigate(`/admin/${actionItem.user_role}/${actionItem.user_id}/edit`)}
                                        >
                                            Edit
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md lg={12}>
                                        <Button variant='contained' startIcon={<ArrowBackIcon />} color='secondary' fullWidth onClick={() => navigate('/admin/accounts')}>
                                            Go Back
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                }
            </Paper>
            <Footer />
            <Copy />
        </>
    )
}