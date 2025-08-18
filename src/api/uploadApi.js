import axiosClient from './axiosClient'

export const uploadApi = {
    upload(body) {
        return axiosClient.post(`/fileupload/upload`, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    uploadAvatar(body) {
        return axiosClient.post(`/fileupload/uploadavarta`, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
}
