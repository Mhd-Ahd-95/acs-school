import React from 'react';
import { Paper, Grid, Typography, Button, } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { useStyles } from './AddUser.Styles'
import CancelIcon from '@mui/icons-material/Cancel';
import { useSnackbar } from 'notistack';
import UserAPI from '../../../API/user_api'

export const ConfirmModal = React.forwardRef((props, ref) => {
    const { enqueueSnackbar } = useSnackbar()
    const classes = useStyles();
    const [save, setSave] = React.useState(false);

    const handleDeleteUser = (e) => {
       e.preventDefault();
       setSave(true)
       UserAPI.deleteUser(props.id)
        .then(() => {
            enqueueSnackbar('User deleted successfully', { variant: 'success'})
            props.handleSubmit()
        })
        .catch((err) => {
            enqueueSnackbar('Failed to delete user', { variant: 'error'})
        })
        .finally(() => { setSave(false)})
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
                    onSubmit={(e) => handleDeleteUser(e)}
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