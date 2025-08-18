import axiosClient from './axiosClient'

const url = '/eventgenre'
export const eventGenreApi = {
    getAll: (params) =>
        axiosClient.get(`${url}/getlistgenrebyeventid`, { params }),
    insertGenreToEvent: (body) =>
        axiosClient.post(`${url}/insertupdatedeleteeventgenre`, body),
    remove: (params) => axiosClient.post(`${url}/delete`, { params }),
}
