# Керування станом {#state-management}

## Що таке керування станом? {#what-is-state-management}

Технічно кожен екземпляр компонента Vue вже "керує" своїм реактивним станом. Візьмемо для прикладу простий компонент лічильника:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

// стан
const count = ref(0)

// дії
function increment() {
  count.value++
}
</script>

<!-- подання -->
<template>{{ count }}</template>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  // стан
  data() {
    return {
      count: 0
    }
  },
  // дії
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<!-- подання -->
<template>{{ count }}</template>
```

</div>

Це самостійний блок, що складається з наступних частин:

- **Стан**, джерело істини, яке керує нашим додатком;
- **Подання**, декларативне відображення **стану**;
- **Дії**, можливі способи зміни стану у відповідь на взаємодію користувача з **подання**.

Це просте представлення концепції "одностороннього потоку даних":

<p style="text-align: center">
  <img alt="state flow diagram" src="./images/state-flow.png" width="252px" style="margin: 40px auto">
</p>

Однак простота порушується, коли ми маємо **декілька компонентів із загальним станом**:

1. Декілька подань можуть залежати від одного і того ж фрагменту стану.
2. Дії від різних подань можуть потребувати змін одного і того ж фрагменту стану.

Для першого випадку можливим обхідним шляхом є "підняття" загального стану до загального компонента-предка, а потім передавати його як реквізит. Однак це швидко стає стомливим у деревах компонентів із глибокою ієрархією, що призводить до іншої проблеми, відомої як [Прокидання Реквізитів](/guide/components/provide-inject#prop-drilling).

У другому випадку ми часто вдаємося до таких рішень, як звернення до прямих батьківських / дочірніх екземплярів через референції шаблонів, або намагаючись мутувати та синхронізувати кілька копій стану за допомогою випромінених подій. Обидва ці шаблони ненадійні та швидко призводять до непридатного до обслуговування коду.

Більш простим та зрозумілим рішенням є вилучення загального стану з компонентів і керування ним у глобальному синглтоні. Завдяки цьому наше дерево компонентів стає великим "поданням", і будь-який компонент може отримати доступ до стану або ініціювати дії, незалежно від того, де вони знаходяться в дереві!

## Просте керування станом за допомогою API реактивності {#simple-state-management-with-reactivity-api}

<div class="options-api">

В опційному API реактивні дані оголошуються за допомогою параметра `data()`. Внутрішньо об'єкт, що повертається `data()`, стає реактивним за допомогою функції[`reactive()`](/api/reactivity-core#reactive), яка також доступна, як публічний API.

</div>

Якщо у вас є фрагмент стану, який має використатися кількома екземплярами, ви можете використовувати [`reactive()`](/api/reactivity-core#reactive), щоб створити реактивний об'єкт, а потім імпортувати його до кількох компонентів:

```js
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0
})
```

<div class="composition-api">

```vue
<!-- ComponentA.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>From A: {{ store.count }}</template>
```

```vue
<!-- ComponentB.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>From B: {{ store.count }}</template>
```

</div>
<div class="options-api">

```vue
<!-- ComponentA.vue -->
<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>From A: {{ store.count }}</template>
```

```vue
<!-- ComponentB.vue -->
<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>From B: {{ store.count }}</template>
```

</div>

Тепер щоразу, коли об'єкт `store` змінюється, обидва компоненти `<ComponentA>` та `<ComponentB>` будуть автоматично оновлювати свої подання - в нас є єдине джерело істини.

Однак, це також означає, що будь-який компонент, що імпортує `store` може змінювати його на свій розсуд:

```vue-html{2}
<template>
  <button @click="store.count++">
    From B: {{ store.count }}
  </button>
</template>
```

Хоча це працює у простих випадках, глобальний стан, який може бути довільно змінений будь-яким компонентом, у довгостроковій перспективі не буде дуже зручним у супроводі. Щоби забезпечити централізовану логіку зміни стану, як і сам стан, рекомендується визначати методи в сховищі з іменами, які виражають намір дій:

```js{6-8}
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  increment() {
    this.count++
  }
})
```

```vue-html{2}
<template>
  <button @click="store.increment()">
    From B: {{ store.count }}
  </button>
