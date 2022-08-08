# Асинхронні компоненти

## Основне використання

У великих програмах нам може знадобитися розділити програму на менші частини та завантажувати компонент із сервера лише тоді, коли це необхідно. Щоб зробити це можливим, Vue має функцію [`defineAsyncComponent`](/api/general.html#defineasynccomponent):

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...завантаження компонента з сервера
    resolve(/* завантажений компонент */)
  })
})
// ... використовуйте `AsyncComp`, як звичайний компонент
```

Як бачите, `defineAsyncComponent` приймає функцію-завантажувача, яка повертає Promise. Зворотний виклик `resolve` Promise слід викликати, коли ви отримаєте визначення свого компонента з сервера. Ви також можете викликати `reject(reason)`, щоб вказати, що завантаження не вдалося.

[Динамічний імпорт модуля ES](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) також повертає Promise, тому більшу частину часу ми будемо використовувати його в поєднанні з `defineAsyncComponent`. Пакетувальники, такі як Vite і webpack, також підтримують синтаксис, тому ми можемо використовувати його для імпорту Vue SFC:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

Отриманий `AsyncComp` є компонентом-оболонкою, який викликає функцію завантажувача лише тоді, коли вона фактично показується на сторінці. Крім того, він передасть усі реквізити та слоти до внутрішнього компонента, тож ви можете використовувати асинхронну оболонку для плавної заміни оригінального компонента, досягаючи відкладеного завантаження.

Як і звичайні компоненти, асинхронні компоненти можна [зареєструвати глобально](/guide/components/registration.html#global-registration) за допомогою `app.component()`:

```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

<div class="options-api">

Ви також можете використовувати `defineAsyncComponent`, якщо [реєструєте компонент локально](/guide/components/registration.html#local-registration):

```vue
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}
</script>

<template>
  <AdminPage />
</template>
```

</div>

<div class="composition-api">

Їх також можна визначити безпосередньо в батьківському компоненті:

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

</div>

## Стани завантаження та помилки

Асинхронні операції неминуче включають стани завантаження та помилки - `defineAsyncComponent()` підтримує обробку цих станів за допомогою додаткових параметрів:

```js
const AsyncComp = defineAsyncComponent({
  // функція-завантажувач
  loader: () => import('./Foo.vue'),

  // Компонент для використання під час завантаження асинхронного компонента
  loadingComponent: LoadingComponent,
  // Затримка перед показом компонента завантаження. За замовчуванням: 200 мс.
  delay: 200,

  // Компонент для використання, якщо завантаження не вдається
  errorComponent: ErrorComponent,
  // Компонент помилки відображатиметься, якщо встановлено
  // та перевищено час очікування. За замовчуванням: нескінченність.
  timeout: 3000
})
```

Якщо надається завантажувальний компонент, він показуватиметься першим під час завантаження внутрішнього компонента. За замовчуванням існує затримка 200 мс перед показом компонента завантаження – це відбувається тому, що у швидких мережах стан миттєвого завантаження може надто швидко змінюватись і виглядати як мерехтіння.

Якщо надається компонент помилки, він показуватиметься, коли Promise, повернутий функцією-завантажувачем, буде відхилено. Ви також можете вказати час очікування для показу компонента помилки, коли запит триває надто довго.

## Використання із Suspense

Асинхронні компоненти можна використовувати з вбудованим компонентом `<Suspense>`. Взаємодію між `<Suspense>` і асинхронними компонентами задокументовано в [розділі, присвяченому `<Suspense>`](/guide/built-ins/suspense.html).
