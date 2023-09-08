# Bindings Dei Form {#form-bindings}

Utilizzando `v-bind` e `v-on`insieme, possiamo creare binding bidirezionali sugli elementi di input di un form:

```vue-html
<input :value="text" @input="onInput">
```

<div class="options-api">

```js
methods: {
  onInput(e) {
    // un v-on handler riceve l'evento DOM nativo
    // come argomento.
    this.text = e.target.value
  }
}
```

</div>

<div class="composition-api">

```js
function onInput(e) {
  // un v-on handler riceve l'evento DOM nativo
  // come argomento.
  text.value = e.target.value
}
```

</div>

Prova a digitare nell'input box - dovresti vedere il testo nel tag `<p>` aggiornarsi mentre digiti.

Per semplificare il binding bidirezionale, Vue fornisce una direttiva chiamata `v-model`, che essenzialmente è una sintassi semplificata per quanto sopra:

```vue-html
<input v-model="text">
```

`v-model` sincronizza automaticamente il valore dell'elemento `<input>` con lo stato associato, quindi non è più necessario utilizzare un handler degli eventi per questo.

`v-model` funziona non solo su input di tipo testuali, ma anche su altri tipi di input come checkboxes, pulsanti radio (radio buttons) e menu a discesa (select dropdowns). Per ulteriori dettagli, consulta la <a target="_blank" href="/guide/essentials/forms.html">Guida - Binding di Form</a>.

Ora, prova a fare il refactor del codice utilizzando `v-model`.
