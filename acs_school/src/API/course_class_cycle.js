import axios from 'axios';
import global from '../global'

const { BaseUrl, headers } = global.api

const CourseAPI = axios.create({
    baseURL: `${BaseUrl}/course`,
    headers
})

const ClassAPI = axios.create({
    baseURL: `${BaseUrl}/class`,
    headers
})

const CycleAPI = axios.create({
    baseURL: `${BaseUrl}/cycle`,
    headers: headers
})


export const createClass = (payload) => ClassAPI.post('', payload)

export const getAllClasses = () => {return ClassAPI.get('')}

export const deleteClass = (id) => ClassAPI.delete(`/${id}`)

export const createCourse = (payload) => CourseAPI.post('', payload)

export const getAllCourses = () => CourseAPI.get('')

export const deleteCourse = (id) => CourseAPI.delete(`/${id}`)

export const createCycle = (payload) => CycleAPI.post('', payload)

export const deleteCycle = (id) => CycleAPI.delete(`/${id}`)

export const getAllCycle = () => CycleAPI.get('')

const ClassCourseCycle = {
    createClass,
    getAllClasses,
    deleteClass,
    createCourse,
    getAllCourses,
    deleteCourse,
    createCycle,
    deleteCycle,
    getAllCycle
}

export default ClassCourseCycle