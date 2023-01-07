# Creando una Aplicación Vue

## La Instancia de la Aplicación

Cada aplicación Vue comienza por la creación de una nueva **instancia de la aplicación** con la función [`createApp`](/api/application#createapp):

```js
import { createApp } from 'vue'

const app = createApp({
  /* opciones del componente root */
})
```

## El Componente Root

El objeto que estamos pasando a `createApp` es de hecho un componente. Cada aplicación requiere un "componente root" que puede contener otros componentes como sus hijos.

Si utilizas Componentes de un Solo Archivo, normalmente importamos el componente root desde otro archivo:

```js
import { createApp } from 'vue'
// importar el componente root App de un componente de un solo archivo.
import App from './App.vue'

const app = createApp(App)
```

Si bien muchos ejemplos de esta guía solo necesitan un único componente, la mayoría de las aplicaciones reales están organizadas en un árbol de componentes anidados y reutilizables. Por ejemplo, el árbol de componentes de una aplicación Todo podría verse así:

```
App (root component)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```

Discutiremos cómo definir y hacer múltiples componentes juntos en secciones posteriores de la guía. Antes de eso, nos centraremos en lo que sucede dentro de un componente único.

## Montando la Aplicación

Una instancia de la aplicación no renderizará nada hasta que se llame a su método `.mount()`. Este espera un argumento "contenedor", que puede ser un elemento real del DOM o un cadena de selección:

```html
<div id="app"></div>
```

```js
app.mount('#app')
```

El contenido del componente root de la aplicación será renderizado dentro del elemento contenedor. El elemento contenedor en sí mismo no se considera parte de la aplicación.

Siempre se debe llamar al método `.mount()` después de que se hayan realizado todas las configuraciones de la aplicación y el registro de los recursos. Ten en cuenta también que su valor de retorno, a diferencia de los métodos de registro de recursos, es la instancia del componente root en lugar de la instancia de la aplicación.

### Plantilla del Componente Root del DOM

Cuando usamos Vue sin un paso de compilación, podemos escribir la plantilla de nuestro componente root directamente dentro del contenedor de montaje:

```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```

```js
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```

Vue utilizará automáticamente el `innerHTML` del contenedor como plantilla si el componente root no tiene ya una opción `template`.

## Configuraciones de la Aplicación

La instanciación de la aplicación revela un objeto `.config` que nos permite configurar algunas opciones a nivel de la aplicación; por ejemplo, definir un controlador de errores a nivel de la aplicación que capture los errores de todos los componentes descendentes:

```js
app.config.errorHandler = (err) => {
  /* gestionar el error */
}
```

La instanciación de la aplicación también proporciona algunos métodos para registrar recursos en el ámbito de la aplicación. Por ejemplo, registrando un componente:

```js
app.component('TodoDeleteButton', TodoDeleteButton)
```

Esto hace que `TodoDeleteButton` esté disponible para su uso en cualquier parte de nuestra aplicación. Hablaremos sobre el registro de componentes y otros tipos de recursos en secciones posteriores de la guía. También puedes revisar la lista completa de instancias de aplicación de las APIs en la [referencia de la API](/api/application).

¡Asegúrate de aplicar todas las configuraciones de la aplicación antes de montarla!

## Múltiples Instancias de la Aplicación

No estás limitado a una sola instancia de la aplicación en la misma página. La API `createApp` permite que varias aplicaciones Vue coexistan en la misma página, cada una con su propio ámbito de configuración y recursos globales:

```js
const app1 = createApp({
  /* ... */
})
app1.mount('#container-1')

const app2 = createApp({
  /* ... */
})
app2.mount('#container-2')
```

Si estás utilizando Vue para mejorar el HTML renderizado por el servidor y solo necesitas Vue para controlar partes específicas de una página grande, evita montar una sola instancia de la aplicación Vue para toda la página. En su lugar, crea varias instancias de aplicación pequeñas y móntalas en los elementos de los que son responsables.
