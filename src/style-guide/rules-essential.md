# Reglas de Prioridad A: Esencial

Estas reglas ayudan a prevenir errores; apréndelas y apégate a ellas a toda costa. Pueden existir excepciones, pero deberían ser muy raras y solo las deben realizar por personas expertas tanto en JavaScript como en Vue.

## Usar nombres de componentes de varias palabras

Los nombres de los componentes de usuario siempre deben tener varias palabras, excepto los componentes `App` raíz. Esto [previene conflictos](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name) con elementos HTML existentes y futuros, ya que todos los elementos HTML tienen una sola palabra.

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```vue-html
<!-- en plantillas precompiladas -->
<Item />

<!-- en plantillas del DOM -->
<item></item>
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```vue-html
<!-- en plantillas precompiladas -->
<TodoItem />

<!-- en plantillas del DOM -->
<todo-item></todo-item>
```

</div>

## Usar definiciones detalladas de las props

En el código comprometido, las definiciones de props siempre deberían ser lo más detalladas posible, especificando al menos los tipos.

::: details Explicación detallada
Las [definiciones detalladas de props](/guide/components/props.html#prop-validation) tienen dos ventajas:

- Documentan la API del componente, de modo que es fácil ver cómo se debe usar el componente.
- En desarrollo, Vue te advertirá si proporcionas props con formato incorrecto a un componente, lo que te ayudará a detectar posibles fuentes de error.
  :::

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```js
// Esto está bien solo cuando se crean prototipos
props: ['status']
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```js
props: {
  status: String
}
```

```js
// ¡Aún mejor!
props: {
  status: {
    type: String,
    required: true,

    validator: value => {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].includes(value)
    }
  }
}
```

</div>

## Usar `v-for` con Clave

