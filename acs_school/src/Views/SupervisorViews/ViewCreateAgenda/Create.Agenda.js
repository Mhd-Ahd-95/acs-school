import React from 'react';
import { useStyles } from './CreateAgenda.Styles';
import {
    Container,
    Grid,
    TextField,
    Box,
    MenuItem,
    IconButton,
    Checkbox,
}
    from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import ClassAPI from '../../../API/course_class_cycle';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import AgendaAPI from '../../../API/agenda_api'
import moment from 'moment';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSnackbar } from 'notistack';
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'

export default function CreateAgenda() {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const currentDate = new Date();
    const tomorrow = moment(currentDate).add(1, 'days')
    const lastDate = moment(tomorrow._d).format('YYYY-MM-DD')
    const [date, setDate] = React.useState(lastDate)
    const [loading, setLoading] = React.useState(false);
    const [listClasses, setListClasses] = React.useState([]);
    const [inputFields, setInputFields] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [agenda, setAgenda] = React.useState([]);

    const getAllClasses = React.useCallback(() => {
        ClassAPI.getAllClasses()
            .then((res) => {
                setListClasses(res.data)
            })
            .catch((err) => {
                enqueueSnackbar(`Failed to load classes`, { variant: 'error',})
            })
    }, [enqueueSnackbar])

    const handleAgendasByClasses = React.useCallback(() => {
        const gdate = moment(date).format('YYYY-MM-DD 00:00:00')
        AgendaAPI.getAgendaByDate(gdate)
            .then((res) => {
                const result = res.data
                setAgenda(result)
            })
            .catch((err) => {
                enqueueSnackbar(`Failed to load Agenda`, { variant: 'error',})
            })
    }, [date, enqueueSnackbar])


    const handleAddFields = () => {
        const values = [...inputFields, { agenda: '', className: '', checked_exam: false }];
        setInputFields(values)
    }
    const handleRemoveFields = (index) => {
        const values = [...inputFields]
        values.splice(index, 1)
        setInputFields(values)
    }
    const handleChangeInput = (index, event) => {
        const values = [...inputFields]
        values[index][event.target.name] = event.target.value
        setInputFields(values)
    }

    const handleChangeChecked = (event, index) => {
        const values = [...inputFields]
        values[index][event.target.name] = event.target.checked
        setInputFields(values)
    }


    const handleSubmitAgenda = (e) => {
        setLoading(true);
        e.preventDefault();
        const AllData = inputFields
        AllData.forEach(data => data['agenda_date'] = moment(date).format('YYYY-MM-DD 00:00:00'))
        const agendaData = {
            'agendas': AllData
        }
        console.log(agendaData)
        AgendaAPI.createAgenda(agendaData)
            .then((res) => {
                const result = res.data.statuses
                for (let i of result) {
                    if (i.status === 'FAILED' && i.error === "Agenda date cannot be created less than today's date") {
                        enqueueSnackbar(`Agenda date cannot be created less than today's date`, { variant: 'error', })
                        setError(true)
                    }
                    else if (i.status === 'UPDATED') {
                        enqueueSnackbar(`Agenda has been updated`, { variant: 'success', })
                    }
                    else {
                        enqueueSnackbar(`Agenda has been Created`, { variant: 'success', })
                    }
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    enqueueSnackbar(`Cannot create agenda with duplicate class — Try again!`, { variant: 'warning', })
                }
                else {
                    enqueueSnackbar(` Unexpected error — Contact admin! or Try again!`, { variant: 'error', })
                }
            })
            .finally(() => { setLoading(false) })
    }
    React.useEffect(() => {
        handleAgendasByClasses()
        getAllClasses()
    }, [handleAgendasByClasses, getAllClasses])

    React.useEffect(() => {
        const resultAgenda = []
        if (agenda.length === 0) {
            listClasses.map(clss => (clss.cls_school)).forEach(cls => resultAgenda.push({ agenda: '', className: cls, checked_exam: false }))
            setInputFields(resultAgenda)
           
        }
        else {
            listClasses.map(clss => (clss.cls_school)).forEach(cls => {
                if (!(agenda.map(agd => (agd.className))).includes(cls)) {
                    resultAgenda.push({ agenda: '', className: cls, checked_exam: false })
                }
            })
            const inputAgenda = agenda.concat(resultAgenda)
            inputAgenda.sort((a, b) => (a.className > b.className) ? 1 : (a.className < b.className) ? -1 : 0)
            setInputFields(inputAgenda)
        }
    }, [agenda, listClasses])
return (
    <CommonMain
        title='Create Agenda'
        titlePage='Create Agenda'
        drawerActive='Create Agenda'
        noPaper
    >
            <Container maxWidth='lg'>
                <Grid container component='form' onSubmit={(e) => handleSubmitAgenda(e)} spacing={3} >
                    <Grid item component={Box} md={12} sm={12} xs={12}>
                        <TextField
                            variant='outlined'
                            fullWidth
                            label='Date'
                            required
                            type='date'
                            name='agenda_date'
                            error={error}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    {
                        inputFields.map((field, i) => (
                            <Grid item component={Box} py={2} key={i} md={6} sm={12} xs={12}>
                                <Grid container direction='row'>
                                    <Grid item component={Box} md={8} sm={8} xs={6} py={2}>
                                        <TextField
                                            label='Class'
                                            name='className'
                                            fullWidth
                                            required
                                            select
                                            disabled={date < lastDate ? true : false}
                                            variant='outlined'
                                            value={field.className || ''}
                                            default={field.className || ''}
                                            onChange={(e) => handleChangeInput(i, e)}
                                        >
                                            {listClasses.map(cls => (
                                                <MenuItem value={cls.cls_school} key={cls.id}>
                                                    {cls.cls_school}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item component={Box} md={4} sm={4} xs={6} py={2}>
                                        <Grid container justifyContent='center'>
                                            <Grid item component={Box}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name='checked_exam'
                                                            checked={field.checked_exam}
                                                            default={field.checked_exam}
                                                            onChange={(e) => handleChangeChecked(e, i)}
                                                            disabled={date < lastDate ? true : false}
                                                        />}
                                                    label="Exam"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item component={Box} md={12} sm={12} xs={12}>
                                    <Grid container>
                                        <Grid item md={12} sm={12} xs={12}>
                                            <TextField
                                                variant='outlined'
                                                fullWidth
                                                label='Agenda'
                                                required
                                                multiline
                                                disabled={date < lastDate ? true : false}
                                                rows={5}
                                                name='agenda'
                                                value={field.agenda || ''}
                                                default={field.agenda || ''}
                                                onChange={(e) => handleChangeInput(i, e)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container justifyContent='flex-end' spacing={1}>
                                        {inputFields.length > 1 ?
                                            <Grid item md={1} sm={1} xs={1}>
                                                <IconButton className={classes.btnAdd} onClick={() => handleRemoveFields(i)}>
                                                    <RemoveIcon />
                                                </IconButton>
                                            </Grid>
                                            :
                                            null
                                        }
                                        {inputFields.length !== listClasses.length ?
                                            <Grid item md={1} sm={2} xs={1}>
                                                <IconButton className={classes.btnAdd} onClick={() => handleAddFields()}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Grid>
                                            :
                                            null
                                        }
                                    </Grid>
                                </Grid>


                            </Grid>
                        ))
                    }
                    <Grid item component={Box} py={2} sm={12} xs={12} md={12}>
                        <Grid container justifyContent='flex-end'>
                            <Grid item component={Box} md={2} sm={4} xs={12}>
                                <LoadingButton
                                    loading={loading}
                                    loadingPosition='start'
                                    variant='contained'
                                    type='submit'
                                    fullWidth
                                    color='primary'
                                    startIcon={<SaveIcon />}
                                >
                                    {loading ? 'PROCESSING' : 'SAVE'}
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Container>
    </CommonMain>
)
}