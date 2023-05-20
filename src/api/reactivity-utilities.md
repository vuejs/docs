# Реактивність: Утиліти {#reactivity-api-utilities}

## isRef() {#isref}

Перевіряє, чи значення є об'єкт-референція.

- **Тип**

  ```ts
  function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
  ```

  Зауважте, що тип повернення є [предикатом типу](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates), що означає, що `isRef` можна використовувати для захисту типу :

  ```ts
  let foo: unknown
  if (isRef(foo)) {
    // тип foo звужено до Ref<unknown>
    foo.value
  }
  ```

## unref() {#unref}

Повертає внутрішнє значення, якщо аргумент є референція, інакше повертає сам аргумент. Це функція обгортка для `val = isRef(val) ? val.value : val`.

- **Тип**

  ```ts
  function unref<T>(ref: T | Ref<T>): T
  ```

- **Приклад**

  ```ts
  function useFoo(x: number | Ref<number>) {
    const unwrapped = unref(x)
    // unwrapped гарантовано буде числом
  }
  ```

## toRef() {#toref}

Можна використовувати для нормалізації значень / референцій / гетерів у референції (3.3+).

Також може використовуватися для створення референції для властивості вихідного реактивного об'єкта. Створена референція синхронізується з вихідною властивістю: зміна вихідної властивості оновить референцію, і навпаки.

- **Тип**

  ```ts
  // сигнатура нормалізації (3.3+)
  function toRef<T>(
    value: T
  ): T extends () => infer R
    ? Readonly<Ref<R>>
    : T extends Ref
    ? T
    : Ref<UnwrapRef<T>>

  // сигнатура властивості об'єкта
  function toRef<T extends object, K extends keyof T>(
    object: T,
    key: K,
    defaultValue?: T[K]
  ): ToRef<T[K]>

  type ToRef<T> = T extends Ref ? T : Ref<T>
  ```

- **Приклад**

Сигнатура нормалізації (3.3+):

```js
// повертає існуючі референції як є
toRef(existingRef)

// створює референцію лише для читання, яке викликає гетер під час доступу до .value
toRef(() => props.foo)

// створює нормальні референції з значень не-функцій
// еквівалент ref(1)
toRef(1)
```

Сигнатура властивості об'єкта:

```js
const state = reactive({
  foo: 1,
  bar: 2
})

// двостороння референція, яка синхронізується з оригінальною властивістю
const fooRef = toRef(state, 'foo')

// зміна рефернції оновлює оригінал
fooRef.value++
console.log(state.foo) // 2

// зміна оригіналу також оновлює рефернцію
state.foo++
console.log(fooRef.value) // 3
```

Зауважте, що це відрізняється від:

```js
const fooRef = ref(state.foo)
```

Наведена вище референція **не** синхронізується з `state.foo`, оскільки `ref()` отримує звичайне числове значення.

`toRef()` корисна, коли ви хочете передати референцію реквізита до композиційної функції:

```vue
<script setup>
import { toRef } from 'vue'

const props = defineProps(/* ... */)

// перетворити `props.foo` в референцію, а потім передати в
// композиційну функцію
useSomeFeature(toRef(props, 'foo'))

// синтаксис гетеру - рекомендовано в 3.3+
useSomeFeature(toRef(() => props.foo))
</script>
```

