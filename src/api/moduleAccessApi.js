import axiosClient from './axiosClient'

const url = '/moduleaccess'

export const moduleAccessApi = {
  getAll() {
    return axiosClient.get(`${url}/getlistall`)
  },

  getByID(params) {
    return axiosClient.get(`${url}/getmoudleaccessbymoduleid`, { params })
  },
}
