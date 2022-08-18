import React from 'react';
import { Grid, Box, TextField, IconButton, Container, Button } from '@material-ui/core';
import { LoadingButton } from '@mui/lab'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import UsersAPI from '../../../API/user_api'
import MenuItem from '@mui/material/MenuItem';
import { useStyles } from './AddUser.Styles';
import ClassAPI from '../../../API/course_class_cycle'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup'
import global from '../../../global'
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'
import { useNavigate } from 'react-router-dom';


export default function AddUser() {

    const { enqueueSnackbar } = useSnackbar()
    const [isLoading, setLoading] = React.useState(false)
    const [clsses, setClasses] = React.useState([]);
    const { _spacing, _spacing2 } = global.methods
    const navigate = useNavigate()
    // const handleChangeInput = (index, field, event) => {
    //     const values = [...inputFields]
    //     values[index][event.target.name] = event.target.value
    //     setInputFields(values)
    // }

    const getAllClasses = React.useCallback(() => {
        ClassAPI.getAllClasses()
            .then((res) => {
                setClasses(res.data)
            })
            .catch((err) => {
                enqueueSnackbar('Failed to load classes', { variant: 'error' })
            })
    }, [enqueueSnackbar])

    React.useEffect(() => {
        getAllClasses()
    }, [getAllClasses])

    const classes = useStyles()

    const initialValues = {
        students_info: [{first_name: '', middle_name: '', last_name: '', class_name: ''}],
        father_name: '',
        mother_name: '',
        email: '',
        password: '',
        address: '',
        phone: ''
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object({
            students_info: yup.array().of(
                yup.object().shape({
                    first_name: yup.string().required(),
                    middle_name: yup.string().required(),
                    last_name: yup.string().required(),
                    class_name: yup.string().required(),
                })
            ),
            father_name: yup.string().required(),
            mother_name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
            address: yup.string().required(),
            phone: yup.number().required(),
        }),
        onSubmit: (values) => {
            setLoading(true)
            UsersAPI.createUser({ ...values, user_role: 'User' })
                .then(res => {
                    enqueueSnackbar('User created successfully', { variant: 'success', })
                    formik.handleReset()
                    navigate('/admin/users')
                })
                .catch(err => {
                    enqueueSnackbar('Failed to add new user', { variant: 'error' })
                })
                .finally(() => { setLoading(false) })
        }
    })
    const handleAddFields = () => {
        formik.setFieldValue('students_info', [...formik.values.students_info, { first_name: '', middle_name: '', last_name: '', class_name: '' }])
    }
    const handleRemoveFields = (index) => {
        const values = [...formik.values.students_info];
        values.splice(index, 1)
        delete formik.errors.students_info
        formik.initialValues.students_info = values
        formik.setFieldValue('students_info', values)
    }

    return (
        <CommonMain
            title='Users'
            titlePage='Add New User'
            drawerActive='Users'
        >
            <Container maxWidth='md' style={{ paddingTop: '20px' }}>
                <Grid container component='form' onSubmit={formik.handleSubmit} spacing={2}>
                    <Grid item md={12} sm={12} xs={12}>
                        {formik.values.students_info.map((field, i) => (
                            <Grid container spacing={2} key={i}>
                                <Grid item component={Box} md={3} sm={12} xs={12}>
                                    <TextField
                                        id={`students_info[${i}].first_name`}
                                        variant='outlined'
                                        label='Frist Name *'
                                        name={`students_info[${i}].first_name`}
                                        fullWidth
                                        value={field.first_name || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.students_info && formik.errors.students_info && formik.touched?.students_info[i]?.first_name && Boolean(formik.errors?.students_info[i]?.first_name)}
                                        helperText={formik.touched.students_info && formik.errors.students_info && formik.touched?.students_info[i]?.first_name && _spacing2(formik.errors?.students_info[i]?.first_name)}
                                    />
                                </Grid>
                                <Grid item component={Box} md={3} sm={12} xs={12}>
                                    <TextField
                                        id={`students_info[${i}].middle_name`}
                                        variant='outlined'
                                        label='Middle Name *'
                                        name={`students_info[${i}].middle_name`}
                                        fullWidth
                                        value={field.middle_name || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.students_info && formik.errors.students_info && formik.touched?.students_info[i]?.middle_name && Boolean(formik.errors?.students_info[i]?.middle_name)}
                                        helperText={formik.touched.students_info && formik.errors.students_info && formik.touched?.students_info[i]?.middle_name && _spacing2(formik.errors?.students_info[i]?.middle_name)}
                                    />
                                </Grid>
                                <Grid item component={Box} md={3} sm={12} xs={12}>
                                    <TextField
                                        id={`students_info[${i}].last_name`}
                                        variant='outlined'
                                        label='Last Name *'
                                        name={`students_info[${i}].last_name`}
                                        fullWidth
                                        value={field.last_name || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.students_info && formik.errors.students_info && formik.touched?.students_info[i]?.last_name && Boolean(formik.errors?.students_info[i]?.last_name)}
                                        helperText={formik.touched.students_info && formik.errors.students_info && formik.touched?.students_info[i]?.last_name && _spacing2(formik.errors?.students_info[i]?.last_name)}
                                    />
                                </Grid>
                                <Grid item component={Box} md={3} sm={12} xs={12}>
                                    <Grid container>
                                        <Grid item md={12} sm={12} xs={12}>
                                            <TextField
                                                id={`students_info[${i}].class_name`}
                                                variant='outlined'
                                                label='Class Name *'
                                                name={`students_info[${i}].class_name`}
                                                fullWidth
                                                select
                                                value={field.class_name || ''}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.students_info && formik.errors.students_info && formik.touched?.students_info[i]?.class_name && Boolean(formik.errors?.students_info[i]?.class_name)}
                                                helperText={formik.touched.students_info && formik.errors.students_info && formik.touched?.students_info[i]?.class_name && _spacing2(formik.errors?.students_info[i]?.class_name)}
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
                                            {formik.values.students_info.length > 1 ?
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
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            id='father_name'
                            name='father_name'
                            variant='outlined'
                            fullWidth
                            label='Father Name *'
                            value={formik.values['father_name'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['father_name'] && Boolean(formik.errors['father_name'])}
                            helperText={formik.touched['father_name'] && _spacing(formik.errors['father_name'])}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            id='mother_name'
                            name='mother_name'
                            variant='outlined'
                            fullWidth
                            label='Mother Name *'
                            value={formik.values['mother_name'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['mother_name'] && Boolean(formik.errors['mother_name'])}
                            helperText={formik.touched['mother_name'] && _spacing(formik.errors['mother_name'])}
                        />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <TextField
                            id='email'
                            name='email'
                            variant='outlined'
                            fullWidth
                            label='Email *'
                            value={formik.values['email'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['email'] && Boolean(formik.errors['email'])}
                            helperText={formik.touched['email'] && _spacing(formik.errors['email'])}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            id='address'
                            name='address'
                            variant='outlined'
                            fullWidth
                            label='Address *'
                            value={formik.values['address'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['address'] && Boolean(formik.errors['address'])}
                            helperText={formik.touched['address'] && _spacing(formik.errors['address'])}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            id='phone'
                            name='phone'
                            label="Phone *"
                            variant='outlined'
                            fullWidth
                            value={formik.values['phone'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['phone'] && Boolean(formik.errors['phone'])}
                            helperText={formik.touched['phone'] && _spacing(formik.errors['phone'])}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12} md={12}>
                        <TextField
                            id='password'
                            name='password'
                            label="Password *"
                            variant='outlined'
                            fullWidth
                            value={formik.values['password'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            inputProps={{ minLength: 6 }}
                            error={formik.touched['password'] && Boolean(formik.errors['password'])}
                            helperText={formik.touched['password'] && _spacing(formik.errors['password'])}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <Grid container justifyContent='flex-end'>
                            <Grid item md={3} sm={12} xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <Button
                                            fullWidth
                                            variant='outlined'
                                            color='secondary'
                                            onClick={formik.handleReset}
                                        >
                                            Reset
                                        </Button>
                                    </Grid>
                                    <Grid item md={8} sm={12} xs={12}>
                                        <LoadingButton
                                            type='submit'
                                            variant='contained'
                                            loading={isLoading}
                                            loadingPosition='start'
                                            color='primary'
                                            fullWidth
                                            style={{ fontFamily: 'Palatino Linotype' }}
                                            startIcon={<ExitToAppIcon />}
                                            disabled={formik.dirty && formik.isValid ? false : true}
                                        >
                                            {isLoading ? 'Processing' : 'Submit'}
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container >
        </CommonMain >
    )
}