Коли `toRef` використовується з реквізитами компонента, звичайні обмеження щодо зміни реквізитів все ще діють. Спроба призначити нове значення референції еквівалентна спробі безпосередньо змінити реквізит і це не дозволяється. У цьому випадку ви можете використовувати [`computed`](./reactivity-core#computed) з `get` і `set` натомість. Додаткову інформацію див. у гіді [використання `v-model` з компонентами](/guide/components/v-model).

У разі використання сигнатури властивості об'єкта `toRef()` поверне придатну референцію, навіть якщо властивість джерела наразі не існує. Це дає змогу працювати з необов'язковими властивостями, які не були б підібрані [`toRefs`](#torefs).

## toValue() <sup class="vt-badge" data-text="3.3+" /> {#tovalue}

Нормалізує значення / референції / гетери до значень. Це схоже на [unref()](#unref), за винятком того, що воно також нормалізує гетери. Якщо аргумент є гетером, він буде викликаний і буде повернено його значення, що повертається.

Це можна використовувати в [Композиційних функціях](/guide/reusability/composables.html), щоб нормалізувати аргумент, який може бути значенням, референцією або гетером.

- **Тип**

  ```ts
  function toValue<T>(source: T | Ref<T> | (() => T)): T
  ```

- **Приклад**

  ```js
  toValue(1) //       --> 1
  toValue(ref(1)) //  --> 1
  toValue(() => 1) // --> 1
  ```

  Нормалізація аргументів у композиційних функціях:

  ```ts
  import type { MaybeRefOrGetter } from 'vue'

  function useFeature(id: MaybeRefOrGetter<number>) {
    watch(
      () => toValue(id),
      (id) => {
        // реагувати на зміни id
      }
    )
  }

  // ця композиційна функція підтримує будь-що з наступного:
  useFeature(1)
  useFeature(ref(1))
  useFeature(() => 1)
  ```

## toRefs() {#torefs}

Перетворює реактивний об'єкт на звичайний об'єкт, де кожна властивість отриманого об'єкта є референцією, що вказує на відповідну властивість вихідного об'єкта. Кожне окрема референція створюється за допомогою [`toRef()`](#toref).

- **Тип**

  ```ts
  function toRefs<T extends object>(
    object: T
  ): {
    [K in keyof T]: ToRef<T[K]>
  }

  type ToRef = T extends Ref ? T : Ref<T>
  ```

- **Приклад**

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  const stateAsRefs = toRefs(state)
  /*
  Type of stateAsRefs: {
    foo: Ref<number>,
    bar: Ref<number>
  }
  */

  // Референція та вихідна властивість "зв'язані"
  state.foo++
  console.log(stateAsRefs.foo.value) // 2

  stateAsRefs.foo.value++
  console.log(state.foo) // 3
  ```

  `toRefs` корисна під час повернення реактивного об'єкта з композиційної функції, щоб використовує компонент міг деструктурувати/поширити повернутий об'єкт без втрати реактивності:

  ```js
  function useFeatureX() {
    const state = reactive({
      foo: 1,
      bar: 2
    })

    // ...логіка, яка діє на стан

    // перетворити в референції при поверненні
    return toRefs(state)
  }

  // можна деструктурувати без втрати реактивності
  const { foo, bar } = useFeatureX()
  ```

  `toRefs` генеруватиме лише референції для властивостей, які можна перерахувати у вихідному об'єкті під час виклику. Щоб створити посилання для властивості, яка може ще не існувати, використовуйте [`toRef`](#toref).

## isProxy() {#isproxy}

Перевіряє, чи є об'єкт проксі, створеним [`reactive()`](./reactivity-core#reactive), [`readonly()`](./reactivity-core#readonly), [`shallowReactive()`](./reactivity-advanced#shallowreactive) або [`shallowReadonly()`](./reactivity-advanced#shallowreadonly).

- **Тип**

  ```ts
  function isProxy(value: unknown): boolean
  ```

## isReactive() {#isreactive}

Перевіряє, чи є об'єкт проксі, створеним [`reactive()`](./reactivity-core#reactive) або [`shallowReactive()`](./reactivity-advanced#shallowreactive).

- **Тип**

  ```ts
  function isReactive(value: unknown): boolean
  ```

## isReadonly() {#isreadonly}

Перевіряє, чи є передане значення об'єктом лише для читання. Властивості об'єкта лише для читання можуть змінюватися, але їх не можна призначати безпосередньо через переданий об'єкт.

Проксі-сервери, створені [`readonly()`](./reactivity-core#readonly) і [`shallowReadonly()`](./reactivity-advanced#shallowreadonly), вважаються лише для читання, як і [ `computed()`](./reactivity-core#computed) посилання без функції `set`.

- **Тип**

  ```ts
  function isReadonly(value: unknown): boolean
  ```
