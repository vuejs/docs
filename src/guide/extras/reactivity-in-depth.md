---
outline: deep
---

<script setup>
import SpreadSheet from './demos/SpreadSheet.vue'
</script>

# Реактивність поглиблено {#reactivity-in-depth}

Однією з найбільш відмінних рис Vue є ненав'язлива система реактивності. Стан компонента складається з реактивних об'єктів JavaScript. Коли ви змінюєте їх, вигляд оновлюється. Це робить управління станом простим та інтуїтивно зрозумілим, але також важливо розуміти, як це працює, щоб уникнути деяких поширених помилок. У цьому розділі ми збираємося розібратися в деяких деталях нижчого рівня системи реактивності Vue.

## Що таке реактивність? {#what-is-reactivity}

Цей термін з'являється в програмуванні досить часто в наші дні, але що мають на увазі люди, коли говорять про це? Реактивність - це парадигма програмування, яка дозволяє пристосуватися до змін декларативним чином. Канонічним прикладом, який зазвичай показують люди, оскільки він чудовий - електронна таблиця Excel:

<SpreadSheet />

Тут клітинка `A2` визначається за допомогою формули `= A0 + A1` (ви можете натиснути на `A2`, щоб переглянути або відредагувати формулу), тому електронна таблиця дає нам 3. Ніяких сюрпризів тут немає. Але якщо ви оновите `A0` або `A1`, ви помітите, що `A2` також автоматично оновлюється.

JavaScript зазвичай так не працює. Якби ми написали щось подібне в JavaScript:

```js
let A0 = 1
let A1 = 2
let A2 = A0 + A1

console.log(A2) // 3

A0 = 2
console.log(A2) // Досі 3
```

Коли ми змінюємо `A0`, `A2` не змінюється автоматично.

Отже, як би ми зробили це в JavaScript? По-перше, щоб повторно запустити код, який оновлює `A2`, давайте загорнемо його у функцію:

```js
let A2

function update() {
  A2 = A0 + A1
}
```

Потім нам потрібно визначити кілька умов:

- Функція `update()` виробляє **побічний ефект**, або просто **ефект**, оскільки змінює стан програми.

- `A0` і `A1` вважаються **залежностями** ефекту, оскільки їх значення використовуються для виконання ефекту. Кажуть, що ефект є **підписником** його залежностей.

Нам потрібна магічна функція, яка може викликати `update()` (**ефект**) кожного разу, коли `A0` або `A1` (**залежності**) змінюються:

```js
whenDepsChange(update)
```

Ця функція `whenDepsChange()` має такі завдання:

1. Відстежувати, коли змінна зчитується. Наприклад, при обчисленні виразу `A0 + A1` читаються як `A0`, так і `A1`.

2. Якщо змінна зчитується, під час ефекту, робити цей ефект підписником на цю змінну. Оскільки `A0` і `A1` зчитуються під час виконання `update()`, `update()` стає підписником на `A0` і `A1` після першого виклику.

3. Визначати, коли змінна змінена. Наприклад, коли `A0` присвоєно нове значення, сповіщати всіх його підписникиків про повторний запуск.

## Як працює реактивність у Vue {#how-reactivity-works-in-vue}

Ми не можемо відстежувати читання та запис локальних змінних, як у прикладі. Просто у JavaScript немає механізму для цього. Що ми **можемо** зробити, це перехопити читання та запис **властивостей об’єкта**.

