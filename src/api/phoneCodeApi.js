import axiosClient from './axiosClient'

const url = '/phonecode'

export const phoneCodeApi = {
    getAll(params) {
        return axiosClient.get(`${url}/getlists`, { params })
    },
    getPhoneCodeById() {
        return axiosClient.get(`${url}/getphonecodebyphonecodeid`)
    },
    getPhoneCodeByStatus() {
        return axiosClient.get(`${url}/getphonecodebystatusid`)
    },
}
