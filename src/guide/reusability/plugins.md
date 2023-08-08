# I Plugin {#plugins}

## Introduzione {#introduction}

I plugin sono codici indipendenti (self-contained) che solitamente aggiungono a Vue delle funzionalità a livello di applicazione. Ecco come si installa un plugin:

```js
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* opzioni facoltative */
})
```

Un plugin può essere definito o come un oggetto che espone un metodo `install()`, o semplicemente una funzione che agisce direttamente da metodo di installazione. La funzione di installazione riceve come parametri l'[istanza dell'applicazione](/api/application) insieme alle opzioni aggiuntive passate a `app.use()`, se presenti:

```js
const myPlugin = {
  install(app, options) {
    // configura l'app
  }
}
```

Non c'è uno scopo ben definito per un plugin, ma gli scenari più comuni in cui i plugin sono utili includono:

1. Registrare uno o più componenti globali o direttive personalizzate con [`app.component()`](/api/application#app-component) e [`app.directive()`](/api/application#app-directive).

2. Rendere una risorsa [iniettabile](/guide/components/provide-inject) (injectable) in tutta l'applicazione chiamando [`app.provide()`](/api/application#app-provide).

3. Aggiungere alcune proprietà dell'istanza globale, o metodi, collegandoli a [`app.config.globalProperties`](/api/application#app-config-globalproperties).

4. Creare una libreria che ha bisogno di eseguire una combinazione delle operazioni sopra elencate (ad es. [vue-router](https://github.com/vuejs/vue-router-next)).

## Scrivere un Plugin {#writing-a-plugin}

Per comprendere meglio come creare i tuoi plugin Vue.js, creeremo una versione molto semplificata di un plugin che visualizza stringhe `i18n` (abbreviazione di [Internazionalizzazione](https://en.wikipedia.org/wiki/Internationalization_and_localization))).

Iniziamo impostando l'oggetto del plugin. Si consiglia di crearlo in un file separato ed esportarlo, come mostrato di seguito, per mantenere la logica isolata e distinta.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // Il codice del plugin va qui
  }
}
```

Vogliamo creare una funzione di traduzione. Questa funzione riceverà una stringa `key` delimitata da punti, che utilizzeremo per cercare la stringa tradotta nelle opzioni fornite dall'utente. Questo è l'utilizzo che verrà usato nei template:

```vue-html
<h1>{{ $translate('greetings.hello') }}</h1>
```

Poiché questa funzione dovrebbe essere disponibile globalmente in tutti i template, la renderemo tale collegandola a `app.config.globalProperties` nel nostro plugin:

```js{4-11}
// plugins/i18n.js
export default {
  install: (app, options) => {
    // inietta un metodo $translate() disponibile globalmente
    app.config.globalProperties.$translate = (key) => {
      // recupera una proprietà annidata in `options`
      // utilizzando `key` come percorso
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```

La nostra funzione `$translate` prenderà una stringa come `greetings.hello`, cercherà all'interno della configurazione fornita dall'utente e restituirà il valore tradotto.

L'oggetto contenente le chiavi tradotte dovrebbe essere passato al plugin durante l'installazione tramite i parametri aggiuntivi di `app.use()`:

```js
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```

Ora, la nostra espressione iniziale `$translate('greetings.hello')` verrà sostituita da `Bonjour!` al momento dell'esecuzione.

Vedi anche: [Potenziare le Proprietà Globali](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

:::tip
Utilizza le proprietà globali con parsimonia, poiché l'uso eccessivo di molte proprietà globali, iniettate da diversi plugin, può generare confusione in tutta l'applicazione.
:::

### Provide / Inject con i Plugin {#provide-inject-with-plugins}

I plugin ci permettono di usare anche `inject` per fornire una funzione o un attributo agli utenti del plugin. Ad esempio, possiamo consentire all'applicazione di accedere al parametro `options` per poter utilizzare l'oggetto delle traduzioni.

```js{10}
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = (key) => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }

    app.provide('i18n', options)
  }
}
```

Gli utenti del plugin, ora, saranno in grado di iniettare le opzioni (del plugin) nei loro componenti utilizzando la chiave `i18n`:

<div class="composition-api">

```vue
<script setup>
import { inject } from 'vue'

const i18n = inject('i18n')

console.log(i18n.greetings.hello)
</script>
```

</div>
<div class="options-api">

```js
export default {
  inject: ['i18n'],
  created() {
    console.log(this.i18n.greetings.hello)
  }
}
```

</div>
