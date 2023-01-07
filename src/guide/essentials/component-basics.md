# Fundamentos de los Componentes

Los componentes nos permiten dividir la interfaz de usuario en piezas independientes y reutilizables, y pensar en cada pieza de forma aislada. Es común que una aplicación se organice en un árbol de componentes anidados:

![Árbol de Componentes](./images/components.png)

<!-- https://www.figma.com/file/qa7WHDQRWuEZNRs7iZRZSI/components -->

Esto es muy similar a cómo anidamos los elementos HTML nativos, pero Vue implementa su propio modelo de componentes que nos permite encapsular contenido y lógica personalizados en cada componente. Vue también juega muy bien con los Componentes Web nativos. Si tienes curiosidad por saber la relación entre los Componentes de Vue y los Componentes Web nativos, [lee más aquí](/guide/extras/web-components.html).

## Definiendo un Componente

Cuando usamos un paso de compilación, normalmente definimos cada componente de Vue en un archivo dedicado usando la extensión `.vue` conocido como [Componente de un Solo Archivo](/guide/scaling-up/sfc.html) (abreviado SFC):

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Me has hecho clic {{ count }} veces.</button>
</template>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">Me has hecho clic {{ count }} veces.</button>
</template>
```

</div>

Cuando no se utiliza un paso de compilación, un componente de Vue puede definirse como un objeto JavaScript simple que contiene opciones específicas de Vue:

<div class="options-api">

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      Me has hecho clic {{ count }} veces.
    </button>`
}
```

</div>
<div class="composition-api">

```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `
    <button @click="count++">
      Me has hecho clic {{ count }} veces.
    </button>`
  // o `template: '#my-template-element'`
}
```

</div>

La plantilla se alinea aquí como una cadena de JavaScript, que Vue compilará sobre la marcha. También puedes utilizar un selector de ID que apunte a un elemento (normalmente elementos nativos `<template>`). Vue utilizará su contenido como fuente de la plantilla.

El ejemplo anterior define un único componente y lo exporta como la exportación por defecto de un archivo `.js`, pero puedes usar exportaciones nominales para exportar múltiples componentes desde el mismo archivo.

## Usando un Componente

:::tip
Utilizaremos la sintaxis SFC para el resto de esta guía. Los conceptos en torno a los componentes son los mismos independientemente de si está utilizando un paso de compilación o no. La sección [Ejemplos](/examples/) muestra el uso de componentes en ambos escenarios.
:::

Para usar un componente hijo, necesitamos importarlo en el componente padre. Asumiendo que colocamos nuestro componente contador dentro de un archivo llamado `ButtonCounter.vue`, el componente será expuesto como la exportación por defecto del archivo:

<div class="options-api">

```vue
<script>
import ButtonCounter from './ButtonCounter.vue'

export default {
  components: {
    ButtonCounter
  }
}
</script>

<template>
  <h1>¡Aquí hay un componente hijo!</h1>
  <ButtonCounter />
</template>
```

Para exponer el componente importado a nuestra plantilla, necesitamos [registrarlo](/guide/components/registration.html) con la opción `components`. El componente estará entonces disponible como una etiqueta usando la clave con la que está registrado.

</div>

<div class="composition-api">

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>¡Aquí hay un componente hijo!</h1>
  <ButtonCounter />
</template>
```

Gracias a `<script setup>`, los componentes importados se ponen automáticamente a disposición de la plantilla.

</div>

También es posible registrar globalmente un componente, haciéndolo disponible para todos los componentes de una determinada aplicación sin tener que importarlo. Las ventajas y desventajas del registro global frente al local se discuten en la sección dedicada al [Registro de Componentes](/guide/components/registration.html).

Los componentes pueden ser reutilizados tantas veces como se quieras:

```vue-html
<h1>¡Aquí hay muchos componentes hijos!</h1>
<ButtonCounter />
<ButtonCounter />
<ButtonCounter />
```

