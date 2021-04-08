---
badges:
  - rimosso
---

# `propsData` <MigrationBadges :badges="$frontmatter.badges" />

## Panoramica

L'opzione `propsData`, usata per passare le props all'istanza di Vue durante la sua creazione, è stata rimossa. Per passare le props al componente root di un'applicazione Vue 3, usa il secondo argomento di [createApp](/api/global-api.html#createapp).

## Sintassi 2.x

Nella versione 2.x, potevamo passare le props a un'istanza di Vue durante la sua creazione:

```js
const Comp = Vue.extend({
  props: ['username'],
  template: '<div>{{ username }}</div>'
})

new Comp({
  propsData: {
    username: 'Evan'
  }
})
```

## Aggiornamento 3.x

L'opzione `propsData` è stata rimossa. Se hai bisogno di passare delle props all'istanza del componente root durante la sua creazione, devi usare il secondo argomento di `createApp`:

```js
const app = createApp(
  {
    props: ['username'],
    template: '<div>{{ username }}</div>'
  },
  { username: 'Evan' }
)
```
