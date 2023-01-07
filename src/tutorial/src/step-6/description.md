# Renderizado Condicional

Podemos utilizar la directiva `v-if` para renderizar condicionalmente un elemento:

```vue-html
<h1 v-if="awesome">¡Vue es increíble!</h1>
```

Este elemento `<h1>` se renderizará sólo si el valor de `awesome` es [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy). En caso de que `awesome` cambie a un valor [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy), será removido del DOM.

También podemos utilizar `v-else` y `v-else-if` para denotar otras ramas de la condición:

```vue-html
<h1 v-if="awesome">¡Vue es increíble!</h1>
<h1 v-else>Oh no 😢</h1>
```

En este momento, la demo está mostrando los dos `<h1>` al mismo tiempo, y el botón no hace nada. Prueba a añadirles las directivas `v-if` y `v-else`, e implementa el método `toggle()` para que podamos usar el botón para alternar entre ellas.

Más detalles sobre `v-if`: <a target="_blank" href="/guide/essentials/conditional.html" >Guía - Renderizado Condicional</a>
