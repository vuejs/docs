# Прив'язування класів та стилей {#class-and-style-bindings}

Маніпулювання списком класів елемента та вбудованими стилями є загальною потребою при зв'язуванні даних. Оскільки `class` і `style` є атрибутами, ми можемо використовувати `v-bind` для динамічного призначення їм рядкового значення, подібно до інших атрибутів. Однак спроба згенерувати ці значення за допомогою конкатенації рядків може набриднути та стати джерелом помилок. Vue допомагає нам у розв'язанні цих питань, пропонуючи для використання `class` і `style` разом з `v-bind`. Окрім рядків, вирази також можуть бути обчисленими як об'єкти або масиви.

## Прив'язування класів HTML {#binding-html-classes}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/dynamic-css-classes-with-vue-3" title="Безкоштовний урок по динамічних CSS класах у Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-dynamic-css-classes-with-vue" title="Безкоштовний урок по динамічних CSS класах у Vue.js"/>
</div>

### Прив'язування об'єктів {#binding-to-objects}

Ви можете передати об'єкт в `:class` (скорочена форма для `v-bind:class`) для динамічного перемикання класів:

```vue-html
<div :class="{ active: isActive }"></div>
```

Вищенаведений синтаксис вказує на те, що клас `active` буде автоматично визначений [правдивістю](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).

Таким чином ви можете визначати кілька класів, вказуючи кілька полів в об'єкті. Між іншим, директива `:class` також може співіснувати зі звичайним атрибутом `class`. Наприклад, маючи ось такий стан:

<div class="composition-api">

```js
const isActive = ref(true)
const hasError = ref(false)
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    hasError: false
  }
}
```

</div>

І ось такий шаблон:

```vue-html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

Результат буде наступним:

```vue-html
<div class="static active"></div>
```

Коли змінюються `isActive` або `hasError`, відповідно буде оновлений і перелік класів даного елементу. Наприклад, якщо `hasError` буде `true`, список класів елементу стане `"static active text-danger"`.

Прив'язаний об'єкт не мусить бути прямолінійним:

<div class="composition-api">

```js
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

Результат рендеру буде таким же самим, як і у прикладі вище. Ви також можете прив'язувати й [обчислювані властивості](./computed), які повертають об'єкт. Це поширена і досить потужна модель:

<div class="composition-api">

```js
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

### Прив'язування масивів {#binding-to-arrays}

Для зміни переліку класів елементу можемо прив'язати `:class` і до масиву:

<div class="composition-api">

```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

</div>

```vue-html
<div :class="[activeClass, errorClass]"></div>
```

Ось результат:

```vue-html
<div class="active text-danger"></div>
```

Якщо ви хочете також змінювати перелік класів за певною умовою, ви можете це робити за допомогою [тернарного виразу](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator):

```vue-html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

Це завжди застосує `errorClass`, але клас `activeClass` буде додано лише коли значення `isActive` є правдивим.

Разом з тим, це може виглядати дещо захаращено, особливо, якщо у вас багато класів з умовами. Тому існує можливість використовувати синтаксис з об'єктами всередині синтаксису з масивами:

```vue-html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### З компонентами {#with-components}

> Ця секція передбачає ваше знання [Компонентів](/guide/essentials/component-basics). Ви можете пропустити її та повернутись пізніше.

Коли ви використовуєте атрибут `class` на компоненті, який містить в собі лише один кореневий елемент, відповідні класи будуть додані до цього кореневого елементу та об'єднані з тими класами, які вже в ньому існують.

Для прикладу, якщо у нас є компонент з назвою `MyComponent` та наступним шаблоном:

```vue-html
<!-- шаблон дочірнього документу -->
<p class="foo bar">Привіт!</p>
```

Використаємо його, додавши якісь класи:

```vue-html
<!-- коли використовуємо компонент -->
<MyComponent class="baz boo" />
```

В результаті згенерується наступний HTML:

```vue-html
<p class="foo bar baz boo">Hi</p>
```

Те ж стосується і для прив'язування класів:

```vue-html
<MyComponent :class="{ active: isActive }" />
```

Якщо `isActive` є правдивим, результат HTML рендеру буде наступним:

```vue-html
<p class="foo bar active">Hi</p>
```

Якщо ж ваш компонент містить в собі кілька кореневих елементів, тоді вам потрібно вказати, який саме елемент отримає цей клас. Це можливо зробити за допомогою властивості компонента `$attrs`:

```vue-html
<!-- MyComponent у використанні з $attrs -->
<p :class="$attrs.class">Hi!</p>
<span>Це дочірній компонент</span>
```

```vue-html
<MyComponent class="baz" />
```

HTML результат:

```html
<p class="baz">Привіт!</p>
<span>Це дочірній компонент</span>
```

Дізнайтесь більше про наслідування атрибутів компонентів в розділі [Атрибути Fallthrough](/guide/components/attrs.html).

## Прив'язування вбудованих стилів {#binding-inline-styles}

### Прив'язування об'єктів {#binding-to-objects-1}

`:style` підтримує прив'язування до об'єктних значень JavaScript — це узгоджено з [властивістю `style` HTML елемента](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style):

<div class="composition-api">

```js
const activeColor = ref('red')
const fontSize = ref(30)
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

</div>

```vue-html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

Хоч і рекомендовано використовувати camelCase, `:style` також підтримує ключі властивостей CSS, написані в kebab-case (відповідно до того, як ми їх використовуємо в "чистому" CSS). Приклад:

```vue-html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

Також часто гарною ідеєю є прив'язування до об'єкта стилю безпосередньо, що допоможе підтримувати шаблон чистішим:

<div class="composition-api">

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}
```

</div>

```vue-html
<div :style="styleObject"></div>
```

Знову ж таки, прив'язування об'єктних стилів часто використовується разом з обчислюваними властивостями, що повертають об'єкт.

### Прив'язування масивів {#binding-to-arrays-1}

Ми можемо прив'язувати `:style` до масивів відразу декілька об'єктів стилів: Ці об'єкти будуть об'єднані та застосовані до одного елементу:

```vue-html
<div :style="[baseStyles, overridingStyles]"></div>
```

### Автоматичні префікси {#auto-prefixing}

Якщо ви використовуєте властивість CSS, що вимагає специфічний [префікс](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) в `:style`, Vue автоматично додасть відповідний префікс. Vue це робить шляхом перевірки під час виконання програми, щоб побачити, які властивості стилів підтримуються поточним браузером. Якщо браузер не підтримує певну властивість, тоді будуть протестовані різні варіанти з префіксами, щоб знайти серед них той, який підтримується.

### Множинні значення {#multiple-values}

Ви можете надати масив множинних значень (з префіксами) до властивості стилю, наприклад:

```vue-html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

Таким чином, в кінцевому результаті буде використано лише останнє значення, підтримуване браузером. У цьому прикладі буде застосовано `display: flex` для браузерів, що підтримують версію flexbox без префіксів.
