<script setup>
import SwitchComponent from './keep-alive-demos/SwitchComponent.vue'
</script>

# KeepAlive

`<KeepAlive>` es un componente integrado que nos permite cachear condicionalmente las instancias de los componentes cuando dinámicamente intercambiamos entre varios componentes.

## Uso Básico

En el capítulo de Componentes Básicos, introdujimos la sintaxis de los [Componentes Dinámicos](/guide/essentials/component-basics.html#componentes-dinamicos), utilizando el elemento especial `<component>`:

```vue-html
<componente :is="activeComponent" />
```

Por defecto, una instancia de un componente activo se desmontará cuando se abandone. Esto hará que se pierda cualquier estado modificado que tenga. Cuando se vuelva a mostrar este componente, se creará una nueva instancia con sólo el estado inicial.

En el ejemplo siguiente, tenemos dos componentes con estado; A contiene un contador, mientras que B contiene un mensaje sincronizado con una entrada a través de `v-model`. Prueba a actualizar el estado de uno de ellos, cámbialo y luego vuelve a él:

<SwitchComponent />

Verás que cuando vuelvas a cambiar, el estado anterior cambiado se habrá restablecido.

La creación de una nueva instancia del componente al cambiar es un comportamiento normalmente útil, pero en este caso, nos gustaría que las dos instancias del componente se conservaran incluso cuando están inactivas. Para resolver este problema, podemos envolver nuestro componente dinámico con el componente integrado `<KeepAlive>`:

```vue-html
¡<!-- ¡Los componentes inactivos se guardarán en la caché! -->
<KeepAlive>
  <componente :is="activeComponent" />
</KeepAlive>
```

Ahora, el estado será persistente a través de los cambios de componentes:

<SwitchComponent use-KeepAlive />

<div class="composition-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHNoYWxsb3dSZWYgfSBmcm9tICd2dWUnXG5pbXBvcnQgQ29tcEEgZnJvbSAnLi9Db21wQS52dWUnXG5pbXBvcnQgQ29tcEIgZnJvbSAnLi9Db21wQi52dWUnXG5cbmNvbnN0IGN1cnJlbnQgPSBzaGFsbG93UmVmKENvbXBBKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImRlbW9cIj5cbiAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJjdXJyZW50XCIgOnZhbHVlPVwiQ29tcEFcIiAvPiBBPC9sYWJlbD5cbiAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJjdXJyZW50XCIgOnZhbHVlPVwiQ29tcEJcIiAvPiBCPC9sYWJlbD5cbiAgICA8S2VlcEFsaXZlPlxuICAgICAgPGNvbXBvbmVudCA6aXM9XCJjdXJyZW50XCI+PC9jb21wb25lbnQ+XG4gICAgPC9LZWVwQWxpdmU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJDb21wQS52dWUiOiI8c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBjb3VudCA9IHJlZigwKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHA+Q3VycmVudCBjb21wb25lbnQ6IEE8L3A+XG4gIDxzcGFuPmNvdW50OiB7eyBjb3VudCB9fTwvc3Bhbj5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJjb3VudCsrXCI+KzwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cbiIsIkNvbXBCLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tICd2dWUnXG5jb25zdCBtc2cgPSByZWYoJycpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5DdXJyZW50IGNvbXBvbmVudDogQjwvcD5cbiAgPHNwYW4+TWVzc2FnZSBpczoge3sgbXNnIH19PC9zcGFuPlxuICA8aW5wdXQgdi1tb2RlbD1cIm1zZ1wiPlxuPC90ZW1wbGF0ZT5cbiJ9)

</div>
<div class="options-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDb21wQSBmcm9tICcuL0NvbXBBLnZ1ZSdcbmltcG9ydCBDb21wQiBmcm9tICcuL0NvbXBCLnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgQ29tcEEsIENvbXBCIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnQ6ICdDb21wQSdcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJkZW1vXCI+XG4gICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwicmFkaW9cIiB2LW1vZGVsPVwiY3VycmVudFwiIHZhbHVlPVwiQ29tcEFcIiAvPiBBPC9sYWJlbD5cbiAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJjdXJyZW50XCIgdmFsdWU9XCJDb21wQlwiIC8+IEI8L2xhYmVsPlxuICAgIDxLZWVwQWxpdmU+XG4gICAgICA8Y29tcG9uZW50IDppcz1cImN1cnJlbnRcIj48L2NvbXBvbmVudD5cbiAgICA8L0tlZXBBbGl2ZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuIiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkNvbXBBLnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvdW50OiAwXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5DdXJyZW50IGNvbXBvbmVudDogQTwvcD5cbiAgPHNwYW4+Y291bnQ6IHt7IGNvdW50IH19PC9zcGFuPlxuICA8YnV0dG9uIEBjbGljaz1cImNvdW50KytcIj4rPC9idXR0b24+XG48L3RlbXBsYXRlPlxuIiwiQ29tcEIudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbXNnOiAnJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cblxuPHRlbXBsYXRlPlxuICA8cD5DdXJyZW50IGNvbXBvbmVudDogQjwvcD5cbiAgPHNwYW4+TWVzc2FnZSBpczoge3sgbXNnIH19PC9zcGFuPlxuICA8aW5wdXQgdi1tb2RlbD1cIm1zZ1wiPlxuPC90ZW1wbGF0ZT5cbiJ9)

</div>

:::tip
Cuando se utiliza en [plantillas del DOM](/guide/essentials/component-basics.html#advertencias-sobre-el-procesamiento-de-las-plantillas-del-dom), debería ser referenciado como `<keep-alive>`.
:::

## Include / Exclude

Por defecto, `<KeepAlive>` almacenará en caché cualquier instancia que se encuentre dentro del componente. Podemos personalizar este comportamiento a través de las props `include` y `exclude`. Ambas props pueden ser un string delimitado por comas, una `RegExp` o un array que contenga cualquiera de los dos tipos:

```vue-html
<!-- string delimitado por comas -->
<KeepAlive include="a,b">
  <componente :is="view" />
</KeepAlive>

<!-- regex (utiliza `v-bind`) -->
<KeepAlive :include="/a|b/">
  <componente :is="view" />
</KeepAlive>

<!-- Array (utiliza `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <componente :is="view" />
</KeepAlive>
```

La verificación de la coincidencia se realiza con la opción [`name`](/api/options-misc.html#name) del componente, por lo que los componentes que necesiten ser cacheados condicionalmente por `KeepAlive` deben declarar explícitamente una opción `name`.

:::tip
Desde la versión 3.2.34, un componente de un solo archivo que utilice `<script setup>` inferirá automáticamente su opción `name` basándose en el nombre del archivo, eliminando la necesidad de declarar manualmente el nombre.
:::

## Instancias Máximas en Caché

Podemos limitar el número máximo de instancias del componente que pueden ser almacenadas en caché a través de la proposición `max`. Cuando se especifica `max`, `<KeepAlive>` se comporta como una [caché LRU](<https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)>): si el número de instancias en caché está a punto de exceder el número máximo especificado, la instancia en caché a la que se haya accedido menos recientemente será destruida para hacer sitio a la nueva.

```vue-html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

## Ciclo de Vida de la Instancia en Caché

Cuando se elimina una instancia de un componente del DOM pero esta forma parte de un árbol de componentes almacenado en caché por `<KeepAlive>`, pasa a un estado **desactivado** en lugar de ser desmontado. Cuando se inserta una instancia de componente en el DOM como parte de un árbol en caché, esta es **activada**.

<div class="composition-api">

Un componente kept-alive puede registrar hooks del ciclo de vida para estos dos estados utilizando [`onActivated()`](/api/composition-api-lifecycle.html#onactivated) y [`onDeactivated()`](/api/composition-api-lifecycle.html#ondeactivated):

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // llamado en el montaje inicial
  // y cada vez que se reinserta desde la caché
})

onDeactivated(() => {
  // llamado cuando se retira desde el DOM a la caché
  // y también cuando se desmonta
})
</script>
```

</div>
<div class="options-api">

El componente kept-alive puede registrar hooks del ciclo de vida para estos dos estados utilizando los hooks [`activated`](/api/options-lifecycle.html#activated) y [`deactivated`](/api/options-lifecycle.html#deactivated):

```js
export default {
  activated() {
    // llamado en el montaje inicial
    // y cada vez que se reinserta desde la caché
  },
  deactivated() {
    // llamado cuando se retira desde el DOM a la caché
    // y también cuando se desmonta
  }
}
```

</div>

Observa que:

<span class="composition-api">`onActivated`</span><span class="options-api">`activated`</span> también es llamado al momento del montaje, y <span class="composition-api">`onDeactivated`</span><span class="options-api">`deactivated`</span> al momento del desmontaje.

- Los dos hooks funcionan no sólo para el componente raíz cacheado por `<KeepAlive>`, sino también para los componentes descendientes en el árbol cacheado.

---

**Relacionado**

- [Referencia de la Api sobre `<KeepAlive>`](/api/built-in-components.html#keepalive)
