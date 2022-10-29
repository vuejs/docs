---
outline: deep
---

<script setup>
import SpreadSheet from './demos/SpreadSheet.vue'
</script>

# Реактивність поглиблено {#reactivity-in-depth}

Однією з найбільш відмінних рис Vue є ненав'язлива система реактивності. Стан компонента складається з реактивних об'єктів JavaScript. Коли ви змінюєте їх, вид оновлюється. Це робить управління станом простим та інтуїтивно зрозумілим, але також важливо розуміти, як це працює, щоб уникнути деяких поширених помилок. У цьому розділі ми збираємося розібратися в деяких деталях нижчого рівня системи реактивності Vue.

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

У JavaScript є два способи перехоплення доступу до властивості: [геттери](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) / [сеттери](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) та [Проксі](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Vue 2 використовував геттери/сеттери виключно через обмеження підтримки браузера. У Vue 3 проксі використовуються для реактивних об’єктів, а геттери/сеттери використовуються для референцій. Ось псевдокод, який ілюструє, як вони працюють:

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
Фрагменти коду тут і нижче призначені для пояснення основних концепцій у найпростішій формі, тому багато деталей опущено, а крайні випадки ігноруються.
:::

Це пояснює деякі [обмеження реактивних об’єктів](/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive), які ми обговорювали в розділі основ:

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

Vue надає API, який дозволяє створювати реактивні ефекти: [`watchEffect()`](/api/reactivity-core.html#watcheffect). Фактично, ви могли помітити, що він працює подібно до чарівного `whenDepsChange()` у прикладі. Тепер ми можемо переробити оригінальний приклад, використовуючи API Vue:

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

Всередині `computed` керує визнанням його недійсним і повторним обчисленням за допомогою реактивного ефекту.

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

Фактично, це дуже близько до того, як компонент Vue підтримує синхронізацію стану та DOM – кожен екземпляр компонента створює реактивний ефект для візуалізації та оновлення DOM. Звичайно, компоненти Vue використовують набагато ефективніші способи оновлення DOM, ніж `innerHTML`. Це описано в [механізмі відтворення](./rendering-mechanism).

<div class="options-api">

Усі API `ref()`, `computed()` і `watchEffect()` є частиною композиційного АРІ. Якщо ви досі використовували тільки опційний АРІ з Vue, ви помітите, що композиційний АРІ ближче до того, як працює система реактивності Vue під капотом. Насправді у Vue 3 опційний АРІ реалізовано поверх композиційного АРІ. Увесь доступ до властивостей екземпляра компонента (`this`) запускає геттер/сеттер для відстеження реактивності, а такі параметри, як `watch` і `computed`, викликають еквіваленти композиційного АРІ.

</div>

## Реактивність під час виконання та під час компіляції {#runtime-vs-compile-time-reactivity}

Система реактивності Vue в основному відбувається під час виконання: відстеження та запуск виконуються, коли код виконується безпосередньо в браузері. Плюси реактивності під час виконання полягають у тому, що вона може працювати без етапу збірки, та має менше крайових випадків. З іншого боку, це робить її обмеженою синтаксичними можливостями JavaScript.

Ми вже зіткнулися з обмеженням у попередньому прикладі: JavaScript не надає нам способу перехопити читання та запис локальних змінних, тому ми маємо завжди отримувати доступ до реактивного стану як властивостей об’єкта, використовуючи або реактивні об’єкти, або реферації.

Ми експериментували з [Перетворенням реактивності](/guide/extras/reactivity-transform.html), щоб зменшити багатослівність коду:

```js
let A0 = $ref(0)
let A1 = $ref(1)

// відстежує читання змінної
const A2 = $computed(() => A0 + A1)

// запускається під час запису змінної
A0 = 2
```

Цей фрагмент компілюється саме в те, що ми б написали без перетворення, шляхом автоматичного додавання `.value` після посилань на змінні. Завдяки перетворенню реактивності система реактивності Vue стає гібридною.

## Налагодження реактивності {#reactivity-debugging}

Чудово, що система реактивності Vue автоматично відстежує залежності, але в деяких випадках ми можемо захотіти з’ясувати, що саме відстежується, або що спричиняє повторне рендеринг компонента.

### Хуки налагодження компонентів {#component-debugging-hooks}

За допомогою хуків життєвого циклу <span class="options-api">`renderTracked`</span> <span class="composition-api">`onRenderTracked`</span> та <span class="options-api">`renderTriggered`</span><span class="composition-api">`onRenderTriggered`</span> ми можемо налагодити залежності, які використовуються під час візуалізації компонента та залежність, яка ініціює оновлення. Обидва хуки отримають подію налагоджувача, яка містить інформацію про відповідну залежність. Рекомендується розмістити оператор `debugger` у зворотних викликах, щоб інтерактивно перевірити залежність:

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

Ми можемо налагодити обчислені властивості, передавши `computed()` другий об’єкт параметрів із зворотними викликами `onTrack` і `onTrigger`:

- `onTrack` буде викликано, коли реактивна властивість або реферація відстежуються як залежність.
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

## Інтеграція із зовнішніми системами стану {#integration-with-external-state-systems}

Система реактивності Vue працює шляхом глибокого перетворення простих об’єктів JavaScript у реактивні проксі. Глибоке перетворення може бути непотрібним або іноді небажаним під час інтеграції із зовнішніми системами керування станом (наприклад, якщо зовнішнє рішення також використовує проксі).

Загальна ідея інтеграції системи реактивності Vue зі зовнішнім рішенням керування станом полягає у збереженні зовнішнього стану в [`shallowRef`](/api/reactivity-advanced.html#shallowref). Неглибока референція є реактивною лише тоді, коли здійснюється доступ до її властивості `.value` - внутрішнє значення залишається недоторканим. Коли зовнішній стан змінюється, змінюється значення референції, щоб запустити оновлення.

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

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZUltbWVyIH0gZnJvbSAnLi9pbW1lci5qcydcbiAgXG5jb25zdCBbaXRlbXMsIHVwZGF0ZUl0ZW1zXSA9IHVzZUltbWVyKFtcbiAge1xuICAgICB0aXRsZTogXCJMZWFybiBWdWVcIixcbiAgICAgZG9uZTogdHJ1ZVxuICB9LFxuICB7XG4gICAgIHRpdGxlOiBcIlVzZSBWdWUgd2l0aCBJbW1lclwiLFxuICAgICBkb25lOiBmYWxzZVxuICB9XG5dKVxuXG5mdW5jdGlvbiB0b2dnbGVJdGVtKGluZGV4KSB7XG4gIHVwZGF0ZUl0ZW1zKGl0ZW1zID0+IHtcbiAgICBpdGVtc1tpbmRleF0uZG9uZSA9ICFpdGVtc1tpbmRleF0uZG9uZVxuICB9KVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHVsPlxuICAgIDxsaSB2LWZvcj1cIih7IHRpdGxlLCBkb25lIH0sIGluZGV4KSBpbiBpdGVtc1wiXG4gICAgICAgIDpjbGFzcz1cInsgZG9uZSB9XCJcbiAgICAgICAgQGNsaWNrPVwidG9nZ2xlSXRlbShpbmRleClcIj5cbiAgICAgICAge3sgdGl0bGUgfX1cbiAgICA8L2xpPlxuICA8L3VsPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmRvbmUge1xuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJpbW1lclwiOiBcImh0dHBzOi8vdW5wa2cuY29tL2ltbWVyQDkuMC43L2Rpc3QvaW1tZXIuZXNtLmpzP21vZHVsZVwiXG4gIH1cbn0iLCJpbW1lci5qcyI6ImltcG9ydCBwcm9kdWNlIGZyb20gJ2ltbWVyJ1xuaW1wb3J0IHsgc2hhbGxvd1JlZiB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUltbWVyKGJhc2VTdGF0ZSkge1xuICBjb25zdCBzdGF0ZSA9IHNoYWxsb3dSZWYoYmFzZVN0YXRlKVxuICBjb25zdCB1cGRhdGUgPSAodXBkYXRlcikgPT4ge1xuICAgIHN0YXRlLnZhbHVlID0gcHJvZHVjZShzdGF0ZS52YWx1ZSwgdXBkYXRlcilcbiAgfVxuXG4gIHJldHVybiBbc3RhdGUsIHVwZGF0ZV1cbn0ifQ==)

### Скінченний автомат {#state-machines}

[Скінченний автомат](https://en.wikipedia.org/wiki/Finite-state_machine) — це модель для опису всіх можливих станів, у яких може перебувати програма, і всіх можливих способів переходу з одного стану в інший. Хоча це може бути надмірним для простих компонентів, це може допомогти зробити складні потоки стану більш надійними та керованими.

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

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZU1hY2hpbmUgfSBmcm9tICcuL21hY2hpbmUuanMnXG4gIFxuY29uc3QgW3N0YXRlLCBzZW5kXSA9IHVzZU1hY2hpbmUoe1xuICBpZDogJ3RvZ2dsZScsXG4gIGluaXRpYWw6ICdpbmFjdGl2ZScsXG4gIHN0YXRlczoge1xuICAgIGluYWN0aXZlOiB7IG9uOiB7IFRPR0dMRTogJ2FjdGl2ZScgfSB9LFxuICAgIGFjdGl2ZTogeyBvbjogeyBUT0dHTEU6ICdpbmFjdGl2ZScgfSB9XG4gIH1cbn0pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cInNlbmQoJ1RPR0dMRScpXCI+XG4gICAge3sgc3RhdGUubWF0Y2hlcyhcImluYWN0aXZlXCIpID8gXCJPZmZcIiA6IFwiT25cIiB9fVxuICA8L2J1dHRvbj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ4c3RhdGVcIjogXCJodHRwczovL3VucGtnLmNvbS94c3RhdGVANC4yNy4wL2VzL2luZGV4LmpzP21vZHVsZVwiXG4gIH1cbn0iLCJtYWNoaW5lLmpzIjoiaW1wb3J0IHsgY3JlYXRlTWFjaGluZSwgaW50ZXJwcmV0IH0gZnJvbSAneHN0YXRlJ1xuaW1wb3J0IHsgc2hhbGxvd1JlZiB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZU1hY2hpbmUob3B0aW9ucykge1xuICBjb25zdCBtYWNoaW5lID0gY3JlYXRlTWFjaGluZShvcHRpb25zKVxuICBjb25zdCBzdGF0ZSA9IHNoYWxsb3dSZWYobWFjaGluZS5pbml0aWFsU3RhdGUpXG4gIGNvbnN0IHNlcnZpY2UgPSBpbnRlcnByZXQobWFjaGluZSlcbiAgICAub25UcmFuc2l0aW9uKChuZXdTdGF0ZSkgPT4gKHN0YXRlLnZhbHVlID0gbmV3U3RhdGUpKVxuICAgIC5zdGFydCgpXG4gIGNvbnN0IHNlbmQgPSAoZXZlbnQpID0+IHNlcnZpY2Uuc2VuZChldmVudClcblxuICByZXR1cm4gW3N0YXRlLCBzZW5kXVxufSJ9)

### RxJS

[RxJS](https://rxjs.dev/) — це бібліотека для роботи з асинхронними потоками подій. Бібліотека [VueUse](https://vueuse.org/) надає надбудову [`@vueuse/rxjs`](https://vueuse.org/rxjs/readme.html) для підключення потоків RxJS до системи реактивності Vue.
