# Props {#props}

Komponent podrzędny może akceptować dane wejściowe od komponentu nadrzędnego poprzez **props**. Po pierwsze, komponent podrzędny musi zadeklarować parametry, które akceptuje:

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

Uwaga: `defineProps()` jest makrem czasu kompilacji i nie musi być importowane. Po zadeklarowaniu, właściwość `msg` może być użyta w szablonie komponentu potomnego. Można również uzyskać do niej dostęp w JavaScript poprzez obiekt zwrócony z funkcji `defineProps()`.

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

Po zadeklarowaniu, prop `msg` jest dostępny w `this` i może być użyty w szablonie komponentu potomnego. Otrzymane props są przekazywane do funkcji `setup()` jako pierwszy argument.

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

Po zadeklarowaniu, props `msg` jest widoczny w `this` i może być użyty w szablonie komponentu potomnego.

</div>

Rodzic może przekazać prop do dziecka, tak jak atrybuty. Aby przekazać wartość dynamiczną, możemy również użyć składni `v-bind`:

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