<div class="options-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBCdXR0b25Db3VudGVyIGZyb20gJy4vQnV0dG9uQ291bnRlci52dWUnXG4gIFxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7XG4gICAgQnV0dG9uQ291bnRlclxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8aDE+SGVyZSBhcmUgbWFueSBjaGlsZCBjb21wb25lbnRzITwvaDE+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJCdXR0b25Db3VudGVyLnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvdW50OiAwXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImNvdW50KytcIj5cbiAgICBZb3UgY2xpY2tlZCBtZSB7eyBjb3VudCB9fSB0aW1lcy5cbiAgPC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

</div>
<div class="composition-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBCdXR0b25Db3VudGVyIGZyb20gJy4vQnV0dG9uQ291bnRlci52dWUnXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8aDE+SGVyZSBhcmUgbWFueSBjaGlsZCBjb21wb25lbnRzITwvaDE+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJCdXR0b25Db3VudGVyLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tICd2dWUnXG5cbmNvbnN0IGNvdW50ID0gcmVmKDApXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImNvdW50KytcIj5cbiAgICBZb3UgY2xpY2tlZCBtZSB7eyBjb3VudCB9fSB0aW1lcy5cbiAgPC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

</div>

Observa que al hacer clic en los botones, cada uno mantiene su propio "recuento" por separado. Esto se debe a que cada vez que se utiliza un componente, se crea una nueva **instancia** del mismo.

En los SFCs, se recomienda utilizar nombres de etiquetas `PascalCase` para los componentes hijos para diferenciarlos de los elementos HTML nativos. Aunque los nombres de las etiquetas HTML nativas no distinguen entre mayúsculas y minúsculas, el SFC de Vue es un formato compilado, por lo que podemos utilizar nombres de etiquetas que distinguen entre mayúsculas y minúsculas. También podemos utilizar `/>` para cerrar una etiqueta.

Si estás creando tus plantillas directamente en un DOM (por ejemplo, como el contenido de un elemento nativo `<template>`), la plantilla estará sujeto al comportamiento de análisis nativo de HTML del navegador. En estos casos, tendrá que utilizar `kebab-case` y etiquetas de cierre explícitas para los componentes:

```vue-html
<!-- si esta plantilla está escrita en el DOM -->
<button-counter></button-counter>
<button-counter></button-counter>
<button-counter></button-counter>
```

