# Vue y Componentes Web

[Componentes Web](https://developer.mozilla.org/es/docs/Web/Web_Components) es un término que engloba un conjunto de APIs nativas de la web que permiten a los desarrolladores crear elementos personalizados reutilizables.

Consideramos que Vue y los Componentes Web son tecnologías esencialmente complementarias. Vue tiene un excelente soporte tanto para consumir como para crear elementos personalizados. Tanto si integras elementos personalizados en una aplicación Vue existente, como si utilizas Vue para crear y distribuir elementos personalizados, tienes buena compañía.

## Uso de Elementos Personalizados en Vue

Vue [obtiene una puntuación perfecta del 100% en las pruebas de Elementos Personalizados en Cualquier Lugar](https://custom-elements-everywhere.com/libraries/vue/results/results.html). El consumo de elementos personalizados dentro de una aplicación Vue funciona en gran medida igual que el uso de elementos HTML nativos, con algunas cosas a tener en cuenta:

### Omisión de la Resolución del Componente

Por defecto, Vue intentará resolver una etiqueta HTML no nativa como un componente Vue registrado antes de volver a renderizarlo como un elemento personalizado. Esto hará que Vue emita una advertencia de "fallo en la resolución del componente" durante el desarrollo. Para que Vue sepa que ciertos elementos deben ser tratados como elementos personalizados y saltarse la resolución de componentes, podemos especificar la opción [`compilerOptions.isCustomElement`](/api/application.html#app-config-compileroptions).

Si estás usando Vue con una versión de compilación, la opción debe pasarse a través de las configuraciones de compilación, ya que esta es una opción en tiempo de compilación.

#### Ejemplo de Configuración en el Navegador

```js
// Sólo funciona si se utiliza la compilación en el navegador.
// Si utilizas herramientas de compilación, consulta los ejemplos
// de configuración que aparecen a continuación.
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-')
```

#### Ejemplo de Configuración de Vite

```js
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // tratar todas las etiquetas con un guión como elementos personalizados
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ]
}
```

#### Ejemplo de Configuración de Vue CLI

```js
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => ({
        ...options,
        compilerOptions: {
          // tratar cualquier etiqueta que empiece por ion-
          // como elementos personalizados
          isCustomElement: (tag) => tag.startsWith('ion-')
        }
      }))
  }
}
```

### Paso de Propiedades del DOM

Dado que los atributos DOM sólo pueden ser strings, necesitamos pasar datos complejos a los elementos personalizados como propiedades del DOM. Al establecer props en un elemento personalizado, Vue 3 comprueba automáticamente la presencia de la propiedad del DOM utilizando el operador `in` y preferirá establecer el valor como una propiedad del DOM si la key está presente. Esto significa que, en la mayoría de los casos, no tendrás que pensar en esto si el elemento personalizado sigue las [prácticas recomendadas](https://web.dev/custom-elements-best-practices/).

Sin embargo, puede haber casos raros en los que los datos deban pasarse como una propiedad del DOM, pero el elemento personalizado no defina/refleje adecuadamente la propiedad (haciendo que la comprobación `in` falle). En este caso, puedes forzar que un enlace `v-bind` se establezca como una propiedad del DOM utilizando el modificador `.prop`:

```vue-html
<my-element :user.prop="{ name: 'jack' }"></my-element>

<!-- equivalente abreviado -->
<my-element .user="{ nombre: 'jack' }"></my-element>
```

## Creación de Elementos Personalizados con Vue

El principal beneficio de los elementos personalizados es que pueden ser utilizados con cualquier framework, o incluso sin un framework. Esto los hace ideales para distribuir componentes donde el consumidor final puede no estar usando la misma pila de frontend, o cuando se quiere aislar la aplicación final de los detalles de implementación de los componentes que utiliza.

### defineCustomElement

Vue soporta la creación de elementos personalizados utilizando exactamente las mismas APIs de los componentes de Vue a través del método [`defineCustomElement`](/api/general.html#definecustomelement). El método acepta el mismo argumento que [`defineComponent`](/api/general.html#definecomponent), pero en su lugar devuelve un constructor de elemento personalizado que extiende `HTMLElement`:

```vue-html
<my-vue-element></my-vue-element>
```

```js
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // opciones normales del componente Vue aquí
  props: {},
  emits: {},
  template: `...`,

  // solo defineCustomElement: CSS a ser inyectado en la shadow root
  styles: [`/* css alineado */`]
})

// Registrar el elemento personalizado.
// Después del registro, todas las etiquetas `<my-vue-element>`
// en la página se actualizarán.
customElements.define('my-vue-element', MyVueElement)

// También puedes instanciar el elemento programáticamente:
// (sólo se puede hacer después del registro)
document.body.appendChild(
  new MyVueElement({
    // props iniciales (opcional)
  })
)
```

#### Ciclo de Vida

- Un elemento personalizado de Vue montará una instancia interna de componente Vue dentro de su shadow root cuando el [`connectedCallback`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks) del elemento sea llamado por primera vez.

- Cuando se invoque el `disconnectedCallback` del elemento, Vue comprobará si el elemento está separado del documento después de un ciclo de microtarea.

  - Si el elemento sigue en el documento, es un movimiento y la instancia del componente se conservará;

  - Si el elemento se separa del documento, es una eliminación y la instancia del componente será desmontada.

#### Props

- Todas las props declaradas usando la opción `props` serán definidas en el elemento personalizado como propiedades. Vue manejará automáticamente el proceso de reflexión entre atributos y propiedades cuando sea apropiado.

  - Los atributos siempre se reflejan en las propiedades correspondientes.

  - Las propiedades con valores primitivos (`string`, `boolean` o `number`) se reflejan como atributos.

- Vue también convierte automáticamente las props declaradas con tipos `Boolean` o `Number` en el tipo deseado cuando se establecen como atributos (que siempre son strings). Por ejemplo, dada la siguiente declaración de props:

  ```js
  props: {
    selected: Boolean,
    index: Number
  }
  ```

  Y el uso del elemento personalizado:

  ```vue-html
  <my-element selected index="1"></my-element>
  ```

  En el componente, `selected` se convertirá en `true` ( boolean) e `index` se convertirá en `1` (number).

#### Eventos

Los eventos emitidos a través de `this.$emit` o setup `emit` se envían como [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events#adding_custom_data_%E2%80%93_customevent) nativos al elemento personalizado. Los argumentos adicionales del evento (payload) serán expuestos como un array en el objeto CustomEvent como su propiedad `detail`.

#### Slots

Dentro del componente, los slots pueden ser renderizados usando el elemento `<slot/>` como es habitual. No obstante, al consumir el elemento resultante, este solo acepta la [sintaxis nativa de los slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots):

- No se admiten los [slots con ámbito](/guide/components/slots.html#slots-con-ambito).

- Al pasar slots asignados, utiliza el atributo `slot` en lugar de la directiva `v-slot`:

  ```vue-html
  <my-element>
    <div slot="named">hola</div>
  </my-element>
  ```

#### Provide / Inject

La [API Provide / Inject](/guide/components/provide-inject.html#provide-inject) y su [equivalente de la Composition API](/api/composition-api-dependency-injection.html#provide) también funcionan entre elementos personalizados definidos por Vue. Sin embargo, ten en cuenta que esto funciona **sólo entre elementos personalizados**; es decir, un elemento personalizado definido por Vue no podrá inyectar propiedades proporcionadas por un componente Vue que no sea un elemento personalizado.

### SFC como Elemento Personalizado

`defineCustomElement` también funciona con Componentes de un Solo Archivo (SFC) de Vue. Sin embargo, con la configuración de herramientas por defecto, el `<style>` dentro de los SFCs seguirá siendo extraído y fusionado en un único archivo CSS durante la compilación para producción. Cuando se utiliza un SFC como elemento personalizado, a menudo es deseable inyectar las etiquetas `<style>` en la shadow root del elemento personalizado.

Las herramientas oficiales de SFC soportan la importación de SFCs en "modo de elemento personalizado" (requiere `@vitejs/plugin-vue@^1.4.0` o `vue-loader@^16.5.0`). Un SFC cargado en modo de elemento personalizado alinea sus etiquetas `<style>` como cadenas de CSS y las expone bajo la opción `styles` del componente. Esto será captado por `defineCustomElement` e inyectado en la shadow root del elemento cuando sea instanciado.

Para optar por este modo, simplemente termina el nombre del archivo del componente con `.ce.vue`:

```js
import { defineCustomElement } from 'vue'
import Example from './Example.ce.vue'

console.log(Example.styles) // ["/* css alineado */"]

// convertir en constructor de elementos personalizados
const ExampleElement = defineCustomElement(Example)

// registrar
customElements.define('my-example', ExampleElement)
```

Si deseas personalizar qué archivos deben ser importados en el modo de elementos personalizados (por ejemplo, tratar _todos_ los SFC como elementos personalizados), puedes pasar la opción `customElement` a los respectivos plugins de construcción:

- [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue#using-vue-sfcs-as-custom-elements)
- [vue-loader](https://github.com/vuejs/vue-loader/tree/next#v16-only-options)

### Tips para una Librería de Elementos Personalizados de Vue

Al construir elementos personalizados con Vue, los elementos dependerán del tiempo de ejecución de Vue. Hay un coste de tamaño de base de ~16kb dependiendo de cuántas características se estén utilizando. Esto significa que no es ideal usar Vue si estás enviando un solo elemento personalizado; puedes querer usar JavaScript vanilla, [petite-vue](https://github.com/vuejs/petite-vue), o frameworks que se especializan en un tamaño de tiempo de ejecución pequeño. Sin embargo, el tamaño base es más que justificable si estás enviando una colección de elementos personalizados con lógica compleja, ya que Vue permitirá que cada componente sea creado con mucho menos código. Cuantos más elementos se envíen juntos, mejor será la compensación.

Si los elementos personalizados se van a utilizar en una aplicación que también utiliza Vue, puedes optar por externalizar Vue del paquete construido para que los elementos utilicen la misma copia de Vue de la aplicación anfitriona.

Se recomienda exportar los constructores de elementos individuales para dar a sus usuarios la flexibilidad de importarlos bajo demanda y registrarlos con los nombres de etiqueta deseados. También puedes exportar una función de utilidad para registrar automáticamente todos los elementos. Aquí hay un ejemplo de punto de entrada de una librería de elementos personalizados de Vue:

```js
import { defineCustomElement } from 'vue'
import Foo from './MyFoo.ce.vue'
import Bar from './MyBar.ce.vue'

const MyFoo = defineCustomElement(Foo)
const MyBar = defineCustomElement(Bar)

// exportar elementos individuales
export { MyFoo, MyBar }

export function register() {
  customElements.define('my-foo', MyFoo)
  customElements.define('my-bar', MyBar)
}
```

Si tienes muchos componentes, también puedes aprovechar las características de las herramientas de construcción como [glob import](https://vitejs.dev/guide/features.html#glob-import) de Vite o [`require.context`](https://webpack.js.org/guides/dependency-management/#requirecontext) de webpack para cargar todos los componentes de un directorio.

## Componentes Web vs. Componentes de Vue

Algunos desarrolladores creen que hay que evitar los modelos de componentes propietarios del framework, y que el uso exclusivo de elementos personalizados hace que una aplicación sea "a prueba de futuro". Aquí intentaremos explicar por qué creemos que esta es una visión demasiado simplista del problema.

En efecto, existe un cierto nivel de solapamiento de características entre los Elementos Personalizados y los Componentes de Vue: ambos nos permiten definir componentes reutilizables con paso de datos, emisión de eventos y gestión del ciclo de vida. Sin embargo, las APIs de los Componentes Web son relativamente de bajo nivel y básicas. Para construir una aplicación real, necesitamos bastantes capacidades adicionales que la plataforma no cubre:

- Un sistema de plantillas declarativo y eficiente;

- Un sistema de gestión de estado reactivo que facilite la extracción y reutilización de la lógica entre componentes;

- Una forma eficaz de renderizar los componentes en el servidor e hidratarlos en el cliente (SSR), lo cual es importante para el SEO y [las métricas de Web Vitals como LCP](https://web.dev/vitals/). El SSR de elementos nativos personalizados suele implicar la simulación del DOM en Node.js y la posterior serialización del DOM mutado, mientras que el SSR de Vue compila en concatenación de cadenas siempre que sea posible, lo cual es mucho más eficiente.

El modelo de componentes de Vue está diseñado teniendo en cuenta estas necesidades como un sistema coherente.

Con un equipo de ingeniería competente, probablemente podrías construir el equivalente sobre elementos nativos personalizados - pero esto también significa que estás asumiendo la carga de mantenimiento a largo plazo de un framework doméstico, mientras que pierdes los beneficios del ecosistema y la comunidad de un framework maduro como Vue.

También hay frameworks construidos utilizando Elementos Personalizados como base de su modelo de componentes, pero todos ellos inevitablemente tienen que introducir sus soluciones propietarias a los problemas mencionados anteriormente. El uso de estos frameworks implica la aceptación de sus decisiones técnicas sobre cómo resolver estos problemas, lo cual, a pesar de lo que se pueda anunciar, no te aísla automáticamente de posibles cambios futuros.

También hay algunas áreas en las que encontramos que los elementos personalizados son limitantes:

- La evaluación de los slots anticipados dificulta la composición de los componentes. Los [slots con ámbito](/guide/components/slots.html#slots-con-ambito) de Vue son un poderoso mecanismo para la composición de componentes, que no puede ser soportado por los elementos personalizados debido a la naturaleza de los slots nativos. Los slots anticipados también significan que el componente receptor no puede controlar cuándo o si debe renderizar una parte del contenido del slot.

- El envío de elementos personalizados con CSS de ámbito del shadow DOM requiere hoy en día incrustar el CSS dentro de JavaScript para que pueda ser inyectado en el shadow root en tiempo de ejecución. También da lugar a estilos duplicados en el marcado en los escenarios de SSR. Hay [características de la plataforma](https://github.com/whatwg/html/pull/4898/) en las que se está trabajando en esta área; pero por ahora no están soportadas universalmente, y todavía hay problemas de rendimiento de producción / SSR que deben ser abordados. Mientras tanto, los SFC de Vue proporcionan [mecanismos de alcance de CSS](/api/sfc-css-features.html) que soportan la extracción de los estilos en archivos CSS planos.

Vue siempre se mantendrá al día con los últimos estándares de la plataforma web, y estaremos encantados de aprovechar cualquier cosa que la plataforma proporcione si hace nuestro trabajo más fácil. Sin embargo, nuestro objetivo es proporcionar soluciones que funcionen bien y que funcionen hoy. Eso significa que tenemos que incorporar las nuevas características de la plataforma con una mentalidad crítica, y eso implica llenar los vacíos en los que los estándares se quedan cortos mientras sea el caso.
