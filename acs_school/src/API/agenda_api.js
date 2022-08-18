import global from '../global'
import axios from 'axios';

const { BaseUrl, headers } = global.api

const AgendaAPI = axios.create({
    baseURL: `${BaseUrl}/agenda`,
    headers: headers
})

export const createAgenda = (payload) => AgendaAPI.post('', payload)

export const getAgendaByClassDate = (date, clss) => AgendaAPI.get(`/${date}/${clss}`)

export const getAgendaByDate = (date) => AgendaAPI.get(`/${date}`)

export const updateAgenda = (id, payload) => AgendaAPI.put(`/${id}`, payload)

export const deleteAgenda = (id) => AgendaAPI.delete(`/${id}`)

export const updateStatus = (id) => AgendaAPI.patch(`/${id}`, {status: 'open'})

export const updateAgendas = (agendas) => {
    const promise = []
    agendas.forEach(agenda => promise.push(updateStatus(agenda.agenda_id)))
    return Promise.all(promise)
}

const AgendaObject = {
    createAgenda,
    getAgendaByClassDate,
    getAgendaByDate,
    updateAgenda,
    deleteAgenda,
    updateAgendas
}

export default AgendaObject