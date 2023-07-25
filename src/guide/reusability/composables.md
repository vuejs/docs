# Composables {#composables}

<script setup>
import { useMouse } from './mouse'
const { x, y } = useMouse()
</script>

:::tip Совет
Этот раздел предполагает наличие базовых знаний о Composition API. Если вы изучали Vue только с помощью Options API, вы можете переключить предпочтение API на Composition API (с помощью переключателя в верхней части левой боковой панели) и перечитать главы [Основы реактивности](/guide/essentials/reactivity-fundamentals.html) и [Хуки жизненного цикла](/guide/essentials/lifecycle.html).
:::

## Что такое "Composable"? {#what-is-a-composable}

В контексте приложений Vue "composable" функция - это функция, использующая Composition API Vue для инкапсуляции и повторного использования **логики с отслеживанием состояния**.

При создании интерфейсных приложений нам часто приходится повторно использовать логику для общих задач. Например, нам может понадобиться отформатировать даты во многих местах, поэтому мы извлекаем для этого повторно используемую функцию. Эта функция форматирования инкапсулирует **логику без сохранения состояния**: она принимает некоторый ввод и немедленно возвращает ожидаемый результат. Существует множество библиотек для повторного использования логики без сохранения состояния, например [lodash](https://lodash.com/) и [date-fns](https://date-fns.org/), о которых вы, возможно, слышали.

Напротив, логика с отслеживанием состояния включает в себя управление состоянием, которое изменяется с течением времени. Простым примером может быть отслеживание текущей позиции мыши на странице. В реальных сценариях это также может быть более сложная логика, такая как сенсорные жесты или статус подключения к базе данных.

## Пример отслеживания мыши {#mouse-tracker-example}

Если бы мы реализовали функцию отслеживания мыши с помощью Composition API непосредственно внутри компонента, то это выглядело бы следующим образом:

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>Положение мыши: {{ x }}, {{ y }}</template>
```

Но что, если мы хотим повторно использовать одну и ту же логику в нескольких компонентах? Мы можем извлечь логику во внешний файл как компонуемую функцию:

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// по соглашению имена composables функций начинаются с "use"
export function useMouse() {
  // состояние, инкапсулированное и управляемое composable
  const x = ref(0)
  const y = ref(0)

  // composable может обновлять свое управляемое состояние с течением времени.
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // composable объект также может подключаться к жизненному циклу своего
  // компонента-владельца для настройки и удаления побочных эффектов.
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // представлять управляемое состояние в качестве возвращаемого значения
  return { x, y }
}
```

И вот как его можно использовать в компонентах:

```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Положение мыши: {{ x }}, {{ y }}</template>
```

<div class="demo">
  Положение мыши: {{ x }}, {{ y }}
</div>

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZU1vdXNlIH0gZnJvbSAnLi9tb3VzZS5qcydcblxuY29uc3QgeyB4LCB5IH0gPSB1c2VNb3VzZSgpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICBNb3VzZSBwb3NpdGlvbiBpcyBhdDoge3sgeCB9fSwge3sgeSB9fVxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwibW91c2UuanMiOiJpbXBvcnQgeyByZWYsIG9uTW91bnRlZCwgb25Vbm1vdW50ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VNb3VzZSgpIHtcbiAgY29uc3QgeCA9IHJlZigwKVxuICBjb25zdCB5ID0gcmVmKDApXG5cbiAgZnVuY3Rpb24gdXBkYXRlKGV2ZW50KSB7XG4gICAgeC52YWx1ZSA9IGV2ZW50LnBhZ2VYXG4gICAgeS52YWx1ZSA9IGV2ZW50LnBhZ2VZXG4gIH1cblxuICBvbk1vdW50ZWQoKCkgPT4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHVwZGF0ZSkpXG4gIG9uVW5tb3VudGVkKCgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB1cGRhdGUpKVxuXG4gIHJldHVybiB7IHgsIHkgfVxufSJ9)

