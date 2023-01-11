# Референції в шаблонах {#template-refs}

Хоча декларативна модель візуалізації Vue абстрагує більшість прямих операцій DOM для вас, можуть бути випадки, коли нам потрібен прямий доступ до базових елементів DOM. Для цього ми можемо використовувати спеціальний атрибут `ref`:

```vue-html
<input ref="input">
```

`ref` — спеціальний атрибут, подібний до атрибута `key`, розглянутого в розділі `v-for`. Це дозволяє нам отримати пряме посилання на певний елемент DOM або екземпляр дочірнього компонента після його монтування. Це може бути корисно, коли ви хочете, наприклад, програмно сфокусуватись у полі вводу після монтування компонента або ініціалізувати сторонню бібліотеку для елемента.

## Доступ до референцій {#accessing-the-refs}

<div class="composition-api">

Щоб отримати посилання за допомогою композиційного API, нам потрібно оголосити референцію з такою ж назвою:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// оголосити референцію для зберігання посилання на елемент
// ім'я має відповідати значенню референції шаблону
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

Якщо не використовується `<script setup>`, переконайтесь також, що посилання повертається з `setup()`:

```js{6}
export default {
  setup() {
    const input = ref(null)
    // ...
    return {
      input
    }
  }
}
```

</div>
<div class="options-api">

Отримана референція з'являється в `this.refs`:

```vue
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<template>
  <input ref="input" />
</template>
```

</div>

Зауважте, що ви можете отримати доступ до референції лише **після монтування компонента**. Якщо ви спробуєте отримати доступ до <span class="options-api">`$refs.input`</span><span class="composition-api">`input`</span> у виразі шаблону, він буде `null` при першому рендері. Це тому, що елемент існує лише після першого рендера!

<div class="composition-api">

Якщо ви намагаєтеся спостерігати за змінами посилання шаблону, обов'язково врахуйте випадок, коли посилання має значення `null`:

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // ще не змонтовано, або елемент було відмонтовано (наприклад, за допомогою v-if)
  }
})
```

Дивіться також: [Типізація референцій в шаблонах](/guide/typescript/composition-api.html#typing-template-refs) <sup class="vt-badge ts" />

</div>

## Референції всередині `v-for` {#refs-inside-v-for}

> Потрібна версія 3.2.25 або вище

<div class="composition-api">

Якщо `ref` використовується всередині `v-for`, відповідна референція має містити значення масиву, яке буде заповнено елементами після монтування:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBsaXN0ID0gcmVmKFsxLCAyLCAzXSlcblxuY29uc3QgaXRlbVJlZnMgPSByZWYoW10pXG5cbm9uTW91bnRlZCgoKSA9PiB7XG4gIGFsZXJ0KGl0ZW1SZWZzLnZhbHVlLm1hcChpID0+IGkudGV4dENvbnRlbnQpKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtUmVmc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

Коли `ref` використовується всередині `v-for`, кінцеве значення референції буде масивом, що містить відповідні елементи:

```vue
<script>
export default {
  data() {
    return {
      list: [
        /* ... */
      ]
    }
  },
  mounted() {
    console.log(this.$refs.items)
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGlzdDogWzEsIDIsIDNdXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuJHJlZnMuaXRlbXMpXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

Слід зазначити, що масив референцій **не** гарантує того ж порядку, що й вихідний масив.

## Референції в функціях {#function-refs}

Замість рядкового ключа атрибут `ref` також можна прив'язати до функції, яка буде викликатися під час кожного оновлення компонента, що дає вам повну гнучкість щодо того, де зберігати посилання на елемент. Функція отримує посилання на елемент як перший аргумент:

```vue-html
<input :ref="(el) => { /* присвоїти el властивості або референції */ }">
```

Зауважте, що ми використовуємо динамічне прив'язування `:ref`, тому ми можемо передати йому функцію замість рядка-імені референції. Коли елемент демонтовано, аргумент матиме значення `null`. Ви, звичайно, можете використовувати метод замість вбудованої функції.

## Референція компонента {#ref-on-component}

> Цей розділ передбачає знання [компонентів](/guide/essentials/component-basics). Ви можете пропустити його та повернутися пізніше.

`ref` також можна використовувати для дочірнього компонента. У цьому випадку посилання буде вказувати на екземпляр компонента:

<div class="composition-api">

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value буде містити екземпляр <Child >
})
</script>

<template>
  <Child ref="child" />
</template>
```

</div>
<div class="options-api">

```vue
<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  mounted() {
    // this.refs.child буде містити екземпляр <Child>
  }
}
</script>

<template>
  <Child ref="child" />
</template>
```

</div>

<span class="composition-api">Якщо дочірній компонент використовує опційний API або не використовує `<script setup>`, посилання</span><span class="options-api">Посилання</span> на екземпляр буде ідентичним `this` дочірнього компонента, це означає, що батьківський компонент матиме повний доступ до кожної властивості та методу дочірнього компонента. Це полегшує створення тісно пов'язаних деталей реалізації між батьківським і дочірнім елементом, тому посилання на компоненти слід використовувати лише тоді, коли це абсолютно необхідно - у більшості випадків ви спочатку повинні спробувати реалізувати взаємодію батьківського дочірнього елемента за допомогою стандартних реквізитів і випромінювати інтерфейси.

<div class="composition-api">

Винятком є те, що компоненти, які використовують `<script setup>`, є **приватними за промовчанням**: батьківський компонент, який посилається на дочірній компонент за допомогою `<script setup>`, не зможе отримати доступ до будь-чого, якщо дочірній компонент не вирішить відкрити публічний інтерфейс за допомогою макросу `defineExpose`:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// Макроси компілятора, такі як defineExpose, не потрібно імпортувати
defineExpose({
  a,
  b
})
</script>
```

Коли батьківський елемент отримує екземпляр цього компонента через референцію в шаблоні, отриманий екземпляр матиме форму `{ a: number, b: number }` (референції автоматично розгортаються так само як у звичайних екземплярах).

Дивіться також: [типізація референцій в шаблонах для компонент](/guide/typescript/composition-api.html#typing-component-template-refs) <sup class="vt-badge ts" />

</div>
<div class="options-api">

Параметр `expose` можна використовувати для обмеження доступу до дочірнього екземпляра:

```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    return {
      publicData: 'foo',
      privateData: 'bar'
    }
  },
  methods: {
    publicMethod() {
      /* ... */
    },
    privateMethod() {
      /* ... */
    }
  }
}
```

У наведеному вище прикладі батьківський компонент, який посилається на цей компонент через референцію в шаблоні, матиме доступ лише до `publicData` і `publicMethod`.

</div>
