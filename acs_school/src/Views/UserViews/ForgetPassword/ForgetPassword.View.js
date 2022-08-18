import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import SendAndArchiveOutlinedIcon from '@mui/icons-material/SendAndArchiveOutlined';
import { AuthLayout } from '../../../Layout/AuthLayout/AuthLayout'
import {LoadingButton} from '@mui/lab'

function Forget() {
    const [isLoading, setLoading] = React.useState(false);
    return (
        <AuthLayout
            title='Forget Password'
        >
            <Grid container justifyContent='center' direction='column' component='form' spacing={3}> 
                <Grid item>
                    <TextField
                        variant='outlined'
                        fullWidth
                        type='email'
                        label='Email'
                        required
                    />
                </Grid>
                <Grid item>
                    <TextField
                        variant='outlined'
                        fullWidth
                        type='number'
                        label='Phone'
                        required
                    />
                </Grid>
                <Grid item>
                    <LoadingButton
                        loading={isLoading}
                        loadingPosition='start'
                        variant='contained'
                        fullWidth
                        color='primary'
                        type='submit'
                        startIcon={<SendAndArchiveOutlinedIcon />}
                    >
                        Submit
                    </LoadingButton>
                </Grid>
            </Grid>
        </AuthLayout>
    )
}

export default Forget