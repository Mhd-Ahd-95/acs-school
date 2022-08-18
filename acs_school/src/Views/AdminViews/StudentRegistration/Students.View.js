import React from 'react'
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'
import {useNavigate} from 'react-router-dom';
import {ItemsStudents} from '../../../Components/AdminComponents/StudentRegistered/ItemsStudents'
import {Menu, MenuItem} from '@material-ui/core'


export default function StudentRegistered() {
    const navigate = useNavigate()
    return (
        <CommonMain
            title='Student Registered'
            titlePage='Students Registered'
            drawerActive='Registered students'
            noPaper
        >
            <ItemsStudents
                title='students'
                actionMenu={ReceiverActionStudent}
                onRowClick={((evt, selectedRow) => navigate(`/admin/student-registered/${selectedRow.registration_id}`))}
                columns={[
                    {
                        title: 'Image',
                        field: 'image',
                        filterPlaceholder: 'Filter',
                        render: rowData => <img src={rowData.image} height='64' alt='student' />,
                        filtering: false,
                        align: 'left',
                    },
                    {
                        cellStyle: { whiteSpace: 'nowrap' },
                        title: 'Student Name',
                        field: 'student_name',
                        filterPlaceholder: 'Filter',

                    },
                    {
                        cellStyle: { whiteSpace: 'nowrap' },
                        title: 'Current School',
                        field: 'current_school',
                        filterPlaceholder: 'Filter',
                    },
                    {
                        cellStyle: { whiteSpace: 'nowrap' },
                        title: 'Birth Date',
                        field: 'birth_date',
                        filterPlaceholder: 'Filter',
                        filtering: false,
                    },
                    {
                        cellStyle: { whiteSpace: 'nowrap' },
                        title: 'Status',
                        field: 'status_registration',
                        filterPlaceholder: 'Select',
                        lookup: { 'ACCEPTED': 'ACCEPTED', 'REJECTED': 'REJECTED', 'PENDING': 'PENDING' }
                    },
                    {
                        cellStyle: { whiteSpace: 'nowrap' },
                        title: 'Parent Name',
                        field: 'parent_name',
                        filterPlaceholder: 'Filter',
                    },
                    {
                        cellStyle: { whiteSpace: 'nowrap' },
                        title: 'Address',
                        field: 'address',
                        filterPlaceholder: 'Filter',
                        filtering: false,
                    }
                ]}
            />
        </CommonMain>
    )
}


function ReceiverActionStudent (props) {
    const { anchorEl, handleClose, disabled, onClick } = props

    return (
        <Menu
            id='long-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem
                onClick={() => { handleClose(); onClick(1);}}
                disabled={disabled}
            >
                Accept
            </MenuItem>
            <MenuItem
                onClick={() => { handleClose(); onClick(2) }}
                disabled={disabled}
            >
                Reject
            </MenuItem>
            <MenuItem
                onClick={() => { handleClose(); onClick(3) }}
            >
                Delete
            </MenuItem>
        </Menu>
    )
}