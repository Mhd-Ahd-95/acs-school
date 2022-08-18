import React from 'react'
import { Helmet } from 'react-helmet'
import {
    withWidth,
    Grid,
    Paper,
    Box,
    Typography,
} from '@material-ui/core/'
import { CommonAppBar } from '../../Components/CommonComponents/AppBar/AppBar'
import { CommonFooter } from '../../Components/CommonComponents/Footer/Footer'
import MainStyle from './MainLayout.AS.Style'

function CommonMain(props) {
    const classes = MainStyle({ noPadding: props.noPadding, titlePage: props.titlePage })
    const elevation = 3;
    const Wrapper = props.noPaper ? Box : Paper
    const Strong = (title1, title2) => { return <>{title1} <strong style={{ color: '#3f51b5' }}> {title2}</strong></> }
    return (
        <React.Fragment>
            <Helmet>
                <title> ACS | {props.title} </title>
            </Helmet>
            <CommonAppBar
                drawerActive={props.drawerActive}
            />
            <Grid container direction='column' justifyContent='space-between' className={classes.root}>
                {props.titlePage &&
                    <Grid item component={Box} py={2} mb={2}>
                        <Typography variant='h4' className={classes.title} color='textPrimary'>
                            {props.titlePage.includes(':') ? Strong(props.titlePage.split(':')[0], props.titlePage.split(':')[1]) : props.titlePage}
                        </Typography>
                    </Grid>
                }
                <Grid item xs={12}>
                    <Wrapper elevation={elevation} className={classes.paper}>
                        {props.children}
                    </Wrapper>
                </Grid>
            </Grid>
            <CommonFooter />
        </React.Fragment>
    )
}

export default withWidth()(CommonMain)