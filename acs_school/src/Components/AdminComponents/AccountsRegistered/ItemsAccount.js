import React from 'react'
import { Table } from '../Table/Table'
import { useSnackbar } from 'notistack'
import { MoreHoriz as ActionIcon } from '@material-ui/icons'
import UserAPI from '../../../API/user_api'
import DeleteIcon from '@mui/icons-material/Delete';
import { ConfirmModal } from '../StudentRegistered/ConfirmModal'
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Modal, Button } from '@material-ui/core'

export function ItemsAccounts(props) {
    const ActionMenu = props.actionMenu
    const { enqueueSnackbar } = useSnackbar()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [data, setData] = React.useState([])
    const handleMenuClick = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)
    const [isLoading, setLoading] = React.useState(false)
    const [actionAccount, setActionAccount] = React.useState({})
    const [openModal, setOpenModal] = React.useState(false)
    const navigate = useNavigate()

    const actions = []
    if (ActionMenu) actions.push(rowData => (
        {
            icon: ActionIcon,
            tooltip: 'More Actions',
            onClick: (event, rowData) => {
                handleMenuClick(event)
                setActionAccount(rowData)
            }
        }
    ))

    const fetchAllAccounts = React.useCallback(() => {
        setLoading(true)
        UserAPI
            .getAllUsers()
            .then(res => {
                const result = res.data
                const users = result.filter(user => (user.user_role !== 'Admin' && user.user_role !== 'User'))
                setData(users)
            })
            .catch(err => {
                enqueueSnackbar(`Failed to load accounts ACS`, { variant: 'error', })
            })
            .finally(() => { setLoading(false) })
    }, [enqueueSnackbar])

    React.useEffect(() => {
        fetchAllAccounts()
    }, [fetchAllAccounts])

    const ref = React.useRef(null)

    return (
        <>
            <Table
                filter
                tabletype="accounts"
                columns={props.columns}
                data={data}
                onRowClick={props.onRowClick}
                isLoading={isLoading}
                options={{
                    sorting: true,
                    search: false,
                    filtering: true,
                }}
                title={props.title || ''}
                topActions={
                    <Button
                        size='large'
                        variant='contained'
                        onClick={() => navigate('create')}
                        startIcon={<AddIcon />}
                        color='secondary'
                    >
                        Add Account
                    </Button>
                }
                actions={actions}
            />
            {ActionMenu &&
                <ActionMenu
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    onClick={() => setOpenModal(true)}
                    id={actionAccount.user_id}
                />
            }
            <Modal open={openModal} ref={ref}>
                <ConfirmModal
                    userId={actionAccount.user_id}
                    title='Account Delete'
                    handleAccount={() => { setOpenModal(false); fetchAllAccounts() }}
                    handleClose={() => setOpenModal(false)}
                    subtitle='Confirm to delete this Account'
                    startIcon={<DeleteIcon />}
                />
            </Modal>
        </>
    )
}