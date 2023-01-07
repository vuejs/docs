<script setup>
import Basic from './transition-demos/Basic.vue'
import SlideFade from './transition-demos/SlideFade.vue'
import CssAnimation from './transition-demos/CssAnimation.vue'
import NestedTransitions from './transition-demos/NestedTransitions.vue'
import JsHooks from './transition-demos/JsHooks.vue'
import BetweenElements from './transition-demos/BetweenElements.vue'
import BetweenComponents from './transition-demos/BetweenComponents.vue'
</script>

# Transition

Vue ofrece dos componentes incorporados que pueden ayudar a trabajar con transiciones y animaciones en respuesta al cambio de estado:

- `<Transition>` para aplicar animaciones cuando un elemento o componente entra y sale del DOM. Esto se cubre en esta página.

- `<TransitionGroup>` para aplicar animaciones cuando un elemento o componente es insertado, eliminado o movido dentro de una lista`v-for`. Esto se cubre en [el siguiente capítulo](/guide/built-ins/transition-group.html).

Ademas de estos dos componentes, también podemos aplicar animaciones en Vue usando otras técnicas como alternar clases CSS o animaciones impulsadas por el estado a través de enlaces de estilo. Estas técnicas adicionales se tratan en el capítulo [Técnicas de animación](/guide/extras/animation.html).

## El Componente `<Transition>`

`<Transition>` es un componente integrado: esto significa que está disponible en la plantilla de cualquier componente sin tener que registrarlo. Se puede utilizar para aplicar animaciones de entrada y salida en elementos o componentes pasados a través de un slot por defecto. La entrada o salida puede ser activada por una de las siguientes opciones:

- Renderizado condicional mediante `v-if`.
- Visualización condicional mediante `v-show`.
- Alternancia de componentes dinámicos a través del elemento especial `<component>`.

Este es un ejemplo del uso más básico:

```vue-html
<button @click="show = !show">Alternar</button>
<Transition>
  <p v-if="show">Hola</p>
</Transition>
```

```css
/* ¡explicaremos lo que hacen estas clases a continuación! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

<Basic />

<div class="composition-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hvdyA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb24+XG4gICAgPHAgdi1pZj1cInNob3dcIj5oZWxsbzwvcD5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLnYtZW50ZXItYWN0aXZlLFxuLnYtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzIGVhc2U7XG59XG5cbi52LWVudGVyLWZyb20sXG4udi1sZWF2ZS10byB7XG4gIG9wYWNpdHk6IDA7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdzogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb24+XG4gICAgPHAgdi1pZj1cInNob3dcIj5oZWxsbzwvcD5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLnYtZW50ZXItYWN0aXZlLFxuLnYtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzIGVhc2U7XG59XG5cbi52LWVudGVyLWZyb20sXG4udi1sZWF2ZS10byB7XG4gIG9wYWNpdHk6IDA7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

:::tip
`<Transition>` sólo admite un único elemento o componente como contenido del slot. Si el contenido es un componente, el componente también debe tener un único elemento raíz.
:::

Cuando se inserta o elimina un elemento en un componente `<Transition>`, esto es lo que sucede:

1. Vue detectará automáticamente si el elemento de destino tiene transiciones o animaciones CSS aplicadas. Si las tiene, se añadirá/eliminará un número de [clases de transición CSS](#clases-de-transicion) en los momentos adecuados.

2. Si hay escuchadores para [hooks de JavaScript](#hooks-de-javascript), estos hooks serán llamados en los momentos apropiados.

3. Si no se detectan transiciones / animaciones CSS y no se proporcionan hooks de JavaScript, las operaciones del DOM para la inserción y/o eliminación se ejecutarán en el siguiente frame de animación del navegador.

## Transiciones Basadas en CSS

### Clases de Transición

Hay seis clases aplicadas para las transiciones de entrada/salida.

![Diagrama de Transición](./images/transition-classes.png)

<!-- https://www.figma.com/file/rlOv0ZKJFFNA9hYmzdZv3S/Transition-Classes -->

1. `v-enter-from`: Estado inicial de la entrada. Se añade antes de que se inserte el elemento, se elimina un frame después de que se inserte el elemento.

2. `v-enter-active`: Estado activo para entrar. Se aplica durante toda la fase de entrada. Se añade antes de que se inserte el elemento, se elimina cuando termina la transición/animación. Esta clase se puede utilizar para definir la duración, el retardo y la curva de atenuación de la transición de entrada.

3. `v-enter-to`: Estado de finalización de la entrada. Se añade un frame después de la inserción del elemento (al mismo tiempo que se elimina el `v-enter-from`), se elimina cuando termina la transición/animación.

4. `v-leave-from`: Estado inicial para la salida. Se añade inmediatamente cuando se activa una transición de salida, se elimina después de un frame.

5. `v-leave-active`: Estado activo para la salida. Se aplica durante toda la fase de salida. Se añade inmediatamente cuando se activa una transición de salida, y se elimina cuando termina la transición/animación. Esta clase puede utilizarse para definir la duración, el retardo y la curva de atenuación de la transición de salida.

6. `v-leave-to`: Estado de finalización de la salida. Se añade un frame después de que se active una transición de salida (al mismo tiempo que se elimina `v-leave-from`), y se elimina cuando termina la transición/animación.

`v-enter-active` y `v-leave-active` nos dan la posibilidad de especificar diferentes curvas de atenuación para las transiciones de entrada/salida, de las que veremos un ejemplo en las siguientes secciones.

### Transiciones Asignadas

Una transición puede ser nombrada a través de la proposición `name`:

```vue-html
<Transition name="fade">
  ...
