import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import {
    Grid,
    Container,
    Box,
    Typography
}
    from '@material-ui/core';
import { useStyles } from './about.style'
import MainLayout from '../../../Layout/Main/MainLayout'

function About() {
    const [isLoading, setIsLoading] = useState(true);
    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [isLoading])
    const classes = useStyles()
    return (
        <MainLayout
            title='About Us'
            drawerActive='About Us'
            titlePage='Take a look about Our School'
        >
            {isLoading ?
                <Container maxWidth='lg'>
                    <Grid container component={Box} direction='column'>
                        <Grid item component={Box} sm={12}>
                            <Grid container display='block' direction='row'>
                                <Grid item component={Box} py={2} md={2} sm={3} xs={12}>
                                    <Skeleton variant="rectangular" width='150px' height='170px' className={classes.imageManager} />
                                    <Skeleton variant="text" width={140} height={15} />
                                    <Skeleton variant="text" width={120} height={15} />
                                </Grid>
                                <Grid item component={Box} py={3} md={10} sm={9} xs={12}>
                                    <Skeleton variant="text" width={180} height={15} />
                                    <Skeleton variant="text" width={180} height={15} />
                                    <Skeleton variant="text" width='95%' height={15} />
                                    <Skeleton variant="text" width='95%' height={15} />
                                    <Skeleton variant="text" width='95%' height={15} />
                                    <Skeleton variant="text" width='95%' height={15} />
                                    <Skeleton variant="text" width='95%' height={15} />
                                    <Skeleton variant="text" width='30px' height={15} />
                                </Grid>
                            </Grid>
                            <Grid item component={Box} md={12} sm={12} xs={12}>
                                <Grid container justifyContent='center' >
                                    <Grid item component={Box} py={15}>
                                        <CircularProgress />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                :
                <Container maxWidth='lg'>
                    <Grid component={Box} container direction='column' >
                        <Grid item component={Box} sm={12}>
                            <Grid container display='block' direction='row'>
                                <Grid item component={Box} py={2} md={2} sm={3} xs={12}>
                                    <img src='/images/logo/manager2.png' alt='manager' className={classes.imageManager}></img>
                                    <Typography component='h5' className={classes.name1}>Dr Ahmad AHMAD</Typography>
                                    <Typography component='h5' className={classes.name2}>School Manager</Typography>
                                </Grid>
                                <Grid item component={Box} py={2} md={10} sm={9} xs={12}>
                                    <Typography component='h5' className={classes.title}>Founder's Message</Typography>
                                    <Typography component='h5' className={classes.simple}>Dear Parent and Students</Typography>
                                    <Typography component='h5' align='justify' className={classes.text1}>
                                        It is with great pride and excitement that I welcome you, as the General Manager of Aljazari International Schools for Science and Technology. I am honored to have the opportunity to lead the school with such a rich tradition of
                                        education. In Aljazari International Schools for Science and Technology, we believe that knowledge is power. No
                                        power can match the man’s power of cognitive thought or his existential desire for love of knowledge. It is the
                                        main driver of all inventions on this planet since the beginning of creation to the present. Knowledge is a
                                        cumulative sum of experiences in the human life.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item component={Box} py={2} md={11} sm={11} xs={12}>
                            <Typography component='h5' align='justify' className={classes.text1}>
                                It is with great pride and excitement that I welcome you, as the General Manager of Aljazari International Schools for Science and Technology. I am honored to have the opportunity to lead the school with such a rich tradition of education. In Aljazari International Schools for Science and Technology, we believe that knowledge is power.
                            </Typography>
                        </Grid>
                        <Grid item component={Box} py={2} md={11} sm={11} xs={12} >
                            <Typography component='h5' align='justify' className={classes.text1}>
                                It is with great pride and excitement that I welcome you, as the General Manager of Aljazari International Schools
                                for Science and Technology. I am honored to have the opportunity to lead the school with such a rich tradition of
                                education. In Aljazari International Schools for Science and Technology, we believe that knowledge is power. No
                                power can match the man’s power of cognitive thought or his existential desire for love of knowledge. It is the
                                main driver of all inventions on this planet since the beginning of creation to the present. Knowledge is a
                                cumulative sum of experiences in the human life.
                            </Typography>
                        </Grid>
                        <Grid item component={Box} py={2} md={11} sm={11} xs={12}>
                            <Typography component='h5' align='justify' className={classes.text1}>
                                It is with great pride and excitement that I welcome you, as the General Manager of Aljazari International Schools
                                for Science and Technology. I am honored to have the opportunity to lead the school with such a rich tradition of
                                education. In Aljazari International Schools for Science and Technology, we believe that knowledge is power. No
                                power can match the man’s power of cognitive thought or his existential desire for love of knowledge. It is the
                                main driver of all inventions on this planet since the beginning of creation to the present. Knowledge is a
                                cumulative sum of experiences in the human life.
                            </Typography>
                        </Grid>
                        <Grid item component={Box} py={2} >
                            <Typography component='h5' className={classes.text1}>
                                Best regards
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            }
        </MainLayout>
    )
}

export default About