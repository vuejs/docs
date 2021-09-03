;(() => {
  // inlined in head
  const saved = localStorage.getItem('vue-docs-api-preference')
  if (saved && saved !== 'false') {
    document.documentElement.classList.add('prefer-composition')
  }
})()
