# Nozioni base sui Componenti {#components-basics}

I componenti ci permettono di dividere l'interfaccia utente in parti indipendenti e riutilizzabili, e di pensare a ciascuna parte in modo separato. È normale che un'app sia organizzata in un albero di componenti annidati:

![Albero dei Componenti](./images/components.png)

<!-- https://www.figma.com/file/qa7WHDQRWuEZNRs7iZRZSI/components -->

Questo è molto simile al modo in cui si annidano gli elementi HTML nativi, ma Vue implementa il proprio modello di componenti che ci permette di incapsulare contenuti e logica personalizzati in ciascun componente. Vue funziona bene anche con i Web Components nativi. Se sei curioso di conoscere la relazione tra i Componenti Vue e i Web Components nativi, [leggi di più qui](/guide/extras/web-components).

## Definizione di un Componente {#defining-a-component}

Quando si utilizza uno strumento di build, di solito definiamo ogni componente Vue in un file dedicato utilizzando l'estensione `.vue` - noto come [Componente in un Singolo File](/guide/scaling-up/sfc) (SFC in breve):

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Mi hai cliccato {{ count }} volte.</button>
</template>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">Mi hai cliccato {{ count }} volte.</button>
</template>
```

</div>

Quando non si utilizza uno strumento di build, un componente Vue può essere definito come un semplice oggetto JavaScript contenente opzioni specifiche per Vue:

<div class="options-api">

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      Mi hai cliccato {{ count }} volte.
    </button>`
}
```

</div>
<div class="composition-api">

```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `
    <button @click="count++">
      Mi hai cliccato {{ count }} volte.
    </button>`
  // È anche possibile puntare a un template nel DOM:
  // template: '#my-template-element'
}
```

</div>

TIl template qui è inserito direttamente come stringa JavaScript, che Vue compilerà immediatamente. Puoi anche utilizzare un selettore ID che punta a un elemento (solitamente elementi `<template>` nativi) - Vue utilizzerà il suo contenuto come sorgente del template.

L'esempio sopra definisce un singolo componente e lo esporta come un export predefinito di un file `.js`, ma puoi utilizzare export con nomi dedicati per esportare più componenti dallo stesso file.

## Utilizzo di un Componente {#using-a-component}

:::tip
Utilizzeremo la sintassi SFC per il resto di questa guida - i concetti riguardanti i componenti sono gli stessi, indipendentemente dal fatto che si utilizzi uno strumento di build o meno. La sezione [Esempi](/examples/) mostra l'utilizzo dei componenti in entrambi gli scenari.
:::

Per utilizzare un componente figlio, dobbiamo importarlo nel componente genitore. Supponendo di aver collocato il nostro componente contatore all'interno di un file chiamato `ButtonCounter.vue`, il componente sarà esposto come export predefinito del file:

<div class="options-api">

```vue
<script>
import ButtonCounter from './ButtonCounter.vue'

export default {
  components: {
    ButtonCounter
  }
}
</script>

<template>
  <h1>Ecco un componente figlio!</h1>
  <ButtonCounter />
</template>
```

Per esporre il componente importato nel nostro template, dobbiamo [registrarlo](/guide/components/registration) con l'opzione `components`. Il componente sarà quindi disponibile come un tag utilizzando la chiave con cui è registrato.

</div>

<div class="composition-api">

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>Ecco un componente figlio!</h1>
  <ButtonCounter />
</template>
```

Con `<script setup>`, i componenti importati sono disponibili nel template automaticamente.

</div>

È anche possibile registrare globalmente un componente, rendendolo disponibile a tutti i componenti in una determinata app senza doverlo importare. I pro e i contro della registrazione globale rispetto a quella locale sono discussi nella sezione dedicata alla [Registrazione dei Componenti](/guide/components/registration).

I Componenti possono essere riutilizzati quante volte si vuole:

```vue-html
<h1>Ecco molti componenti figli!</h1>
<ButtonCounter />
<ButtonCounter />
<ButtonCounter />
```

<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNqVUE1LxDAQ/StjLqusNHotcfHj4l8QcontLBtsJiGdiFL6301SdrEqyEJyeG9m3ps3k3gIoXlPKFqhxi7awDtN1gUfGR4Ts6cnn4gxwj56B5tGrtgyutEEoAk/6lCPe5MGhqmwnc9KhMRjuxCwFi3UrCk/JU/uGTC6MBjGglgdbnfPGBFM/s7QJ3QHO/TfxC+UzD21d72zPItU8uQrrsWvnKsT/ZW2N2wur45BI3KKdETlFlmphZsF58j/RgdQr3UJuO8G273daVFFtlstahngxSeoNezBIUzTYgPzDGwdjk1VkYvMj4jzF0nwsyQ=)

