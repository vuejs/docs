---
outline: deep
---

# Attributos Fallthrough

> Esta página supone que ya has leído los [Fundamentos de los Componentes](/guide/essentials/component-basics). Léelo primero si eres nuevo en el tema de componentes.

## Herencia de los Atributos

Un "atributo fallthrough" es un atributo o escuchador de eventos `v-on` que se pasa a un componente, pero que no se declara explícitamente en los [props](./props) o [emits](./events.html#declarando-eventos-emitidos) del componente receptor. Ejemplos comunes de esto son los atributos `class`, `style` e `id`.

Cuando un componente renderiza un único elemento raíz, los atributos fallthrough se añadirán automáticamente a los atributos del elemento raíz. Por ejemplo, dado un componente `<MyButton>` con la siguiente plantilla:

```vue-html
<!-- plantilla de <MyButton> -->
<button>Hazme clic</button>
```

Y un padre usando este componente con:

```vue-html
<MyButton class="large" />
```

El DOM final renderizado sería:

```html
<button class="large">Hazme clic</button>
```

Aquí, `<MyButton>` no declaró `class` como una prop aceptada. Por lo tanto, `class` se trata como un atributo fallthrough y se añade automáticamente al elemento raíz de `<MyButton>`.

### Fusión de `class` y `style`

Si el elemento raíz del componente hijo ya tiene atributos `class` o `style` existentes, se fusionarán con los valores `class` y `style` heredados del padre. Supongamos que cambiamos la plantilla de `<MyButton>` en el ejemplo anterior por

```vue-html
<!-- plantilla de <MyButton> -->
<button class="btn">Hazme clic</button>
```

Entonces el DOM final renderizado pasaría a ser:

```html
<button class="btn large">Hazme clic</button>
```

### Herencia del Escuchador `v-on`

La misma regla se aplica a los escuchadores de eventos `v-on`:

```vue-html
<MyButton @click="onClick" />
```

El escuchador `clic` se agregará al elemento raíz de `<MyButton>`; es decir, el elemento nativo `<button>`. Cuando se haga clic en el `<button>` nativo, se disparará el método `onClick` del componente padre. Si el elemento nativo `<button>` ya tiene un escuchador `clic` vinculado con `v-on`, entonces ambos escuchadores se activarán.

### Herencia de Componentes Anidados

Si un componente renderiza otro componente como su nodo raíz, por ejemplo, refactorizamos `<MyButton>` para renderizar un `<BaseButton>` como su raíz:

```vue-html
<!-- template of <MyButton/> que simplemente renderiza otro componente -->
<BaseButton />
```

Entonces los atributos fallthrough recibidos por `<MyButton>` serán automáticamente reenviados a `<BaseButton>`.

Observa que:

1. Los atributos redireccionados no incluyen ningún atributo declarado como props, o escuchadores `v-on` de eventos declarados por `<MyButton>`; en otras palabras, las props y los escuchadores declarados han sido "consumidos" por `<MyButton>`.

2. Los atributos redireccionados pueden ser aceptados como props por `<BaseButton>`, si son declarados por éste.

## Desactivación de la Herencia de Atributos

Si **no** quieres que un componente herede automáticamente los atributos, puedes establecer `inheritAttrs: false` en las opciones del componente.

<div class="composition-api">

Si se utiliza `<script setup>`, se deberá declarar esta opción utilizando un bloque `<script>` separado y normal:

```vue
<script>
// usar un <script> normal para declarar las opciones
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...lógica del setup
</script>
```

</div>

El escenario común para la deshabilitación de la herencia de atributos es cuando los atributos necesitan ser aplicados a otros elementos además del nodo raíz. Fijando la opción `inheritAttrs` a `false`, puedes tener un control total sobre dónde deben aplicarse los atributos fallthrough.

Se puede acceder a estos atributos fallthrough directamente en las expresiones de plantilla como `$attrs`:

```vue-html
<span>Atributos fallthrough: {{ $attrs }}</span>
```

El objeto `$attrs` incluye todos los atributos que no están declarados por las opciones `props` o `emits` del componente (por ejemplo, `class`, `style`, escuchadores `v-on`, etc.).

Observaciones:

- A diferencia de las props, los atributos fallthrough conservan su formato original en JavaScript, por lo que un atributo como `foo-bar` debe ser accedido como `$attrs['foo-bar']`.

- Un escuchador de eventos `v-on` como `@click` quedará expuesto en el objeto como una función bajo `$attrs.onClick`.

Siguiendo el ejemplo de nuestro componente `<MyButton>` de la [sección anterior](#herencia-de-los-atributos), en ocasiones podemos necesitar envolver el elemento `<button>` con un `<div>` extra por motivos de estilo:

```vue-html
<div class="btn-wrapper">
  <button class="btn">Hazme clic</button>
</div>
```

Deseamos que todos los atributos fallthrough como `class` y los escuchadores `v-on` se apliquen al `<button>` interior, no al `<div>` exterior. Esto lo podemos conseguir con `inheritAttrs: false` y `v-bind="$attrs"`:

```vue-html{2}
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">Hazme clic</button>
</div>
```

Recuerda que [`v-bind` sin un argumento](/guide/essentials/template-syntax.html#vinculacion-dinamica-de-multiples-atributos) vincula todas las propiedades de un objeto como atributos del elemento destino.

## Herencia de los Atributos en los Nodos Raíz Múltiples

A diferencia de los componentes con un único nodo raíz, los componentes con múltiples nodos raíz no tienen un comportamiento automático de herencia de los atributos. Si `$attrs` no está vinculado explícitamente, se emitirá una advertencia en tiempo de ejecución.

```vue-html
<CustomLayout id="custom-layout" @click="changeValue" />
```

Si `<CustomLayout>` tiene la siguiente plantilla multi-root, habrá una advertencia porque Vue no puede estar seguro de dónde aplicar los atributos fallthrough:

```vue-html
<header>...</header>
<main>...</main>
<footer>...</footer>
```

La advertencia se suprimirá si `$attrs` está explícitamente vinculado:

```vue-html{2}
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

## Acceso a los Atributos Fallthrough en JavaScript

<div class="composition-api">

Si es necesario, se puede acceder a los atributos fallthrough de un componente en `<script setup>` utilizando la API `useAttrs()`:

```vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```

Si no se utiliza `<script setup>`, `attrs` se expondrá como una propiedad del contexto `setup()`:

```js
export default {
  setup(props, ctx) {
    // los atributos fallthrough se exponen como ctx.attrs
    console.log(ctx.attrs)
  }
}
```

Ten en cuenta que aunque el objeto `attrs` siempre refleja los últimos atributos fallthrough, no es reactivo (por razones de rendimiento). No puedes utilizar watchers para observar sus cambios. Si necesitas reactividad, utiliza una prop. Alternativamente, puedes utilizar `onUpdated()` para ejecutar efectos secundarios con los últimos `attrs` en cada actualización.

</div>

<div class="options-api">

Si es necesario, puede acceder a los atributos de un componente mediante la propiedad de instancia `$attrs`:

```js
export default {
  created() {
    console.log(this.$attrs)
  }
}
```

</div>