</Transition>
```

Para una transición asignada, sus clases de transición llevarán el prefijo de su nombre en lugar de `v`. Por ejemplo, la clase aplicada para la transición anterior será `fade-enter-active` en lugar de `v-enter-active`. El CSS para la transición de desvanecimiento debería tener este aspecto:

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

### Transiciones CSS

La propiedad `<Transition>` se utiliza más comúnmente en combinación con [transiciones CSS nativas](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions), como se ve en el ejemplo básico anterior. La propiedad CSS `transition` es una abreviatura que nos permite especificar múltiples aspectos de una transición, incluyendo las propiedades que deben ser animadas, la duración de la transición y las [curvas de atenuación](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function).

Aquí hay un ejemplo más avanzado que transiciona múltiples propiedades, con diferentes duraciones y curvas de atenuación para entrar y salir:

```vue-html
<Transition name="slide-fade">
  <p v-if="show">hola</p>
</Transition>
```

```css
/*
  Las animaciones de entrada y salida pueden utilizar 
  diferentes duraciones y funciones de sincronización.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```

<SlideFade />

<div class="composition-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hvdyA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGUgU2xpZGUgKyBGYWRlPC9idXR0b24+XG4gIDxUcmFuc2l0aW9uIG5hbWU9XCJzbGlkZS1mYWRlXCI+XG4gICAgPHAgdi1pZj1cInNob3dcIj5oZWxsbzwvcD5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLnNsaWRlLWZhZGUtZW50ZXItYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1vdXQ7XG59XG5cbi5zbGlkZS1mYWRlLWxlYXZlLWFjdGl2ZSB7XG4gIHRyYW5zaXRpb246IGFsbCAwLjhzIGN1YmljLWJlemllcigxLCAwLjUsIDAuOCwgMSk7XG59XG5cbi5zbGlkZS1mYWRlLWVudGVyLWZyb20sXG4uc2xpZGUtZmFkZS1sZWF2ZS10byB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyMHB4KTtcbiAgb3BhY2l0eTogMDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdzogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGUgU2xpZGUgKyBGYWRlPC9idXR0b24+XG4gIDxUcmFuc2l0aW9uIG5hbWU9XCJzbGlkZS1mYWRlXCI+XG4gICAgPHAgdi1pZj1cInNob3dcIj5oZWxsbzwvcD5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLnNsaWRlLWZhZGUtZW50ZXItYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1vdXQ7XG59XG5cbi5zbGlkZS1mYWRlLWxlYXZlLWFjdGl2ZSB7XG4gIHRyYW5zaXRpb246IGFsbCAwLjhzIGN1YmljLWJlemllcigxLCAwLjUsIDAuOCwgMSk7XG59XG5cbi5zbGlkZS1mYWRlLWVudGVyLWZyb20sXG4uc2xpZGUtZmFkZS1sZWF2ZS10byB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyMHB4KTtcbiAgb3BhY2l0eTogMDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

### Animaciones CSS

Las [animaciones CSS nativas](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Animations/Using_CSS_animations) se aplican de la misma manera que las transiciones CSS, con la diferencia de que `*-enter-from` no se elimina inmediatamente después de insertar el elemento, sino en un evento `animationend`.

Para la mayoría de las animaciones CSS, podemos simplemente declararlas bajo las clases `*-enter-active` y `*-leave-active`. He aquí un ejemplo:

```vue-html
<Transition name="bounce">
  <p v-if="show" style="text-align: center;">
    Hola, ¡aquí hay un texto animado!
  </p>
</Transition>
```

```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
```

<CssAnimation />

<div class="composition-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hvdyA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb24gbmFtZT1cImJvdW5jZVwiPlxuICAgIDxwIHYtaWY9XCJzaG93XCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAyMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7XCI+XG4gICAgICBIZWxsbyBoZXJlIGlzIHNvbWUgYm91bmN5IHRleHQhXG4gICAgPC9wPlxuICA8L1RyYW5zaXRpb24+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uYm91bmNlLWVudGVyLWFjdGl2ZSB7XG4gIGFuaW1hdGlvbjogYm91bmNlLWluIDAuNXM7XG59XG4uYm91bmNlLWxlYXZlLWFjdGl2ZSB7XG4gIGFuaW1hdGlvbjogYm91bmNlLWluIDAuNXMgcmV2ZXJzZTtcbn1cbkBrZXlmcmFtZXMgYm91bmNlLWluIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIH1cbiAgNTAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMjUpO1xuICB9XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gIH1cbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdzogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb24gbmFtZT1cImJvdW5jZVwiPlxuICAgIDxwIHYtaWY9XCJzaG93XCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAyMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7XCI+XG4gICAgICBIZWxsbyBoZXJlIGlzIHNvbWUgYm91bmN5IHRleHQhXG4gICAgPC9wPlxuICA8L1RyYW5zaXRpb24+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uYm91bmNlLWVudGVyLWFjdGl2ZSB7XG4gIGFuaW1hdGlvbjogYm91bmNlLWluIDAuNXM7XG59XG4uYm91bmNlLWxlYXZlLWFjdGl2ZSB7XG4gIGFuaW1hdGlvbjogYm91bmNlLWluIDAuNXMgcmV2ZXJzZTtcbn1cbkBrZXlmcmFtZXMgYm91bmNlLWluIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIH1cbiAgNTAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMjUpO1xuICB9XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gIH1cbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

### Clases para Transición Personalizadas

También puedes especificar clases de transición personalizadas pasando las siguientes props a `<Transition>`:

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

Estas sobreescriben los nombres de clase convencionales. Esto es especialmente útil cuando se quiere combinar el sistema de transición de Vue con una biblioteca de animación CSS existente, como [Animate.css](https://daneden.github.io/animate.css/):

```vue-html
<¡ -- suponiendo que Animate.css está incluido en la página -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">hola</p>
</Transition>
```

<div class="composition-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hvdyA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb25cbiAgICBuYW1lPVwiY3VzdG9tLWNsYXNzZXNcIlxuICAgIGVudGVyLWFjdGl2ZS1jbGFzcz1cImFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX3RhZGFcIlxuICAgIGxlYXZlLWFjdGl2ZS1jbGFzcz1cImFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX2JvdW5jZU91dFJpZ2h0XCJcbiAgPlxuICAgIDxwIHYtaWY9XCJzaG93XCI+aGVsbG88L3A+XG4gIDwvVHJhbnNpdGlvbj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbkBpbXBvcnQgXCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9hbmltYXRlLmNzcy80LjEuMS9hbmltYXRlLm1pbi5jc3NcIjtcbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdzogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb25cbiAgICBuYW1lPVwiY3VzdG9tLWNsYXNzZXNcIlxuICAgIGVudGVyLWFjdGl2ZS1jbGFzcz1cImFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX3RhZGFcIlxuICAgIGxlYXZlLWFjdGl2ZS1jbGFzcz1cImFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX2JvdW5jZU91dFJpZ2h0XCJcbiAgPlxuICAgIDxwIHYtaWY9XCJzaG93XCI+aGVsbG88L3A+XG4gIDwvVHJhbnNpdGlvbj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbkBpbXBvcnQgXCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9hbmltYXRlLmNzcy80LjEuMS9hbmltYXRlLm1pbi5jc3NcIjtcbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

### Uso Conjunto de Transiciones y Animaciones

Vue necesita adjuntar escuchadores de eventos para saber cuándo ha terminado una transición. Estos pueden ser `transitionend` o `animationend`, dependiendo del tipo de reglas CSS aplicadas. Si sólo utilizas una u otra, Vue puede detectar automáticamente el tipo correcto.

Sin embargo, en algunos casos puedes querer tener ambos en el mismo elemento, por ejemplo, tener una animación CSS activada por Vue, junto con un efecto de transición CSS al pasar por encima. En estos casos, tendrás que declarar explícitamente el tipo que quieres que le interese a Vue pasando la proposición `type`, con un valor de `animation` o `transition`:

```vue-html
<Transition type="animation">...</Transition>

```

### Transiciones Anidadas y Duraciones de Transición Explícitas

Aunque las clases de transición sólo se aplican al elemento hijo directo de `<Transition>`, podemos realizar transiciones en elementos anidados utilizando selectores CSS anidados:

```vue-html
<Transition name="nested">
  <div v-if="show" class="outer">
    <div class="inner">
      Hola
    </div>
  </div>
</Transition>
```

```css
/* reglas que apuntan a elementos anidados */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}

