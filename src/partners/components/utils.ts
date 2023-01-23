export function track() {
  fathom.trackGoal('TTDUIE6G', 0)
}

export function normalizeName(name: string) {
  return name.toLowerCase().replace(/\s+/g, '')
}

export function getHero(img: string | undefined, name: string) {
  return `/images/partners/${img || `${normalizeName(name)}-hero.jpg`}`
}

export function getLogo(img: string, flip = false) {
  if (flip) img = img.replace(/(\.\w+$)/, '-dark$1')
  return `/images/partners/${img}`
}
