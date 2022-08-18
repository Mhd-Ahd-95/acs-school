import React from 'react';
import {Grid, Box} from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import {LoadingButton} from '@mui/lab';
import AgendaAPI from '../../../API/agenda_api'
import {useSnackbar} from 'notistack'

export function SendAgendaToStudent(props) {
    const [loading, setLoading] = React.useState(false)
    const {enqueueSnackbar} = useSnackbar()

    const handleUpdateAgenda = (e) => {
        e.preventDefault();
        setLoading(true);
        AgendaAPI.updateAgendas(props.agendas)
            .then((res) =>
                enqueueSnackbar('Agenda has been sent', { variant: 'success'})
            )
            .catch((err) =>
                enqueueSnackbar('Failed to sent agendas', { variant: 'error'})
            )
            .finally(()=> { setLoading(false) })
    }    

    return (
        <Grid container justifyContent='flex-end'>
            <Grid item component={Box} md={3} sm={4} xs={12}>
                <LoadingButton
                loading={loading}
                    variant='contained'
                    fullWidth
                    color='secondary'
                    startIcon={<SendIcon />}
                    onClick={(e) => handleUpdateAgenda(e)}
                    loadingPosition='start'
                >
                    Send
                </LoadingButton>
            </Grid>
        </Grid>
    )
}