export function stringToASCII(str) {
    if (!str) return ''
    try {
        return str
            .replace(/[àáảãạâầấẩẫậăằắẳẵặ]/g, 'a')
            .replace(/[èéẻẽẹêềếểễệ]/g, 'e')
            .replace(/[đ]/g, 'd')
            .replace(/[ìíỉĩị]/g, 'i')
            .replace(/[òóỏõọôồốổỗộơờớởỡợ]/g, 'o')
            .replace(/[ùúủũụưừứửữự]/g, 'u')
            .replace(/[ỳýỷỹỵ]/g, 'y')
    } catch {
        return ''
    }
}

export const truncateText = (text, maxLength) => {
    if (!text || !maxLength) return ''
    if (text?.length <= maxLength) return text
    return `${text.slice(0, maxLength - 1)}...`
}

export function clearToken() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

export function setToken(token) {
    const oneDay = 60 * 60 * 24 * 1000 // milliseconds
    const expires = new Date(Date.now() + oneDay)
    document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/;`
}

export const formatCurrency = (value, locales = 'vi-VN', currency = 'VND') => {
    return new Intl.NumberFormat(locales, {
        style: 'currency',
        currency: currency,
    }).format(value)
}
