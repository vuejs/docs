---
footer: false
---

# Вступ

:::info Ви переглядаєте документацію для Vue 3!

- Документацію по Vue 2 було переміщено за адресою [v2.vuejs.org.ua](https://v2.vuejs.org.ua/).
- Оновлюєтесь з Vue 2? Перегляньте [Гід по міграції](https://v3-migration.vuejs.org/).
  :::

<style src="/@theme/styles/vue-mastery.css"></style>
<div class="vue-mastery-link">
  <a href="https://www.vuemastery.com/courses-path/beginner" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description">Вивчайте Vue з відео курсами на <span>VueMastery.com</span></p>
    <div class="logo-wrapper">
        <img alt="Vue Mastery Logo" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>

## Що таке Vue?

Vue (вимовляється як (англ.) /vjuː/, (укр) /в'ю/) — це фреймворк, який працює на JavaScript, створений для розробки користувацьких інтерфейсів. Він працює на базі звичайного HTML, CSS та JavaScript, з можливістями декларативно програмувати користувацькі інтерфейси будь-якої складності на основі компонентів.

Найпростіший приклад:

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
    Count is: {{ count }}
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
    Count is: {{ count }}
  </button>
</div>

Наведений вище приклад демонструє дві основні функції Vue:

- **Декларативне відображення**: Vue розширює стандартний HTML шаблоним синтаксисом, який дозволяє нам декларативно задавати структуру HTML на основі стану описаного у JavaScript.

- **Реактивність**: Vue автоматично відстежує зміни стану описаного у JavaScript і оновлює DOM, коли відбуваються зміни з максимальною ефективністю.

Можливо, у вас вже є запитання – не хвилюйтеся. Ми розглянемо кожну деталь в наступних розділах документації. Наразі, будь ласка, прочитайте розділ повністю, щоб ви могли мати високорівневе розуміння того, що пропонує Vue.

:::tip Передумови
Решта документації передбачає базове знання HTML, CSS і JavaScript. Якщо ви зовсім новачок у розробці користувацьких інтерфейсів, можливо, це не найкраща ідея одразу переходити безпосередньо до вивчення фреймворку, можливо краще спочатку осягнути основи, а потім повернутися! Ви можете перевірити свій рівень знань JavaScript використовуючи [посібник MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript). Попередній досвід роботи з іншими фреймворками допомагає у вивчені Vue, але не обов’язковий.
:::

## Прогресивний фреймворк

Vue — це фреймворк та екосистема, яка охоплює більшість функцій, необхідних для розробки інтерфейсу. Але веб додатки надзвичайно різноманітні – речі, які ми створюємо в рамках веб додатків, можуть кардинально відрізнятися за формою та масштабом. Зважаючи на це, Vue розроблено таким чином, щоб бути гнучким і адаптувним. Залежно від вашого випадку та задач Vue можна використовувати різними способами:

- Розширення статичного HTML
- Вбудовування як веб-компоненту на будь-яку сторінку
- Створення односторінкового додатку (SPA)
- Fullstack / Додаток з рендерингом на стороні серверу (SSR)
- Jamstack / Генерація статичного додатку (SSG)
- Створення десктопних, мобільний, WebGLдодатків і навіть додатків для терміналу

Якщо ви вважаєте ці концепції важкими для розуміння, не хвилюйтеся! Гід і посібник вимагають лише базових знань HTML і JavaScript, і ви повинні бути в змозі зрозуміти їх, не будучи експертом з HTML чи JavaScript.

Якщо ви досвідчений розробник, зацікавлений у тому, як найкраще інтегрувати Vue у свій стек, або вам цікаво, що означають ці терміни, ми докладніше обговоримо їх у [Способах використання Vue](/guide/extras/ways-of-using-vue).

Незважаючи на гнучкість фреймворку, основні знання про те, як працює Vue, можуть бути використані спільно для всіх цих варіантів використання Vue. Навіть якщо ви зараз лише новачок, знання, отримані на цьому шляху, залишаться корисними, коли ви зростатимете, щоб вирішувати амбітніші цілі в майбутньому. Якщо ви досвідчений розробник, ви можете обрати оптимальний спосіб використання Vue на основі проблем, які ви намагаєтеся вирішити, зберігаючи ту саму продуктивність. Ось чому ми називаємо Vue «Прогресивним фреймворком»: це фреймворк, який може рости разом з вами та адаптуватися до ваших потреб.

## Однофайлові компоненти

In most build-tool-enabled Vue projects, we author Vue components using an HTML-like file format called **Single-File Component** (also known as `*.vue` files, abbreviated as **SFC**). A Vue SFC, as the name suggests, encapsulates the component's logic (JavaScript), template (HTML), and styles (CSS) in a single file. Here's the previous example, written in SFC format:

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
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

SFC is a defining feature of Vue, and is the recommended way to author Vue components **if** your use case warrants a build setup. You can learn more about the [how and why of SFC](/guide/scaling-up/sfc) in its dedicated section - but for now, just know that Vue will handle all the build tools setup for you.

## API Styles

Vue components can be authored in two different API styles: **Options API** and **Composition API**.

### Options API

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

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gcmVhY3RpdmUgc3RhdGVcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG5cbiAgLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbiAgbWV0aG9kczoge1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgIHRoaXMuY291bnQrK1xuICAgIH1cbiAgfSxcblxuICAvLyBsaWZlY3ljbGUgaG9va3NcbiAgbW91bnRlZCgpIHtcbiAgICBjb25zb2xlLmxvZyhgVGhlIGluaXRpYWwgY291bnQgaXMgJHt0aGlzLmNvdW50fS5gKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPkNvdW50IGlzOiB7eyBjb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4ifQ==)

### Composition API

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

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG4vLyByZWFjdGl2ZSBzdGF0ZVxuY29uc3QgY291bnQgPSByZWYoMClcblxuLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbmZ1bmN0aW9uIGluY3JlbWVudCgpIHtcbiAgY291bnQudmFsdWUrK1xufVxuXG4vLyBsaWZlY3ljbGUgaG9va3Ncbm9uTW91bnRlZCgoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBUaGUgaW5pdGlhbCBjb3VudCBpcyAke2NvdW50LnZhbHVlfS5gKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b24gQGNsaWNrPVwiaW5jcmVtZW50XCI+Q291bnQgaXM6IHt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

### Which to Choose?

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

## Still Got Questions?

Check out our [FAQ](/about/faq).

## Pick Your Learning Path

Different developers have different learning styles. Feel free to pick a learning path that suits your preference - although we do recommend going over all of the content, if possible!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Try the Tutorial</p>
    <p class="next-steps-caption">For those who prefer learning things hands-on.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">Read the Guide</p>
    <p class="next-steps-caption">The guide walks you through every aspect of the framework in full detail.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Check out the Examples</p>
    <p class="next-steps-caption">Explore examples of core features and common UI tasks.</p>
  </a>
</div>
