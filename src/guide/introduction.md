---
footer: false
---

# Введение {#introduction}

:::info Это документация для Vue 3!
- Поддержка Vue 2 закончится 31 декабря 2023. Подробнее о версии с расширенной поддержкой — [Vue 2 LTS](https://v2.vuejs.org/lts/).
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

При использовании Options API логика компонентов определяется с помощью объекта опций, таких как `data`, `methods` и `mounted`. Свойства, определённые в опциях, доступны через `this` внутри функций и указывают на экземпляр компонента:

```vue
<script>
export default {
  // Свойства возвращаемые из data() становятся реактивным
  // состоянием компонента и к ним можно обращаться через `this`.
  data() {
    return {
      count: 0
    }
  },

  // Методы это функции, которые мутируют состояние и вызывают обновления.
  // Они могут быть привязаны в качестве обработчиков событий в шаблонах.
  methods: {
    increment() {
      this.count++
    }
  },

  // Хуки жизненного цикла вызываются на разных этапах
  // жизненного цикла компонента.
  // Эта функция будет вызвана после монтирования компонента.
  mounted() {
    console.log(`Стартовое значение счётчика — ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Счётчик: {{ count }}</button>
</template>
```

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gcmVhY3RpdmUgc3RhdGVcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG5cbiAgLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbiAgbWV0aG9kczoge1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgIHRoaXMuY291bnQrK1xuICAgIH1cbiAgfSxcblxuICAvLyBsaWZlY3ljbGUgaG9va3NcbiAgbW91bnRlZCgpIHtcbiAgICBjb25zb2xlLmxvZyhgVGhlIGluaXRpYWwgY291bnQgaXMgJHt0aGlzLmNvdW50fS5gKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPkNvdW50IGlzOiB7eyBjb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4ifQ==)

### Composition API {#composition-api}

При использовании Composition API логика компонентов определяется с использованием API импортируемых функций. В однофайловых компонентах, Composition API обычно используется с синтаксисом [`<script setup>`](/api/sfc-script-setup). Атрибут `setup` — подсказка компилятору для выполнения специальных преобразований на этапе компиляции, что позволяет использовать Composition API с меньшим количеством кода. Например, импорты и переменные / функции, объявленные на верхнем уровне в `<script setup>` можно использовать напрямую в шаблоне.

Вот тот же компонент, с точно таким же шаблоном, но написанный с использованием Composition API и `<script setup>`:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// реактивное состояние
const count = ref(0)

// функции которые мутируют состояние и вызывают обновления
function increment() {
  count.value++
}

// хуки жизненного цикла
onMounted(() => {
  console.log(`Стартовое значение счётчика — ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Счётчик: {{ count }}</button>
</template>
```

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG4vLyByZWFjdGl2ZSBzdGF0ZVxuY29uc3QgY291bnQgPSByZWYoMClcblxuLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbmZ1bmN0aW9uIGluY3JlbWVudCgpIHtcbiAgY291bnQudmFsdWUrK1xufVxuXG4vLyBsaWZlY3ljbGUgaG9va3Ncbm9uTW91bnRlZCgoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBUaGUgaW5pdGlhbCBjb3VudCBpcyAke2NvdW50LnZhbHVlfS5gKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b24gQGNsaWNrPVwiaW5jcmVtZW50XCI+Q291bnQgaXM6IHt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

### Какой стиль выбрать? {#which-to-choose}

Оба стиля API способны полностью покрыть общие случаи использования. Это разные интерфейсы, работающие на основе одной и той же базовой системы. Фактически, Options API реализован на основе Composition API! Фундаментальные концепции и знания о Vue являются общими для двух стилей.

Options API сосредоточен вокруг концепции «экземпляра компонента» (`this`, как показано в примере), что обычно лучше согласуется с моделью мышления, основанной на классах, для пользователей с опытом работы с языками ООП. Он также более удобен для новичков, поскольку абстрагируется от деталей реактивности и обеспечивает организацию кода с помощью групп опций.

Composition API сосредоточен на объявлении переменных реактивного состояния непосредственно в области видимости функции, а также на композиции состояния из нескольких функций для решения сложных задач. Это более свободная форма, но для эффективного использования требующая понимания того, как работает реактивность во Vue. В свою очередь, его гибкость позволяет использовать более мощные шаблоны для организации и переиспользования логики.

Подробнее о сравнении двух стилей и потенциальных преимуществах Composition API можно узнать в разделе [Composition API FAQ](/guide/extras/composition-api-faq).

Для новичков во Vue, вот общая рекомендация:

- В целях обучения выбирайте тот стиль, который кажется более понятным. Опять же, большинство основных концепций являются общими для этих двух стилей. Всегда можно освоить другой стиль позднее.

- Для использования в production:

  - Выбирайте Options API если не используются инструменты сборки или при планировании использовать Vue в основном в сценариях с низкой сложностью, например для прогрессивного улучшения.

  - Выбирайте Composition API + однофайловые компоненты, если планируете создавать полноценные приложения с помощью Vue.

На этапе обучения не обязательно придерживаться только одного стиля. В остальной части документации приводятся примеры кода в обоих стилях, где это возможно, и можно в любое время переключаться между ними с помощью переключателя **Предпочитаемый стиль API** в верхней части левой боковой панели.

## Остались вопросы? {#still-got-questions}

Обратитесь к [FAQ](/about/faq).

## Выберите свой путь обучения {#pick-your-learning-path}

У разных разработчиков разные стили обучения. Не стесняйтесь выбрать тот путь обучения, который больше по душе — хотя всё равно рекомендуем изучить все материалы, если это возможно!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">Руководство</p>
    <p class="next-steps-caption">В руководстве каждый аспект фреймворка разбирается подробно.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Самоучитель</p>
    <p class="next-steps-caption">Для тех, кто предпочитает учиться на практике.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Примеры</p>
    <p class="next-steps-caption">Изучите примеры основных функций и общих задач при разработке UI.</p>
  </a>
</div>
