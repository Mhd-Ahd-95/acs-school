import React from 'react'
import { Table } from '../Table/Table'
import { useSnackbar } from 'notistack'
import ContactAPI from '../../../API/contact_api'
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from '@material-ui/core';
import { ConfirmModal } from '../StudentRegistered/ConfirmModal'
import Icons from '../Table/Icons'

export function Contact(props) {

    const { enqueueSnackbar } = useSnackbar()
    const [data, setData] = React.useState([])
    const [actionContact, setActionContact] = React.useState({})
    const [isLoading, setLoading] = React.useState(false)
    const [openModal, setOpenModal] = React.useState(false)

    const fetchAllContacts = React.useCallback(() => {
        setLoading(true)
        ContactAPI
            .getAllContact()
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                enqueueSnackbar(`Failed to load contacts`, { variant: 'error', })
            })
            .finally(() => { setLoading(false) })
    }, [enqueueSnackbar])

    React.useEffect(() => {
        fetchAllContacts()
    }, [fetchAllContacts])

    const ref = React.useRef(null)
    console.log(actionContact)
    return (
        <>
            <Table
                filter
                tabletype='contacts'
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
                actions={[{
                    icon: Icons.Delete,
                    onClick: (e, rowData) => {
                        setOpenModal(true);
                        setActionContact(rowData)
                    }
                }]}
            />
            <Modal open={openModal} ref={ref}>
                <ConfirmModal 
                    contact_id={actionContact.contact_id}
                    title='Contact Delete'
                    handleSubmit={() => { setOpenModal(false); fetchAllContacts() }}
                    handleClose={() => setOpenModal(false)}
                    subtitle='Confirm to delete this contact'
                    startIcon={<DeleteIcon />}
                />
            </Modal>
        </>
    )
}