Consulta [análisis de advertencias de la plantilla del DOM](#advertencias-sobre-el-procesamiento-de-las-plantillas-del-dom) para más detalles.

## Pasando Props

Si estamos construyendo un blog, probablemente necesitaremos un componente que represente una entrada del blog. Queremos que todas las entradas del blog compartan el mismo diseño visual, pero con diferente contenido. Dicho componente no será útil a menos que puedas pasarle datos, como el título y el contenido de la entrada específica que queremos mostrar. Es ahí donde entran los props.

Las Props son atributos personalizados que puedes registrar en un componente. Para pasar un título a nuestro componente de entrada de blog, debemos declararlo en la lista de props que este componente acepta, utilizando la opción de la macro <span class="options-api">[`props`](/api/options-state.html#props)</span><span class="composition-api">[`defineProps`](/api/sfc-script-setup.html#defineprops-y-defineemits)</span>:

<div class="options-api">

```vue
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title']
}
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

Cuando se pasa un valor a un atributo prop, se convierte en una propiedad de esa instancia del componente. El valor de esa propiedad es accesible dentro de la plantilla y en el contexto `this` del componente, como cualquier otra propiedad del componente.

</div>
<div class="composition-api">

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

`defineProps` es una macro en tiempo de compilación que sólo está disponible dentro de `<script setup>` y no necesita ser importada explícitamente. Las props declaradas se exponen automáticamente a la plantilla. `defineProps` también devuelve un objeto que contiene todos las props pasadas al componente, para que podamos acceder a ellas en JavaScript si es necesario:

```js
const props = defineProps(['title'])
console.log(props.title)
```

Mira también: [Escritura de las Props de Componentes](/guide/typescript/composition-api.html#escritura-de-las-props-de-componentes) <sup class="vt-badge ts" />

Si no está usando `<script setup>`, las props deben ser declaradas usando la opción `props`, y el objeto props será pasado a `setup()` como primer argumento:

```js
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

</div>

Un componente puede tener tantas props como se quieras y, por defecto, se puede pasar cualquier valor a cualquier prop.

Una vez registrada una prop, puedes pasarle datos como un atributo personalizado, así:

```vue-html
<BlogPost title="Mi viaje con Vue" />
<BlogPost title="Blogueando con Vue" />
<BlogPost title="Por qué Vue es tan divertido" />
```

En una aplicación típica, sin embargo, es probable que tengas un array de posts en tu componente padre:

<div class="options-api">

```js
export default {
  // ...
  data() {
    return {
      posts: [
        { id: 1, title: 'Mi viaje con Vue' },
        { id: 2, title: 'Blogueando con Vue' },
        { id: 3, title: 'Por qué Vue es tan divertido' }
      ]
    }
  }
}
```

</div>
<div class="composition-api">

```js
const posts = ref([
  { id: 1, title: 'Mi viaje con Vue' },
  { id: 2, title: 'Blogueando con Vue' },
  { id: 3, title: 'Por qué Vue es tan divertido' }
])
```

</div>

Después queremos renderizar un componente para cada uno, usando `v-for`:

```vue-html
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
 />
```

<div class="options-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBCbG9nUG9zdFxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3N0czogW1xuICAgICAgICB7IGlkOiAxLCB0aXRsZTogJ015IGpvdXJuZXkgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDIsIHRpdGxlOiAnQmxvZ2dpbmcgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDMsIHRpdGxlOiAnV2h5IFZ1ZSBpcyBzbyBmdW4nIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxCbG9nUG9zdFxuICBcdHYtZm9yPVwicG9zdCBpbiBwb3N0c1wiXG5cdCAgOmtleT1cInBvc3QuaWRcIlxuICBcdDp0aXRsZT1cInBvc3QudGl0bGVcIlxuXHQ+PC9CbG9nUG9zdD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJsb2dQb3N0LnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiBbJ3RpdGxlJ11cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxoND57eyB0aXRsZSB9fTwvaDQ+XG48L3RlbXBsYXRlPiJ9)

</div>
<div class="composition-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5jb25zdCBwb3N0cyA9IHJlZihbXG4gIHsgaWQ6IDEsIHRpdGxlOiAnTXkgam91cm5leSB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMiwgdGl0bGU6ICdCbG9nZ2luZyB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMywgdGl0bGU6ICdXaHkgVnVlIGlzIHNvIGZ1bicgfVxuXSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxCbG9nUG9zdFxuICBcdHYtZm9yPVwicG9zdCBpbiBwb3N0c1wiXG5cdCAgOmtleT1cInBvc3QuaWRcIlxuICBcdDp0aXRsZT1cInBvc3QudGl0bGVcIlxuXHQ+PC9CbG9nUG9zdD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJsb2dQb3N0LnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5kZWZpbmVQcm9wcyhbJ3RpdGxlJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aDQ+e3sgdGl0bGUgfX08L2g0PlxuPC90ZW1wbGF0ZT4ifQ==)

</div>

Observa cómo podemos usar `v-bind` para pasar props dinámicos. Esto resulta especialmente útil cuando no conoces el contenido exacto que vas a renderizar con antelación.

Eso es todo lo que necesitas saber sobre los props por ahora, pero una vez que hayas terminado de leer esta página y te sientas cómodo con su contenido, te recomendamos que vuelvas más tarde para leer la guía completa sobre [Props](/guide/components/props.html).

## Escuchando los Eventos

Según vayamos desarrollando nuestro componente `<BlogPost>`, algunas características pueden requerir comunicarse con el padre. Por ejemplo, podemos decidir incluir una función de accesibilidad para ampliar el texto de las entradas del blog, dejando el resto de la página en su tamaño por defecto.

En el padre, podemos soportar esta característica añadiendo una <span class="options-api">propiedad de data</span><span class="composition-api">ref</span> `postFontSize`:

<div class="options-api">

```js{6}
data() {
  return {
    posts: [
      /* ... */
    ],
    postFontSize: 1
  }
}
```

</div>
<div class="composition-api">

```js{5}
const posts = ref([
  /* ... */
])

const postFontSize = ref(1)
```

</div>

La cual se puede utilizar en la plantilla para controlar el tamaño de la fuente de todas las entradas del blog:

```vue-html{1,7}
<div :style="{ fontSize: postFontSize + 'em' }">
  <BlogPost
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
   />
</div>
```

Ahora vamos a añadir un botón a la plantilla del componente `<BlogPost>`:

```vue{5}
<!-- BlogPost.vue, omitiendo <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button>Ampliar el texto</button>
  </div>
</template>
```

El botón de momento no hace nada; queremos que al hacer clic en el botón comunique al padre que debe ampliar el texto de todas las entradas. Para resolver este problema, las instancias de componentes proporcionan un sistema de eventos personalizado. El padre puede elegir escuchar cualquier evento en la instancia del componente hijo con `v-on` o `@`, tal como lo haríamos con un evento DOM nativo:

```vue-html{3}
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
 />
```

Entonces el componente hijo puede emitir un evento sobre sí mismo llamando al [método **`emit`**](/api/component-instance.html#emit) integrado, pasando el nombre del evento:

```vue{5}
<!-- BlogPost.vue, omitiendo <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Ampliar el texto</button>
  </div>
</template>
```

Gracias al escuchador `@enlarge-text="postFontSize += 0.1"`, el padre recibirá el evento y actualizará el valor de `postFontSize`.

<div class="options-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBCbG9nUG9zdFxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3N0czogW1xuICAgICAgICB7IGlkOiAxLCB0aXRsZTogJ015IGpvdXJuZXkgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDIsIHRpdGxlOiAnQmxvZ2dpbmcgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDMsIHRpdGxlOiAnV2h5IFZ1ZSBpcyBzbyBmdW4nIH1cbiAgICAgIF0sXG4gICAgICBwb3N0Rm9udFNpemU6IDFcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOnN0eWxlPVwieyBmb250U2l6ZTogcG9zdEZvbnRTaXplICsgJ2VtJyB9XCI+XG4gICAgPEJsb2dQb3N0XG4gICAgICB2LWZvcj1cInBvc3QgaW4gcG9zdHNcIlxuICAgICAgOmtleT1cInBvc3QuaWRcIlxuICAgICAgOnRpdGxlPVwicG9zdC50aXRsZVwiXG4gICAgICBAZW5sYXJnZS10ZXh0PVwicG9zdEZvbnRTaXplICs9IDAuMVwiXG4gICAgPjwvQmxvZ1Bvc3Q+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQmxvZ1Bvc3QudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IFsndGl0bGUnXSxcbiAgZW1pdHM6IFsnZW5sYXJnZS10ZXh0J11cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJibG9nLXBvc3RcIj5cblx0ICA8aDQ+e3sgdGl0bGUgfX08L2g0PlxuXHQgIDxidXR0b24gQGNsaWNrPVwiJGVtaXQoJ2VubGFyZ2UtdGV4dCcpXCI+RW5sYXJnZSB0ZXh0PC9idXR0b24+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4ifQ==)

</div>
<div class="composition-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5jb25zdCBwb3N0cyA9IHJlZihbXG4gIHsgaWQ6IDEsIHRpdGxlOiAnTXkgam91cm5leSB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMiwgdGl0bGU6ICdCbG9nZ2luZyB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMywgdGl0bGU6ICdXaHkgVnVlIGlzIHNvIGZ1bicgfVxuXSlcblxuY29uc3QgcG9zdEZvbnRTaXplID0gcmVmKDEpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8ZGl2IDpzdHlsZT1cInsgZm9udFNpemU6IHBvc3RGb250U2l6ZSArICdlbScgfVwiPlxuICAgIDxCbG9nUG9zdFxuICAgICAgdi1mb3I9XCJwb3N0IGluIHBvc3RzXCJcbiAgICAgIDprZXk9XCJwb3N0LmlkXCJcbiAgICAgIDp0aXRsZT1cInBvc3QudGl0bGVcIlxuICAgICAgQGVubGFyZ2UtdGV4dD1cInBvc3RGb250U2l6ZSArPSAwLjFcIlxuICAgID48L0Jsb2dQb3N0PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJsb2dQb3N0LnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5kZWZpbmVQcm9wcyhbJ3RpdGxlJ10pXG5kZWZpbmVFbWl0cyhbJ2VubGFyZ2UtdGV4dCddKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImJsb2ctcG9zdFwiPlxuICAgIDxoND57eyB0aXRsZSB9fTwvaDQ+XG4gICAgPGJ1dHRvbiBAY2xpY2s9XCIkZW1pdCgnZW5sYXJnZS10ZXh0JylcIj5FbmxhcmdlIHRleHQ8L2J1dHRvbj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPiJ9)

</div>

Opcionalmente podemos declarar eventos emitidos utilizando la opción macro <span class="options-api">[`emits`](/api/options-state.html#emits)</span><span class="composition-api">[`defineEmits`](/api/sfc-script-setup.html#defineprops-y-defineemits)</span>:

<div class="options-api">

```vue{5}
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title'],
  emits: ['enlarge-text']
}
</script>
```

</div>
<div class="composition-api">

```vue{4}
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
defineEmits(['enlarge-text'])
</script>
```

</div>

Esto documenta todos los eventos que emite un componente y opcionalmente [los valida](/guide/components/events.html#validacion-de-eventos). También permite a Vue evitar aplicarlos implícitamente como oyentes nativos al elemento raíz del componente hijo.

<div class="composition-api">

Al igual que `defineProps`, `defineEmits` también se puede utilizar sólo en `<script setup>` y no necesita ser importado. Devuelve una función `emit` que se puede utilizar para emitir eventos en el código JavaScript:

```js
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
```

Mira también: [Escritura de Emits del Componente](/guide/typescript/composition-api.html#escritura-de-emits-del-componente) <sup class="vt-badge ts" />

Si no estás usando `<script setup>`, puedes declarar eventos emitidos usando la opción `emits`. Puedes acceder a la función `emit` como una propiedad del contexto de configuración (pasada a `setup()` como segundo argumento):

```js
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
}
```

</div>

Eso es todo lo que necesitas saber sobre los eventos de componentes personalizados por ahora, pero una vez que hayas terminado de leer esta página y te sientas cómodo con su contenido, te recomendamos que vuelvas más tarde para leer la guía completa sobre [Eventos Personalizados](/guide/components/events).

## Distribución de Contenidos con Slots

Al igual que con los elementos HTML, a menudo es útil poder pasar contenido a un componente, de esta manera:

```vue-html
<AlertBox>
  Ha ocurrido algo malo.
</AlertBox>
```

Lo que podría renderizar algo como:

:::danger Esto es un error para fines de demostración
Algo malo ha ocurrido.
:::

Esto puede lograrse utilizando el elemento personalizado `<slot>` de Vue:

```vue{4}
<template>
  <div class="alert-box">
    <strong>Esto es un error para fines de demostración</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

Como verás arriba, usamos el `<slot>` como marcador de posición donde queremos que vaya el contenido, y eso es todo. ¡Ya hemos terminado!

<div class="options-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBBbGVydEJveCBmcm9tICcuL0FsZXJ0Qm94LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgQWxlcnRCb3ggfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PEFsZXJ0Qm94PlxuICBcdFNvbWV0aGluZyBiYWQgaGFwcGVuZWQuXG5cdDwvQWxlcnRCb3g+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJBbGVydEJveC52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJhbGVydC1ib3hcIj5cbiAgICA8c3Ryb25nPkVycm9yITwvc3Ryb25nPlxuICAgIDxici8+XG4gICAgPHNsb3QgLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgc2NvcGVkPlxuLmFsZXJ0LWJveCB7XG4gIGNvbG9yOiAjNjY2O1xuICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogMjBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmODtcbn1cbiAgXG5zdHJvbmcge1xuXHRjb2xvcjogcmVkOyAgICBcbn1cbjwvc3R5bGU+In0=)

</div>
<div class="composition-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBBbGVydEJveCBmcm9tICcuL0FsZXJ0Qm94LnZ1ZSdcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxBbGVydEJveD5cbiAgXHRTb21ldGhpbmcgYmFkIGhhcHBlbmVkLlxuXHQ8L0FsZXJ0Qm94PlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQWxlcnRCb3gudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiYWxlcnQtYm94XCI+XG4gICAgPHN0cm9uZz5FcnJvciE8L3N0cm9uZz5cbiAgICA8YnIvPlxuICAgIDxzbG90IC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZD5cbi5hbGVydC1ib3gge1xuICBjb2xvcjogIzY2NjtcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY4Zjg7XG59XG4gIFxuc3Ryb25nIHtcblx0Y29sb3I6IHJlZDsgICAgXG59XG48L3N0eWxlPiJ9)

</div>

Esto es todo lo que necesitas saber sobre las ranuras por ahora, pero una vez que hayas terminado de leer esta página y te sientas cómodo con su contenido, te recomendamos que vuelvas más tarde para leer la guía completa sobre [Slots](/guide/components/slots).

## Componentes Dinámicos

A veces, es útil cambiar dinámicamente entre componentes, como en una interfaz con pestañas:

<div class="options-api">

[Abrir ejemplo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBIb21lIGZyb20gJy4vSG9tZS52dWUnXG5pbXBvcnQgUG9zdHMgZnJvbSAnLi9Qb3N0cy52dWUnXG5pbXBvcnQgQXJjaGl2ZSBmcm9tICcuL0FyY2hpdmUudnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIEhvbWUsXG4gICAgUG9zdHMsXG4gICAgQXJjaGl2ZVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50VGFiOiAnSG9tZScsXG4gICAgICB0YWJzOiBbJ0hvbWUnLCAnUG9zdHMnLCAnQXJjaGl2ZSddXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiZGVtb1wiPlxuICAgIDxidXR0b25cbiAgICAgICB2LWZvcj1cInRhYiBpbiB0YWJzXCJcbiAgICAgICA6a2V5PVwidGFiXCJcbiAgICAgICA6Y2xhc3M9XCJbJ3RhYi1idXR0b24nLCB7IGFjdGl2ZTogY3VycmVudFRhYiA9PT0gdGFiIH1dXCJcbiAgICAgICBAY2xpY2s9XCJjdXJyZW50VGFiID0gdGFiXCJcbiAgICAgPlxuICAgICAge3sgdGFiIH19XG4gICAgPC9idXR0b24+XG5cdCAgPGNvbXBvbmVudCA6aXM9XCJjdXJyZW50VGFiXCIgY2xhc3M9XCJ0YWJcIj48L2NvbXBvbmVudD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uZGVtbyB7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIHBhZGRpbmc6IDIwcHggMzBweDtcbiAgbWFyZ2luLXRvcDogMWVtO1xuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgb3ZlcmZsb3cteDogYXV0bztcbn1cblxuLnRhYi1idXR0b24ge1xuICBwYWRkaW5nOiA2cHggMTBweDtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogM3B4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogM3B4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJhY2tncm91bmQ6ICNmMGYwZjA7XG4gIG1hcmdpbi1ib3R0b206IC0xcHg7XG4gIG1hcmdpbi1yaWdodDogLTFweDtcbn1cbi50YWItYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2UwZTBlMDtcbn1cbi50YWItYnV0dG9uLmFjdGl2ZSB7XG4gIGJhY2tncm91bmQ6ICNlMGUwZTA7XG59XG4udGFiIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgcGFkZGluZzogMTBweDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkhvbWUudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwidGFiXCI+XG4gICAgSG9tZSBjb21wb25lbnRcbiAgPC9kaXY+XG48L3RlbXBsYXRlPiIsIlBvc3RzLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInRhYlwiPlxuICAgIFBvc3RzIGNvbXBvbmVudFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiQXJjaGl2ZS52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJ0YWJcIj5cbiAgICBBcmNoaXZlIGNvbXBvbmVudFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+In0=)

</div>
<div class="composition-api">

[Abrir ejemplo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBIb21lIGZyb20gJy4vSG9tZS52dWUnXG5pbXBvcnQgUG9zdHMgZnJvbSAnLi9Qb3N0cy52dWUnXG5pbXBvcnQgQXJjaGl2ZSBmcm9tICcuL0FyY2hpdmUudnVlJ1xuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJ1xuIFxuY29uc3QgY3VycmVudFRhYiA9IHJlZignSG9tZScpXG5cbmNvbnN0IHRhYnMgPSB7XG4gIEhvbWUsXG4gIFBvc3RzLFxuICBBcmNoaXZlXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiZGVtb1wiPlxuICAgIDxidXR0b25cbiAgICAgICB2LWZvcj1cIihfLCB0YWIpIGluIHRhYnNcIlxuICAgICAgIDprZXk9XCJ0YWJcIlxuICAgICAgIDpjbGFzcz1cIlsndGFiLWJ1dHRvbicsIHsgYWN0aXZlOiBjdXJyZW50VGFiID09PSB0YWIgfV1cIlxuICAgICAgIEBjbGljaz1cImN1cnJlbnRUYWIgPSB0YWJcIlxuICAgICA+XG4gICAgICB7eyB0YWIgfX1cbiAgICA8L2J1dHRvbj5cblx0ICA8Y29tcG9uZW50IDppcz1cInRhYnNbY3VycmVudFRhYl1cIiBjbGFzcz1cInRhYlwiPjwvY29tcG9uZW50PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbi5kZW1vIHtcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgcGFkZGluZzogMjBweCAzMHB4O1xuICBtYXJnaW4tdG9wOiAxZW07XG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBvdmVyZmxvdy14OiBhdXRvO1xufVxuXG4udGFiLWJ1dHRvbiB7XG4gIHBhZGRpbmc6IDZweCAxMHB4O1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzcHg7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYmFja2dyb3VuZDogI2YwZjBmMDtcbiAgbWFyZ2luLWJvdHRvbTogLTFweDtcbiAgbWFyZ2luLXJpZ2h0OiAtMXB4O1xufVxuLnRhYi1idXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZTBlMGUwO1xufVxuLnRhYi1idXR0b24uYWN0aXZlIHtcbiAgYmFja2dyb3VuZDogI2UwZTBlMDtcbn1cbi50YWIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBwYWRkaW5nOiAxMHB4O1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiSG9tZS52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJ0YWJcIj5cbiAgICBIb21lIGNvbXBvbmVudFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiUG9zdHMudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwidGFiXCI+XG4gICAgUG9zdHMgY29tcG9uZW50XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJBcmNoaXZlLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInRhYlwiPlxuICAgIEFyY2hpdmUgY29tcG9uZW50XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4ifQ==)

</div>

Lo anterior es posible gracias al elemento `<component>` de Vue con el atributo especial `is`:

<div class="options-api">

```vue-html
<!-- El componente cambia cuando cambia el currentTab -->
<component :is="currentTab"></component>
```

</div>
<div class="composition-api">

```vue-html
<!-- El componente cambia cuando cambia el currentTab -->
<component :is="tabs[currentTab]"></component>
```

</div>

En el ejemplo anterior, el valor pasado a `:is` puede contener

- la cadena de nombre de un componente registrado, O
- el objeto componente actual importado

También puedes utilizar el atributo "is" para crear elementos HTML normales.

Cuando se cambia entre varios componentes con `<component :is="...">`, un componente será desmontado cuando se cambie de lugar. Podemos forzar que los componentes inactivos permanezcan "vivos" con el componente integrado [`<KeepAlive>`](/guide/built-ins/keep-alive.html).

## Advertencias sobre el Procesamiento de las Plantillas del DOM

Si estás escribiendo tus plantillas de Vue directamente en el DOM, Vue tendrá que recuperar la cadena de la plantilla desde el DOM. Esto conduce a algunas advertencias debido al comportamiento de análisis nativo de HTML de los navegadores.

:::tip
Debe tenerse en cuenta que las limitaciones discutidas a continuación sólo se aplican si estás escribiendo tus plantillas directamente en el DOM. NO se aplican si está usando plantillas de cadena de las siguientes fuentes:

- Componentes de un Solo Archivo
- Cadenas de plantillas alineadas (por ejemplo, `template: '...'`)
- `<script type="text/x-template">`
  :::

### Insensibilidad a las Mayúsculas y Minúsculas

Las etiquetas HTML y los nombres de atributos no distinguen entre mayúsculas y minúsculas, por lo que los navegadores interpretarán cualquier carácter en mayúscula como en minúscula. Esto significa que cuando se utilizan plantillas en el DOM, los nombres de componentes en PascalCase y los nombres de props en camelCase o los nombres de eventos `v-on` deben utilizar sus equivalentes en kebab-cased (delimitados por guiones):

```js
// camelCase en JavaScript
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
}
```

```vue-html
<!-- kebab-case en el HTML -->
<blog-post post-title="¡hola!" @update-post="onUpdatePost"></blog-post>
```

### Etiquetas de Autocierre

Ya hemos utilizado etiquetas de autocierre para los componentes en los ejemplos de código anteriores:

```vue-html
<MyComponent />
```

Esto es debido a que el parser de plantillas de Vue respeta `/>` como una indicación para terminar cualquier etiqueta, independientemente de su tipo.

Sin embargo, en las plantillas del DOM, debemos incluir siempre etiquetas de cierre explícitas:

```vue-html
<my-component></my-component>
```

Esto es debido a que la especificación HTML sólo permite omitir las etiquetas de cierre en [unos pocos elementos específicos](https://html.spec.whatwg.org/multipage/syntax.html#void-elements), siendo los más comunes `<input>` y `<img>`. Para los demás elementos, si omites la etiqueta de cierre, el analizador nativo de HTML pensará que nunca has terminado la etiqueta de apertura. Por ejemplo, el siguiente fragmento:

```vue-html
<my-component /> <!-- pretendemos cerrar la etiqueta aquí... -->
<span>hola</span>
```

se interpretará como:

```vue-html
<my-component>
  <span>hola</span>
</my-component> <!-- pero el navegador lo cerrará aquí. -->
```

### Restricciones para la Colocación de Elementos

Algunos elementos HTML, como `<ul>`, `<ol>`, `<table>` y `<select>` tienen restricciones sobre qué elementos pueden aparecer dentro de ellos, y algunos elementos como `<li>`, `<tr>` y `<option>` solo pueden aparecer dentro de ciertos otros elementos.

Esto dará lugar a problemas cuando se utilicen componentes con elementos que tengan dichas restricciones. Por ejemplo:

```vue-html
<table>
  <blog-post-row></blog-post-row>
</table>
```

El componente personalizado `<blog-post-row>` será captado como contenido inválido, causando errores en la eventual salida renderizada. Podemos utilizar el [atributo especial `is`](/api/built-in-special-attributes.html#is) como solución:

```vue-html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

:::tip
Cuando se utiliza en elementos HTML nativos, el valor de `is` debe llevar el prefijo `vue:` para ser interpretado como un componente Vue. Esto es necesario para evitar la confusión con los [elementos integrados personalizados](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example) nativos.
:::

¡Enhorabuena! Por ahora, eso es todo lo que necesitas saber sobre el análisis de advertencias de la plantilla del DOM y, en definitiva, el final de los _Esenciales_ de Vue. Todavía hay más que aprender, pero primero, recomendamos tomar un descanso para que juegues con Vue tú mismo, construyas algo divertido o revises algunos de los [Ejemplos](/examples/) si aún no lo has hecho.

Una vez que te sientas cómodo con los conocimientos que acabas de digerir, sigue con la guía para aprender más sobre los componentes en profundidad.
