# Основы компонентов {#components-basics}

Компоненты позволяют нам разделить пользовательский интерфейс на независимые и многократно используемые части и думать о каждой части в отдельности. Обычно приложение организовано в виде дерева вложенных друг в друга компонентов:

![Дерево компонентов](./images/components.png)

<!-- https://www.figma.com/file/qa7WHDQRWuEZNRs7iZRZSI/components -->

Это очень похоже на то, как мы вкладываем собственные HTML-элементы, но Vue реализует свою собственную модель компонентов, которая позволяет нам инкапсулировать пользовательское содержимое и логику в каждый компонент. Vue также хорошо сочетается с родными веб-компонентами. Если вам интересно узнать о взаимосвязи между компонентами Vue и родными веб-компонентами, [читайте подробнее здесь](/guide/extras/web-components.html).

## Определение компонента {#defining-a-component}

При использовании шага сборки мы обычно определяем каждый компонент Vue в отдельном файле с расширением `.vue` - это называется [однофайловый компонент](/guide/scaling-up/sfc.html) (по англ. Single-File Component, или сокращенно SFC):

<div class="options-api">

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
  <button @click="count++">Вы нажали на меня {{ count }} раз.</button>
</template>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">Вы нажали на меня {{ count }} раз.</button>
</template>
```

</div>

Если не использовать шаг сборки, компонент Vue можно определить как обычный объект JavaScript, содержащий специфические для Vue опции:

<div class="options-api">

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      Вы нажали на меня {{ count }} раз.
    </button>`
}
```

</div>
<div class="composition-api">

```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `
    <button @click="count++">
      Вы нажали на меня {{ count }} раз.
    </button>`
  // или `template: '#my-template-element'`
}
```

</div>

Здесь шаблон вставляется в виде строки JavaScript, которую Vue скомпилирует на лету. Вы также можете использовать селектор ID, указывающий на элемент (обычно это собственные элементы `<template>`) - Vue будет использовать его содержимое в качестве источника шаблона.

В приведенном выше примере определяется один компонент и экспортируется как экспорт по умолчанию из файла `.js`, но вы можете использовать именованный экспорт для экспорта нескольких компонентов из одного файла.

## Использование компонента {#using-a-component}

:::tip Совет
Мы будем использовать синтаксис SFC для остальной части этого руководства — концепции компонентов одинаковы независимо от того, используете ли вы шаг сборки или нет. В разделе [Примеры](/examples/) показано использование компонентов в обоих сценариях.
:::

Чтобы использовать дочерний компонент, мы должны импортировать его в родительский компонент. Если мы разместили наш компонент счетчика в файле под названием `ButtonCounter.vue`, то компонент будет экспортирован в файл по умолчанию:

<div class="options-api">

```vue
<script>
import ButtonCounter from './ButtonCounter.vue'

export default {
  components: {
    ButtonCounter
  }
}
</script>

<template>
  <h1>Здесь дочерний компонент!</h1>
  <ButtonCounter />
</template>
```

Чтобы отобразить импортированный компонент в нашем шаблоне, нам нужно [зарегистрировать](/guide/components/registration.html) его с помощью опции `components`. После этого компонент будет доступен как тег, используя ключ, под которым он зарегистрирован.

</div>

<div class="composition-api">

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>Здесь дочерний компонент!</h1>
  <ButtonCounter />
</template>
```

С помощью `<script setup>`, импортированные компоненты автоматически становятся доступными для шаблона.

</div>

Также можно глобально зарегистрировать компонент, сделав его доступным для всех компонентов данного приложения без необходимости его импорта. Плюсы и минусы глобальной и локальной регистрации обсуждаются в специальном разделе [Регистрация компонентов](/guide/components/registration.html).

Компоненты можно использовать повторно столько раз, сколько вы захотите:

```vue-html
<h1>Здесь много дочерних компонентов!</h1>
<ButtonCounter />
<ButtonCounter />
<ButtonCounter />
```

