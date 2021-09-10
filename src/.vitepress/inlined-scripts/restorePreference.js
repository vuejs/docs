;(() => {
  const restore = (key, cls) => {
    const saved = localStorage.getItem(key)
    if (saved && saved !== 'false') {
      document.documentElement.classList.add(cls)
    }
  }
  restore('vue-docs-prefer-composition', 'prefer-composition')
  restore('vue-docs-prefer-sfc', 'prefer-sfc')
})()
