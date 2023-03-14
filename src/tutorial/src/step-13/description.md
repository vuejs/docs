# Випромінювання подій {#emits}

Окрім отримання реквізитів, дочірній компонент також може випромінювати події батьківському компоненту:

<div class="composition-api">
<div class="sfc">

```vue
<script setup>
// оголосіть випромінювані події
const emit = defineEmits(['response'])

// передайте аргумент
emit('response', 'привіт від дочірнього компонента')
</script>
```

</div>

<div class="html">

```js
export default {
  // оголосіть випромінювані події
  emits: ['response'],
  setup(props, { emit }) {
    // передайте аргумент
    emit('response', 'привіт від дочірнього компонента')
  }
}
```

</div>

</div>

<div class="options-api">

```js
export default {
  // оголосіть випромінювані події
  emits: ['response'],
  created() {
    // передайте аргумент
    this.$emit('response', 'привіт від дочірнього компонента')
  }
}
```

</div>

Першим аргументом функції <span class="options-api">`this.$emit()`</span><span class="composition-api">`emit()`</span> є назва події. Будь-які додаткові аргументи передаються слухачу події.

Батьківський компонент може прослуховувати події дочірніх компонентів за допомогою `v-on` - тут обробник отримує додатковий аргумент від виклику дочірнього компонента  і присвоює його локальному стану:

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

Тепер спробуйте самі в редакторі.
