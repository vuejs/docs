# Reglas de Prioridad B: Muy Recomendado

Se ha encontrado que estas reglas mejoran la legibilidad y/o la experiencia del desarrollador en la mayoría de los proyectos. Tu código se ejecutará aún si no las respetas, pero las violaciones deberían ser raras y estar bien justificadas.

## Archivos de componentes

**Siempre que haya un sistema de compilación disponible para concatenar archivos, cada componente debe estar en su propio archivo.**

Esto te ayudará a encontrar más rápidamente un componente cuando necesites editarlo o revisar cómo usarlo.

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```js
app.component('TodoList', {
  // ...
})

app.component('TodoItem', {
  // ...
})
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```
components/
|- TodoList.js
|- TodoItem.js
```

```
components/
|- TodoList.vue
|- TodoItem.vue
```

</div>

## Formato de nombre de los Componente de un Solo Archivo (SFC)

**Los nombres de archivo de los [Componentes de un Solo Archivo](/guide/scaling-up/sfc.html) deben ser siempre PascalCase o siempre kebab-case.**

El autocompletado de los editores de código funciona mejor cuando se utiliza PascalCase ya que este es consistente con la forma en la que referenciamos componentes en JS(X) y las plantillas, siempre que sea posible. Sin embargo, este tipo de nombres en los archivos puede crear problemas en los sistemas de archivos que no distinguen entre mayúsculas y minúsculas, razón por la cual kebab-case también es perfectamente aceptable.

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```
components/
|- mycomponent.vue
```

```
components/
|- myComponent.vue
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```
components/
|- MyComponent.vue
```

```
components/
|- my-component.vue
```

</div>

## Nombres de componentes base

**Los componentes base (también conocidos como componentes de presentación, "silentes" o puros) que aplican estilos y convenciones específicos de la aplicación deben comenzar todos con un prefijo específico, como `Base`, `App` o `V`.**

::: details Explicación detallada
Estos componentes sientan las bases para un estilo y un comportamiento consistentes en tu aplicación. Pueden contener **solo**:

- Elementos HTML,
- Otros componentes base, y
- Componentes de UI de terceros.

