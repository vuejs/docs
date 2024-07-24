# Rekwizyty {#props}

Komponent podrzędny może akceptować dane wejściowe od komponentu nadrzędnego poprzez **props**. Po pierwsze, musi zadeklarować rekwizyty, które akceptuje:

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

Uwaga: `defineProps()` jest makrem czasu kompilacji i nie musi być importowany. Po zadeklarowaniu, właściwość `msg` może być użyta w szablonie komponentu potomnego. Można również uzyskać do niego dostęp w JavaScript poprzez zwrócony obiekt funkcji `defineProps()`.

</div>

<div class="html">

```js
// w komponencie potomnym
export default {
  props: {
    msg: String
  },
  setup(props) {
    // dostęp do  props.msg
  }
}
```

Po zadeklarowaniu, właściwość `msg` jest widoczna w `this` i może być użyta w szablonie komponentu potomnego. Otrzymane właściwości są przekazywane do funkcji `setup()` jako pierwszy argument.

</div>

</div>

<div class="options-api">

```js
// w komponencie potomnym
export default {
  props: {
    msg: String
  }
}
```

Po zadeklarowaniu, właściwość `msg` jest widoczna w `this` i może być użyta w szablonie komponentu potomnego.

</div>

Rodzic może przekazać właściwość do dziecka, tak jak atrybuty. Aby przekazać wartość dynamiczną, możemy również użyć składni `v-bind`:

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

Teraz spróbuj samemu w edytorze.
