# Работа с классами и стилями {#class-and-style-bindings}

Наиболее часто возникает необходимость динамически управлять CSS-классами элемента и его инлайн-стилями. Поскольку оба случая связаны с атрибутами, то можно использовать `v-bind` для работы с ними: нужно лишь вычислить итоговую строку выражением. Однако заниматься конкатенацией строк жутко неудобно и может привести к ошибкам. По этой причине Vue предоставляет директиве `v-bind` специальные улучшения при работе с `class` и `style`. Кроме строк, выражения могут принимать массивы или объекты.

## Привязка CSS-классов {#binding-html-classes}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/dynamic-css-classes-with-vue-3" title="Бесплатный урок по динамическим классам по Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-dynamic-css-classes-with-vue" title="Бесплатный урок по динамическим классам по Vue.js"/>
</div>

### Объектный синтаксис {#binding-to-objects}

Можно передавать объект в `:class` (сокращение для `v-bind:class`) для динамической установки или удаления CSS-классов:

```vue-html
<div :class="{ active: isActive }"></div>
```

Синтаксис выше означает, что наличие класса `active` на элементе будет определяться [истинностью](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) значения свойства `isActive`.

Подобным образом можно управлять несколькими классами, добавляя в объект и другие поля. Кроме того, `:class` можно использовать совместно с обычным атрибутом `class`. Если данные будут такими:

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

А шаблон таким:

```vue-html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

То в результате получится:

```vue-html
<div class="static active"></div>
```

Классы будут обновлены при изменениях `isActive` или `hasError`. Например, `hasError` изменится в `true` и значение атрибута `class` станет `"static active text-danger"`.

Объект необязательно указывать инлайн прямо в шаблоне:

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

Результат будет таким же. Также можно использовать [вычисляемые свойства](./computed), возвращающие итоговый объект — очень распространённый и мощный приём:

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

### Синтаксис с массивом {#binding-to-arrays}

Можно передать массив в `:class`, чтобы применить список классов:

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

В результате получим:

```vue-html
<div class="active text-danger"></div>
```

Переключать классы в массиве, в зависимости от некоторого условия, можно с помощью условного оператора в форме тернарного выражения:

```vue-html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

К элементу будет всегда добавляться `errorClass`, но `activeClass` — только в случае истинности `isActive`.

Однако, такая запись начинает выглядеть слегка громоздко, особенно если есть несколько классов, задаваемых по условию. Поэтому возможно использовать и смешанный синтаксис:

```vue-html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### Использование с компонентами {#with-components}

> Эта секция предполагает знакомство с [компонентами](/guide/essentials/component-basics). Можно спокойно пропустить её сейчас и вернуться позднее.

При использовании атрибута `class` на пользовательском компоненте с одним корневым элементом, классы будут добавлены к этому корневому элементу. Существующие классы на этом элементе останутся и не будут перезаписаны.

Например, если возьмём компонент `MyComponent` со следующим шаблоном:

```vue-html
<!-- шаблон дочернего компонента -->
<p class="foo bar">Привет</p>
```

Затем добавим на него несколько классов:

```vue-html
<!-- при использовании компонента -->
<MyComponent class="baz boo" />
```

То в результате отрисовки получим:

```vue-html
<p class="foo bar baz boo">Привет</p>
```

То же самое справедливо для привязок классов:

```vue-html
<MyComponent :class="{ active: isActive }" />
```

Если `isActive` истинно, то итоговый HTML будет таким:

```vue-html
<p class="foo bar active">Привет</p>
```

Если у компонента несколько корневых элементов, то потребуется определить какой из них будет получать эти классы. Это реализуется добавлением свойства `$attrs` на элемент:

```vue-html
<!-- шаблон MyComponent с использованием $attrs -->
<p :class="$attrs.class">Привет</p>
<span>Это дочерний компонент</span>
```

```vue-html
<MyComponent class="baz" />
```

В результате:

```html
<p class="baz">Привет</p>
<span>Это дочерний компонент</span>
```

Подробнее о наследовании атрибутов компонентов можно прочитать в разделе про [передачу обычных атрибутов](/guide/components/attrs.html).

## Привязка инлайн-стилей {#binding-inline-styles}

### Объектный синтаксис {#binding-to-objects-1}

Объектный синтаксис для `:style` выглядит почти как для CSS, за исключением того, что это объект JavaScript и соответствует [свойству `style` элемента HTML](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style):

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

Хотя рекомендуется использовать ключи в camelCase, `:style` также поддерживает ключи CSS-свойств в kebab-case (соответствует тому, как они используются в реальном CSS) — например:

```vue-html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

Рекомендуется привязывать стили к объекту данных, чтобы сделать шаблон чище:

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

Аналогично можно использовать и вычисляемые свойства, возвращающие объект стилей.

### Синтаксис с массивом {#binding-to-arrays-1}

Синтаксис с массивом для `:style` позволяет применить несколько объектов стилей к одному и тому же элементу:

```vue-html
<div :style="[baseStyles, overridingStyles]"></div>
```

### Автоматические префиксы {#auto-prefixing}

Если использовать CSS-свойство, которое требует [вендорного префикса](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) в `:style`, Vue автоматически добавит соответствующий префикс. Во время выполнения будет проверять какие стилевые свойства поддерживаются в текущем браузере. Если определённое свойство не поддерживается браузером, то будут проверены различные варианты префиксов, чтобы попытаться найти тот, который поддерживается.

### Множественные значения {#multiple-values}

Можно передать массив из нескольких (префиксных) значений в свойство style, например:

```vue-html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

В этом случае будет выбрано только последнее значение из массива, которое поддерживается браузером. Например, `display: flex` для браузеров с поддержкой flexbox без префиксов.
