import axios from 'axios';
import global from '../global'

const {BaseUrl, headers} = global.api

const UserAPI = axios.create({
    baseURL: `${BaseUrl}/user`,
    headers: headers
})

const AuthAPI = axios.create({
    baseURL: `${BaseUrl}/login`,
    headers
})


export const createUser = (payload) => {
    
   return UserAPI.post('', payload)
}

export const login = (email, password) => {
    return AuthAPI.get('', { auth : {username: email, password: password}})
}
 
export const getUser = (user_id) => UserAPI.get(`/${user_id}`)

export const getAllUsers = () => UserAPI.get('')

export const getUsersByType = (type) => UserAPI.get(`/type/${type}`)

export const deleteUser = (user_id) => UserAPI.delete(`/${user_id}`)

export const updateUser = (user_id, payload) => UserAPI.put(`${user_id}`, payload)

export const getUserByEmail = (email) => UserAPI.get(`email/${email}`)


const UserObject = {
    createUser,
    getUser,
    getAllUsers,
    getUsersByType,
    deleteUser,
    updateUser,
    getUserByEmail,
    login
}

export default UserObject