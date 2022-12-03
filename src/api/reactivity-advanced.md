# Реактивність: Розширено {#reactivity-api-advanced}

## shallowRef() {#shallowref}

Неглибока версія [`ref()`](./reactivity-core.html#ref).

- **Тип**

  ```ts
  function shallowRef<T>(value: T): ShallowRef<T>

  interface ShallowRef<T> {
    value: T
  }
  ```

- **Подробиці**

  На відміну від `ref()`, внутрішнє значення неглибокої референції зберігається та показується як є, і не буде зроблено глибоко реактивним. Реактивним є лише зміна `.value`.

  `shallowRef()` зазвичай використовується для оптимізації продуктивності великих структур даних або інтеграції із зовнішніми системами керування станом.

- **Приклад**

  ```js
  const state = shallowRef({ count: 1 })

  // НЕ ініціює зміни
  state.value.count = 2

  // ініціює зміни
  state.value = { count: 2 }
  ```

- **Також до вашої уваги:**
  - [Гід - Зменшення витрат на реактивність для великих незмінних структур](/guide/best-practices/performance.html#reduce-reactivity-overhead-for-large-immutable-structures)
  - [Гід - Інтеграція з зовнішніми системами стану](/guide/extras/reactivity-in-depth.html#integration-with-external-state-systems)

## triggerRef() {#triggerref}

Примусове ініціювання ефектів, які залежать від [shallow ref](#shallowref). Це зазвичай використовується після внесення глибоких змін у внутрішнє значення неглибокої референції.

- **Тип**

  ```ts
  function triggerRef(ref: ShallowRef): void
  ```

- **Приклад**

  ```js
  const shallow = shallowRef({
    greet: 'Hello, world'
  })

  // Виведе "Hello, world" один раз при першому проході
  watchEffect(() => {
    console.log(shallow.value.greet)
  })

  // Це не ініціює ефект, оскільки референція неглибока
  shallow.value.greet = 'Hello, universe'

  // Виведе "Hello, universe"
  triggerRef(shallow)
  ```

## customRef() {#customref}

Створює референцію користувача з можливістю явно контролювати відстеження залежностей і керувати викликом оновлень

- **Тип**

  ```ts
  function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

  Тип CustomRefFactory<T> = (
    track: () => void,
    trigger: () => void
  ) => {
    get: () => T
    set: (value: T) => void
  }
  ```

- **Подробиці**

  `customRef()` очікує функцію-фабрику, яка отримує аргументами функції `track` і `trigger` та має повертати об’єкт за допомогою методів `get` і `set`.

  Загалом, `track()` має викликатися всередині `get()`, а `trigger()` має викликатися в `set()`. Однак у вас є повний контроль над тим, коли вони повинні бути викликані, і чи мають вони бути викликані взагалі.

- **Приклад**

  Створення відкладеної референції, яке оновлює значення лише через певний час очікування після останнього виклику set:

  ```js
  import { customRef } from 'vue'

  export function useDebouncedRef(value, delay = 200) {
    let timeout
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            value = newValue
            trigger()
          }, delay)
        }
      }
    })
  }
  ```

  Використання в компоненті:

  ```vue
  <script setup>
  import { useDebouncedRef } from './debouncedRef'
  const text = useDebouncedRef('hello')
  </script>

  <template>
    <input v-model="text" />
  </template>
  ```

  [Спробуйте в пісочниці](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZURlYm91bmNlZFJlZiB9IGZyb20gJy4vZGVib3VuY2VkUmVmLmpzJ1xuY29uc3QgdGV4dCA9IHVzZURlYm91bmNlZFJlZignaGVsbG8nLCAxMDAwKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHA+XG4gICAgVGhpcyB0ZXh0IG9ubHkgdXBkYXRlcyAxIHNlY29uZCBhZnRlciB5b3UndmUgc3RvcHBlZCB0eXBpbmc6XG4gIDwvcD5cbiAgPHA+e3sgdGV4dCB9fTwvcD5cbiAgPGlucHV0IHYtbW9kZWw9XCJ0ZXh0XCIgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsImRlYm91bmNlZFJlZi5qcyI6ImltcG9ydCB7IGN1c3RvbVJlZiB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZURlYm91bmNlZFJlZih2YWx1ZSwgZGVsYXkgPSAyMDApIHtcbiAgbGV0IHRpbWVvdXRcbiAgcmV0dXJuIGN1c3RvbVJlZigodHJhY2ssIHRyaWdnZXIpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0KCkge1xuICAgICAgICB0cmFjaygpXG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgfSxcbiAgICAgIHNldChuZXdWYWx1ZSkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dClcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHZhbHVlID0gbmV3VmFsdWVcbiAgICAgICAgICB0cmlnZ2VyKClcbiAgICAgICAgfSwgZGVsYXkpXG4gICAgICB9XG4gICAgfVxuICB9KVxufSJ9)

## shallowReactive() {#shallowreactive}

Неглибока версія [`reactive()`](./reactivity-core.html#reactive).

- **Тип**

  ```ts
  function shallowReactive<T extends object>(target: T): T
  ```

- **Подробиці**

  На відміну від `reactive()`, глибокого перетворення немає: лише властивості кореневого рівня є реактивними для неглибокого реактивного об'єкта. Значення властивостей зберігаються та показуються як є - це також означає, що властивості зі значеннями референції **не** будуть автоматично розгорнуті.

  :::warning Використовуйте з обережністю
   Неглибокі структури даних слід використовувати лише для стану кореневого рівня в компоненті. Уникайте вкладення його в глибокий реактивний об’єкт, оскільки це створює дерево з непослідовною поведінкою реактивності, яку може бути важко зрозуміти та налагодити.
  :::

- **Приклад**

  ```js
  const state = shallowReactive({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // власні властивості змін стану є реактивними
  state.foo++

  // ...але не перетворює вкладені об’єкти
  isReactive(state.nested) // false

  // НЕ реактивний
  state.nested.bar++
  ```

## shallowReadonly() {#shallowreadonly}

Неглибока версія [`readonly()`](./reactivity-core.html#readonly).

- **Тип**

  ```ts
  function shallowReadonly<T extends object>(target: T): Readonly<T>
  ```

- **Подробиці**

  На відміну від `readonly()`, глибокого перетворення немає: лише властивості кореневого рівня стають доступними для читання. Значення властивостей зберігаються та показуються як є - це також означає, що властивості зі значеннями референції **не** будуть автоматично розгорнуті.

  :::warning Використовуйте з обережністю
  Неглибокі структури даних слід використовувати лише для стану кореневого рівня в компоненті. Уникайте вкладення його в глибокий реактивний об’єкт, оскільки це створює дерево з непослідовною поведінкою реактивності, яку може бути важко зрозуміти та налагодити..
  :::

- **Приклад**

  ```js
  const state = shallowReadonly({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // зміна власних властивостей стану не вдасться
  state.foo++

  // ...але працює з вкладеними об’єктами
  isReadonly(state.nested) // false

  // працює
  state.nested.bar++
  ```

## toRaw() {#toraw}

Повертає необроблений оригінальний об’єкт із Vue проксі.

- **Тип**

  ```ts
  function toRaw<T>(proxy: T): T
  ```

- **Подробиці**

  `toRaw()` може повертати оригінальний об'єкт із проксі, які створенні за допомогою [`reactive()`](./reactivity-core.html#reactive), [`readonly()`](./reactivity-core.html#readonly), [`shallowReactive()`](#shallowreactive) або [`shallowReadonly()`](#shallowreadonly).

  Застосовується в крайньому разі, коли потрібне лише читання без доступу/відстеження або запис без ініціювання змін. **Не** рекомендується зберігати постійне посилання на оригінальний об’єкт. Використовуйте з обережністю.

- **Приклад**

  ```js
  const foo = {}
  const reactiveFoo = reactive(foo)

  console.log(toRaw(reactiveFoo) === foo) // true
  ```

## markRaw() {#markraw}

Позначає об’єкт таким чином, що він ніколи не буде перетворений на проксі. Повертає сам об'єкт.

- **Тип**

  ```ts
  function markRaw<T extends object>(value: T): T
  ```

- **Приклад**

  ```js
  const foo = markRaw({})
  console.log(isReactive(reactive(foo))) // false

  // також працює, якщо вкладено в інші реактивні об’єкти
  const bar = reactive({ foo })
  console.log(isReactive(bar.foo)) // false
  ```

  :::warning Використовуйте з обережністю
  `markRaw()` і неглибокі API, такі як `shallowReactive()`, дозволяють вибірково відмовитися від глибокого реактивного/тільки для читання перетворення за умовчанням та вбудовувати вихідні, непроксовані об'єкти в діаграму стану. Причини, з яких це може використовуватись:

  - Деякі значення не повинні бути реактивними. Наприклад, сторонній комплексний екземпляр класу чи об'єкт компонента Vue..

  - Пропуск проксі-перетворення може покращити продуктивність під час рендерингу великих списків із незмінними джерелами даних.

  Вони вважаються передовими, тому що опціональне вимкнення доступне лише на кореневому рівні. Якщо встановити вкладений невідзначений вихідний об'єкт у реактивний об'єкт і отримати доступ до нього, то повернеться його проксована версія. Це може призвести до **небезпеки ідентифікації**, тобто виконання операції, яка ґрунтується на ідентифікації об'єкта, але використовує як вихідну, так і проксовану версію одного і того ж об'єкта:

  ```js
  const foo = markRaw({
    nested: {}
  })

  const bar = reactive({
    // хоча `foo` позначено як необроблений, foo.nested — ні.
    nested: foo.nested
  })

  console.log(foo.nested === bar.nested) // false
  ```

  Загалом небезпека ідентифікації трапляється рідко. Однак для належного використання цих API й безпечного уникнення небезпек ідентифікації, потрібне чітке розуміння того, як працює система реактивності.

  :::

## effectScope() {#effectscope}

Створює об'єкт області дії ефекту, який може захоплювати інші реактивні ефекти (наприклад, обчислювані властивості та спостерігачі), створені всередині нього, щоб мати можливість знищити всі ці ефекти разом. Щоб отримати докладні відомості про випадки використання цього API, перегляньте відповідний [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md).

- **Тип**

  ```ts
  function effectScope(detached?: boolean): EffectScope

  interface EffectScope {
    run<T>(fn: () => T): T | undefined // undefined якщо область дії неактивна
    stop(): void
  }
  ```

- **Приклад**

  ```js
  const scope = effectScope()

  scope.run(() => {
    const doubled = computed(() => counter.value * 2)

    watch(doubled, () => console.log(doubled.value))

    watchEffect(() => console.log('Count: ', doubled.value))
  })

  // видалення всіх ефектів в області дії
  scope.stop()
  ```

## getCurrentScope() {#getcurrentscope}

Повертає поточну активну [область дії ефекту](#effectscope), якщо така є.

- **Тип**

  ```ts
  function getCurrentScope(): EffectScope | undefined
  ```

## onScopeDispose() {#onscopedispose}

Реєстрація функція зворотного виклику для активної [області дії ефекту](#effectscope). Функція зворотного виклику буде викликана, коли пов'язана з ним область дії ефекту буде зупинена.

Цей метод можна використовувати як не пов'язану з компонентами заміну `onUnmounted` в композиційних функціях, що пере використовуються, оскільки функція `setup()` кожного компонента Vue також викликається в області дії ефекту.

- **Тип**

  ```ts
  function onScopeDispose(fn: () => void): void
  ```