</template>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNrNkk1uwyAQha8yYpNEiUzXllPV7jW8SSlVaWNAMLYqWWx7pV4jR+oYHOdPURbZZAUzPOa9D9Gz0tqsayXLWeGFUxbBS2ztc61VY41DeDW0aqmxhA9nGphl/NAars4updWltBqlBU82ZEAFysZuNyipAiiOrPhZp4qdgk8X2IqdxrhO0INH4ySEKVWssy9/I8+76uKGtm8totHwIrZKfK9rliYoLZxsKMF8UbNRCrD73f1BmUM/GmfCtBohhHEWT8OSB08mV8jiqz0YWXUP2T4fMU0MTm4Equ6AkX5KreVPVAijPaFH0vWknveDSwyQw9NqKI5CQzwFwE/lU8rlcuhQ0rBg4R+pxQfe)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNrdU9FqgzAU/ZVLXlpp0T2LHdP9hi8upiybJpJcZSC+7pf2G/2kxcSkru1gsLeCYM7hJPecoxlJ3nXx0DOSkkxTxTt8LAVvO6kQnqV5CyYwh6OSLWzi5EzNmzbX0uJaWixSgFKwDyuv2bHqG4RxZqkX6tQRsJq8vyCKGU+lME+WBMMGIGu7pkJmEEC2sp5cMIVlsiRsIHvyM9atLkbQKBWDKeSzOH7TJtntXHWF1TbykRTDXgmPwB3ngMnyl0w1H+zCLF96RCngiTacvh9K4rxwQRVrTYptVJJFCnD6PH1BbqpdIsRU9gJhslPNWYk7zM1I3JBf2rFf8g7bKf7Tjk9qegltKFZR5MO5EHcDQhNUCo1LZ4eg3i7XwRhI4cH++SvTvhx85dq53O18NRGZvgFLU00L)

</div>

:::tip
Зауважте, що обробник натискання використовує `store.increment()` з круглими дужками - це необхідно для виклику методу з відповідним контекстом `this`, оскільки це не метод компоненту.
:::

Хоча тут ми використовуємо єдиний реактивний об'єкт, як сховище, ви також можете використовувати реактивний стан, створений за допомогою інших [Реактивних APIs](/api/reactivity-core), як от `ref()` або `computed()`, або навіть повернути глобальний стан з [Composable](/guide/reusability/composables):

```js
import { ref } from 'vue'

// глобальний стан, створений в межах модуля
const globalCount = ref(1)

export function useCount() {
  // локальний стан, створений для кожного компонента
  const localCount = ref(1)

  return {
    globalCount,
    localCount
  }
}
```

Той факт, що система реактивності Vue відокремлена від компонентної моделі, робить її надзвичайно гнучкою.

## Міркування щодо SSR {#ssr-considerations}

Якщо ви створюєте застосунок, яка використовує [Рендерінг на стороні серверу (SSR)](./ssr), наведений вище шаблон може призвести до проблем через те, що сховище є єдиним елементом, який є спільним для кількох запитів. Це зазначається в розділі [більше деталей](./ssr#cross-request-state-pollution) in the SSR guide.

## Pinia {#pinia}

Хоча нашого рішення для керування станом може бути достатньо для простих сценаріїв, у великомасштабних виробничих застосунках потрібно враховувати багато інших речей:

- Більш ефективні узгодження для колективної співпраці
- Інтеграція з Vue DevTools, враховуючи часову шкалу, внутрішньокомпонентну перевірку та налагодження з подорожами у часі
- Гаряча заміна модулів
- Підтримка рендерінгу на стороні сервера

[Pinia](https://pinia.vuejs.org) - це бібліотека керування станом, яка реалізує все вищезгадане. Вона підтримується основною командою Vue, та працює як з Vue 2, так і з Vue 3.

Існуючі користувачі можуть бути знайомі з [Vuex](https://vuex.vuejs.org/), попередньою офіційною бібліотекою керування станом для Vue. Оскільки Pinia виконує ту саму роль в екосистемі, Vuex тепер у режимі обслуговування. Вона все ще працює, але більше не отримуватиме нових функцій. Для нових додатків рекомендується використовувати Pinia.

Pinia розпочався як дослідження того, як може виглядати наступна ітерація Vuex, враховуючи багато ідей з обговорень основної команди щодо Vuex 5. Зрештою ми зрозуміли, що Pinia вже реалізує більшість того, що ми хотіли у Vuex 5, і вирішили зробити її натомість новою рекомендацією.

У порівнянні з Vuex, Pinia надає простіший API з меншини церемоніями, пропонує API в стилі композиційного API, і, що найважливіше, має надійну підтримку виведення типів, коли використовується з TypeScript.
