import React from 'react';
import { Modal, Paper, Grid, IconButton, Input, Typography } from '@material-ui/core'
import { useStyles } from './Search.style'
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


export function SearchModal(props) {
    const { open, handleClose } = props;
    const classes = useStyles()

    return (
        <Modal open={open} onClose={handleClose}>
            <Paper elevation={3} className={classes.modal}>
                <Grid container direction='column' justifyContent='flex-start'>
                    <Grid item>
                        <Grid container justifyContent='center' alignItems='center'>
                            <Grid item className={classes.title} md={11} sm={11} xs={11}>
                                <Typography variant='h4' style={{ fontFamily: 'Palatino Linotype' }} color='primary'>Searching ...</Typography>
                            </Grid>
                            <Grid item md={1} sm={1} xs={1}>
                                <span >
                                    <IconButton
                                        onClick={handleClose}
                                        color='primary'
                                    >
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Input
                            style={{ paddingLeft: '10px', fontSize: 25 }}
                            placeholder='Search...'
                            color='primary'
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>}
                            fullWidth
                        />
                    </Grid>
                    <Grid item style={{ padding: '10px' }}>
                        <Typography component='p' color='primary' style={{ fontFamily: 'Palatino Linotype' }}>Recent</Typography>
                    </Grid>
                    <Grid item style={{ padding: '15px' }}>

                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )
}