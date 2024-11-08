import developers from './developers.json'

export default {
  paths: developers.map((developer) => {
    return {
      params: {
        developerId: developer.id,
        developerSlug: developer.slug,
      }
    }
  })
}