<div class="options-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBCdXR0b25Db3VudGVyIGZyb20gJy4vQnV0dG9uQ291bnRlci52dWUnXG4gIFxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7XG4gICAgQnV0dG9uQ291bnRlclxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8aDE+SGVyZSBhcmUgbWFueSBjaGlsZCBjb21wb25lbnRzITwvaDE+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJCdXR0b25Db3VudGVyLnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvdW50OiAwXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImNvdW50KytcIj5cbiAgICBZb3UgY2xpY2tlZCBtZSB7eyBjb3VudCB9fSB0aW1lcy5cbiAgPC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

</div>
<div class="composition-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBCdXR0b25Db3VudGVyIGZyb20gJy4vQnV0dG9uQ291bnRlci52dWUnXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8aDE+SGVyZSBhcmUgbWFueSBjaGlsZCBjb21wb25lbnRzITwvaDE+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJCdXR0b25Db3VudGVyLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tICd2dWUnXG5cbmNvbnN0IGNvdW50ID0gcmVmKDApXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImNvdW50KytcIj5cbiAgICBZb3UgY2xpY2tlZCBtZSB7eyBjb3VudCB9fSB0aW1lcy5cbiAgPC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

</div>

Обратите внимание, что при нажатии на кнопки каждая из них ведет свой собственный `count`. Это происходит потому, что при каждом использовании компонента создается его новый **экземпляр**.

В SFC рекомендуется использовать имена тегов для дочерних компонентов в регистре `PascalCase`, чтобы отличить их от собственных элементов HTML. Хотя имена тегов HTML не чувствительны к регистру, Vue SFC - это скомпилированный формат, поэтому мы можем использовать в нем имена тегов с учетом регистра. Мы также можем использовать `/>` для закрытия тега.

Если вы создаете свои шаблоны непосредственно в DOM (например, как содержимое собственного элемента  `<template>`), то шаблон будет подчиняться собственному поведению браузера при разборе HTML. В таких случаях необходимо использовать регистр `kebab-case` и явные закрывающие теги для компонентов:

```vue-html
<!-- если этот шаблон записан в DOM -->
<button-counter></button-counter>
<button-counter></button-counter>
<button-counter></button-counter>
```

