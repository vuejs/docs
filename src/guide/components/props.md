# Реквізити {#props}

> Ця сторінка передбачає, що ви вже прочитали [основи компонентів](/guide/essentials/component-basics). Прочитайте це спочатку, якщо ви новачок у компонентах.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-3-reusable-components-with-props" title="Безкоштовний урок по реквізитах у Vue.js"/>
</div>

## Оголошення реквізитів {#props-declaration}

Компоненти Vue вимагають явного оголошення реквізитів, щоб Vue знав, які зовнішні реквізити, передані компоненту, слід розглядати як прохідні атрибути (що буде обговорюватися в [цьому спеціальному розділі](/guide/components/attrs)).

<div class="composition-api">

У SFC, які використовують `<script setup>`, реквізити можна оголошувати за допомогою `defineProps()`:

```vue
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
```

У компонентах без `<script setup>`, реквізити оголошуються за допомогою параметра [`props`](/api/options-state.html#props):

```js
export default {
  props: ['foo'],
  setup(props) {
    // setup() отримує реквізити як перший аргумент.
    console.log(props.foo)
  }
}
```

Зауважте, що аргумент, переданий у `defineProps()`, такий самий, як значення, надане параметрам `props`: той самий API параметрів реквізитів використовується двома стилями оголошення.

</div>

<div class="options-api">

Реквізити оголошуються за допомогою параметра [`props`](/api/options-state.html#props):

```js
export default {
  props: ['foo'],
  created() {
    // реквізит зберігається в `this`
    console.log(this.foo)
  }
}
```

</div>

На додаток до оголошення реквізитів за допомогою масиву рядкових величин, ми також можемо використовувати об’єктний синтаксис:

<div class="options-api">

```js
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>
<div class="composition-api">

```js
// З <script setup>
defineProps({
  title: String,
  likes: Number
})
```

```js
// Без <script setup>
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>

Для кожної властивості в синтаксисі оголошення об’єкта, ключ — це ім’я реквізиту, тоді як значення має бути функцією-конструктором очікуваного типу.

Це не лише документує ваш компонент, але й попередить інших розробників, які використовують ваш компонент у консолі браузера, якщо вони передають неправильний тип. Ми обговоримо додаткові відомості про [перевірку реквізитів](#prop-validation) далі на цій сторінці.

<div class="options-api">

Дивіться також: [типізація реквізитів компонента](/guide/typescript/options-api.html#typing-component-props) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

Якщо ви використовуєте TypeScript із `<script setup>`, можна також оголосити реквізити за допомогою суто анотацій типу:

```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

Детальніше: [типізація реквізитів компонента](/guide/typescript/composition-api.html#typing-component-props) <sup class="vt-badge ts" />

</div>

## Деталі передачі реквізиту {#prop-passing-details}

### Регістр імені реквізиту {#prop-name-casing}

Ми оголошуємо довгі імена реквізитів за допомогою camelCase, оскільки це дозволяє уникнути необхідності використовувати лапки під час використання їх як ключів властивостей і дозволяє нам посилатися на них безпосередньо у виразах шаблону, бо вони є дійсними ідентифікаторами JavaScript:

<div class="composition-api">

```js
defineProps({
  greetingMessage: String
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    greetingMessage: String
  }
}
```

</div>

```vue-html
<span>{{ greetingMessage }}</span>
```

Технічно ви також можете використовувати camelCase під час передачі реквізитів дочірньому компоненту (за винятком [шаблонів DOM](/guide/essentials/component-basics.html#dom-template-parsing-caveats)). Однак, угода передбачає використання kebab-case у всіх випадках для узгодження з атрибутами HTML:

```vue-html
<MyComponent greeting-message="привіт" />
```

Ми використовуємо [PascalCase для тегів компонентів](/guide/components/registration.html#component-name-casing), коли це можливо, оскільки це покращує читабельність шаблону, відрізняючи компоненти Vue від нативних елементів. Однак використання camelCase під час передачі реквізитів не має такої практичної користі, тому ми вирішуємо дотримуватись конвенцій кожної мови.

### Статичні реквізити проти динамічних реквізитів {#static-vs-dynamic-props}

Наразі ви бачили реквізити, що передавалися як статичні значення, наприклад:

```vue-html
<BlogPost title="Моя подорож з Vue" />
```

Ви також бачили реквізити, призначені динамічно за допомогою `v-bind` або його скорочення `:`, наприклад:

```vue-html
<!-- Динамічне присвоєння значення змінної -->
<BlogPost :title="post.title" />

<!-- Динамічне присвоєння значення складного виразу -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

### Передача значень різних типів {#passing-different-value-types}

У двох наведених вище прикладах ми передаємо рядкові значення, але значення _будь-якого_ типу може бути передане реквізиту.

#### Число {#number}

```vue-html
<!-- Незважаючи на те, що `42` є статичним, нам потрібен v-bind, щоб повідомити це Vue -->
<!-- це вираз JavaScript, а не рядок. -->
<BlogPost :likes="42" />

<!-- Динамічне присвоєння значення змінної. -->
<BlogPost :likes="post.likes" />
```

#### Логічний {#boolean}

```vue-html
<!-- Передача реквізиту без значення означатиме `true`. -->
<BlogPost is-published />

<!-- Незважаючи на те, що `false` є статичним, нам потрібен v-bind, щоб повідомити це Vue -->
<!-- це вираз JavaScript, а не рядок. -->
<BlogPost :is-published="false" />

<!-- Динамічне присвоєння значення змінної. -->
<BlogPost :is-published="post.isPublished" />
```

#### Масив {#array}

```vue-html
<!-- Незважаючи на те, що масив є статичним, нам потрібен v-bind, щоб повідомити це Vue -->
<!-- це вираз JavaScript, а не рядок. -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- Динамічне присвоєння значення змінної. -->
<BlogPost :comment-ids="post.commentIds" />
```

#### Об’єкт {#object}

```vue-html
<!-- Незважаючи на те, що об’єкт є статичним, нам потрібен v-bind, щоб повідомити це Vue -->
<!-- це вираз JavaScript, а не рядок. -->
<BlogPost
  :author="{
    name: 'Вероніка',
    company: 'Veridian Dynamics'
  }"
 />

<!-- Динамічне присвоєння значення змінної. -->
<BlogPost :author="post.author" />
```

### Прив'язка кількох реквізитів за допомогою об'єкта {#binding-multiple-properties-using an-object}

Якщо ви хочете передати всі властивості об'єкта як реквізит, ви можете використовувати [`v-bind` без аргументу](/guide/essentials/template-syntax.html#dynamically-binding-multiple-attributes) (`v-bind` замість `:prop-name`). Наприклад, задано об’єкт `post`:

<div class="options-api">

```js
export default {
  data() {
    return {
      post: {
        id: 1,
        title: 'Моя подорож з Vue'
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const post = {
  id: 1,
  title: 'Моя подорож з Vue'
}
```

</div>

Наступний шаблон:

```vue-html
<BlogPost v-bind="post" />
```

Буде еквівалентним до:

```vue-html
<BlogPost :id="post.id" :title="post.title" />
```

## Односторонній потік даних {#one-way-data-flow}

Всі реквізити формують **односторонню зв’язку** між дочірньою та батьківською властивостями: коли батьківська властивість оновлюється, вона переходить до дочірньої, але не навпаки. Це запобігає випадковій зміни стану батьківського компоненту дочірніми, що може ускладнити розуміння потоку даних вашої програми.

Крім того, щоразу, коли батьківський компонент оновлюється, усі атрибути в дочірньому компоненті оновлюватимуться останнім значенням. Це означає, що **не** слід намагатися змінити реквізит всередині дочірнього компонента. Якщо ви це зробите, Vue попередить вас у консолі:

<div class="composition-api">

```js
const props = defineProps(['foo'])

// ❌ попередження, реквізити доступні лише для читання!
props.foo = 'bar'
```

</div>
<div class="options-api">

```js
export default {
  props: ['foo'],
  created() {
    // ❌ попередження, реквізити доступні лише для читання!
    this.foo = 'bar'
  }
}
```

</div>

Зазвичай є два випадки, коли виникає бажання змінити реквізит:

1. **Реквізит використовується для передачі початкового значення; потім дочірній компонент хоче використовувати його як властивість локальних даних.** У цьому випадку найкраще визначити властивість локальних даних, яка використовує реквізит як початкове значення:

   <div class="composition-api">

   ```js
   const props = defineProps(['initialCounter'])

   // counter використовує лише props.initialCounter як початкове значення;
   // його відключено від майбутніх оновлень реквізиту.
   const counter = ref(props.initialCounter)
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['initialCounter'],
     data() {
       return {
         // counter використовує лише props.initialCounter як початкове значення;
         // його відключено від майбутніх оновлень реквізиту.
         counter: this.initialCounter
       }
     }
   }
   ```

   </div>

2. **Реквізит передається як необроблене значення, яке потрібно трансформувати.** У цьому випадку найкраще визначити обчислювану властивість за допомогою значення реквізиту:

   <div class="composition-api">

   ```js
   const props = defineProps(['size'])

   // обчислювана властивість, яка автоматично оновлюється, коли реквізит змінюється
   const normalizedSize = computed(() => props.size.trim().toLowerCase())
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['size'],
     computed: {
       // обчислювана властивість, яка автоматично оновлюється, коли реквізит змінюється
       normalizedSize() {
         return this.size.trim().toLowerCase()
       }
     }
   }
   ```

   </div>

### Зміна реквізитів з типом об'єкту / масиву {#mutating-object-array-props}

Коли об'єкти та масиви передаються як реквізити, хоча дочірній компонент не може змінювати прив’язку реквізитів, він **зможе** змінити вкладені властивості об’єкта чи масиву. Це пов’язано з тим, що в JavaScript об’єкти та масиви передаються за посиланням, і для Vue необґрунтовано дорого запобігати таким мутаціям.

Основний недолік таких мутацій полягає в тому, що вони дозволяють дочірньому компоненту впливати на батьківський стан у спосіб, який не є очевидним для батьківського компонента, потенційно ускладнюючи потік даних у майбутньому. Як найкраща практика, ви повинні уникати таких мутацій, якщо тільки батько та дитина не тісно пов’язані задумом. У більшості випадків нащадок повинен [випромінювати подію](/guide/components/events.html), щоб дозволити батькові виконати мутацію.

## Перевірка реквізиту {#prop-validation}

Компоненти можуть вказувати вимоги до своїх реквізитів, наприклад типи, які ви вже бачили. Якщо вимога не виконується, Vue попередить вас у консолі JavaScript браузера. Це особливо корисно під час розробки компонента, призначеного для використання іншими.

Щоб указати перевірку реквізиту, ви можете надати об’єкт із вимогами перевірки для <span class="composition-api">`defineProps()` макроса</span><span class="options-api">`props` параметр </span> замість масиву рядкових величин. Наприклад:

<div class="composition-api">

```js
defineProps({
  // Основна перевірка типу
  // (`null` та `undefined` значення дозволять будь-який тип)
  propA: Number,
  // Кілька можливих типів
  propB: [String, Number],
  // Обов'язковий рядок
  propC: {
    type: String,
    required: true
  },
  // Число зі значенням за промовчанням
  propD: {
    type: Number,
    default: 100
  },
  // Об'єкт зі значенням за промовчанням
  propE: {
    type: Object,
    // Значення за промовчанням для об’єктів або масивів мають бути повернуті
    // фабричною функцією. Функція отримує необроблені реквізити,
    // отримані компонентом як аргумент.
    default(rawProps) {
      return { message: 'Привіт' }
    }
  },
  // Спеціальна функція перевірки
  propF: {
    validator(value) {
      // Значення має відповідати одному з цих рядків
      return ['успіх', 'увага', 'небезпека'].includes(value)
    }
  },
  // Функція зі значенням за промовчанням
  propG: {
    type: Function,
    // На відміну від об’єкта чи масиву за промовчанням, це не фабрика
    // функція - це функція, яка слугуватиме значенням за промовчанням
    default() {
      return 'Функція за промовчанням'
    }
  }
})
```

:::tip
Код всередині `defineProps()` **не може отримати доступ до інших змінних, оголошених з `<script setup>`**, оскільки весь вираз переміщується до зовнішньої область видимості функції під час компіляції.
:::

</div>
<div class="options-api">

```js
export default {
  props: {
    // Основна перевірка типу
    // (`null` та `undefined` значення дозволять будь-який тип)
    propA: Number,
    // Кілька можливих типів
    propB: [String, Number],
    // Обов'язковий рядок
    propC: {
      type: String,
      required: true
    },
    // Число зі значенням за промовчанням
    propD: {
      type: Number,
      default: 100
    },
    // Об'єкт зі значенням за промовчанням
    propE: {
      type: Object,
      // Значення за промовчанням для об’єктів або масивів мають бути повернуті
      // фабричною функцією. Функція отримує необроблені реквізити,
      // отримані компонентом як аргумент.
      default(rawProps) {
        return { message: 'Привіт' }
      }
    },
    // Спеціальна функція перевірки
    propF: {
      validator(value) {
        // Значення має відповідати одному з цих рядків
        return ['успіх', 'увага', 'небезпека'].includes(value)
      }
    },
    // Функція зі значенням за промовчанням
    propG: {
      type: Function,
      // На відміну від об’єкта чи масиву за промовчанням, це не фабрика
      // функція - це функція, яка слугуватиме значенням за промовчанням
      default() {
        return 'Функція за промовчанням'
      }
    }
  }
}
```

</div>

Додаткова інформація:

- Усі реквізити є необов’язковими за промовчанням, якщо не вказано `required: true`.

- Відсутній додатковий реквізит, відмінний від `Boolean`, матиме значення `undefined`.

- Відсутні атрибути `Boolean` будуть приведені до `false`. Ви можете змінити це, встановивши для нього `default` — тобто: `default: undefined`, щоб поводитись як не-логічний реквізит.

- Якщо `default` (значення за промовчанням) вказано, воно використовуватиметься, якщо розв’язане значення реквізиту `undefined` - це стосується як випадків, коли реквізит відсутній, так і передається явне значення `undefined`.

Коли перевірка реквізиту не вдасться, Vue видасть консольне попередження (якщо використовується збірка розробки).

<div class="composition-api">

Якщо використовується [оголошення реквізитів на основі типів](/api/sfc-script-setup.html#typescript-only-features) <sup class="vt-badge ts" />, Vue докладе всіх зусиль для компіляції анотацій типів в еквівалентні оголошення реквізитів. Наприклад, `defineProps<{ msg: string }>` буде скомпільовано в `{ msg: { type: String, required: true }}`.

</div>
<div class="options-api">

::: tip Note
Зауважте, що реквізити перевіряються **до** створення екземпляра компонента, тому властивості екземпляра (наприклад, `data`, `computed` тощо) не будуть доступні у функціях `default` або `validator`.
:::

</div>

### Перевірки типу виконання {#runtime-type-checks}

`type` може бути одним із таких нативних конструкторів:

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`

Крім того, `type` також може бути спеціальним класом або функцією-конструктором, і твердження буде зроблено з перевіркою `instanceof`. Наприклад, задано наступний клас:

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

Ви можете використовувати його як тип реквізиту:

<div class="composition-api">

```js
defineProps({
  author: Person
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    author: Person
  }
}
```

</div>

Vue використовуватиме `instanceof Person`, щоб перевірити, чи справді значення властивості `author` є екземпляром класу `Person`.

## Логічна перевірка {#boolean-casting}

Реквізити з типом `Boolean` мають спеціальні правила приведення, щоб імітувати поведінку власних логічних атрибутів. Дано `<MyComponent>` з таким оголошенням:

<div class="composition-api">

```js
defineProps({
  disabled: Boolean
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    disabled: Boolean
  }
}
```

</div>

Компонент можна використовувати таким чином:

```vue-html
<!-- еквівалент передачі :disabled="true" -->
<MyComponent disabled />

<!-- еквівалент передачі :disabled="false" -->
<MyComponent />
```

Коли реквізит оголошено таким чином, що він дозволяє кілька типів, наприклад:

<div class="composition-api">

```js
defineProps({
  disabled: [Boolean, Number]
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    disabled: [Boolean, Number]
  }
}
```

</div>

Правила приведення для `Boolean` застосовуватимуться незалежно від порядку появи типу.
