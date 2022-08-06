# Хуки життєвого циклу

Під час створення, кожен екземпляр компонента Vue проходить ряд етапів ініціалізації - наприклад, йому потрібно налаштувати спостереження за даними, скомпілювати шаблон, підключити екземпляр до DOM і оновлювати DOM, коли дані змінюються. Попутно він також запускає функції, які називаються хуками життєвого циклу, надаючи користувачам можливість додавати власний код на певних етапах.

## Реєстрація хуків життєвого циклу

Наприклад, хук <span class="composition-api">`onMounted`</span><span class="options-api">`mounted`</span> може використовуватись для запуску коду після завершення початкового рендерингу, і створення DOM вузлів:

<div class="composition-api">

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`тепер компонент змонтовано.`)
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  mounted() {
    console.log(`тепер компонент змонтовано.`)
  }
}
```

</div>

Також існують й інші хуки, які викликатимуться на різних етапах життєвого циклу екземпляра, причому найчастіше використовуються being <span class="composition-api">[`onMounted`](/api/composition-api-lifecycle.html#onmounted), [`onUpdated`](/api/composition-api-lifecycle.html#onupdated), and [`onUnmounted`](/api/composition-api-lifecycle.html#onunmounted).</span><span class="options-api">[`mounted`](/api/options-lifecycle.html#mounted), [`updated`](/api/options-lifecycle.html#updated), and [`unmounted`](/api/options-lifecycle.html#unmounted).</span>

<div class="options-api">

Всі хуки життєвого циклу викликаються з їхнім `this` контекстом, що вказує на поточний активний екземпляр, який їх викликає. Зауважте, що це означає, що вам слід уникати використання срілкових функцій під час оголошення хуків життєвого циклу, оскільки ви не зможете отримати доступ до екземпляра компонента через `this`, якщо ви це зробите.

</div>

<div class="composition-api">

Коли викликається `onMounted`, Vue automatically associates the registered callback function with the current active component instance. This requires these hooks to be registered **synchronously** during component setup. For example, do not do this:

```js
setTimeout(() => {
  onMounted(() => {
    // this won't work.
  })
}, 100)
```

Do note this doesn't mean that the call must be placed lexically inside `setup()` or `<script setup>`. `onMounted()` can be called in an external function as long as the call stack is synchronous and originates from within `setup()`.

</div>

## Lifecycle Diagram

Below is a diagram for the instance lifecycle. You don't need to fully understand everything going on right now, but as you learn and build more, it will be a useful reference.

![Component lifecycle diagram](./images/lifecycle.png)

<!-- https://www.figma.com/file/Xw3UeNMOralY6NV7gSjWdS/Vue-Lifecycle -->

Consult the <span class="composition-api">[Lifecycle Hooks API reference](/api/composition-api-lifecycle.html)</span><span class="options-api">[Lifecycle Hooks API reference](/api/options-lifecycle.html)</span> for details on all lifecycle hooks and their respective use cases.
