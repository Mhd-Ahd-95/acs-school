import React from 'react';
import { Grid, Typography, Button, Modal, Box } from '@material-ui/core';
import { useStyles } from './Details.Style';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useNavigate } from 'react-router-dom';
import RegistrationAPI from '../../../API/registration_api';
import { useParams } from "react-router-dom";
import { DetailsSkeleton } from './DetailsSkeleton'
import moment from 'moment';
import { ConfirmModal } from '../../../Components/AdminComponents/StudentRegistered/ConfirmModal'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSnackbar } from 'notistack';
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'

function FormatDate(date) {
    return (
        moment(date).format('DD-MMM-YYYY - h:mm A')
    )
}

export default function DetailsStudentRegister() {

    const { enqueueSnackbar } = useSnackbar()
    let searchParams = useParams();
    const classes = useStyles();
    const navigate = useNavigate();
    const [actionItem, setActionItem] = React.useState({})
    const [loading, setLoading] = React.useState(false);
    const [modal, setModal] = React.useState(false);

    const id = searchParams.registration_id
    const fetchRegistration = React.useCallback(() => {
        setLoading(true);
        RegistrationAPI.getRegistrationById(id)
            .then(res => {
                setActionItem(res.data)
            })
            .catch(err => {
                enqueueSnackbar(`Failed to load details Student`, { variant: 'error', })
            })
            .finally(() => { setLoading(false); })
    }, [id])

    React.useEffect(() => {
        fetchRegistration()
    }, [fetchRegistration]);

    const ref = React.useRef(null)

    return (
        <CommonMain
            title='Details Student'
            titlePage={`Details Student : ${actionItem.student_name}`}
        >
            {loading ?
                <DetailsSkeleton />
                :
                <Grid container component={Box} py={2} px={3} direction='column' style={{ height: '100%' }}>
                    <Grid container spacing={5} justifyContent='center'>
                        <Grid item lg={4} md={6} sm={11}>
                            <img
                                style={{ border: '1px solid rgba(50,50,50,0.1)' }}
                                width='100%'
                                src={`${actionItem.image}`}
                                alt='Student'
                            />
                        </Grid>
                        <Grid item lg={5} md={6} xs={12} >
                            <Box pb={2}>
                                <Typography variant='h5' gutterBottom>
                                    {actionItem.student_name}
                                </Typography>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Current School</Typography></Box></td>
                                            <td><Typography component='p' display='inline'>{actionItem.current_school}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Class Name</Typography></Box></td>
                                            <td><Typography component='p' display='inline'>{actionItem.class_name}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Birth Date</Typography></Box></td>
                                            <td><Typography component='p' display='inline'>{actionItem.birth_date}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Current Grade</Typography></Box></td>
                                            <td><Typography component='p' display='inline'>{actionItem.current_grade}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Gender</Typography></Box></td>
                                            <td><Typography component='p' display='inline'>{actionItem.gender}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Parent Name</Typography></Box></td>
                                            <td><Typography component='p' display='inline'>{actionItem.parent_name}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Phone</Typography></Box></td>
                                            <td><Typography component='p' display='inline'>{actionItem.phone}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Email</Typography></Box></td>
                                            <td><Typography component='p' display='inline'>{actionItem.email}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Address</Typography></Box></td>
                                            <td><Typography component='p' display='inline'>{actionItem.address}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Status Registration</Typography></Box></td>
                                            <td><Typography component='p' display='inline'>{actionItem.status_registration}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Box pr={2}><Typography className={classes.key} component='p' display='inline'>Creation Date</Typography></Box></td>
                                            <td><Typography component='p' display='inline'>{FormatDate(actionItem.creation_date)}</Typography></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Box>
                        </Grid>
                        <Grid item lg={3} md={12} xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md lg={12}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        startIcon={<ThumbUpAltIcon />}
                                        onClick={() => setModal(1)}
                                        fullWidth
                                        disabled={actionItem.status_registration !== 'PENDING'}
                                    >
                                        Accept
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md lg={12}>
                                    <Button
                                        startIcon={<ThumbDownAltIcon />}
                                        variant='contained'
                                        color='secondary'
                                        onClick={() => setModal(2)}
                                        fullWidth
                                        disabled={actionItem.status_registration !== 'PENDING'}
                                    >
                                        Reject
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md lg={12}>
                                    <Button
                                        startIcon={<ArrowBackIcon />}
                                        variant='contained'
                                        style={{ backgroundColor: 'orange', color: '#fff' }}
                                        fullWidth
                                        onClick={() => navigate('/admin/student-registered')}
                                    >
                                        Go Back
                                    </Button>
                                </Grid>
                            </Grid>
                            <Modal open={modal === 1} ref={ref} >
                                <ConfirmModal
                                    id={actionItem.registration_id}
                                    status='ACCEPTED'
                                    title='Registration Accept'
                                    handleSubmit={() => { setModal(false); fetchRegistration() }}
                                    handleClose={() => setModal(false)}
                                    subtitle='Confirm to accept this student'
                                    startIcon={<ThumbUpAltIcon />}

                                />
                            </Modal>
                            <Modal open={modal === 2} ref={ref}>
                                <ConfirmModal
                                    id={actionItem.registration_id}
                                    status='REJECTED'
                                    title='Registration Reject'
                                    handleSubmit={() => { setModal(false); fetchRegistration() }}
                                    handleClose={() => setModal(false)}
                                    subtitle='Confirm to Reject this student'
                                    startIcon={<ThumbDownAltIcon />}

                                />
                            </Modal>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </CommonMain>
    )
}