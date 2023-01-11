# TypeScript з Композиційним API {#typescript-with-composition-api}

> Ця сторінка передбачає, що ви вже ознайомились із [Використання Vue з TypeScript](./overview).

## Типізація реквізитів компонента {#typing-component-props}

### Використання `<script setup>` {#using-script-setup}

При використанні `<script setup>`, макрос `defineProps()` підтримує визначення типів реквізитів на основі свого аргументу:

```vue
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

Це називається «декларація під час виконання», тому що аргумент, переданий у `defineProps()`, використовуватиметься як параметр `props` під час виконання.

Однак, зазвичай простіше визначити реквізити з базовими типами, за допомогою аргументу узагальнення:

```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
```

Це називається «декларація на основі типу». Компілятор намагатиметься зробити все можливе, щоб визначити еквівалентні параметри під час виконання, на основі типу аргументу. У цьому випадку наш другий приклад компілюється в ті самі параметри під час виконання, що й перший приклад.

Ви можете використовувати «декларацію на основі типу», АБО «декларацію під час виконання», але ви не можете використовувати обидва одночасно.

Ми також можемо винести типи реквізитів в окремий інтерфейс:

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

#### Синтаксичні обмеження {#syntax-limitations}

Щоб згенерувати правильний код під час виконання, необхідно щоб аргумент узагальнення для `defineProps()` був одним із наступних:

- Об’єкт літерального типу :

  ```ts
  defineProps<{
    /*... */
  }>()
  ```

- Посилання на інтерфейсу або на об’єкт літерального типу **в тому самому файлі**:

  ```ts
  interface Props {
    /* ... */
  }

  defineProps<Props>()
  ```

Інтерфейс або об’єкт літерального типу може містити посилання на типи, імпортовані з інших файлів, однак сам аргумент узагальнення, переданий у `defineProps` **не може** бути імпортованим типом:

```ts
import { Props } from './other-file'

// НЕ підтримується
defineProps<Props>()
```

Це пояснюється тим, що Vue компоненти компілюються ізольовано, а компілятор наразі не сканує імпортовані файли, щоб проаналізувати тип джерела. Це обмеження може бути знято в майбутньому випуску.

### Значення за замовчуванням для реквізитів {#props-default-values}

При використанні декларації на основі типу, для реквізитів ми втрачаємо можливість оголошувати значення за замовчуванням. Це можна вирішити макросом `withDefaults`:

```ts
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'привіт',
  labels: () => ['один', 'два']
})
```

Це буде скомпільовано до еквівалентних параметрів реквізитів `default`. Крім того, помічник `withDefaults` забезпечує перевірку типу для значень за замовчуванням і гарантує, що повернутий тип `props` має видалені додаткові прапорці для властивостей, які мають оголошені значення за замовчуванням.

Крім того, ви можете використовувати експериментальний [Reactivity Transform](/guide/extras/reactivity-transform.html):

```vue
<script setup lang="ts">
interface Props {
  name: string
  count?: number
}

// реактивне видалення для defineProps()
// значення за замовчуванням компілюється до еквівалентного параметру під час виконання
const { name, count = 100 } = defineProps<Props>()
</script>
```

Ця поведінка наразі вимагає [явно opt-in](/guide/extras/reactivity-transform.html#explicit-opt-in).

### Без `<script setup>` {#without-script-setup}

Якщо не використовувати `<script setup>`, то необхідно використовувати `defineComponent()` щоб увімкнути визначення типу реквізитів. Тип реквізитів, який переданий до `setup()`, визначається з параметру `props`.

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: String
  },
  setup(props) {
    props.message // <-- тип: string
  }
})
```

### Складні типи реквізитів {#complex-prop-types}

За допомогою декларації на основі типу, реквізит може використовувати складний тип, як і будь-який інший тип:

```vue
<script setup lang="ts">
interface Book {
  title: string
  author: string
  year: number
}

const props = defineProps<{
  book: Book
}>()
</script>
```

Для декларації під час виконання ми можемо використовувати утилітарний тип `PropType`:

```ts
import type { PropType } from 'vue'

const props = defineProps({
  book: Object as PropType<Book>
})
```

Це працює приблизно так само, якщо ми безпосередньо вказуємо опцію `props`:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    book: Object as PropType<Book>
  }
})
```

Параметр `props` частіше використовується з Options API, тому ви знайдете докладніші приклади в посібнику [TypeScript with Options API](/guide/typescript/options-api.html#typing-component-props) . Техніки, показані в цих прикладах, також застосовуються до декларацій під час виконання за допомогою `defineProps()`.

## Типізація випромінювань компонента {#typing-component-emits}

В `<script setup>`, `emit`- функцію також можна типізувати за допомогою, декларації під час виконання, АБО декларації на основі типу:

```vue
<script setup lang="ts">
// під час виконання
const emit = defineEmits(['change', 'update'])

// на основі типу
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

Аргумент має бути літерального типу з [сигнатурами виклику](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures). Літеральний тип буде використано як тип повернення функції `emit`. Як ми бачимо, оголошення типу дає нам набагато більш детальний контроль над обмеженнями типу випромінювання подій.

Якщо не використовувати `<script setup>`, `defineComponent()` може визначити дозволені події для функції `emit`, представленої в контексті `setup`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['change'],
  setup(props, { emit }) {
    emit('change') // <-- перевірка типу / автодоповнення
  }
})
```

## Типізація ref() {#typing-ref}

Тип референції визначається із початкового значення:

```ts
import { ref } from 'vue'

