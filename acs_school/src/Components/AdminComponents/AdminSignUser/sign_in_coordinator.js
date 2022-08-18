import React from 'react';
import { Grid, Container, Box, TextField, Paper } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingButton } from '@mui/lab'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import * as UserAPI from '../../../API/user_api'
import { Appbar } from '../../../Admin/Components/AppBar/Appbar'
import { Footer } from '../Footer/footer'
import { Copy } from '../../../User/Components/Copy/copy'
import { useStyles } from './signin.style';
import { useSnackbar } from 'notistack';

export function CreateCoordinator(props) {

    const { enqueueSnackbar } = useSnackbar()
    const [isLoading, setLoading] = React.useState(true)
    const [save, setSave] = React.useState(false);

    const [firstname, setFirstName] = React.useState('');
    const [lastname, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {

        setSave(true)
        e.preventDefault();
        const userData = {
            'email': email,
            'first_name': firstname,
            'last_name': lastname,
            'password': password,
            'address': address,
            'phone': phone,
            'user_role': props.type.type,

        }
        UserAPI.create_user(userData)
            .then((res) => {
                enqueueSnackbar(`Your subimt has been successfully — Thanks!`, { variant: 'success', })
                setSave(false)
                e.target.reset()
            })
            .catch((err) => {
                setSave(false)
                enqueueSnackbar(`  — Contact admin! or Try again!`, { variant: 'error', })
            })
    }

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [isLoading])

    const classes = useStyles()


    return (
        <>
            <Appbar />
            <Paper elevation={3} className={classes.paper}>
                {
                    isLoading ?
                        <Grid component={Box} py={15} container justifyContent='center'>
                            < CircularProgress />
                        </Grid >
                        :
                        <Container maxWidth='md'>
                            <Grid component='form' onSubmit={(e) => handleSubmit(e)} container direction='column' justifyContent='center' style={{ height: '100%' }}>
                                <Grid item component={Box} py={2}>
                                    <Grid container spacing={2}>
                                        <Grid item component={Box} md={6} sm={12} xs={12}>
                                            <TextField
                                                variant='outlined'
                                                fullWidth
                                                label='First Name'
                                                onChange={(e) => setFirstName(e.target.value)}
                                                type='text'
                                                name='firstname'
                                                required
                                            />
                                        </Grid>
                                        <Grid item component={Box} py={2} md={6} sm={12} xs={12}>
                                            <TextField
                                                variant='outlined'
                                                fullWidth
                                                label='Last Name'
                                                onChange={(e) => setLastName(e.target.value)}
                                                type='text'
                                                name='lastName'
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item component={Box} py={2}>
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        label='Email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        type='email'
                                        name='email'
                                        required
                                    />
                                </Grid>
                                <Grid item component={Box} py={2}>
                                    <Grid container spacing={2}>
                                        <Grid item component={Box} md={6} sm={12} xs={12}>
                                            <TextField
                                                variant='outlined'
                                                fullWidth
                                                label='Address'
                                                onChange={(e) => setAddress(e.target.value)}
                                                type='text'
                                                name='address'
                                                required
                                            />
                                        </Grid>
                                        <Grid item component={Box} md={6} sm={12} xs={12}>
                                            <TextField
                                                label="Phone"
                                                fullWidth
                                                name='phone'
                                                onChange={(e) => setPhone(e.target.value)}
                                                variant='outlined'
                                                type='text'
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item component={Box} py={2}>
                                    <TextField
                                        label="Password"
                                        fullWidth
                                        name='password'
                                        onChange={(e) => setPassword(e.target.value)}
                                        variant='outlined'
                                        type='password'
                                        required
                                        inputProps={{ minLength: 6 }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    container
                                    component={Box}
                                    py={1}
                                    justifyContent='flex-end'
                                >
                                    <Grid item xs={12} md={4}>

                                        <LoadingButton
                                            type='submit'
                                            variant='contained'
                                            loading={save}
                                            loadingPosition='start'
                                            color='primary'
                                            fullWidth
                                            style={{ fontFamily: 'Palatino Linotype' }}
                                            startIcon={<ExitToAppIcon />}
                                        >
                                            SignIn
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                }
            </Paper>
            <Footer />
            <Copy />
        </>
    )
}