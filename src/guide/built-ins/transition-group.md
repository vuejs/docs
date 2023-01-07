<script setup>
import ListBasic from './transition-demos/ListBasic.vue'
import ListMove from './transition-demos/ListMove.vue'
import ListStagger from './transition-demos/ListStagger.vue'
</script>

# TransitionGroup

`<TransitionGroup>` es un componente integrado diseñado para animar la inserción, la eliminación y el cambio de orden de los elementos o componentes que son renderizados en una lista.

## Diferencias con respecto a `<Transition>`

`<TransitionGroup>` soporta las mismas props, clases de transición de CSS y hooks escuchadores de JavaScript que `<Transition>`, con las siguientes diferencias:

- Por defecto, no renderiza un elemento contenedor. Sin embargo, puedes especificar un elemento que se renderice con la prop `tag`.

- Los [modos de transición](./transition.html#modos-de-transicion) no están disponibles, porque ya no alternamos entre elementos mutuamente excluyentes.

- Se requiere que los elementos en el interior **siempre** tengan un atributo `key` único.

- Las clases de transición de CSS se aplicarán a los elementos individuales de la lista, **no** al grupo / contenedor en sí.

:::tip
Cuando se utiliza en [plantillas del DOM](/guide/essentials/component-basics.html#advertencias-sobre-el-procesamiento-de-las-plantillas-del-dom), se debe hacer referencia a este como `<transition-group>`.
:::

## Transiciones de Entrada / Salida

Este es un ejemplo de aplicación de transiciones de entrada / salida a una lista `v-for` utilizando `<TransitionGroup>`:

```vue-html
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```

```css
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

<ListBasic />

## Transiciones de Movimiento

La demostración anterior tiene algunos defectos obvios: cuando se inserta o elimina un elemento, los elementos que lo rodean "saltan" instantáneamente a su lugar en lugar de moverse suavemente. Podemos arreglar esto añadiendo algunas reglas CSS adicionales:

```css{1,13-17}
.list-move, /* aplicar la transición a los elementos en movimiento */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* asegurar que los elementos de salida son extraídos del flujo del diseño
para que puedan calcularse correctamente las animaciones en movimiento. */
.list-leave-active {
  position: absolute;
}
```

Ahora se ve mucho mejor, incluso se anima suavemente cuando se mezcla toda la lista:

<ListMove />

[Full Example](/examples/#list-transition)

## Escalonamiento de las Transiciones de una Lista

Al comunicarse con las transiciones de JavaScript mediante atributos de datos, también es posible escalonar las transiciones en una lista. En primer lugar, se representa el índice de un elemento como un atributo de datos en el elemento del DOM:

```vue-html{11}
<TransitionGroup
  tag="ul"
  :css="false"
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @leave="onLeave"
>
  <li
    v-for="(item, index) in computedList"
    :key="item.msg"
    :data-index="index"
  >
    {{ item.msg }}
  </li>
</TransitionGroup>
```

Luego, en los hooks de JavaScript, animamos el elemento con un retraso basado en el atributo data. Este ejemplo utiliza la [librería GreenSock](https://greensock.com/) para realizar la animación:

```js{5}
function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}
```

<ListStagger />

<div class="composition-api">

[Full Example in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgZ3NhcCBmcm9tICdnc2FwJ1xuXG5jb25zdCBsaXN0ID0gW1xuICB7IG1zZzogJ0JydWNlIExlZScgfSxcbiAgeyBtc2c6ICdKYWNraWUgQ2hhbicgfSxcbiAgeyBtc2c6ICdDaHVjayBOb3JyaXMnIH0sXG4gIHsgbXNnOiAnSmV0IExpJyB9LFxuICB7IG1zZzogJ0t1bmcgRnVyeScgfVxuXVxuXG5jb25zdCBxdWVyeSA9IHJlZignJylcblxuY29uc3QgY29tcHV0ZWRMaXN0ID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gbGlzdC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubXNnLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkudmFsdWUpKVxufSlcblxuZnVuY3Rpb24gb25CZWZvcmVFbnRlcihlbCkge1xuICBlbC5zdHlsZS5vcGFjaXR5ID0gMFxuICBlbC5zdHlsZS5oZWlnaHQgPSAwXG59XG5cbmZ1bmN0aW9uIG9uRW50ZXIoZWwsIGRvbmUpIHtcbiAgZ3NhcC50byhlbCwge1xuICAgIG9wYWNpdHk6IDEsXG4gICAgaGVpZ2h0OiAnMS42ZW0nLFxuICAgIGRlbGF5OiBlbC5kYXRhc2V0LmluZGV4ICogMC4xNSxcbiAgICBvbkNvbXBsZXRlOiBkb25lXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG9uTGVhdmUoZWwsIGRvbmUpIHtcbiAgZ3NhcC50byhlbCwge1xuICAgIG9wYWNpdHk6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICAgIGRlbGF5OiBlbC5kYXRhc2V0LmluZGV4ICogMC4xNSxcbiAgICBvbkNvbXBsZXRlOiBkb25lXG4gIH0pXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXQgdi1tb2RlbD1cInF1ZXJ5XCIgLz5cbiAgPFRyYW5zaXRpb25Hcm91cFxuICAgIHRhZz1cInVsXCJcbiAgICA6Y3NzPVwiZmFsc2VcIlxuICAgIEBiZWZvcmUtZW50ZXI9XCJvbkJlZm9yZUVudGVyXCJcbiAgICBAZW50ZXI9XCJvbkVudGVyXCJcbiAgICBAbGVhdmU9XCJvbkxlYXZlXCJcbiAgPlxuICAgIDxsaVxuICAgICAgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIGNvbXB1dGVkTGlzdFwiXG4gICAgICA6a2V5PVwiaXRlbS5tc2dcIlxuICAgICAgOmRhdGEtaW5kZXg9XCJpbmRleFwiXG4gICAgPlxuICAgICAge3sgaXRlbS5tc2cgfX1cbiAgICA8L2xpPlxuICA8L1RyYW5zaXRpb25Hcm91cD5cbjwvdGVtcGxhdGU+XG4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJnc2FwXCI6IFwiaHR0cHM6Ly91bnBrZy5jb20vZ3NhcD9tb2R1bGVcIixcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Full Example in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG5cbmNvbnN0IGxpc3QgPSBbXG4gIHsgbXNnOiAnQnJ1Y2UgTGVlJyB9LFxuICB7IG1zZzogJ0phY2tpZSBDaGFuJyB9LFxuICB7IG1zZzogJ0NodWNrIE5vcnJpcycgfSxcbiAgeyBtc2c6ICdKZXQgTGknIH0sXG4gIHsgbXNnOiAnS3VuZyBGdXJ5JyB9XG5dXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlcnk6ICcnXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGNvbXB1dGVkTGlzdCgpIHtcbiAgICAgIHJldHVybiBsaXN0LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5tc2cudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh0aGlzLnF1ZXJ5KSlcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbkJlZm9yZUVudGVyKGVsKSB7XG4gICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gMFxuICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gMFxuICAgIH0sXG4gICAgb25FbnRlcihlbCwgZG9uZSkge1xuICAgICAgZ3NhcC50byhlbCwge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBoZWlnaHQ6ICcxLjZlbScsXG4gICAgICAgIGRlbGF5OiBlbC5kYXRhc2V0LmluZGV4ICogMC4xNSxcbiAgICAgICAgb25Db21wbGV0ZTogZG9uZVxuICAgICAgfSlcbiAgICB9LFxuICAgIG9uTGVhdmUoZWwsIGRvbmUpIHtcbiAgICAgIGdzYXAudG8oZWwsIHtcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICBkZWxheTogZWwuZGF0YXNldC5pbmRleCAqIDAuMTUsXG4gICAgICAgIG9uQ29tcGxldGU6IGRvbmVcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXQgdi1tb2RlbD1cInF1ZXJ5XCIgLz5cbiAgPFRyYW5zaXRpb25Hcm91cFxuICAgIHRhZz1cInVsXCJcbiAgICA6Y3NzPVwiZmFsc2VcIlxuICAgIEBiZWZvcmUtZW50ZXI9XCJvbkJlZm9yZUVudGVyXCJcbiAgICBAZW50ZXI9XCJvbkVudGVyXCJcbiAgICBAbGVhdmU9XCJvbkxlYXZlXCJcbiAgPlxuICAgIDxsaVxuICAgICAgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIGNvbXB1dGVkTGlzdFwiXG4gICAgICA6a2V5PVwiaXRlbS5tc2dcIlxuICAgICAgOmRhdGEtaW5kZXg9XCJpbmRleFwiXG4gICAgPlxuICAgICAge3sgaXRlbS5tc2cgfX1cbiAgICA8L2xpPlxuICA8L1RyYW5zaXRpb25Hcm91cD5cbjwvdGVtcGxhdGU+XG4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJnc2FwXCI6IFwiaHR0cHM6Ly91bnBrZy5jb20vZ3NhcD9tb2R1bGVcIixcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

---

**Relacionado**

- [Referencia de la API sobre `<TransitionGroup>`](/api/built-in-components.html#transitiongroup)