</div>
<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNqVj91KAzEQhV/lmJsqlY3eSlr8ufEVhNys6ZQGNz8kE0GWfXez2SJUsdCLuZiZM9+ZM4qnGLvPQuJBqGySjYxMXOJWe+tiSIznwhz8SyieKWGfgsOqkyfTGbDSXsmFUG9rw+Ti0DPNHavD/faVEqGv5Xr/BXOwww4mVBNPnvOVklXTtKeO8qKhkj++4lb8+fL/mCMS7TEdAy6BtDfBZ65fVgA2s+L67uZMUEC9N0s8msGaj40W7Xa91qKtgbdQ0Ha0gyOM45E+TWDrKHeNIhfMr0DTN4U0me8=)

</div>

Nota che quando si fa clic sui pulsanti, ognuno mantiene il proprio `count` separato. Questo succede perché ogni volta che si utilizza un componente, ne viene creata una nuova **istanza**.

Negli SFC, si consiglia di utilizzare i nomi dei tag in `PascalCase` per i componenti figli per differenziarli dagli elementi HTML nativi. Sebbene i nomi dei tag HTML nativi siano insensibili alle maiuscole/minuscole (case-insensitive), Vue SFC è un formato compilato, quindi siamo in grado di utilizzare nomi di tag sensibili alle maiuscole/minuscole (case-sensitive). Siamo anche in grado di utilizzare `/>` per chiudere un tag.

Se stai usando i tuoi template direttamente in un DOM (ad es. come contenuto di un elemento `<template>` nativo), il template sarà soggetto al comportamento di analisi HTML nativo del browser. In tali casi, sarà necessario utilizzare la `kebab-case` e esplicitare i tag di chiusura  per i componenti:

```vue-html
<!-- se questo template è scritto nel DOM -->
<button-counter></button-counter>
<button-counter></button-counter>
<button-counter></button-counter>
```

