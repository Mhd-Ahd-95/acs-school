import React, { useState } from 'react';
import { Grid, TextField, Box, Container, Typography } from '@material-ui/core';
import { useStyles } from './contact.style'
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup'
import global from '../../../global'

export function ContactForm(props) {

    const { onSubmit } = props
    const { enqueueSnackbar } = useSnackbar()
    const [save, setSave] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const { _spacing } = global.methods

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [isLoading])

    const InitialValues = {
        name: '',
        email: '',
        subject: '',
        message: ''
    }

    const formik = useFormik({
        initialValues: InitialValues,
        validationSchema: yup.object({
            name: yup.string().required(),
            email: yup.string().email().required(),
            subject: yup.string().required(),
            message: yup.string().required()
        }),
        onSubmit: (values) => {
            setSave(true)
            onSubmit(values)
                .then((res) => {
                    enqueueSnackbar(`Your message has been successfully sent — Thanks!`, { variant: 'success', })
                    formik.handleReset()
                })
                .catch((err) => {
                    enqueueSnackbar(`Failed to send message — Try again!`, { variant: 'error', })
                })
                .finally(() => setSave(false))
        }
    })
    return (

        isLoading
            ? <Grid component={Box} py={15} container justifyContent='center'>
                < CircularProgress />
            </Grid >
            :
            <Container maxWidth='sm'>
                {/* <Typography variant='h4' className={classes.login}>Contact Us</Typography> */}
                <Grid component='form' onSubmit={formik.handleSubmit} container direction='column' justifyContent='center' style={{ height: '100%' }}>
                    <Grid item component={Box} py={2} >
                        <TextField
                            id='name'
                            variant='outlined'
                            fullWidth
                            label='Name *'
                            name='name'
                            value={formik.values['name'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['name'] && Boolean(formik.errors['name'])}
                            helperText={formik.touched['name'] && _spacing(formik.errors['name'])}
                        />
                    </Grid>
                    <Grid item component={Box} py={2}>
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
                    <Grid item component={Box} py={2}>
                        <TextField
                            variant='outlined'
                            id='subject'
                            name='subject'
                            fullWidth
                            label='Subject *'
                            value={formik.values['subject'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['subject'] && Boolean(formik.errors['subject'])}
                            helperText={formik.touched['subject'] && _spacing(formik.errors['subject'])}
                        />
                    </Grid>
                    <Grid item component={Box} py={2}>
                        <TextField
                            id="message"
                            label="Message"
                            fullWidth
                            name='message'
                            variant='outlined'
                            multiline
                            rows={5}
                            value={formik.values['message'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['message'] && Boolean(formik.errors['message'])}
                            helperText={formik.touched['message'] && _spacing(formik.errors['message'])}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        component={Box}
                        py={2}
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
                                style={{ fontFamily: 'Palatino Linotype', padding:'10px' }}
                                startIcon={<SendIcon />}
                                disabled={formik.dirty && formik.isValid ? false : true}
                            >
                                {save ? 'Processing' : 'Send Email'}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
    )
}