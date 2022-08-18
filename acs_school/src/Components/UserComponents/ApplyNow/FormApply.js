import React from 'react';
import {
    TextField,
    Box,
    Grid,
    Typography,
    MenuItem,
    Button
}
    from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import UploadImage from '../../UserComponents/UploadImage/uploadImage';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup'
import global from '../../../global'
import ClassAPI from '../../../API/course_class_cycle'

export function FormApply(props) {

    const { onSubmit, className } = props

    const { enqueueSnackbar } = useSnackbar()
    const [save, setSave] = React.useState(false);
    const [classes, setClasses] = React.useState([])
    const { _spacing } = global.methods

    const handleClasses = React.useCallback(() => {
        ClassAPI
            .getAllClasses()
            .then((res) => {
                setClasses(res.data)
            })
            .catch((err) => {
                enqueueSnackbar(`Failed to load Class`, { variant: 'error', })
            })
    }, [enqueueSnackbar])

    React.useEffect(() => {
        handleClasses()
    }, [handleClasses])

    const Grades = [
        { value: 'Excellent' },
        { value: 'Good' },
        { value: 'Acceptable' },
        { value: 'Weak' }
    ]
    const Gender = [
        { value: 'Male' },
        { value: 'Female' }
    ]

    const intialValues = {
        image: '',
        student_name: '',
        current_school: '',
        class_name: '',
        birth_date: '',
        current_grade: '',
        gender: '',
        parent_name: '',
        phone: '',
        email: '',
        address: '',
    }

    const formik = useFormik({
        initialValues: intialValues,
        validationSchema: yup.object({
            image: yup.string().required(),
            student_name: yup.string().required(),
            current_school: yup.string().required(),
            class_name: yup.string().required(),
            birth_date: yup.date().required(),
            current_grade: yup.string().required(),
            gender: yup.string().required(),
            parent_name: yup.string().required(),
            phone: yup.number().required(),
            email: yup.string().email().required(),
            address: yup.string().required()
        }),
        onSubmit: (values) => {
            setSave(true);
            onSubmit(values)
                .then(res => {
                    formik.handleReset()
                    enqueueSnackbar(`Your subimt has been successfully — Welcome!`, { variant: 'success', })
                })
                .catch((err) => {
                    err.response.status === 400 ?
                        enqueueSnackbar(`The student is already registered ! or Try again!`, { variant: 'error', })
                        :
                        enqueueSnackbar(`Unexpected error — Contact admin! or Try again!`, { variant: 'error', })
                })
                .finally(() => setSave(false))
        }
    })
    return (
        <Box className={className.form}>
            <Grid container component='form' onSubmit={formik.handleSubmit} spacing={3}>
                <Grid item component={Box} md={3} sm={12} xs={12}>
                    <UploadImage formik={formik} _spacing={_spacing} />
                </Grid>
                <Grid item component={Box} md={9} sm={12} xs={12}>
                    <Grid container direction='row' spacing={3}>
                        <Grid item component={Box} py={2} sm={12} xs={12} md={6}>
                            <TextField
                                id='student_name'
                                variant='outlined'
                                fullWidth
                                name='student_name'
                                label='Student Name *'
                                value={formik.values['student_name'] || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched['student_name'] && Boolean(formik.errors['student_name'])}
                                helperText={formik.touched['student_name'] && _spacing(formik.errors['student_name'])}
                            />
                        </Grid>
                        <Grid item component={Box} py={2} sm={12} xs={12} md={6}>
                            <TextField
                                id='current_school'
                                variant='outlined'
                                fullWidth
                                name='current_school'
                                label='Current School *'
                                value={formik.values['current_school'] || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched['current_school'] && Boolean(formik.errors['current_school'])}
                                helperText={formik.touched['current_school'] && _spacing(formik.errors['current_school'])}
                            />
                        </Grid>
                        <Grid item component={Box} py={2} sm={12} xs={12} md={6}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                id='class_name'
                                name='class_name'
                                label='Class Name *'
                                select
                                value={formik.values['class_name'] || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched['class_name'] && Boolean(formik.errors['class_name'])}
                                helperText={formik.touched['class_name'] && _spacing(formik.errors['class_name'])}
                            >
                                {classes.map((value) => (
                                    <MenuItem value={value.cls_school} key={value.id}>
                                        {value.cls_school}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item component={Box} py={2} sm={12} xs={12} md={6}>
                            <TextField
                                id='birth_date'
                                name='birth_date'
                                variant='outlined'
                                fullWidth
                                type='date'
                                label='Birthday *'
                                value={formik.values['birth_date'] || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched['birth_date'] && Boolean(formik.errors['birth_date'])}
                                helperText={formik.touched['birth_date'] && _spacing(formik.errors['birth_date'])}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item component={Box} py={2} sm={12} xs={12} md={6}>
                            <TextField
                                id='current_grade'
                                name='current_grade'
                                variant='outlined'
                                fullWidth
                                select
                                label='Current Grade *'
                                value={formik.values['current_grade'] || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched['current_grade'] && Boolean(formik.errors['current_grade'])}
                                helperText={formik.touched['current_grade'] && _spacing(formik.errors['current_grade'])}
                            >
                                {Grades.map((value, index) => (
                                    <MenuItem value={value.value} key={index}>
                                        {value.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item component={Box} py={2} sm={12} xs={12} md={6}>
                            <TextField
                                id='gender'
                                name='gender'
                                variant='outlined'
                                fullWidth
                                select
                                label='Gender *'
                                value={formik.values['gender'] || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched['gender'] && Boolean(formik.errors['gender'])}
                                helperText={formik.touched['gender'] && _spacing(formik.errors['gender'])}
                            >
                                {Gender.map(({ value }, index) => (
                                    <MenuItem value={value} key={index}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item component={Box} py={2} sm={12}>
                    <Grid container justifyContent='center'>
                        <Grid item component={Box} py={2}>
                            <Typography variant='h2' className={className.title3}>
                                Parent Information
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction='row' spacing={2}>
                        <Grid item component={Box} py={2} sm={12} xs={12} md={6}>
                            <TextField
                                id='parent_name'
                                name='parent_name'
                                variant='outlined'
                                fullWidth
                                label='Full Name *'
                                value={formik.values['parent_name'] || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched['parent_name'] && Boolean(formik.errors['parent_name'])}
                                helperText={formik.touched['parent_name'] && _spacing(formik.errors['parent_name'])}
                            />
                        </Grid>
                        <Grid item component={Box} py={2} sm={12} xs={12} md={6}>
                            <TextField
                                id='phone'
                                name='phone'
                                variant='outlined'
                                fullWidth
                                label='Phone Number *'
                                value={formik.values['phone'] || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched['phone'] && Boolean(formik.errors['phone'])}
                                helperText={formik.touched['phone'] && _spacing(formik.errors['phone'])}
                            />
                        </Grid>
                        <Grid item component={Box} py={2} sm={12} xs={12} md={6}>
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
                        <Grid item component={Box} py={2} sm={12} xs={12} md={6}>
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
                    </Grid >
                </Grid>
                <Grid item sm={12} xs={12}>
                    <Grid container justifyContent='flex-end' spacing={2}>
                        <Grid item md={4} sm={12} xs={12}>
                            <Grid container spacing={2} component={Box} py={2}>
                                <Grid item xs={12} sm={12} md={6}>
                                    <Button
                                        variant='outlined'
                                        fullWidth
                                        color='secondary'
                                        style={{ padding: '10px' }}
                                        onClick={formik.handleReset}
                                    >
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <LoadingButton
                                        loading={save}
                                        loadingPosition='start'
                                        variant='contained'
                                        type='submit'
                                        fullWidth
                                        color='primary'
                                        style={{ padding: '10px' }}
                                        startIcon={<SendIcon />}
                                        disabled={formik.dirty && formik.isValid ? false : true}
                                    >
                                        {save ? 'Processing' : 'Submit'}
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}