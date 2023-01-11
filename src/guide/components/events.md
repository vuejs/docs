<script setup>
import { onMounted } from 'vue'

if (typeof window !== 'undefined') {
  const hash = window.location.hash

  // Документація для v-model раніше була частиною цієї сторінки. Переспрямування застарілих посилань.
  if ([
    '#usage-with-v-model',
    '#v-model-arguments',
    '#multiple-v-model-bindings',
    '#handling-v-model-modifiers'
  ].includes(hash)) {
    onMounted(() => {
      window.location = './v-model.html' + hash
    })
  }
}
</script>
# Події компонентів {#component-events}

> Ця сторінка передбачає, що ви вже прочитали [основи компонентів](/guide/essentials/component-basics). Прочитайте це спочатку, якщо ви новачок у компонентах.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/defining-custom-events-emits" title="Безкоштовний урок Vue.js про визначення спеціальних подій"/>
</div>

## Випромінювання та прослуховування подій {#emitting-and-listening-to-events}

Компонент може випромінювати спеціальні події безпосередньо у виразах шаблону (наприклад, в обробнику `v-on`), використовуючи вбудований метод `$emit`:

```vue-html
<!-- MyComponent -->
<button @click="$emit('someEvent')">натиснути</button>
```

<div class="options-api">

Метод `$emit()` також доступний в екземплярі компонента як `this.$emit()`:

```js
export default {
  methods: {
    submit() {
      this.$emit('someEvent')
    }
  }
}
```

</div>

Батьки можуть прослуховувати це за допомогою `v-on`:

```vue-html
<MyComponent @some-event="callback" />
```

Модифікатор `.once` також підтримується слухачами подій компонентів:

```vue-html
<MyComponent @some-event.once="callback" />
```

Подібно до компонентів і атрибутів, імена подій забезпечують автоматичне перетворення регістру. Зауважте, що ми створили подію camelCase, але можемо прослухати її за допомогою kebab-case слухача у батьківських компонентах. Як і у випадку з [регістром імені реквізиту](/guide/components/props.html#prop-name-casing), ми радимо використовувати в шаблонах прослуховувачі подій kebab-case.

:::tip
На відміну від нативних подій DOM, події, створені компонентом, **не** випливають. Ви можете прослуховувати лише події, які випромінює прямий дочірній компонент. Якщо є потреба в спілкуванні між братськими або глибоко вкладеними компонентами, використовуйте зовнішню шину подій або [глобальне рішення для керування станом](/guide/scaling-up/state-management.html).
:::

## Аргументи події {#event-arguments}

Іноді корисно випромінювати конкретне значення з подією. Наприклад, ми можемо захотіти, щоб компонент `<BlogPost>` відповідав за те, на скільки збільшити текст. У таких випадках ми можемо передати додаткові аргументи в `$emit`, щоб надати це значення:

```vue-html
<button @click="$emit('increaseBy', 1)">
  Збільшити на 1
</button>
```

Тоді, коли ми прослуховуємо подію в батьківському компоненті, ми можемо використовувати вбудовану функцію-стрілку як прослуховувач, що дозволяє отримати доступ до аргументу події:

```vue-html
<MyButton @increase-by="(n) => count += n" />
```

Або, якщо обробником події є метод:

```vue-html
<MyButton @increase-by="increaseCount" />
```

Тоді значення буде передано як перший параметр цього методу:

<div class="options-api">

```js
methods: {
  increaseCount(n) {
    this.count += n
  }
}
```

</div>
<div class="composition-api">

```js
function increaseCount(n) {
  count.value += n
}
```

</div>

:::tip
Усі додаткові аргументи, передані в `$emit()` після назви події будуть перенаправлені слухачу. Наприклад, за допомогою `$emit('foo', 1, 2, 3)` функція слухача отримає три аргументи.
:::

## Оголошення переданих подій {#declaring-emitted-events}

Компонент може явно оголосити події, які будуть випромінюватись за допомогою макросу <span class="composition-api">[`defineEmits()`](/api/sfc-script-setup.html#defineprops-defineemits)</span><span class="options-api">параметр [`emits`](/api/options-state.html#emits)</span>:

<div class="composition-api">

```vue
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

Метод `$emit`, який ми використовували в `<template>`, недоступний у розділі `<script setup>` компонента, але `defineEmits()` повертає еквівалентну функцію, яку ми можемо натомість використати:

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

Макрос `defineEmits()` **не можна** використовувати всередині функції, його потрібно розмістити безпосередньо в `<script setup>`, як у прикладі вище.

Якщо ви використовуєте явну функцію `setup` замість `<script setup>`, події слід оголошувати за допомогою опції [`emit`](/api/options-state.html#emits) і `emit` функція доступна в контексті `setup()`:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

Як і інші властивості контексту `setup()`, `emit` можна безпечно деструктурувати:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

</div>
<div class="options-api">

```js
export default {
  emits: ['inFocus', 'submit']
}
```

</div>

Параметр `emits` також підтримує синтаксис об’єкта, який дозволяє виконувати перевірку даних випромінюваних подій:

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  submit(payload) {
    // повертає `true` або `false` для вказівки
    // чи пройшла/не пройшла перевірка
  }
})
</script>
```

Якщо ви використовуєте TypeScript з `<script setup>`, також можна оголосити події за допомогою суто анотацій:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

Детальніше: [типізація події компонентів](/guide/typescript/composition-api.html#typing-component-emits) <sup class="vt-badge ts" />

</div>
<div class="options-api">

```js
export default {
  emits: {
    submit(payload) {
      // повертає `true` або `false` для вказівки
      // чи пройшла/не пройшла перевірка
    }
  }
}
```

Дивіться також: [типізація події компонентів](/guide/typescript/options-api.html#typing-component-emits) <sup class="vt-badge ts" />

</div>

Незважаючи на те, що це необов’язково, рекомендується визначати всі випромінювані події, щоб краще задокументувати, як має працювати компонент. Це також дозволяє Vue виключати відомих слухачів із [прохідних атрибутів](/guide/components/attrs.html#v-on-listener-inheritance), уникаючи крайніх випадків, спричинених подіями DOM, які вручну випромінюються стороннім кодом.

:::tip
Якщо власну подію (наприклад, `click`) визначено в параметрі `emits`, слухач тепер стежитиме лише за подіями `click`, що випромінюються компонентом, і більше не відповідатиме на власні події `click`.
:::

## Перевірка подій {#events-validation}

Подібно до перевірки типу реквізитів, подію можна перевірити, якщо її визначено за допомогою синтаксису об’єкта, а не синтаксису масиву.

Щоб додати перевірку, події призначається функція, яка отримує аргументи, передані в <span class="options-api">`this.$emit`</span><span class="composition-api">`emit` </span> викликає і повертає логічне значення, щоб вказати, подія дійсна чи ні.

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  // Без перевірки
  click: null,

  // Перевірка події надсилання
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Недійсні данні події надсилання!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

</div>
<div class="options-api">

```js
export default {
  emits: {
    // Без перевірки
    click: null,

    // Перевірка події надсилання
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Недійсні данні події надсилання!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
}
```

</div>
