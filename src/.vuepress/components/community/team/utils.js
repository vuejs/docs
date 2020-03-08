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
