export function normalizeName(name: string) {
  return name.toLowerCase().replace(/\s+/g, '')
}

export function getHero(name: string) {
  return `/images/partners/${normalizeName(name)}-hero.jpg`
}

export function getLogo(img: string) {
  return `/images/partners/${img}`
}