Более подробную информацию смотрите в разделе [Предостережения по разбору шаблонов DOM](#dom-template-parsing-caveats).

## Передача входных параметров {#passing-props}

Если мы создаем блог, нам, скорее всего, понадобится компонент, представляющий запись в блоге. Мы хотим, чтобы все посты в блоге имели одинаковое визуальное оформление, но разное содержание. Такой компонент не будет полезен, если вы не сможете передать ему данные. Например, заголовок и содержание конкретного поста, который мы хотим отобразить. Тут на помощь приходят входные параметры.

Входные параметры — это настраиваемые атрибуты, которые вы можете зарегистрировать в компоненте. Чтобы передать заголовок нашему компоненту записи блога, мы должны объявить его в списке входных параметров, которые принимает этот компонент, используя <span class="options-api">опцию [`props`](/api/options-state.html#props)</span><span class="composition-api">макрос [`defineProps`](/api/sfc-script-setup.html#defineprops-defineemits)</span>:

<div class="options-api">

```vue
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title']
}
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

Когда значение передается атрибуту _prop_, оно становится свойством этого экземпляра компонента. Значение этого свойства доступно в шаблоне и в контексте компонента `this`, как и любое другое свойство компонента.

</div>
<div class="composition-api">

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

`defineProps` макрос компилятора используемый только внутри `<script setup>` и не нуждается в явном импорте. Объявленные входные параметры автоматически отображаются в шаблоне. `defineProps` также возвращает объект, содержащий все входные параметры, переданные компоненту, чтобы при необходимости мы могли получить к ним доступ в JavaScript:

```js
const props = defineProps(['title'])
console.log(props.title)
```

См. также: [Типизация входных параметров комопнента](/guide/typescript/composition-api.html#typing-component-props) <sup class="vt-badge ts" />

Если вы не используете `<script setup>`, входные параметры должны быть объявлены с помощью опции `props`, и объект _props_ будет передан `setup()` в качестве первого аргумента:

```js
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

</div>

Компонент может иметь сколько угодно входных параметров, и по умолчанию любому входному параметру может быть передано любое значение.

После регистрации входного параметра вы можете передавать ему данные в качестве пользовательского атрибута, как показано ниже:

```vue-html
<BlogPost title="Как изучить Vue" />
<BlogPost title="Ведение блога с помощью Vue" />
<BlogPost title="Почему Vue так интересен" />
```

Однако в обычном приложении вы, скорее всего, будете иметь массив постов в родительском компоненте:

<div class="options-api">

```js
export default {
  // ...
  data() {
    return {
      posts: [
        { id: 1, title: 'Как изучить Vue' },
        { id: 2, title: 'Ведение блога с помощью Vue' },
        { id: 3, title: 'Почему Vue так интересен' }
      ]
    }
  }
}
```

</div>
<div class="composition-api">

```js
const posts = ref([
  { id: 1, title: 'Как изучить Vue' },
  { id: 2, title: 'Ведение блога с помощью Vue' },
  { id: 3, title: 'Почему Vue так интересен' }
])
```

</div>

Затем нужно отрисовать компонент для каждого из них, используя `v-for`:

```vue-html
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
 />
```

<div class="options-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBCbG9nUG9zdFxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3N0czogW1xuICAgICAgICB7IGlkOiAxLCB0aXRsZTogJ015IGpvdXJuZXkgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDIsIHRpdGxlOiAnQmxvZ2dpbmcgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDMsIHRpdGxlOiAnV2h5IFZ1ZSBpcyBzbyBmdW4nIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxCbG9nUG9zdFxuICBcdHYtZm9yPVwicG9zdCBpbiBwb3N0c1wiXG5cdCAgOmtleT1cInBvc3QuaWRcIlxuICBcdDp0aXRsZT1cInBvc3QudGl0bGVcIlxuXHQ+PC9CbG9nUG9zdD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJsb2dQb3N0LnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiBbJ3RpdGxlJ11cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxoND57eyB0aXRsZSB9fTwvaDQ+XG48L3RlbXBsYXRlPiJ9)

</div>
<div class="composition-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5jb25zdCBwb3N0cyA9IHJlZihbXG4gIHsgaWQ6IDEsIHRpdGxlOiAnTXkgam91cm5leSB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMiwgdGl0bGU6ICdCbG9nZ2luZyB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMywgdGl0bGU6ICdXaHkgVnVlIGlzIHNvIGZ1bicgfVxuXSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxCbG9nUG9zdFxuICBcdHYtZm9yPVwicG9zdCBpbiBwb3N0c1wiXG5cdCAgOmtleT1cInBvc3QuaWRcIlxuICBcdDp0aXRsZT1cInBvc3QudGl0bGVcIlxuXHQ+PC9CbG9nUG9zdD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJsb2dQb3N0LnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5kZWZpbmVQcm9wcyhbJ3RpdGxlJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aDQ+e3sgdGl0bGUgfX08L2g0PlxuPC90ZW1wbGF0ZT4ifQ==)

</div>

Обратите внимание, как `v-bind` используется для передачи динамических значений входному параметру. Это особенно полезно, когда вы заранее не знаете, какой именно контент вы собираетесь отобразить.

Это все, что вам нужно знать о входных параметрах на данный момент, но как только вы закончите читать эту страницу и почувствуете себя комфортно с ее содержанием, мы рекомендуем вернуться позже, чтобы прочитать полное руководство по [входным параметрам](/guide/components/props.html).

## Прослушивание событий  {#listening-to-events}

По мере разработки нашего компонента `<BlogPost>`, некоторые функции могут потребовать обратной связи с родительским компонентом. Например, мы можем решить включить функцию доступности для увеличения текста записей блога, оставляя при этом размер остальной части страницы по умолчанию.

В родителе мы можем включить эту функцию, добавив свойство `postFontSize`:

<div class="options-api">

```js{6}
data() {
  return {
    posts: [
      /* ... */
    ],
    postFontSize: 1
  }
}
```

</div>
<div class="composition-api">

```js{5}
const posts = ref([
  /* ... */
])

const postFontSize = ref(1)
```

</div>

Которая может использоваться в шаблоне для управления размером шрифта всех записей блога:

```vue-html{1,7}
<div :style="{ fontSize: postFontSize + 'em' }">
  <BlogPost
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
   />
</div>
```

Теперь давайте добавим кнопку в шаблон компонента `<BlogPost>`:

```vue{5}
<!-- BlogPost.vue, не добавлен <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button>Увеличить размер текста</button>
  </div>
</template>
```

При нажатии на кнопку нужно сообщить родительскому компоненту, чтобы увеличил размер текста для всех записей блога. Для решения этой проблемы, экземпляры компонента предоставляют собственную систему событий. Родительский компонент может прослушивать любые события на экземпляре дочернего компонента с помощью `v-on` или `@`, аналогично отслеживанию нативных событий DOM:

```vue-html{3}
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
 />
```

Тогда дочерний компонент может сгенерировать событие с помощью встроенного [метода `$emit`](/api/component-instance.html#emit), передавая ему имя события:

```vue{5}
<!-- BlogPost.vue, не добавлен <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Увеличить размер текста</button>
  </div>
</template>
```

Благодаря прослушиванию события `@enlarge-text="postFontSize += 0.1"`, родительский компонент отследит событие и обновится со значением `postFontSize`.

<div class="options-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBCbG9nUG9zdFxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3N0czogW1xuICAgICAgICB7IGlkOiAxLCB0aXRsZTogJ015IGpvdXJuZXkgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDIsIHRpdGxlOiAnQmxvZ2dpbmcgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDMsIHRpdGxlOiAnV2h5IFZ1ZSBpcyBzbyBmdW4nIH1cbiAgICAgIF0sXG4gICAgICBwb3N0Rm9udFNpemU6IDFcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOnN0eWxlPVwieyBmb250U2l6ZTogcG9zdEZvbnRTaXplICsgJ2VtJyB9XCI+XG4gICAgPEJsb2dQb3N0XG4gICAgICB2LWZvcj1cInBvc3QgaW4gcG9zdHNcIlxuICAgICAgOmtleT1cInBvc3QuaWRcIlxuICAgICAgOnRpdGxlPVwicG9zdC50aXRsZVwiXG4gICAgICBAZW5sYXJnZS10ZXh0PVwicG9zdEZvbnRTaXplICs9IDAuMVwiXG4gICAgPjwvQmxvZ1Bvc3Q+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQmxvZ1Bvc3QudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IFsndGl0bGUnXSxcbiAgZW1pdHM6IFsnZW5sYXJnZS10ZXh0J11cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJibG9nLXBvc3RcIj5cblx0ICA8aDQ+e3sgdGl0bGUgfX08L2g0PlxuXHQgIDxidXR0b24gQGNsaWNrPVwiJGVtaXQoJ2VubGFyZ2UtdGV4dCcpXCI+RW5sYXJnZSB0ZXh0PC9idXR0b24+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4ifQ==)

</div>
<div class="composition-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5jb25zdCBwb3N0cyA9IHJlZihbXG4gIHsgaWQ6IDEsIHRpdGxlOiAnTXkgam91cm5leSB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMiwgdGl0bGU6ICdCbG9nZ2luZyB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMywgdGl0bGU6ICdXaHkgVnVlIGlzIHNvIGZ1bicgfVxuXSlcblxuY29uc3QgcG9zdEZvbnRTaXplID0gcmVmKDEpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8ZGl2IDpzdHlsZT1cInsgZm9udFNpemU6IHBvc3RGb250U2l6ZSArICdlbScgfVwiPlxuICAgIDxCbG9nUG9zdFxuICAgICAgdi1mb3I9XCJwb3N0IGluIHBvc3RzXCJcbiAgICAgIDprZXk9XCJwb3N0LmlkXCJcbiAgICAgIDp0aXRsZT1cInBvc3QudGl0bGVcIlxuICAgICAgQGVubGFyZ2UtdGV4dD1cInBvc3RGb250U2l6ZSArPSAwLjFcIlxuICAgID48L0Jsb2dQb3N0PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJsb2dQb3N0LnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5kZWZpbmVQcm9wcyhbJ3RpdGxlJ10pXG5kZWZpbmVFbWl0cyhbJ2VubGFyZ2UtdGV4dCddKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImJsb2ctcG9zdFwiPlxuICAgIDxoND57eyB0aXRsZSB9fTwvaDQ+XG4gICAgPGJ1dHRvbiBAY2xpY2s9XCIkZW1pdCgnZW5sYXJnZS10ZXh0JylcIj5FbmxhcmdlIHRleHQ8L2J1dHRvbj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPiJ9)

</div>

Все генерируемые компонентом события можно перечислить в <span class="options-api">[`emits`](/api/options-state.html#emits)</span><span class="composition-api">[`defineEmits`](/api/sfc-script-setup.html#defineprops-defineemits)</span>:

<div class="options-api">

```vue{5}
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title'],
  emits: ['enlarge-text']
}
</script>
```

</div>
<div class="composition-api">

```vue{4}
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
defineEmits(['enlarge-text'])
</script>
```

</div>

Это позволит проверять все события, которые генерирует компонент, и опционально [валидировать их](/guide/components/events.html#events-validation). Это также позволяет Vue избежать неявного применения их в качестве нативных слушателей к корневому элементу дочернего компонента.

<div class="composition-api">

Как и `defineProps`, `defineEmits` используется только в `<script setup>` и не требует импорта. defineEmits возвращает функцию `emit`, которая эквивалентна методу `$emit`. Еe можно использовать для генерации событий в разделе компонента `<script setup>`, где `$emit` недоступен напрямую:

```vue
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>
```

См. также: [Типизация событий, генерируемых компонентом](/guide/typescript/composition-api.html#typing-component-emits) <sup class="vt-badge ts" />

Если вы не используете `<script setup>`, вы можете объявить эмитируемые события с помощью опции `emits`. Вы можете получить доступ к функции `emit` как к свойству контекста настройки (передается в `setup()` в качестве второго аргумента):

```js
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
}
```

</div>

Пока это все, что вам нужно знать о событиях пользовательских компонентов, но как только вы закончите читать эту страницу и почувствуете себя комфортно с ее содержанием, мы рекомендуем вернуться позже, чтобы прочитать полное руководство по [пользовательским событиям](/guide/components/events).

## Распределение контента слотами {#content-distribution-with-slots}

Как и в случае с обычными HTML-элементами, часто бывает полезным иметь возможность передавать компоненту содержимое, например таким образом:

```vue-html
<AlertBox>
  Произошло что-то плохое.
</AlertBox>
```

Чтобы в итоге всё выглядело примерно так:

:::danger Эта ошибка для демонстрационных целей
Произошло что-то плохое.
:::

Такого можно добиться при помощи пользовательского элемента `<slot>` у Vue:

```vue{4}
<template>
  <div class="alert-box">
    <strong>Эта ошибка для демонстрационных целей</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

Как можно увидеть выше, `<slot>` будет использоваться в качестве места, куда потребуется подставлять контент — и это всё. Готово!

<div class="options-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBBbGVydEJveCBmcm9tICcuL0FsZXJ0Qm94LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgQWxlcnRCb3ggfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PEFsZXJ0Qm94PlxuICBcdFNvbWV0aGluZyBiYWQgaGFwcGVuZWQuXG5cdDwvQWxlcnRCb3g+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJBbGVydEJveC52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJhbGVydC1ib3hcIj5cbiAgICA8c3Ryb25nPkVycm9yITwvc3Ryb25nPlxuICAgIDxici8+XG4gICAgPHNsb3QgLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgc2NvcGVkPlxuLmFsZXJ0LWJveCB7XG4gIGNvbG9yOiAjNjY2O1xuICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogMjBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmODtcbn1cbiAgXG5zdHJvbmcge1xuXHRjb2xvcjogcmVkOyAgICBcbn1cbjwvc3R5bGU+In0=)

</div>
<div class="composition-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBBbGVydEJveCBmcm9tICcuL0FsZXJ0Qm94LnZ1ZSdcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxBbGVydEJveD5cbiAgXHRTb21ldGhpbmcgYmFkIGhhcHBlbmVkLlxuXHQ8L0FsZXJ0Qm94PlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQWxlcnRCb3gudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiYWxlcnQtYm94XCI+XG4gICAgPHN0cm9uZz5FcnJvciE8L3N0cm9uZz5cbiAgICA8YnIvPlxuICAgIDxzbG90IC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZD5cbi5hbGVydC1ib3gge1xuICBjb2xvcjogIzY2NjtcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY4Zjg7XG59XG4gIFxuc3Ryb25nIHtcblx0Y29sb3I6IHJlZDsgICAgXG59XG48L3N0eWxlPiJ9)

</div>

Для начала это всё, что нужно знать о слотах. Но когда закончите изучение этой страницы и разберётесь со всей информацией представленной здесь — рекомендуем вернуться и прочитать полное руководство по [слотам](/guide/components/slots).

## Динамические компоненты {#dynamic-components}

Иногда бывает полезным динамически переключаться между компонентами, как например в интерфейсе с вкладками:

<div class="options-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBIb21lIGZyb20gJy4vSG9tZS52dWUnXG5pbXBvcnQgUG9zdHMgZnJvbSAnLi9Qb3N0cy52dWUnXG5pbXBvcnQgQXJjaGl2ZSBmcm9tICcuL0FyY2hpdmUudnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIEhvbWUsXG4gICAgUG9zdHMsXG4gICAgQXJjaGl2ZVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50VGFiOiAnSG9tZScsXG4gICAgICB0YWJzOiBbJ0hvbWUnLCAnUG9zdHMnLCAnQXJjaGl2ZSddXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiZGVtb1wiPlxuICAgIDxidXR0b25cbiAgICAgICB2LWZvcj1cInRhYiBpbiB0YWJzXCJcbiAgICAgICA6a2V5PVwidGFiXCJcbiAgICAgICA6Y2xhc3M9XCJbJ3RhYi1idXR0b24nLCB7IGFjdGl2ZTogY3VycmVudFRhYiA9PT0gdGFiIH1dXCJcbiAgICAgICBAY2xpY2s9XCJjdXJyZW50VGFiID0gdGFiXCJcbiAgICAgPlxuICAgICAge3sgdGFiIH19XG4gICAgPC9idXR0b24+XG5cdCAgPGNvbXBvbmVudCA6aXM9XCJjdXJyZW50VGFiXCIgY2xhc3M9XCJ0YWJcIj48L2NvbXBvbmVudD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uZGVtbyB7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIHBhZGRpbmc6IDIwcHggMzBweDtcbiAgbWFyZ2luLXRvcDogMWVtO1xuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgb3ZlcmZsb3cteDogYXV0bztcbn1cblxuLnRhYi1idXR0b24ge1xuICBwYWRkaW5nOiA2cHggMTBweDtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogM3B4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogM3B4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJhY2tncm91bmQ6ICNmMGYwZjA7XG4gIG1hcmdpbi1ib3R0b206IC0xcHg7XG4gIG1hcmdpbi1yaWdodDogLTFweDtcbn1cbi50YWItYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2UwZTBlMDtcbn1cbi50YWItYnV0dG9uLmFjdGl2ZSB7XG4gIGJhY2tncm91bmQ6ICNlMGUwZTA7XG59XG4udGFiIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgcGFkZGluZzogMTBweDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkhvbWUudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwidGFiXCI+XG4gICAgSG9tZSBjb21wb25lbnRcbiAgPC9kaXY+XG48L3RlbXBsYXRlPiIsIlBvc3RzLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInRhYlwiPlxuICAgIFBvc3RzIGNvbXBvbmVudFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiQXJjaGl2ZS52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJ0YWJcIj5cbiAgICBBcmNoaXZlIGNvbXBvbmVudFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+In0=)

</div>
<div class="composition-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBIb21lIGZyb20gJy4vSG9tZS52dWUnXG5pbXBvcnQgUG9zdHMgZnJvbSAnLi9Qb3N0cy52dWUnXG5pbXBvcnQgQXJjaGl2ZSBmcm9tICcuL0FyY2hpdmUudnVlJ1xuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJ1xuIFxuY29uc3QgY3VycmVudFRhYiA9IHJlZignSG9tZScpXG5cbmNvbnN0IHRhYnMgPSB7XG4gIEhvbWUsXG4gIFBvc3RzLFxuICBBcmNoaXZlXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiZGVtb1wiPlxuICAgIDxidXR0b25cbiAgICAgICB2LWZvcj1cIihfLCB0YWIpIGluIHRhYnNcIlxuICAgICAgIDprZXk9XCJ0YWJcIlxuICAgICAgIDpjbGFzcz1cIlsndGFiLWJ1dHRvbicsIHsgYWN0aXZlOiBjdXJyZW50VGFiID09PSB0YWIgfV1cIlxuICAgICAgIEBjbGljaz1cImN1cnJlbnRUYWIgPSB0YWJcIlxuICAgICA+XG4gICAgICB7eyB0YWIgfX1cbiAgICA8L2J1dHRvbj5cblx0ICA8Y29tcG9uZW50IDppcz1cInRhYnNbY3VycmVudFRhYl1cIiBjbGFzcz1cInRhYlwiPjwvY29tcG9uZW50PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbi5kZW1vIHtcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgcGFkZGluZzogMjBweCAzMHB4O1xuICBtYXJnaW4tdG9wOiAxZW07XG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBvdmVyZmxvdy14OiBhdXRvO1xufVxuXG4udGFiLWJ1dHRvbiB7XG4gIHBhZGRpbmc6IDZweCAxMHB4O1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzcHg7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYmFja2dyb3VuZDogI2YwZjBmMDtcbiAgbWFyZ2luLWJvdHRvbTogLTFweDtcbiAgbWFyZ2luLXJpZ2h0OiAtMXB4O1xufVxuLnRhYi1idXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZTBlMGUwO1xufVxuLnRhYi1idXR0b24uYWN0aXZlIHtcbiAgYmFja2dyb3VuZDogI2UwZTBlMDtcbn1cbi50YWIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBwYWRkaW5nOiAxMHB4O1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiSG9tZS52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJ0YWJcIj5cbiAgICBIb21lIGNvbXBvbmVudFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiUG9zdHMudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwidGFiXCI+XG4gICAgUG9zdHMgY29tcG9uZW50XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJBcmNoaXZlLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInRhYlwiPlxuICAgIEFyY2hpdmUgY29tcG9uZW50XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4ifQ==)

</div>

Это возможно сделать с помощью элемента `<component>` со специальным атрибутом `is`:

<div class="options-api">

```vue-html
<!-- Компонент будет меняться при изменении currentTab -->
<component :is="currentTab"></component>
```

</div>
<div class="composition-api">

```vue-html
<!-- Компонент будет меняться при изменении currentTab -->
<component :is="tabs[currentTab]"></component>
```

</div>

В примере выше значением `:is` может быть:

- имя зарегистрированного компонента, или
- объект с настройками компонента

Можно также использовать атрибут `is` и для создания обычных HTML-элементов.

При переключении между несколькими компонентами с помощью `<component :is="...">`, компонент будет размонтирован при отключении от него. Мы можем заставить неактивные компоненты оставаться "живыми" с помощью встроенного [компонента `<KeepAlive>`](/guide/built-ins/keep-alive.html).

## Особенности парсинга DOM-шаблона {#dom-template-parsing-caveats}

Если пишете шаблоны Vue непосредственно в DOM, то Vue придётся получать строковый шаблон из DOM. Это приводит к некоторым особенностям, связанным с собственным поведением браузеров при парсинге HTML.

:::tip Совет
Следует отметить, что ограничения, обсуждаемые ниже, применимы только в том случае, если пишете шаблоны непосредственно в DOM. Таких ограничений не будет при использовании строковых шаблонов из следующих источников:

- Однофайловые компоненты
- Строковые шаблоны (например, `template: '...'`)
- `<script type="text/x-template">`
:::

### Отсутствие чувствительности к регистру {#case-insensitivity}

Имена атрибутов HTML не чувствительны к регистру, поэтому браузеры будут интерпретировать любые заглавные символы как строчные. А значит, при использовании DOM-шаблонов, необходимо указывать имена входных параметров в camelCase и обработчики событий в kebab-case (разделённые дефисом) эквивалентах:

```js
// camelCase в JavaScript
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
}
```

```vue-html
<!-- kebab-case в HTML -->
<blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
```

### Самозакрывающиеся теги {#self-closing-tags}

В предыдущих примерах кода мы использовали самозакрывающиеся теги для компонентов:

```vue-html
<MyComponent />
```

Это происходит потому, что анализатор шаблонов Vue воспринимает `/>` как признак окончания любого тега, независимо от его типа.

Однако в шаблонах DOM мы всегда должны включать явные закрывающие теги:

```vue-html
<my-component></my-component>
```

Это связано с тем, что спецификация HTML позволяет опускать закрывающие теги только для [нескольких определенных элементов](https://html.spec.whatwg.org/multipage/syntax.html#void-elements), наиболее распространенными из которых являются `<input>` и `<img>`. Для всех остальных элементов, если вы опустите закрывающий тег, парсер HTML будет считать, что вы не завершили открывающий тег. Например, следующий фрагмент:

```vue-html
<my-component /> <!-- мы намерены закрыть тег здесь... -->
<span>hello</span>
```

будет распарсено как:

```vue-html
<my-component>
  <span>hello</span>
</my-component> <!-- но браузер закроет его здесь. -->
```

### Ограничение по расположению элементов {#element-placement-restrictions}

У некоторых HTML-элементов, таких как `<ul>`, `<ol>`, `<table>` и `<select>` есть ограничения на то, какие элементы могут находиться внутри них, кроме того некоторые элементы `<li>`, `<tr>`, и `<option>`  могут быть только внутри определённых элементов.

Это может привести к проблемам при использовании компонентов с элементами у которых есть такие ограничения. Например:

```vue-html
<table>
  <blog-post-row></blog-post-row>
</table>
```

При парсинге пользовательский компонент `<blog-post-row>` будет поднят выше, поскольку считается недопустимым содержимым, приводя к ошибкам при отрисовке. Для решения этой проблемы можно использовать [специальный атрибут `is`](/api/built-in-special-attributes.html#is):

```vue-html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

:::tip Совет
При использовании на нативных HTML-элементах значение `is` должно начинаться с префикса `vue:`, чтобы интерпретироваться как компонент Vue. Это нужно чтобы избежать путаницы с нативными [пользовательскими встроенными элементами](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example).
:::

Это все, что вам нужно знать о предостережениях по разбору шаблонов DOM на данный момент - и, фактически, конец _Основ_ Vue. Поздравляем! Вам предстоит еще многому научиться, но сначала мы рекомендуем сделать перерыв, чтобы попрактиковаться с Vue самостоятельно - построить что-нибудь интересное или ознакомиться с [примерами](/examples/), если вы еще этого не сделали.

Когда закончите изучение этой страницы и разберётесь со всей информацией представленной здесь, рекомендуем перейти к руководству, чтобы узнать больше о компонентах в деталях.
