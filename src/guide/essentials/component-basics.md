# Основи компонентів {#components-basics}

Компоненти дозволяють нам розділити інтерфейс користувача на незалежні частини, які можна багаторазово використовувати, і думати про кожну частину окремо. Зазвичай програму організовують у дерево вкладених компонентів:

![Component Tree](./images/components.png)

<!-- https://www.figma.com/file/qa7WHDQRWuEZNRs7iZRZSI/components -->

Це дуже схоже на те, як ми вкладаємо рідні HTML-елементи, але Vue реалізує власну модель компонентів, яка дозволяє нам інкапсулювати власний вміст і логіку в кожному компоненті. Vue також чудово працює з рідними вебкомпонентами. Якщо вас цікавить зв'язок між компонентами Vue і рідними вебкомпонентами, [читайте деталі тут](/guide/extras/web-components).

## Оголошення компонента {#defining-a-component}

Коли використовується етап збірки, як правило, ми визначаємо кожен компонент Vue у спеціальному файлі за допомогою розширення `.vue`, відомого як [однофайловий компонент](/guide/scaling-up/sfc) (скорочено SFC, скорочено від (англ.) Single File Component):

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
  <button @click="count++">Ви натиснули на мене {{ count }} разів.</button>
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
  <button @click="count++">Ви натиснули на мене {{ count }} разів.</button>
</template>
```

</div>

Якщо не використовується етап збірки, компонент Vue можна визначити як звичайний об'єкт JavaScript, що містить параметри Vue:

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
      Ви натиснули на мене {{ count }} разів.
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
      Ви натиснули на мене {{ count }} разів.
    </button>`
  // Також можна використати шаблон у DOM:
  // template: '#my-template-element'
}
```

</div>

Тут шаблон вбудовано як рядок JavaScript, який Vue збиратиметься на льоту. Ви також можете використовувати ID селектор, який вказує на елемент (зазвичай рідні елементи `<template>`) — Vue використовуватиме його вміст як джерело шаблону.

Наведений вище приклад визначає один компонент і експортує його як стандартний експорт файлу `.js`, але ви можете використовувати іменовані експорти для експорту кількох компонентів з одного файлу.

## Використання компонента {#using-a-component}

:::tip
Ми використовуватимемо синтаксис SFC для решти цього посібника - концепції навколо компонентів однакові, незалежно від того, використовуєте ви крок збірки чи ні. У розділі [Приклади](/examples/) показано використання компонентів в обох сценаріях.
:::

Щоб використовувати дочірній компонент, нам потрібно імпортувати його в батьківський компонент. Якщо припустити, що ми розмістили наш компонент лічильника у файлі під назвою `ButtonCounter.vue`, компонент буде виділено в стандартний експорт файлу:

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
  <h1>Ось дочірній компонент!</h1>
  <ButtonCounter />
</template>
```

Щоб показати імпортований компонент у нашому шаблоні, нам потрібно [зареєструвати](/guide/components/registration) його за допомогою параметра `components`. Після цього компонент буде доступний як тег із використанням ключа, під яким він зареєстрований.

</div>

<div class="composition-api">

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>Ось дочірній компонент!</h1>
  <ButtonCounter />