Как видим, основная логика остается идентичной - все, что нам нужно было сделать, это перенести ее во внешнюю функцию и вернуть состояние, которое должно быть открыто. Как и внутри компонента, в composables можно использовать весь набор [функций Composition API](/api/#composition-api). Та же функция `useMouse()` теперь может быть использована в любом компоненте.

Но самое интересное в composables - это возможность их вложения: одна composable функция может вызывать одну или несколько других composable функций. Это позволяет нам компоновать сложную логику с помощью небольших изолированных блоков, подобно тому, как мы компонуем целое приложение с помощью компонентов. Собственно, именно поэтому мы решили назвать набор API, позволяющих реализовать этот паттерн, Composition API.

Например, мы можем выделить логику добавления и удаления слушателя событий DOM в отдельный компонент:

```js
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // если вы хотите, вы также можете сделать так, чтобы
  // это поддерживало строки селектора в качестве цели
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

И теперь наша композиция composable `useMouse()` может быть упрощена до:

```js{3,9-12}
// mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

:::tip Совет
Каждый экземпляр компонента, вызывающий `useMouse()`, будет создавать собственные копии состояния `x` и `y`, чтобы они не мешали друг другу. Если вы хотите управлять общим состоянием компонентов, прочитайте главу [Управление состоянием](/guide/scaling-up/state-management.html).
:::

## Пример асинхронного состояния {#async-state-example}

`useMouse()` не принимает никаких аргументов, поэтому рассмотрим другой пример, в котором он используется. При выполнении асинхронной выборки данных нам часто требуется обрабатывать различные состояния: загрузку, успех и ошибку:

```vue
<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('...')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <div v-if="error">Упс! Возникла ошибка: {{ error.message }}</div>
  <div v-else-if="data">
    Данные загружены:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Загрузка...</div>
</template>
```

Было бы утомительно повторять этот паттерн в каждом компоненте, которому необходимо получить данные. Давайте выделим его в composable:

```js
// fetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

Теперь в нашем компоненте мы можем просто сделать:

```vue
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

`useFetch()` принимает на вход статическую строку URL - таким образом, выборка выполняется только один раз и на этом заканчивается. А что если мы хотим, чтобы она выполняла повторную выборку при каждом изменении URL? Мы можем добиться этого, приняв в качестве аргумента refs:

```js
// fetch.js
import { ref, isRef, unref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    // сброс состояния перед получением данных..
    data.value = null
    error.value = null
    // unref() раскрывает потенциальные ссылки
    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  if (isRef(url)) {
    // настройка реактивной повторной выборки, если входной URL является ссылкой
    watchEffect(doFetch)
  } else {
    // в противном случае достаточно выполнить однократную выборку,
    // чтобы избежать накладных расходов на наблюдателя
    doFetch()
  }

  return { data, error }
}
```

Эта версия `useFetch()` теперь принимает как статические строки URL, так и ссылки на строки URL. Когда функция обнаруживает, что URL является динамической ссылкой с помощью функции [`isRef()`](/api/reactivity-utilities.html#isref), она устанавливает реактивный эффект с помощью функции [`watchEffect()`](/api/reactivity-core.html#watcheffect). Эффект будет запущен немедленно и будет также отслеживать ссылку на URL как зависимость. При изменении URL-адреса данные будут сброшены и получены заново.

Вот [обновленная версия `useFetch()`](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyB1c2VGZXRjaCB9IGZyb20gJy4vdXNlRmV0Y2guanMnXG5cbmNvbnN0IGJhc2VVcmwgPSAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3RvZG9zLydcbmNvbnN0IGlkID0gcmVmKCcxJylcbmNvbnN0IHVybCA9IGNvbXB1dGVkKCgpID0+IGJhc2VVcmwgKyBpZC52YWx1ZSlcblxuY29uc3QgeyBkYXRhLCBlcnJvciwgcmV0cnkgfSA9IHVzZUZldGNoKHVybClcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIExvYWQgcG9zdCBpZDpcbiAgPGJ1dHRvbiB2LWZvcj1cImkgaW4gNVwiIEBjbGljaz1cImlkID0gaVwiPnt7IGkgfX08L2J1dHRvbj5cblxuXHQ8ZGl2IHYtaWY9XCJlcnJvclwiPlxuICAgIDxwPk9vcHMhIEVycm9yIGVuY291bnRlcmVkOiB7eyBlcnJvci5tZXNzYWdlIH19PC9wPlxuICAgIDxidXR0b24gQGNsaWNrPVwicmV0cnlcIj5SZXRyeTwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdiB2LWVsc2UtaWY9XCJkYXRhXCI+RGF0YSBsb2FkZWQ6IDxwcmU+e3sgZGF0YSB9fTwvcHJlPjwvZGl2PlxuICA8ZGl2IHYtZWxzZT5Mb2FkaW5nLi4uPC9kaXY+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJ1c2VGZXRjaC5qcyI6ImltcG9ydCB7IHJlZiwgaXNSZWYsIHVucmVmLCB3YXRjaEVmZmVjdCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZldGNoKHVybCkge1xuICBjb25zdCBkYXRhID0gcmVmKG51bGwpXG4gIGNvbnN0IGVycm9yID0gcmVmKG51bGwpXG5cbiAgYXN5bmMgZnVuY3Rpb24gZG9GZXRjaCgpIHtcbiAgICAvLyByZXNldCBzdGF0ZSBiZWZvcmUgZmV0Y2hpbmcuLlxuICAgIGRhdGEudmFsdWUgPSBudWxsXG4gICAgZXJyb3IudmFsdWUgPSBudWxsXG4gICAgXG4gICAgLy8gcmVzb2x2ZSB0aGUgdXJsIHZhbHVlIHN5bmNocm9ub3VzbHkgc28gaXQncyB0cmFja2VkIGFzIGFcbiAgICAvLyBkZXBlbmRlbmN5IGJ5IHdhdGNoRWZmZWN0KClcbiAgICBjb25zdCB1cmxWYWx1ZSA9IHVucmVmKHVybClcbiAgICBcbiAgICB0cnkge1xuICAgICAgLy8gYXJ0aWZpY2lhbCBkZWxheSAvIHJhbmRvbSBlcnJvclxuICBcdCAgYXdhaXQgdGltZW91dCgpXG4gIFx0ICAvLyB1bnJlZigpIHdpbGwgcmV0dXJuIHRoZSByZWYgdmFsdWUgaWYgaXQncyBhIHJlZlxuXHQgICAgLy8gb3RoZXJ3aXNlIHRoZSB2YWx1ZSB3aWxsIGJlIHJldHVybmVkIGFzLWlzXG4gICAgXHRjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmxWYWx1ZSlcblx0ICAgIGRhdGEudmFsdWUgPSBhd2FpdCByZXMuanNvbigpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZXJyb3IudmFsdWUgPSBlXG4gICAgfVxuICB9XG5cbiAgaWYgKGlzUmVmKHVybCkpIHtcbiAgICAvLyBzZXR1cCByZWFjdGl2ZSByZS1mZXRjaCBpZiBpbnB1dCBVUkwgaXMgYSByZWZcbiAgICB3YXRjaEVmZmVjdChkb0ZldGNoKVxuICB9IGVsc2Uge1xuICAgIC8vIG90aGVyd2lzZSwganVzdCBmZXRjaCBvbmNlXG4gICAgZG9GZXRjaCgpXG4gIH1cblxuICByZXR1cm4geyBkYXRhLCBlcnJvciwgcmV0cnk6IGRvRmV0Y2ggfVxufVxuXG4vLyBhcnRpZmljaWFsIGRlbGF5XG5mdW5jdGlvbiB0aW1lb3V0KCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjMpIHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdSYW5kb20gRXJyb3InKSlcbiAgICAgIH1cbiAgICB9LCAzMDApXG4gIH0pXG59In0=), с искусственной задержкой и рандомизированной ошибкой в демонстрационных целях.

## Соглашения и лучшие практики {#conventions-and-best-practices}

### Именование {#naming}

По соглашению composable функции называются именами в camelCase, которые начинаются с "use".

### Входные аргументы {#input-arguments}

Composable может принимать ref-аргументы, даже если он не полагается на них для обеспечения реактивности. Если вы пишете composable, который может быть использован другими разработчиками, то неплохо было бы предусмотреть случай, когда входными аргументами являются не сырые значения, а refs. Для этого пригодится служебная функция [`unref()`](/api/reactivity-utilities.html#unref):

```js
import { unref } from 'vue'

function useFeature(maybeRef) {
  // если maybeRef действительно является ссылкой, то будет возвращено
  // ее значение, в противном случае maybeRef возвращается как есть
  const value = unref(maybeRef)
}
```

Если ваш компонент создает реактивные эффекты, когда на вход подается ссылка, убедитесь, что вы либо явно следите за ссылкой с помощью `watch()`, либо вызываете `unref()` внутри `watchEffect()`, чтобы она правильно отслеживалась.

### Возвращаемые значения {#return-values}

Вы, наверное, заметили, что в composables мы используем исключительно `ref()` а не `reactive()`. Рекомендуется, чтобы composables всегда возвращали обычный нереактивный объект, содержащий несколько ссылок. Это позволяет деструктурировать его в компонентах, сохраняя реактивность:

```js
// x и y являются refs
const { x, y } = useMouse()
```

Возврат реактивного объекта из composable приведет к тому, что такие деструктуры потеряют связь реактивности с состоянием внутри composable, а refs сохранят эту связь.

Если вы предпочитаете использовать возвращаемое состояние из composables в качестве свойств объекта, вы можете обернуть возвращаемый объект с помощью `reactive()` так, чтобы refs были развернуты. Например:

```js
const mouse = reactive(useMouse())
// mouse.x связан с оригинальным ref
console.log(mouse.x)
```

```vue-html
Положение мыши: {{ mouse.x }}, {{ mouse.y }}
```

### Побочные эффекты {#side-effects}

Выполнять побочные эффекты (например, добавлять слушателей событий DOM или получать данные) в composables можно, но при этом следует обратить внимание на следующие правила:

- Если вы работаете над приложением, использующим [отрисовку на стороне сервера](/guide/scaling-up/ssr.html) (SSR), обязательно выполняйте побочные эффекты, специфичные для DOM, в хуках жизненного цикла после монтирования, например, `onMounted()`. Эти хуки вызываются только в браузере, поэтому вы можете быть уверены, что код, находящийся в них, имеет доступ к DOM.

- Не забывайте очищать побочные эффекты в `onUnmounted()`. Например, если компонент устанавливает слушатель событий DOM, он должен удалить этот слушатель в `onUnmounted()`, как мы видели в примере `useMouse()`. Хорошей идеей может быть использование composable, который автоматически делает это за вас, как пример `useEventListener()`.

### Ограничения в использовании {#usage-restrictions}

Composables должны вызываться только **синхронно** в `<script setup>` или в хуке `setup()`. В некоторых случаях их можно также вызывать в хуках жизненного цикла, например `onMounted()`.

Это контексты, в которых Vue может определить текущий активный экземпляр компонента. Доступ к активному экземпляру компонента необходим для того, чтобы:

1. На него могут быть зарегистрированы хуки жизненного цикла.

2. Вычисляемые свойства и наблюдатели могут быть связаны с ним, чтобы их можно было утилизировать при размонтировании экземпляра для предотвращения утечек памяти.

:::tip Совет
`<script setup>` это единственное место, где можно вызывать composables **после** использования `await`. Компилятор автоматически восстанавливает активный контекст экземпляра после выполнения операции async.
:::

## Извлечение Composables для организации кода {#extracting-composables-for-code-organization}

Composables можно извлекать не только для повторного использования, но и для организации кода. По мере роста сложности компонентов вы можете столкнуться с тем, что они станут слишком большими для навигации и рассуждений. Composition API предоставляет вам полную гибкость для организации кода компонента в более мелкие функции на основе логических соображений:

```vue
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```

В некоторой степени эти извлеченные composables можно рассматривать как компонентно-копируемые сервисы, которые могут взаимодействовать друг с другом.

## Использование Composables в Options API {#using-composables-in-options-api}

Если вы используете Options API, то composables должны вызываться внутри `setup()`, а возвращаемые привязки должны быть возвращены из `setup()`, чтобы они были доступны для `this` и шаблона:

```js
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
  setup() {
    const { x, y } = useMouse()
    const { data, error } = useFetch('...')
    return { x, y, data, error }
  },
  mounted() {
    // Открытые свойства setup() могут быть доступны в `this`
    console.log(this.x)
  }
  // ...другие опции
}
```

## Сравнение с другими методами {#comparisons-with-other-techniques}

### vs. Примеси {#vs-mixins}

Пользователи, пришедшие из Vue 2, могут быть знакомы с опцией [mixins](/api/options-composition.html#mixins), которая также позволяет извлекать логику компонентов в виде многократно используемых блоков. У миксинов есть три основных недостатка:

1. **Неясный источник свойств**: при использовании большого количества миксинов становится непонятно, какое свойство экземпляра инжектируется каким миксином, что затрудняет отслеживание реализации и понимание поведения компонента. Именно поэтому мы рекомендуем использовать паттерн refs + деструктуризация для composables: это делает источник свойств ясным в потребляющих компонентах.

2. **Коллизии в пространстве имен**: несколько миксинов от разных авторов могут регистрировать одни и те же ключи свойств, что приводит к коллизиям в пространстве имен. При использовании composables можно переименовать деструктурированные переменные, если имеются конфликтующие ключи из разных composables.

3. **Неявное взаимодействие между миксинами**: несколько миксинов, которым необходимо взаимодействовать друг с другом, должны опираться на общие ключи свойств, что делает их неявно связанными. С помощью composables, значения, возвращаемые одним composable, могут передаваться в другой в качестве аргументов, как и в обычных функциях.

По указанным выше причинам мы больше не рекомендуем использовать миксины в Vue 3. Эта возможность сохраняется только для миграции и ознакомления.

### vs. Renderless компоненты {#vs-renderless-components}

В главе, посвященной слотам компонентов, мы обсудили паттерн [Компонент без рендеринга](/guide/components/slots.html#renderless-components), основанный на слотах с ограничееной областью видимости. Мы даже реализовали тот же демонстрационный пример отслеживания мыши с использованием компонентов без рендеринга.

Основное преимущество composables перед компонентами без рендеринга заключается в том, что composables не несут дополнительных затрат на создание экземпляров компонентов. При использовании во всем приложении количество дополнительных экземпляров компонентов, создаваемых шаблоном компонентов без рендеринга, может стать заметным снижением производительности.

Рекомендуется использовать composables при повторном использовании чистой логики и компоненты при повторном использовании как логики, так и визуальной компоновки.

### vs. React хуки {#vs-react-hooks}

Если у вас есть опыт работы с React, вы можете заметить, что это очень похоже на пользовательские хуки React. Composition API был частично вдохновлен хуками React, и Vue composables действительно похожи на хуки React  с точки зрения возможностей логической композиции. Однако, Vue composables основаны на мелкозернистой системе реактивности, которая принципиально отличается от модели выполнения хуков React. Более подробно этот вопрос рассматривается в [FAQ  по Composition API](/guide/extras/composition-api-faq#comparison-with-react-hooks).

## Дополнительное чтение {#further-reading}

- [Реактивность в деталях](/guide/extras/reactivity-in-depth.html): для низкоуровневого понимания того, как работает система реактивности Vue.
- [Управление состоянием](/guide/scaling-up/state-management.html): для моделей управления состоянием, разделяемым несколькими компонентами.
- [Тестирование Composables](/guide/scaling-up/testing.html#testing-composables): советы по модульному тестированию composables.
- [VueUse](https://vueuse.org/): постоянно растущая коллекция composables элементов Vue. Исходный код также является отличным обучающим ресурсом.
