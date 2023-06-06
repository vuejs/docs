# Klassen- und Stilbindungen {#class-and-style-bindings}

Ein häufiger Bedarf an Datenbindung ist die Bearbeitung der Klassenliste eines Elements und der Inline-Stile. Da `class` und `style` beides Attribute sind, können wir `v-bind` verwenden, um ihnen dynamisch einen String-Wert zuzuweisen, ähnlich wie bei anderen Attributen. Allerdings kann der Versuch, diese Werte mit Hilfe von String-Konkatenation zu erzeugen, lästig und fehleranfällig sein. Aus diesem Grund bietet Vue spezielle Erweiterungen, wenn `v-bind` mit `class` und `style` verwendet wird. Zusätzlich zu Strings können die Ausdrücke auch auf Objekte oder Arrays ausgewertet werden.

## Binden von HTML-Klassen {#binding-html-classes}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/dynamic-css-classes-with-vue-3" title="Free Vue.js Dynamic CSS Classes Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-dynamic-css-classes-with-vue" title="Free Vue.js Dynamic CSS Classes Lesson"/>
</div>

### Bindung an Objekte {#binding-to-objects}

Wir können ein Objekt an `:class` (kurz für `v-bind:class`) übergeben, um Klassen dynamisch umzuschalten:

```vue-html
<div :class="{ active: isActive }"></div>
```

Die obige Syntax bedeutet, dass das Vorhandensein der Klasse "active" durch die [Wahrhaftigkeit] (https://developer.mozilla.org/en-US/docs/Glossary/Truthy) der Dateneigenschaft "isActive" bestimmt wird.

Es können mehrere Klassen umgeschaltet werden, indem mehrere Felder im Objekt vorhanden sind. Darüber hinaus kann die `:class`-Direktive auch mit dem einfachen Attribut `class` koexistieren. Der folgende Zustand ist also gegeben:

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

Und die folgende Vorlage:

```vue-html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

Es wird wiedergegeben:

```vue-html
<div class="static active"></div>
```

Wenn sich `isActive` oder `hasError` ändert, wird die Klassenliste entsprechend aktualisiert. Wenn zum Beispiel `hasError` zu `true` wird, wird die Klassenliste zu `"static active text-danger"`.

Das gebundene Objekt muss nicht inline sein:

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

Dies wird das gleiche Ergebnis liefern. Wir können auch an eine [berechnete Eigenschaft](./computed) binden, die ein Objekt zurückgibt. Dies ist ein gängiges und leistungsfähiges Muster:

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

### Bindung an Arrays {#binding-to-arrays}

Wir können `:class` an ein Array binden, um eine Liste von Klassen anzuwenden:

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

Which will render:

```vue-html
<div class="active text-danger"></div>
```

If you would like to also toggle a class in the list conditionally, you can do it with a ternary expression:

```vue-html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

This will always apply `errorClass`, but `activeClass` will only be applied when `isActive` is truthy.

However, this can be a bit verbose if you have multiple conditional classes. That's why it's also possible to use the object syntax inside array syntax:

```vue-html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### With Components {#with-components}

> This section assumes knowledge of [Components](/guide/essentials/component-basics). Feel free to skip it and come back later.

When you use the `class` attribute on a component with a single root element, those classes will be added to the component's root element, and merged with any existing class already on it.

For example, if we have a component named `MyComponent` with the following template:

```vue-html
<!-- child component template -->
<p class="foo bar">Hi!</p>
```

Then add some classes when using it:

```vue-html
<!-- when using the component -->
<MyComponent class="baz boo" />
```

The rendered HTML will be:

```vue-html
<p class="foo bar baz boo">Hi</p>
```

The same is true for class bindings:

```vue-html
<MyComponent :class="{ active: isActive }" />
```

When `isActive` is truthy, the rendered HTML will be:

```vue-html
<p class="foo bar active">Hi</p>
```

If your component has multiple root elements, you would need to define which element will receive this class. You can do this using the `$attrs` component property:

```vue-html
<!-- MyComponent template using $attrs -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```

```vue-html
<MyComponent class="baz" />
```

Will render:

```html
<p class="baz">Hi!</p>
<span>This is a child component</span>
```

You can learn more about component attribute inheritance in [Fallthrough Attributes](/guide/components/attrs.html) section.

## Binding Inline Styles {#binding-inline-styles}

### Binding to Objects

`:style` supports binding to JavaScript object values - it corresponds to an [HTML element's `style` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style):

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

Although camelCase keys are recommended, `:style` also supports kebab-cased CSS property keys (corresponds to how they are used in actual CSS) - for example:

```vue-html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

It is often a good idea to bind to a style object directly so that the template is cleaner:

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

Again, object style binding is often used in conjunction with computed properties that return objects.

### Binding to Arrays

We can bind `:style` to an array of multiple style objects. These objects will be merged and applied to the same element:

```vue-html
<div :style="[baseStyles, overridingStyles]"></div>
```

### Auto-prefixing {#auto-prefixing}

When you use a CSS property that requires a [vendor prefix](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) in `:style`, Vue will automatically add the appropriate prefix. Vue does this by checking at runtime to see which style properties are supported in the current browser. If the browser doesn't support a particular property then various prefixed variants will be tested to try to find one that is supported.

### Multiple Values {#multiple-values}

You can provide an array of multiple (prefixed) values to a style property, for example:

```vue-html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

This will only render the last value in the array which the browser supports. In this example, it will render `display: flex` for browsers that support the unprefixed version of flexbox.
