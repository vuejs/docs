export const minimizeLink = link => {
  return link
    .replace(/^https?:\/\/(www\.)?/, '')
    .replace(/\/$/, '')
    .replace(/^mailto:/, '')
}

export const generateGithubUrl = (handle, repo) => {
  if (repo && repo.url) {
    return repo.url
  }

  if (repo && repo.includes('/')) {
    // If the repo name has a slash, it must be an organization repo.
    // In such a case, we discard the (personal) handle.
    return `https://github.com/${repo.replace(/\/\*$/, '')}`
  }

  return `https://github.com/${handle}/${repo || ''}`
}

export const getPreferredLanguageCode = () => {
  const nav = window.navigator

  return nav.languages
  // The preferred language set in the browser
  ? nav.languages[0]
  : (
    // The system language in IE
    nav.userLanguage ||
    // The language in the current page
    nav.language
  )
}

/**
 * Calculates great-circle distances between the two points – that is, the shortest distance over the earth’s surface – using the Haversine formula.
 * @param {Number} lat1 The latitude of the 1st location.
 * @param {Number} lon1 The longitude of the 1st location.
 * @param {Number} lat2 The latitude of the 2nd location.
 * @param {Number} lon2 The longitude of the 2nd location.
 */
export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)  // deg2rad below
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // Distance in km
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export const kmToMi = km => km * 0.62137

export const roundDistance = num => Number(Math.ceil(num).toPrecision(2))
