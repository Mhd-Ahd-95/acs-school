import React from 'react';
import { Helmet } from 'react-helmet'
import { Grid, Typography, Container } from '@material-ui/core';
import LayoutStyle from './AuthLayout.Style';
const loader = document.querySelector('body')

export function AuthLayout(props) {

    const classes = LayoutStyle()
    React.useEffect(() => {
        loader.classList.add(classes.background)
        return () => {
            loader.classList.remove(classes.background)
        }
    }, [classes.background])
    return (
        <Grid container className={classes.root}>
            <Helmet>
                <title> ACS | {props.title} </title>
            </Helmet>
            <Grid item xs={12} md={5} >
                <Grid container direction='column' justifyContent='center' className={classes.leftWrapper}>
                    <Grid item>
                        <Typography variant='h3' gutterBottom style={{ fontFamily: 'Palatino Linotype'}}>  Welcome to <b> ACS </b> School </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component='p' className={classes.subtitle}>
                            Akroum College of Sciences
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={7}>
                <Grid container direction='column' className={classes.rightWrapper} >
                    <Grid
                        container
                        direction='column'
                        className={classes.rightWrapper}
                        component={Container}
                        maxWidth='sm'
                        style={{ display: 'flex' }}
                    >
                        <Grid item >
                            <Grid container justifyContent='center' alignItems='center' direction='row'>
                                {props.title === 'Login' ?
                                    <Grid item xs>
                                        <Typography variant='h4' color='textPrimary' className={classes.title}>{props.title}</Typography>
                                    </Grid>
                                    :
                                    <Grid item xs>
                                        <Typography variant='h5' color='textPrimary' className={classes.titleforget}>{props.title}</Typography>
                                    </Grid>
                                }
                                <Grid item xs style={{ height: '120px' }}>
                                    <img src='/images/logo/acsv3.png' alt='logo' height='100' />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            {props.children}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}