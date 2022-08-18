import React from 'react';
import { MainForm } from '../../../Components/SupervisorComponents/Agenda/MainField'
import { Typography, Box, Container } from '@material-ui/core';
import { useStyles } from './ShowAgenda.Style';
import ClassAPI from '../../../API/course_class_cycle';
import moment from 'moment';
import { DisplayAllAgenda } from '../../../Components/SupervisorComponents/Agenda/DisplayAllAgenda';
import AgendaAPI from '../../../API/agenda_api';
import { DeleteAgenda } from '../../../Components/SupervisorComponents/Agenda/DeleteAgenda';
import { SendAgendaToStudent } from '../../../Components/SupervisorComponents/Agenda/SendAgendaStudent';
import { useSnackbar } from 'notistack';
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'

export default function CheckAgendaCreated() {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar()
    const currentDate = new Date();
    const tomorrow = moment(currentDate, 'YYYY-MM-DD').add(1, 'days');
    const lastDate = moment(tomorrow._d).format('YYYY-MM-DD')
    const [date, setDate] = React.useState(lastDate);
    const [allClasses, setAllClasses] = React.useState([]);
    const [clas, setClass] = React.useState('');
    const [data, setData] = React.useState({})


    const getAllClasses = React.useCallback(() => {
        ClassAPI.getAllClasses()
            .then((res) => {
                setAllClasses(res.data)
            })
            .catch((err) => {
                enqueueSnackbar(`Failed to load classes — Try again!`, { variant: 'error', })
            })
    }, [enqueueSnackbar])
    React.useEffect(() => {
        getAllClasses()
    }, [getAllClasses])

    const [agendas, setAgendas] = React.useState([])

    const getAllAgendas = React.useCallback(() => {
        const gdate = moment(date).format('YYYY-MM-DD 00:00:00')
        AgendaAPI.getAgendaByDate(gdate)
            .then((res) => {
                setAgendas(res.data)
            })
            .catch((err) => {
                enqueueSnackbar(` Failed to load agenda with this date — Try again!`, { variant: 'error', })
            })
    }, [date, enqueueSnackbar])
    React.useEffect(() => {
        getAllAgendas()
    }, [getAllAgendas])

    const [error, setError] = React.useState(false);
    const getAgendaByDateClass = React.useCallback(() => {
        const gdate = moment(date).format('YYYY-MM-DD 00:00:00')
        if (clas) {
            AgendaAPI.getAgendaByClassDate(gdate, clas)
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
        }
    }, [date, clas, enqueueSnackbar])

    React.useEffect(() => {
        getAgendaByDateClass()
    }, [getAgendaByDateClass])

    const handleClass = () => {
        setClass('')
    }

    const handleChange = (e) => {
        setDate(e.target.value)
    }

    const handleChangeClass = (e) => {
        setClass(e.target.value)
    }

    return (
        <CommonMain
            title='Show Agenda'
            titlePage={`Check Agena for this : ${date}`}
            drawerActive={'Show Agenda'}
        >
            <Container maxWidth='lg'>
                <MainForm
                    label='Delete Class'
                    classes={classes}
                    handleChange={handleChange}
                    handleChangeClass={handleChangeClass}
                    date={date}
                    agendas={agendas}
                    error={error}
                    clas={clas}
                    allClasses={allClasses}
                />
                {
                    date === lastDate && clas === '' && agendas !== null ?
                        <Box>
                            <Box mt={3} pt={1} pb={3}>
                                <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                    Tomorrow's agenda — <strong>Go ahead</strong>
                                </Typography>
                            </Box>
                            <Box pt={3} pb={2}>
                                <DisplayAllAgenda date={date} agendas={agendas} classes={classes} clas={clas} sendAgenda={<SendAgendaToStudent agendas={agendas}/>} />
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
                                    <DisplayAllAgenda date={date} agendas={agendas} clas={clas} classes={classes} sendAgenda={<SendAgendaToStudent />} />
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
                                :
                                date < lastDate && clas === '' && agendas !== null ?
                                    <Box>
                                        <Box mt={3} pt={1} pb={3}>
                                            <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                                Pay Attention this Agenda is old — <strong>Be carefully</strong>
                                            </Typography>
                                        </Box>
                                        <Box pt={3} pb={2}>
                                            <DisplayAllAgenda date={date} agendas={agendas} clas={clas} classes={classes} sendAgenda={<SendAgendaToStudent />} />
                                        </Box>
                                    </Box>
                                    :
                                    date !== lastDate && clas === '' && agendas === null ?
                                        <Box>
                                            <Box mt={3} pt={1} pb={3}>
                                                <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                                    No agenda in this Date — <strong>Select Other</strong>
                                                </Typography>
                                            </Box>
                                        </Box>
                                        : date === lastDate && clas !== '' && data !== null ?
                                            <Box>
                                                <Box mt={3} pt={1} pb={3}>
                                                    <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                                        Delete {clas} agenda — <strong>Be carefully</strong>
                                                    </Typography>
                                                </Box>
                                                <DeleteAgenda className={clas} date={date} allClass={allClasses} data={data} handleClass={handleClass} handleAgenda={getAllAgendas} />
                                            </Box>
                                            : date === lastDate && clas !== '' && data === null ?
                                                <Box>
                                                    <Box mt={3} pt={1} pb={3}>
                                                        <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                                            There is no Agenda for this Date and this Class to Delete — <strong>Checking!</strong>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                : date !== lastDate && clas !== '' && data !== null ?
                                                    <Box>
                                                        <Box mt={3} pt={1} pb={3}>
                                                            <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                                                Delete {clas} agenda — <strong>Be carefully</strong>
                                                            </Typography>
                                                        </Box>
                                                        <DeleteAgenda className={clas} date={date} allClass={allClasses} data={data} handleClass={handleClass} handleAgenda={getAllAgendas} />
                                                    </Box>
                                                    : date !== lastDate && clas !== '' && data === null ?
                                                        <Box>
                                                            <Box mt={3} pt={1} pb={3}>
                                                                <Typography align="center" variant="h6" className={classes.titleAgendaShow}>
                                                                    There is no Agenda for this Date and this Class to Delete — <strong>Checking!</strong>
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        : null
                }
            </Container>
        </CommonMain>
    )
}