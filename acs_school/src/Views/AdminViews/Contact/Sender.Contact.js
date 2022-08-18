import React from 'react'
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'
import {Contact} from '../../../Components/AdminComponents/Contact/Contact'
import {useNavigate} from 'react-router-dom';


export default function ContactSender (){

    const navigate = useNavigate()

    return (
        <CommonMain
            title='Sender Contact'
            titlePage='Messages Reception:'
            noPaper
        >
            <Contact 
                title='contacts'
                onRowClick={((evt, selectedRow) => navigate(`/admin/sender-contact/${selectedRow.contact_id}`))}
                columns={[
                    {
                        cellStyle: { whiteSpace: 'nowrap' },
                        title: 'Name',
                        field: 'name',
                        filterPlaceholder: 'Filter'
                    },
                    {
                        cellStyle: { whiteSpace: 'nowrap' },
                        title: 'Email',
                        field: 'email',
                        filterPlaceholder: 'Filter'
                    },
                    {
                        cellStyle: { whiteSpace: 'nowrap'},
                        title: 'Subject',
                        field: 'subject',
                        filterPlaceholder: 'Filter',
                        filtering: false
                    },
                    {
                        cellStyle: { whiteSpace: 'nowrap' },
                        title: 'Message',
                        field: 'message',
                        filterPlaceholder: 'Filter',
                        filtering: false,
                        width: '40%'
                    }
                ]}
            />

        </CommonMain>
    )
}