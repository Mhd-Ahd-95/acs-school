import React from 'react'
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'
import global from '../../../global'
import { Menu, MenuItem } from '@material-ui/core'
import {ItemsAccounts} from '../../../Components/AdminComponents/AccountsRegistered/ItemsAccount'
import {useNavigate} from 'react-router-dom';


export default function ACSAccounts() {
    const navigate = useNavigate()
    return (
        <CommonMain
            title='Accounts'
            titlePage='ACS Accounts'
            drawerActive='Accounts'
            noPaper
        >
            <ItemsAccounts
                title='accounts'
                actionMenu={ActionAccounts}
                onRowClick={((evt, selectedRow) => navigate(`/admin/accounts/${selectedRow.user_id}`))}
                columns={[
                    {
                        cellStyle: { whiteSpace: 'nowrap' },
                        title: 'Email',
                        field: 'email',
                        filterPlaceholder: 'Filter',
                        render: rowData => rowData.email
                    },
                    {
                        cellStyle: { whiteSpace: 'nowrap' },
                        title: 'First Name',
                        field: `first_name`,
                        filterPlaceholder: 'Filter'
                    },
                    {
                        cellStyle: { whiteSpace: 'nowrap' },
                        title: 'Last Name',
                        field: `last_name`,
                        filterPlaceholder: 'Filter'
                    },
                    {
                        cellStyle: { whiteSpace: 'nowrap' },
                        title: 'Role',
                        field: 'user_role',
                        filterPlaceholder: 'Select',
                        lookup: { 'Teacher': 'Teacher', 'Supervisor': 'Supervisor', 'Coordinator': 'Coordinator' },
                        render: rowData => global.methods.capitalize(rowData.user_role)
                    },
                    {
                        cellStyle: { whiteSpace: 'nowrap' },
                        title: 'Address',
                        field: 'address',
                        filterPlaceholder: 'Filter',
                        filtering: false,
                    },
                    {
                        cellStyle: { whiteSpace: 'nowrap' },
                        title: 'Phone',
                        field: 'phone',
                        filterPlaceholder: 'Filter'
                    }
                ]}
            />

        </CommonMain>
    )
}

function ActionAccounts(props) {

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
                onClick={() => { handleClose(); navigate(`/admin/accounts/${props.id}/edit`)}}
            >
                Edit
            </MenuItem>
            <MenuItem
                onClick={() => { handleClose(); onClick() }}
            >
                Delete
            </MenuItem>
        </Menu>
    )
}