// визначений тип: Ref<number>
const year = ref(2020)

// => TS Помилка: тип "string" не можна призначити типу "number".
year.value = '2020'
```

Іноді нам може знадобитися вказати складні типи для внутрішніх значень референції. Ми можемо зробити це за допомогою типу `Ref`:

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // ok!
```

Або передаючи аргумент узагальнення під час виклику `ref()`, щоб замінити визначення за замовчуванням:

```ts
// отриманий тип: Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // ok!
```

Якщо ви вкажете аргумент узагальнення, але опустите початкове значення, то результатом буде об'єднаний тип, який включає `undefined`:

```ts
// визначений тип: Ref<number | undefined>
const n = ref<number>()
```

## Типізація `reactive()` {#typing-reactive}

`reactive()` також неявно визначає тип зі свого аргументу:

```ts
import { reactive } from 'vue'

// inferred type: { title: string }
const book = reactive({ title: 'Vue 3 Guide' })
```

Щоб явно встановити тип `reactive` властивості, ми можемо використовувати інтерфейси:

```ts
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 Guide' })
```

:::tip
Не рекомендується використовувати аргумент узагальнення `reactive()`, оскільки при обробці він розвертає вкладені референції й тип при повернені буде відрізнятися від аргументу узагальнення.
:::

## Типізація `computed()` {#typing-computed}

`computed()` визначає свій тип на основі значення, яке повертає гетер:

```ts
import { ref, computed } from 'vue'

const count = ref(0)

// визначений тип: ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Помилка: Властивість 'split' не є типом "number"
const result = double.value.split('')
```

Ви також можете вказати, явний тип, за допомогою аргументу узагальнення:

```ts
const double = computed<number>(() => {
  // помилка типу, якщо не повертається число
})
```

## Типізація обробників подій {#typing-event-handlers}

При роботі з нативними подіями DOM, буде корисним правильно типізувати аргумент, який ми передаємо обробнику. Розгляньмо це на прикладі:

```vue
<script setup lang="ts">
function handleChange(event) {
  // `event` неявно має тип `any`
  console.log(event.target.value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

Без анотації типу, аргумент `event` неявно матиме тип `any`. Це також призведе до помилки TS, якщо `"strict": true`, або `"noImplicitAny": true` вказані в `tsconfig.json`. Тому рекомендується явно анотувати аргументи обробників подій. Крім того, вам може знадобитися явно вказати властивості для `event`:

```ts
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
```

## Типізація Provide/Inject {#typing-provide-inject}

Provide та Inject зазвичай виконуються в окремих компонентах. Щоб правильно типізувати значення Inject, Vue надає інтерфейс `InjectionKey`, який є універсальним типом і розширює `Symbol`. Його можна використовувати для синхронізації типу введеного значення між постачальником і споживачем:

```ts
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') // надання не string значення призведе до помилки

const foo = inject(key) // тип foo: string | undefined
```

Рекомендовано розмістити ключ ін'єкції в окремому файлі, щоб його можна було імпортувати в кількох компонентах.

Під час використання string ключів ін'єкції, тип введеного значення буде `unknown`, і його потрібно явно оголосити за допомогою аргументу узагальнення:

```ts
const foo = inject<string>('foo') // тип: string | undefined
```

Зауважте, що введене значення все ще може бути `undefined`, оскільки немає гарантії, що постачальник надасть це значення під час виконання.

Тип `undefined` можна видалити, вказавши значення за замовчуванням:

```ts
const foo = inject<string>('foo', 'bar') // тип: string
```

Якщо ви впевнені, що значення завжди надається, ви також можете примусово привести значення:

```ts
const foo = inject('foo') as string
```

## Типізація референцій в шаблонах {#typing-template-refs}

Референції в шаблонах мають бути створені з явним аргументом узагальнення, та початковим значенням `null`:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```

Зверніть увагу, що для досягнення суворішої перевірки типу, необхідно використовувати додаткове зв'язування, або захистити тип під час доступу до `el.value`. Це пояснюється тим, що початкове значення референції дорівнює `null`, доки компонент не буде змонтовано. і вона також буде встановлена в `null`, якщо елемент, на який вона посилається, демонтується за допомогою `v-if`.

## Типізація референцій в шаблонах для компонент {#typing-component-template-refs}

Іноді вам може знадобитися анотувати шаблон референції для дочірнього компонента, щоб викликати його публічний метод. Наприклад, у нас є дочірній компонент `MyModal` з методом, який відкриває модальне вікно:

```vue
<!-- MyModal.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const isContentShown = ref(false)
const open = () => (isContentShown.value = true)

defineExpose({
  open
})
</script>
```

Щоб отримати екземпляр типу `MyModal`, нам потрібно спочатку отримати його тип за допомогою `typeof`, а потім використати вбудовану утиліту TypeScript `InstanceType`, щоб отримати його тип:

```vue{5}
<!-- App.vue -->
<script setup lang="ts">
import MyModal from './MyModal.vue'

const modal = ref<InstanceType<typeof MyModal> | null>(null)

const openModal = () => {
  modal.value?.open()
}
</script>
```

Зверніть увагу, якщо ви хочете використовувати цю техніку у файлах TypeScript, замість одно-файлових компонент, вам потрібно ввімкнути [Режим Takeover](./overview.html#volar-takeover-mode) у Volar.
