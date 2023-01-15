# Реактивність: Основи {#reactivity-api-core}

:::info Також до вашої уваги
Щоб краще зрозуміти основи реактивності, рекомендується прочитати наступні розділи гіда:

- [Основи реактивності](/guide/essentials/reactivity-fundamentals.html) (з вподобанням API, встановленому як Композиційний)
- [Реактивність у глибині](/guide/extras/reactivity-in-depth.html)
  :::

## ref() {#ref}

Приймає внутрішнє значення та повертає реактивний і змінний об’єкт-референцію, який має єдину властивість `.value`, яка вказує на внутрішнє значення.

- **Тип**

  ```ts
  function ref<T>(value: T): Ref<UnwrapRef<T>>

  interface Ref<T> {
    value: T
  }
  ```

- **Подробиці**

  Об’єкт-референція є змінним, тобто ви можете призначати нові значення `.value`. Він також є реактивним, тобто будь-які операції читання `.value` відстежуються, а операції запису викликають відповідні ефекти.

  Якщо об'єкту присвоєно значення референції, об’єкт стає глибоко реактивним за допомогою [reactive()](#reactive). Це також означає, що якщо об’єкт містить вкладені референції, вони будуть глибоко розгорнуті.

  Щоб уникнути глибокого перетворення, натомість використовуйте [`shallowRef()`](./reactivity-advanced.html#shallowref).

- **Приклад**

  ```js
  const count = ref(0)
  console.log(count.value) // 0

  count.value++
  console.log(count.value) // 1
  ```

- **Також до вашої уваги:**
  - [Гід - Реактивні змінні використовуючи `ref()`](/guide/essentials/reactivity-fundamentals.html#reactive-variables-with-ref)
  - [Гід - Типізація `ref()`](/guide/typescript/composition-api.html#typing-ref) <sup class="vt-badge ts" />

## computed() {#computed}

Бере getter функцію та повертає реактивний об’єкт [референцію](#ref) лише для читання, для повернутого значення з getter. Також можна повернути об’єкт використовуючи функції `get` і `set` для створення об'єкта референції з можливістю запису.

- **Тип**

  ```ts
  // лише для читання
  function computed<T>(
    getter: () => T,
    // дивіться посилання "Налагодження обчислюваних властивостей" нижче
    debuggerOptions?: DebuggerOptions
  ): Readonly<Ref<Readonly<T>>>

  // можливість запису
  function computed<T>(
    options: {
      get: () => T
      set: (value: T) => void
    },
    debuggerOptions?: DebuggerOptions
  ): Ref<T>
  ```

- **Приклад**

  Створення обчислюваної референції лише для читання:

  ```js
  const count = ref(1)
  const plusOne = computed(() => count.value + 1)

  console.log(plusOne.value) // 2

  plusOne.value++ // помилка
  ```

  Створення обчислюваної референції з можливістю запису:

  ```js
  const count = ref(1)
  const plusOne = computed({
    get: () => count.value + 1,
    set: (val) => {
      count.value = val - 1
    }
  })

  plusOne.value = 1
  console.log(count.value) // 0
  ```

  Налагодження:

  ```js
  const plusOne = computed(() => count.value + 1, {
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **Також до вашої уваги:**
  - [Гід - Обчислювані властивості](/guide/essentials/computed.html)
  - [Гід - Налагодження обчислюваних властивостей](/guide/extras/reactivity-in-depth.html#computed-debugging)
  - [Гід - Типізація `computed()`](/guide/typescript/composition-api.html#typing-computed) <sup class="vt-badge ts" />

## reactive() {#reactive}

Повертає реактивний проксі об'єкта.

- **Тип**

  ```ts
  function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
  ```

- **Подробиці**

  Реактивне перетворення є «глибоким»: воно впливає на всі вкладені властивості. Реактивний об’єкт також глибоко розгортає будь-які властивості, які є [референціями](#ref), зберігаючи реактивність.

  Слід також зазначити, що розгортання референції не виконується, коли до референції звертаються як до елемента реактивного масиву або типу колекції, наприклад `Map`.

  Щоб уникнути глибокого перетворення та зберегти реактивність лише на кореневому рівні, замість цього використовуйте [shallowReactive()](./reactivity-advanced.html#shallowreactive).

  Повернений об’єкт і його вкладені об'єкти обгорнуті [ES проксі](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) й **не** дорівнюють оригінальним об'єктам. Рекомендується працювати виключно з реактивним проксі та уникати покладань на оригінальний об’єкт.

- **Приклад**

  Створення реактивного об'єкта:

  ```js
  const obj = reactive({ count: 0 })
  obj.count++
  ```

  Розгортання референції:

  ```ts
  const count = ref(1)
  const obj = reactive({ count })

  // референцію буде розгорнуто
  console.log(obj.count === count.value) // true

  // буде оновленно `obj.count`
  count.value++
  console.log(count.value) // 2
  console.log(obj.count) // 2

  // також буде оновленно `count` референцію
  obj.count++
  console.log(obj.count) // 3
  console.log(count.value) // 3
  ```

  Зверніть увагу, що референції **не** розгортаються, коли до них звертаються як до елементів масиву або колекції:

  ```js
  const books = reactive([ref('Vue 3 Guide')])
  // потрібно .value тут
  console.log(books[0].value)

  const map = reactive(new Map([['count', ref(0)]]))
  // потрібно .value тут
  console.log(map.get('count').value)
  ```

  При призначенні [референції](#ref) властивості `reactive`, ця референція також буде автоматично розгорнута:

  ```ts
  const count = ref(1)
  const obj = reactive({})

  obj.count = count

  console.log(obj.count) // 1
  console.log(obj.count === count.value) // true
  ```

- **Також до вашої уваги:**
  - [Гід - Основи реактивності](/guide/essentials/reactivity-fundamentals.html)
  - [Гід - Типізація `reactive()`](/guide/typescript/composition-api.html#typing-reactive) <sup class="vt-badge ts" />

## readonly() {#readonly}

Бере об’єкт (реактивний або звичайний) або [референцію](#ref) і повертає проксі лише для читання оригіналу.

- **Тип**

  ```ts
  function readonly<T extends object>(
    target: T
  ): DeepReadonly<UnwrapNestedRefs<T>>
  ```

- **Подробиці**

  Проксі лише для читання є глибоким: будь-яка вкладена властивість, до якої здійснюється доступ, також буде лише для читання. Він також має таку саму поведінку розгортання референцій, що й `reactive()`, за винятком того, що розгорнуті значення також будуть доступні лише для читання.

   Щоб уникнути глибокого перетворення, натомість використовуйте [shallowReadonly()](./reactivity-advanced.html#shallowreadonly).

- **Приклад**

  ```js
  const original = reactive({ count: 0 })

  const copy = readonly(original)

  watchEffect(() => {
    // працює для відстеження реактивності
    console.log(copy.count)
  })

  // зміна оригіналу призведе до спостерігачів, які покладаються на копію
  original.count++

  // зміна копії не вдасться та призведе до попередження
  copy.count++ // попередження!
  ```

## watchEffect() {#watcheffect}

Запускає функцію негайно, реактивно відстежуючи її залежності, і повторно запускає її щоразу, коли залежності змінюються.

- **Тип**

  ```ts
  function watchEffect(
    effect: (onCleanup: OnCleanup) => void,
    options?: WatchEffectOptions
  ): StopHandle

  type OnCleanup = (cleanupFn: () => void) => void

  interface WatchEffectOptions {
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **Подробиці**

  Перший аргумент — функція ефекту, яку потрібно запустити. Функція ефекту отримує функцію, яку можна використовувати для реєстрації зворотного виклику очищення. Зворотний виклик очищення буде викликано безпосередньо перед наступним повторним запуском ефекту, і його можна використовувати для очищення недійсних побічних ефектів, напр. очікуваний асинхронний запит (див. приклад нижче).

  Другий аргумент — це необов'язковий об’єкт параметрів, який можна використовувати для налаштування часу спрацювання ефекту або для налагодження залежностей ефекту.

  За замовчуванням спостерігачі запускаються безпосередньо перед рендерингом компонента. Налаштування `flush: 'post'` відкладе спостерігач до завершення рендерингу компонента. Додаткову інформацію див. у розділі [час спрацювання](/guide/essentials/watchers.html#callback-flush-timing). У рідкісних випадках може знадобитися негайно запустити спостерігач, коли змінюється реактивна залежність, напр. зробити кеш недійсним. Цього можна досягти за допомогою `flush: 'sync'`. Однак цей параметр слід використовувати з обережністю, оскільки він може призвести до проблем із продуктивністю та узгодженістю даних, якщо одночасно оновлюється кілька властивостей.

  Повернене значення є функцією обробника, яку можна викликати, щоб зупинити повторний запуск ефекту.

- **Приклад**

  ```js
  const count = ref(0)

  watchEffect(() => console.log(count.value))
  // -> logs 0

  count.value++
  // -> logs 1
  ```

  Очищення побічних ефектів:

  ```js
  watchEffect(async (onCleanup) => {
    const { response, cancel } = doAsyncWork(id.value)
    // `cancel` буде викликано, якщо `id` зміниться
    // тому попередній запит, що очікує на розгляд, буде скасовано
    // якщо він ще не завершений
    onCleanup(cancel)
    data.value = await response
  })
  ```

  Зупинка спостерігача:

  ```js
  const stop = watchEffect(() => {})

  // коли спостерігач більше не потрібен:
  stop()
  ```

  Параметри:

  ```js
  watchEffect(() => {}, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **Також до вашої уваги**:
  - [Гід - Спостерігачі](/guide/essentials/watchers.html#watcheffect)
  - [Гід - Налагодження спостерігача](/guide/extras/reactivity-in-depth.html#watcher-debugging)

## watchPostEffect() {#watchposteffect}

Псевдонім [`watchEffect()`](#watcheffect) з параметром `flush: 'post'`.

## watchSyncEffect() {#watchsynceffect}

Псевдонім [`watchEffect()`](#watcheffect) з параметром `flush: 'sync'`.

## watch() {#watch}

Спостерігає за одним або кількома реактивними джерелами даних і викликає функцію зворотного виклику, коли джерела змінюються.

- **Тип**

  ```ts
  // спостерігає за одним джерелом
  function watch<T>(
    source: WatchSource<T>,
    callback: WatchCallback<T>,
    options?: WatchOptions
  ): StopHandle

  // спостерігає за кількома джерелами
  function watch<T>(
    sources: WatchSource<T>[],
    callback: WatchCallback<T[]>,
    options?: WatchOptions
  ): StopHandle

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type WatchSource<T> =
    | Ref<T> // референція
    | (() => T) // getter
    | T extends object
    ? T
    : never // реактивний об'єкт

  interface WatchOptions extends WatchEffectOptions {
    immediate?: boolean // за замовчуванням: false
    deep?: boolean // за замовчуванням: false
    flush?: 'pre' | 'post' | 'sync' // за замовчуванням: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }
  ```

  > Типи спрощено для зручності читання.

- **Подробиці**

  `watch()` за замовчуванням є відкладеним, тобто функція зворотного виклику викликається лише тоді, коли змінюється джерело, за яким ведеться спостереження.

  Першим аргументом є **джерело** спостерігача. Джерелом може бути одне з наступного:

  - getter функція, яка повертає значення
  - Референція
  - Реактивний об’єкт
  - ...або масив із зазначених вище.

  Другий аргумент — зворотний виклик, який буде викликаний, коли джерело змінюється. Зворотний виклик отримує три аргументи: нове значення, старе значення та функцію для реєстрації зворотного виклику очищення побічного ефекту. Зворотний виклик очищення буде викликано безпосередньо перед наступним повторним запуском ефекту, і його можна використовувати для очищення недійсних побічних ефектів, напр. очікуваний асинхронний запит.

  Під час перегляду кількох джерел зворотний виклик отримує два масиви, що містять нові/старі значення, що відповідають вихідному масиву.

  Третій необов'язковий аргумент - це об'єкт параметрів, який підтримує такі параметри:

  - **`immediate`**: активувати зворотний виклик негайно після створення спостерігача. Під час першого виклику старе значення буде `undefined`.
   - **`deep`**: примусовий глибокий обхід джерела, якщо це об’єкт, так що зворотний виклик запускає глибокі зміни. Перегляньте [Глибинні спостерігачі](/guide/essentials/watchers.html#deep-watchers).
   - **`flush`**: регулює час спрацювання зворотного виклику. Перегляньте [Час спрацювання](/guide/essentials/watchers.html#callback-flush-timing) і [`watchEffect()`](/api/reactivity-core.html#watcheffect).
   - **`onTrack / onTrigger`**: налагодити залежності спостерігача. Перегляньте [Налагодження спостерігача](/guide/extras/reactivity-in-depth.html#watcher-debugging).

  У порівнянні з [`watchEffect()`](#watcheffect), `watch()` дозволяє нам:

  - Виконувати побічний ефект відкладено;
  - Бути більш конкретним щодо того, який стан повинен ініціювати спостерігач для повторного запуску;
  - Отримувати доступ як до попереднього, так і до поточного значення стану спостереження.

- **Приклад**

  Спостереження за getter:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state.count,
    (count, prevCount) => {
      /* ... */
    }
  )
  ```

  Спостереження за референцією:

  ```js
  const count = ref(0)
  watch(count, (count, prevCount) => {
    /* ... */
  })
  ```

  Під час спостереження за кількома джерелами зворотний виклик отримує масиви, що містять нові/старі значення, що відповідають вихідному масиву:

  ```js
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  })
  ```

  Під час використання джерела getter, спостерігач спрацьовує, лише якщо значення, що повертається, змінилося. Якщо ви хочете, щоб зворотний виклик запускався навіть при глибоких змінах, вам потрібно явно перевести спостерігач у глибокий режим за допомогою `{ deep: true }`. Зауважте, що в глибокому режимі нове і старе значення будуть одним і тим же об'єктом, якщо зворотний виклик був ініційований глибокою зміною:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state,
    (newValue, oldValue) => {
      // newValue === oldValue
    },
    { deep: true }
  )
  ```

  Під час безпосереднього спостереження за реактивним об'єктом спостерігач автоматично переходить у глибокий режим:

  ```js
  const state = reactive({ count: 0 })
  watch(state, () => {
    /* запускає глибоку зміну до state */
  })
  ```

  `watch()` має ті самі параметри час спрацювання та налагодження, що й [`watchEffect()`](#watcheffect):

  ```js
  watch(source, callback, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

  Зупинка спостерігача:

  ```js
  const stop = watch(source, callback)

  // when the watcher is no longer needed:
  stop()
  ```

  Очищення побічних ефектів:

  ```js
  watch(id, async (newId, oldId, onCleanup) => {
    const { response, cancel } = doAsyncWork(newId)
    // `cancel` will be called if `id` changes, cancelling
    // the previous request if it hasn't completed yet
    onCleanup(cancel)
    data.value = await response
  })
  ```

- **Також до вашої уваги**:

  - [Гід - Спостерігачі](/guide/essentials/watchers.html)
  - [Гід - Налагодження спостерігача](/guide/extras/reactivity-in-depth.html#watcher-debugging)
