import React from 'react';
import { Grid, TextField, Typography, Link } from '@material-ui/core';
import { useStyles } from './login.style'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { AuthLayout } from '../../../Layout/AuthLayout/AuthLayout'
import { LoadingButton } from '@mui/lab'
import UserAPI from '../../../API/user_api'
import { AuthContext } from '../../../Context/UserContext'
import { useSnackbar } from 'notistack'

function Login() {

    const [isLoading, setLoading] = React.useState(false);
    const classes = useStyles()
    const emailRef = React.useRef()
    const passwordRef = React.useRef()
    const authContext = React.useContext(AuthContext)
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get('email')
        const password = formData.get('password')
        UserAPI.login(email, password)
            .then(res => {
                if (res.data.user_role === 'Admin') {
                    authContext.handleAuth(true, JSON.stringify(res.data))
                    navigate('/admin')
                }
                else if(res.data.user_role === 'Supervisor') {
                    authContext.handleAuth(true, JSON.stringify(res.data))
                    navigate('/supervisor/create-agenda')
                }
                else if(res.data.user_role === 'Teacher'){
                    enqueueSnackbar(`You are not able to login as Teacher`, { variant: 'warning', })
                }
                else{
                    enqueueSnackbar(`You are not able to login as User`, { variant: 'warning', })
                }
            })
            .catch(err => {
                err.response.status === 401 ?
                    enqueueSnackbar(`Incorrect email and password`, { variant: 'warning', }) :
                    enqueueSnackbar(`Unexpected error — Try again!`, { variant: 'error', })
            })
            .finally(() => { setLoading(false) })
    }

    return (
        <AuthLayout
            title='login'
        >
            <Grid container component='form' onSubmit={(e) => handleSubmit(e)} direction='column' spacing={3}>
                <Grid item>
                    <TextField
                        fullWidth
                        label='Email'
                        type='email'
                        name='email'
                        inputRef={emailRef}
                        required
                        variant='outlined'
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        label='Password'
                        inputProps={{ minLength: 6 }}
                        type='password'
                        required
                        variant='outlined'
                        name='password'
                        inputRef={passwordRef}
                    />
                </Grid>
                <Grid item>
                    <LoadingButton
                        loading={isLoading}
                        loadingPosition='start'
                        color='primary'
                        variant='contained'
                        type='submit'
                        fullWidth
                        startIcon={<LoginIcon />}
                        style={{ padding: '10px' }}
                    >
                        {isLoading ? 'Processing' : 'Login'}
                    </LoadingButton>
                </Grid>
                <Grid container justifyContent='center' alignItems='center'>
                    <Typography color='textSecondary' align='center' className={classes.forget}>
                        <Link component={RouterLink} to='/forget-password'>
                            Forgot Your Password?
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </AuthLayout>
    )
}

export default Login