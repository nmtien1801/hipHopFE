import axiosClient from './axiosClient'

const url = '/user'

export const authApi = {
    login(body) {
        return axiosClient.post(`${url}/login`, body)
    },
    signUp(body) {
        return axiosClient.post(`${url}/create`, body)
    },
    profile(params) {
        return axiosClient.get(`${url}/profile`, { params })
    },
    changePassword(body) {
        return axiosClient.post(`${url}/changepass`, body)
    },
    forgotPassword(body) {
        return axiosClient.post(`${url}/forgotpassword`, body)
    },
    newPlayerRegister(body) {
        return axiosClient.post(`${url}-client/registerplaynew`, body)
    },
    oldPlayerRegister(body) {
        return axiosClient.post(`${url}-client/registerplaygenres`, body)
    },
}
