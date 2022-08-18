import React from 'react'
import {
    Grid,
    TextField,
    Box,
    Typography,
    Container,
} from '@material-ui/core'
import {
    Autocomplete
} from '@material-ui/lab'
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'
import { AccountForm } from '../../../Components/AdminComponents/AddAccount/AccountForm'
import UserAPI from '../../../API/user_api'


export default function AddAccount() {

    const [user_role, setRole] = React.useState('')
    const roles = ['Teacher', 'Supervisor', 'Coordinator']
    return (
        <CommonMain
            title='Add Account'
            titlePage='Add New Account'
        >
            <Container maxWidth='md' style={{ paddingTop: '20px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={user_role}
                            id='user_role'
                            name='user_role'
                            options={roles}
                            getOptionLabel={(option) => option}
                            onChange={(e, value, reason) => { setRole(value) }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant='outlined'
                                    label='Role'
                                    required
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                {user_role
                    ? <AccountForm
                        onSubmit={(payload) => UserAPI.createUser({ user_role, ...payload })}
                        role={user_role}
                        initialValues={{}}
                    />
                    : <Box mt={3} pt={14} pb={16}>
                        <Typography align="center" variant="h6">
                            Please select item Role
                        </Typography>
                    </Box>

                }
            </Container>
        </CommonMain >
    )
}