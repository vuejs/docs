;(() => {
  const restore = (key, cls, def = false) => {
    const saved = localStorage.getItem(key)
    if (saved ? saved !== 'false' : def) {
      document.documentElement.classList.add(cls)
    }
  }
  restore('vue-docs-prefer-composition', 'prefer-composition')
  restore('vue-docs-prefer-sfc', 'prefer-sfc', true)

  window.__VUE_BANNER_ID__ = 'VS-FW'
  restore(`vue-docs-banner-${__VUE_BANNER_ID__}`, 'banner-dismissed')
})()
