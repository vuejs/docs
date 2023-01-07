# Características CSS del SFC

## CSS de Ámbito

Cuando una etiqueta `<style>` tiene el atributo `scoped`, su CSS se aplicará solo a los elementos del componente actual. Esto es similar a la encapsulación de estilo que se encuentra en Shadow DOM. Viene con algunas advertencias, pero no requiere ningún polyfills. Se logra mediante el uso de PostCSS para transformar lo siguiente:

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hola</div>
</template>
```

En lo siguiente:

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hola</div>
</template>
```

### Elementos Raíz del Componente Hijo

Con `scoped`, los estilos del componente padre no se filtrarán a los componentes hijos. Sin embargo, el nodo raíz de un componente hijo se verá afectado tanto por el CSS de ámbito del padre como por el CSS de ámbito del hijo. Esto es por diseño para que el padre pueda estilizar el elemento raíz del hijo para propósitos de diseño.

### Selectores de Profundidad

Si deseas que un selector en los estilos de `scoped` sea "profundo", es decir, que afecte a los componentes hijos, puedes usar la pseudo-clase `:deep()`:

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

Lo anterior se compilará en:

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

:::tip
El contenido del DOM creado con `v-html` no se ve afectado por los estilos de ámbito, pero aún así puedes aplicarles estilos utilizando selectores profundos.
:::

### Selectores de Slot

Por defecto, los estilos de ámbito no afectan los contenidos renderizados por `<slot/>`, ya que se considera que son propiedad del componente padre que los pasa. Para apuntar explícitamente al contenido del slot, utiliza la pseudo-clase `:slotted`:

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### Selectores Globales

Si quieres que solo una regla se aplique globalmente, puedes utilizar la pseudo-clase `:global` en lugar de crear otro `<style>` (ver más abajo):

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

### Mezcla de Estilos Locales y Globales

También puede incluir estilos con y sin ámbito en el mismo componente:

```vue
<style>
/* estilos globales */
</style>

<style scoped>
/* estilos locales */
</style>
```

### Tips para el Estilo con Ámbito

- **Los estilos de ámbito no eliminan la necesidad de las clases**. Debido a la forma en que los navegadores renderizan varios selectores de CSS, `p { color: red }` será muchas veces más lento cuando se le aplique el ámbito local (es decir, cuando se combina con un selector de atributos). Si utilizas clases o identificadores en su lugar, como en `.example { color: red }`, entonces prácticamente eliminas ese impacto en el rendimiento.

- **¡Ten cuidado con los selectores descendientes en componentes recursivos!** Para una regla CSS con el selector `.a .b`, si el elemento que coincide con `.a` contiene un componente hijo recursivo, entonces todos los `.b` en ese componente hijo serán coincidentes con la regla.

## Módulos CSS

Una etiqueta `<style module>` se compila como [módulos CSS](https://github.com/css-modules/css-modules) y expone las clases CSS resultantes al componente como un objeto bajo la clave `$style`:

```vue
<template>
  <p :class="$style.red">Esto debería ser rojo</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

Las clases resultantes se codifican para evitar la colisión, logrando el mismo efecto de limitar el alcance del CSS al componente actual únicamente.

Consulta la [especificación de Módulos CSS](https://github.com/css-modules/css-modules) para obtener más detalles, como las [excepciones globales](https://github.com/css-modules/css-modules#exceptions) y la [composición](https://github.com/css-modules/css-modules#composition).

### Nombre de Inyección Personalizado

Puedes personalizar la clave de la propiedad del objeto de las clases inyectadas dándole un valor al atributo `module`:

```vue
<template>
  <p :class="classes.red">rojo</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

### Uso con la Composition API

Se puede acceder a las clases inyectadas en `setup()` y `<script setup>` a través de la API `useCssModule`. Para bloques `<style module>` con nombres de inyección personalizados, `useCssModule` acepta el valor del atributo `module` correspondiente como primer argumento:

```js
import { useCssModule } from 'vue'

// dentro del ámbito de setup()...
// por defecto, devuelve las clases de <style module>
useCssModule()

// nombrado, devuelve las clases para <style module="classes">
useCssModule('classes')
```

## `v-bind()` en CSS

Las etiquetas SFC `<style>` admiten la vinculación de valores CSS al estado de componentes dinámicos mediante la función CSS `v-bind`:

```vue
<template>
  <div class="text">hola</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

La sintaxis funciona con [`<script setup>`](./sfc-script-setup) y admite expresiones de JavaScript (deben estar entre comillas):

```vue
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <p>hola</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

El valor actual se compilará en una propiedad personalizada de CSS con hash, por lo que el CSS sigue siendo estático. La propiedad personalizada se aplicará al elemento raíz del componente a través de estilos en línea y se actualizará de forma reactiva si cambia el valor de origen.
