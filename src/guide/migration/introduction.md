# Introduzione

::: info
Nuovo a Vue.js? Dai un'occhiata alla nostra [Guida Introduttiva](/guide/introduction.html) per cominciare.
:::

Questa guida è rivolta principalmente agli utenti con esperienza pregressa nell'uso di Vue 2 che vogliono conoscere le nuove caratteristiche ed i cambiamenti di Vue 3. **Non è necessario leggerla per intero prima di provare Vue 3.** Nonostante possa sembrare che molto sia cambiato, molto di ciò che già conosci ed ami di Vue è rimasto invariato; abbiamo però voluto essere quanto più accurati possibile e fornire spiegazioni dettagliate ed esempi per ogni modifica documentata.

- [Inizio rapido](#quickstart)
- [Nuove funzionalità di rilievo](#notable-new-features)
- [Modifiche importanti](#breaking-changes)
- [Supporto nell'ecosistema](#supporting-libraries)

## Panoramica

<br>
<iframe src="https://player.vimeo.com/video/440868720" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

Inizia ad imparare Vue 3 su [Vue Mastery](https://www.vuemastery.com/courses-path/vue3).

## Inizio rapido

- Usando la CDN: `<script src="https://unpkg.com/vue@next"></script>`
- Nel browser con una playground [Codepen](https://codepen.io/yyx990803/pen/OJNoaZL)
- Nel browser con una sandbox [CodeSandbox](https://v3.vue.new)
- Genera una base usando [Vite](https://github.com/vitejs/vite):

  ```bash
  npm init @vitejs/app hello-vue3 # OPPURE yarn create @vitejs/app hello-vue3
  ```

- Genera una base usando [vue-cli](https://cli.vuejs.org/):

  ```bash
  npm install -g @vue/cli # OPPURE yarn global add @vue/cli
  vue create hello-vue3
  # seleziona vue 3 come preconfigurazione
  ```

## Nuove funzionalità di rilievo

Alcune delle nuove funzionalità da tenere d'occhio su Vue 3 sono:

- [Composition API](/guide/composition-api-introduction.html)
- [Teleport](/guide/teleport.html)
- [Fragments](/guide/migration/fragments.html)
- [Option Emits dei componenti](/guide/component-custom-events.html)
- [API `createRenderer` dal `@vue/runtime-core`](https://github.com/vuejs/vue-next/tree/master/packages/runtime-core) per creare renderers personalizzati
- [Sintassi semplificata (`<script setup>`) per la Composition API nei SFC](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md) <Badge text="sperimentale" type="warning" />
- [Variabili CSS dipendenti dallo State nei SFC (supporto a `v-bind` all'interno del tag `<style>`)](https://github.com/vuejs/rfcs/blob/style-vars-2/active-rfcs/0000-sfc-style-variables.md) <Badge text="sperimentale" type="warning" />
- [Nei SFC `<style scoped>` può adesso includere regole globali o regole limitate al contenuto interno a slots](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)
- [Suspense](/guide/migration/suspense.html) <Badge text="sperimentale" type="warning" />

## Modifiche importanti

::: info INFO
Stiamo ancora lavorando ad una apposita Build di Migrazione di Vue 3 compatibile con Vue 2 ma con warnings in runtime sull'uso di caratteristiche incompatibili con Vue 3. Se stai pensando di aggiornare un'app Vue 2 non banale, ti raccomandiamo fortemente di attendere la Build di Migrazione per un'esperienza migliore.
:::

Segue una lista di importanti modifiche rispetto alle versioni 2.x:

### API Globale

- [L'API Globale di Vue è stata modificata per utilizzare un'istanza di applicazione](/guide/migration/global-api.html)
- [Le API interne e l'API Globale sono state ristrutturate per supportare il tree-shaking](/guide/migration/global-api-treeshaking.html)

### Direttive nei Template

- [L'uso di `v-model` nei componenti è stato rinnovato, rimpiazzando `v-bind.sync`](/guide/migration/v-model.html)
- [L'uso di `key` su `<template v-for>` e sui nodi non-`v-for` è stato modificato](/guide/migration/key-attribute.html)
- [La precedenza tra `v-if` e `v-for` quando usati sullo stesso elemento è cambiata](/guide/migration/v-if-v-for.html)
- [`v-bind="object"` è ora sensibile all'ordinamento](/guide/migration/v-bind.html)
- [Il modificatore `v-on:event.native` è stato rimosso](./v-on-native-modifier-removed.md)
- [`ref` all'interno di `v-for` non registra più un array di refs](/guide/migration/array-refs.html)

### Componenti

- [I componenti funzionali possono essere creati solo usando una normale funzione](/guide/migration/functional-components.html)
- [L'attributo `functional` nei `<template>` dei Single File Component (SFC) e l'option componente `functional` sono deprecati](/guide/migration/functional-components.html)
- [I componenti asincroni (Async) necessitano adesso del metodo `defineAsyncComponent` per essere creati](/guide/migration/async-components.html)
- [Gli eventi di un Componente dovrebbero adesso essere dichiarati con l'option `emits`](./emits-option.md)

### Render Function

- [L'API della Render Function è stata modificata](/guide/migration/render-function-api.html)
- [La proprietà `$scopedSlots` è stata rimossa e tutti gli slot sono esposti come funzioni tramite `$slots`](/guide/migration/slots-unification.html)
- [`$listeners` è stata rimossa / unita ad `$attrs`](./listeners-removed)
- [`$attrs` include ora gli attributi `class` e `style`](./attrs-includes-class-style.md)

### Elementi personalizzati

- [Il whitelisting degli elementi personalizzati è adesso effettuato durante la compilazione dei template](/guide/migration/custom-elements-interop.html)
- [L'uso della prop speciale `is` è ristretto esclusivamente al tag riservato `<component>`](/guide/migration/custom-elements-interop.html#customized-built-in-elements)

### Modifiche minori

- La fase del ciclo di vita `destroyed` è stata rinominata in `unmounted`
- La fase del ciclo di vita `beforeDestroy` è stata rinominata in `beforeUnmount`
- [Le funzioni factory della proprietà `default` nelle prop non hanno più accesso al context tramite `this`](/guide/migration/props-default-this.html)
- [L'API per le direttive personalizzate è stata modificata per essere in linea con il ciclo di vita dei componenti](/guide/migration/custom-directives.html)
- [L'option `data` dovrebbe essere sempre dichiarata come funzione](/guide/migration/data-option.html)
- [L'option `data` dai mixin viene adesso unita superficialmente a quella dei componenti (shallow merge)](/guide/migration/data-option.html#mixin-merge-behavior-change)
- [La strategia di forzatura degli attributi è stata modificata (attribute coercion)](/guide/migration/attribute-coercion.html)
- [Alcune classi sulle transition sono state rinominate](/guide/migration/transition.html)
- [`<TransitionGroup>` non renderizza più di default un elemento wrapper](/guide/migration/transition-group.html)
- [Quando si osserva un array tramite `watch`, la funzione di callback verrà attivata solo quando l'array viene sostituito. Se hai bisogno di attivarla anche nel caso di mutazione interna all'array, devi specificare l'opzione `deep`.](/guide/migration/watch.html)
- I tag `<template>` senza direttive speciali (`v-if/else-if/else`, `v-for`, o `v-slot`) sono adesso trattati come effettivi elementi nativi `<template>` invece di renderizzare il contenuto a loro interno.
- [Montare un'applicazione non sostituisce più l'elemento su cui viene montata](/guide/migration/mount-changes.html)
- [Il prefisso degli eventi del ciclo di vita `hook:` è stato rinominato in `vnode-`](/guide/migration/vnode-lifecycle-events.html)

### API rimosse

- [Supporto di `keyCode` come modificatori di `v-on`](/guide/migration/keycode-modifiers.html)
- [Metodi di istanza $on, $off e \$once](/guide/migration/events-api.html)
- [Filtri](/guide/migration/filters.html)
- [Attributi inline per i template](/guide/migration/inline-template-attribute.html)
- [Proprietà di istanza `$children`](/guide/migration/children.html)
- [Option `propsData`](/guide/migration/props-data.html)
- Metodo di istanza `$destroy`. Gli utenti non dovrebbero più gestire manualmente il ciclo di vita di componenti Vue individuali.
- Funzioni globali `set` e `delete`, metodi di istanza `$set` e `$delete`. Non sono più richiesti con la rilevazione delle modifiche basata su proxy.

## Supporto nell'ecosistema

Tutti i nostri strumenti e librerie ufficiali supportano ormai Vue 3, ma alcuni di loro sono ancora in fase di beta o di release candidate. Di seguito troverai i dettagli per le librerie individuali. La maggior parte viene al momento distribuita usando il tag di distribuzione `next` su npm. Abbiamo intenzione di passare al tag `latest` non appena tutte le librerie ufficiali avranno raggiunto versioni stabili e compatibili.

### Interfaccia a riga di comando di Vue (Vue CLI)

<a href="https://www.npmjs.com/package/@vue/cli" target="_blank" noopener noreferrer><img src="https://img.shields.io/npm/v/@vue/cli"></a>

Dalla v4.5.0, `vue-cli` offre adesso la possibilità di scegliere Vue 3 durante la creazione di un nuovo progetto. Puoi aggiornare `vue-cli` ed eseguire il comando `vue create` per creare un progetto Vue 3 oggi stesso.

- [Documentazione](https://cli.vuejs.org/)
- [GitHub](https://github.com/vuejs/vue-cli)

### Vue Router

<a href="https://www.npmjs.com/package/vue-router/v/next" target="_blank" noopener noreferrer><img src="https://img.shields.io/npm/v/vue-router/next.svg"></a>

Vue Router 4.0 fornisce il supporto a Vue 3 e contiene indipendentemente da quest'ultimo una certa quantità di importanti cambiamenti. Visita la sua [guida di migrazione](https://next.router.vuejs.org/guide/migration/) per tutti i dettagli.

- [Documentazione](https://next.router.vuejs.org/)
- [GitHub](https://github.com/vuejs/vue-router-next)
- [RFCs](https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3Arouter)

### Vuex

<a href="https://www.npmjs.com/package/vuex/v/next" target="_blank" noopener noreferrer><img src="https://img.shields.io/npm/v/vuex/next.svg"></a>

Vuex 4.0 fornisce il supporto a Vue 3 mantenendo la API in gran parte invariata rispetto alla 3.x. L'unica modifica importante riguarda [come installare il plugin](https://next.vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html#breaking-changes).

- [Documentazione](https://next.vuex.vuejs.org/)
- [GitHub](https://github.com/vuejs/vuex/tree/4.0)

### Estensione degli strumenti per lo sviluppatore (Devtools)

Stiamo lavorando ad una nuova versione degli strumenti per lo sviluppatore con una nuova interfaccia ed il supporto a multiple versioni di Vue. La nuova versione è attualmente in beta e supporta solo Vue 3 (per ora). I lavori sull'integrazione di Vuex e Vue Router sono ancora in corso.

- Per Chrome: [Installa dallo store di Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg?hl=en)

  - Nota: il canale di beta potrebbe andare in conflitto con la versione stabile degli strumenti per lo sviluppatore, potresti perciò aver bisogno di disabilitare temporaneamente la versione stabile affinché il canale di beta funzioni a dovere.

- Per Firefox: [Scarica l'estensione firmata](https://github.com/vuejs/vue-devtools/releases/tag/v6.0.0-beta.2) (file `.xpi` sotto Assets)

### Supporto IDE

Raccomandiamo l'uso di [VSCode](https://code.visualstudio.com/) con la nostra estensione ufficiale [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur), che offre un supporto IDE completo per Vue 3.

### Altri Progetti

| Progetto               | npm                           | Repository                 |
| --------------------- | ----------------------------- | -------------------- |
| @vue/babel-plugin-jsx | [![rc][jsx-badge]][jsx-npm]   | [[GitHub][jsx-code]] |
| eslint-plugin-vue     | [![ga][epv-badge]][epv-npm]   | [[GitHub][epv-code]] |
| @vue/test-utils       | [![beta][vtu-badge]][vtu-npm] | [[GitHub][vtu-code]] |
| vue-class-component   | [![beta][vcc-badge]][vcc-npm] | [[GitHub][vcc-code]] |
| vue-loader            | [![rc][vl-badge]][vl-npm]     | [[GitHub][vl-code]]  |
| rollup-plugin-vue     | [![beta][rpv-badge]][rpv-npm] | [[GitHub][rpv-code]] |

[jsx-badge]: https://img.shields.io/npm/v/@vue/babel-plugin-jsx.svg
[jsx-npm]: https://www.npmjs.com/package/@vue/babel-plugin-jsx
[jsx-code]: https://github.com/vuejs/jsx-next
[vd-badge]: https://img.shields.io/npm/v/@vue/devtools/beta.svg
[vd-npm]: https://www.npmjs.com/package/@vue/devtools/v/beta
[vd-code]: https://github.com/vuejs/vue-devtools/tree/next
[epv-badge]: https://img.shields.io/npm/v/eslint-plugin-vue.svg
[epv-npm]: https://www.npmjs.com/package/eslint-plugin-vue
[epv-code]: https://github.com/vuejs/eslint-plugin-vue
[vtu-badge]: https://img.shields.io/npm/v/@vue/test-utils/next.svg
[vtu-npm]: https://www.npmjs.com/package/@vue/test-utils/v/next
[vtu-code]: https://github.com/vuejs/vue-test-utils-next
[jsx-badge]: https://img.shields.io/npm/v/@ant-design-vue/babel-plugin-jsx.svg
[jsx-npm]: https://www.npmjs.com/package/@ant-design-vue/babel-plugin-jsx
[jsx-code]: https://github.com/vueComponent/jsx
[vcc-badge]: https://img.shields.io/npm/v/vue-class-component/next.svg
[vcc-npm]: https://www.npmjs.com/package/vue-class-component/v/next
[vcc-code]: https://github.com/vuejs/vue-class-component/tree/next
[vl-badge]: https://img.shields.io/npm/v/vue-loader/next.svg
[vl-npm]: https://www.npmjs.com/package/vue-loader/v/next
[vl-code]: https://github.com/vuejs/vue-loader/tree/next
[rpv-badge]: https://img.shields.io/npm/v/rollup-plugin-vue/next.svg
[rpv-npm]: https://www.npmjs.com/package/rollup-plugin-vue/v/next
[rpv-code]: https://github.com/vuejs/rollup-plugin-vue/tree/next

::: info

Per informazioni aggiuntive sulla compatibilità di Vue 3 con librerie e plugin, assicurati di visitare [questo issue di awesome-vue](https://github.com/vuejs/awesome-vue/issues/3544).
:::