Consulta i [problemi dell'analisi del template DOM](#dom-template-parsing-caveats) per maggiori dettagli.

## Passaggio delle Props {#passing-props}

Se stiamo costruendo un blog, avremo probabilmente bisogno di un componente che rappresenti un post del blog. Vogliamo che tutti i post del blog condividano lo stesso layout visuale, ma con contenuti diversi. Un componente del genere non sarà utile a meno che non vi si possa passare dei dati, come il titolo e il contenuto dello specifico post che vogliamo visualizzare. È qui che entrano in gioco le props.

Le props sono attributi personalizzati che puoi registrare su un componente. Per passare un titolo al nostro componente del post del blog, dobbiamo dichiararlo nell'elenco delle props che questo componente accetta, utilizzando l'opzione <span class="options-api">[`props`](/api/options-state#props)</span><span class="composition-api">[`defineProps`](/api/sfc-script-setup#defineprops-defineemits) macro</span>:

<div class="options-api">

```vue
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title']
}
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

Quando un valore viene passato a un attributo prop, diventa una proprietà di quell'istanza del componente. Il valore di quella proprietà è accessibile all'interno del template e nel contesto `this` del componente, proprio come qualsiasi altra proprietà del componente.

</div>
<div class="composition-api">

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

`defineProps`è una macro che viene elaborata al momento della compilazione (compile-time) ed è disponibile solo all'interno di `<script setup>` senza bisogno di essere importata esplicitamente. Le props dichiarate sono automaticamente esposte nel template. `defineProps` restituisce anche un oggetto che contiene tutte le props passate al componente, in modo che possiamo accedervi in JavaScript se necessario:

```js
const props = defineProps(['title'])
console.log(props.title)
```

Vedi anche: [Tipizzazione delle Prop di un Componente](/guide/typescript/composition-api#typing-component-props) <sup class="vt-badge ts" />

Se non stai utilizzando `<script setup>`, le props dovrebbero essere dichiarate utilizzando l'opzione `props`, e l'oggetto delle props verrà passato a `setup()` come primo argomento:

```js
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

</div>

Un componente può avere tutte le props che desideri e, di default, qualsiasi valore può essere passato a qualsiasi prop.

Una volta registrata una prop, puoi passare dati ad essa come attributo personalizzato, in questo modo:

```vue-html
<BlogPost title="My journey with Vue" />
<BlogPost title="Blogging with Vue" />
<BlogPost title="Why Vue is so fun" />
```

In un'app tipica, tuttavia, è probabile che tu abbia un array di post nel tuo componente genitore:

<div class="options-api">

```js
export default {
  // ...
  data() {
    return {
      posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' }
      ]
    }
  }
}
```

</div>
<div class="composition-api">

```js
const posts = ref([
  { id: 1, title: 'My journey with Vue' },
  { id: 2, title: 'Blogging with Vue' },
  { id: 3, title: 'Why Vue is so fun' }
])
```

</div>

E per ciascuna voce, vorresti poter renderizzare un componente utilizzando `v-for`:

```vue-html
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
 />
```

<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNp9UU1rhDAU/CtDLrawVfpxklRo74We2kPtQdaoaTUJ8bmtiP+9ia6uC2VBgjOZeXnz3sCejAkPnWAx4+3eSkNJqmRjtCU817p81S2hsLpBEEYL4Q1BqoBUid9Jmosi62rC4Nm9dn4lFLXxTGAt5dG482eeUXZ1vdxbQZ1VCwKM0zr3x4KBATKPcbsDSapFjOClx5d2JtHjR1KFN9fTsfbWcXdy+CZKqcqL+vuT/r3qvQqyRatRdMrpF/nn/DNhd7iPR+v8HCDRmDoj4RHxbfyUDjeFto8p8yEh1Rw2ZV4JxN+iP96FMvest8RTTws/gdmQ8HUr7ikere+yHduu62y//y3NWG38xIOpeODyXcoE8OohGYZ5VhhHHjl83sD4B3XgyGI=)

</div>
<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNp9kU9PhDAUxL/KpBfWBCH+OZEuid5N9qSHrQezFKhC27RlDSF8d1tYQBP1+N78OpN5HciD1sm54yQj1J6M0A6Wu07nTIpWK+MwwPASI0qjWkQejVbpsVHVQVl30ZJ0WQRHjwFMnpT0gPZLi32w2h2DMEAUGW5iOOEaniF66vGuOiN5j0/hajx7B4zxxt5ubIiphKz+IO828qXugw5hYRXKTnqSydcrJmk61/VF/eB4q5s3x8Pk6FJjauDO16Uye0ZCBwg5d2EkkED2wfuLlogibMOTbMpf9tMwP8jpeiMfRdM1l8Tk+/F++Y6Cl0Lyg1Ha7o7R5Bn9WwSg9X0+DPMxMI409fPP1PELlVmwdQ==)

</div>

Nota come `v-bind` venga utilizzato per passare valori di props dinamici. Questo è particolarmente utile quando non si conosce in anticipo l'esatto contenuto che si andrà a renderizzare.

Questo è tutto ciò che c'è da sapere sulle props per ora, ma una volta che avrai finito di leggere questa pagina e ti sentirai a tuo agio con il suo contenuto, ti consigliamo di tornare in seguito a leggere la guida completa sulle [Props](/guide/components/props).

## Ascolto degli Eventi {#listening-to-events}

Mentre sviluppiamo il nostro componente `<BlogPost>`, alcune funzionalità potrebbero richiedere di comunicare nuovamente con il componente genitore. Ad esempio, potremmo decidere di includere una funzionalità di accessibilità per ingrandire il testo dei post del blog, lasciando il resto della pagina alla sua dimensione predefinita.

Nel componente genitore possiamo aggiungere questa funzionalità tramite una <span class="options-api">proprietà data</span><span class="composition-api">ref</span> `postFontSize`:

<div class="options-api">

```js{6}
data() {
  return {
    posts: [
      /* ... */
    ],
    postFontSize: 1
  }
}
```

</div>
<div class="composition-api">

```js{5}
const posts = ref([
  /* ... */
])

const postFontSize = ref(1)
```

</div>

La quale può essere utilizzata nel template per controllare la dimensione del carattere di tutti i post del blog:

```vue-html{1,7}
<div :style="{ fontSize: postFontSize + 'em' }">
  <BlogPost
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
   />
</div>
```

Ora aggiungiamo un pulsante al template del componente `<BlogPost>`:

```vue{5}
<!-- BlogPost.vue, omesso <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button>Enlarge text</button>
  </div>
</template>
```

Il pulsante non fa ancora nulla: vogliamo che fare clic sul pulsante comunichi al genitore che dovrebbe ingrandire il testo di tutti i post. Per risolvere questo problema, i componenti forniscono un sistema di eventi personalizzati. Il componente genitore può scegliere di ascoltare qualsiasi evento sull'istanza del componente figlio con `v-on` o `@`, proprio come faremmo con un evento DOM nativo:

```vue-html{3}
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
 />
```

Poi il componente figlio può emettere un evento esso stesso usando il metodo integrato [**`$emit`**](/api/component-instance#emit), passando il nome dell'evento:

```vue{5}
<!-- BlogPost.vue, omesso <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Enlarge text</button>
  </div>
</template>
```

Grazie al listener `@enlarge-text="postFontSize += 0.1"`, il componente genitore riceverà l'evento e aggiornerà il valore di `postFontSize`.

<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNqNUsFOg0AQ/ZUJMaGNbbHqidCmmujNxMRED9IDhYWuhV0CQy0S/t1ZYIEmaiRkw8y8N/vmMZVxl6aLY8EM23ByP+Mprl3Bk1RmCPexjJ5ljhBmMgFzYemEIpiuAHAFOzXQgIVeESNUKutL4gsmMLfbBPStVFTP1Bl46E2mup4xLDKhI4CUsMR+1zFABTywYTkD5BgzG8ynEj4kkVgJnxz38Eqaut5jxvXAUCIiLqI/8TcD/m1fKhTwHHIJYSEIr+HbnqikPkqBL/yLSMs23eDooNexel8pQJaksYeMIgAn4EewcyxjtnKNCsK+zbgpXILJEnW30bCIN7ZTPcd5KDNqoWjARWufa+iyfWBlV13wYJRvJtWVJhiKGyZiL4vYHNkJO8wgaQVXi6UGr51+Ndq5LBqMvhyrH9eYGePtOVu3n3YozWSqFsBsVJmt3SzhzVaYY2nm9l82+7GX5zTGjlTM1SyNmy5SeX+7rqr2r0NdOxbFXWVXIEoBGz/m/oHIF0rB5Pz6KTV6aBOgEo7Vsn51ov4GgAAf2A==)

</div>
<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNp1Uk1PwkAQ/SuTxqQYgYp6ahaiJngzITHRA/UAZQor7W7TnaK16X93th8UEuHEvPdm5s3bls5Tmo4POTq+I0yYyZTAIOXpLFAySXVGUEKGEVQQZToBl6XukXqO9XahDbXc2OsAO5FlAIEKtWJByqCBqR01WFqiBLnxYTIEkhSjD+5rAV86zxQW8C1pB+88Aaphr73rtXbNVqrtBeV9r/zYFZYHacBoiHLFykB9Xgfq1NmLVvQmf7E1OGFaeE0anAMXhEkarwhtRWIjD+AbKmKcBk4JUdvtn8+6ARcTu87hLuCf6NJpSoDDKNIZj7BtIFUTUuB0tL/HomXHcnOC18d1TF305COqeJVtcUT4Q62mtzSF2/GkE8/E8b1qh8Ljw/if8I7nOkPn9En/+Ug2GEmFi0ynZrB0azOujbfB54kki5+aqumL8bING28Yr4xh+2vePrI39CnuHmZl2TwwVJXwuG6ZdU6kFTyGsQz33HyFvH5wvvyaB80bACwgvKbrYgLVH979DQc=)

