# Componenti {#components}

Fino a questo momento, abbiamo lavorato con un solo componente. Le applicazioni Vue reali di solito sono create utilizzando componenti annidati.

Un componente padre può renderizzare un altro componete all'interno del suo template come componente figlio. Per usare un componente figlio, occorre prima importarlo:

<div class="composition-api">
<div class="sfc">

```js
import ChildComp from './ChildComp.vue'
```

</div>
</div>

<div class="options-api">
<div class="sfc">

```js
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  }
}
```

Abbiamo anche bisogno di registrare il componente usando l'opzione `components`. Qui stiamo usando la notazione degli oggetti per registrare il componente `ChildComp` con la chiave `ChildComp`. 

</div>
</div>

<div class="sfc">

Quindi, possiamo usare il componente all'interno del template come:

```vue-html
<ChildComp />
```

</div>

<div class="html">

```js
import ChildComp from './ChildComp.js'

createApp({
  components: {
    ChildComp
  }
})
```

Abbiamo anche bisogno di registrare il componente usando l'opzione `components`. Qui stiamo usando la notazione degli oggetti per registrare il componente `ChildComp` con la chiave `ChildComp`.

Dato che stiamo scrivendo il template all'interno del DOM, esso sarà soggetto alle regole di parsing del browser, che è case-insensitive per i nomi dei tag. Di conseguenza, è necessario usare il kebab-case per fare riferimento al componente figlio:

```vue-html
<child-comp></child-comp>
```

</div>


Prova adesso a importare il componente figlio e a renderizzarlo nel template.
