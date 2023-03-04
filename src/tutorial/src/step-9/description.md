# Життєвий цикл і референції в шаблонах {#lifecycle-and-template-refs}

Досі Vue оновлював за нас DOM завдяки реактивності та декларативному рендерингу. Проте можуть бути випадки, коли нам доведеться вручну працювати з DOM.

Ми можемо звернутися до **template ref**, що являється референцією на елемент в темплейті, використовуючи <a target="_blank" href="/api/built-in-special-attributes.html#ref">спеціальний атрибут `ref`</a>:

```vue-html
<p ref="p">Привіт</p>
```

<div class="composition-api">

Щоб отримати доступ до референції, нам потрібно оголосити <span class="html"> та повернути</span> референцію з відповідним іменем:

<div class="sfc">

```js
const p = ref(null)
```

</div>
<div class="html">

```js
setup() {
  const p = ref(null)

  return {
    p
  }
}
```

</div>

Зверніть увагу, що референція ініціалізується зі значенням `null`. Це відбувається тому, що елемент ще не існує, коли виконується <span class="sfc">`<script setup>`</span><span class="html">`setup()`</span>. Шаблон референції буде доступний лише після того, коли компонента **змонтована**.

Щоб запустити код після монтування, ми можемо використовувати функцію `onMounted()`:

<div class="sfc">

```js
import { onMounted } from 'vue'

onMounted(() => {
  // тепер компонент змонтовано.
})
```

</div>
<div class="html">

```js
import { onMounted } from 'vue'

createApp({
  setup() {
    onMounted(() => {
      // тепер компонент змонтовано.
    })
  }
})
```

</div>
</div>

<div class="options-api">

Елемент буде представлено в `this.$refs` як `this.$refs.p`. Проте ви можете отримати доступ до компонента лише після того, коли він буде **змонтований**.

Щоб запустити код після монтування, ми можемо використовувати параметр `mounted`:

<div class="sfc">

```js
export default {
  mounted() {
    // тепер компонент змонтовано.
  }
}
```

</div>
<div class="html">

```js
createApp({
  mounted() {
    // тепер компонент змонтовано.
  }
})
```

</div>
</div>

Це називається **хуком життєвого циклу**, який дозволяє нам вказати функцію зворотного виклику в певні моменти життєвого циклу компонента. Також існують інші хуки, такі як <span class="options-api">`created` та `updated`</span><span class="composition-api">`onUpdated` and `onUnmounted`</span>. Щоб дізнатися більше, перегляньте <a target="_blank" href="/guide/essentials/lifecycle.html#lifecycle-diagram">Діаграму життєвого циклу</a>.

Тепер спробуйте додати хук <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span> для того, щоб отримати доступ до `<p>` через <span class="options-api">`this.$refs.p`</span><span class="composition-api">`p.value`</span> і виконайте будь-які операції з DOM (наприклад, змініть його `textContent`).