El uso de `key` con `v-for` _siempre_ es necesaria en los componentes para mantener el estado interno del componente en el subárbol. Sin embargo, incluso para los elementos, es una buena práctica para mantener un comportamiento predecible, tal como la [constancia del objeto](https://bost.ocks.org/mike/constancy/) en las animaciones.

::: details Explicación detallada
Digamos que tienes una lista de ToDos:

```js
data() {
  return {
    todos: [
      {
        id: 1,
        text: 'Aprender a usar v-for'
      },
      {
        id: 2,
        text: 'Aprender a usar key'
      }
    ]
  }
}
```

Luego los ordenas alfabéticamente. Al actualizar el DOM, Vue optimizará el renderizado para realizar las menor cantidad de mutaciones posibles del DOM. Eso podría significar eliminar el primer elemento de los ToDos y luego agregarlo nuevamente al final de la lista.

El problema es que hay casos en los que es importante no eliminar elementos que permanecerán en el DOM. Por ejemplo, es posible que desees utilizar `<transition-group>` para animar la ordenación de la lista o mantener el foco si el elemento renderizado es un `<input>`. En estos casos, agregar una key única para cada elemento (por ejemplo, `:key="todo.id"`) le indicará a Vue cómo comportarse de manera más predecible.

Según nuestra experiencia, _siempre_ es mejor agregar una key única, para que tu y tú equipo nuncan tengan que preocuparse por estos casos extremos. Luego, en los raros escenarios críticos para el rendimiento donde la constancia del objeto no es necesaria, puedes hacer una excepción consciente.
:::

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```vue-html
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```vue-html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

</div>

## Evitar usar `v-if` con `v-for`

**Nunca utilices `v-if` en el mismo elemento que `v-for`.**

Hay dos casos comunes en los que esto puede ser tentador:

- Para filtrar elementos en una lista (por ejemplo, `v-for="user in users" v-if="user.isActive"`). En estos casos, reemplaza `users` con una nueva propiedad calculada que devuelva tu lista filtrada (por ejemplo, `activeUsers`).

- Para evitar mostrar una lista, si debería estar oculta (por ejemplo, `v-for="user in users" v-if="shouldShowUsers"`). En estos casos, mueve el `v-if` a un elemento contenedor (p. ej., `ul`, `ol`).

::: details Explicación detallada
Cuando Vue procesa directivas, `v-if` tiene mayor prioridad que `v-for`, por lo que esta plantilla:

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

arrojará un error, porque la directiva `v-if` será evaluada primero y la variable de iteración `user` no existe en este momento.

Esto podría arreglarse iterando sobre una propiedad calculada, así:

```js
computed: {
  activeUsers() {
    return this.users.filter(user => user.isActive)
  }
}
```

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

Alternativamente, podemos usar una etiqueta `<template>` con `v-for` para envolver el elemento `<li>`:

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

:::

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

</div>

## Usar estilo de ámbito de componente

Para las aplicaciones, los estilos en un componente `App` de nivel superior y en los componentes layout pueden ser globales, pero todos los demás componentes deberían tener siempre un scope.

Esto solo es relevante para los [Componentes de un Solo Archivo](/guide/scaling-up/sfc.html). _No_ se requiere que uses el [atributo `scoped`](https://vue-loader.vuejs.org/en/features/scoped-css.html). El scope podría estar dado a través de [módulos CSS](https://vue-loader.vuejs.org/en/features/css-modules.html), una estrategia basada en clases como [BEM](http://getbem.com), u otra convención de alguna librería.

**Las librerías de componentes, sin embargo, deberían preferir una estrategia basada en clases en lugar de usar el atributo `scoped`.**

Esto facilita la sobreescritura de estilos internos con nombres de clases legibles por humanos que no tienen una especificidad demasiado alta, pero que es muy poco probable que generen conflicto.

::: details Explicación detallada
Si estás desarrollando un proyecto grande, trabajando con otros desarrolladores o incluyendo HTML/CSS de terceros (por ejemplo, de Auth0), el scope coherente garantizará que tus estilos solo se apliquen a los componentes para los que están destinados.

Más allá del atributo `scoped`, el uso de nombres de clase únicos puede ayudar a garantizar que el CSS de terceros no se aplique a tu propio HTML. Por ejemplo, muchos proyectos usan los nombres de clase `button`, `btn` o `icon`, por lo que, incluso si no usas una estrategia como BEM, agregar un prefijo específico de la aplicación y/o del componente (por ejemplo, `ButtonClose-icon`) puede proporcionar cierta protección.
:::

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```vue-html
<template>
  <button class="btn btn-close">×</button>
</template>

<style>
.btn-close {
  background-color: red;
}
</style>
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```vue-html
<template>
  <button class="button button-close">×</button>
</template>

<!-- Usando el atributo `scoped` -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button :class="[$style.button, $style.buttonClose]">×</button>
</template>

<!-- Usando módulos CSS -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button class="c-Button c-Button--close">×</button>
</template>

<!-- Usando la convención BEM -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```

</div>

## Evitar exponer funciones privadas en mixins

Utiliza siempre el prefijo `$_` para propiedades privadas personalizadas en un plugin, mixin, etc. que no deberían considerarse API públicas. Luego, para evitar conflictos con el código de otros autores, incluye también un scope con nombre (por ejemplo, `$_yourPluginName_`).

::: details Explicación detallada
Vue usa el prefijo `_` para definir sus propias propiedades privadas, por lo que usar el mismo prefijo (por ejemplo, `_update`) trae el riesgo de sobrescribir una propiedad de instancia. Incluso si marcas y Vue no está utilizando actualmente un nombre de propiedad en particular, no hay garantía de que no surja un conflicto en una versión posterior.

En cuanto al prefijo `$`, su propósito dentro del ecosistema Vue son las propiedades de instancias especiales que están expuestas al usuario, por lo que no sería apropiado usarlo para propiedades _privadas_.

En su lugar, recomendamos combinar los dos prefijos en `$_`, como una convención para las propiedades privadas definidas por el usuario para garantizar que no haya conflictos con Vue.
:::

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```js
const myGreatMixin = {
  // ...
  methods: {
    update() {
      // ...
    }
  }
}
```

```js
const myGreatMixin = {
  // ...
  methods: {
    _update() {
      // ...
    }
  }
}
```

```js
const myGreatMixin = {
  // ...
  methods: {
    $update() {
      // ...
    }
  }
}
```

```js
const myGreatMixin = {
  // ...
  methods: {
    $_update() {
      // ...
    }
  }
}
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```js
const myGreatMixin = {
  // ...
  methods: {
    $_myGreatMixin_update() {
      // ...
    }
  }
}
```

```js
// ¡Aún mejor!
const myGreatMixin = {
  // ...
  methods: {
    publicMethod() {
      // ...
      myPrivateFunction()
    }
  }
}

function myPrivateFunction() {
  // ...
}

export default myGreatMixin
```

</div>
