import axiosClient from './axiosClient'
const url = '/event'

export const eventApi = {
  getAll(params) {
    return axiosClient.get(`${url}/getlistevent`, { params })
  },
  getActiveEvent(params) {
    return axiosClient.get(`${url}/getlisteventbystatusid`, { params })
  },
  getById(params) {
    return axiosClient.get(`${url}/geteventbyeventid`, { params })
  },

  add(body) {
    return axiosClient.post(`${url}/insertevent`, body)
  },

  edit(body) {
    return axiosClient.post(`${url}/updateevent`, body)
  },
  delete(body) {
    return axiosClient.post(`${url}/delete`, body)
  },

  getAllExaminerByEventId(params) {
    return axiosClient.get(`${url}-user/getuserbyeventid`, { params })
  },
  insertExaminerToEvent(body) {
    return axiosClient.post(`${url}-user/inserteventuser`, body) 
  },
  insertGenreToExaminer(body) {
    return axiosClient.post(`${url}-user/insert-event-genre-for-user`, body)
  },
  getEventByUser(params) {
    return axiosClient.get(`${url}/geteventsbyuserid`, { params })
  },
}