Pero **nunca** contendrán un estado global (por ejemplo, de una store de Vue como [Pinia](https://pinia.vuejs.org/)).

Sus nombres a menudo incluyen el nombre del elemento que envuelven (por ejemplo, `BaseButton`, `BaseTable`), a menos que no exista ningún elemento para tu propósito específico (por ejemplo, `BaseIcon`). Si creas componentes similares para un contexto más específico, casi siempre consumirán esos componentes (por ejemplo, `BaseButton` se puede usar en `ButtonSubmit`).

Algunas ventajas de esta convención:

- Cuando se organizan alfabéticamente en los editores, los componentes básicos de tu aplicación se enumeran juntos, lo que los hace más fáciles de identificar.

- Dado que los nombres de los componentes siempre deben tener varias palabras, esta convención evita que tengas que elegir un prefijo arbitrario para paquetes de componentes simples (por ejemplo, `MyButton`, `VueButton`).

- Dado que estos componentes se usan con tanta frecuencia, es posible que desees simplemente hacerlos globales en lugar de importarlos en todas partes. Un prefijo hace esto posible usando Webpack:

  ```js
  const requireComponent = require.context(
    './src',
    true,
    /Base[A-Z]\w+\.(vue|js)$/
  )
  requireComponent.keys().forEach(function (fileName) {
    let baseComponentConfig = requireComponent(fileName)
    baseComponentConfig =
      baseComponentConfig.default || baseComponentConfig
    const baseComponentName =
      baseComponentConfig.name ||
      fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
    app.component(baseComponentName, baseComponentConfig)
  })
  ```

  :::

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

```
components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue
```

```
components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
```

</div>

## Nombres de componentes de instancia única

**Los componentes que solo deben tener una única instancia activa deben comenzar con el prefijo `The`, para indicar que solo puede haber uno.**

Esto no significa que el componente solo se use en una sola página, sino que solo se usará una vez _por página_. Estos componentes no aceptan props, ya que son específicos para tu aplicación, no del contexto de la misma. Si encuentras la necesidad de agregar props, es buen indicio de que este es en realidad un componente reutilizable que solo se usa una vez por página _por ahora_.

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```
components/
|- Heading.vue
|- MySidebar.vue
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```
components/
|- TheHeading.vue
|- TheSidebar.vue
```

</div>

## Nombres de componentes fuertemente acoplados

**Los componentes hijos que están fuertemente acoplados con su padre deben incluir el nombre del componente padre como prefijo.**

Si un componente solo tiene sentido en el contexto de un único componente padre, dicha relación debe ser evidente en su nombre. Dado que usualmente los editores organizar los archivos alfabéticamente, esto también mantiene a estos archivos relacionados cercanos visualmente.

::: details Explicación detallada
Puede que tengas la tentación de resolver este problema anidando componentes hijos en directorios nombrados como su componente padre. Por ejemplo:

```
components/
|- TodoList/
   |- Item/
      |- index.vue
      |- Button.vue
   |- index.vue
```

o:

```
components/
|- TodoList/
   |- Item/
      |- Button.vue
   |- Item.vue
|- TodoList.vue
```

Esto no es recomendado ya que da como resultado:

- Muchos archivos con nombres similares, haciendo difícil el cambio rápido entre archivos en los editores de código.
- Muchos subdirectorios anidados, lo que aumenta el tiempo que lleva buscar componentes en la barra lateral de un editor.
  :::

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue
```

```
components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

```
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

</div>

## Orden de las palabras en los nombres de componentes

**Los nombres de los componentes deben comenzar con las palabras del nivel más alto (a menudo el más general) y terminar con palabras descriptivas.**

::: details Explicación detallada
Te estarás preguntando:

> "¿Por qué forzar un lenguaje poco natural al nombrar componentes?"

En inglés natural, los adjetivos y otros descriptores suelen aparecer antes de los sustantivos, mientras que las excepciones requieren palabras conectoras. Por ejemplo:

- Café _con_ leche
- Sopa _del_ día
- Visitante _del_ museo

Definitivamente, puedes incluir estas palabras conectoras en los nombres de los componentes si lo deseas, pero el orden sigue siendo importante.

También ten en cuenta que **lo que se considera "el nivel más alto" será contextual a tu aplicación**. Por ejemplo, imagina una aplicación con un formulario de búsqueda. Puedes incluir componentes como este:

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

Como puedes notar, es bastante difícil ver qué componentes son específicos de la búsqueda. Ahora cambiemos el nombre de los componentes de acuerdo con la regla:

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputExcludeGlob.vue
|- SearchInputQuery.vue
|- SettingsCheckboxLaunchOnStartup.vue
|- SettingsCheckboxTerms.vue
```

Puesto que los editores normalmente organizan los archivos alfabéticamente, todas las relaciones importantes entre los componentes ahora son evidentes de un vistazo.

Pudieras verte tentado a resolver este problema de manera diferente, anidando todos los componentes de búsqueda en un directorio de "búsqueda", luego todos los componentes de configuración en un directorio de "configuración". Recomendamos considerar este enfoque solo en aplicaciones muy grandes (por ejemplo, más de 100 componentes), por las siguientes razones:

- Por lo general, lleva más tiempo navegar a través de subdirectorios anidados que desplazarse por un solo directorio de "componentes".
- Los conflictos de nombres (por ejemplo, múltiples componentes `ButtonDelete.vue`) dificultan la navegación rápida a un componente específico en un editor de código.
- La refactorización se vuelve más difícil, porque buscar y reemplazar a menudo no es suficiente para actualizar las referencias relativas a un componente movido.
  :::

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

</div>

## Componentes de cierre automático

**Los componentes sin contenido deben cerrarse automáticamente en [Componentes de un Solo Archivo](/guide/scaling-up/sfc.html), plantillas de cadena y [JSX](/guide/extras/render-function.html#jsx-tsx), pero nunca en plantillas del DOM.**

Los componentes de cierre automático comunican que no solo no tienen contenido, sino que están **destinados** a no tener contenido. Es la diferencia entre una página en blanco en un libro y una etiquetada como "Esta página se dejó en blanco intencionalmente". Tu código también es más limpio sin la etiqueta de cierre innecesaria.

Desafortunadamente, HTML no permite que los elementos personalizados se cierren automáticamente, solo los [elementos "vacíos" oficiales](https://www.w3.org/TR/html/syntax.html#void-elements). Es por eso que la estrategia solo es posible cuando el compilador de plantillas de Vue puede alcanzar la plantilla antes del DOM y luego servir el HTML compatible con las especificaciones del DOM.

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```vue-html
<!-- En Componentes de un Solo Archivo, plantillas de cadenas y JSX -->
<MyComponent></MyComponent>
```

```vue-html
<!-- En plantillas del DOM -->
<my-component/>
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```vue-html
<!-- En Componentes de un Solo Archivo, plantillas de cadenas y JSX -->
<MyComponent/>
```

```vue-html
<!-- En plantillas del DOM -->
<my-component></my-component>
```

</div>

## Formato de nombre de componentes en plantillas

**En la mayoría de los proyectos, los nombres de los componentes siempre deben estar en PascalCase en [Componentes de un Solo Archivo](/guide/scaling-up/sfc.html) y plantillas de cadenas, pero en kebab-case en las plantillas del DOM.**

PascalCase tiene algunas ventajas sobre kebab-case:

- Los editores pueden autocompletar los nombres de los componentes en las plantillas, porque PascalCase también se usa en JavaScript.
- `<MyComponent>` es visualmente más diferente de un elemento HTML de una sola palabra que `<my-component>`, porque hay dos caracteres diferentes (las dos mayúsculas), en lugar de solo uno (el guión).
- Si usas elementos personalizados que no son de Vue en tus plantillas, como un componente web, PascalCase garantiza que tus componentes de Vue permanezcan claramente visibles.

Desafortunadamente, debido a la insensibilidad de mayúsculas y minúsculas de HTML, las plantillas del DOM deben seguir usando kebab-case.

También ten en cuenta que si ya has invertido mucho en kebab-case, la coherencia con las convenciones de HTML y poder usar el mismo enmarcado en todos tus proyectos puede ser más importante que las ventajas enumeradas anteriormente. En esos casos, **también es aceptable usar kebab-case en todas partes.**

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```vue-html
<!-- En Componentes de un Solo Archivo y plantillas de cadenas -->
<mycomponent/>
```

```vue-html
<!-- En Componentes de un Solo Archivo y plantillas de cadenas -->
<myComponent/>
```

```vue-html
<!-- En plantillas del DOM -->
<MyComponent></MyComponent>
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```vue-html
<!-- En Componentes de un Solo Archivo y plantillas de cadenas -->
<MyComponent/>
```

```vue-html
<!-- En plantillas del DOM -->
<my-component></my-component>
```

O

```vue-html
<!-- En todas partes -->
<my-component></my-component>
```

</div>

## Formato de nombre de componentes en JS/JSX

**Los nombres de los componentes en JS/[JSX](/guide/extras/render-function.html#jsx-tsx) deben ir siempre en PascalCase, aunque pueden ir en kebab-cased dentro de las cadenas para aplicaciones más sencillas que sólo utilizan el registro global de componentes a través de `app.component`.**

::: details Explicación detallada
En JavaScript, PascalCase es la convención para clases y constructores de prototipos; esencialmente, cualquier cosa que pueda tener instancias distintas. Los componentes de Vue también tienen instancias, por lo que tiene sentido utilizar también PascalCase. Como beneficio adicional, el uso de PascalCase dentro de JSX (y plantillas) permite a los lectores del código distinguir más fácilmente entre los componentes y los elementos HTML.

Sin embargo, para las aplicaciones que utilizan **sólo** definiciones de componentes globales a través de `app.component`, recomendamos kebab-case en su lugar. Las razones son:

- Es raro que los componentes globales sean referenciados en JavaScript, por lo que seguir una convención para JavaScript tiene menos sentido.
- Estas aplicaciones siempre incluyen muchas plantillas en el DOM, donde [kebab-case **debe** ser utilizado](#formato-de-nombre-de-componentes-en-plantillas).
  :::

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```js
app.component('myComponent', {
  // ...
})
```

```js
import myComponent from './MyComponent.vue'
```

```js
export default {
  name: 'myComponent'
  // ...
}
```

```js
export default {
  name: 'my-component'
  // ...
}
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```js
app.component('MyComponent', {
  // ...
})
```

```js
app.component('my-component', {
  // ...
})
```

```js
import MyComponent from './MyComponent.vue'
```

```js
export default {
  name: 'MyComponent'
  // ...
}
```

</div>

## Nombres de componentes de palabras completas

**Deben preferirse los nombres de componentes con palabras completas en lugar de abreviaturas.**

El autocompletado en los editores hace que el esfuerzo de escribir nombres más largos sea muy bajo, mientras que la claridad que proporcionan es inestimable. En particular, deben evitarse siempre las abreviaturas poco comunes.

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```
components/
|- SdSettings.vue
|- UProfOpts.vue
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

</div>

## Formato de nombre de props

**Los nombres de props deben usar siempre camelCase durante la declaración, y kebab-case en plantillas y [JSX](/guide/extras/render-function.html#jsx-tsx).**

Simplemente estamos siguiendo las convenciones de cada lenguaje. Dentro de JavaScript, camelCase es más natural. Dentro de HTML, lo es kebab-case.

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```js
props: {
  'greeting-text': String
}
```

```vue-html
<WelcomeMessage greetingText="hi"/>
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```js
props: {
  greetingText: String
}
```

```vue-html
<WelcomeMessage greeting-text="hi"/>
```

</div>

## Elementos multi-attributo

**Los elementos con múltiples atributos deben abarcar varias líneas, con un atributo por línea.**

En JavaScript, dividir los objetos con múltiples propiedades en varias líneas se considera una buena convención, porque es mucho más fácil de leer. Nuestras plantillas y [JSX](/guide/extras/render-function.html#jsx-tsx) merecen la misma consideración.

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```vue-html
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo">
```

```vue-html
<MyComponent foo="a" bar="b" baz="c"/>
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```vue-html
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
```

```vue-html
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```

</div>

## Expresiones simples en plantillas

**Las plantillas de los componentes sólo deben incluir expresiones simples, con expresiones más complejas refactorizadas en propiedades o métodos computados.**

Las expresiones complejas en tus plantillas las hacen menos declarativas. Debemos esforzarnos en describir _qué_ debe aparecer, no _cómo_ estamos computando ese valor. Las propiedades y métodos computados también permiten reutilizar el código.

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```vue-html
{{
  fullName.split(' ').map((word) => {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
}}
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```vue-html
<!-- In a plantilla -->
{{ normalizedFullName }}
```

```js
// The complex expression has been moved to a computed property
computed: {
  normalizedFullName() {
    return this.fullName.split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
  }
}
```

</div>

## Propiedades computadas simples

**Las propiedades computadas complejas deben dividirse en tantas propiedades más simples como sea posible.**

::: details Explicación detallada
Las propiedades computadas más simples y bien nombradas son:

- **Más fáciles de probar**

  Cuando cada propiedad computada contiene sólo una expresión muy simple, con muy pocas dependencias, es mucho más fácil escribir pruebas que confirmen que funciona correctamente.

- **Más fácil de leer**

  Simplificar las propiedades computadas obliga a dar a cada valor un nombre descriptivo, aunque no se reutilice. Esto hace que sea mucho más fácil para otros desarrolladores (y para ti en el futuro) centrarse en el código que les interesa y averiguar lo que está pasando.

- **Más adaptable a las necesidades cambiantes**

  Cualquier valor que pueda ser nombrado puede ser útil para la vista. Por ejemplo, podríamos decidir mostrar un mensaje indicando al usuario cuánto dinero ha ahorrado. También podríamos decidir calcular el impuesto sobre las ventas, pero quizás mostrarlo por separado, en lugar de como parte del precio final.

  Las propiedades computadas pequeñas y centradas plantean menos suposiciones sobre cómo se utilizará la información, por lo que requieren menos refactorización a medida que cambian los requisitos.
  :::

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```js
computed: {
  price() {
    const basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```js
computed: {
  basePrice() {
    return this.manufactureCost / (1 - this.profitMargin)
  },

  discount() {
    return this.basePrice * (this.discountPercent || 0)
  },

  finalPrice() {
    return this.basePrice - this.discount
  }
}
```

</div>

## Comillas en los valores de los atributos

**Los valores de atributos HTML no vacíos deben ir siempre entre comillas (simples o dobles, lo que no se utilice en JS).**

Mientras que los valores de atributos sin espacios no están obligados a tener comillas en HTML, esta práctica a menudo conduce a _evitar_ los espacios, haciendo que los valores de atributos sean menos legibles.

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```vue-html
<input type=text>
```

```vue-html
<AppSidebar :style={width:sidebarWidth+'px'}>
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```vue-html
<input type="text">
```

```vue-html
<AppSidebar :style="{ width: sidebarWidth + 'px' }">
```

</div>

## Abreviatura de directivas

**Las abreviaturas de las directivas (`:` para `v-bind:`, `@` para `v-on:` y `#` para `v-slot`) deben utilizarse siempre o nunca.**

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```vue-html
<input
  v-bind:value="newTodoText"
  :placeholder="newTodoInstructions"
>
```

```vue-html
<input
  v-on:input="onInput"
  @focus="onFocus"
>
```

```vue-html
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```vue-html
<input
  :value="newTodoText"
  :placeholder="newTodoInstructions"
>
```

```vue-html
<input
  v-bind:value="newTodoText"
  v-bind:placeholder="newTodoInstructions"
>
```

```vue-html
<input
  @input="onInput"
  @focus="onFocus"
>
```

```vue-html
<input
  v-on:input="onInput"
  v-on:focus="onFocus"
>
```

```vue-html
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template v-slot:footer>
  <p>Here's some contact info</p>
</template>
```

```vue-html
<template #header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```

</div>
