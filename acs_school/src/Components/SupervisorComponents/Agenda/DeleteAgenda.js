import React from 'react';
import { Box, Container, TextField, Grid, MenuItem } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab'
import AgendaAPI from '../../../API/agenda_api';
import { useSnackbar } from 'notistack';

export function DeleteAgenda(props) {

    const { enqueueSnackbar } = useSnackbar()
    const [save, setSave] = React.useState(false)

    const DeleteAgenda = (e) => {
        e.preventDefault();
        setSave(true)
        const id = props.data.agenda_id
        AgendaAPI.deleteAgenda(id)
            .then(res => {
                setSave(false)
                enqueueSnackbar(`Delete Agenda has been successfully`, { variant: 'success', })
                props.handleAgenda()
                props.handleClass()
            })
            .catch(err => {
                enqueueSnackbar(`Unexpected error — Contact admin! or Try again!`, { variant: 'error', })
                setSave(false)
            })
    }

    return (
        <Box>
            <Container maxWidth={'md'}>
                <Grid container spacing={2} component='form' direction='column' onSubmit={(e) => DeleteAgenda(e)}>
                    <Grid item component={Box}>
                        <Grid container spacing={2} direction='row'>
                            <Grid item component={Box} py={2} md={3} sm={12} xs={12}>
                                <TextField
                                    label='Class Name'
                                    variant='outlined'
                                    name='className'
                                    fullWidth
                                    select
                                    disabled
                                    value={props.data.className || ''}
                                    default={props.data.className || ''}
                                    required
                                >
                                    {props.allClass.map(cls => (
                                        <MenuItem value={cls.cls_school} key={cls.id}>
                                            {cls.cls_school}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item component={Box} py={2} md={9} sm={12} xs={12}>
                                <TextField
                                    label='Agenda'
                                    name='agenda'
                                    variant='outlined'
                                    fullWidth
                                    value={props.data.agenda || ''}
                                    default={props.data.agenda || ''}
                                    multiline
                                    disabled
                                    rows={4}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item component={Box} style={{ paddingBottom: '20px' }}>
                        <Grid container spacing={2} justifyContent='flex-end'>
                            <Grid item component={Box} py={2} md={2} sm={12} xs={12}>
                                <LoadingButton
                                    loading={save}
                                    type='submit'
                                    variant='contained'
                                    color='secondary'
                                    fullWidth
                                    loadingPosition='start'
                                    style={{ fontFamily: 'Palatino Linotype' }}
                                    startIcon={<DeleteIcon />}

                                >
                                    Delete
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}