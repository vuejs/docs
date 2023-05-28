import partners from './partners.json'
import { normalizeName } from './components/utils'

export default {
  paths: partners.map((p) => {
    return {
      params: {
        partnerId: normalizeName(p.name)
      }
    }
  })
}
