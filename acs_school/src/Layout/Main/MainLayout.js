import React from 'react'
import { Helmet } from 'react-helmet'
import {
    withWidth,
    Grid,
    Paper,
    Box,
    Typography,
} from '@material-ui/core/'
import { Appbar } from '../../Components/UserComponents/appbar/appbars'
import { Footer } from '../../Components/UserComponents/Footer/footer'
import { Copy } from '../../Components/UserComponents/Copy/copy'
import MainStyle from './MainStyle'

function Main(props) {
    const classes = MainStyle({ noPadding: props.noPadding })
    const elevation = 3;
    return (
        <React.Fragment>
            <Helmet>
                <title> ACS | {props.title} </title>
            </Helmet>
            <Appbar
                drawerActive={props.drawerActive}
            />
            <Grid container direction='column' justifyContent='space-between' className={classes.root}>
                {props.titlePage &&
                    <Grid item component={Box} py={2}>
                        <Typography variant='h4' className={classes.title} color='textPrimary'>
                            {props.titlePage}
                        </Typography>
                    </Grid>
                }
                <Grid item >
                    <Paper elevation={elevation} className={classes.paper}>
                        {props.children}
                    </Paper>
                </Grid>
            </Grid>
            <Footer />
            <Copy />
        </React.Fragment>
    )
}

export default withWidth()(Main)