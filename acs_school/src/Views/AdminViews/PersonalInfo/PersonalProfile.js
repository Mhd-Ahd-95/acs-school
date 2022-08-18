import React from 'react';
import { Container, Box, Grid, TextField, Button, Typography, CircularProgress, IconButton } from '@material-ui/core';
import { useStyles } from './Personal.Styles';
import UserAPI from '../../../API/user_api'
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from 'notistack';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'

export default function PersonalProfile() {

    const { enqueueSnackbar } = useSnackbar()
    const classes = useStyles();
    const [data, setData] = React.useState({})
    const [disabled, setDisabled] = React.useState(true);
    const [save, setSave] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const [showPasswords, setShowPasswords] = React.useState(false)

    const handleClickShowPassword = () => {
        setShowPasswords(!showPasswords);
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }


    const authedUser = { id: 'a0c83fc9-9e63-4a14-af50-8a1b18b1ff20' }

    const getPersonalProfile = React.useCallback((id) => {
        setLoading(true)
        UserAPI.getUser(id)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                enqueueSnackbar(`Failed to load your personal profile — Try again!`, { variant: 'error', })
            })
            .finally(() => { setLoading(false) })
    }, []);
    React.useEffect(() => {
        getPersonalProfile(authedUser.id)
    }, [authedUser.id, getPersonalProfile]);

    const handleUpdatePersonalProfile = (e) => {
        setLoading(true)
        e.preventDefault();
        setSave(true);
        const id = data.user_id
        const user_data = data
        UserAPI.updateUser(id, user_data)
            .then(() => {
                setDisabled(true)
                enqueueSnackbar(`Your Updated has been successfully — Perfect!`, { variant: 'success', })
                setSave(false)
            })
            .catch(err => {
                enqueueSnackbar(`Unexpected error — Try again!`, { variant: 'error', })
                setSave(false)
            })
            .finally(() => { setLoading(false) })
    }

    return (
        <CommonMain
            title='Personal Profile'
            titlePage='Personal Profile'
            drawerActive='Personal Profile'
        >
            {isLoading
                ? <Grid component={Box} py={15} container justifyContent='center'>
                    <CircularProgress />
                </Grid>
                :
                <Container maxWidth='md' disableGutters className={classes.personal}>
                    <Grid
                        container
                        component='form'
                        justifyContent='center'
                        style={{ height: '100%' }}
                        onSubmit={(e) => handleUpdatePersonalProfile(e)}
                        spacing={2}
                    >
                        <Grid item xs={12} sm={12} md={12}>
                            <TextField
                                onChange={handleChange}
                                variant='outlined'
                                fullWidth
                                label='Name'
                                disabled
                                required
                                name='name'
                                value={data.first_name + ' ' + data.last_name || ''}
                                default={data.first_name + ' ' + data.last_name || ''}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                onChange={handleChange}
                                variant='outlined'
                                fullWidth
                                label='First Name'
                                required
                                disabled={disabled}
                                name='first_name'
                                value={data.first_name || ''}
                                default={data.first_name || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                onChange={handleChange}
                                variant='outlined'
                                fullWidth
                                label='Last Name'
                                required
                                disabled={disabled}
                                name='last_name'
                                value={data.last_name || ''}
                                default={data.last_name || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                onChange={handleChange}
                                variant='outlined'
                                fullWidth
                                label='Phone'
                                disabled={disabled}
                                required
                                name='phone'
                                value={data.phone || ''}
                                default={data.phone || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                onChange={handleChange}
                                variant='outlined'
                                fullWidth
                                label='Address'
                                required
                                disabled={disabled}
                                name='address'
                                value={data.address || ''}
                                default={data.address || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                onChange={handleChange}
                                variant='outlined'
                                fullWidth
                                label='Email'
                                disabled
                                name='email'
                                value={data.email || ''}
                                default={data.email || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPasswords ? 'text' : 'password'}
                                    value={data.password || ''}
                                    default={data.password || ''}
                                    onChange={handleChange}
                                    disabled={disabled}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                disabled={disabled}
                                            >
                                                {showPasswords ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    name="password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            container
                            component={Box}
                            py={2}
                            justifyContent='flex-end'
                            spacing={3}
                        >
                            <Grid item xs={12} md={3}>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    fullWidth
                                    onClick={() => setDisabled(false)}
                                    style={{ fontFamily: 'Palatino Linotype' }}
                                    startIcon={<EditIcon />}
                                >
                                    Edit
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <LoadingButton
                                    loading={save}
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    loadingPosition='start'
                                    style={{ fontFamily: 'Palatino Linotype' }}
                                    startIcon={<SaveIcon />}
                                >
                                    save
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            }
        </CommonMain>
    )
}