import axiosClient from './axiosClient'
const url = '/news'
export const newsApi = {
    getAll(params) {
        return axiosClient.get(`${url}/getnews`, { params })
    },
    getById(params) {
        return axiosClient.get(`${url}/getnewsbynewsid`, { params })
    },

    add(body) {
        return axiosClient.post(`${url}/insertnews`, body)
    },
    edit(body) {
        return axiosClient.post(`${url}/updatenews`, body)
    },
    remove(body) {
        return axiosClient.post(`${url}/delete`, body)
    },
}
