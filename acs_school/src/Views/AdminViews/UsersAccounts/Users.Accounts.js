import React from 'react'
import { Table } from '../../../Components/AdminComponents/Table/Table'
import UsersAPI from '../../../API/user_api'
import { useSnackbar } from 'notistack'
import { Button, Menu, MenuItem, Modal } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add';
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'
import { useNavigate } from 'react-router-dom';
import { MoreHoriz as ActionIcon } from '@material-ui/icons'
import {ConfirmModal} from './Modal'

function UserTable(props) {

    const navigate = useNavigate()
    const { columns, onRowClick } = props
    const ActionMenu = props.actionMenu
    const { enqueueSnackbar } = useSnackbar()
    const [data, setData] = React.useState([])
    const [isLoading, setLoading] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [openModal, setOpenModal] = React.useState(false)
    const [actionUser, setActionUser] = React.useState({})

    const handleMenuClick = (e) => { setAnchorEl(e.currentTarget) }
    const handleClose = () => { setAnchorEl(null) }

    const getUsers = React.useCallback(() => {
        setLoading(true)
        UsersAPI.getAllUsers()
            .then(res => {
                const result = res.data.filter(user => user.user_role === 'User')
                setData(result)
            })
            .catch(err => {
                enqueueSnackbar('Failed to load users', { variant: 'error', })
            })
            .finally(() => { setLoading(false) })
    }, [enqueueSnackbar])

    React.useEffect(() => {
        getUsers()
    }, [getUsers])

    const actions = []
    if (ActionMenu) actions.push(rowData => (
        {
            icon: ActionIcon,
            tooltip: 'More actions',
            onClick: (event, rowData) => {
                handleMenuClick(event)
                setActionUser(rowData)
            }
        }))

    const ref = React.useRef(null)

    return (
        <>
            <Table
                filter
                tabletype='users'
                data={data}
                isLoading={isLoading}
                columns={columns}
                onRowClick={onRowClick}
                actions={actions}
                options={{
                    sorting: true,
                    search: false,
                    filtering: true,
                }}
                topActions={
                    <Button
                        size='large'
                        variant='contained'
                        onClick={() => navigate('create')}
                        startIcon={<AddIcon />}
                        color='secondary'
                    >
                        Add User
                    </Button>
                }
            />
            {ActionMenu &&
                <ActionMenu
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    onClick={setOpenModal}
                    id={actionUser.user_id}
                />}

            <Modal open={openModal} ref={ref}>
                <ConfirmModal
                    id={actionUser.user_id}
                    title='Delete User'
                    handleSubmit={() => { setOpenModal(false); getUsers() }}
                    handleClose={() => setOpenModal(false)}
                    subtitle='Confirm to delete this User'
                />
            </Modal>
        </>
    )
}

export default function ShowUsers() {

    const navigate = useNavigate()

    return (
        <CommonMain
            title='Users'
            titlePage='ACS Users'
            drawerActive='Users'
            noPaper
        >
            <UserTable
                title='users'
                actionMenu={ActionUsers}
                onRowClick={((evt, selectedRow) => navigate(`/admin/users/${selectedRow.user_id}`))}
                columns={
                    [
                        {
                            cellStyle: { whiteSpace: 'nowrap' },
                            title: 'Father Name',
                            field: 'father_name',
                            filterPlaceholder: 'Filter'
                        },
                        {
                            cellStyle: { whiteSpace: 'nowrap' },
                            title: 'Mother Name',
                            field: 'mother_name',
                            filterPlaceholder: 'Filter'
                        },
                        {
                            cellStyle: { whiteSpace: 'nowrap' },
                            title: 'Email',
                            field: 'email',
                            filterPlaceholder: 'Filter'
                        },
                        {
                            cellStyle: { whiteSpace: 'nowrap' },
                            title: 'Phone',
                            field: 'phone',
                            filterPlaceholder: 'Filter'
                        },
                        {
                            cellStyle: { whiteSpace: 'nowrap' },
                            title: 'Address',
                            field: 'address',
                            filterPlaceholder: 'Filter'
                        }
                    ]
                }
            />
        </CommonMain>
    )
}

function ActionUsers(props) {
    const { anchorEl, handleClose, onClick } = props
    const navigate = useNavigate()
    return (
        <Menu
            id='long-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem
                onClick={() => {handleClose(); navigate(`/admin/users/${props.id}`)}}
            >
                Edit
            </MenuItem>
            <MenuItem
                onClick={() => {handleClose(); onClick(true) }}
            >
                Delete
            </MenuItem>
        </Menu>
    )
}