import axiosClient from './axiosClient'

const url = 'registerplay'

export const registerPlayApi = {
  getAll(params) {
    return axiosClient.get(`${url}/getlist`, { params })
  },
  payment(body) {
    return axiosClient.post(`${url}/directpayment`, body)
  },
  updateStatus(body) {
    return axiosClient.post(`${url}/updatestatusid`, body)
  },

  getAllPlayerActive(params) {
    return axiosClient.get(`${url}/getlistuser-by-eventid-genreid-statusid`, {
      params,
    })
  },
  getListUserRegisterByEventID(params) {
    return axiosClient.get(`${url}/getlistuserregisterbyeventid`, {
      params,
    })
  },
  updatePointPlayer(body) {
    return axiosClient.post(`${url}/updatepointplay`, body)
  },

  updatePointUniPlayer(body) {
    return axiosClient.post(`${url}/update-point-criteria`, body)
  },

  getAllJudgePoint(params) {
    return axiosClient.get(`${url}/getlistjudgepoint`, { params })
  },
  getRanking(params) {
    return axiosClient.get(`${url}/getlistuser-by-eventid-genreid-bypoint`, {
      params,
    })
  },

  getAllRankingResult(params) {
    return axiosClient.get(`${url}/getrankingresult`, { params })
  },
  getUniRankingResult(params) {
    return axiosClient.get(`${url}/get-ranking-result-uni`, { params })
  },

  addEventAndGenreForUser(body) {
    return axiosClient.post(`${url}/addcustomerinvite`, body)
  },
  removeGuestOutEvent(body) {
    return axiosClient.post(`${url}/deletecustomerinvite`, body)
  },
  remove(body) {
    return axiosClient.post(`${url}/delete`, body)
  },
}
