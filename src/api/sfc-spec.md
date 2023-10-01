# Sintassi dei SFC {#sfc-syntax-specification}

## Panoramica {#overview}

I Single-File Component (SFC) di Vue, solitamente con l'estensione di file `*.vue`, è un formato di file personalizzato che utilizza una sintassi simile a HTML per descrivere un componente Vue. Un SFC di Vue è sintatticamente compatibile con HTML.

Ogni file `*.vue` è composto da tre tipi di blocchi di linguaggio di primo livello: `<template>`, `<script>`, e `<style>`, e facoltativamente da blocchi personalizzati aggiuntivi:

```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Ciao a tutti!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  Questo potrebbe essere ad esempio la documentazione per il componente.
</custom1>
```

## Linguaggio dei blocchi {#language-blocks}

### `<template>` {#template}

- Ogni file `*.vue` può contenere massimo un blocco `<template>`.

- I suoi contenuti verranno estratti e passati al `@vue/compiler-dom`, pre-compilati in render function di JavaScript, e collegati al componente esportato come sua opzione`render`.

### `<script>` {#script}

- Ogni file `*.vue` può contenere al massimo un blocco `<script>` (escludendo [`<script setup>`](/api/sfc-script-setup)).

- Lo script viene eseguito come un ES Module.

- Il **default export** dovrebbe essere un oggetto di opzioni del componente Vue, sia come oggetto semplice che come valore restituito da [defineComponent](/api/general#definecomponent).

### `<script setup>` {#script-setup}

- Ogni file `*.vue` può contenere al massimo un blocco `<script setup>` (escludendo lo `<script>` classico).

- Lo script viene pre-processato e utilizzato come la funzione `setup()` del componente, il che significa che verrà eseguito **per ogni istanza del componente**. Le associazioni al livello superiore in `<script setup>` vengono automaticamente esposte al template. Per ulteriori dettagli, consulta la [documentazione dedicata a `<script setup>`](/api/sfc-script-setup).

### `<style>` {#style}

- Un singolo file `*.vue` può contenere più tag `<style>`.

- Un tag `<style>` può avere gli attributi `scoped` o `module` (guarda [Funzionalità CSS dei SFC](/api/sfc-css-features) per maggiori dettagli) per aiutare ad incapsulare gli stili all'interno del componente corrente. È possibile mescolare più tag `<style>` con diverse modalità di incapsulamento nello stesso componente.

### Blocchi custom {#custom-blocks}

Blocchi personalizzati aggiuntivi possono essere inclusi in un file `*.vue` per soddisfare esigenze specifiche del progetto, ad esempio un blocco `<docs>`. Alcuni esempi concreti di blocchi personalizzati includono:

- [Gridsome: `<page-query>`](https://gridsome.org/docs/querying-data/)
- [vite-plugin-vue-gql: `<gql>`](https://github.com/wheatjs/vite-plugin-vue-gql)
- [vue-i18n: `<i18n>`](https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n#i18n-custom-block)

La gestione dei blocchi personalizzati dipenderà dagli strumenti utilizzati. Se desideri creare le tue integrazioni personalizzate per i blocchi, consulta la [sezione degli strumenti per integrazioni di blocchi personalizzati negli SFC](/guide/scaling-up/tooling#sfc-custom-block-integrations) per ulteriori dettagli.

## Inferenza automatica del nome {#automatic-name-inference}

Un SFC ricava automaticamente il nome del componente dal suo **nome del file** nei seguenti casi:

- Formattazione degli avvisi durante lo sviluppo
- Ispezioni tramite DevTools
- Riferimento ricorsivo a sé stesso, ad es. un file chiamato `FooBar.vue` può fare riferimento a se stesso come `<FooBar/>` nel proprio template. Ciò ha una priorità inferiore rispetto ai componenti registrati/importati esplicitamente.

## Pre-Processori {#pre-processors}

I blocchi possono dichiarare linguaggi di pre-processore utilizzando l'attributo `lang`. Il caso più comune è l'utilizzo di TypeScript per il blocco `<script>`:

```vue-html
<script lang="ts">
  // use TypeScript
</script>
```

`lang` può essere applicato su ogni blocco - per esempio possiamo usare `<style>` con [Sass](https://sass-lang.com/) e `<template>` con [Pug](https://pugjs.org/api/getting-started.html):

```vue-html
<template lang="pug">
p {{ msg }}
</template>

<style lang="scss">
  $primary-color: #333;
  body {
    color: $primary-color;
  }
</style>
```

Tieni presente che l'integrazione con diversi pre-processori può variare in base alla catena di strumenti utilizzata. Consulta la rispettiva documentazione per ulteriori esempi:

- [Vite](https://vitejs.dev/guide/features.html#css-pre-processors)
- [Vue CLI](https://cli.vuejs.org/guide/css.html#pre-processors)
- [webpack + vue-loader](https://vue-loader.vuejs.org/guide/pre-processors.html#using-pre-processors)

## Gli import `src` {#src-imports}

Se preferisci suddividere i tuoi componenti `*.vue` in file multipli, puoi utilizzare l'attributo `src` per importare un file esterno per un blocco di linguaggio:

```vue
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

Tieni presente che gli import `src` seguono le stesse regole di risoluzione del percorso delle richieste dei moduli webpack, il che significa:

- I percorsi relativi devono iniziare con `./`
- Puoi importare risorse tramite dipendenze npm:

```vue
<!-- importa un file dal pacchetto npm "todomvc-app-css" installato -->
<style src="todomvc-app-css/index.css" />
```

Gli import `src` funzionano anche con blocchi custom, per esempio:

```vue
<unit-test src="./unit-test.js">
</unit-test>
```

## Commenti {#comments}

All'interno di ogni blocco, dovresti utilizzare la sintassi dei commenti del linguaggio in uso (HTML, CSS, JavaScript, Pug, ecc.). Per i commenti di primo livello, utilizza la sintassi dei commenti HTML: `<!-- contenuto dei commenti -->`
