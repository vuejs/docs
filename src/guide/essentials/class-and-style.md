# Vinculación de Clases y Estilos

Una necesidad común de la vinculación de datos es el manejo de la lista de clases de un elemento y sus estilos en línea. Puesto que `class` y `style` son atributos, podemos utilizar `v-bind` para asignarles un valor de cadena de forma dinámica, al igual que con otros atributos. Sin embargo, tratar de generar esos valores utilizando la concatenación de cadenas puede ser molesto y propenso a errores. Por esta razón, Vue proporciona mejoras especiales cuando se utiliza `v-bind` con `class` y `style`. Además de cadenas, las expresiones también pueden evaluarse a objetos o arrays.

## Vinculación de Clases HTML

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/dynamic-css-classes-with-vue-3" title="Lección gratuita de Clases Dinámicas de CSS con Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-dynamic-css-classes-with-vue" title="Lección gratuita de Clases Dinámicas de CSS con Vue.js"/>
</div>

### Vinculación a Objetos

Podemos pasar un objeto a `:class` (abreviatura de `v-bind:class`) para alternar dinámicamente las clases:

```vue-html
<div :class="{ active: isActive }"></div>
```

La sintaxis anterior significa que la presencia de la clase `active` estará determinada por la [veracidad](https://developer.mozilla.org/es/docs/Glossary/Truthy) de la propiedad de datos `isActive`.

Puedes tener varias clases conmutadas teniendo más campos en el objeto. Además, la directiva `:class` también puede coexistir con el atributo `class` a secas. Así que dado el siguiente estado:

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

Y la siguiente plantilla:

```vue-html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

Renderizará:

```vue-html
<div class="static active"></div>
```

Cuando `isActivo` o `hasError` cambian, la lista de clases será actualizada en consecuencia. Por ejemplo, si `hasError` se convierte en `true`, la lista de clases pasará a ser `"static active text-danger"`.

El objeto vinculado no tiene que estar en línea:

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

Esto devolverá el mismo resultado. También podemos enlazar con una [propiedad computada](./computed) que devuelva un objeto. Este es un patrón común y poderoso:

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

### Vinculación a Arrays

Podemos vincular `:class` a un array para aplicar una lista de clases:

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

Lo que renderizará:

```vue-html
<div class="active text-danger"></div>
```

Si también desea alternar una clase en la lista de forma condicional, puede hacerlo con una expresión ternaria:

```vue-html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

Esto siempre aplicará `errorClass`, pero `activeClass` sólo se aplicará cuando `isActive` sea verdadero.

Sin embargo, esto puede ser un poco pesado si tienes varias clases condicionales. Por eso también es posible utilizar la sintaxis de objetos dentro de la sintaxis de arrays:

```vue-html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### Con Componentes

> Esta sección supone el conocimiento de [Componentes](/guide/essentials/component-basics). Siéntete libre de saltarla y volver más tarde.

Cuando utilizas el atributo `class` en un componente con un único elemento raíz, esas clases se añadirán al elemento raíz del componente, y se fusionarán con cualquier clase ya existente en él.

Por ejemplo, si tenemos un componente llamado `my-component` con la siguiente plantilla:

```vue-html
<!-- plantilla del componente hijo -->
<p class="foo bar">¡Hola!</p>
```

A continuación, añade algunas clases al utilizarlo:

```vue-html
<!-- cuando se usa el componente -->
<MyComponent class="baz boo" />
```

El HTML renderizado será:

```vue-html
<p class="foo bar baz boo">¡Hola!</p>
```

Lo mismo ocurre con los enlaces de clase:

```vue-html
<MyComponent :class="{ active: isActive }" />
```

Cuando `isActive` es verdadero, el HTML renderizado será:

```vue-html
<p class="foo bar active">¡Hola!</p>
```

Si tu componente tiene varios elementos raíz, necesitarás definir qué elemento recibirá esta clase. Puedes hacerlo utilizando la propiedad `$attrs` del componente:

```vue-html
<!-- plantilla de my-component usando $attrs -->
<p :class="$attrs.class">¡Hola!</p>
<span>Este es un componente hijo</span>
```

```vue-html
<MyComponent class="baz" />
```

Renderizará:

```html
<p class="baz">¡Hola!</p>
<span>Este es un componente hijo</span>
```

Puedes aprender más sobre la herencia de atributos de los componentes en la sección [Atributos Fallthrough](/guide/components/attrs.html).

## Vinculación de Estilos en Línea

### Vinculación a Objetos

`:style` admite la vinculación a valores de objetos de JavaScript. Esto corresponde a una [propiedad `style` del elemento HTML](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style):

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

Aunque se recomiendan las claves camelCase, `:style` también admite claves de propiedades CSS kebab-cased (corresponde a cómo se usan en el CSS real). Por ejemplo:

```vue-html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

A menudo es una buena idea enlazar con un objeto de estilo directamente para que la plantilla sea más limpia:

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

De nuevo, la vinculación al estilo de los objetos se utiliza a menudo junto con las propiedades computadas que devuelven objetos.

### Vinculación a Arrays

Podemos vincular `:style` a un array de múltiples objetos de estilo. Estos objetos se fusionarán y se aplicarán al mismo elemento:

```vue-html
<div :style="[baseStyles, overridingStyles]"></div>
```

### Auto-prefijado

Cuando uses una propiedad CSS que requiera un [prefijo de proveedor](https://developer.mozilla.org/es/docs/Glossary/Vendor_Prefix) en `:style`, Vue añadirá automáticamente el prefijo apropiado. Esto lo hace Vue comprobando en tiempo de ejecución qué propiedades de estilo están soportadas en el navegador actual. Si el navegador no soporta una propiedad en particular, entonces se probarán distintas variantes de prefijo para tratar de encontrar una que sí sea soportada.

### Valores Múltiples

Puedes proporcionar un array de múltiples valores (prefijados) a una propiedad de estilo, por ejemplo:

```vue-html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

Esto solo renderizará el último valor del array que soporte el navegador. En este ejemplo, mostrará `display: flex` para los navegadores que soporten la versión no prefijada de flexbox.
