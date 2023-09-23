# Emits {#emits}

Oltre a poter ricevere props, un componente può anche emettere eventi verso il padre:

<div class="composition-api">
<div class="sfc">

```vue
<script setup>
// dichiara gli eventi che si emettono
const emit = defineEmits(['response'])

// emit dell'evento con argomento
emit('response', 'ciao dal figlio')
</script>
```

</div>

<div class="html">

```js
export default {
  // dichiara gli eventi che si emettono
  emits: ['response'],
  setup(props, { emit }) {
    // emit dell'evento con argomento
    emit('response', 'ciao dal figlio')
  }
}
```

</div>

</div>

<div class="options-api">

```js
export default {
  // dichiara gli eventi che si emettono
  emits: ['response'],
  created() {
    // emit dell'evento con argomento
    this.$emit('response', 'ciao dal figlio')
  }
}
```

</div>

Il primo parametro di <span class="options-api">`this.$emit()`</span><span class="composition-api">`emit()`</span> è il nome dell'evento. Eventuali argomenti aggiuntivi vengono passati al listener dell'evento.

Il padre può ascoltare gli eventi emessi dal figlio utilizzando `v-on`, in questo caso l'handler riceve l'argomento extra della chiamata emit del figlio e lo assegna allo stato locale:

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

Ora prova nell'editor.
