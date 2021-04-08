---
title: Accesso a this della funzione Default delle Props
badges:
  - breaking
---

# Accesso a `this` della funzione `default` delle Props <MigrationBadges :badges="$frontmatter.badges" />

La funzione `default` delle props non ha più accesso a `this`.

Al suo posto:

- Le props grezze ricevute dal componente vengono passate alla funzione `default` come argomento.

- l'API [inject](../composition-api-provide-inject.md) può essere usata all'interno della funzione `default`.

```js
import { inject } from 'vue'

export default {
  props: {
    theme: {
      default (props) {
        // `props` sono i valori grezzi passati al componente prima di ogni 
        // vincolo di tipo / default
        // si può anche usare il metodo `inject` per accedere direttamente alle proprietà injected
        return inject('theme', 'default-theme')
      }
    }
  }
}
```
