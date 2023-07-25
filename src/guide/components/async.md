# Асинхронные компоненты {#async-components}

## Базовое использование {#basic-usage}

В больших приложениях может потребоваться разделить приложение на более мелкие части и загружать компонент с сервера только при необходимости. Для этого Vue предоставляет функцию [`defineAsyncComponent`](/api/general.html#defineasynccomponent):

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...загрузка компонента с сервера
    resolve(/* загруженный компонент */)
  })
})
// ... используйте `AsyncComp` как обычный компонент
```

Как вы заметили, `defineAsyncComponent` принимает функцию загрузчика, которая возвращает Promise. Коллбэк Promise `resolve` должен быть вызван, когда вы получили определение компонента с сервера. Вы также можете вызвать `reject(reason)`, чтобы указать, что загрузка не удалась.

[Динамический импорт ES-модулей](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) также возвращает Promise, поэтому большую часть времени мы будем использовать его в сочетании с `defineAsyncComponent`. Сборщики, такие как Vite и webpack, также поддерживают этот синтаксис (и будут использовать его для разделения бандлов), поэтому мы можем использовать его для импорта файлов однофайловых компонентов Vue (SFC):

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

Полученный `AsyncComp` является оберткой компонента, которая вызывает функцию загрузчика только при фактической отрисовке на странице. Кроме того, он передаст все атрибуты и слоты внутреннему компоненту, поэтому вы можете использовать асинхронную обертку для плавной замены исходного компонента и реализации lazy loading (ленивой загрузки).

Как и с обычными компонентами, асинхронные компоненты могут быть [глобально зарегистрированы](/guide/components/registration.html#global-registration) при помощи `app.component()`:

```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

<div class="options-api">

Вы так же можете использовать `defineAsyncComponent` при [локальной регистрации компонента](/guide/components/registration.html#local-registration):

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

Они также могут быть определены непосредственно внутри родительского компонента:

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

## Состояния загрузки и ошибки {#loading-and-error-states}

Асинхронные операции неизбежно включают состояния загрузки и ошибок - `defineAsyncComponent()` поддерживает обработку этих состояний с помощью дополнительных опций:

```js
const AsyncComp = defineAsyncComponent({
  // функция загрузчика
  loader: () => import('./Foo.vue'),

  // компонент, используемый при загрузке асинхронного компонента
  loadingComponent: LoadingComponent,
  // Задержка перед отображением компонента загрузки. По умолчанию: 200 мс.
  delay: 200,

  // компонент, используемый при ошибке загрузки
  errorComponent: ErrorComponent,
  // Компонент ошибки будет отображаться, если указано и было превышено время ожидания. По умолчанию: Infinity.
  timeout: 3000
})
```

Если предоставлен компонент загрузки, он будет отображаться сначала, пока загружается внутренний компонент. Есть задержка в 200 мс перед отображением компонента загрузки - это связано с тем, что при быстром соединении мгновенное состояние загрузки может быть слишком быстро заменено и создавать эффект мерцания.

Если предоставлен компонент ошибки, он будет отображаться, когда Promise, возвращаемый функцией загрузчика, будет отклонен. Вы также можете указать время ожидания для отображения компонента ошибки, если запрос занимает слишком много времени.

## Использование с Suspense {#using-with-suspense}

Асинхронные компоненты могут использоваться с встроенным компонентом `<Suspense>`. Взаимодействие между `<Suspense>` и асинхронными компонентами описано в [специальной главе посвященной `<Suspense>`](/guide/built-ins/suspense.html).
