---
footer: false
---

# Введение {#introduction}

:::info Это документация для Vue 3!
- Документация для Vue 2 доступна тут [ru.vuejs.org/v2/](https://ru.vuejs.org/v2/).
- Мигрируете с Vue 2? Ознакомьтесь с [руководством по миграции](https://v3-migration.vuejs.org/).
:::

<style src="@theme/styles/vue-mastery.css"></style>
<div class="vue-mastery-link">
  <a href="https://www.vuemastery.com/courses-path/beginner" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description">Изучайте Vue с помощью видеоуроков на <span>VueMastery.com</span> (на англ.)</p>
    <div class="logo-wrapper">
        <img alt="Логотип Vue Mastery" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>

## Что такое Vue? {#what-is-vue}

Vue (произносится /vjuː/, примерно как **view**) — JavaScript фреймворк для создания пользовательских интерфейсов. Он создан на стандартах HTML, CSS и JavaScript и предоставляет декларативную и компонентную модель программирования, которая помогает эффективно разрабатывать пользовательские интерфейсы, будь то простые или сложные.

Вот маленький пример:

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

```vue-html
<div id="app">
  <button @click="count++">
    Счётчик: {{ count }}
  </button>
</div>
```

**Результат**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<div class="demo">
  <button @click="count++">
    Счётчик: {{ count }}
  </button>
</div>

Пример выше демонстрирует две главные фундаментальные особенности Vue:

- **Декларативная отрисовка**: Vue расширяет стандартный HTML синтаксисом шаблонов, который позволяет декларативно описывать финальный HTML на основе состояния JavaScript.

- **Реактивность**: Vue автоматически отслеживает изменения состояния JavaScript и эффективно обновляет DOM, когда происходят изменения.

Возможно уже появились новые вопросы — не волнуйтесь. Каждую деталь изучим в подробностях далее в документации. А пока, продолжайте читать дальше, чтобы получить общее представление о том, что предлагает Vue.

:::tip Предварительные условия
В руководстве предполагается наличие знаний HTML, CSS и JavaScript. Для новичков во фронтенд-разработке сразу начинать изучение с фреймворка может быть не лучшей идеей — возвращайтесь, разобравшись с основами! Проверить уровень своих знаний можно например с помощью [этого обзора JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript). Наличие опыта работы с другими фреймворками может помочь, но не является обязательным.
:::

## Прогрессивный фреймворк {#the-progressive-framework}

Vue — фреймворк и экосистема, охватывающая большинство функций, необходимых при разработке фронтенда. Однако веб чрезвычайно разнообразен — вещи, которые создаём в интернете, могут сильно отличаться и по форме и по масштабу. Учитывая это, Vue спроектирован так, чтобы быть гибки и постепенно адаптируемым. В зависимости от сценария использования и Vue можно использовать по-разному:

- Улучшать статический HTML без добавления этапа сборки
- Встраиваться в качестве веб-компонентов на любой странице
- Одностраничные приложения (SPA)
- Fullstack / Отрисовка на стороне сервера (SSR)
- Jamstack / Генерация статического сайта (SSG)
- Нацеленность на настольные, мобильные устройства, WebGL и даже терминалы

Если эти понятия звучат пугающе, не волнуйтесь! В самоучителе и руководстве требуются только базовые знания HTML и JavaScript. С ними можно начинать изучение даже не будучи экспертом ни в одной из этих областей.

Для опытных разработчиков, интересующихся как лучше интегрировать Vue в уже существующий стек, а также тем, кому интересно, что значат эти термины, более подробно обсудим их в разделе [Пути использования Vue](/guide/extras/ways-of-using-vue).

Несмотря на гибкость, основные знания о том, как работает Vue будут общими для всех сценариев использования. Даже новичкам знания, полученные на этом пути, пригодятся по мере роста и достижения более амбициозных целей в будущем. Опытные разработчики смогут выбрать оптимальный способ использования Vue в зависимости от проблем, которые требуется решить, сохраняя при этом прежнюю производительность. Вот почему называем Vue «Прогрессивным фреймворком»: это фреймворк, который может расти вместе с вами и адаптироваться к вашим потребностям.

## Однофайловые компоненты {#single-file-components}

В большинстве проектов Vue, где есть шаг сборки, компоненты Vue создаются с использованием файлов HTML-подобного формата, называемого **однофайловыми компонентами** (также известного как `*.vue` файлы, сокращённо называемых **SFC**). Однофайловые компоненты Vue, как следует из названия, объединяют в себе логику компонента (JavaScript), шаблон (HTML) и стили (CSS) в одном файле. Вот предыдущий пример, написанный в формате однофайлового компонента:

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Счётчик: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

Однофайловые компоненты — отличительная особенность Vue и рекомендуемый способ создания компонентов Vue **если** сценарий использования предполагает шаг сборки. Подробнее можно узнать в отдельном разделе [как и почему SFC](/guide/scaling-up/sfc) — но сейчас достаточно знать, что Vue будет заниматься настройкой всех инструментов сборки для вас.

## Стили API {#api-styles}

Компоненты Vue можно создавать с использованием двух различных стилей: **Options API** и **Composition API**.

### Options API {#options-api}

With Options API, we define a component's logic using an object of options such as `data`, `methods`, and `mounted`. Properties defined by options are exposed on `this` inside functions, which points to the component instance:

```vue
<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      count: 0
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event listeners in templates.
  methods: {
    increment() {
      this.count++
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gcmVhY3RpdmUgc3RhdGVcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG5cbiAgLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbiAgbWV0aG9kczoge1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgIHRoaXMuY291bnQrK1xuICAgIH1cbiAgfSxcblxuICAvLyBsaWZlY3ljbGUgaG9va3NcbiAgbW91bnRlZCgpIHtcbiAgICBjb25zb2xlLmxvZyhgVGhlIGluaXRpYWwgY291bnQgaXMgJHt0aGlzLmNvdW50fS5gKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPkNvdW50IGlzOiB7eyBjb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4ifQ==)

### Composition API {#composition-api}

With Composition API, we define a component's logic using imported API functions. In SFCs, Composition API is typically used with [`<script setup>`](/api/sfc-script-setup). The `setup` attribute is a hint that makes Vue perform compile-time transforms that allow us to use Composition API with less boilerplate. For example, imports and top-level variables / functions declared in `<script setup>` are directly usable in the template.

Here is the same component, with the exact same template, but using Composition API and `<script setup>` instead:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG4vLyByZWFjdGl2ZSBzdGF0ZVxuY29uc3QgY291bnQgPSByZWYoMClcblxuLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbmZ1bmN0aW9uIGluY3JlbWVudCgpIHtcbiAgY291bnQudmFsdWUrK1xufVxuXG4vLyBsaWZlY3ljbGUgaG9va3Ncbm9uTW91bnRlZCgoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBUaGUgaW5pdGlhbCBjb3VudCBpcyAke2NvdW50LnZhbHVlfS5gKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b24gQGNsaWNrPVwiaW5jcmVtZW50XCI+Q291bnQgaXM6IHt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

### Which to Choose? {#which-to-choose}

Both API styles are fully capable of covering common use cases. They are different interfaces powered by the exact same underlying system. In fact, the Options API is implemented on top of the Composition API! The fundamental concepts and knowledge about Vue are shared across the two styles.

The Options API is centered around the concept of a "component instance" (`this` as seen in the example), which typically aligns better with a class-based mental model for users coming from OOP language backgrounds. It is also more beginner-friendly by abstracting away the reactivity details and enforcing code organization via option groups.

The Composition API is centered around declaring reactive state variables directly in a function scope, and composing state from multiple functions together to handle complexity. It is more free-form, and requires understanding of how reactivity works in Vue to be used effectively. In return, its flexibility enables more powerful patterns for organizing and reusing logic.

You can learn more about the comparison between the two styles and the potential benefits of Composition API in the [Composition API FAQ](/guide/extras/composition-api-faq).

If you are new to Vue, here's our general recommendation:

- For learning purposes, go with the style that looks easier to understand to you. Again, most of the core concepts are shared between the two styles. You can always pick up the other style later.

- For production use:

  - Go with Options API if you are not using build tools, or plan to use Vue primarily in low-complexity scenarios, e.g. progressive enhancement.

  - Go with Composition API + Single-File Components if you plan to build full applications with Vue.

You don't have to commit to only one style during the learning phase. The rest of the documentation will provide code samples in both styles where applicable, and you can toggle between them at any time using the **API Preference switches** at the top of the left sidebar.

## Остались вопросы? {#still-got-questions}

Обратитесь к [FAQ](/about/faq).

## Выберите свой путь обучения {#pick-your-learning-path}

У разных разработчиков разные стили обучения. Не стесняйтесь выбрать тот путь обучения, который больше по душе — хотя всё равно рекомендуем изучить все материалы, если это возможно!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Самоучитель</p>
    <p class="next-steps-caption">Для тех, кто предпочитает учиться на практике.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">Руководство</p>
    <p class="next-steps-caption">В руководстве каждый аспект фреймворка разбирается подробно.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Примеры</p>
    <p class="next-steps-caption">Изучите примеры основных функций и общих задач при разработке UI.</p>
  </a>
</div>
