import axiosClient from './axiosClient'

const url = 'genre'

export const genreApi = {
    getAll: (params) => {
        return axiosClient.get(`${url}/getlistgenre`, { params })
    },
    getById: (params) => {
        return axiosClient.get(`${url}/getgenrebygenresid/`, { params })
    },
    getAllByStatusId: (params) => {
        return axiosClient.get(`${url}/getlistgenrebystatusid/`, { params })
    },
    add: (body) => {
        return axiosClient.post(`${url}/insertgenre`, body)
    },
    edit: (body) => {
        return axiosClient.post(`${url}/updategenre`, body)
    },
    remove: (body) => {
        return axiosClient.post(`${url}/delete`, body)
    },
    getGenreByUserId: (params) => {
        return axiosClient.get(`${url}/get-genres-by-user/`, { params })
    },
}
