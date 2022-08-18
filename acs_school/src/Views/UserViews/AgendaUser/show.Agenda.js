import React from 'react';
import MainLayout from '../../../Layout/Main/MainLayout'
import { Container, Grid, TextField, Box, MenuItem, Typography, CircularProgress } from '@material-ui/core'
import moment from 'moment';
import ClassAPI from '../../../API/course_class_cycle'
import AgendaAPI from '../../../API/agenda_api'
import { useSnackbar } from 'notistack'
import { useStyles } from './ShowAgenda.Styles'


function ShowUserAgenda() {

    const { enqueueSnackbar } = useSnackbar()
    const currentDate = new Date();
    const tomorrow = moment(currentDate).add(1, 'days')
    const lastDate = moment(tomorrow._d).format('YYYY-MM-DD')
    const [date, setDate] = React.useState(lastDate)
    const [classes, setClasses] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [cls, setCls] = React.useState('')
    const [agenda, setAgenda] = React.useState({})
    const [load, setLoad] = React.useState(false)
    const styles = useStyles()

    const handleClasses = React.useCallback(() => {
        setLoading(true)
        ClassAPI.getAllClasses()
            .then(res => {
                setClasses(res.data)
            })
            .catch(err => { enqueueSnackbar('Failed to get all classes', { variant: 'error' }) })
            .finally(() => setLoading(false))
    }, [enqueueSnackbar])

    React.useEffect(() => { handleClasses() }, [handleClasses])

    const handleAgenda = React.useCallback(() => {
        const gdate = moment(date).format('YYYY-MM-DD 00:00:00')
        setLoad(true)
        AgendaAPI.getAgendaByClassDate(gdate, cls)
            .then(res => {
                setAgenda(res.data)
            })
            .catch(err => {
                setAgenda(null)
                {
                    err.response.status === 400 ?
                        enqueueSnackbar('No agenda available', { variant: 'warning' })
                        :
                        enqueueSnackbar('Failed to load agenda', { variant: 'error' })
                }
            })
            .finally(() => setLoad(false))
    }, [date, cls, enqueueSnackbar])

    React.useEffect(() => {
        if (cls !== '') handleAgenda()
    }, [handleAgenda])
    return (
        <MainLayout
            title='Show Agenda'
            drawerActive='Agenda'
            titlePage='Agenda'
        >
            {loading ?
                <Grid container justifyContent='center' py={15} component={Box}>
                    <CircularProgress />
                </Grid>
                :

                <Container maxWidth='lg'>
                    <Grid container component={Box} py={2} spacing={2}>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextField
                                label='Date'
                                variant='outlined'
                                type='date'
                                fullWidth
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextField
                                label='Class'
                                required
                                variant='outlined'
                                fullWidth
                                select
                                value={cls}
                                onChange={(e) => setCls(e.target.value)}
                            >
                                {classes.map(cls => (
                                    <MenuItem key={cls.id} value={cls.cls_school}>
                                        {cls.cls_school}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    {cls === '' ?
                        <Box mt={3} pt={14} pb={16}>
                            <Typography align="center" variant="h6" style={{ fontFamily: 'Palatino Linotype' }}>
                                Please select Class
                            </Typography>
                        </Box>
                        :
                        <Container maxWidth='md'>
                            {load ?
                                <Grid container justifyContent='center' py={15} component={Box}>
                                    <CircularProgress />
                                </Grid>
                                : agenda === null ?
                                    <Box mt={3} pt={14} pb={16}>
                                        <Typography align="center" variant="h6" color='secondary' style={{ fontFamily: 'Palatino Linotype' }}>
                                            No agenda available
                                        </Typography>
                                    </Box> :
                                    agenda.status === 'close' ?
                                        <Box mt={3} pt={14} pb={16}>
                                            <Typography align="center" variant="h6" color='secondary' style={{ fontFamily: 'Palatino Linotype' }}>
                                                Pending Agenda
                                            </Typography>
                                        </Box> :
                                        <Grid container spacing={2}>
                                            <Grid component={Box} py={4} width='100%'>
                                                <Box mt={1} className={styles.agenda}>
                                                    {agenda?.agenda?.split('\n').map((agd, index) => (
                                                        <Typography key={index} variant="h6" align='justify' color='primary' className={styles.text}>
                                                            {index + 1}- {agd}
                                                        </Typography>
                                                    ))}
                                                </Box>
                                            </Grid>
                                        </Grid>
                            }
                        </Container>
                    }
                </Container>
            }
        </MainLayout >
    )
}

export default ShowUserAgenda