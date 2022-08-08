# Хуки життєвого циклу

Під час створення кожен екземпляр компонента Vue проходить ряд етапів ініціалізації - наприклад, йому потрібно налаштувати спостереження за даними, скомпілювати шаблон, підключити екземпляр до DOM і оновлювати DOM, коли дані змінюються. Попутно він також запускає функції, які називаються хуками життєвого циклу, надаючи користувачам можливість додавати власний код на певних етапах.

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

Також існують й інші хуки, які викликатимуться на різних етапах життєвого циклу екземпляра, причому найчастіше використовуються <span class="composition-api">[`onMounted`](/api/composition-api-lifecycle.html#onmounted), [`onUpdated`](/api/composition-api-lifecycle.html#onupdated), а також [`onUnmounted`](/api/composition-api-lifecycle.html#onunmounted).</span><span class="options-api">[`mounted`](/api/options-lifecycle.html#mounted), [`updated`](/api/options-lifecycle.html#updated), а також [`unmounted`](/api/options-lifecycle.html#unmounted).</span>

<div class="options-api">

Всі хуки життєвого циклу викликаються з їхнім `this` контекстом, що вказує на поточний активний екземпляр, який їх викликає. Зауважте, що це означає, що вам слід уникати використання стрілкових функцій під час оголошення хуків життєвого циклу, оскільки якщо ви це зробите, ви не зможете отримати доступ до екземпляра компонента через `this`.

</div>

<div class="composition-api">

Коли викликається `onMounted`, Vue автоматично пов'язує зареєстровану функцію зворотного виклику з поточним активним екземпляром компонента. Це вимагає, щоб ці хуки були зареєстровані **синхронно** під час ініціалізації компонента. Наприклад, не робіть так:

```js
setTimeout(() => {
  onMounted(() => {
    // це не спрацює.
  })
}, 100)
```

Зауважте, що це не означає, що виклик має бути розміщений лексично всередині `setup()` або `<script setup>`. `onMounted()` можна викликати у зовнішній функції, якщо стек викликів є синхронним і походить ізсередини `setup()`.

</div>

## Діаграма життєвого циклу

Нижче наведено діаграму життєвого циклу екземпляра. Вам не обов’язково повністю розуміти все, що відбувається зараз, але коли ви дізнаєтесь і створите більше, це стане корисною довідкою.

![Component lifecycle diagram](./images/lifecycle.png)

<!-- https://www.figma.com/file/Xw3UeNMOralY6NV7gSjWdS/Vue-Lifecycle -->

Зверніться до <span class="composition-api">[довідника API хуків життєвого циклу](/api/composition-api-lifecycle.html)</span><span class="options-api">[довідника API хуків життєвого циклу](/api/options-lifecycle.html)</span>, щоб дізнатися більше про всі хуки життєвого циклу та їх відповідні випадки використання.
