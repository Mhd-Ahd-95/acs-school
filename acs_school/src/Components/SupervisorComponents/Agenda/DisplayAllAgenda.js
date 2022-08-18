import React from 'react';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { TextField } from '@mui/material';
import moment from 'moment';

export function DisplayAllAgenda(props) {


    return (
        <Container maxWidth={'lg'}>
            <Grid container spacing={3} direction='column'>
                {props.agendas != null ?
                    <>
                        {props.agendas
                            .filter(agenda => {
                                if (agenda === '') {
                                    return agenda
                                }
                                else if (agenda.className.toLowerCase().includes(props.clas.toLocaleLowerCase())) {
                                    return agenda
                                }
                            })
                            .map(agd => (
                                <Grid item component={Box} key={agd.agenda_id}>
                                    <Box p={2} style={{ border: '1px solid rgba(0, 0, 0, 0.25)' }}>
                                        <Grid container spacing={2} direction='row'>
                                            {agd.checked_exam === true ?
                                                <Grid item md={12} sm={12} xs={12}>
                                                    <Typography variant='h5' className={props.classes.Checked}>
                                                        You have Exam
                                                    </Typography>
                                                </Grid>
                                                :
                                                null
                                            }
                                            <Grid item md={4} sm={5} xs={12}>
                                                <Grid container spacing={2} direction='column'>
                                                    <Grid item component={Box} md={12} sm={12} xs={12}>
                                                        <TextField
                                                            label='Class Name'
                                                            name='className'
                                                            value={agd.className}
                                                            fullWidth
                                                            disabled
                                                        />
                                                    </Grid>
                                                    <Grid item component={Box} md={12} sm={12} xs={12}>
                                                        <TextField
                                                            label='Date created'
                                                            name='Date'
                                                            value={moment(agd.creation_date).format('YYYY-MM-DD - dddd')}
                                                            fullWidth
                                                            disabled
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item component={Box} md={8} sm={7} xs={12}>
                                                <TextField
                                                    label='Agenda'
                                                    name='agenda'
                                                    fullWidth
                                                    value={agd.agenda}
                                                    multiline
                                                    rows={4}
                                                    disabled
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            ))}

                        <Grid item sm={12} xs={12} md={12}>
                            {props.sendAgenda}
                        </Grid>
                    </>
                    :
                    null

                }
            </Grid>
        </Container>
    )
}