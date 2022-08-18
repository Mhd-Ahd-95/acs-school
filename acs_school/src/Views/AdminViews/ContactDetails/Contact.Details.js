import React from 'react';
import { Grid, Typography, Box, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './Contact.Details.Style';
import ContactAPI from '../../../API/contact_api';
import { useParams } from "react-router-dom";
import { DetailsSkeleton } from './Contact.Details.Skeleton'
import moment from 'moment';
import { useSnackbar } from 'notistack';
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function FormatDate(date) {
    return (
        moment(date).format('DD-MMM-YYYY - h:mm A')
    )
}

export default function DetailsContact() {

    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    let searchParams = useParams();
    const classes = useStyles();
    const [actioncontact, setActionContact] = React.useState({})
    const [loading, setLoading] = React.useState(true);

    const FindContactById = React.useCallback((id) => {
        setLoading(true);
        ContactAPI.getContactById(id)
            .then(res => {
                setActionContact(res.data)
            })
            .catch(err => {
                enqueueSnackbar(`Failed to show Contact! ${[id]}`, { variant: 'error', })
            })
            .finally(() => { setLoading(false) })
    }, [])

    React.useEffect(() => {
        FindContactById(searchParams.id)
    }, [searchParams.id, FindContactById])



    return (
        <CommonMain
            title='Details Contact'
            titlePage={`Details Contact : ${actioncontact.name}`}
        >
            {loading ?
                <DetailsSkeleton />
                :
                <Grid container component={Box} py={2} px={3} direction='column' style={{ height: '100%' }}>
                    <Grid container spacing={5} >
                        <Grid item lg={9} md={9} sm={8} xs={12} >
                            <Box pb={2}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Name</Typography></Box></td>
                                            <td><Typography component='p' display='inline' className={classes.keytd}>{actioncontact.name}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Email</Typography></Box></td>
                                            <td><Typography component='p' display='inline' className={classes.keytd}>{actioncontact.email}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Subject</Typography></Box></td>
                                            <td><Typography component='p' display='inline' className={classes.keytd}>{actioncontact.subject}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Message</Typography></Box></td>
                                            <td><Typography component='p' display='inline' className={classes.keytd}>{actioncontact.message}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Creation Date</Typography></Box></td>
                                            <td><Typography component='p' display='inline' className={classes.keytd}>{FormatDate(actioncontact.creation_date)}</Typography></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Box>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <Grid item xs={12} md lg={12}>
                                <Button variant='contained' startIcon={<ArrowBackIcon />} color='secondary' fullWidth onClick={() => navigate('/admin/sender-contact')}>
                                    Go Back
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </CommonMain>
    )
}