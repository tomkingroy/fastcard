/**
 * Generate a random string
 * @param length {number}
 * @return {string}
 */
export const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_=+[{]};:<>,.?/|'
    const charactersLength = characters.length
    let result = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength)
        result += characters.charAt(randomIndex)
    }

    return result
}

/**
 * Generate a random number string
 * @param length
 * @return {string}
 */
export const generateRandomNumberString = (length: number) => {
    const characters = '0123456789'
    const charactersLength = characters.length
    let result = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength)
        result += characters.charAt(randomIndex)
    }

    return result
}

/**
 * Extract string based on key sub-position
 * @param {string} str
 * @param {number} start
 * @param {string} key
 * @return {*|string}
 */
export const extractSubstring = (str: string, key: string, start = 0) => {
    const index = str.lastIndexOf(key)
    if (index !== -1) {
        return str.substring(start, index)
    }
    return str // If key is not found, the original string is returned.
}

/**
 * Get a random number in a specified interval
 * @param start
 * @param end
 * @return {*}
 */
export const getRandomInt = (start: number, end: number) => {
    return Math.floor(Math.random() * (end - start + 1)) + start
}

export default {
    generateRandomString,
    generateRandomNumberString,
    extractSubstring,
    getRandomInt
}