/* ... se omite otro CSS necesario */
```

Incluso podemos añadir un retardo de transición al elemento anidado al entrar, lo que crea una secuencia de animación de entrada gradual:

```css{3}
/* retrasa la entrada del elemento anidado para un efecto gradual */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}
```

Sin embargo, esto crea un pequeño problema. Por defecto, el componente `<Transition>` intenta averiguar automáticamente cuándo ha terminado la transición escuchando el **primer** evento `transitionend` o `animationend` del elemento de transición raíz. Con una transición anidada, el comportamiento deseado debería ser esperar hasta que las transiciones de todos los elementos internos hayan terminado.

En estos casos se puede especificar una duración explícita de la transición (en milisegundos) utilizando la propiedad `duration` del componente `<transition>`. La duración total debe coincidir con el retardo más la duración de la transición del elemento interno:

```vue-html
<Transition :duration="550">...</Transition>
```

<NestedTransitions />

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hvdyA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb24gZHVyYXRpb249XCI1NTBcIiBuYW1lPVwibmVzdGVkXCI+XG4gICAgPGRpdiB2LWlmPVwic2hvd1wiIGNsYXNzPVwib3V0ZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lclwiPlxuICAgXHRcdFx0SGVsbG9cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L1RyYW5zaXRpb24+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4ub3V0ZXIsIC5pbm5lciB7XG5cdGJhY2tncm91bmQ6ICNlZWU7XG4gIHBhZGRpbmc6IDMwcHg7XG4gIG1pbi1oZWlnaHQ6IDEwMHB4O1xufVxuICBcbi5pbm5lciB7IFxuICBiYWNrZ3JvdW5kOiAjY2NjO1xufVxuICBcbi5uZXN0ZWQtZW50ZXItYWN0aXZlLCAubmVzdGVkLWxlYXZlLWFjdGl2ZSB7XG5cdHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xufVxuLyogZGVsYXkgbGVhdmUgb2YgcGFyZW50IGVsZW1lbnQgKi9cbi5uZXN0ZWQtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbi1kZWxheTogMC4yNXM7XG59XG5cbi5uZXN0ZWQtZW50ZXItZnJvbSxcbi5uZXN0ZWQtbGVhdmUtdG8ge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMzBweCk7XG4gIG9wYWNpdHk6IDA7XG59XG5cbi8qIHdlIGNhbiBhbHNvIHRyYW5zaXRpb24gbmVzdGVkIGVsZW1lbnRzIHVzaW5nIG5lc3RlZCBzZWxlY3RvcnMgKi9cbi5uZXN0ZWQtZW50ZXItYWN0aXZlIC5pbm5lcixcbi5uZXN0ZWQtbGVhdmUtYWN0aXZlIC5pbm5lciB7IFxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbn1cbi8qIGRlbGF5IGVudGVyIG9mIG5lc3RlZCBlbGVtZW50ICovXG4ubmVzdGVkLWVudGVyLWFjdGl2ZSAuaW5uZXIge1xuXHR0cmFuc2l0aW9uLWRlbGF5OiAwLjI1cztcbn1cblxuLm5lc3RlZC1lbnRlci1mcm9tIC5pbm5lcixcbi5uZXN0ZWQtbGVhdmUtdG8gLmlubmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDMwcHgpO1xuICAvKlxuICBcdEhhY2sgYXJvdW5kIGEgQ2hyb21lIDk2IGJ1ZyBpbiBoYW5kbGluZyBuZXN0ZWQgb3BhY2l0eSB0cmFuc2l0aW9ucy5cbiAgICBUaGlzIGlzIG5vdCBuZWVkZWQgaW4gb3RoZXIgYnJvd3NlcnMgb3IgQ2hyb21lIDk5KyB3aGVyZSB0aGUgYnVnXG4gICAgaGFzIGJlZW4gZml4ZWQuXG4gICovXG4gIG9wYWNpdHk6IDAuMDAxO1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Si es necesario, también puede especificar valores separados para las duraciones de entrada y salida utilizando un objeto:

```vue-html
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

