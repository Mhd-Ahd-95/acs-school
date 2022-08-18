import React from 'react'
import { useSnackbar } from 'notistack'
import {
    Container,
    Grid,
    TextField,
    Box,
    CircularProgress,
} from '@material-ui/core'
import {AccountForm} from '../../../Components/AdminComponents/AddAccount/AccountForm'
import UserAPI from '../../../API/user_api'
import { useParams } from 'react-router-dom'
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'


export default function EditAccount() {

    const params = useParams()
    const { enqueueSnackbar } = useSnackbar()
    const [account, setAccount] = React.useState({})
    const [isLoading, setLoading] = React.useState(false)

    const fetchAccountValues = React.useCallback((id) => {
        setLoading(true)
        UserAPI
            .getUser(id)
            .then(res => {
                setAccount(res.data)
            })
            .catch(err => enqueueSnackbar(`Failed to load Account`, { variant: 'error', }))
            .finally(() => { setLoading(false)})
    }, [enqueueSnackbar])

    React.useEffect(() => {
        fetchAccountValues(params.user_id)
    }, [params.user_id, fetchAccountValues])

        
    return (
        <CommonMain
            title='Edit Account'
            titlePage={`Edit Account : ${account.first_name} ${account.last_name}`}
        >
            {
                isLoading
                    ? <Grid component={Box} py={15} container justifyContent='center'>
                        <CircularProgress />
                    </Grid>
                    : <Container maxWidth='md' style={{ paddingTop: '20px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    id='user_role'
                                    name='user_role'
                                    label='Role'
                                    variant='outlined'
                                    fullWidth
                                    value={account?.user_role || ''}
                                    defaultValue={account?.user_role}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        {account
                            ? <AccountForm
                                onSubmit={(payload) => UserAPI.updateUser(params.user_id, { user_role: account.user_role, ...payload })}
                                editMode
                                role={account.user_role}
                                initialValues={account}
                            />
                            : <Grid component={Box} py={15} container justifyContent='center'>
                                <CircularProgress />
                            </Grid>
                        }

                    </Container>
            }
        </CommonMain>
    )
}