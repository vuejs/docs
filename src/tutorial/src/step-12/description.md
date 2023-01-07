# Props

Un componente hijo puede aceptar entradas del padre a través de **props**. En primer lugar, es necesario declarar las props que recibe:

<div class="composition-api">
<div class="sfc">

```vue
<!-- ChildComp.vue -->
<script setup>
const props = defineProps({
  msg: String
})
</script>
```

Ten en cuenta que `defineProps()` es una macro en tiempo de compilación y no necesita ser importada. Una vez declarada, la prop `msg` puede ser utilizada en la plantilla del componente hijo. También es posible acceder a ella en JavaScript a través del objeto devuelto por `defineProps()`.

</div>

<div class="html">

```js
// en el componente hijo
export default {
  props: {
    msg: String
  },
  setup(props) {
    // accede a props.msg
  }
}
```

Una vez declarada, la prop `msg` queda expuesta en el `this` y puede ser utilizada en la plantilla del componente hijo. Las props recibidas se pasan a `setup()` como primer argumento.

</div>

</div>

<div class="options-api">

```js
// en el componente hijo
export default {
  props: {
    msg: String
  }
}
```

Una vez declarada, la prop `msg` queda expuesta en el `this` y puede ser utilizada en la plantilla del componente hijo.

</div>

El padre puede pasar la prop al hijo de la misma forma que los atributos. Para pasar un valor dinámico, también se puede utilizar la sintaxis `v-bind`:

<div class="sfc">

```vue-html
<ChildComp :msg="greeting" />
```

</div>
<div class="html">

```vue-html
<child-comp :msg="greeting"></child-comp>
```

</div>

Ahora pruébalo tú mismo en el editor.
