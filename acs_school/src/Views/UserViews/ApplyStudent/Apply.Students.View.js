import React from 'react';
import {
    Box,
    Grid,
    Typography,
    Divider,
}
    from '@material-ui/core';
import { useStyles } from '../../../Components/UserComponents/ApplyNow/apply.style';
import CircularProgress from '@mui/material/CircularProgress';
import { FormApply } from '../../../Components/UserComponents/ApplyNow/FormApply'
import RegistrationAPI from '../../../API/registration_api'
import MainLayout from '../../../Layout/Main/MainLayout';
import { AccordionApply } from '../../../Components/UserComponents/ApplyNow/AccordionApply'

function ViewApply() {

    const classes = useStyles()
    const [isLoading, setLoading] = React.useState(true)

    const Conditions = [
        { text: 'You must arrive at the school campus 30 minutes before the exam time.' },
        { text: 'Do not forget to bring your Exam Entry Document, which will be emailed to you after your application on our website, on your day of the exam.' },
        { text: 'Students who are 15 minutes late from the exam time will be admitted to the building but will not be given extra time.' },
        { text: 'Students who arrive later than 15 minutes will not be admitted to the exam.' },
        { text: 'The classrooms and the floors will be assigned to the students upon their arrival at the exam location' }
    ]
    const result = [
        { text: 'Math at least 8/10' },
        { text: 'French at least 7/10' },
        { text: 'Englsih at least 7/10' },
        { text: 'Arabic at least 7/10' },
    ]

    const titles = ['Subject', 'Number Of Questions', 'Duration']
    const titles1 = ['Examination', 'Time', 'Date']
    const Courses = [
        { course: 'Math', row1: 35, row2: '1h' },
        { course: 'French', row1: 25, row2: '1h' },
        { course: 'English', row1: 30, row2: '1h' },
        { course: 'Arabic', row1: 35, row2: '1h' }
    ]

    const scheduleExam = [
        { course: 'Math', row1: '9:30 AM To 10:30 AM', row2: 'Sat 19th Feb 2022' },
        { course: 'French', row1: '10:30 AM To 11:30 AM', row2: 'Mon 19th Feb 2022' },
        { course: 'English', row1: '12:00 PM To 1:00 PM', row2: 'Wed 19th Feb 2022' },
        { course: 'Arabic', row1: '1:15 PM To 2:25 AM', row2: 'Fri 19th Feb 2022' }
    ]

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return (
        <MainLayout
            title='Apply Now'
            titlePage='Register Now'
        >

            {isLoading ?
                <Grid container justifyContent='center' py={15} component={Box}>
                    <CircularProgress />
                </Grid>
                :
                <Grid container component={Box} justifyContent='center' direction='column' py={2}>
                    <Grid item component={Box} py={2}>
                        <Typography variant='h2' className={classes.title}>
                            ScholarShips  Program
                        </Typography>
                    </Grid>
                    <Grid item component={Box} py={2} className={classes.grid}>
                        <Typography variant='h4' className={classes.title1}>
                            Akroum College of Sciences 2022/2023 Scholarships Program <br></br>Selective Examinations
                        </Typography>
                    </Grid>
                    <Grid item component={Box} py={2} className={classes.grid}>
                        <Typography variant='h4' className={classes.title2}>
                            Akroum College of Sciences honors itself with a scholarship program that<br></br> nurtures students potential and discovers talents and skills.
                        </Typography>
                    </Grid>
                    <Divider />
                    <Grid item component={Box} py={2} className={classes.grid}>
                        <Typography variant='h2' className={classes.title3}>
                            Student Information
                        </Typography>
                    </Grid>
                    <Grid item component={Box}>
                        <FormApply
                            onSubmit={(payload) => RegistrationAPI.createRegistration({ ...payload })}
                            className={classes}
                        />
                    </Grid>
                    <Divider />
                    <Grid item component={Box} py={2}>
                        <Typography variant='h5' className={classes.title4}>
                            Please read the following information carefully before applying.
                        </Typography>
                    </Grid>
                    <Grid item component={Box} py={2}>
                        <Typography variant='h5' className={classes.title5}>
                            Exam location is Kafartoun Campus
                        </Typography>
                        <ul style={{ listStyle: 'square' }}>
                            {Conditions.map(({ text }, index) => (
                                <li key={index}>
                                    <Typography variant='h5' align='justify' className={classes.title6} style={{ padding: '5px' }}>
                                        {text}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </Grid>
                    <Grid item component={Box} py={2}>
                        <Typography variant='h2' className={classes.title3}>
                            Academic Excellence Scholarships
                        </Typography>
                    </Grid>
                    <Grid item component={Box} py={2}>
                        <Typography variant='h5' className={classes.title5}>
                            Exams And Grades :
                        </Typography>
                        <ul style={{ listStyle: 'square' }}>
                            {result.map(({ text }, index) => (
                                <li key={index}>
                                    <Typography variant='h5' align='justify' className={classes.title6} style={{ padding: '5px' }}>
                                        {text}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </Grid>
                    <Grid item component={Box}>
                        <AccordionApply
                            summary='Exam Courses'
                            titles={titles}
                            schedule={Courses}
                            classes={classes}
                            expand='panel1'
                            Exam
                        />
                        <AccordionApply
                            summary='Exam Date'
                            titles={titles1}
                            classes={classes}
                            schedule={scheduleExam}
                            expand='panel2'
                            Exam
                        />
                        <AccordionApply
                            summary='Exam Instructions'
                            classes={classes}
                            expand='panel3'
                        />
                    </Grid>
                </Grid>
            }
        </MainLayout>
    )
}

export default ViewApply