<script setup>
import SwitchComponent from './keep-alive-demos/SwitchComponent.vue'
</script>

# KeepAlive {#keepalive}

`<KeepAlive>` è un Componente nativo che, in modo condizionale, ci permette di memorizzare nella cache le istanze dei componenti quando si passa dinamicamente tra diversi componenti.

## Utilizzo Base {#basic-usage}

Nel capitolo Nozioni base sui Componenti, abbiamo introdotto la sintassi per i [Componenti Dinamici](/guide/essentials/component-basics#dynamic-components), utilizzando l'elemento speciale `<component>`:

```vue-html
<component :is="activeComponent" />
```

Di default, un'istanza di componente attiva verrà smontata quando si passa ad un'altra. Ciò causerà la perdita di qualsiasi stato modificato che essa contiene. Quando questo componente viene visualizzato di nuovo, verrà creata una nuova istanza con solo lo stato iniziale.

Nell'esempio qui sotto, abbiamo due componenti stateful: A contiene un contatore, mentre B contiene un messaggio sincronizzato con un input tramite `v-model`. Prova ad aggiornare lo stato di uno di essi, passa ad un altro, e poi torna di nuovo sul precedente:

<SwitchComponent />

Noterai che quando ritorni, lo stato precedentemente modificato sarà stato reimpostato.

Di solito, creare una nuova istanza di componente allo switch è un comportamento utile, ma, in questo caso, vorremmo che le due istanze dei componenti vengano conservate anche quando sono inattive. Per risolvere questo problema possiamo racchiudere il nostro componente dinamico con il componente nativo `<KeepAlive>`:

```vue-html
<!-- I componenti inattivi saranno memorizzati nella cache! -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

Ora, lo stato verraà conservato durante lo switch dei componenti:

<SwitchComponent use-KeepAlive />

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNqtUsFOwzAM/RWrl4IGC+cqq2h3RFw495K12YhIk6hJi1DVf8dJSllBaAJxi+2XZz8/j0lhzHboeZIl1NadMA4sd73JKyVaozsHI9hnJqV+feJHmODY6RZS/JEuiL1uTTEXtiREnnINKFeAcgZUqtbKOqj7ruPKwe6s2VVguq4UJXEynAkDx1sjmeMYAdBGDFBLZu2uShre6ioJeaxIduAyp0KZ3oF7MxwRHWsEQmC4bXXDJWbmxpjLBiZ7DwptMUFyKCiJNP/BWUbO8gvnA+emkGKIgkKqRrRWfh+Z8MIWwpySpfbxn6wJKMGV4IuSs0UlN1HVJae7bxYvBuk+2IOIq7sLnph8P9u5DJv5VfpWWLaGqTzwZTCOM/M0IaMvBMihd04ruK+lqF/8Ajxms8EFbCiJxR8khsP6ncQosLWnWV6a/kUf2nqu75Fby04chA0iPftaYryhz6NBRLjdtajpHZTWPio=)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNqtU8tugzAQ/JUVl7RKWveMXFTIseofcHHAiawasPxArRD/3rVNSEhbpVUrIWB3x7PM7jAkuVL3veNJmlBTaaFsVraiUZ22sO0alcNedw2s7kmIPHS1ABQLQDEBAMqWvwVQzffMSQuDz1aI6VreWpPCEBtsJppx4wE1s+zmNoIBNLdOt8cIjzut8XAKq3A0NAIY/QNveFEyi8DA8kZJZjlGALQWPVSSGfNYJjVvujIJeaxItuMyo6JVzoJ9VxwRmtUCIdDfNV3NJWam5j7HpPOY8BEYkwxySiLLP1AWkbK4oHzmXOVS9FFOSM3jhFR4WTNfRslcO54nSwJKcCD4RsnZmJJNFPXJEl8t88quOuc39fCrHalsGyWcnJL62apYNoq12UQ8DLEFjCMy+kKA7Jy1XQtPlRTVqx+Jx6zXOJI1JbH4jejg3T+KbswBzXnFlz9Tjes/V/3CjWEHDsL/OYNvdCE8Wu3kLUQEhy+ljh+brFFu)

</div>

:::tip
Quando utilizzato nei [template DOM](/guide/essentials/component-basics#dom-template-parsing-caveats), dovrebbe essere referenziato come `<keep-alive>`.
:::

## Includi / Escludi {#include-exclude}

Di default `<KeepAlive>` memorizzerà nella cache qualsiasi istanza del componente al suo interno. Possiamo personalizzare questo comportamento tramite le props `include` ed `exclude`. Entrambe le prop possono accettare una stringa separata da virgole, una `RegExp`, o un array contenente entrambi i tipi:

```vue-html
<!-- stringa separata da virgole -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- regex (usa `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- Array (usa `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

La corrispondenza viene verificata contro l'opzione [`name`](/api/options-misc#name) del componente, quindi i componenti che devono essere memorizzati nella cache in modo condizionale da `KeepAlive` devono dichiarare esplicitamente un'opzione `name`.

:::tip
Dalla versione 3.2.34, un Componente Single-File (SFC) che utilizza `<script setup>` dedurrà automaticamente la sua opzione `name` in base al nome del file, eliminando la necessità di dichiarare manualmente il nome.
:::

## Numero Massimo di Istanze Memorizzate {#max-cached-instances}

Possiamo limitare il numero massimo di istanze del componente che possono essere memorizzate nella cache tramite la prop `max`. Quando `max` è specificata, `<KeepAlive>` si comporta come una [cache LRU](<https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)>): se il numero di istanze memorizzate nella cache sta per superare il conteggio massimo specificato, l'istanza meno recente, memorizzata nella cache, verrà distrutta per fare spazio a quella nuova.

```vue-html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

## Ciclo di Vita dell'Istanza in Cache {#lifecycle-of-cached-instance}

Quando un'istanza di componente viene rimossa dal DOM ma fa parte di un albero di componenti memorizzato nella cache da `<KeepAlive>`, entra in uno stato **disattivato** invece di essere smontata (unmounted). Quando un'istanza di componente viene inserita nel DOM come parte di un albero memorizzato nella cache, essa viene **attivata**.

<div class="composition-api">

Un componente kept-alive può registrare gli hook del ciclo di vita per questi due stati utilizzando [`onActivated()`](/api/composition-api-lifecycle#onactivated) e [`onDeactivated()`](/api/composition-api-lifecycle#ondeactivated):

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // chiamato al mount iniziale
  // e ogni volta che è inserito nuovamente dalla cache
})

onDeactivated(() => {
  // chiamato quando rimosso dal DOM e inserito in cache
  // e anche quando viene unmounted
})
</script>
```

</div>
<div class="options-api">

Un componente kept-alive può registrare gli hook del ciclo di vita per questi due stati utilizzando gli hook [`activated`](/api/options-lifecycle#activated) e [`deactivated`](/api/options-lifecycle#deactivated):

```js
export default {
  activated() {
  // chiamato al mount iniziale
  // e ogni volta che è inserito nuovamente dalla cache
  },
  deactivated() {
  // chiamato quando rimosso dal DOM e inserito in cache
  // e anche quando viene unmounted
  }
}
```

</div>

Nota che:

- <span class="composition-api">`onActivated`</span><span class="options-api">`activated`</span> viene chiamato anche al mount, e <span class="composition-api">`onDeactivated`</span><span class="options-api">`deactivated`</span> all'unmount.

- Entrambi gli hook funzionano non solo per il componente radice memorizzato nella cache da `<KeepAlive>`, ma anche per i componenti discendenti nell'albero memorizzato nella cache.

---

**Correlati**

- [Referenza API `<KeepAlive>`](/api/built-in-components#keepalive)
