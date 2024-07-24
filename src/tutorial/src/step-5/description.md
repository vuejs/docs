# Form Bindings {#form-bindings}

Używając `v-bind` i `v-on` razem, możemy tworzyć dwukierunkowe wiązania na elementach wejściowych formularza:

```vue-html
<input :value="text" @input="onInput">
```

<div class="options-api">

```js
methods: {
  onInput(e) {
    // v-on otrzymuje natywne zdarzenie DOM
    // jako argument.
    this.text = e.target.value
  }
}
```

</div>

<div class="composition-api">

```js
function onInput(e) {
  // v-on otrzymuje natywne zdarzenie DOM
  // jako argument.
  text.value = e.target.value
}
```

</div>

Spróbuj wpisać tekst w polu input - powinieneś zobaczyć tekst w `<p>` aktualizujący się podczas pisania.

Aby uprościć dwukierunkowe wiązania, Vue udostępnia dyrektywę `v-model`, która jest uproszczoną wersją powyższego:

```vue-html
<input v-model="text">
```
`v-model` automatycznie synchronizuje wartość `<input>` z powiązanym stanem, więc nie musimy już używać do tego obsługi zdarzeń.

`v-model` działa nie tylko na wejściach tekstowych, ale także na innych typach wejść, takich jak checkboxes, radio buttons i select. Więcej szczegółów na ten temat znajduje się w <a target="_blank" href="/guide/essentials/forms.html">Przewodnik - Form Bindings</a>.

Teraz spróbuj zrefaktoryzować kod, aby zamiast tego użyć `v-model`.
