import React from 'react';
import { Grid, Typography, Button, Box } from '@material-ui/core';
import { useStyles } from './Details.Style';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import UserAPI from '../../../API/user_api';
import { useParams } from "react-router-dom";
import { DetailsSkeleton } from './Details.Skeleton'
import moment from 'moment';
import { useSnackbar } from 'notistack';
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'

function FormatDate(date) {
    return (
        moment(date).format('DD-MMM-YYYY - h:mm A')
    )
}

export default function DetailsAccount() {

    const { enqueueSnackbar } = useSnackbar()
    let searchParams = useParams();
    const classes = useStyles();
    const navigate = useNavigate();
    const [actionAccount, setActionAccount] = React.useState({})
    const [loading, setLoading] = React.useState(true);

    const FindUser = React.useCallback((id) => {
        setLoading(true);
        UserAPI.getUser(id)
            .then(res => {
                setActionAccount(res.data)
            })
            .catch(err => {
                enqueueSnackbar(`Failed to show account! ${[id]}`, { variant: 'error', })
            })
            .finally(() => { setLoading(false) })
    }, [])

    React.useEffect(() => {
        FindUser(searchParams.user_id)
    }, [searchParams.user_id, FindUser])



    return (
        <CommonMain
            title='Details Account'
            titlePage={`Details Account : ${actionAccount.first_name} ${actionAccount.last_name}`}
        >
            {loading ?
                <DetailsSkeleton action={actionAccount} />
                :
                <Grid container component={Box} py={2} px={3} direction='column' style={{ height: '100%' }}>
                    <Grid container spacing={5} >
                        <Grid item lg={9} md={9} sm={8} xs={12} >
                            <Box pb={2}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Email</Typography></Box></td>
                                            <td><Typography component='p' display='inline' className={classes.keytd}>{actionAccount.email}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Address</Typography></Box></td>
                                            <td><Typography component='p' display='inline' className={classes.keytd}>{actionAccount.address}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Phone</Typography></Box></td>
                                            <td><Typography component='p' display='inline' className={classes.keytd}>{actionAccount.phone}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Role</Typography></Box></td>
                                            <td><Typography component='p' display='inline' className={classes.keytd}>{actionAccount.user_role}</Typography></td>
                                        </tr>
                                        <tr>
                                            {actionAccount.classes &&
                                                <>
                                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Classes</Typography></Box></td>
                                                    <td><Typography component='p' display='inline' className={classes.keytd}>{actionAccount.classes.join(' - ')}</Typography></td>
                                                </>
                                            }
                                        </tr>
                                        <tr>
                                            {actionAccount.courses &&
                                                <>
                                                    <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Courses</Typography></Box></td>
                                                    <td><Typography component='p' display='inline' className={classes.keytd}>{actionAccount.courses.join(' - ')}</Typography></td>
                                                </>
                                            }
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Creation Date</Typography></Box></td>
                                            <td><Typography component='p' display='inline' className={classes.keytd}>{FormatDate(actionAccount.creation_date)}</Typography></td>
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
                                        onClick={() => navigate(`/admin/accounts/${actionAccount.user_id}/edit`)}
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
        </CommonMain>
    )
}