У JavaScript є два способи перехоплення доступу до властивості: [геттери](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)/[сеттери](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) та [Проксі](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Vue 2 використовував геттери/сеттери виключно через обмеження підтримки браузера. У Vue 3 проксі використовуються для реактивних об’єктів, а геттери/сеттери використовуються для референцій. Ось псевдокод, який ілюструє, як вони працюють:

```js{4,9,17,22}
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}
```

:::tip
Фрагменти коду тут і нижче призначені для пояснення основних концепцій у найпростішій формі, тому багато деталей спрощено, а крайні випадки ігноруються.
:::

Це пояснює деякі [обмеження реактивних об’єктів](/guide/essentials/reactivity-fundamentals#limitations-of-reactive), які ми обговорювали в розділі основ:

- Коли ви призначаєте або деструктуруєте властивість реактивного об’єкта локальній змінній, реактивність «від’єднується», оскільки доступ до локальної змінної більше не запускає перехоплення гет/сет проксі.

- Повернений проксі від `reactive()`, хоча і поводиться так само, як оригінал, має іншу ідентичність, якщо ми порівнюємо його з оригіналом за допомогою оператора `===`.

- Всередині `track()` ми перевіряємо, чи запущений на даний момент ефект. Якщо так, то ми шукаємо ефекти підписника (збережені в `Set`) для властивості, що відстежується, і додаємо ефект до `Set`:

```js
// Це буде встановлено безпосередньо перед запуском ефекту.
// Ми розберемося з цим пізніше.
let activeEffect

function track(target, key) {
  if (activeEffect) {
    const effects = getSubscribersForProperty(target, key)
    effects.add(activeEffect)
  }
}
```

Підписки на ефекти зберігаються в глобальній структурі даних `WeakMap<target, Map<key, Set<effect>>>`. Якщо для властивості (яка відстежується вперше) не знайдено жодного підписника, його буде створено. Коротше кажучи, це те, що робить функція `getSubscribersForProperty()`. Для простоти ми пропустимо подробиці.

Усередині `trigger()` ми знову шукаємо підписків властивості. Але цього разу ми викликаємо їх:

```js
function trigger(target, key) {
  const effects = getSubscribersForProperty(target, key)
  effects.forEach((effect) => effect())
}
```

Тепер повернемося до функції `whenDepsChange()`:

```js
function whenDepsChange(update) {
  const effect = () => {
    activeEffect = effect
    update()
    activeEffect = null
  }
  effect()
}
```

Вона обгортає необроблену функцію `update` в ефект, який встановлює себе як поточний активний ефект перед запуском оновлення. Це дозволяє викликати `track()` під час оновлення, щоб знайти поточний активний ефект.

На цьому етапі ми створили ефект, який автоматично відстежує його залежності та запускається повторно щоразу, коли залежність змінюється. Ми називаємо це **Реактивним ефектом**.

Vue надає API, який дозволяє створювати реактивні ефекти: [`watchEffect()`](/api/reactivity-core#watcheffect). Фактично, ви могли помітити, що він працює подібно до чарівного `whenDepsChange()` у прикладі. Тепер ми можемо переробити оригінальний приклад, використовуючи API Vue:

```js
import { ref, watchEffect } from 'vue'

const A0 = ref(0)
const A1 = ref(1)
const A2 = ref()

watchEffect(() => {
  // відстежує A0 та A1
  A2.value = A0.value + A1.value
})

// викликає ефект
A0.value = 2
```

Використання реактивного ефекту для зміни референції не є найцікавішим випадком - насправді використання обчислюваної властивості робить його більш декларативним:

```js
import { ref, computed } from 'vue'

const A0 = ref(0)
const A1 = ref(1)
const A2 = computed(() => A0.value + A1.value)

A0.value = 2
```

Всередині `computed` керує своєю інвалідацією та повторним обчисленням за допомогою реактивного ефекту.

Отже, який приклад звичайного та корисного реактивного ефекту? Що ж, оновлення DOM! Ми можемо реалізувати простий «реактивний рендеринг» таким чином:

```js
import { ref, watchEffect } from 'vue'

const count = ref(0)

watchEffect(() => {
  document.body.innerHTML = `count is: ${count.value}`
})

// оновлює DOM
count.value++
```

Фактично, це дуже близько до того, як компонент Vue підтримує синхронізацію стану та DOM – кожний екземпляр компонента створює реактивний ефект для візуалізації та оновлення DOM. Звичайно, компоненти Vue використовують набагато ефективніші способи оновлення DOM, ніж `innerHTML`. Це описано в [механізмі рендерингу](./rendering-mechanism).

<div class="options-api">

Усі API `ref()`, `computed()` і `watchEffect()` є частинами композиційного АРІ. Якщо ви досі використовували тільки опційний АРІ з Vue, ви помітите, що композиційний АРІ ближче до того, як працює система реактивності Vue під капотом. Насправді у Vue 3 опційний АРІ реалізовано поверх композиційного АРІ. Увесь доступ до властивостей екземпляра компонента (`this`) запускає геттер/сеттер для відстеження реактивності, а такі параметри, як `watch` і `computed`, викликають еквіваленти композиційного АРІ.

</div>

## Реактивність під час виконання та під час компіляції {#runtime-vs-compile-time-reactivity}

Система реактивності Vue в основному відбувається під час виконання: відстеження та запуск виконуються, коли код виконується безпосередньо в браузері. Плюси реактивності під час виконання полягають у тому, що вона може працювати без етапу збірки, та має менше крайових випадків. З іншого боку, це робить її обмеженою синтаксичними можливостями JavaScript, що призводить до потреби в контейнерах значень, таких як Vue рефененції.

Деякі фреймворки, такі як [Svelte](https://svelte.dev/), вирішили подолати такі обмеження, реалізувавши реактивність під час компіляції. Він аналізує та перетворює код, щоб імітувати реактивність. Етап компіляції дозволяє структурі змінювати семантику самого JavaScript - наприклад, неявно впроваджувати код, який виконує аналіз залежностей і запускає ефект навколо доступу до локально визначених змінних. Недоліком є те, що такі перетворення вимагають етапу побудови, а зміна семантики JavaScript по суті означає створення мови, яка виглядає як JavaScript, але компілюється в щось інше.

Команда Vue досліджувала цей напрямок за допомогою експериментальної функції під назвою [Перетворення реактивності](/guide/extras/reactivity-transform), але зрештою ми вирішили, що це не підійде для проєкту через [обґрунтування тут](https://github.com/vuejs/rfcs/discussions/369#discussioncomment-5059028).

## Налагодження реактивності {#reactivity-debugging}

Чудово, що система реактивності Vue автоматично відстежує залежності, але в деяких випадках ми можемо захотіти з’ясувати, що саме відстежується, або що спричиняє повторний рендеринг компонента.

### Хуки налагодження компонентів {#component-debugging-hooks}

За допомогою хуків життєвого циклу <span class="options-api">`renderTracked`</span><span class="composition-api">`onRenderTracked`</span> та <span class="options-api">`renderTriggered`</span><span class="composition-api">`onRenderTriggered`</span> ми можемо налагодити залежності, які використовуються під час візуалізації компонента та залежність, яка ініціює оновлення. Обидва хуки отримають подію налагоджувача, яка містить інформацію про відповідну залежність. Рекомендується розмістити оператор `debugger` у зворотних викликах, щоб інтерактивно перевірити залежність:

<div class="composition-api">

```vue
<script setup>
import { onRenderTracked, onRenderTriggered } from 'vue'

onRenderTracked((event) => {
  debugger
})

onRenderTriggered((event) => {
  debugger
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  renderTracked(event) {
    debugger
  },
  renderTriggered(event) {
    debugger
  }
}
```

</div>

:::tip
Хуки налагодження компонентів працюють лише в режимі розробки.
:::

Об'єкти події налагодження мають такий тип:

<span id="debugger-event"></span>

```ts
type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type:
    | TrackOpTypes /* 'get' | 'has' | 'iterate' */
    | TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}
```

### Налагодження обчислюваної властивості {#computed-debugging}

<!-- TODO options API equivalent -->

Ми можемо налагодити обчислювані властивості, передавши `computed()` другий об’єкт параметрів зі зворотними викликами `onTrack` і `onTrigger`:

- `onTrack` буде викликано, коли реактивна властивість або референція відстежуються як залежність.
- `onTrigger` буде викликано, коли зворотний виклик спостерігача запускається мутацією залежності.

Обидва зворотні виклики отримають події налагоджувача в [однаковому форматі](#debugger-event), що й хуки налагодження компонентів:

```js
const plusOne = computed(() => count.value + 1, {
  onTrack(e) {
    // запускається, коли count.value відстежується як залежність
    debugger
  },
  onTrigger(e) {
    // запускається, коли count.value змінено
    debugger
  }
})

// доступ до plusOne, має запустити onTrack
console.log(plusOne.value)

// зміна count.value, має запустити onTrigger
count.value++
```

:::tip
Параметри `onTrack` і `onTrigger` працюють лише в режимі розробки.
:::

### Налагодження спостерігача {#watcher-debugging}

<!-- TODO options API equivalent -->

Подібно до `computed()`, спостерігачі також підтримують параметри `onTrack` та `onTrigger`:

```js
watch(source, callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})

watchEffect(callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})
```

:::tip
Параметри `onTrack` і `onTrigger` працюють лише в режимі розробки.
:::

## Інтеграція з зовнішніми системами стану {#integration-with-external-state-systems}

Система реактивності Vue працює шляхом глибокого перетворення простих об’єктів JavaScript у реактивні проксі. Глибоке перетворення може бути непотрібним або іноді небажаним під час інтеграції зі зовнішніми системами керування станом (наприклад, якщо зовнішнє рішення також використовує проксі).

Загальна ідея інтеграції системи реактивності Vue зі зовнішнім рішенням керування станом полягає у збереженні зовнішнього стану в [`shallowRef`](/api/reactivity-advanced#shallowref). Неглибока референція є реактивною лише тоді, коли здійснюється доступ до її властивості `.value` - внутрішнє значення залишається недоторканим. Коли зовнішній стан змінюється, змінюється значення референції, щоб запустити оновлення.

### Незмінні дані {#immutable-data}

Якщо ви використовуєте функцію скасування/повторення, ви, ймовірно, захочете робити знімок стану додатку під час кожного редагування користувача. Однак змінна реактивность Vue не найкраще підходить для цього, якщо дерево стану велике, тому що серіалізація всього об’єкта стану під час кожного оновлення може бути дорогою з точки зору витрат як для процесора, так і для пам’яті.

[Незмінні структури даних](https://en.wikipedia.org/wiki/Persistent_data_structure) вирішують це, ніколи не змінюючи об’єкти стану – натомість створюються нові об’єкти, які мають однакові незмінні частини зі старими. Існують різні способи використання незмінних даних у JavaScript, але ми рекомендуємо використовувати [Immer](https://immerjs.github.io/immer/) із Vue, оскільки він дозволяє використовувати незмінні дані, зберігаючи більш ергономічний, змінний синтаксис.

Ми можемо інтегрувати Immer із Vue за допомогою простого компонування:

```js
import produce from 'immer'
import { shallowRef } from 'vue'

export function useImmer(baseState) {
  const state = shallowRef(baseState)
  const update = (updater) => {
    state.value = produce(state.value, updater)
  }

  return [state, update]
}
```

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNptVLtu2zAU/RWWS2zAkroVVe00HbO2QBfTgyJRNhOKFEjKcSEY6GPo3i8pstTokG+Q/6iXD8mqHQ0WL3l47rnX56rFH+o63jYUp3iuc8VqgzQ1TX1NBKtqqQxqUaPpbVVRhfaoVLJCV3HCbBzf6ysiECIil0IbtGSGVnqGmrrIDL21wQothuuTpQW39gcewwynKSK4+9Uduqfjz+5w/N4d0OeGEjwLoEIKwBgFe7Cxd9svE/ztno9fgeIbkDwD3Y/uqfvdE6LuD3ISzpnLjGtPTcRqSgQRZSNyw6RARq7X3BUxYaKgu6lPPKpt4spFi+tekouXDr2KbQIo/tXFpksHuSDlPPEth2ZDAMCaAzlECM0b7t6w4gxto1KqBcGT1pc9c/qhIShoY8JnJzjUB0+a80xruNUG9PjwJucsf4DDizoJDont04aEaA9ynZqEMy8wcQrnyUg2hNp84Xbp63eNMXRnooLmUmW2syniTNDIbJRs1pt3fSPcPTzD3nVRldVgLynAl46EhAOoMO37TTAY18YEb4ypdZokusytm+91LNU6gVWsGmFYRWOqq+hOyUftfDsYwfI6Y4xZGlE/rONcVt7nN2/j1/GbpGDaBOMDGZC8r2TR8JNdnZ4EEmypihSFbqpz5v/1nUEvNAZn7l1b/MBBP8Jc1gqy5zSMpDuHaRyGVm8yzuXjR1oOYwuJAUEE3TnMYPVhQO8yTT8Z+C+D2f1Ya7sDVj4xjoAnmJ8MwE38Sk1Ho+E44m3GYRgXvfTJaLf/aijHCEXbl4IvkRJo6XA9YmUbsv8HRK+sqw==)

### Скінченний автомат {#state-machines}

[Скінченний автомат](https://uk.wikipedia.org/wiki/Скінченний_автомат) — це модель для опису всіх можливих станів, у яких може перебувати програма, і всіх можливих способів переходу з одного стану в інший. Хоча це може бути надмірним для простих компонентів, це може допомогти зробити складні потоки стану більш надійними та керованими.

Однією з найпопулярніших реалізацій скінченного автомата в JavaScript є [XState](https://xstate.js.org/). Ось інтеграція з нею:

```js
import { createMachine, interpret } from 'xstate'
import { shallowRef } from 'vue'

export function useMachine(options) {
  const machine = createMachine(options)
  const state = shallowRef(machine.initialState)
  const service = interpret(machine)
    .onTransition((newState) => (state.value = newState))
    .start()
  const send = (event) => service.send(event)

  return [state, send]
}
```

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9VM2O0zAQfpWRL0mlboIQElLV7i4HtBcQEuwNc8im09a7yTiynbZS1ZfgwIMgISEEPEN4I8Z2mraL2EOieOb7Zr75cXbiVdNk6xbFRExtaVTjwKJrm0tJqm60cbCD1uLbolwpQtjDwugakiyvoyW7t4kkAEmlJuvgo3WFwzEHofknmJ1w053HqfkEEqeXywqTcTCQcqqo2KqoKJ1a9/YQx04gsDwsOtkAmvz79t3NzZvXzOtZrG0fmAD/hQ4pPNhj+bUfSZrmsXaumg8O66bi7HwCmN61zmmC67JS5cNMCl9ZmsSQyUiKgALY7aLkrC5cuUKbSnHIJsUIrkCK7nP3vfvZ/eh+dd/4+S0FTKL5658vjxz7IG+ax+ycY5oPssRYxNlc1EXDA9DE0wt94pzBYaUYOicFj9efpVg519hJnttF6Wd+bzNtljl/ZaYlp2rM0NYXd0ZvLBoOLEXfUCm2objzMC01D8us1HUevdcvsucvs2c52lzRHLcc4arW87Zi3hCIs+UcfY3mwnAn0aB5Stwj6D8CD0Pknhw3ktsxLG9pkKX1OzjmPXJoGoNuWOWonZd4oNhVUVV68x4XA4gFMUISbgNm0RJPlrfiZL114y12FPseb0Mvie/BmYwBe0QGEYw75k4P9fQ35INHnDK4M6r0nKGmAyWgADJNt6Ygy3RNaUq4iTFgdglpXNZ1UbU+xOA7UNltXHqWjuYMTHGN5EKIXkAWLkQ0+xYBsJLW0PmvwI9o/xfkWpJJ)

### RxJS {#rxjs}

[RxJS](https://rxjs.dev/) — це бібліотека для роботи з асинхронними потоками подій. Бібліотека [VueUse](https://vueuse.org/) надає надбудову [`@vueuse/rxjs`](https://vueuse.org/rxjs/readme.html) для підключення потоків RxJS до системи реактивності Vue.

## Підключення до сигналів {#connection-to-signals}

Чимало інших фреймворків представили примітиви реактивності, схожі на рефененції з композиційного API, під терміном "сигнали":

- [Сигнали Solid](https://www.solidjs.com/docs/latest/api#createsignal)
- [Сигнали Angular](https://github.com/angular/angular/discussions/49090)
- [Сигнали Preact](https://preactjs.com/guide/v10/signals/)
- [Сигнали Qwik](https://qwik.builder.io/docs/components/state/#usesignal)

По суті, сигнали є тим самим примітивом реактивності, що й рефененції Vue. Це контейнер значень, який забезпечує відстеження залежностей від доступу та ініціювання побічних ефектів у разі мутації. Ця парадигма на основі примітивів реактивності не є особливо новою концепцією у світі фронтенду: вона бере свій початок із таких реалізацій, як [Knockout observables](https://knockoutjs.com/documentation/observables.html) і [Meteor Tracker]( https://docs.meteor.com/api/tracker.html) понад десять років тому. Опційний API і бібліотека керування станом React [MobX](https://mobx.js.org/) також базуються на тих самих принципах, але приховують примітиви за властивостями об’єкта.

Хоча це не обов’язкова риса для того, щоб щось кваліфікувалося як сигнали, сьогодні ця концепція часто обговорюється разом із моделлю візуалізації, де оновлення виконуються через детальні підписки. Завдяки використанню віртуальної DOM Vue наразі [покладається на компілятори для досягнення аналогічної оптимізації](/guide/extras/rendering-mechanism#compiler-informed-virtual-dom). Однак ми також досліджуємо нову стратегію компіляції, натхненну Solid (режим Vapor), яка не покладається на Virtual DOM і використовує більше переваг вбудованої системи реактивності Vue.

### Компроміси дизайну API {#api-design-trade-offs}

Конструкція сигналів Preact і Qwik дуже схожа на [shallowRef](/api/reactivity-advanced#shallowref) Vue: усі три забезпечують змінний інтерфейс через властивість `.value`. Ми зосередимося на обговоренні сигналів Solid та Angular.

#### Сигнали Solid {#solid-signals}

Розробка API `createSignal()` Solid наголошує на сегрегації читання та запису. Сигнали представлені як геттер лише для читання та окремий сеттер:

```js
const [count, setCount] = createSignal(0)

count() // отримати доступ до значення
setCount(1) // оновити значення
```

Зверніть увагу, як сигнал `count` може бути переданий без сетера. Це гарантує, що стан ніколи не може бути змінений, якщо сеттер також явно не піддається впливу. Чи виправдовує ця гарантія безпеки більш детальний синтаксис, залежить від вимог проєкту та особистого смаку, але якщо ви віддаєте перевагу цьому стилю API, ви можете легко скопіювати його у Vue:

```js
import { shallowRef, triggerRef } from 'vue'

export function createSignal(value, options) {
  const r = shallowRef(value)
  const get = () => r.value
  const set = (v) => {
    r.value = typeof v === 'function' ? v(r.value) : v
    if (options?.equals === false) triggerRef(r)
  }
  return [get, set]
}
```

[Try it in the Playground](https://sfc.vuejs.org/#eNp9UsFu2zAM/RVCl9iYY63XwE437A+2Y9WD69KOOlvSKNndEPjfR8lOsnZAbxTfIx/Jp7P46lw5TygOovItaRfAY5jcURk9OksBztASNgF/6N40AyzQkR1hV0pvB/289yldvvidMsq01vgAD62dTChip28xeoT6TZPsc65MJVc9VuJHwNENTOAXQHW6O55ZN9ZmOSxLJTmTkKcpBGvgSzvo9metxEUim6E+wgyf4C5XInEBtGHVEU1IpXKtZaySVzlRiHXP/dg43sIavsQ58tUGeCUOkDIxx6eKbyVOITh/kNJ3bbzfiy8t9ZKjkngcPWKJftw/kX31SNxYieKfHpKTM9Ke0DwjIX3U8x31v76x7aLMwqu8s4RXuZroT80w2Nfv2BUQSPc9EsdXO1kuGYi/E7+bTBs0H/qNbXMzTFiAdRHy+XqV1XJii28SK5NNvsA9Biawl2wSlQm9gexhBOeEbpfeSJwPfxzajq2t6xp2l8F2cA9ztrFyOMC8Wd5Bts13X+KvqRl8Kuw4YN5t84zSeHw4FuMfTwYeeMr0aR/jNZe/yX4QHw==)

#### Сигнали Angular {#angular-signals}

Angular зазнає деяких фундаментальних змін, відмовившись від брудної перевірки та представивши власну реалізацію примітиву реактивності. API Angular Signal виглядає так:

```js
const count = signal(0)

count() // отримати доступ до значення
count.set(1) // встановити нове значення
count.update((v) => v + 1) // оновлення на основі попереднього значення

// мутувати глибокі об'єкти з однаковою ідентичністю
const state = signal({ count: 0 })
state.mutate((o) => {
  o.count++
})
```

Знову ж таки, ми можемо легко відтворити API у Vue:

```js
import { shallowRef, triggerRef } from 'vue'

export function signal(initialValue) {
  const r = shallowRef(initialValue)
  const s = () => r.value
  s.set = (value) => {
    r.value = value
  }
  s.update = (updater) => {
    r.value = updater(r.value)
  }
  s.mutate = (mutator) => {
    mutator(r.value)
    triggerRef(r)
  }
  return s
}
```

[Спробуйте у пісочниці](https://sfc.vuejs.org/#eNp9U81u00AQfpXRXupAYlOOIYngFThwWgk5zsZxsXet/UmRLEtAhcSBM1d4BEBIpK3aZ1i/UWe9tps0VW+7M998M/vNtxV5U5bh1jAyJTOVyKzUoJg25YLyrCiF1FCBylIe52NIRFEazVZQw1qKAk7CKOapyWM58ZDwTJ1QTnkiuNIIN1zDvCsPXoz6xEqYZc4w0xMGwQjmC1+Ax2fwErGzyM+Dk+BFs6LMY83wBjDbnC7sL/u7+dpc2Bt7a6+mUFVDfV3PIkQMyJ+I+Gf/Nj/sJaJ39hKaT0fFfqgH1UujteDwOsmz5MOckrZDaMoVThJs3cxbeA6nI0paPID9b/9gn+vme/PN7povdtfyRJ7oKVJU3UnUEzWf7RWOetNcPEIyiwY5yJj4PU2KuET9BcdNVg5Pu4SiBB/oWSnBVbs7JRutSzWNIrVO3P7PVChkGuEplDhOVrCQqWKylOJcMYnElIz3OCIMbpmcSMZXTDL5FOcD6BGvo60pr/EpR3bCx9zbcBPnuTh/y9Zj0DJLUybb82DLWMH7I4/iHK0n2ceWZm14ojOUv3NlxjOdxfm7ODds5GXyJpXOuUPHQ9w9SiHKm1eGW5dzKeWWiYk24HJVnx2C+F6H807CqD9gz0NwFw66CJrT1xVG+7r2ILq67jKgX+3JFMiuWOLvlvh8FPwxWYYvmTKNnQ8kSbDhIHAP2OPsfnEvRE3qO9a1nNk=)

Порівняно з посиланнями Vue, стиль API на основі геттерів Solid і Angular забезпечує деякі цікаві компроміси при використанні в компонентах Vue:

- `()` є трохи менш докладним, ніж `.value`, але оновлення значення є більш докладним.
- Немає ref-unwrapping: для доступу до значень завжди потрібен `()`. Це робить доступ до значення узгодженим всюди. Це також означає, що ви можете передавати необроблені сигнали як властивості компонентів.

Те, чи підходять вам ці стилі API, певною мірою суб’єктивно. Наша мета тут — продемонструвати основну подібність і компроміси між цими різними дизайнами API. Ми також хочемо показати, що Vue є гнучким: ви насправді не обмежені в існуючих API. За потреби ви можете створити власний примітивний API реактивності, щоб відповідати більш конкретним потребам.
