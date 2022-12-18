# Композиційні функції {#composables}

<script setup>
import { useMouse } from './mouse'
const { x, y } = useMouse()
</script>

:::tip
Цей розділ передбачає базові знання композиційного API. Якщо ви вивчали Vue лише з опційним API, ви можете встановити налаштування API на композиційний (за допомогою перемикача у верхній частині лівої бічної панелі) і перечитати [основи реактивності](/guide/essentials/reactivity-fundamentals.html) та розділи по [хуках життєвого циклу](/guide/essentials/lifecycle.html).
:::

## Що таке композиційна функція? {#what-is-a-composable}

У контексті додатків Vue композиційна функція — це функція, яка використовує композиційний API Vue для інкапсуляції та повторного використання **логіки зі станом**.

Під час створення фронтенд додатків нам часто потрібно повторно використовувати логіку для типових завдань. Наприклад, нам може знадобитися форматування дати в багатьох місцях, тому ми беремо для цього функцію для повторного використання. Ця функція форматування інкапсулює логіку **без стану**: вона приймає деякий вхід і негайно повертає очікуваний результат. Існує багато бібліотек для повторного використання логіки без стану, наприклад [lodash](https://lodash.com/) і [date-fns](https://date-fns.org/), про які ви, можливо, чули.

Навпаки, логіка збереження стану передбачає керування станом, який змінюється з часом. Простим прикладом може бути відстеження поточної позиції миші на сторінці. У реальних сценаріях це також може бути складніша логіка, наприклад жести дотиком або статус підключення до бази даних.

## Приклад відстеження миші {#mouse-tracker-example}

Якби ми реалізували функцію відстеження миші за допомогою композиційного API безпосередньо всередині компонента, це виглядало б наступним чином:

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

<template>Координати миші: {{ x }}, {{ y }}</template>
```

Але що, якщо ми хочемо повторно використовувати ту саму логіку в кількох компонентах? Ми можемо перемістити логіку у зовнішній файл як композиційну функцію:

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// за конвенцією, назви композиційних функцій починаються з "use" (англ. — використовувати)
export function useMouse() {
  // стан, інкапсульований і керований композиційною функцією
  const x = ref(0)
  const y = ref(0)

  // композиційна функція може оновлювати свій керований стан з часом.
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // композиційна функція також може підключитися до свого компонента-власника
  // життєвий цикл для налаштування та демонтажу побічних ефектів.
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // відкрити керований стан як значення, що повертається
  return { x, y }
}
```

І ось як це можна використовувати в компонентах:

```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Координати миші: {{ x }}, {{ y }}</template>
```

<div class="demo">
  Координати миші: {{ x }}, {{ y }}
</div>

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNqNkr9OwzAQxl/FytIgpQ5zBZUY2GBEAilLaK4lVXO2bCdtVUVCTDwBA0/BwNAB+gzuG3GXtKH8EWJJfOe7X+67L6vgTGtZlRAMghM7Mrl2woIr9TDBvNDKOLESpYVLRQ9Ri7FRhejJuOBYTm0vwQRHCi3XLSKxpJrTriE8SvAkbrEEpMBBoWepA4qE8M9+4zfbe//q1/7dv2wf/Fr4N7/ePm6fBmJFRFHXER+IWzOr6w+ioJ2vX6SaBlFIClZMTXYXNgmIwRnOkUSOk+DOOW0HcWzHI9Y9tVKZSUwnaUp0eQESbNG/NWpuwRA4CaIDRkzJCkzfAGZgwPzF/Fb6g8tYElWTlP06SUO3dQPjSCikRaKDjI9XSHUcdEbQxxoHYNE0jUscuVzhgQHtBlqHFmQNUcNjsmWfWx7kOPuJ0BntOYQK0O0oQixklc5KoJ4mL3U6gev2avnL1c1OIr86JSENdToU8xwzNZdplp1z/UVuHSCYsNfsolAV9KLdEEfNvAf6vyJMU/0vCnMM/d4Gu9+VDag/AN5pFz8=)

Як ми бачимо, основна логіка залишається ідентичною - все, що нам потрібно було зробити, це перемістити її в зовнішню функцію і повернути стан, який повинен бути відкритий. Так само як і всередині компонента, ви можете використовувати повний діапазон [функцій композиційного API](/api/#composition-api) у композиційних функціях. Ту саму функцію `useMouse()` тепер можна використовувати в будь-якому компоненті.

Але крутіша частина композиційних функцій полягає в тому, що ви також можете вкладати їх: одна композиційна функція може викликати одну або кілька інших композиційних функцій. Це дає нам змогу створювати складну логіку за допомогою невеликих ізольованих одиниць, подібно до того, як ми створюємо цілу програму за допомогою компонентів. Ось чому ми вирішили назвати набір API, які роблять можливим цей шаблон композиційним API.

Наприклад, ми можемо витягти логіку додавання та видалення слухача подій DOM у свою власну композиційну функцію:

```js
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // за бажанням, ви також можете додати 
  // підтримку рядків в якості цілі для прослуховування
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

І тепер наш `useMouse()` можна спростити до:

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

:::tip
Кожен екземпляр компонента, що викликає `useMouse()`, створить власні копії стану `x` і `y`, щоб вони не заважали один одному. Якщо ви хочете керувати спільним станом між компонентами, прочитайте розділ [Керування станом](/guide/scaling-up/state-management.html).
:::

## Приклад асинхронного стану {#async-state-example}

Композиційна функція `useMouse()` не приймає жодних аргументів, тож подивимося на інший приклад, у якому вона використовується. Під час отримання асинхронних даних нам часто потрібно обробляти різні стани: завантаження, успіх і помилка:

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
  <div v-if="error">Ой! Виникла помилка: {{ error.message }}</div>
  <div v-else-if="data">
    Дані завантажено:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Завантаження...</div>
</template>
```

Було б утомливо повторювати цей шаблон у кожному компоненті, який потребує отримання даних. Перемістимо його в композиційну функцію:

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

Тепер у нашому компоненті ми можемо просто зробити:

```vue
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

`useFetch()` приймає статичний рядок URL-адреси як вхідні дані, тому він виконує витягнення даних лише один раз, а потім завершує роботу. Що, якщо ми хочемо, щоб він повторно витягував дані щоразу, коли змінюється URL? Ми можемо досягти цього, також приймаючи референції як аргумент:

```js
// fetch.js
import { ref, isRef, unref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    // скидання стану перед отриманням..
    data.value = null
    error.value = null
    // unref() розгортає потенційні референції
    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  if (isRef(url)) {
    // налаштувати реактивне повторне витягнення даних, якщо вхідна URL-адреса є референцією
    watchEffect(doFetch)
  } else {
    // інакше просто витягуємо один раз,
    // уникаючи накладних витрат спостерігача
    doFetch()
  }

  return { data, error }
}
```

Ця версія `useFetch()` тепер приймає як статичні рядки URL-адреси, так і референції на рядки URL-адреси. Коли він виявляє, що URL-адреса є динамічною референцією за допомогою [`isRef()`](/api/reactivity-utilities.html#isref), він встановлює реактивний ефект за допомогою [`watchEffect()`](/api/reactivity-core.html#watcheffect). Ефект запуститься негайно, а також відстежуватиме URL-адресу як залежність. Щоразу, коли URL-адреса змінюється, дані скидаються та завантажуються знову.

Ось [оновлена версія `useFetch()`](https://sfc.vuejs.org/#eNqFVt1u40QUfpWDb+KK1C5acROlFVwsVyChFcuVb1xnsnVJbMszTqmiSEtLl0VCuxKqundIPAGlP9ts23RfYfxGfGfGdt00gKrG9sz5/c73jT11vswyb1IIp+f0ZZTHmSIpVJFtBUk8ztJc0ZRyMexSlI6zQokBzWiYp2PqwKnTMiqk+EqoaKfZ9/x6yduVsAySKE2kou1Qiuf5iDaps6NUJnu+vyvTJBuFkdhJRwORe2o/i6N0IDwk9VU6SKWPANY9HsATFbmdzzpr9WJh4tUluu4abW41iT6FjzcJR4WAfe0xpUGowi6JPE/zLgKqfB+lbzZ9uIgJ+75vUQEeeFBijDqVwBORfqdP9Rn+F+UBft/rOa5zKn/ix/IAf29IX5Fe6Dt9qy/Ll3ztsWd/u1AqTWiyPkzzzcCJKU7o88ChL6JRHP3AK9xlHDhb0ynFNJv1fetiyghUfxBP4B0PYWo6gCUHRuhsS/+hP3xC+nc9R+q5vtY3+pT0R1PFHA/X+rRHiGscvbGQMnwhTA6euglS1deUY+BBDv2n/mj6+Ls85NZtw7/qS8Lqqb5qlYkoPqq0d7ZcMZLC1szYc7hlBC8ZLNIXZumkh25ywRCwva0Qzyvjro61KN96nlc79P1mfk7XscxdH4cZ+JkmEMCUYwJ7syEDByhZPAIHZOfnwKkpK4cRy2ZXemn+wsedlxeJisfCE3K8vp2nexJE3kWUbiuGj8WJyNdzkYDnAmP795hLpo/icthZkMzQSktoaOOhbmP5jC9FYp72Qpg9HQ5FpJaEHCTiR+M3LJJIxZj+AyVYKKx2zDSsCJNixCqpdwylHm7xZij3k+g+8CC1caugRL4P1YCXczt5HlslI9weMndZPZf6gvQdZPUShre1ob71PBuFy7I6RwWc3S5bmj9eb6eGUsojQ2zEtGy+01f6rIP4V01JuF2A87/U1KLnz77uMv2hBwL32BvsvcXNOXSG27PyRF8g/g1f0eAdVhrhoMPfCAmum0pMrhuEf8/0ZwRgAccb5GpNzjWI15hjOt9XzZkhVwfXfYt8slVA235fI+4h2kAzJmUDKU4GH9XNAfhpXe+js8OIRGGoe2GsiCmfFlVJvMxt/KWvGRUqX1ksL8ufqwkuyldo7C1QO8C+rXfNJjgzJoz+I5xXhHjHx2Dd0AnbI+frVc7mrLrgnVYW9M8FMPpUHldoKQtoLiSwtO0NawEYiJnOJukDqllLeJlzpB7OjCKeGLmiofkyF0VlWSmZL/GQXKNYM8W2QEyLOMnt9OxJ14BjugelsMxvm3PDPX4focFzxrTGwuprXh5hAujdTAmcPDL85LfFByY1IFmF+XH5xpbT5mIlZtP1jPgobhd9ZoaDwYBArOQWucrDLkbCSjNSb1eM6RyzjCB3WEKc1eul0nl9fLRwwwuqyJOVb/Ve7WBOSzb/Pw0ESXNUNfS2TVVpErFH3+LsjKVwXQw+HU0EZ9sFIObTo0IAX1LfVQHsJ0lDBJ7zN6Ha8fIwGaRj7G7RhvekRRVOZgLXhFqG15pwSpfrecotux3z2v8v+XbW7uNV/OvSk40NiyZ+Z87sH8nRkM4=), зі штучною затримкою та випадковою помилкою для демонстраційних цілей.

## Конвенції та найкращі практики {#conventions-and-best-practices}

### Іменування {#naming}

Визначає правило іменування композиційних функцій за допомогою імен верблюжого регістру, які починаються з "use".

### Вхідні аргументи {#input-arguments}

Композиційна функція може приймати референції як аргументи, навіть якщо вона не покладається на них для реактивності. Якщо ви пишете композиційну функцію, яка може використовуватися іншими розробниками, буде гарною ідеєю розглянути випадок, коли вхідні аргументи є референціями замість необроблених значень. Допоміжна функція [`unref()`](/api/reactivity-utilities.html#unref) стане в пригоді для цієї мети:

```js
import { unref } from 'vue'

function useFeature(maybeRef) {
  // якщо maybeRef справді є референцією, буде повернено його .value
  // інакше maybeRef повертається як є
  const value = unref(maybeRef)
}
```

Якщо ваша композиційна функція створює реактивні ефекти, коли вхідний аргумент є референцією, переконайтеся, що ви явно спостерігаєте за посиланням за допомогою `watch()`, або викликаєте `unref()` всередині `watchEffect()`, щоб воно належним чином відстежувалося.

### Повернуті значення {#return-values}

Ви, мабуть, помітили, що ми використовували виключно `ref()` замість `reactive()` у композиційних функціях. Згідно з конвенцією, рекомендується, щоб композиційні функції завжди повертали звичайний нереактивний об’єкт, що містить кілька референцій. Це дозволяє його деструктурувати на компоненти, зберігаючи реакційну здатність:

```js
// x і y є референціями
const { x, y } = useMouse()
```

Повернення реактивного об'єкта з композиційної функції призведе до того, що такі деструктуризовані дані втратять зв'язок реактивності зі станом всередині композиційної функції, тоді як референції збережуть цей зв'язок.

Якщо ви віддаєте перевагу використанню повернутого стану від композиційної функції як властивості об'єкта, ви можете обгорнути повернутий об'єкт за допомогою `reactive()`, щоб референції були розгорнутими. Наприклад:

```js
const mouse = reactive(useMouse())
// mouse.x пов'язано з оригінальною референцією
console.log(mouse.x)
```

```vue-html
Координати миші: {{ mouse.x }}, {{ mouse.y }}
```

### Сторонні ефекти {#side-effects}

Виконувати побічні ефекти (наприклад, додавати прослуховувачі подій DOM або отримувати дані) у композиційних функціях можна, але зверніть увагу на наступні правила:

- Якщо ви працюєте над програмою, яка використовує [рендеринг на стороні сервера](/guide/scaling-up/ssr.html) (SSR), переконайтеся, що ви виконуєте специфічні для DOM побічні ефекти в хуках життєвого циклу після монтування, наприклад, `onMounted()`. Ці хуки викликаються лише в браузері, тож ви можете бути впевнені, що код у них має доступ до DOM.

- Не забудьте очищувати побічні ефекти в `onUnmounted()`. Наприклад, якщо композиційна функція встановлює слухач подій DOM, він повинен видалити цей слухач у `onUnmounted()`, як ми бачили у прикладі `useMouse()`. Гарною ідеєю може бути використання композиційної функції, яка автоматично робить це за вас, як-от приклад `useEventListener()`.

### Обмеження при використанні {#usage-restrictions}

Композиційні функції слід викликати лише **синхронно** в `<script setup>` або `setup()` хуку. У деяких випадках ви також можете викликати їх у хуках життєвого циклу, наприклад `onMounted()`.

Це контексти, у яких Vue може визначити поточний екземпляр активного компонента. Доступ до екземпляра активного компонента необхідний для того, щоб:

1. В ньому можна зареєструвати хуки життєвого циклу.

2. До нього можна прив'язати обчислювані властивості та спостерігачі, щоб їх можна було видалити, коли екземпляр відмонтовано, щоб запобігти джерелам витоку пам'яті.

:::tip
`<script setup>` є єдиним місцем, де ви можете викликати композиційні функції **після** використання `await`. Компілятор автоматично відновлює для вас активний контекст екземпляра після асинхронної операції.
:::

## Витягнення композиційних функцій для організації коду {#extracting-composables-for-code-organization}

Композиційні функції можна витягати не тільки для повторного використання, але й для організації коду. У міру того, як складність ваших компонентів зростає, ви можете опинитися з надто великими компонентами для навігації та розуміння. Композиційний API дає вам повну гнучкість для організації коду компонента в менші функції на основі логічних проблем:

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

Певною мірою ви можете розглядати ці витягнуті компоненти як компонентні сервіси, які можуть спілкуватися один з одним.

## Використання композиційних функцій в опційному API {#using-composables-in-options-api}

Якщо ви використовуєте опційний API, композиційні функції потрібно викликати всередині `setup()`, а повернуті прив'язки мають бути повернуті з `setup()` для доступності для `this` і шаблону:

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
    // Доступ до відкритих властивостей setup() можна отримати через `this`
    console.log(this.x)
  }
  // ...інші варіанти
}
```

## Порівняння щодо інших технік {#comparisons-with-other-techniques}

### щодо міксинів {#vs-mixins}

Користувачі, які перейшли з Vue 2, можуть бути знайомі з параметром [mixins](/api/options-composition.html#mixins), який також дозволяє нам витягувати логіку компонентів у багаторазові блоки. У міксинів є три основні недоліки:

1. **Незрозуміле джерело властивостей**: при використанні багатьох міксинів стає незрозуміло, яка властивість екземпляра впроваджується яким міксином, що ускладнює відстеження реалізації та розуміння поведінки компонента. Ось чому ми також рекомендуємо використовувати шаблон "референція + деструктуризація" для композиційних функцій: це робить джерело властивості зрозумілим у споживаючих компонентах.

2. **Колізії просторів імен**: кілька міксинів від різних авторів потенційно можуть зареєструвати однакові ключі властивостей, спричиняючи колізії просторів імен. За допомогою композиційниї функцій ви можете перейменувати деструктуровані змінні, якщо є конфліктні ключі від різних композиційних функцій.

3. **Неявний зв'язок крос-міксинів**: кілька міксинів, які повинні взаємодіяти один з одним, повинні покладатися на спільні ключі властивостей, що робить їх неявно зв'яними. За допомогою композиційних функцій значення, повернуті однією композиційною функцією, можна передати в інший як аргументи, як і у звичайні функції.

З наведених вище причин ми більше не рекомендуємо використовувати міксини у Vue 3. Ця функція зберігається лише з міркувань міграції та знайомства.

### щодо компонент без рендерингу {#vs-renderless-components}

У розділі про слоти компонентів ми обговорили шаблон [компоненти без рендеру](/guide/components/slots.html#renderless-components) на основі слотів з обмеженою областю. Ми навіть реалізували ту саму демонстрацію відстеження миші, використовуючи компоненти без рендерингу.

Основна перевага складових компонентів над компонентами без рендерингу полягає в тому, що складові компоненти не спричиняють додаткових витрат на екземпляр компонента. При використанні в усій програмі, кількість додаткових екземплярів компонентів, створених за допомогою шаблону компонента без рендерингу, може призвести до помітних накладних витрат на продуктивність.

Рекомендується використовувати композиційні функції при повторному використанні чистої логіки та використовувати компоненти при повторному використанні як логіки, так і візуального макета.

### щодо React хуків {#vs-react-hooks}

Якщо у вас є досвід роботи з React, ви можете помітити, що це дуже схоже на спеціальні хуки React. Композиційний API був частково натхненний хуками React, і композиційні функції Vue справді схожі на хуки React з точки зору можливостей логічної композиції. Однак, композиційні функції Vue базуються на багатогранній системі реактивності Vue, яка принципово відрізняється від моделі виконання хуків React. Це обговорюється більш детально в [поширених питаннях щодо композиційного API](/guide/extras/composition-api-faq#comparison-with-react-hooks).

## Подальше читання {#further-reading}

- [Реактивність поглиблено](/guide/extras/reactivity-in-depth.html): для низькорівневого розуміння того, як працює система реактивності Vue.
- [Керування станом](/guide/scaling-up/state-management.html): для шаблонів керування станом, спільного для кількох компонентів.
- [Тестування композиційниї функцій](/guide/scaling-up/testing.html#testing-composables): поради щодо модульного тестування композиційних функцій.
- [VueUse](https://vueuse.org/): колекція Vue композиційних функцій, постійно покращується. Вихідний код також є чудовим навчальним ресурсом.