### Consideraciones sobre el Rendimiento

Puedes observar que las animaciones mostradas anteriormente utilizan principalmente propiedades como `transform` y `opacity`. Estas propiedades son eficientes para animar porque:

1. No afectan al diseño del documento durante la animación, por lo que no activan el costoso cálculo del diseño CSS en cada frame de la animación.

2. La mayoría de los navegadores modernos pueden aprovechar la aceleración por hardware de la GPU al animar el `transform`.

En comparación, propiedades como `height` o `margin` activarán la maquetación CSS, por lo que son mucho más costosas de animar, y deben utilizarse con precaución. Podemos consultar recursos como [CSS-Triggers](https://csstriggers.com/) para ver qué propiedades activarán el maquetado si las animamos.

## Hooks de JavaScript

Podemos usar hooks en el proceso de transición con JavaScript escuchando los eventos del componente `<Transition>`:

```html
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>
```

<div class="composition-api">

```js
// llamado antes de que el elemento se inserte en el DOM.
// Utiliza esto para establecer el estado de "entrada" del elemento
function onBeforeEnter(el) {}

// llamado de un frame después de que el elemento está insertado.
// usa esto para iniciar la animación de entrada.
function onEnter(el, done) {
  // llama al callback done para indicar el fin de la transición
  // opcional si se usa en combinación con CSS
  done()
}

// llamado cuando la transición de entrada ha terminado.
function onAfterEnter(el) {}
function onEnterCancelled(el) {}

// llamado antes del hook de salida.
// La mayoría de las veces, sólo debes usar el hook de salida
function onBeforeLeave(el) {}

// llamado cuando comienza la transición de salida.
// usa esto para iniciar la animación de salida.
function onLeave(el, done) {
  // llama al callback done para indicar el fin de la transición
  // opcional si se usa en combinación con CSS
  hecho()
}

// llamado cuando la transición de salida ha terminado y el
// elemento ha sido eliminado del DOM.
function onAfterLeave(el) {}

// sólo disponible con transiciones v-show
function onLeaveCancelled(el) {}
```

</div>
<div class="options-api">

```js
export default {
  // ...
  methods: {
    // llamado antes de que el elemento se inserte en el DOM.
    // Utiliza esto para establecer el estado de "entrada" del elemento
    onBeforeEnter(el) {}

    // llamado de un frame después de que el elemento está insertado.
    // usa esto para iniciar la animación de entrada.
    onEnter(el, done) {
      // llama al callback done para indicar el fin de la transición
      // opcional si se usa en combinación con CSS
      done()
    }

    // llamado cuando la transición de entrada ha terminado.
    onAfterEnter(el) {}
    onEnterCancelled(el) {}

    // llamado antes del hook de salida.
    // La mayoría de las veces, sólo debes usar el hook de salida
    onBeforeLeave(el) {}

    // llamado cuando comienza la transición de salida.
    // usa esto para iniciar la animación de salida.
    onLeave(el, done) {
      // llama al callback done para indicar el fin de la transición
      // opcional si se usa en combinación con CSS
      hecho()
    }

    // llamado cuando la transición de salida ha terminado y el
    // elemento ha sido eliminado del DOM.
    onAfterLeave(el) {}

    // sólo disponible con transiciones v-show
    onLeaveCancelled(el) {}
  }
}
```

</div>

Estos hooks pueden utilizarse en combinación con transiciones/animaciones de CSS o por sí solos.

Cuando se utilizan transiciones sólo JavaScript, suele ser una buena idea añadir la propiedad `:css="false"`. Esto le dice explícitamente a Vue que omita la detección automática de transiciones CSS. Además de ser un poco más eficiente, esto también evita que las reglas de CSS interfieran accidentalmente con la transición:

```vue-html{3}
<Transition
  ...
  :css="false"
>
  ...
</Transition>
```

Con `:css="false"`, también somos totalmente responsables de controlar cuándo termina la transición. En este caso, los callbacks `done` son necesarios para los hooks `@enter` y `@leave`. De lo contrario, los hooks serán llamados de forma sincrónica y la transición terminará inmediatamente.

Aquí hay una demostración que utiliza la [librería GreenSock](https://greensock.com/) para realizar las animaciones. Por supuesto, puedes usar cualquier otra librería de animación que quieras, por ejemplo [Anime.js](https://animejs.com/) o [Motion One](https://motion.dev/).

<JsHooks />

<div class="composition-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG5cbmNvbnN0IHNob3cgPSByZWYodHJ1ZSlcblxuZnVuY3Rpb24gb25CZWZvcmVFbnRlcihlbCkge1xuICBnc2FwLnNldChlbCwge1xuICAgIHNjYWxlWDogMC4yNSxcbiAgICBzY2FsZVk6IDAuMjUsXG4gICAgb3BhY2l0eTogMVxuICB9KVxufVxuICBcbmZ1bmN0aW9uIG9uRW50ZXIoZWwsIGRvbmUpIHtcbiAgZ3NhcC50byhlbCwge1xuICAgIGR1cmF0aW9uOiAxLFxuICAgIHNjYWxlWDogMSxcbiAgICBzY2FsZVk6IDEsXG4gICAgb3BhY2l0eTogMSxcbiAgICBlYXNlOiAnZWxhc3RpYy5pbk91dCgyLjUsIDEpJyxcbiAgICBvbkNvbXBsZXRlOiBkb25lXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG9uTGVhdmUoZWwsIGRvbmUpIHtcblx0Z3NhcC50byhlbCwge1xuICAgIGR1cmF0aW9uOiAwLjcsXG4gICAgc2NhbGVYOiAxLFxuICAgIHNjYWxlWTogMSxcbiAgICB4OiAzMDAsXG4gICAgZWFzZTogJ2VsYXN0aWMuaW5PdXQoMi41LCAxKSdcbiAgfSlcbiAgZ3NhcC50byhlbCwge1xuICAgIGR1cmF0aW9uOiAwLjIsXG4gICAgZGVsYXk6IDAuNSxcbiAgICBvcGFjaXR5OiAwLFxuICAgIG9uQ29tcGxldGU6IGRvbmVcbiAgfSlcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b24gQGNsaWNrPVwic2hvdyA9ICFzaG93XCI+VG9nZ2xlPC9idXR0b24+XG5cbiAgPFRyYW5zaXRpb25cbiAgICBAYmVmb3JlLWVudGVyPVwib25CZWZvcmVFbnRlclwiXG4gICAgQGVudGVyPVwib25FbnRlclwiXG4gICAgQGxlYXZlPVwib25MZWF2ZVwiXG4gICAgOmNzcz1cImZhbHNlXCJcbiAgPlxuICAgIDxkaXYgY2xhc3M9XCJnc2FwLWJveFwiIHYtaWY9XCJzaG93XCI+PC9kaXY+XG4gIDwvVHJhbnNpdGlvbj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbi5nc2FwLWJveCB7XG4gIGJhY2tncm91bmQ6ICM0MmI4ODM7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG4gIHdpZHRoOiAzMHB4O1xuICBoZWlnaHQ6IDMwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cbjwvc3R5bGU+XG4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJnc2FwXCI6IFwiaHR0cHM6Ly91bnBrZy5jb20vZ3NhcD9tb2R1bGVcIixcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG4gIFxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG93OiB0cnVlXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG5cdFx0b25CZWZvcmVFbnRlcixcbiAgICBvbkVudGVyLFxuICAgIG9uTGVhdmVcbiAgfVxufVxuXG5mdW5jdGlvbiBvbkJlZm9yZUVudGVyKGVsKSB7XG4gIGdzYXAuc2V0KGVsLCB7XG4gICAgc2NhbGVYOiAwLjI1LFxuICAgIHNjYWxlWTogMC4yNSxcbiAgICBvcGFjaXR5OiAxXG4gIH0pXG59XG4gIFxuZnVuY3Rpb24gb25FbnRlcihlbCwgZG9uZSkge1xuICBnc2FwLnRvKGVsLCB7XG4gICAgZHVyYXRpb246IDEsXG4gICAgc2NhbGVYOiAxLFxuICAgIHNjYWxlWTogMSxcbiAgICBvcGFjaXR5OiAxLFxuICAgIGVhc2U6ICdlbGFzdGljLmluT3V0KDIuNSwgMSknLFxuICAgIG9uQ29tcGxldGU6IGRvbmVcbiAgfSlcbn1cblxuZnVuY3Rpb24gb25MZWF2ZShlbCwgZG9uZSkge1xuXHRnc2FwLnRvKGVsLCB7XG4gICAgZHVyYXRpb246IDAuNyxcbiAgICBzY2FsZVg6IDEsXG4gICAgc2NhbGVZOiAxLFxuICAgIHg6IDMwMCxcbiAgICBlYXNlOiAnZWxhc3RpYy5pbk91dCgyLjUsIDEpJ1xuICB9KVxuICBnc2FwLnRvKGVsLCB7XG4gICAgZHVyYXRpb246IDAuMixcbiAgICBkZWxheTogMC41LFxuICAgIG9wYWNpdHk6IDAsXG4gICAgb25Db21wbGV0ZTogZG9uZVxuICB9KVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cblxuICA8VHJhbnNpdGlvblxuICAgIEBiZWZvcmUtZW50ZXI9XCJvbkJlZm9yZUVudGVyXCJcbiAgICBAZW50ZXI9XCJvbkVudGVyXCJcbiAgICBAbGVhdmU9XCJvbkxlYXZlXCJcbiAgICA6Y3NzPVwiZmFsc2VcIlxuICA+XG4gICAgPGRpdiBjbGFzcz1cImdzYXAtYm94XCIgdi1pZj1cInNob3dcIj48L2Rpdj5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmdzYXAtYm94IHtcbiAgYmFja2dyb3VuZDogIzQyYjg4MztcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMzBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuPC9zdHlsZT5cbiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcImdzYXBcIjogXCJodHRwczovL3VucGtnLmNvbS9nc2FwP21vZHVsZVwiLFxuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

## Transiciones Reutilizables

Las transiciones pueden ser reutilizadas a través del sistema de componentes de Vue. Para crear una transición reutilizable, podemos crear un componente que envuelve el componente `<Transition>` y pasa el contenido del slot:

```vue{5}
<!-- MyTransition.vue -->
<script>
// lógica del hook de JavaScript...
</script>

<template>
  <!-- envolver el componente integrado Transition -->
  <Transition
    name="my-transition"
    @enter="onEnter"
    @leave="onLeave">
    <slot></slot> <!-- pasar el contenido del slot -->
  </Transition>
</template>

<style>
/*
  CSS necesario...
  Nota: evita el uso de <style scoped> aquí
  ya que no se aplica al contenido del slot.
*/
</style>
```

Ahora `MyTransition` puede importarse y utilizarse igual que la versión integrada:

```vue-html
<MyTransition>
  <div v-if="show">Hola</div>
</MyTransition>
```

## Transición al Aparecer

Si también quieres aplicar una transición en el renderizado inicial de un nodo, puedes añadir la prop `appear`:

```vue-html
<Transition appear>
  ...
</Transition>
```

## Transición Entre Elementos

Además de alternar un elemento con `v-if` / `v-show`, también podemos hacer una transición entre dos elementos utilizando `v-if` / `v-else` / `v-else-if`, siempre y cuando nos aseguremos de que sólo se está mostrando un elemento en cada momento:

```vue-html
<Transition>
  <button v-if="docState === 'saved'">Editar</button>
  <button v-else-if="docState === 'edited'">Guardar</button>
  <button v-else-if="docState === 'editing'">Cancelar</button>
</Transition>
```

<BetweenElements />

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgZG9jU3RhdGUgPSByZWYoJ3NhdmVkJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxzcGFuIHN0eWxlPVwibWFyZ2luLXJpZ2h0OiAyMHB4XCI+Q2xpY2sgdG8gY3ljbGUgdGhyb3VnaCBzdGF0ZXM6PC9zcGFuPlxuICA8ZGl2IGNsYXNzPVwiYnRuLWNvbnRhaW5lclwiPlxuXHRcdDxUcmFuc2l0aW9uIG5hbWU9XCJzbGlkZS11cFwiPlxuICAgICAgPGJ1dHRvbiB2LWlmPVwiZG9jU3RhdGUgPT09ICdzYXZlZCdcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJkb2NTdGF0ZSA9ICdlZGl0ZWQnXCI+RWRpdDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB2LWVsc2UtaWY9XCJkb2NTdGF0ZSA9PT0gJ2VkaXRlZCdcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJkb2NTdGF0ZSA9ICdlZGl0aW5nJ1wiPlNhdmU8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gdi1lbHNlLWlmPVwiZG9jU3RhdGUgPT09ICdlZGl0aW5nJ1wiXG4gICAgICAgICAgICAgIEBjbGljaz1cImRvY1N0YXRlID0gJ3NhdmVkJ1wiPkNhbmNlbDwvYnV0dG9uPlxuICAgIDwvVHJhbnNpdGlvbj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uYnRuLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IDFlbTtcbn1cblxuYnV0dG9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufVxuXG4uc2xpZGUtdXAtZW50ZXItYWN0aXZlLFxuLnNsaWRlLXVwLWxlYXZlLWFjdGl2ZSB7XG4gIHRyYW5zaXRpb246IGFsbCAwLjI1cyBlYXNlLW91dDtcbn1cblxuLnNsaWRlLXVwLWVudGVyLWZyb20ge1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMzBweCk7XG59XG5cbi5zbGlkZS11cC1sZWF2ZS10byB7XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzBweCk7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

## Modos de Transición

En el ejemplo anterior, los elementos que entran y salen se animan al mismo tiempo, y hemos tenido que hacerlos `position: absolute` para evitar el problema de diseño cuando ambos elementos están presentes en el DOM.

Sin embargo, en algunos casos esto no es una opción, o simplemente no es el comportamiento deseado. Podemos querer que el elemento que sale se anime primero, y que el elemento que entra sólo se inserte **después** de que la animación de salida haya terminado. Orquestar estas animaciones manualmente sería muy complicado; sin embargo, podemos habilitar este comportamiento pasándole a `<Transition>` una propiedad `mode`:

```vue-html
<Transition mode="out-in">
  ...
</Transition>
```

Aquí está la demostración anterior con `mode="out-in"`:

<BetweenElements mode="out-in" />

`<Transition>` también soporta `mode="in-out"`, aunque se utiliza con mucha menos frecuencia.

## Transición Entre Componentes

`<Transition>` también puede utilizarse alrededor de [componentes dinámicos](/guide/essentials/component-basics.html#componentes-dinamicos):

```vue-html
<Transition name="fade" mode="out-in">
  <component :is="activeComponent"></component>
</Transition>
```

<BetweenComponents />

<div class="composition-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHNoYWxsb3dSZWYgfSBmcm9tICd2dWUnXG5pbXBvcnQgQ29tcEEgZnJvbSAnLi9Db21wQS52dWUnXG5pbXBvcnQgQ29tcEIgZnJvbSAnLi9Db21wQi52dWUnXG5cbi8vIHVzZSBzaGFsbG93UmVmIHRvIGF2b2lkIGNvbXBvbmVudCBiZWluZyBkZWVwbHkgb2JzZXJ2ZWRcbmNvbnN0IGFjdGl2ZUNvbXBvbmVudCA9IHNoYWxsb3dSZWYoQ29tcEEpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8bGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJhY3RpdmVDb21wb25lbnRcIiA6dmFsdWU9XCJDb21wQVwiPiBBXG4gIDwvbGFiZWw+XG4gIDxsYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgdi1tb2RlbD1cImFjdGl2ZUNvbXBvbmVudFwiIDp2YWx1ZT1cIkNvbXBCXCI+IEJcbiAgPC9sYWJlbD5cbiAgPFRyYW5zaXRpb24gbmFtZT1cImZhZGVcIiBtb2RlPVwib3V0LWluXCI+XG4gICAgPGNvbXBvbmVudCA6aXM9XCJhY3RpdmVDb21wb25lbnRcIj48L2NvbXBvbmVudD5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmZhZGUtZW50ZXItYWN0aXZlLFxuLmZhZGUtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzIGVhc2U7XG59XG5cbi5mYWRlLWVudGVyLWZyb20sXG4uZmFkZS1sZWF2ZS10byB7XG4gIG9wYWNpdHk6IDA7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJDb21wQS52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgQ29tcG9uZW50IEFcbiAgPC9kaXY+XG48L3RlbXBsYXRlPiIsIkNvbXBCLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICBDb21wb25lbnQgQlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+In0=)

</div>
<div class="options-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDb21wQSBmcm9tICcuL0NvbXBBLnZ1ZSdcbmltcG9ydCBDb21wQiBmcm9tICcuL0NvbXBCLnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IENvbXBBLCBDb21wQiB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhY3RpdmVDb21wb25lbnQ6ICdDb21wQSdcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxsYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgdi1tb2RlbD1cImFjdGl2ZUNvbXBvbmVudFwiIHZhbHVlPVwiQ29tcEFcIj4gQVxuICA8L2xhYmVsPlxuICA8bGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJhY3RpdmVDb21wb25lbnRcIiB2YWx1ZT1cIkNvbXBCXCI+IEJcbiAgPC9sYWJlbD5cbiAgPFRyYW5zaXRpb24gbmFtZT1cImZhZGVcIiBtb2RlPVwib3V0LWluXCI+XG4gICAgPGNvbXBvbmVudCA6aXM9XCJhY3RpdmVDb21wb25lbnRcIj48L2NvbXBvbmVudD5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmZhZGUtZW50ZXItYWN0aXZlLFxuLmZhZGUtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzIGVhc2U7XG59XG5cbi5mYWRlLWVudGVyLWZyb20sXG4uZmFkZS1sZWF2ZS10byB7XG4gIG9wYWNpdHk6IDA7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJDb21wQS52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgQ29tcG9uZW50IEFcbiAgPC9kaXY+XG48L3RlbXBsYXRlPiIsIkNvbXBCLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICBDb21wb25lbnQgQlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+In0=)

</div>

## Transiciones Dinámicas

¡Las props de `<Transition>` como `name` también pueden ser dinámicas! Esto nos permite aplicar transiciones diferentes de forma dinámica en función al cambio de estado:

```vue-html
<Transition :name="transitionName">
  <!-- ... -->
</Transition>
```

Esto puede ser útil cuando has definido transiciones / animaciones CSS utilizando las convenciones de clase de transition de Vue y quieres cambiar entre ellas.

También puedes aplicar diferentes comportamientos en los hooks transition de JavaScript basados en el estado actual de tu componente. Finalmente, la última forma de crear transiciones dinámicas es a través de [componentes de transición reutilizables](#transiciones-reutilizables) que aceptan props para cambiar la naturaleza de la(s) transición(es) a utilizar. Puede sonar cursi, pero el único límite realmente es tu imaginación.

---

**Relacionado**

- [Referencia de la API `<Transition>`](/api/built-in-components.html#transition)
