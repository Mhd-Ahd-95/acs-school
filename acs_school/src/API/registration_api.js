import axios from 'axios';
import global from '../global'

const {BaseUrl, headers} = global.api

const RegistrationAPI = axios.create({
    baseURL: `${BaseUrl}/registration`,
    headers: headers
})


export const createRegistration = (payload) => RegistrationAPI.post('', payload); 

export const getRegistration = () => RegistrationAPI.get('') 

export const deleteRegistration = (id) => RegistrationAPI.delete(`/${id}`);

export const getRegistrationById = (id) => RegistrationAPI.get(`/${id}`);

export const updateStatusRegistration = (id, status) => RegistrationAPI.put(`/${id}/${status}`);

const RegistrationObject = {
    createRegistration,
    getRegistration,
    deleteRegistration,
    getRegistrationById,
    updateStatusRegistration
}

export default RegistrationObject