import React from 'react';
import { Paper, Grid, Typography, Button, } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { useStyles } from './Student.Style';
import CancelIcon from '@mui/icons-material/Cancel';
import RegistrationAPI from '../../../API/registration_api';
import { useSnackbar } from 'notistack';
import UserAPI from '../../../API/user_api'
import ContactAPI from '../../../API/contact_api'

export const ConfirmModal = React.forwardRef((props, ref) => {
    const { enqueueSnackbar } = useSnackbar()
    const classes = useStyles();
    const [save, setSave] = React.useState(false);
    const handleSubmitStatus = (e) => {
        e.preventDefault();
        setSave(true)
        const id = props.id
        const status = props.status
        RegistrationAPI.updateStatusRegistration(id, status)
            .then((res) => {
                setSave(false)
                props.handleSubmit()
                enqueueSnackbar(`Registration status updated successfully — Oops!`, { variant: 'success', })
            })
            .catch((err) => {
                enqueueSnackbar(`Failed to update registration — Try again!`, { variant: 'error', })
                setSave(false)
            })
    }

    const handleDeleteStudent = (e) => {
        setSave(true)
        const id = props.id
        e.preventDefault()
        RegistrationAPI
            .deleteRegistration(id)
            .then(() => {
                enqueueSnackbar(`Student was deleted successfully`, { variant: 'success', })
                props.handleSubmit()
            })
            .catch((err) => {
                enqueueSnackbar('Failed to delete Student', { variant: 'error', })
            })
            .finally(() => { setSave(false) })
    }

    const handleDeleteUser = (e) => {
        setSave(true)
        const id = props.userId
        e.preventDefault()
        UserAPI
            .deleteUser(id)
            .then(() => {
                enqueueSnackbar('Account was deleted successfully', { variant: 'success', })
                props.handleAccount()
            })
            .catch((err) => {
                enqueueSnackbar('Failed to delete account', { variant: 'error', })
            })
            .finally(() => { setSave(false) })
    }

    const handleDeleteContact = (e) => {
        e.preventDefault();
        setSave(true)
        ContactAPI.deleteContact(props.contact_id)
            .then(() => {
                enqueueSnackbar('Contact was deleted successfully', { variant: 'success', })
                props.handleSubmit()
            })
            .catch((err) => {
                enqueueSnackbar('Failed to delete Contact', { variant: 'error', })
            })
            .finally(() => { setSave(false) })
    }

    return (
        <Paper className={classes.modal} elevation={3}>
            <Grid container spacing={2} alignItems='center' >
                <Grid item xs={12}>
                    <Typography
                        variant='h5'
                        color='textPrimary'
                        align='center'
                        className={classes.titleModal}
                    >
                        {props.title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        component='p'
                        color='textPrimary'
                        align='center'
                        className={classes.questionModal}
                    >
                        {props.subtitle}
                    </Typography>
                </Grid>
                <Grid
                    container
                    item xs={12}
                    component='form'
                    onSubmit={props.status !== undefined ? (e) => handleSubmitStatus(e) :
                        props.userId !== undefined ? (e) => handleDeleteUser(e) :
                            props.contact_id !== undefined ? (e) => handleDeleteContact(e) : (e) => handleDeleteStudent(e)}
                >
                    <Grid container spacing={4} item justifyContent='center' style={{ padding: '10px' }}>
                        <Grid item xs={12} sm={5} lg={4}>
                            <LoadingButton
                                loading={save}
                                loadingPosition='start'
                                variant='contained'
                                color='primary'
                                type='submit'
                                startIcon={props.startIcon}
                                fullWidth
                            >
                                Confirm
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={12} sm={5} lg={4}>
                            <Button
                                variant='contained'
                                color='secondary'
                                fullWidth
                                startIcon={<CancelIcon />}
                                onClick={props.handleClose}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </Paper>
    )
})