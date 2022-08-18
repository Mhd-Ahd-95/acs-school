import React from 'react';
import ContactAPI from '../../../API/contact_api'
import MainLayout from '../../../Layout/Main/MainLayout'
import { ContactForm } from '../../../Components/UserComponents/Contact/contact'


function ContactUs() {
    return (
        <MainLayout
            title='Contact'
            drawerActive='Contact Us'
            titlePage='Send Message'
        >
            <ContactForm
                onSubmit={(payload) => ContactAPI.createContact(payload)}
            />
        </MainLayout>
    )
}

export default ContactUs