import axios from 'axios';
import global from '../global';

const {BaseUrl, headers} = global.api

const NotifcationAPI = axios.create({
    baseURL: `${BaseUrl}/notification`,
    headers: headers
})

export const getNotification = () => NotifcationAPI.get('')

export const updateNotification = (id, status) => NotifcationAPI.patch(`/${id}`, status)


const NotificationObject = {
    getNotification,
    updateNotification
}

export default NotificationObject