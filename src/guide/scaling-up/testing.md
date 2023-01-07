<script setup>
import TestingApiSwitcher from './TestingApiSwitcher.vue'
</script>

# Testing

## ¿Por Qué Hacer Pruebas?

Las pruebas automatizadas te ayudan a ti y a tu equipo a crear aplicaciones de Vue complejas de forma rápida y segura, ya que evitan las regresiones y te animan a dividir tu aplicación en funciones, módulos, clases y componentes comprobables. Al igual que con cualquier aplicación, tu nueva aplicación de Vue puede fallar de muchas maneras, y es importante que puedas detectar estos problemas y solucionarlos antes de su lanzamiento.

En esta guía, cubriremos la terminología básica y brindaremos nuestras recomendaciones sobre qué herramientas elegir para tu aplicación de Vue 3.

Hay una sección específica de Vue que cubre los composables. Consulta [Pruebas de Composables](#pruebas-de-composables) más adelante para más detalles.

## Cuándo Probar

¡Empieza a hacer pruebas pronto! Te recomendamos que comiences a escribir pruebas tan pronto como puedas. Cuanto más esperes para añadir pruebas a tu aplicación, más dependencias tendrá tu aplicación y más difícil será empezar.

## Tipos de Pruebas

Cuando diseñes la estrategia de pruebas de tu aplicación Vue, debes aprovechar los siguientes tipos de pruebas:

- **Unitaria**: Comprueba que las entradas a una determinada función, clase o composable están produciendo la salida o los efectos secundarios esperados.
- **De componente**: Comprueba que tu componente se monta, se renderiza, se puede interactuar con él y se comporta como se espera. Estas pruebas importan más código que las pruebas unitarias, son más complejas y requieren más tiempo de ejecución.
- **De extremo a extremo**: Comprueban las características que abarcan varias páginas y hacen peticiones reales de red contra tu aplicación Vue construida en producción. Estas pruebas a menudo implican la puesta en marcha de una base de datos u otro backend.

Cada tipo de prueba desempeña un papel en la estrategia de pruebas de tu aplicación y cada una te protegerá contra diferentes tipos de problemas.

## Generalidades

Discutiremos brevemente qué es cada uno de ellas, cómo pueden implementarse para las aplicaciones Vue, y proporcionaremos algunas recomendaciones generales.

## Pruebas Unitarias

Las pruebas unitarias se escriben para verificar que pequeñas unidades de código aisladas funcionan como se espera. Una prueba unitaria suele abarcar una única función, clase, composable o módulo. Las pruebas unitarias se centran en la corrección lógica y sólo se ocupan de una pequeña parte de la funcionalidad global de la aplicación. Pueden simular grandes partes del entorno de la aplicación (por ejemplo, el estado inicial, clases complejas, módulos de terceros y peticiones de red).

En general, las pruebas unitarias detectarán problemas de la lógica de negocio y la corrección lógica de una función.

Tomemos como ejemplo esta función `increment`:

```js
// helpers.js
export function increment(current, max = 10) {
  if (current < max) {
    return current + 1
  }
  return current
}
```

Debido a que es independiente, será fácil invocar la función de incremento y afirmar que devuelve lo que se supone que debe devolver, por lo que escribiremos una prueba unitaria.

Si alguna de estas afirmaciones falla, está claro que el problema está contenido dentro de la función `increment`.

```js{4-16}
// helpers.spec.js
import { increment } from './helpers'

describe('incrementar', () => {
  test('incrementa el número actual en 1', () => {
    expect(increment(0, 10)).toBe(1)
  })

  test('no incrementar el número actual por encima del máximo', () => {
    expect(increment(10, 10)).toBe(10)
  })

  test('tiene un máximo default de 10', () => {
    expect(increment(10)).toBe(10)
  })
})
```

Como se mencionó anteriormente, las pruebas unitarias generalmente se aplican a la lógica de negocio, los componentes, las clases, los módulos o las funciones independientes que no implican la renderización de la interfaz de usuario, las peticiones de red u otras cuestiones de entorno.

Por lo general, estos son módulos simples de JavaScript/TypeScript que no están relacionados con Vue. En general, escribir pruebas unitarias para la lógica de negocio en las aplicaciones Vue no difiere significativamente de las aplicaciones que utilizan otros frameworks.

Hay dos instancias en los que SÍ hay que hacer pruebas unitarias de características específicas para Vue:

1. Composables
2. Componentes

### Composables

Una categoría de funciones específicas de las aplicaciones de Vue son los [Composables](/guide/reusability/composables.html), que pueden requerir un manejo especial durante las pruebas. Consulta la sección [Pruebas de Composables](#pruebas-de-composables) más adelante para más detalles.

### Pruebas Unitarias en Componentes

Un componente puede ser probado de dos maneras:

1. Caja blanca (Whitebox): Pruebas unitarias

   Las pruebas que son "pruebas de caja blanca" están al tanto de los detalles de implementación y las dependencias de un componente. Se centran en **aislar** el componente bajo prueba. Estas pruebas generalmente implican simular algunos, si no todos, los elementos hijos del componente, así como también configurar el estado y las dependencias de los plugins (por ejemplo, Vuex).

2. Caja negra (Blackbox): Pruebas de componentes

   Las pruebas que son "pruebas de caja negra" ignoran los detalles de implementación de un componente. Estas pruebas simulan lo menos posible para probar la integración de su componente y todo el sistema. Suelen renderizar todos los componentes hijos y se consideran más bien una "prueba de integración ". Vea las [Recomendaciones para las Pruebas de Componentes](#pruebas-de-componentes) más adelante.

### Recomendación

- [Vitest](https://vitest.dev/)

  Dado que la configuración oficial creada por `create-vue` se basa en [Vite](https://vitejs.dev/), recomendamos usar un framework de pruebas unitarias que pueda aprovechar la misma configuración y transformar la fuente de información directamente desde Vite. [Vitest](https://vitest.dev/) es un framework de pruebas unitarias diseñado específicamente para este propósito, creado y mantenido por los miembros del equipo de Vue / Vite. Se integra con proyectos basados en Vite con un esfuerzo mínimo y es increíblemente rápido.

### Otras opciones

- [Peeky](https://peeky.dev/) es otro rápido ejecutor de pruebas unitarias con integración de primera clase con Vite. También ha sido creado por un miembro del equipo central de Vue y ofrece una interfaz de pruebas basada en una GUI.

- [Jest](https://jestjs.io/) es un popular framework de pruebas unitarias y se puede hacer funcionar con Vite a través del paquete [vite-jest](https://github.com/sodatea/vite-jest). Sin embargo, solo recomendamos Jest si tienes un conjunto de pruebas de Jest existente que necesita ser migrado a un proyecto basado en Vite, ya que Vitest ofrece una integración más fluida y un mejor rendimiento.

## Pruebas de Componentes

En las aplicaciones de Vue, los componentes son los principales bloques de construcción de la interfaz de usuario. Por lo tanto, los componentes son la unidad natural de aislamiento cuando se trata de validar el comportamiento de la aplicación. Desde una perspectiva de granularidad, las pruebas de componentes se encuentran en algún lugar por encima de las pruebas unitarias y pueden considerarse una forma de prueba de integración. Gran parte de tu aplicación de Vue debe estar cubierta por una prueba de componente y recomendamos que cada componente de Vue tenga su propio archivo de especificaciones.

Las pruebas de componentes deben detectar problemas relacionados con las props, los eventos, los slots que proveen, los estilos, las clases, los hooks del ciclo de vida y más de tu componente.

Las pruebas de componentes no deben simular componentes hijos, sino que deben probar las interacciones entre el componente y sus hijos interactuando con los componentes como lo haría un usuario. Por ejemplo, una prueba de componentes debe hacer clic en un elemento como lo haría un usuario, en lugar de interactuar programáticamente con el componente.

Las pruebas de componentes deben centrarse en las interfaces públicas del componente en lugar de los detalles de implementación interna. Para la mayoría de los componentes, la interfaz pública se limita a: eventos emitidos, props y slots. Al realizar pruebas, recuerda **probar lo que hace un componente, no cómo lo hace**.

**QUÉ HACER**

- Para la lógica **Visual**: asegura la salida correcta del renderizado en función de las props y los slots ingresados.
- Para la lógica de **Comportamiento**: asegura las actualizaciones correctas del renderizado o los eventos emitidos en respuesta a los eventos de entrada del usuario.

  En el siguiente ejemplo, probamos un componente Stepper que tiene un elemento del DOM llamado "increment" al que se le puede hacer clic. Pasamos una prop llamada `max` que evita que Stepper se incremente más allá de `2`, por lo que si hacemos clic en el botón 3 veces, la interfaz de usuario aún debería decir `2`.

  No sabemos nada sobre la implementación de Stepper, solo que la "entrada" es la prop `max` y la "salida" es el estado del DOM tal y como lo verá el usuario.

<TestingApiSwitcher>

<div class="testing-library-api">

```js
const { getByText } = render(Stepper, {
  props: {
    max: 1
  }
})

getByText('0') // Afirmación implícita de que "0" está dentro del componente

const button = getByText('increment')

// Enviar un evento de clic a nuestro botón de incremento.
await fireEvent.click(button)

getByText('1')

await fireEvent.click(button)
```

</div>

<div class="vtu-api">

```js
const valueSelector = '[data-testid=stepper-value]'
const buttonSelector = '[data-testid=increment]'

const wrapper = mount(Stepper, {
  props: {
    max: 1
  }
})

expect(wrapper.find(valueSelector).text()).toContain('0')

await wrapper.find(buttonSelector).trigger('click')

expect(wrapper.find(valueSelector).text()).toContain('1')
```

</div>

<div class="cypress-api">

```js
const valueSelector = '[data-testid=stepper-value]'
const buttonSelector = '[data-testid=increment]'

mount(Stepper, {
  props: {
    max: 1
  }
})

cy.get(valueSelector)
  .should('be.visible')
  .and('contain.text', '0')
  .get(buttonSelector)
  .click()
  .get(valueSelector)
  .should('contain.text', '1')
```

</div>

</TestingApiSwitcher>

- **QUÉ NO HACER**

  No compruebes el estado privado de la instancia de un componente ni pruebes los métodos privados de un componente. Probar los detalles de la implementación hace que las pruebas sean frágiles, ya que es más probable que se rompan y requieran actualizaciones cuando la implementación cambie.

  El trabajo final del componente es renderizar la salida correcta del DOM, por lo que las pruebas que se centran en la salida del DOM brindan el mismo nivel de garantía adecuado (si no más) y son más sólidas y resistentes al cambio.

  No confíes exclusivamente en las pruebas instantáneas. La comprobación de las cadenas HTML no describe la corrección. Escribe pruebas con intencionalidad.

  Si un método debe probarse a fondo, considera extraerlo en una función de utilidad independiente y escriba una prueba unitaria dedicada para él. Si no se puede extraer limpiamente, se puede probar como parte de un componente, integración o prueba de extremo a extremo que lo cubra.

### Recomendación

- [Vitest](https://vitest.dev/) para componentes o composables que se renderizan sin el head (por ejemplo, la función [`useFavicon`](https://vueuse.org/core/useFavicon/#usefavicon) en VueUse). Los componentes y el DOM se pueden probar usando [@testing-library/vue](https://testing-library.com/docs/vue-testing-library/intro).

- [Pruebas de Componentes de Cypress](https://on.cypress.io/component) para componentes cuyo comportamiento esperado depende de la representación adecuada de estilos o la activación de eventos nativos del DOM. Se puede usar con Librería de Pruebas a través de [@testing-library/cypress](https://testing-library.com/docs/cypress-testing-library/intro).

Las principales diferencias entre Vitest y los ejecutores de pruebas basados en el navegador son la velocidad y el contexto de ejecución. En resumen, los ejecutores basados en navegador, como Cypress, pueden detectar problemas que los ejecutores basados en nodos, como Vitest, no pueden (por ejemplo, problemas de estilo, eventos reales nativos del DOM, cookies, almacenamiento local y fallas de red), pero los ejecutores basados en el navegador son _órdenes de magnitud más lentos que Vitest_ porque abren un navegador, compilan sus hojas de estilo y más. Cypress es un ejecutor basado en el navegador que soporta pruebas de componentes. Por favor, lee la [página de comparación de Vitest](https://vitest.dev/guide/comparisons.html#cypress) para obtener la información más reciente que compara Vitest y Cypress.

### Librerías de Montaje

La prueba de componentes a menudo implica montar el componente que se está probando de forma aislada, desencadenar eventos simulados de entrada de usuario y la realización de pruebas en la salida del DOM renderizado. Existen librerías dedicadas que simplifican estas tareas.

- [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library) es una librería de pruebas de Vue centrada en probar componentes sin depender de los detalles de implementación. Creada con la accesibilidad en mente, su enfoque también hace que la refactorización sea muy sencilla. Su objetivo principal es que cuanto más se parezcan las pruebas a la forma en que se usa el software, más confianza pueden brindar.

- [`@vue/test-utils`](https://github.com/vuejs/test-utils) es la librería oficial de prueba de componentes de bajo nivel que se escribió para proporcionar a los usuarios acceso a las API específicas de Vue. También es la librería de bajo nivel sobre la que está construida `@testing-library/vue`.

Recomendamos usar `@testing-library/vue` para probar componentes en aplicaciones, ya que su enfoque se alinea mejor con las prioridades de prueba de las aplicaciones. Usa `@vue/test-utils` solo si estás creando componentes avanzados que requieren pruebas internas específicas de Vue.

### Otras opciones

- [Nightwatch](https://v2.nightwatchjs.org/) es un ejecutor de pruebas E2E con soporte para Pruebas de componentes de Vue. ([Proyecto de ejemplo](https://github.com/nightwatchjs-community/todo-vue) en Nightwatch v2)

## Pruebas E2E

Si bien las pruebas unitarias brindan a los desarrolladores cierto grado de confianza, las pruebas unitarias y de componentes tienen una capacidad limitada para proporcionar una cobertura global de una aplicación cuando se despliega en producción. Como resultado, las pruebas de extremo a extremo (E2E) brindan cobertura sobre lo que podría decirse que es el aspecto más importante de una aplicación: lo que sucede cuando los usuarios realmente usan sus aplicaciones.

Las pruebas de extremo a extremo se centran en el comportamiento de la aplicación de varias páginas que realiza solicitudes de red contra su aplicación de Vue creada en producción. A menudo implican la creación de una base de datos u otro backend, e incluso pueden ejecutarse en un entorno de pruebas en vivo.

Las pruebas de extremo a extremo suelen detectar problemas con el enrutador, la librería de gestión del estado, componentes de nivel superior (por ejemplo, una aplicación o un diseño), recursos públicos o cualquier manejo de solicitudes. Como se indicó anteriormente, detectan problemas críticos que pueden ser imposibles de detectar con pruebas unitarias o pruebas de componentes.

Las pruebas de extremo a extremo no importan ningún código de tu aplicación de Vue, sino que se basan completamente en probar tu aplicación navegando a través de páginas enteras en un navegador real.

Las pruebas de extremo a extremo validan muchas de las capas de tu aplicación. Pueden apuntar a tu aplicación creada localmente o incluso a un entorno de prueba en vivo. Las pruebas contra el Entorno de prueba no sólo incluyen el código del frontend y el servidor estático, sino también todos los servicios y la infraestructura asociados del backend.

> Cuanto más se parezcan sus pruebas a la forma en que se usa su software, más confianza le pueden brindar. - [Kent C. Dodds](https://twitter.com/kentcdodds/status/977018512689455106) - Autor de la Biblioteca de pruebas

Al probar cómo las acciones del usuario afectan su aplicación, las pruebas E2E suelen ser la clave para aumentar la confianza en el buen funcionamiento de una aplicación.

### Eligiendo una solución de pruebas E2E

Si bien las pruebas de extremo a extremo (E2E) en la web se han ganado una reputación negativa por las pruebas poco confiables (inestables) y la ralentización de los procesos de desarrollo, las herramientas modernas de E2E han avanzado para crear pruebas más confiables, interactivas y útiles. Al elegir un framework de pruebas E2E, las siguientes secciones ofrecen algunas orientaciones sobre las cosas que hay que tener en cuenta al elegir un framework de pruebas para su aplicación.

#### Pruebas entre navegadores

Uno de los principales beneficios por los que se conocen las pruebas de extremo a extremo (E2E) es su capacidad para probar su aplicación en múltiples navegadores. Si bien puede parecer conveniente tener una cobertura del 100% entre navegadores, es importante tener en cuenta que las pruebas entre navegadores tienen rendimientos decrecientes en los recursos de un equipo debido al tiempo adicional y la potencia de la máquina que se requiere para ejecutarlas de forma consistente. Como resultado, es importante tener en cuenta esta compensación a la hora de elegir la cantidad de pruebas entre navegadores que necesita su aplicación.

#### Ciclos de retroalimentación más rápidos

Uno de los principales problemas con las pruebas extremo a extremo (E2E) y el desarrollo de estas, es que ejecutar todo el paquete lleva mucho tiempo. Por lo general, esto solo se realiza en canalizaciones de integración e implementación continuas (CI/CD). Los frameworks de prueba E2E modernos han ayudado a resolver esto al agregar funciones como la paralelización, que permite que las canalizaciones de CI/CD a menudo ejecuten magnitudes más rápido que antes. Además, cuando se desarrolla localmente, la capacidad de ejecutar selectivamente una sola prueba para la página en la que se está trabajando, y al mismo tiempo producir una recarga en caliente de las pruebas puede ayudar a impulsar el flujo de trabajo y la productividad de un desarrollador.

#### Experiencia de depuración de primera clase

Si bien los desarrolladores tradicionalmente se han basado en escanear registros en una ventana de terminal para ayudar a determinar qué salió mal en una prueba, los frameworks de prueba modernos de extremo a extremo (E2E) permiten a los desarrolladores aprovechar las herramientas con las que ya están familiarizados, por ejemplo, las herramientas de desarrollo del navegador.

#### Visibilidad en el modo libre

Cuando las pruebas de extremo a extremo (E2E) se ejecutan en canalizaciones de implementación/integración continua, a menudo se ejecutan en navegadores sin interfaz (es decir, no se abre ningún navegador visible para que el usuario lo vea). Una característica crítica de los frameworks de prueba E2E modernos es la capacidad de ver instantáneas y/o videos de la aplicación durante las pruebas, lo que brinda una idea de por qué se producen los errores. Históricamente, era tedioso mantener estas integraciones.

### Recomendación

- [Cypress](https://www.cypress.io/)

  En general, creemos que Cypress proporciona la solución E2E más completa con características como una interfaz gráfica informativa, excelente capacidad de depuración, aserciones y stubs integrados, resistencia a las fallas, paralelización e instantáneas. Como se mencionó anteriormente, también proporciona soporte para la [Prueba de Componentes](https://docs.cypress.io/guides/component-testing/introduction). Sin embargo, solo es compatible con navegadores basados en Chrome y Firefox.

### Otras opciones

- [Playwright](https://playwright.dev/) también es una excelente solución de pruebas E2E con una mayor compatibilidad con los navegadores (principalmente WebKit). Vea [Por qué Playwright](https://playwright.dev/docs/why-playwright) para más detalles.

- [Nightwatch v2](https://v2.nightwatchjs.org/) es una solución de pruebas E2E basada en [Selenium WebDriver](https://www.npmjs.com/package/selenium-webdriver). Esto le da un rango más amplio de compatibilidad con los navegadores.

## Instrucciones

### Añadir Vitest a un proyecto

En un proyecto de Vue basado en Vite, ejecute:

```sh
> npm install -D vitest happy-dom @testing-library/vue
```

A continuación, actualice la configuración de Vite para agregar el bloque de opciones `test`:

```js{6-12}
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  test: {
    // habilite las API de prueba globales similar a jest
    globals: true,
    // simular el DOM con happy-dom
    // (requiere instalar happy-dom como una dependencia)
    environment: 'happy-dom'
  }
})
```

:::tip
Si estás usando TypeScript, agrega `vitest/globals` al campo `types` en tu `tsconfig.json`.

```json
// tsconfig.json

{
  "compileroptions": {
    "types": ["vitest/globals"]
  }
}
```

:::

Luego, cree un archivo que termine en `*.test.js` en tu proyecto. Puedes colocar todos los archivos de prueba en un directorio de prueba en la raíz del proyecto, o en directorios de prueba junto a tus archivos fuente. Vitest los buscará automáticamente usando la convención de nomenclatura.

```js
// MyComponent.test.js
import { render } from '@testing-library/vue'
import MyComponent from './MyComponent.vue'

test('it should work', () => {
  const { getByText } = render(MyComponent, {
    props: {
      /* ... */
    }
  })

  // confirmar la salida
  getByText('...')
})
```

Finalmente, actualice `package.json` para agregar el script de prueba y ejecútelo:

```json{4}
{
  // ...
  "scripts": {
    "test": "vitest"
  }
}
```

```sh
> npm test
```

### Pruebas de Composables

> Esta sección supone que has leído la sección [Composables](/guide/reusability/composables.html).

Cuando se trata de probar composables, podemos dividirlos en dos categorías: composables que no dependen de la instancia de un componente anfitrión y composables que sí lo hacen.

Un composable depende de la instancia de un componente anfitrión cuando utiliza las siguientes API:

- Hooks del ciclo de vida
- Provide / Inject

Si un composable solo usa la API de reactividad, entonces se puede probar invocándolo directamente y asegurando los estados/métodos devueltos:

```js
// counter.js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++

  return {
    count,
    increment
  }
}
```

```js
// counter.test.js
import { useCounter } from './counter.js'

test('useCounter', () => {
  const { count, increment } = useCounter()
  expect(count.value).toBe(0)

  increment()
  expect(count.value).toBe(1)
})
```

Un composable que depende de los hooks del ciclo de vida o Provide/Inject necesita ser envuelto en un componente anfitrión para ser probado. Podemos crear un ayudante como el siguiente:

```js
// test-utils.js
import { createApp } from 'vue'

export function withSetup(composable) {
  let result
  const app = createApp({
    setup() {
      result = composable()
      // suprimir la advertencia de plantilla faltante
      return () => {}
    }
  })
  app.mount(document.createElement('div'))
  // devolver el resultado y la instancia de la aplicación
  // para probar provide / unmount
  return [result, app]
}
```

```js
import { withSetup } from './test-utils'
import { useFoo } from './foo'

test('useFoo', () => {
  const [result, app] = withSetup(() => useFoo(123))
  // simular provide para prueba de inyecciones
  app.provide(...)
  // ejecutar aserciones
  expect(result.foo.value).toBe(1)
  // disparar el hook onUnmounted si es necesario
  app.unmount()
})
```

Para composables más complejos, también podría ser más fácil probarlo escribiendo pruebas contra el componente envolvente utilizando técnicas de [Prueba de Componentes](#prueba-de-componentes).

<!--
TODO more testing recipes can be added in the future e.g.
- How to set up CI via GitHub actions
- How to do mocking in component testing
-->
