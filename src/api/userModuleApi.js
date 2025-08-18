import axiosClient from './axiosClient'

const url = '/usermoduleaccess'

export const userModuleApi = {
  getAllPermission(params) {
    return axiosClient.get(`${url}/getlistModuleAccessbyuserid`, { params })
  },

  insertPermission(body) {
    return axiosClient.post(`${url}/insertpermission`, body)
  },
}
