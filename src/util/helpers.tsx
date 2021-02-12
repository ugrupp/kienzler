export const convertMSToInt = ms => parseInt(ms) / 1000

export const removeTrailingSlash = (str: string): string =>
  str.replace(/^(.+?)\/*?$/, "$1")
