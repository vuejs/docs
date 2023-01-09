<script setup>
import { onMounted } from 'vue'

if (typeof window !== 'undefined') {
  const hash = window.location.hash

  // La documentación de v-model solía formar parte de esta página. Se intenta redirigir los enlaces obsoletos.
  if ([
    '#usage-with-v-model',
    '#v-model-arguments',
    '#multiple-v-model-bindings',
    '#handling-v-model-modifiers'
  ].includes(hash)) {
    onMounted(() => {
      window.location = './v-model.html' + hash
    })
  }
}
</script>

# Eventos de los Componentes

> Esta página supone que ya has leído los [Fundamentos de los Componentes](/guide/essentials/component-basics). Léelo primero si eres nuevo en el tema de componentes.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/defining-custom-events-emits" title="Lección gratuita sobre la Definición de Eventos Personalizados en Vue.js"/>
</div>

## Emitiendo y Escuchando Eventos

Un componente puede emitir eventos personalizados directamente en las expresiones de la plantilla (por ejemplo, en un manejador `v-on`) utilizando el método incorporado `$emit`:

```vue-html
<!-- MyComponent -->
<button @click="$emit('someEvent')">Hazme clic</button>
```

<div class="options-api">

El método `$emit()` también está disponible en la instancia del componente como `this.$emit()`:

```js
export default {
  methods: {
    submit() {
      this.$emit('submit')
    }
  }
}
```

</div>

El padre puede entonces escucharlo usando `v-on`:

```vue-html
<MyComponent @some-event="callback" />
```

El modificador `.once` también es compatible con los escuchadores de eventos de los componentes:

```vue-html
<MyComponent @some-event.once="callback" />
```

Al igual que los componentes y props, los nombres de eventos proporcionan una transformación automática de mayúsculas y minúsculas. Observa que emitimos un evento camelCase, pero podemos escucharlo usando un listener kebab-cased en el padre. Como en el caso de la [Nomenclatura de las Props](/guide/components/props.html#nomenclatura-de-las-props), recomendamos utilizar escuchas de eventos con mayúsculas en las plantillas.

::: tip
A diferencia de los eventos nativos del DOM, los eventos emitidos por los componentes **no** se reproducen. Sólo puedes escuchar los eventos emitidos por un componente hijo directo. Si es necesario comunicarse entre componentes hermanos o profundamente anidados, utiliza un bus de eventos externo o una [solución de gestión de estado global](/guide/scaling-up/state-management.html).
:::

## Argumentos del Evento

A veces es útil emitir un valor específico con un evento. Por ejemplo, podemos querer que el componente `<BlogPost>` se encargue de cuánto ampliar el texto. En esos casos, podemos pasar argumentos extra a `$emit` para proporcionar este valor:

```vue-html
<button @click="$emit('increaseBy', 1)">
  Aumentar en 1
</button>
```

Así, cuando escuchamos el evento en el padre, podemos utilizar una función de flecha en línea como oyente, lo que nos permite acceder al argumento del evento:

```vue-html
<MyButton @increase-by="(n) => count += n" />
```

O, si el manejador del evento es un método:

```vue-html
<MyButton @increase-by="increaseCount" />
```

Entonces el valor se pasará como primer parámetro de ese método:

<div class="options-api">

```js
methods: {
  increaseCount(n) {
    this.count += n
  }
}
```

</div>
<div class="composition-api">

```js
function increaseCount(n) {
  count.value += n
}
```

</div>

:::tip
Todos los argumentos adicionales que se pasen a `$emit()` después del nombre del evento serán reenviados a la función de escucha. Por ejemplo, con `$emit('foo', 1, 2, 3)` la función de escucha recibirá tres argumentos.
:::

## Declarando Eventos Emitidos {#declarando-eventos-emitidos}

Un componente puede declarar explícitamente los eventos que emitirá utilizando la macro <span class="composition-api">[`defineEmits()`](/api/sfc-script-setup.html#defineprops-y-defineemits)</span><span class="options-api">opción [`emits`](/api/options-state.html#emits)</span>:

<div class="composition-api">

```vue
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

El método `$emit` que utilizamos en la `<plantilla>` no es accesible dentro de la sección `<script setup>` de un componente, pero `defineEmits()` devuelve una función equivalente que podemos utilizar en su lugar:

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

La macro `defineEmits()` **no puede** ser usada dentro de una función; debe ser colocada directamente dentro de `<script setup>`, como en el ejemplo anterior.

Si estás usando una función explícita `setup` en lugar de `<script setup>`, los eventos deben ser declarados usando la opción [`emits`](/api/options-state.html#emits), y la función `emit` es expuesta en el contexto de `setup()`:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

Al igual que con otras propiedades del contexto `setup()`, `emit` puede ser desestructurado con seguridad:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

</div>
<div class="options-api">

```js
export default {
  emits: ['inFocus', 'submit']
}
```

</div>

La opción `emits` también admite una sintaxis de objeto, que nos permite realizar una validación en tiempo de ejecución del payload de los eventos emitidos:

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  submit(payload) {
    // devuelve `true` o `false` para indicar
    // que la validación ha pasado / no ha pasado
  }
})
</script>
```

Si estás usando TypeScript con `<script setup>`, también es posible declarar eventos emitidos usando anotaciones de tipo puro:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

Más detalles: [Escritura de Emits del Componente](/guide/typescript/composition-api.html#escritura-de-emits-del-componente) <sup class="vt-badge ts" />

</div>
<div class="options-api">

```js
export default {
  emits: {
    submit(payload) {
      // devuelve `true` o `false` para indicar
      // que la validación ha pasado / no ha pasado
    }
  }
}
```

Mira también: [Escritura de Emits del Componente](/guide/typescript/options-api.html#escritura-de-emits-del-componente) <sup class="vt-badge ts" />

</div>

Aunque es opcional, se recomienda definir todos los eventos emitidos para documentar mejor cómo debe funcionar un componente. Esto también permite a Vue excluir a los escuchadores conocidos desde los [atributos fallthrough](/guide/components/attrs.html#herencia-del-escuchador-v-on), evitando situaciones críticas causadas por eventos del DOM enviados manualmente por código de terceros.

:::tip
Si se define un evento nativo (por ejemplo, `clic`) en la opción `emits`, el escuchador solo escuchará ahora los eventos `clic` emitidos por el componente y ya no responderá a los eventos `clic` nativos.
:::

## Validación de Eventos

De forma similar a la validación del tipo de props, un evento emitido puede ser validado si se define con la sintaxis de objeto en lugar de la sintaxis de array.

Para agregar la validación, se asigna al evento una función que recibe los argumentos pasados a la invocación de <span class="options-api">`this.$emit`</span><span class="composition-api">`emit`</span> y devuelve un booleano para indicar si el evento es válido o no.

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  // Sin validación
  click: null,

  // Validar el evento submit
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('¡Payload del evento submit inválido!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

</div>
<div class="options-api">

```js
export default {
  emits: {
    // Sin validación
    click: null,

    // Validar el evento submit
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('¡Payload del evento submit inválido!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
}
```

</div>
