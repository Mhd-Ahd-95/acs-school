import React from 'react';
import { Grid, Container, Box, TextField, Paper, IconButton } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingButton } from '@mui/lab'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import * as UserAPI from '../../../API/user_api'
import MenuItem from '@mui/material/MenuItem';
import { Appbar } from '../../../Admin/Components/AppBar/Appbar'
import { Footer } from '../Footer/footer'
import { Copy } from '../../../User/Components/Copy/copy'
import { useStyles } from './signin.style';
import * as Class_Courses from '../../../API/course_class_cycle'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';

export function CreateUser(props) {

    const { enqueueSnackbar } = useSnackbar()
    const [isLoading, setLoading] = React.useState(true)
    const [save, setSave] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fatherName, setFatherName] = React.useState('');
    const [motherName, setMotherName] = React.useState('');

    const [inputFields, setInputFields] = React.useState([
        { firstName: '', middleName: '', lastname: '', className: '' }
    ]);

    const handleChangeInput = (index, event) => {
        const values = [...inputFields]
        values[index][event.target.name] = event.target.value
        setInputFields(values)
    }
    const handleAddFields = () => {
        setInputFields([...inputFields, { firstName: '', middleName: '', lastName: '', className: '' }])
    }
    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1)
        setInputFields(values)
    }
    const handleSubmit = (e) => {
        setSave(true)
        e.preventDefault();
        const userData = {
            'students_info': inputFields,
            'father_name': fatherName,
            'mother_name': motherName,
            'email': email,
            'password': password,
            'address': address,
            'phone': phone,
            'user_role': props.type.type,
        }
        UserAPI.create_user(userData)
            .then((res) => {
                enqueueSnackbar(`Your subimt has been created successfully`, { variant: 'success', })
                setSave(false)
                e.target.reset()
                setInputFields([{ firstName: '', middleName: '', lastname: '', className: '' }])
            })
            .catch((err) => {
                setSave(false)
                enqueueSnackbar(`  — Try again!`, { variant: 'error', })
            })
    }

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [isLoading])

    const [clsses, setClasses] = React.useState([]);
    const getAllClasses = React.useCallback(() => {
        Class_Courses.getAllClasses()
            .then((res) => {
                setClasses(res.data)
            })
    }, [])

    React.useEffect(() => {
        getAllClasses()
    }, [getAllClasses])

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
                                    {inputFields.map((field, i) => (
                                        <Grid container spacing={2} key={i}>
                                            <Grid item component={Box} md={3} sm={12} xs={12}>
                                                <TextField
                                                    variant='outlined'
                                                    label='Frist Name'
                                                    name='firstName'
                                                    fullWidth
                                                    required
                                                    value={field.firstName}
                                                    onChange={(e) => handleChangeInput(i, e)}
                                                />
                                            </Grid>
                                            <Grid item component={Box} md={3} sm={12} xs={12}>
                                                <TextField
                                                    variant='outlined'
                                                    label='Middle Name'
                                                    name='middleName'
                                                    fullWidth
                                                    required
                                                    value={field.middleName}
                                                    onChange={(e) => handleChangeInput(i, e)}
                                                />
                                            </Grid>
                                            <Grid item component={Box} md={3} sm={12} xs={12}>
                                                <TextField
                                                    variant='outlined'
                                                    label='Last Name'
                                                    name='lastname'
                                                    fullWidth
                                                    required
                                                    value={field.lastname}
                                                    onChange={(e) => handleChangeInput(i, e)}
                                                />
                                            </Grid>
                                            <Grid item component={Box} md={3} sm={12} xs={12}>
                                                <Grid container>
                                                    <Grid item md={12} sm={12} xs={12}>
                                                        <TextField
                                                            variant='outlined'
                                                            fullWidth
                                                            label='Class Name'
                                                            required
                                                            select
                                                            name='className'
                                                            value={field.className}
                                                            onChange={e => handleChangeInput(i, e)}
                                                        >
                                                            {clsses.map((value) => (
                                                                <MenuItem value={value.cls_school} key={value.id}>
                                                                    {value.cls_school}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </Grid>
                                                </Grid>
                                                <Grid container justifyContent='flex-end' spacing={2}>
                                                    <Grid item md={3} sm={1} xs={2}>
                                                        {inputFields.length > 1 ?
                                                            <IconButton className={classes.btnAdd} onClick={() => handleRemoveFields(i)}>
                                                                <RemoveIcon />
                                                            </IconButton>
                                                            :
                                                            null
                                                        }
                                                    </Grid>
                                                    <Grid item md={3} sm={2} xs={2}>
                                                        <IconButton className={classes.btnAdd} onClick={() => handleAddFields()}>
                                                            <AddIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Grid item component={Box}>
                                    <Grid container spacing={2}>
                                        <Grid item component={Box} py={2} md={6} sm={12} xs={12}>
                                            <TextField
                                                variant='outlined'
                                                fullWidth
                                                label='Father Name'
                                                onChange={(e) => setFatherName(e.target.value)}
                                                type='text'
                                                name='fathername'
                                                required
                                            />
                                        </Grid>
                                        <Grid item component={Box} py={2} md={6} sm={12} xs={12}>
                                            <TextField
                                                variant='outlined'
                                                fullWidth
                                                label='Mother Name'
                                                onChange={(e) => setMotherName(e.target.value)}
                                                type='text'
                                                name='mothername'
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
                                <Grid item component={Box}>
                                    <Grid container spacing={2}>
                                        <Grid item component={Box} py={2} md={6} sm={12} xs={12}>
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
                                        <Grid item component={Box} py={2} md={6} sm={12} xs={12}>
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