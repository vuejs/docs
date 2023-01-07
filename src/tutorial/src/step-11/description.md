# Componentes

Hasta ahora, sólo hemos trabajado con un único componente. Las verdaderas aplicaciones Vue se crean usualmente con componentes anidados.

Un componente padre puede renderizar otro componente en su plantilla como un componente hijo. Para usar un componente hijo, primero tenemos que importarlo:

<div class="composition-api">
<div class="sfc">

```js
import ChildComp from './ChildComp.vue'
```

</div>
</div>

<div class="options-api">
<div class="sfc">

```js
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  }
}
```

También necesitamos registrar el componente usando la opción `components`. En este caso estamos utilizando la abreviatura de la propiedad del objeto para registrar el componente `ChildComp` bajo la key `ChildComp`.

</div>
</div>

<div class="sfc">

Entonces, podemos utilizar el componente en la plantilla como:

```vue-html
<ChildComp />
```

</div>

<div class="html">

```js
import ChildComp from './ChildComp.js'

createApp({
  components: {
    ChildComp
  }
})
```

También necesitamos registrar el componente usando la opción `components`. En este caso utilizamos la abreviatura de la propiedad del objeto para registrar el componente `ChildComp` bajo la key `ChildComp`.

Ya que estamos escribiendo la plantilla en el DOM, esta estará sujeta a las reglas de procesamiento del navegador, que no distingue entre mayúsculas y minúsculas en los nombres de las etiquetas. Por lo tanto, necesitamos usar el nombre en kebab-case para referirnos al componente hijo:

```vue-html
<child-comp></child-comp>
```

</div>

Ahora pruébalo tú mismo: importa el componente hijo y renderízalo en la plantilla.