</div>

Facoltativamente possiamo dichiarare gli eventi emessi usando l'opzione <span class="options-api">[`emits`](/api/options-state#emits)</span><span class="composition-api">[`defineEmits`](/api/sfc-script-setup#defineprops-defineemits) macro</span>:

<div class="options-api">

```vue{5}
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title'],
  emits: ['enlarge-text']
}
</script>
```

</div>
<div class="composition-api">

```vue{4}
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
defineEmits(['enlarge-text'])
</script>
```

</div>

Ciò documenta tutti gli eventi che un componente può emettere e, facoltativamente, ne [effettua la convalida](/guide/components/events#events-validation). Inoltre, consente a Vue di evitare l'applicazione implicita come listener nativi sull'elemento radice del componente figlio.

<div class="composition-api">

In modo simile a `defineProps`, `defineEmits` è utilizzabile soltanto all'interno di `<script setup>` e non necessita di essere importato. Restituisce una funzione `emit` che funziona in maniera equivalente al metodo `$emit`. Questa può essere usata per usare eventi nella sezione `<script setup>` di un componente, là dove `$emit` non è direttamente accessibile.

```vue
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>
```

Vedi anche: [Tipizzazione degli Emits di un Componente](/guide/typescript/composition-api#typing-component-emits) <sup class="vt-badge ts" />

Se non stai utilizzando `<script setup>`, puoi dichiarare gli eventi emessi mediante l'opzione `emits`. Puoi accedere alla funzione emit come una proprietà del contesto di configurazione (fornito a `setup()` come secondo argomento).

```js
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
}
```

</div>

Questo è tutto ciò che c'è da sapere al momento sugli eventi personalizzati dei componenti, ma una volta che avrai finito di leggere questa pagina e ti sentirai a tuo agio con il suo contenuto, ti suggeriamo di tornare in seguito a leggere la guida completa sugli [Eventi Personalizzati](/guide/components/events).

## Distribuzione del Contenuto con gli Slot {#content-distribution-with-slots}

Come avviene con gli elementi HTML, è spesso utile poter trasmettere contenuto a un componente nel seguente modo:

```vue-html
<AlertBox>
  Qualcosa è andato storto.
</AlertBox>
```

Ciò potrebbe produrre un risultato simile a:

:::danger Questo è un Errore a Scopo Dimostrativo
Qualcosa è andato storto.
:::

Questo risultato può essere ottenuto usando l'elemento personalizzato `<slot>` di Vue:

```vue{4}
<template>
  <div class="alert-box">
    <strong>Questo è un Errore a Scopo Dimostrativo</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

Come potrai vedere, utilizziamo il `<slot>` come contenitore per indicare dove posizionare il contenuto. E con questo, abbiamo concluso!

<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNpVUcFOwzAM/RUTDruwFhCaUCmThsQXcO0lbbKtIo0jx52Kpv07TreWouTynl+en52z2oWQnXqrClXGhtrA28q3XUBi2DlL/IED7Ak7WGX5RKQHq8oDVN4Oo9TYve4dwzmxDcp7bz3HAs5/LpfKyy3zuY0Atl1wmm1CXE5SQeLNX9hZPrb+ALU2cNQhWG9NNkrnLKIt89lGPahlyDTVogVAadoTNE7H+F4pnZTrGodKjUUpRyb0h+0nEdKdRL3CW7GmfNY5ZLiiMhfP/ynG0SL/OAuxwWCNMNncbVqSQyrgfrPZvCVcIxkrxFMYIKJrDZA1i8qatGl72ehLGEY6aGNkNwU8P96YWjffB8Lem/Xkvn9NR6qy+fRd14FSgopvmtQmzTT9Toq9VZdfIpa5jQ==)

</div>
<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNpVUEtOwzAQvcpgFt3QBBCqUAiRisQJ2GbjxG4a4Xis8aQKqnp37PyUyqv3mZn3fBVH55JLr0Umcl9T6xi85t4VpW07h8RwNJr4Cwc4EXawS9KFiGO70ubpNBcmAmDdOSNZR8T5Yg0IoOQf7DSfW9tAJRWcpXPaapWM1nVt8ObpukY8ie29GHNzAiBX7QVqI73/LIWMzn2FQylGMcieCW1TfBMhPYSoE5zFitLVZ5BhQnkadt6nGKt5/jMafI1Oq8Ak6zW4xrEaDVIGj4fD4SPiCknpQLy4ATyaVgFptVH2JFXb+wze3DDSTioV/iaD1+eZqWT92xD2Vu2X7af3+IJ6G7/UToVigpJnTzwTO42eWDnELsTtH/wUqH4=)

</div>

Questo è tutto ciò che c'è da sapere sugli slot per il momento, ma una volta che avrai terminato la lettura di questa pagina e ti sentirai a tuo agio con il suo contenuto, ti suggeriamo di tornare in seguito a leggere la guida completa sugli [Slots](/guide/components/slots).

## Componenti Dinamici {#dynamic-components}

A volte, può essere utile passare dinamicamente da un componente all'altro, come in un'interfaccia a schede (tab):

<div class="options-api">

[Apri l'esempio nel Playground](https://play.vuejs.org/#eNqNVE2PmzAQ/Ssj9kArLSHbrXpwk1X31mMPvS17cIxJrICNbJMmivLfO/7AEG2jRiDkefP85sNmztlr3y8OA89ItjJMi96+VFJ0vdIWfqqOQ6NVB/midIYj5sn9Sxlrkt9b14RXzXbiMElEO5IAKsmPnljzhg6thbNDmcLdkktrSADAJ/IYlj5MXEc9Z1w8VFNLP30ed2luBy1HC4UHrVH2N90QyJ1kHnUALN1gtLeIQu6juEUMkb8H5sXHqiS+qzK1Cw3Lu76llqMFsKrFAVhLjVlXWc07VWUeR89msFbhhhAWDkWjNJIwPgjp06iy5CV7fgrOOTgKv+XoKIIgpnoGyiymSmZ1wnq9dqJweZ8p/GCtYHtUmBMdLXFitgDnc9ju68b0yxDO1WzRTEcFRLiUJsEqSw3wwi+rMpFDj0psEq5W5ax1aBp7at1y4foWzq5R0hYN7UR7ImCoNIXhWjTfnW+jdM01gaf+CEa1ooYHzvnMVWhaiwEP90t/9HBP61rILQJL3POMHw93VG+FLKzqUYx3c2yjsOaOwNeRO2B8zKHlzBKQWJNH1YHrplV/iiMBOliFILYNK5mOKdSTMviGCTyNojFdTKBoeWNT3s8f/Vpsd7cIV61gjHkXnotR6OqVkJbrQKdsv9VqkDWBh2bpnn8VXaDcHPexE4wFzsojO9eDUOSVPF+65wN/EW7sHRsi5XaFqaexn+EH9Xcpe8zG2eWG3O0/NVzUaeJMk+jGhUXlNPXulw5j8w7t2bi8X32cuf/Vv/wF/SL98A==)

</div>
<div class="composition-api">

[Apri l'esempio nel Playground](https://play.vuejs.org/#eNqNVMGOmzAQ/ZURe2BXCiHbrXpwk1X31mMPvS1V5RiTWAEb2SZNhPLvHdvggLZRE6TIM/P8/N5gpk/e2nZ57HhCkrVhWrQWDLdd+1pI0bRKW/iuGg6VVg2ky9wFDp7G8g9lrIl1H80Bb5rtxfFKMcRzUA+aV3AZQKEEhWRKGgus05pL+5NuYeNwj6mTkT4VckRYujVY63GT17twC6/Fr4YjC3kp5DoPNtEgBpY3bU0txwhgXYojsJoasymSkjeqSHweK9vOWoUbXIC/Y1YpjaDH3wt39hMI6TUUSYSQAz8jArPT5Mj+nmIhC6zpAu1TZlEhmXndbBwpXH5NGL6xWrADMsyaMj1lkAzQ92E7mvYe8nCcM24xZApbL5ECiHCSnP73KyseGnvh6V/XedwS2pVjv3C1ziddxNDYc+2WS9fC8E4qJW1W0UbUZwKGSpMZrkX11dW2SpdcE3huT2BULUp44JxPSpmmpegMgU/tyadbWpZC7jCxwj0v+OfTDdU7ITOrWiTjzTS3Vei8IfB5xHZ4PmqoObMEJHryWXXkuqrVn+xEgHZWYRKbh06uLyv4iQq+oIDnkXSQiwKymlc26n75WNdit78FmLWCMeZL+GKMwlKrhLRcBzhlh51WnSwJPFQr9/zLdIZ007w/O6bR4MQe2bseBJMzer5yzwf8MtzbOzYMkNsOY0+HfoZv1d+lZJGMg8fNqdsfbbio4b77uRVv7I0Li8xxZN1PHWbeHdyTWXc/+zgw/8t/+QsROe9h)

</div>

Quanto visto sopra è reso possibile dall'elemento `<component>` di Vue con l'attributo speciale `is`:

<div class="options-api">

```vue-html
<!-- Il componente cambia quando cambia currentTab -->
<component :is="currentTab"></component>
```

</div>
<div class="composition-api">

```vue-html
<!-- Il componente cambia quando cambia currentTab -->
<component :is="tabs[currentTab]"></component>
```

</div>

Nell'esempio sopra, il valore passato a `:is` può contenere:

- la stringa del nome di un componente registrato, OPPURE
- l'oggetto del componente attualmente importato

Puoi anche utilizzare l'attributo `is` per creare elementi HTML regolari.

Quando si passa tra più componenti con `<component :is="...">`, il componente verrà smontato (unmounted) quando si passa ad un altro. Possiamo costringere i componenti inattivi a rimanere "vivi" con il [componente `<KeepAlive>`](/guide/built-ins/keep-alive) integrato.

## Limitazioni nel Parsing dei DOM Template {#dom-template-parsing-caveats}

Se stai scrivendo i tuoi template Vue direttamente nel DOM, Vue dovrà recuperare la stringa del template dal DOM. Ciò porta ad alcune limitazioni a causa del comportamento di analisi di HTML nativo dei browser.

:::tip
Va notato che le limitazioni discusse di seguito si applicano solo se stai scrivendo i tuoi template direttamente nel DOM. **NON** si applicano se stai utilizzando stringhe di template dalle seguenti fonti:

- Componenti Single-File
- Stringhe di template in linea (e.g. `template: '...'`)
- `<script type="text/x-template">`
  :::

### Case Insensitivity {#case-insensitivity}

I tag HTML e i nomi degli attributi sono insensibili al maiuscolo/minuscolo (Case Insensitive), quindi i browser interpreteranno i caratteri maiuscoli come tutti minuscoli. Ciò significa che quando utilizzi i template in-DOM, i nomi dei componenti PascalCase e i nomi delle prop camelCased o i nomi degli eventi `v-on` devono tutti utilizzare i loro equivalenti in kebab-case (delimitati da trattini):

```js
// camelCase in JavaScript
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
}
```

```vue-html
<!-- kebab-case in HTML -->
<blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
```

### Tag di Chiusura Automatici {#self-closing-tags}

Abbiamo utilizzato tag di chiusura automatici per i componenti nei precedenti esempi di codice:

```vue-html
<MyComponent />
```

Questo perché il parser di template di Vue rispetta `/>` come indicazione per terminare qualsiasi tag, indipendentemente dal suo tipo.

Nei template in-DOM, tuttavia, dobbiamo sempre includere tag di chiusura espliciti:

```vue-html
<my-component></my-component>
```

Questo perché lo standard HTML consente di omettere i tag di chiusura solo per [alcuni elementi specifici](https://html.spec.whatwg.org/multipage/syntax.html#void-elements), i più comuni dei quali sono `<input>` e `<img>`. Per tutti gli altri elementi, se ometti il tag di chiusura, il parser HTML nativo penserà che non hai mai terminato il tag di apertura. Ad esempio, il seguente frammento:

```vue-html
<my-component /> <!-- intendiamo chiudere il tag qui... -->
<span>hello</span>
```

verrà analizzato come:

```vue-html
<my-component>
  <span>hello</span>
</my-component> <!-- e il browser lo chiuderà qui. -->
```

### Restrizioni sulla Posizione degli Elementi  {#element-placement-restrictions}

Alcuni elementi HTML, come `<ul>`, `<ol>`, `<table>` e `<select>` hanno delle restrizioni su quali elementi possono apparire al loro interno, e alcuni elementi come `<li>`, `<tr>` e `<option>` possono apparire solo all'interno di certi altri elementi.

Ciò porterà a dei problemi quando si utilizzano componenti con elementi che hanno tali restrizioni. Ad esempio:

```vue-html
<table>
  <blog-post-row></blog-post-row>
</table>
```

Il componente personalizzato `<blog-post-row>` verrà segnalato come contenuto non valido, causando errori nell'output renderizzato finale. Possiamo utilizzare lo speciale attributo [`is`](/api/built-in-special-attributes#is) come soluzione alternativa:

```vue-html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

:::tip
Quando utilizzato su elementi HTML nativi, il valore di `is` deve essere prefissato con `vue:` per essere interpretato come componente Vue. Ciò è necessario per evitare confusione con gli ([elementi nativi personalizzati](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example)).
:::

Questo è tutto ciò che devi sapere sulle limitazioni nel Parsing dei DOM template per ora - e in realtà, la fine degli Gli Elementi Essenziali di Vue. Congratulazioni! C'è ancora molto da imparare, ma prima, ti consigliamo di prenderti una pausa per giocare con Vue da solo - costruisci qualcosa di divertente o dai un'occhiata ad alcuni degli [Esempi](/examples/) se non lo hai già fatto.

Una volta che ti sentirai a tuo agio con le conoscenze che hai appena assimilato, prosegui con la guida per approfondire ulteriormente i componenti.