</template>
```

За допомогою `<script setup>` імпортовані компоненти автоматично стають доступними для шаблону.

</div>

Також можна глобально зареєструвати компонент, зробивши його доступним для всіх компонентів даного додатку без необхідності його імпорту. Плюси та мінуси глобальної та локальної реєстрації обговорюються в спеціальному розділі [Реєстрація компонентів](/guide/components/registration).

Компоненти можна повторно використовувати скільки завгодно разів:

```vue-html
<h1>Тут багато дочірніх компонентів!</h1>
<ButtonCounter />
<ButtonCounter />
<ButtonCounter />
```

<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqVkN1Kw0AQhV9l3JsqlURvQyz+vEZuYrrFYLIJ240IIaAp4r0XfQCfIP4Ui9r4CrNv5OzGFqKCCMvAnGXOmflKdpTnzkXBmcf8aSTjXI0CEad5JhUcF0pl4iQrhOISJjJLYeC4PdWMDgIBEAh+aYfGfBIWiYLSqFFGToILNfU6AfqmRqoCQc93N+nUKJ7mSai46ZR/tj/Cez3TNeADNviEja6xBXzGVt/qub7CFdUbwFds8R0/qK5wQWKt5/i45btkYI36B7n/En13sxTbZT8g9Pj9hmIcqnB7Z01BclVIse4MKHLyYK/ricefXAD8U7sEHEZJHJ0fBMyaDIcBs98AeIdLIBQG11JfE5AZvn1JQKAIES6gLLt0qCoglA2+GGqOTXC7iG/nV59KKer4)

</div>
<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqVkE1OwzAQha8yeFNQUQxb5Fb8XCMbiFwR0ThW4rCJIkEqxJ5FD8AJwk9FBTRcYXwjxk6EVBCVuhlpxp735n0lO9E6uC4kO2Iij7JYG8ilKfQ4VHGi08zAaWFMqs7SQhmZwSRLExgEfG3qBAahErxToF1qjEz09NxI1xlxeTjGRzuzNeATNviCja2xBXzF1t7bub3BFdU7wHds8RO/qK5wQcPazvF5R3AS8ELr5/CthoL/HMX22Z8I/zMoIZMTqPr0XdpQRanKDUROAEbux+7B3gYKAOLCW8JxNI2jq1HI/O5wGDL/DIAPuAQK7uAs7S3Fn+FHPwLCQkBwAWXZm1YVELgG3xyjwDvwzuJX2OobOIzRww==)

</div>

Зауважте, що під час натискання кнопок кожна з них підтримує власний окремий `count`. Це тому, що кожного разу, коли ви використовуєте компонент, створюється новий його **екземпляр**.

У SFC рекомендується використовувати `PascalCase` назви тегів для дочірніх компонентів, щоб відрізнити їх від рідних елементів HTML. Хоча рідні імена тегів HTML не чутливі до регістру, Vue SFC є скомпільованим форматом, тому ми можемо використовувати в ньому імена тегів з урахуванням регістру. Ми також можемо використовувати `/>`, щоб закрити тег.

Якщо ви створюєте свої шаблони безпосередньо в DOM (наприклад, як вміст рідного елемента `<template>`), шаблон підлягатиме стандартному синтаксичному аналізу HTML браузером. У таких випадках вам потрібно буде використовувати `kebab-case` і явні закривальні теги для компонентів:

```vue-html
<!-- якщо цей шаблон написаний у DOM -->
<button-counter></button-counter>
<button-counter></button-counter>
<button-counter></button-counter>
```

Дивіться [застереження щодо аналізу шаблону DOM](#dom-template-parsing-caveats) для отримання додаткової інформації.

## Передавання реквізитів {#passing-props}

Якщо ми створюємо блог, нам, швидше за все, знадобиться компонент, який представлятиме публікацію блогу. Ми хочемо, щоб усі публікації в блозі мали однаковий візуальний макет, але мали різний вміст. Такий компонент не буде корисним, якщо ви не зможете передати йому дані, наприклад назву та вміст конкретної публікації, яку ми хочемо показати. Ось тут і з’являється реквізит.

Реквізити — це власні атрибути, які можна зареєструвати в компоненті. Щоб передати заголовок до нашого компонента допису в блозі, ми повинні оголосити його в списку реквізитів, які приймає цей компонент, використовуючи <span class="options-api">параметр [`props`](/api/options-state#props)</span><span class="composition-api">макрос [`defineProps`](/api/sfc-script-setup#defineprops-defineemits)</span>:

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

Коли значення передається до реквізитного атрибута, воно стає властивістю цього екземпляра компонента. Значення цієї властивості доступне в шаблоні та в контексті `this` компонента, як і будь-яка інша властивість компонента.

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

`defineProps` — це макрос часу компіляції, який доступний лише всередині `<script setup>` і не потребує явного імпорту. Оголошені властивості автоматично показуються в шаблоні. `defineProps` також повертає об’єкт, який містить усі властивості, передані компоненту, щоб ми могли отримати до них доступ у JavaScript, якщо потрібно:

```js
const props = defineProps(['title'])
console.log(props.title)
```

Також до вашої уваги: [Типізація реквізитів компонента](/guide/typescript/composition-api#typing-component-props) <sup class="vt-badge ts" />

Якщо ви не використовуєте `<script setup>`, реквізити слід оголошувати за допомогою параметра `props`, а об’єкт props буде передано до `setup()` як перший аргумент:

```js
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

