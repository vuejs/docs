# Emits {#emits}

Oprócz otrzymywania props, komponent podrzędny może również emitować zdarzenia do komponentu nadrzędnego:

<div class="composition-api">
<div class="sfc">

```vue
<script setup>
// deklaracja zdarzeń emitujących
const emit = defineEmits(['response'])

// emitowanie zdarzenie z argumentem
emit('response', 'hello from child')
</script>
```

</div>

<div class="html">

```js
export default {
  // ddeklaracja zdarzeń emitujących
  emits: ['response'],
  setup(props, { emit }) {
    // emitowanie zdarzenie z argumentem
    emit('response', 'hello from child')
  }
}
```

</div>

</div>

<div class="options-api">

```js
export default {
  // deklaracja zdarzeń emitujących
  emits: ['response'],
  created() {
    // emitowanie zdarzenie z argumentem
    this.$emit('response', 'hello from child')
  }
}
```

</div>

Pierwszym argumentem dla <span class="options-api">`this.$emit()`</span><span class="composition-api">`emit()`</span> jest nazwa zdarzenia. Wszelkie dodatkowe argumenty są przekazywane do detektora zdarzeń.

Rodzic może nasłuchiwać zdarzeń emitowanych przez dziecko za pomocą `v-on` - tutaj handler otrzymuje dodatkowy argument z wywołania emitowanego przez dziecko i przypisuje go do lokalnego stanu:

<div class="sfc">

```vue-html
<ChildComp @response="(msg) => childMsg = msg" />
```

</div>
<div class="html">

```vue-html
<child-comp @response="(msg) => childMsg = msg"></child-comp>
```

</div>

Teraz spróbuj samemu w edytorze.
