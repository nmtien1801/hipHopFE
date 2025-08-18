import axiosClient from './axiosClient'

const url = '/registerplay'

export const playerApi = {
    getAll: (params) => {
        return axiosClient.get(`${url}/getlistregisterplay`, { params })
    },

    getById: (params) => {
        return axiosClient.get(`${url}/getregisterplaybyregisterplayid`, { params })
    },
    getByStatusId: (params) => {
        return axiosClient.get(`${url}/getlistgenrebystatusid`, { params })
    },
    updateStatusId: (body) => {
        return axiosClient.post(`${url}/updateregisterplaystatusID`, body)
    },
    update: (body) => {
        return axiosClient.post(`${url}/insertupdatedeleteregisterplay`, body)
    },
    remove: (params) => {
        return axiosClient.post(`${url}/delete`, { params })
    },
}