</div>

Компонент може мати скільки завгодно реквізитів, і за замовчуванням будь-яке значення можна передати будь-якому реквізиту.

Після того, як реквізит зареєстровано, ви можете передати йому дані як спеціальний атрибут, наприклад:

```vue-html
<BlogPost title="Моя подорож з Vue" />
<BlogPost title="Ведення блогу з Vue" />
<BlogPost title="Чому Vue такий чудовий" />
```

Однак у типовій програмі ви, ймовірно, матимете масив публікацій у своєму батьківському компоненті:

<div class="options-api">

```js
export default {
  // ...
  data() {
    return {
      posts: [
        { id: 1, title: 'Моя подорож з Vue' },
        { id: 2, title: 'Ведення блогу з Vue' },
        { id: 3, title: 'Чому Vue такий чудовий' }
      ]
    }
  }
}
```

</div>
<div class="composition-api">

```js
const posts = ref([
  { id: 1, title: 'Моя подорож з Vue' },
  { id: 2, title: 'Ведення блогу з Vue' },
  { id: 3, title: 'Чому Vue такий чудовий' }
])
```

</div>

Потім показати компонент для кожного за допомогою `v-for`:

```vue-html
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
 />
```

<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp9UktOwzAQvcrIm4BUGvFZRaYSnIAVG8IiIi5EpLbluhUoioTogiUSa/Zs+ZV/yxUmN2KcNFEqoUqR4zd+b2b8xhnb07o7HgkWMD48MYm2vVAmA62Mhf1UnR6ooYW+UQPwun4dcAIvlAChFBclNRb9aJRayFz0RJFeCmmHQRWAJpVDecetcWSjtfX63Ag7MrJGAJq4pD6qMUAGSRzAZgdsYlMRgIf3OC9uAX9xjq+0vaL/G+A7HFJziyJt6VZLeodT0kxxhjOX4gm/SfxSTFbIt1vyB2L/EJuoUFzjI37hB35CcVNMXCv47CAlqXMcV5sS00If9xuzCVgx0GlkhUOWt70K7Xijr8xuyJwjkMjKmZA5JkBwLi4XZ90kdlEnCcpG63gJKkGPNyOkUtxv6rIOa8926TH8N2FtlHbj8crkHt1v1Z0A+NlOL8sqAyHPuU94uYH8D5LF9Ss=)

</div>
<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp9UctOwzAQ/JWVLylSacTjFLmV4At64tJwQK0DFq1tJW4lFEVC9MARiTN3rrzKu+UXNn/EOmlDkKqe7Nmd2fWMU3ZgTGsyFixgPOnH0lhIhB2bTqjkyOjYQgqxiCCDKNYj8IjqVa3DoT7t6sQuey1/VXATiQYQqr5WRDBUTKDtRjV6rpGCHASw0wQr7VAE4OEdLvIbwB9c4AtdL+l8BXyDIxoFWfNPtFsT3eKM2DOc49yJH/GLZM/5dK1wrya8J9438YgE+RU+4Ce+4wfk1/nUrccnB0kequOtUHG/zIZSIWDFyAxPrHDI8pXnwq6dbEc6bofMGQapSuMhc0yA4FxcLHstOXBVJwmKR63qBSgFHV4FSqu4X+1lTVZPes3fDUQklejG2iSNnlfM9DYaAeBn+500LROCLOM+4f9bs1/rsd0+)

