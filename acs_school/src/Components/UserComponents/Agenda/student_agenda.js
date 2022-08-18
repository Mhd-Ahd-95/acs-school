import React from 'react';
import { Appbar } from '../../../User/Components/appbar/appbars';
import { Footer } from '../../AdminComponents/Footer/footer';
import { Copy } from '../../../User/Components/Copy/copy';
import { Paper, Typography, Box, Container } from '@material-ui/core';
import * as ClassAPI from '../../../API/course_class_cycle';
import moment from 'moment';
import { DisplayAllAgenda } from '../../../Supervisor/Components/Agenda/show_all_agenda';
import * as AgendaAPI from '../../../API/agenda_api';
import { MainLayout } from '../../../Supervisor/Components/Agenda/main_layout';
import { useStyles } from './agenda.styles';
import { useSnackbar } from 'notistack';

export function StudentAgenda() {

    
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const currentDate = new Date();
    const tomorrow = moment(currentDate, 'YYYY-MM-DD').add(1, 'days');
    const lastDate = moment(tomorrow._d).format('YYYY-MM-DD')
    const [date, setDate] = React.useState(lastDate);
    const [allClasses, setAllClasses] = React.useState([]);
    const [clas, setClass] = React.useState('');
    const [data, setData] = React.useState({})

    const [CheckShowAgenda, setCheckShowAgenda] = React.useState(null)

    React.useEffect(() => {
        setCheckShowAgenda(JSON.parse(localStorage.getItem(date)))
        console.log('hi')
    }, [date])

    const getAllClasses = React.useCallback(() => {
        ClassAPI.getAllClasses()
            .then((res) => {
                setAllClasses(res.data)
            })
            .catch((err) => {
                enqueueSnackbar(`Unexpected error — Try again!`, { variant: 'error', })
            })
    }, [])
    React.useEffect(() => {
        getAllClasses()
    }, [getAllClasses])

    const [error, setError] = React.useState(false);

    const getAgendaByDateClass = React.useCallback(() => {
        AgendaAPI.getAgendaByClassDate(date, clas)
            .then(res => {
                setData(res.data)
                setError(false)
            })
            .catch(err => {
                setData(null)
                setError(true)
                if (err.response.status === 400) {
                    enqueueSnackbar(`No agenda for this class — Again!`, { variant: 'info', })
                }
                else {
                    enqueueSnackbar(`Unexpected error — Try again!`, { variant: 'error', })
                }
            })
    }, [date, clas])

    React.useEffect(() => {
        getAgendaByDateClass()
    }, [getAgendaByDateClass])


    const [agendas, setAgendas] = React.useState([])

    const getAllAgendas = React.useCallback(() => {
        AgendaAPI.getAllAgendas(date)
            .then((res) => {
                setAgendas(res.data)
            })
            .catch((err) => {
                enqueueSnackbar(`Unexpected error — Try again!`, { variant: 'error', })
            })
    }, [date])
    React.useEffect(() => {
        getAllAgendas()
    }, [getAllAgendas])

    const handleChange = (e) => {
        setDate(e.target.value)
    }

    const handleChangeClass = (e) => {
        setClass(e.target.value)
    }

    return (
        <>
            <Appbar />
            <Paper elevation={3} className={classes.paper}>
                <Container maxWidth='lg'>
                    <MainLayout
                        title='Agenda'
                        label='Select Class'
                        classes={classes}
                        handleChange={handleChange}
                        handleChangeClass={handleChangeClass}
                        date={date}
                        agendas={agendas}
                        clas={clas}
                        allClasses={allClasses}
                        error={error}
                    />
                    {CheckShowAgenda === true ?
                        <Box>
                            {
                                date === lastDate && clas === '' && agendas !== null ?
                                    <Box>
                                        <Box mt={3} pt={1} pb={3}>
                                            <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                                Tomorrow's agenda — <strong>Go ahead</strong>
                                            </Typography>
                                        </Box>
                                        <Box pt={3} pb={2}>
                                            <DisplayAllAgenda date={date} agendas={agendas} classes={classes} clas={clas} />
                                        </Box>
                                    </Box>
                                    : date > lastDate && clas === '' && agendas !== null ?
                                        <Box>
                                            <Box mt={3} pt={1} pb={3}>
                                                <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                                    Pay Attention the Date is not date — <strong>Tomorrow</strong>
                                                </Typography>
                                            </Box>
                                            <Box pt={3} pb={2}>
                                                <DisplayAllAgenda date={date} agendas={agendas} classes={classes} clas={clas} />
                                            </Box>
                                        </Box>
                                        : date === lastDate && clas === '' && agendas === null ?
                                            <Box>
                                                <Box mt={3} pt={1} pb={3}>
                                                    <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                                        Tomorrow's agenda hasn't been created yet — <strong>Wait!</strong>
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            : date !== lastDate && clas === '' && agendas === null ?
                                                <Box>
                                                    <Box mt={3} pt={1} pb={3}>
                                                        <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                                            No agenda in this Date — <strong>Select Other</strong>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                : date === lastDate && clas !== '' && agendas !== null && data !== null ?
                                                    <Box>
                                                        <Box mt={3} pt={1} pb={3}>
                                                            <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                                                This Agenda for Class — <strong>{clas}</strong>
                                                            </Typography>
                                                        </Box>
                                                        <Box pt={3} pb={2}>
                                                            <DisplayAllAgenda date={date} agendas={agendas} classes={classes} clas={clas} />
                                                        </Box>
                                                    </Box>
                                                    : date === lastDate && clas !== '' && agendas !== null && data === null ?
                                                        <Box>
                                                            <Box mt={3} pt={1} pb={3}>
                                                                <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                                                    There is no Agneda for class — <strong>{clas}</strong>
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        : date !== lastDate && clas === '' && agendas !== null ?
                                                            <Box>
                                                                <Box mt={3} pt={1} pb={3}>
                                                                    <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                                                        Pay Attention the Date is not date — <strong>Tomorrow</strong>
                                                                    </Typography>
                                                                </Box>
                                                                <Box pt={3} pb={2}>
                                                                    <DisplayAllAgenda date={date} agendas={agendas} classes={classes} clas={clas} />
                                                                </Box>
                                                            </Box>
                                                            : date !== lastDate && clas !== '' && agendas !== null && data !== null ?
                                                                <Box>
                                                                    <Box mt={3} pt={1} pb={3}>
                                                                        <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                                                            This Agenda for Class — <strong>{clas}</strong>
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box pt={3} pb={2}>
                                                                        <DisplayAllAgenda date={date} agendas={agendas} classes={classes} clas={clas} />
                                                                    </Box>
                                                                </Box>
                                                                : date !== lastDate && clas !== '' && agendas !== null && data === null ?
                                                                    <Box>
                                                                        <Box mt={3} pt={1} pb={3}>
                                                                            <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                                                                There is no Agneda for class — <strong>{clas}</strong>
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                    :
                                                                    null}
                        </Box>
                        :
                        <Box>
                            <Box mt={3} pt={1} pb={3}>
                                <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                    Agenda does not send yet — <strong>Pending!</strong>
                                </Typography>
                            </Box>
                        </Box>
                    }
                </Container>
            </Paper>
            <Footer />
            <Copy />
        </>

    )
}