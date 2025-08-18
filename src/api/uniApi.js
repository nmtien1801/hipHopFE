import axiosClient from './axiosClient'

const url = '/registerplay/create-uni-number-play-2'

export const uniApi = {
  add(body) {
    return axiosClient.post(`${url}`, body)
  },
}