</div>

Зверніть увагу, як `v-bind` використовується для передачі динамічних значень реквізитів. Це особливо корисно, коли ви заздалегідь не знаєте точного вмісту, який збираєтеся показати.

Наразі це все, що вам потрібно знати про реквізити, але коли ви закінчите читати цю сторінку та відчуєте себе комфортно з її вмістом, радимо повернутися пізніше, щоб прочитати повний посібник по [реквізитах](/guide/components/props).

## Прослуховування подій {#listening-to-events}

Коли ми розробляємо наш компонент `<BlogPost>`, для деяких функцій може знадобитися зворотна комунікація з батьківським компонентом. Наприклад, ми можемо вирішити включити функцію доступності, щоб збільшити текст дописів блогу, залишивши решту сторінки розміру за замовчуванням.

У батьківському компоненті ми можемо впровадити цю функцію, додавши <span class="options-api">властивість даних</span><span class="composition-api">ref</span> `postFontSize`:

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

Яку можна використовувати в шаблоні для керування розміром шрифту всіх публікацій блогу:

```vue-html{1,7}
<div :style="{ fontSize: postFontSize + 'em' }">
  <BlogPost
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
   />
</div>
```

Тепер давайте додамо кнопку до шаблону компонента `<BlogPost>`:

```vue{5}
<!-- BlogPost.vue, omitting <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button>Збільшити текст</button>
  </div>
</template>
```

Кнопка ще нічого не робить — ми хочемо, щоб натискання кнопки повідомляло батьківському компоненту, що він має збільшити текст усіх дописів. Щоб розв'язати цю проблему, компоненти забезпечують спеціальну систему подій. Батьківський компонент може обрати прослуховування будь-якої події в екземплярі дочірнього компонента за допомогою `v-on` або `@`, так само як ми робимо це з нативною подією DOM:

```vue-html{3}
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
 />
```

Тоді дочірній компонент може створити подію сам по собі, викликавши вбудований метод [**`emit`**](/api/component-instance#emit), передаючи назву події:

```vue{5}
<!-- BlogPost.vue, omitting <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Збільшити текст</button>
  </div>
</template>
```

Завдяки слухачу `@enlarge-text="postFontSize += 0.1"` батьківський компонент отримає подію та оновить значення `postFontSize`.

<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqNUsFu00AQ/ZWRheRWJDEBTpYbFQ6ckZC44B5ce1NWtXctexK1WJGgPcABCYkDXLhzpUAgtLT8wuwfMWvHritBVcuyPTPvvZ0Zv8p5kOej+Uw4vhOUcSFznIRKZrkuEB6meu+xLhGmhc7AHXltwhLcUAGEShzU0ERMo1mKUNlsrJmvhMLSbxLQSdloMbDPJMJoY7OtFwJnhWojgJyxzH7WxgAVyMSH8QBQYip8cOkTXZh3QH/ogr7z50t+/wD6CU+5ufUhferdHvU9LZmzpHM6txIndMbkb+b4Gvq9Hv0zo38zmqFgjugLndKKfoF5bY5tK/TVhizSaux0anauR1rhE/mClcZNusbxg+/A634CByiyPI1QcAQQJHIOfomHqdgKnQqmnUxfFG6DKzJ7tlOzmNffvb3mw6kuWMLSQKpm16HTlv19cbiujmTSy9fjt5U6uCxuC5VGxZ4YojjANeaypS24Mxq34EnQ+aiZy+PB+CvwunGdgdO32hVv/stweaFz6xa37spt1i0yWVvI7bfm7txozXEalSWPsctdDO0s9TZD5PLz+5OqaqwAi0Xgcbyu7M4QtYLtOJXxPpNv2Q42rh6/yUL0kU7MBzozb80bWrF/VtZESzo1r8xR4DUy/13N4i/BV1wY)

