export const getDataFromLS = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const setDataToLS = (key, data) => {
    return localStorage.setItem(key, JSON.stringify(data));
}

export const findValueInData = (primary, inserted) => {
    if (!inserted.trim()) return true

    return primary?.toLowerCase()?.includes(inserted?.toLowerCase())
}

export const getValueFromElement = (selector) => {
    return document.querySelector(selector).value || ''
}