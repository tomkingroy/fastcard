/**
 * No leading or trailing spaces are allowed
 * @param value
 */
export const noSideSpace = (value: string) => !value.startsWith(' ') && !value.endsWith(' ')
