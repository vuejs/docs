# Emits

Además de recibir props, un componente hijo puede también emitir eventos hacia el padre:

<div class="composition-api">
<div class="sfc">

```vue
<script setup>
// declara los eventos a emitir
const emit = defineEmits(['response'])

// emit con argumento
emit('response', 'hola desde el hijo')
</script>
```

</div>

<div class="html">

```js
export default {
  // declara los eventos a emitir
  emits: ['response'],
  setup(props, { emit }) {
    // emit con argumento
    emit('response', 'hola desde el hijo')
  }
}
```

</div>

</div>

<div class="options-api">

```js
export default {
  // declara los eventos a emitir
  emits: ['response'],
  created() {
    // emit con argumento
    this.$emit('response', 'hola desde el hijo')
  }
}
```

</div>

El primer argumento para <span class="options-api">`this.$emit()`</span><span class="composition-api">`emit()`</span> es el nombre del evento. Cualquier argumento adicional se pasa al escuchador del evento.

El padre puede escuchar los eventos emitidos por el hijo usando `v-on`; en el siguiente caso el manejador recibe el argumento extra de la llamada de emisión del hijo y lo asigna al estado local:

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

Ahora pruébalo tú mismo en el editor.
