;(() => {
  const restore = (key, cls) => {
    const saved = localStorage.getItem(key)
    if (saved && saved !== 'false') {
      document.documentElement.classList.add(cls)
    }
  }
  restore('vue-docs-api-preference', 'prefer-composition')
  restore('vue-docs-format-preference', 'prefer-sfc')
})()
