---
outline: deep
---

# Attributi trasferibili (fallthrough){#fallthrough-attributes}

> Si assume che tu abbia già letto le [Basi dei componenti](/guide/essentials/component-basics). Leggi prima quello se sei nuovo al concetto di componente.

## Ereditarietà degli attributi {#attribute-inheritance}

Un "attributo fallthrough" è un attributo o un listener `v-on` che viene passato a un componente, ma non è dichiarato esplicitamente nelle [props](./props) o negli [emits](./events#declaring-emitted-events) del componente ricevente. Esempi comuni di questo includono gli attributi `class`, `style`, e `id`.

Quando un componente renderizza un singolo elemento radice, gli attributi fallthrough verranno automaticamente aggiunti agli attributi dell'elemento radice. Ad esempio, dato un componente `<MyButton>` con il seguente template:

```vue-html
<!-- template di <MyButton> -->
<button>cliccami</button>
```

E un genitore che utilizza questo componente con:

```vue-html
<MyButton class="large" />
```

Il DOM renderizzato finale sarebbe:

```html
<button class="large">cliccami</button>
```

Qui, `<MyButton>` non ha dichiarato `class` come prop accettata. Pertanto, `class` è trattata come attributo fallthrough e viene automaticamente aggiunta all'elemento radice di  `<MyButton>`.

### Unione di `class` e `style` {#class-and-style-merging}

Se l'elemento radice del componente figlio ha già attributi `class` o `style` esistenti, essi verranno uniti con i valori di `class` e `style` ereditati dal genitore. Supponiamo di modificare il template di `<MyButton>` nell'esempio precedente in questo modo:

```vue-html
<!-- template di <MyButton> -->
<button class="btn">cliccami</button>
```

Quindi il DOM renderizzato finale diventerebbe:

```html
<button class="btn large">cliccami</button>
```

### Eredità dei Listener `v-on` {#v-on-listener-inheritance}

La stessa regola si applica ai listener degli eventi `v-on`:

```vue-html
<MyButton @click="onClick" />
```

Il listener `click` verrà aggiunto all'elemento radice di `<MyButton>`, cioè all'elemento nativo `<button>`. Quando viene fatto clic sull'elemento nativo `<button>`, verrà innescato il metodo `onClick` del componente genitore. Se l'elemento nativo `<button>`  ha già un listener `click` legato a `v-on`, allora entrambi i listener verranno innescati.

### Ereditarietà dei componenti nidificati {#nested-component-inheritance}

Se un componente renderizza un altro componente come suo nodo radice, ad esempio, abbiamo refactorato  `<MyButton>` per renderizzare un `<BaseButton>` come sua radice:

```vue-html
<!-- template di <MyButton/> che semplicemente renderizza un altro componente -->
<BaseButton />
```

Poi gli attributi fallthrough ricevuti da `<MyButton>` verranno automaticamente inoltrati a `<BaseButton>`.

Nota che:

1. Gli attributi inoltrati non includono alcun attributo dichiarato come prop, né listener  `v-on`  degli eventi dichiarati da `<MyButton>` - in altre parole, le props e i listener dichiarati sono stati "consumati" da `<MyButton>`.

2. Gli attributi inoltrati possono essere accettati come props da `<BaseButton>`, se dichiarati da esso.

## Disattivare l'ereditarietà degli attributi {#disabling-attribute-inheritance}

Se **non** desideri che un componente erediti automaticamente gli attributi, puoi impostare `inheritAttrs: false` nelle opzioni del componente.

<div class="composition-api">

 A partire dalla versione 3.3 puoi anche utilizzare [`defineOptions`](/api/sfc-script-setup#defineoptions) direttamente in `<script setup>`:

```vue
<script setup>
defineOptions({
  inheritAttrs: false
})
// ...logic del setup
</script>
```

</div>

Lo scenario comune per disattivare l'ereditarietà degli attributi è quando gli attributi devono essere applicati ad altri elementi oltre al nodo radice. Impostando l'opzione `inheritAttrs` su `false`, puoi avere pieno controllo su dove dovrebbero essere applicati gli attributi fallthrough.

Questi attributi fallthrough possono essere accessi direttamente nelle espressioni del template come `$attrs`:

```vue-html
<span>Attributi fallthrough: {{ $attrs }}</span>
```

L'oggetto `$attrs` include tutti gli attributi che non sono dichiarati dalle opzioni `props` o `emits`  del componente (ad esempio, attributi come `class`, `style`, `v-on`, etc.).

Alcune note:

- A differenza delle props, gli attributi fallthrough mantengono la loro capitalizzazione originale in JavaScript, quindi per accedere ad un attributo come `foo-bar` devi usare `$attrs['foo-bar']`.

- Un listener `v-on` come `@click` verrà esposto sull'oggetto come una funzione sotto `$attrs.onClick`.

Utilizzando l'esempio del componente `<MyButton>` dalla [sezione precedente](#attribute-inheritance) - a volte potrebbe essere necessario avvolgere l'effettivo elemento `<button>` con un ulteriore `<div>` per scopi stilistici:

```vue-html
<div class="btn-wrapper">
  <button class="btn">cliccami</button>
</div>
```

Vogliamo che tutti gli attributi fallthrough come `class` e i listener `v-on` vengano applicati all'elemento `<button>` interno, non al `<div>`. Possiamo ottenere questo risultato con `inheritAttrs: false` e `v-bind="$attrs"`:

```vue-html{2}
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">cliccami</button>
</div>
```

Ricorda che [`v-bind` senza un argomento](/guide/essentials/template-syntax#dynamically-binding-multiple-attributes) lega tutte le proprietà di un oggetto come attributi dell'elemento di destinazione.

## Ereditarietà degli attributi su più nodi radice  {#attribute-inheritance-on-multiple-root-nodes}

A differenza dei componenti con un singolo nodo radice, i componenti con più nodi radice non hanno un comportamento automatico di ereditarietà degli attributi. Se `$attrs` non viene legato esplicitamente, verrà emesso un avviso a runtime.

```vue-html
<CustomLayout id="custom-layout" @click="changeValue" />
```

Se `<CustomLayout>`  ha il seguente template con più nodi radice, verrà emesso un avviso poiché Vue non può essere certo su dove applicare gli attributi fallthrough:

```vue-html
<header>...</header>
<main>...</main>
<footer>...</footer>
```

L'avviso verrà soppresso se `$attrs` viene legato esplicitamente:

```vue-html{2}
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

## Accesso agli attributi fallthrough in JavaScript  {#accessing-fallthrough-attributes-in-javascript}

<div class="composition-api">

Se necessario, puoi accedere agli attributi fallthrough di un componente in `<script setup>` utilizzando l'API `useAttrs()`:

```vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```

Se non stai usando `<script setup>`, `attrs` verrà esposto come proprietà del contesto `setup()`:

```js
export default {
  setup(props, ctx) {
    // gli attributi fallthrough sono esposti come ctx.attrs
    console.log(ctx.attrs)
  }
}
```

Tieni presente che, sebbene l'oggetto `attrs` qui rifletta sempre gli attributi fallthrough più recenti, non è reattivo (per motivi di prestazioni). Non puoi utilizzare i watcher per osservarne le modifiche. Se hai bisogno di reattività, utilizza una prop. In alternativa, puoi utilizzare `onUpdated()` per eseguire effetti collaterali con l'ultimo `attrs` in ogni aggiornamento.

</div>

<div class="options-api">

Se necessario, puoi accedere agli attributi fallthrough di un componente tramite la proprietà dell'istanza `$attrs`:

```js
export default {
  created() {
    console.log(this.$attrs)
  }
}
```

</div>
