# Plugins {#plugins}

## Introducción {#introduccion}

Los plugins son código autocontenido que normalmente añaden funcionalidad a nivel de aplicación a Vue. Así es como se instala un plugin:

```js
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* elementos opcionales */
})
```

Un plugin se define como un objeto que expone un método `install()`, o simplemente una función que actúa como la propia función de instalación. La función de instalación recibe la [instancia de la aplicación](/api/application.html) junto con las opciones adicionales pasadas a `app.use()`, si las hay:

```js
const myPlugin = {
  install(app, options) {
    // configurar la app
  }
}
```

No hay un ámbito de aplicación estrictamente definido para un plugin, pero los escenarios comunes en los que los plugins son útiles incluyen:

1. Registrar uno o más componentes globales o directivas personalizadas con [`app.component()`](/api/application.html#app-component) y [`app.directive()`](/api/application.html#app-directive).

2. Hacer un recurso [inyectable](/guide/components/provide-inject.html) en toda la aplicación llamando a [`app.provide()`](/api/application.html#app-provide).

3. Añadir algunas propiedades o métodos de instancia global adjuntándolos a [`app.config.globalProperties`](/api/application.html#app-config-globalproperties).

4. Una librería que necesite realizar alguna combinación de las anteriores (por ejemplo, [vue-router](https://github.com/vuejs/vue-router-next)).

## Escritura de un Plugin {#escritura-de-un-plugin}

Para entender mejor cómo crear tus propios plugins de Vue.js, crearemos una versión muy simplificada de un plugin que muestre cadenas `i18n` (abreviatura de [Internationalization](https://en.wikipedia.org/wiki/Internationalization_and_localization)).

Empecemos por configurar el objeto plugin. Es recomendable crearlo en un archivo separado y exportarlo, como se muestra a continuación para mantener la lógica contenida y separada.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // El código del plugin va aquí
  }
}
```

Queremos crear una función de traducción. Esta función recibirá una cadena delimitada por puntos `key`, que utilizaremos para buscar la cadena traducida en las opciones proporcionadas por el usuario. Este es el uso previsto en las plantillas:

```vue-html
<h1>{{ $translate('greetings.hello') }}</h1>
```

Dado que esta función debería estar disponible de forma global en todas las plantillas, la haremos así adjuntándola a `app.config.globalProperties` en nuestro plugin:

```js{4-11}
// plugins/i18n.js
export default {
  install: (app, options) => {
    // inyectar un método $translate() disponible globalmente
    app.config.globalProperties.$translate = (key) => {
      // recuperar una propiedad anidada en
      // `options` usando `key` como ruta
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```

Nuestra función `$translate` tomará una cadena como `greetings.hello`, buscará dentro de la configuración proporcionada por el usuario y devolverá el valor traducido.

El objeto que contiene las claves traducidas debe pasarse al plugin durante la instalación mediante parámetros adicionales a `app.use()`:

```js
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```

Ahora, nuestra expresión inicial `$translate('greetings.hello')` será reemplazada por `Bonjour!` en tiempo de ejecución.

Consulta también: [Aumento de las Propiedades Globales](/guide/typescript/options-api.html#aumento-de-las-propiedades-globales) <sup class="vt-badge ts" />

:::tip
Utiliza las propiedades globales escasamente, ya que puede volverse rápidamente confuso si se utilizan demasiadas propiedades globales inyectadas por diferentes plugins a lo largo de una app.
:::

### Provide / Inject con Plugins {#provide-inject-con-plugins}

Los plugins también nos permiten utilizar `inject` para proporcionar una función o atributo a los usuarios del plugin. Por ejemplo, podemos permitir que la aplicación tenga acceso al parámetro `options` para poder utilizar el objeto translations.

```js{10}
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = (key) => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }

    app.provide('i18n', options)
  }
}
```

Los usuarios de plugins podrán ahora inyectar las opciones del plugin en sus componentes utilizando la key `i18n`:

<div class="composition-api">

```vue
<script setup>
import { inject } from 'vue'

const i18n = inject('i18n')

console.log(i18n.greetings.hello)
</script>
```

</div>
<div class="options-api">

```js
export default {
  inject: ['i18n'],
  created() {
    console.log(this.i18n.greetings.hello)
  }
}
```

</div>
