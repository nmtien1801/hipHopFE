import axiosClient from './axiosClient'

const url = '/user'

export const userApi = {
    getAll(params) {
        return axiosClient.get(`${url}/getuser`, { params })
    },
    getById(params) {
        return axiosClient.get(`${url}/profile`, { params })
    },
    uploadAvatar(body) {
        return axiosClient.post(`${url}/uploadavatar`, body)
    },
    add(body) {
        return axiosClient.post(`${url}/create`, body)
    },
    edit(body) {
        return axiosClient.post(`${url}/update`, body)
    },
    remove(params) {
        return axiosClient.post(`${url}/delete`, null, {
            params,
        })
    },
}
