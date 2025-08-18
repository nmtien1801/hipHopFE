import axiosClient from './axiosClient'

const url = 'countrys'

export const countryApi = {
    getAll(params) {
        return axiosClient.get(`${url}/getLists`, { params })
    },

    getById(params) {
        return axiosClient.get(`${url}/getcountrybycountryid`, { params })
    },
}