</div>
<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp1Ustu00AU/ZUrC8mpSGICrKxJVJBgXQmJTc0idcZlVHvGsicRxbIE7QIWSEgsYMOeLQUCoc9fuPNHveNH4kqtN557zzn3cWYK50maDhdz7vgOy8NMpBpyrufpJJAiSVWmoYCMR1BClKkEXKK6a+hprPZ3VK4bbOi1CVuRaACBDJUkQkrJHMa2VG/XAgWImQ+jPmihY+6Di9/x0nwGvMJL/EPHd/T/C/gPXlIpKPsb0cOO6Asuib3EC7yw4hM8I9lvc3yr8FFH+IN458QjEpgj/ImnuML/YD6YY9sef9mQ5IF8tRXI7hrPldQvxFvebDMimHm1dWQaBZonaTzV3EaazcQC/FwfxnwcOAVEjdq/Wes+uDyx7RxSAX2stbIOARaDSGVUwspAyNrRwGlh/4AfNuhQzDr5auMWqYINuM1lPM32+UDzN7rhbEYaw4PhqCVP2PpyqwmZR4vRiXnrdZ2+073/W17UjEdC8p1MpXlv162Gca29df5ZIrTNd4eq4DvtpTGsvWE8zXMaf4+6D+wOGxdfP54URX3rUJbMo7hB9uZaKwnbYSzCAxLf49S+d7P5FhXCb3hivuKZ+WQ+4oqeysq+lyWemvfmiHl1mTstKa8B2c9JRw==)

</div>

