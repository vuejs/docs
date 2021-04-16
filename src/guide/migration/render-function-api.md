---
badges:
  - breaking
---

# Render Function API <MigrationBadges :badges="$frontmatter.badges" />

## Panoramica

Questa modifica non riguarda gli utilizzatori di `<template>`.

Ecco un breve riassunto di quello che è cambiato:

- `h` è ora importato globalmente invece di essere passato alle funzioni di rendering come argomento
- gli argomenti della funzione di rendering sono stati modificati per essere più coerenti tra componenti stateful e functional
- I VNodes hanno ora una struttura di props più lineare

Per ulteriori informazioni, continua a leggere!

## Argomento della Render Function

### Sintassi 2.x

Nella versione 2.x, la funzione `render` riceve automaticamente la funzione `h` (che è un alias convenzionale di `createElement`) come argomento:

```js
// Vue 2 esempio di funzione Render
export default {
  render(h) {
    return h('div')
  }
}
```

### Sintassi 3.x

Nella versione 3.x, `h` è importato globalmente invece di essere passato automaticamente come argomento:

```js
// Vue 3 esempio di funzione Render
import { h } from 'vue'

export default {
  render() {
    return h('div')
  }
}
```

## Modifica nell'utilizzo della funzione render

### Sintassi 2.x

Nella versione 2.x, la funzione `render` riceve automaticamente degli argomenti, come ad esempio `h`.

```js
// Vue 2 esempio di funzione Render
export default {
  render(h) {
    return h('div')
  }
}
```

### Sintassi 3.x

Nella versione 3.x, poiché la funzione `render` non riceve più alcun argomento, viene usata principalmente all'interno della funzione `setup()`. Uno dei vantaggi immediati è ottenere l'accesso allo stato reattivo e alle funzioni dichiarate nello stesso scope, così come l'accesso agli argomenti passati a `setup()`.

```js
import { h, reactive } from 'vue'

export default {
  setup(props, { slots, attrs, emit }) {
    const state = reactive({
      count: 0
    })

    function increment() {
      state.count++
    }

    // restituisce una funzione render
    return () =>
      h(
        'div',
        {
          onClick: increment
        },
        state.count
      )
  }
}
```

Per altre informazioni su come funziona `setup()`, leggi la guida alla [Composition API](/guide/composition-api-introduction.html).

## Formato delle Props in VNode

### Sintassi 2.x

Nella versione 2.x, `domProps` contiene un elenco annidato all'interno delle props di un VNode:

```js
// 2.x
{
  staticClass: 'button',
  class: {'is-outlined': isOutlined },
  staticStyle: { color: '#34495E' },
  style: { backgroundColor: buttonColor },
  attrs: { id: 'submit' },
  domProps: { innerHTML: '' },
  on: { click: submitForm },
  key: 'submit-button'
}
```

### Sintassi 3.x

Nella vesione 3.x, l'intera struttura delle props di un VNode è più lineare. Eccome come si presenta adesso la stessa struttura nell'esempio della versione 2.x:


```js
// 3.x
{
  class: ['button', { 'is-outlined': isOutlined }],
  style: [{ color: '#34495E' }, { backgroundColor: buttonColor }],
  id: 'submit',
  innerHTML: '',
  onClick: submitForm,
  key: 'submit-button'
}
```

## Registered Component

### Sintassi 2.x

Nella vesione 2.x, quando un componente è stato memorizzato, la funzione di rendering funziona a dovere quando gli si passa il nome del componente come stringa come primo argomento:


```js
// 2.x
Vue.component('button-counter', {
  data() {
    return {
      count: 0
    }
  }
  template: `
    <button @click="count++">
      Clicked {{ count }} times.
    </button>
  `
})

export default {
  render(h) {
    return h('button-counter')
  }
}
```

### Sintassi 3.x

Nella versione 3.x, visto che i VNodes sono privi di contesto, non possiamo più utilizzare un ID string per cercare i componenti registrati. Invece, abbiamo bisogno di importare ed usare il metodo `resolutionComponent`

```js
// 3.x
import { h, resolveComponent } from 'vue'

export default {
  setup() {
    const ButtonCounter = resolveComponent('button-counter')
    return () => h(ButtonCounter)
  }
}
```

Per informazioni più approfondite, vedi [la RFC del cambio di API della Render Function](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0008-render-function-api-change.md#context-free-vnodes).

## Strategia di migrazione

### Per gli autori di librerie

L'importazione globale di `h` significa che qualsiasi libreria che contiene componenti Vue includerà `import {h} from 'vue'` da qualche parte. Questo crea un po' di complicazioni poiché richiede agli autori di librerie di configurare correttamente l'esternalizzazione di Vue nella loro configurazione di build:

- Vue non dovrebbe essere incluso nella libreria.
- Per le build di moduli, l'importazione non va toccata perché gestita dal bundler dell'utente finale.
- Per le build UMD / browser, si dovrebbe prima cercare Vue.h globale e usare `require` solo come ripiego.

## Prossimi passi

Vedi la guida alla [Render Function](/guide/render-function) per una documentazione ancora più approfondita!
