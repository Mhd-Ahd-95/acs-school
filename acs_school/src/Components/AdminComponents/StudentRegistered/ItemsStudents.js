import React from 'react'
import { MoreHoriz as ActionIcon } from '@material-ui/icons'
import { useSnackbar } from 'notistack';
import RegistrationAPI from '../../../API/registration_api'
import {Modal} from '@material-ui/core'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import {ConfirmModal} from './ConfirmModal'
import {Table} from '../Table/Table'

export function ItemsStudents(props) {

    const ActionMenu = props.actionMenu
    const { enqueueSnackbar } = useSnackbar()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [data, setData] = React.useState([])
    const handleMenuClick = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)
    const [actionStudent, setActionStudent] = React.useState({})
    const [openModal, setOpenModal] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false)
    const actions = []
    if (ActionMenu) actions.push(rowData => (
        {
            icon: ActionIcon,
            tooltip: 'More actions',
            onClick: (event, rowData) => {
                handleMenuClick(event)
                setActionStudent(rowData)
            }
        }))


    const fetchStudentRegistration = React.useCallback(() => {
        setLoading(true)
        RegistrationAPI
            .getRegistration()
            .then(res => {
                setData(res.data)
            })
            .catch((err) => {
                enqueueSnackbar('Failed to load Students — Unexpected error', { variant: 'error', })
            })
            .finally(() => {setLoading(false)})
    }, [enqueueSnackbar])

    React.useEffect(() => {
        fetchStudentRegistration()
    }, [fetchStudentRegistration])

    const ref = React.useRef(null)

    return (
        <>
            <Table
                filter
                tabletype='students'
                data={data}
                columns={props.columns}
                onRowClick={props.onRowClick}
                isLoading={isLoading}
                options={{
                    sorting: true,
                    search: false,
                    filtering: true,
                }}
                title={props.title || ''}
                actions={actions}
            />
            {ActionMenu &&
                <ActionMenu
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    onClick={setOpenModal}
                    disabled={actionStudent.status_registration !== 'PENDING'}
                    status={actionStudent.registration_status}
                />}
            <Modal open={openModal === 1} ref={ref}>
                <ConfirmModal
                    id={actionStudent.registration_id}
                    status='ACCEPTED'
                    title='Registration Accept'
                    handleSubmit={() => { setOpenModal(false); fetchStudentRegistration() }}
                    handleClose={() => setOpenModal(false)}
                    subtitle='Confirm to accept this student'
                    startIcon={<ThumbUpAltIcon />}

                />
            </Modal>
            <Modal open={openModal === 2} ref={ref}>
                <ConfirmModal
                    id={actionStudent.registration_id}
                    status='REJECTED'
                    title='Registration Reject'
                    handleSubmit={() => { setOpenModal(false); fetchStudentRegistration() }}
                    handleClose={() => setOpenModal(false)}
                    subtitle='Confirm to Reject this student'
                    startIcon={<ThumbDownAltIcon />}

                />
            </Modal>
            <Modal open={openModal === 3} ref={ref}>
                <ConfirmModal
                    id={actionStudent.registration_id}
                    title='Registration Delete'
                    handleSubmit={() => { setOpenModal(false); fetchStudentRegistration() }}
                    handleClose={() => setOpenModal(false)}
                    subtitle='Confirm to delete this student'
                    startIcon={<DeleteIcon />}
                />
            </Modal>
        </>
    )
}