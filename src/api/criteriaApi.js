import axiosClient from './axiosClient'
const url = '/criteria'
export const criteriaApi = {
  getAll(params) {
    return axiosClient.get(`${url}/get-criteria-by-event-genres`, { params })
  },

  add(body) {
    return axiosClient.post(`${url}/insert-criteria`, body)
  },
  edit(body) {
    return axiosClient.post(`${url}/update-criteria`, body)
  },
  remove(body) {
    return axiosClient.post(`${url}/delete`, body)
  },
}
