export const saveInCache = (key, value) => {
  localStorage.setItem(key, value)
}

export const getSavedItem = (key) => {
  return localStorage.getItem(key)
}
