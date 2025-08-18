import CryptoJS from 'crypto-js'

const secretKey = 'my-secret-key-198@#*@#'

export function encrypted(json) {
    if (!json) return null
    return CryptoJS.AES.encrypt(JSON.stringify(json), secretKey).toString()
}

export const decrypted = (encrypted) => {
    if (!encrypted) return null
    const decryptedBytes = CryptoJS.AES.decrypt(encrypted, secretKey)
    return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8))
}

export function getToken() {
    const cookies = document.cookie.split(';')
    const tokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith('token='),
    )
    const token = tokenCookie ? tokenCookie.split('=')[1] : ''

    if (!token) {
        document.cookie =
            'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        return null
    }

    return decrypted(token)
}
