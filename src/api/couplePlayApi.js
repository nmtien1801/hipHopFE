import axiosClient from './axiosClient'

const url = '/couple-play'

export const couplePlayApi = {
    getAllPlayerCouple(params) {
        return axiosClient.get(`${url}/get-list-couple-play`, { params })
    },
    addCouple(payload) {
        const { LanguagesID, ...body } = payload
        return axiosClient.post(`${url}/create-couple-play`, body, {
            params: {
                LanguagesID,
            },
        })
    },

    getListRound(params) {
        return axiosClient.get(`${url}/get-list-round`, { params })
    },

    createCouplePlayRound(payload) {
        const { LanguagesID, ...body } = payload
        return axiosClient.post(`${url}/create-couple-play-round`, body, {
            params: {
                LanguagesID,
            },
        })
    },

    updatePointRound(body) {
        return axiosClient.post(`${url}/update-point-round`, body)
    },

    addMoreRound(body) {
        return axiosClient.post(`${url}/create-round-more`, body)
    },

    getResultRound(params) {
        return axiosClient.get(`${url}/get-result-couple`, { params })
    },

    endPlayRound(body) {
        return axiosClient.post(`${url}/end-couple-play`, body)
    },
    endCouplePlayRoundRenew(payload) {
        const { LanguagesID, ...body } = payload

        return axiosClient.post(`${url}/end-couple-play-round-renew`, body, {
            params: {
                LanguagesID,
            },
        })
    },

    checkQualifyingStatus(params) {
        return axiosClient.get(`${url}/check-status-group-state`, { params })
    },
    checkFirstConfrontationStatus(params) {
        return axiosClient.get(`${url}/check-status-round-1`, { params })
    },
    checkFinalConfrontationStatus(params) {
        return axiosClient.get(`${url}/check-status-final-round`, { params })
    },

    getQualifyingPoints(params) {
        return axiosClient.get(`${url}/get-point-group-stage`, { params })
    },
    getConfrontationPoints(params) {
        return axiosClient.get(`${url}/get-point-of-round`, { params })
    },

    getQualifyingList(params) {
        return axiosClient.get(`${url}/get-list-couple-play-by-number-team`, {
            params,
        })
    },
    selectPairsManually(payload) {
        const { lang, ...body } = payload

        return axiosClient.post(`${url}/create-couple-play-by-hand`, body, {
            params: { languagesID: lang },
        })
    },
}
