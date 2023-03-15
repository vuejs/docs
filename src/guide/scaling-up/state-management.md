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

Для першого випадку можливим обхідним шляхом є "підняття" загального стану до загального компонента-предка, а потім передавати його як реквізит. Однак це швидко стає стомливим у деревах компонентів із глибокою ієрархією, що призводить до іншої проблеми, відомої як [Прокидання Реквізитів](/guide/components/provide-inject.html#prop-drilling).

У другому випадку ми часто вдаємося до таких рішень, як звернення до прямих батьківських / дочірніх екземплярів через референції шаблонів, або намагаючись мутувати та синхронізувати кілька копій стану за допомогою випромінених подій. Обидва ці шаблони ненадійні та швидко призводять до непридатного до обслуговування коду.

Більш простим та зрозумілим рішенням є вилучення загального стану з компонентів і керування ним у глобальному синглтоні. Завдяки цьому наше дерево компонентів стає великим "поданням", і будь-який компонент може отримати доступ до стану або ініціювати дії, незалежно від того, де вони знаходяться в дереві!

## Просте керування станом за допомогою API реактивності {#simple-state-management-with-reactivity-api}

<div class="options-api">

В опційному API реактивні дані оголошуються за допомогою параметра `data()`. Внутрішньо об'єкт, що повертається `data()`, стає реактивним за допомогою функції[`reactive()`](/api/reactivity-core.html#reactive), яка також доступна, як публічний API.

</div>

Якщо у вас є фрагмент стану, який має використатися кількома екземплярами, ви можете використовувати [`reactive()`](/api/reactivity-core.html#reactive), щоб створити реактивний об'єкт, а потім імпортувати його до кількох компонентів:

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

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBDb21wb25lbnRBIGZyb20gJy4vQ29tcG9uZW50QS52dWUnXG5pbXBvcnQgQ29tcG9uZW50QiBmcm9tICcuL0NvbXBvbmVudEIudnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPENvbXBvbmVudEEgLz5cbiAgPENvbXBvbmVudEIgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkNvbXBvbmVudEEudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHN0b3JlIH0gZnJvbSAnLi9zdG9yZS5qcydcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPGJ1dHRvbiBAY2xpY2s9XCJzdG9yZS5pbmNyZW1lbnQoKVwiPlxuICAgICAgRnJvbSBBOiB7eyBzdG9yZS5jb3VudCB9fVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiQ29tcG9uZW50Qi52dWUiOiI8c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgc3RvcmUgfSBmcm9tICcuL3N0b3JlLmpzJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8YnV0dG9uIEBjbGljaz1cInN0b3JlLmluY3JlbWVudCgpXCI+XG4gICAgICBGcm9tIEI6IHt7IHN0b3JlLmNvdW50IH19XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJzdG9yZS5qcyI6ImltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3Qgc3RvcmUgPSByZWFjdGl2ZSh7XG4gIGNvdW50OiAwLFxuICBpbmNyZW1lbnQoKSB7XG4gICAgdGhpcy5jb3VudCsrXG4gIH1cbn0pIn0=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDb21wb25lbnRBIGZyb20gJy4vQ29tcG9uZW50QS52dWUnXG5pbXBvcnQgQ29tcG9uZW50QiBmcm9tICcuL0NvbXBvbmVudEIudnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIENvbXBvbmVudEEsXG4gICAgQ29tcG9uZW50QlxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8Q29tcG9uZW50QSAvPlxuICA8Q29tcG9uZW50QiAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQ29tcG9uZW50QS52dWUiOiI8c2NyaXB0PlxuaW1wb3J0IHsgc3RvcmUgfSBmcm9tICcuL3N0b3JlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0b3JlXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxidXR0b24gQGNsaWNrPVwic3RvcmUuaW5jcmVtZW50KClcIj5cbiAgICAgIEZyb20gQToge3sgc3RvcmUuY291bnQgfX1cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPiIsIkNvbXBvbmVudEIudnVlIjoiPHNjcmlwdD5cbmltcG9ydCB7IHN0b3JlIH0gZnJvbSAnLi9zdG9yZS5qcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdG9yZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8YnV0dG9uIEBjbGljaz1cInN0b3JlLmluY3JlbWVudCgpXCI+XG4gICAgICBGcm9tIEI6IHt7IHN0b3JlLmNvdW50IH19XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJzdG9yZS5qcyI6ImltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3Qgc3RvcmUgPSByZWFjdGl2ZSh7XG4gIGNvdW50OiAwLFxuICBpbmNyZW1lbnQoKSB7XG4gICAgdGhpcy5jb3VudCsrXG4gIH1cbn0pIn0=)

</div>

:::tip
Зауважте, що обробник натискання використовує `store.increment()` з круглими дужками - це необхідно для виклику методу з відповідним контекстом `this`, оскільки це не метод компоненту.
:::

Хоча тут ми використовуємо єдиний реактивний об'єкт, як сховище, ви також можете використовувати реактивний стан, створений за допомогою інших [Реактивних APIs](/api/reactivity-core.html), як от `ref()` або `computed()`, або навіть повернути глобальний стан з [Composable](/guide/reusability/composables.html):

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
