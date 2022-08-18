import React from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import {
    Container,
    Grid,
    Typography,
    Box,
    Divider
}
    from '@material-ui/core';
import { useStyles } from './student.style'
import MainLayout from '../../../Layout/Main/MainLayout';

function StudentLife() {

    const elevation = 3
    const classes = useStyles()

    React.useEffect(() => {
        Aos.init({ duration: 2000 })
    }, []);

    return (
        <MainLayout
            title="Student Life"
            drawerActive='Student Life'
            titlePage='ACS Students Life'
        >
            <Container maxWidth='lg'>
                <Grid container component={Box} justifyContent='center'>
                    <Typography variant='h2' className={classes.title}>
                        Service Units
                    </Typography>
                </Grid>
                <Grid container component={Box} direction='row' py={2} style={{ marginBottom: '25px' }}>
                    <Grid item component={Box} md={4} sm={12} xs={12} py={2} data-aos='fade-right'>
                        <img src='/images/image_home/nutrition.png' alt='Nutrition' className={classes.imgNutrition}></img>
                    </Grid>
                    <Grid item component={Box} md={7} sm={12} xs={12} py={2} data-aos='fade-up' >
                        <Typography component='h2' className={classes.nutrition}>
                            Nutrition
                        </Typography>
                        <Typography className={classes.nutritionText} component='h5' align='justify'>
                            At Akroum College of Sciences, where development is designed in integrity,
                            with special emphasis on physical development and health conditions,
                            our meals are created under observation of dieticians and nutritionists.<br></br>
                            Prepared meals are subjected to taste control and the proportions of sauces and
                            oils are prepared in consideration to nutritional details.<br></br>
                            Raw material production is controlled and animals are slaughtered in
                            accordance with the procedure.
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container component={Box} direction='row' py={2} style={{ marginBottom: '25px' }} >
                    <Grid item component={Box} md={4} sm={12} xs={12} py={2} data-aos='fade-right'>
                        <img src='/images/image_home/security.png' alt='Security' className={classes.imgNutrition}></img>
                    </Grid>
                    <Grid item component={Box} md={7} sm={12} xs={12} py={2} data-aos='fade-up'>
                        <Typography component='h2' className={classes.nutrition}>
                            Security
                        </Typography>
                        <Typography className={classes.nutritionText} component='h5' align='justify'>
                            Aljazari School adopts policies that take into consideration our students,
                            teachers, administrators and school staff within the scope of security:
                        </Typography>
                        <ul style={{ listStyle: 'square' }}>
                            <li>
                                <Typography className={classes.nutritionText} component='h5'>
                                    Students & Teachers Entry
                                </Typography>
                            </li>
                            <li>
                                <Typography className={classes.nutritionText} component='h5'>
                                    Visitors & Parents Entry
                                </Typography>
                            </li>
                            <li>
                                <Typography className={classes.nutritionText} component='h5'>
                                    Security measures taken
                                </Typography>
                            </li>
                            <li>
                                <Typography className={classes.nutritionText} component='h5'>
                                    Security Training
                                </Typography>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container component={Box} direction='row' py={2} style={{ marginBottom: '25px' }}>
                    <Grid item component={Box} md={4} sm={12} xs={12} py={2} data-aos='fade-right'>
                        <img src='/images/image_home/health.png' alt='Nutrition' className={classes.imgNutrition}></img>
                    </Grid>
                    <Grid item component={Box} md={7} sm={12} xs={12} py={2} data-aos='fade-up'>
                        <Typography component='h2' className={classes.nutrition}>
                            Health
                        </Typography>
                        <Typography className={classes.nutritionText} component='h5' align='justify'>
                            At Akroum College of Sciences, where development is designed in integrity,
                            with special emphasis on physical development and health conditions,
                            our meals are created under observation of dieticians and nutritionists.<br></br>
                            Prepared meals are subjected to taste control and the proportions of sauces and
                            oils are prepared in consideration to nutritional details.<br></br>
                            Raw material production is controlled and animals are slaughtered in
                            accordance with the procedure.
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container component={Box} direction='row' py={2} style={{ marginBottom: '25px' }}>
                    <Grid item component={Box} md={4} sm={12} xs={12} py={2} data-aos='fade-right'>
                        <img src='/images/image_home/heigyne.png' alt='Nutrition' className={classes.imgNutrition}></img>
                    </Grid>
                    <Grid item component={Box} md={7} sm={12} xs={12} py={2} data-aos='fade-up'>
                        <Typography component='h2' className={classes.nutrition}>
                            Hygiene
                        </Typography>
                        <Typography className={classes.nutritionText} component='h5' align='justify'>
                            At Akroum College of Sciences, where development is designed in integrity,
                            with special emphasis on physical development and health conditions,
                            our meals are created under observation of dieticians and nutritionists.<br></br>
                            Prepared meals are subjected to taste control and the proportions of sauces and
                            oils are prepared in consideration to nutritional details.<br></br>
                            Raw material production is controlled and animals are slaughtered in
                            accordance with the procedure.
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container component={Box} direction='row' py={2} style={{ marginBottom: '25px' }}>
                    <Grid item component={Box} md={4} sm={12} xs={12} py={2} data-aos='fade-right'>
                        <img src='/images/image_home/transportation.png' alt='Nutrition' className={classes.imgNutrition}></img>
                    </Grid>
                    <Grid item component={Box} md={7} sm={12} xs={12} py={2} data-aos='fade-up'>
                        <Typography component='h2' className={classes.nutrition}>
                            Transportation
                        </Typography>
                        <Typography className={classes.nutritionText} component='h5' align='justify'>
                            At Akroum College of Sciences, where development is designed in integrity,
                            with special emphasis on physical development and health conditions,
                            our meals are created under observation of dieticians and nutritionists.<br></br>
                            Prepared meals are subjected to taste control and the proportions of sauces and
                            oils are prepared in consideration to nutritional details.<br></br>
                            Raw material production is controlled and animals are slaughtered in
                            accordance with the procedure.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </MainLayout>
    )
}

export default StudentLife