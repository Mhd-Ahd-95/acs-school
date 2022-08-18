import axios from 'axios';
import global from '../global'

const {BaseUrl, headers} = global.api

const ContactAPI = axios.create({
    baseURL: `${BaseUrl}/contact`, 
    headers: headers
})

export const createContact = (payload) =>  ContactAPI.post('', payload)

export const getAllContact = () => ContactAPI.get('')

export const deleteContact = (id) => ContactAPI.delete(`/${id}`)

export const getContactById= (id) => ContactAPI.get(`/${id}`)

const ContactObject = {
    createContact,
    getAllContact,
    deleteContact,
    getContactById
}

export default ContactObject