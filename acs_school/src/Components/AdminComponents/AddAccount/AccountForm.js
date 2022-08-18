import React from 'react';
import { Grid, Box, TextField } from '@material-ui/core';
import { LoadingButton } from '@mui/lab'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import ClassCourseAPI from '../../../API/course_class_cycle';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup'
import global from '../../../global'
import UpgradeIcon from '@mui/icons-material/Upgrade';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

export function AccountForm(props) {
    const { role, onSubmit } = props
    const { enqueueSnackbar } = useSnackbar()
    const [save, setSave] = React.useState(false);
    const navigate = useNavigate()
    const { _spacing } = global.methods
    // const handleChangeClasses = (event, formik) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     formik.setFieldValue('classes',
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };
    // const handleChangeCourses = (event, formik) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     formik.setFieldValue('courses',
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };
    const intialValuesSC = {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        address: '',
        phone: '',
        courses: null,
        classes: null,
        ...props.initialValues
    }
    const intialValuesT = {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        address: '',
        phone: '',
        courses: [],
        classes: [],
        ...props.initialValues
    }

    const formik = useFormik({
        initialValues: props.role === 'Teacher' ? intialValuesT : intialValuesSC,
        validationSchema: props.role === 'Teacher' ?
            yup.object({
                email: yup.string().email().required(),
                first_name: yup.string().required(),
                last_name: yup.string().required(),
                password: yup.string().required(),
                address: yup.string().required(),
                phone: yup.number().required(),
                courses: yup.array().min(1).required(),
                classes: yup.array().min(1).required(),
            })
            :
            yup.object({
                email: yup.string().email().required(),
                first_name: yup.string().required(),
                last_name: yup.string().required(),
                password: yup.string().required(),
                address: yup.string().required(),
                phone: yup.number().required(),
            }),
        onSubmit: (values) => {
            setSave(true)
            onSubmit(values)
                .then(res => {
                    if (props.editMode) {
                        enqueueSnackbar(`Account updated successfully`, { variant: 'success', })
                    }
                    else {
                        enqueueSnackbar(`New Account added successfully`, { variant: 'success', })
                        formik.handleReset()
                    }
                    setTimeout(() => {
                        navigate({ pathname: `/admin/accounts`, key: uuidv4() })
                    }, 2000)
                })
                .catch(err => {
                    enqueueSnackbar('Failed to add new account', { variant: 'error', })
                })
                .finally(() => { setSave(false) })
        }
    })

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const [clsses, setClasses] = React.useState([]);
    const getAllClasses = React.useCallback(() => {
        ClassCourseAPI.getAllClasses()
            .then((res) => {
                setClasses(res.data)
            })
    }, [])

    React.useEffect(() => {
        getAllClasses()
    }, [getAllClasses])

    const [cors, setCors] = React.useState([]);
    const getAllCourses = React.useCallback(() => {
        ClassCourseAPI.getAllCourses()
            .then((res) => {
                setCors(res.data)
            })
    }, [])

    React.useEffect(() => {
        getAllCourses()
    }, [getAllCourses]);
    console.log(formik)
    return (
        <Grid component='form' onSubmit={formik.handleSubmit} container direction='column' justifyContent='center' style={{ height: '100%' }}>
            <Grid item component={Box} py={2}>
                <Grid container spacing={2}>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            variant='outlined'
                            id='first_name'
                            name='first_name'
                            fullWidth
                            label='First Name *'
                            value={formik.values['first_name'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['first_name'] && Boolean(formik.errors['first_name'])}
                            helperText={formik.touched['first_name'] && _spacing(formik.errors['first_name'])}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            variant='outlined'
                            id='last_name'
                            name='last_name'
                            fullWidth
                            label='Last Name *'
                            value={formik.values['last_name'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['last_name'] && Boolean(formik.errors['last_name'])}
                            helperText={formik.touched['last_name'] && _spacing(formik.errors['last_name'])}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant='outlined'
                            id='email'
                            name='email'
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
                            variant='outlined'
                            id='address'
                            name='address'
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
                            label="Phone *"
                            id='phone'
                            fullWidth
                            name='phone'
                            onChange={formik.handleChange}
                            value={formik.values['phone'] || ''}
                            onBlur={formik.handleBlur}
                            variant='outlined'
                            error={formik.touched['phone'] && Boolean(formik.errors['phone'])}
                            helperText={formik.touched['phone'] && _spacing(formik.errors['phone'])}
                        />
                    </Grid>
                    {role === 'Teacher' &&
                        <>
                            <Grid item xs={12}>
                                <FormControl sx={{ width: '100%' }}>
                                    <InputLabel required id="demo-multiple-checkbox-label">Class</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="classes"
                                        name='classes'
                                        multiple
                                        value={formik.values['classes'] || ''}
                                        fullWidth
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        input={<OutlinedInput id="select-multiple-chip" label="Class" />}
                                        renderValue={(selected) => selected.join('  , ')}
                                        MenuProps={MenuProps}
                                        error={formik.touched['classes'] && Boolean(formik.errors['classes'])}
                                    >
                                        {clsses.map((clss) => (
                                            <MenuItem key={clss.id} value={clss.cls_school}>
                                                <Checkbox checked={formik.values['classes'].indexOf(clss.cls_school) > -1} />
                                                <ListItemText primary={clss.cls_school} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {formik.touched['classes'] && 
                                    <span style={{padding: '0px 10px', color: '#E74C3C'}}>{_spacing(formik.errors['classes'])}</span>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl sx={{ width: '100%' }}>
                                    <InputLabel required id="demo-multiple-checkbox-label">Course</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="courses"
                                        name='courses'
                                        multiple
                                        value={formik.values['courses'] || ''}
                                        fullWidth
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        input={<OutlinedInput id="select-multiple-chips" label="Course" />}
                                        renderValue={(selected) => selected.join('  , ')}
                                        MenuProps={MenuProps}
                                        error={formik.touched['courses'] && Boolean(formik.errors['courses'])}
                                    >
                                        {cors.map((c) => (
                                            <MenuItem key={c.id} value={c.course}>
                                                <Checkbox checked={formik.values['courses'].indexOf(c.course) > -1} />
                                                <ListItemText primary={c.course} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {formik.touched['courses'] && 
                                    <span style={{padding: '0px 10px', color: '#E74C3C'}}>{_spacing(formik.errors['courses'])}</span>
                                }
                            </Grid>
                        </>
                    }
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            name="password"
                            fullWidth
                            variant='outlined'
                            value={formik.values['password'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="Password"
                            error={formik.touched['password'] && Boolean(formik.errors['password'])}
                            helperText={formik.touched['password'] && _spacing(formik.errors['password'])}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container component={Box} py={1} justifyContent='flex-end'>
                            <Grid item>
                                <LoadingButton
                                    type='submit'
                                    size='large'
                                    variant='contained'
                                    loading={save}
                                    loadingPosition='start'
                                    color={props.editMode ? 'secondary' : 'primary'}
                                    fullWidth
                                    style={{ fontFamily: 'Palatino Linotype' }}
                                    startIcon={props.editMode ? <UpgradeIcon /> : <CreateIcon />}
                                    disabled={formik.dirty && formik.isValid ? false : true}
                                >
                                    {props.editMode ? 'update' : 'Submit'}
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}