Додатково ми можемо оголосити випромінені події за допомогою <span class="options-api">параметра [`emits`](/api/options-state#emits)</span><span class="composition-api">макросу [`defineEmits`](/api/sfc-script-setup#defineprops-defineemits)</span>:

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

Це документує всі події, які випромінює компонент, і додатково [їх перевіряє](/guide/components/events#events-validation). Це також дозволяє Vue уникнути неявного застосування їх як рідних слухачів до кореневого елемента дочірнього компонента.

<div class="composition-api">

Подібно до `defineProps`, `defineEmits` використовується лише в `<script setup>` і не потребує імпорту. Він повертає функцію `emit`, яка еквівалентна методу `emit`. Його можна використовувати для випромінювання подій у розділі `<script setup>` компонента, де `emit` недоступний безпосередньо:

```vue
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>
```

Також до вашої уваги: [Типізація випромінювань компонента](/guide/typescript/composition-api#typing-component-emits) <sup class="vt-badge ts" />

Якщо ви не використовуєте `<script setup>`, ви можете оголосити випромінювані події за допомогою параметра `emits`. Ви можете отримати доступ до функції `emit` як до властивості контексту `setup` (передається `setup()` як другий аргумент):

```js
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
}
```

</div>

Наразі це все, що вам потрібно знати про події спеціальних компонентів, але коли ви закінчите читати цю сторінку та відчуєте себе комфортно з її вмістом, ми рекомендуємо повернутися пізніше, щоб прочитати повний посібник щодо [власних подій](/guide/components/events).

## Передавання вмісту за допомогою слотів {#content-distribution-with-slots}

Так само як і з елементами HTML, часто корисно мати можливість передавати вміст до компонента, наприклад:

```vue-html
<AlertBox>
  Сталося щось погане.
</AlertBox>
```

Що може показати щось на зразок:

:::danger Це помилка для демонстраційних цілей
Сталося щось погане.
:::

Цього можна досягти за допомогою спеціального Vue-елемента `<slot>`:

```vue{4}
<template>
  <div class="alert-box">
    <strong>Це помилка для демонстраційних цілей</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

Як ви бачите вище, ми використовуємо `<slot>` як підмінний елемент, замість якого ми хочемо розмістити вміст – і все. Ми закінчили!

<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNpVUd1KwzAUfpVjvNiNa1VkSK2D+Ry9SZtsFLMkJOmojF3onSD4COIbDEQQf+YrpG/kSbfWjeQi5zs/3/flLMlE62hRcZKQ1Bam1G6cyXKulXEwEdy4G1XD1Kg5DKK4A0LDIJMAmeR1W8r4lFbCwTKghcJ+yaWzCSz/p6wyiTeNexoMHJ9rQR0PkUu7UoxwtvOvzYNf+y+/ae6bZ2ge28cT+F+/8W+Y+fHvUdvYK8PONO6HkhOyLzl43CMESFm5gEJQa68zQkPlMFd1Rtokpq0zSs7G/gX5vv0HKvn06yN0sMV3VbmJ+wahHGyjNMbhh3Jax9bdCQ62UJozRKKetvs7oUwCx6PR6CrEuTKMI3Cma7BKlAwMZ3uZoaGsrPCjL3TdwpoyVspZAuenOySnxe3MqEqyYTd9ehkOZnEhYYtbQ0FB5nY1gSZ46pYWZI/J6g8I69Ln)

</div>
<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNpVUEtOwzAUvMrDLLqhCSBUoRAqlXNkk8RuFeHGlu1UQVUXsENC4giIG1RCSIhPuYJzI56dj4KyyZs382bGW7KQMthUjEQk1rkqpAHNTCXnSVmspVAGFpwpcyNqWCqxhkkQ9oCTTZIyDlsdKnAwbC15apibTNxTcQJIjH1tHuzeftlDc988Q/Pof57A/tqDfcPNj30PvHAwQWUcDkfJCRm7u9AjQ4CYFhvIear1dUJSx5xmok6IX+JaGyXK1dy+oN+3/cAkn3Z/hA1avGNlKhwEXBhopzjE4//j+Mba3HEGOheSUUSCwRa2TpYLLlQEx7PZ7MrNmVCUIXAma9CCFxQUo6PNVKW0qHQEF7L2sEwpLcpVBOenHZKl+e1Kiaqk0/768tJ9uN35ly7bQi5BYjqOs3GdPMdVxthzsvsDWgHB2A==)

</div>

Наразі це все, що вам потрібно знати про слоти, але коли ви закінчите читати цю сторінку та відчуєте себе комфортно з її вмістом, рекомендуємо повернутися пізніше, щоб прочитати повний посібник про [слоти](/guide/components/slots).

## Динамічні компоненти {#dynamic-components}

Іноді корисно динамічно перемикатися між компонентами, наприклад, в інтерфейсі з вкладками:

<div class="options-api">

[Відкрийте приклад в пісочниці](https://play.vuejs.org/#eNqVVc1u00AQfpWRewhIddJSxMEkFb1x5MCt7mFjr9NV7V1rvQ6pokiAhMSRA+LAU1QIRECUvsLmjZjdtTdO26BGiaKdv2/m+7yezIOTsuxPaxpEwbBKJCvVccxZUQqp4KUoKGRSFNDrD4xhEns+/EpUqvJxa20mnMjknE3XEI3dJAHEnM5sYkozUucK5sabCKzmlKsqcg6wg+y7o23TnBs8YyysKyWKPHrcVkmqaslbC4FrKRH2NRlH0DOQvQYHQJExdjttTYD5egyfDDkZ0xxN/Vn/1X9WX/Q3/Vtf9Zrm9xXaaW9X3ujl6p1e/q+uYdat/LR6u/pgenbrztxhYSWIOX6HA/8U0VC0KHOiKFoAw5RNIclJVY3iIKWFiAPrx8i4VkpgQTPMNMyExCSUBRi36sSBj0YX9NIFu84W+LSHgdAB4vxzIIlCKlFHfhiNRga07ynD4qyD9SLJWXKBWN2SzQKf3TBAAec2w+oFC6sIEhu4QYwaCs11w4iZYdcN4sBLY4kdDwc+2ak3QPnwNBx0REWzUpe5OfaNou6yZYKrMCMFyy8jqAivwopKlj03sbGQKZURHJYzqETOUtijlHZCoSQpq/E2Piln1l2SNGV8go4DrDnCH+suiJwwHipRIhgtur6xQM5FBE/b3Br74ww5TfByceRkvWJKZZaLN+EsAlIrgU6UDZmsH6Dj4yd4hgMctqDNuDhAmNNM+bmP7sYlm5xvS9iQIkkSG8LnUgkMlYJxRaVLJ8nFRIqapxHsZQfmcx/pEOG6ftvbu5Fgh150bjRwJDfg6YH53Mnvu7v8gIImZTtDr2mjp3t17V0K9oN22ZqtvP0ddhfV3XS3k/TV6qO+xi3xC3A1GccN/l7rH+h8v+UWYzu/u3fo9/U2POifoL/7/XaF0eX2lp3/gh2a+iWITZc7kVz8Ax1tfoY=)

</div>
<div class="composition-api">

[Відкрийте приклад в пісочниці](https://play.vuejs.org/#eNqVVMFu00AQ/ZWRe0grxUlLEQeTIHrjyIFbzcFZr9NV7V1rdx1aRZEACYkjB8SBr4gQiIAo/QXnj5jddTZ2S6QmkaLMvLcz857XMw/OynIwq2gQBSNFJCs1KKqr8lnMWVEKqeGFKChkUhTQGwxNYOg9D78USiuP26hLOJPkgs22JZq4S5qDpBksGpKDIOZEcKWBVFJSrl8lExgb3mGv/lz/rf+sv9Tf6t/1sncU8w1XJxOFrDkeh7u0yGrpb6HberV+V68QsHM3yKf12/UHcwjzzbAxX8R8NHQGoTUYaFqUeaIpRgCjlM2A5IlS4zhIaSHiwOYRmVRaCzxgAvzMwkxIJB0Sgco5yupDnkxofgSM2+njwJOjS3qNXIu305tO5z08ELoOvT6amBCN00Ydx8Zj1wAWr1s1npOckUus0TG326mRADCfb0qgDVbV0DU1VmgMvRiImBnM6DjfVsbG3h2E0JzR0B9xBg7RQfw3GrZ8xVDp69z8HRhT3VPNBNdhlhQsv45AJVyFikqWPTXYRMiUyghOyitQImcpHFBKW1Aok5RVKoJH5ZVNl0maMj7FxDGeOcUfmy4SOWU81KLEYrRo5yYClRcRPN5wK+yPM+SU6Ag4arJZMaMyy8Wb8CqCpNICk2geKtk+MqfHT/AEBzjZFG3GxQHCnGbaz316H5dserGL0LGCEGIhfDBKIFQKxjWVjp6Qy6kUFU8jOMiOzfd/okMs187b3j6NAlvyogvjgRPZKU+Pzfcef+Bu7wMONJTdCr2njZ/u7bV3KegHmyVmdt7u19hdVHff3SKpl+uP9Q1uhl+A+8QkbvH3pv6Byfc7bjG28ztxj35f75aH+ifU3/3OWiK62t2ytWP3aOoXHzZd7SVy8Q+Thlgp)

</div>

Це стало можливим завдяки елементу `<component>` Vue зі спеціальним атрибутом `is`:

<div class="options-api">

```vue-html
<!-- Компонент змінюється, коли змінюється поточна вкладка -->
<component :is="currentTab"></component>
```

</div>
<div class="composition-api">

```vue-html
<!-- Компонент змінюється, коли змінюється поточна вкладка -->
<component :is="tabs[currentTab]"></component>
```

</div>

У наведеному вище прикладі значення, передане в `:is`, може містити:

- рядок імені зареєстрованого компонента, АБО
- фактичний імпортований об'єкт компонента

Ви також можете використовувати атрибут `is` для створення звичайних елементів HTML.

Під час перемикання між декількома компонентами за допомогою `<component :is="...">` компонент буде демонтовано, коли з нього буде перемкнуто. Ми можемо змусити неактивні компоненти залишатися «живими» за допомогою вбудованого [компонента `<KeepAlive>`](/guide/built-ins/keep-alive).

## Застереження щодо аналізу шаблону DOM {#dom-template-parsing-caveats}

Якщо ви пишете свої шаблони Vue безпосередньо в DOM, Vue доведеться отримати рядок шаблону з DOM. Це призводить до деяких застережень через власну поведінку браузерів під час аналізу HTML.

:::tip
Слід зазначити, що обмеження, описані нижче, застосовуються, лише якщо ви пишете свої шаблони безпосередньо в DOM. Вони НЕ застосовуються, якщо ви використовуєте шаблони рядків із таких джерел:

- Однофайлові компоненти
- Вбудовані рядки шаблону (наприклад, `template: '...'`)
- `<script type="text/x-template">`
  :::

### Нечутливість до регістру {#case-insensitivity}

Теги HTML і назви атрибутів нечутливі до регістру, тому браузери сприйматимуть будь-які символи верхнього регістру як малі. Це означає, що коли ви використовуєте шаблони DOM, назви компонентів в PascalCase та назви реквізитів у в регістрі camelCase або назви подій `v-on` повинні використовувати свої еквіваленти у регістрі kebab (розділені дефісами):

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
<blog-post post-title="привіт!" @update-post="onUpdatePost"></blog-post>
```

### Закривальні теги {#self-closing-tags}

Ми використовували закривальні теги для компонентів у попередніх зразках коду:

```vue-html
<MyComponent />
```

Це пояснюється тим, що синтаксичний аналізатор шаблону Vue розглядає `/>` як вказівку на закінчення будь-якого тегу, незалежно від його типу.

Однак у шаблонах DOM ми завжди повинні включати явні закривальні теги:

```vue-html
<my-component></my-component>
```

Це тому, що специфікація HTML дозволяє лише [декільком конкретним елементам](https://html.spec.whatwg.org/multipage/syntax#void-elements) опускати закривальні теги, найпоширенішими є `<input>` і `<img>`. Для всіх інших елементів, якщо ви опустите закривальний тег, рідний синтаксичний аналізатор HTML вважатиме, що ви не завершили відкривальний тег. Наприклад, такий фрагмент коду:

```vue-html
<my-component /> <!-- ми маємо намір закрити тег тут... -->
<span>привіт</span>
```

will be parsed as:

```vue-html
<my-component>
  <span>привіт</span>
</my-component> <!-- але браузер закриє його тут. -->
```

### Обмеження розміщення елементів {#element-placement-restrictions}

Окремі елементи HTML, як-от `<ul>`, `<ol>`, `<table>` і `<select>`, мають обмеження щодо того, які елементи можуть з’являтися в них, а певні елементи, наприклад `<li>`, `<tr>` і `<option>` можуть з'являтися лише всередині деяких інших елементів.

Це призведе до проблем під час використання компонентів з елементами, які мають такі обмеження. Наприклад:

```vue-html
<table>
  <blog-post-row></blog-post-row>
</table>
```

Спеціальний компонент `<blog-post-row>` буде видалено як недійсний вміст, що призведе до помилок в остаточному відтвореному виведенні. Ми можемо використати спеціальний атрибут [`is`](/api/built-in-special-attributes#is) як обхідний шлях:

```vue-html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

:::tip
При використанні в нативних елементах HTML, значення `is` має мати префікс `vue:`, щоб інтерпретуватися як компонент Vue. Це потрібно, щоб уникнути плутанини з рідними [власними вбудованими елементами](https://html.spec.whatwg.org/multipage/custom-elements#custom-elements-customized-builtin-example).
:::

Це все, що вам наразі потрібно знати про застереження щодо аналізу шаблонів DOM – і, власне, кінець _Основам_ від Vue. Щиро вітаю! Ще є чому навчитися, але спочатку ми рекомендуємо зробити перерву, щоб пограти з Vue самостійно - створіть щось веселе або перегляньте [приклади](/examples/), якщо ви ще цього не зробили.

Коли ви відчуєте себе комфортно зі знаннями, які ви щойно засвоїли, перейдіть до посібника, щоб дізнатися більше про компоненти.
