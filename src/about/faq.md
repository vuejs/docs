# Preguntas frecuentes

## ¿Quién mantiene Vue?

Vue es un proyecto independiente impulsado por la comunidad. Fue creado por [Evan You](https://twitter.com/youyuxi) en 2014 como un proyecto personal paralelo. Hoy en día, Vue es mantenido activamente por [un equipo tanto de tiempo completo como de miembros voluntarios alrededor de todo el mundo](/about/team), donde Evan se desempeña como líder del proyecto. Puedes obtener más información sobre la historia de Vue en este [documental](https://www.youtube.com/watch?v=OrxmtDw4pVI).

El desarrollo de Vue se financia principalmente a través de patrocinios y hemos sido financieramente sostenibles desde 2016. Si usted o su empresa se benefician de Vue, ¡considere [patrocinarnos](/sponsor/) para apoyar el desarrollo de Vue!

## ¿Cuál es la diferencia entre Vue 2 y Vue 3?

Vue 3 es la última y actual versión principal de Vue. Contiene nuevas características que no están presentes en Vue 2, por ejemplo Teleport, Suspense, y múltiples elementos raíz por plantilla. También contiene cambios de ruptura que la hacen incompatible con Vue 2. Todos los detalles están documentados en la [Guía de migración a Vue 3](https://v3-migration.vuejs.org/).

A pesar de las diferencias, la mayoría de las APIs de Vue se comparten entre las dos versiones principales, por lo que la mayoría de tus conocimientos de Vue 2 seguirán funcionando en Vue 3. En particular, la Composition API era originalmente una característica exclusiva de Vue 3, pero ahora se ha trasladado a Vue 2 y está disponible en [Vue 2.7] (https://github.com/vuejs/vue/blob/main/CHANGELOG.md#270-2022-07-01).

En general, Vue 3 proporciona tamaños de paquetes más pequeños, mejor rendimiento, mejor escalabilidad y mejor soporte de TypeScript / IDE. Si estás empezando un nuevo proyecto hoy, Vue 3 es la opción recomendada. Sólo hay unas pocas razones para que consideres Vue 2 a partir de ahora:

- Necesitas soportar IE11. Vue 3 aprovecha las características modernas de JavaScript y no es compatible con IE11.

- Todavía estás esperando que los principales proyectos del ecosistema como Nuxt o Vuetify lancen versiones estables para Vue 3. Esto es razonable si no deseas utilizar software en fase beta. Sin embargo, ten en cuenta que hay otras librerías de componentes de Vue 3 ya estables como [Quasar](https://quasar.dev/), [Naive UI](https://www.naiveui.com/) y [Element Plus](https://element-plus.org/).

Si tienes intención de migrar una aplicación Vue 2 existente a Vue 3, consulta la [guía de migración](https://v3-migration.vuejs.org/).

Vue 2.7, que se lanzó en julio de 2022, es la última versión menor de la gama de versiones de Vue 2. Vue 2 ha entrado en modo de mantenimiento: ya no recibirá nuevas características, pero seguirá recibiendo correcciones de errores críticos y actualizaciones de seguridad durante 18 meses a partir de la fecha de lanzamiento de la versión 2.7. Esto significa que **Vue 2 llegará al final de su vida útil a finales de 2023**. Creemos que esto debería dar tiempo suficiente para que la mayor parte del ecosistema migre a Vue 3. Sin embargo, también entendemos que podría haber equipos o proyectos que no puedan actualizar en este plazo y que aún necesiten cumplir con los requisitos de seguridad y compatibilidad. Estamos planeando proporcionar soporte extendido para Vue 2 para los equipos con tales necesidades; si su equipo espera estar usando Vue 2 más allá de finales de 2023, asegúrese de planificar con anticipación y registrar su interés [aquí](https://airtable.com/shrj37Zf4ZIfrxFzh).

## ¿Qué licencia usa Vue?

Vue es un proyecto gratuito y de código abierto publicado bajo [Licencia MIT](https://opensource.org/licenses/MIT).

## ¿Qué navegadores soporta Vue?

La última versión de Vue (3.x) solo admite [navegadores con soporte nativo para ES2015](https://caniuse.com/es6). Esto excluye IE11. Vue 3.x usa funciones de ES2015 a las que no se puede hacer polyfill en navegadores heredados, por lo que si necesita admitir navegadores heredados, deberá usar Vue 2.x en su lugar.

## ¿Es confiable Vue?

Vue es un framework maduro y probado en batalla. Es uno de los frameworks de JavaScript más ampliamente utilizados en producción en la actualidad, con más de 1,5 millones de usuarios en todo el mundo y con cerca de 10 millones de descargas al mes en npm.

Vue es utilizado en producción por organizaciones de renombre en diversas capacidades en todo el mundo, incluidas la Fundación Wikimedia, la NASA, Apple, Google, Microsoft, GitLab, Zoom, Tencent, Weibo, Bilibili, Kuaishou y muchas más.

## ¿Vue es rápido?

Vue 3 es uno de los frameworks frontend convencionales de mayor rendimiento y maneja la mayoría de los casos de uso de aplicaciones web con facilidad, sin necesidad de optimizaciones manuales.

En escenarios de pruebas de estrés, Vue supera a React y Angular por un margen decente en [js-framework-benchmark](https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html). También va codo a codo con algunos de los frameworks de trabajo de DOM-no-virtual de nivel de producción más rápidos en el benchmark.

Ten en cuenta que los índices sintéticos de referencia como los anteriores se centran en el rendimiento del renderizado en bruto con optimizaciones dedicadas y pueden no ser totalmente representativos de los resultados de rendimiento en el mundo real. Si te interesa más el rendimiento de carga de la página, puedes auditar este mismo sitio web utilizando [WebPageTest](https://www.webpagetest.org/lighthouse) o [PageSpeed Insights](https://pagespeed.web.dev/). Este sitio web está impulsado por el propio Vue, con pre-renderización SSG, hidratación completa de la página y navegación de SPA del lado del cliente. Obtiene una puntuación de 100 en rendimiento en un Moto G4 emulado con una ralentización de la CPU de 4x en redes 4G lentas.

Puede obtener más información sobre cómo Vue optimiza automáticamente el rendimiento del tiempo de ejecución en la sección [Mecanismo de Renderizado](/guide/extras/rendering-mechanism.html), y cómo optimizar una aplicación Vue en casos especialmente exigentes en la [Guía de Optimización del Rendimiento](/guide/best-practices/performance.html).

## ¿Vue es liviano?

Cuando usas una herramienta de compilación, muchas de las API de Vue son ["sacudibles del árbol"](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking). Por ejemplo, si no utilizas el componente integrado `<Transition>`, no se incluirá en el paquete de producción final.

Una aplicación hello world de Vue que solo usa las API mínimas tiene un tamaño de referencia de solo alrededor de **16kb**, con minificación y compresión brotli. El tamaño real de la aplicación dependerá de la cantidad de funciones opcionales que use del framework. En el caso improbable de que una aplicación use todas las funciones que ofrece Vue, el tamaño total del runtime es de alrededor de **27kb**.

Cuando usamos Vue sin una herramienta de compilación, no solo perdemos lo sacudible del árbol, sino que también tenemos que enviar el compilador de plantillas al navegador. Esto aumenta el tamaño a alrededor de **41kb**. Por lo tanto, si usas Vue principalmente para mejora progresiva sin un paso de compilación, considera usar [petite-vue](https://github.com/vuejs/petite-vue) (solo **6kb**) en su lugar.

Algunos frameworks, como Svelte, usan una estrategia de compilación que produce resultados extremadamente livianos en escenarios de un solo componente. Sin embargo, [nuestra investigación](https://github.com/yyx990803/vue-svelte-size-analysis) muestra que la diferencia de tamaño depende en gran medida de la cantidad de componentes en la aplicación. Si bien Vue tiene un tamaño de referencia más pesado, genera menos código por componente. En escenarios del mundo real, una aplicación Vue puede terminar siendo más ligera.

## ¿Vue escala?

Si. A pesar de la idea errónea común de que Vue solo es adecuado para casos de uso simples, Vue es perfectamente capaz de manejar aplicaciones a gran escala:

- [Componentes de un Solo Archivo](/guide/scaling-up/sfc) proporcionan un modelo de desarrollo modular que permite desarrollar diferentes partes de una aplicación de forma aislada.

- [Composition API](/guide/reusability/composables) proporciona una integración de primera clase con TypeScript y permite patrones limpios para organizar, extraer y reutilizar lógica compleja.

- [Soporte exhaustivo de herramientas](/guide/scaling-up/tooling.html) garantiza una experiencia de desarrollo fluida a medida que crece la aplicación.

- Menor barrera de entrada y excelente documentación se traducen en menores costos de incorporación y capacitación para los nuevos desarrolladores.

## ¿Cómo contribuyo a Vue?

¡Agradecemos tu interés! Consulta nuestra [Guía de la Comunidad](/about/community-guide.html).

## ¿Debo usar Options API o Composition API?

Si eres nuevo en Vue, ofrecemos una comparación de alto nivel entre los dos estilos [aquí](/guide/introduction.html#what-to-choose).

Si previamente utilizaste Options API y estás evaluando en la actualidad la Composition API, consulta [estas FAQ](/guide/extras/composition-api-faq).

## ¿Debo usar JavaScript o TypeScript con Vue?

Si bien Vue en sí está implementado en TypeScript y proporciona compatibilidad de primera clase con TypeScript, no impone una opinión sobre si debes usar TypeScript como usuario.

La compatibilidad con TypeScript es una consideración importante cuando se agregan nuevas funciones a Vue. Las API que están diseñadas con TypeScript en mente suelen ser más fáciles de entender para los IDE y los linters, incluso si tú mismo no estás usando TypeScript. Todo el mundo gana. Las API de Vue también están diseñadas para funcionar de la misma manera tanto en JavaScript como en TypeScript tanto como sea posible.

La adopción de TypeScript implica una compensación entre la complejidad de incorporación y las ganancias de mantenibilidad a largo plazo. La justificación de tal compensación puede variar según los antecedentes de tu equipo y la escala del proyecto, pero Vue no es realmente un factor que influya en la toma de esa decisión.

## ¿Cómo se equipara Vue con los componentes web?

Vue se creó antes de que los componentes web estuvieran disponibles de forma nativa y algunos aspectos del diseño de Vue (por ejemplo, los slots) se inspiraron en el modelo de Componentes Web.

Las especificaciones de los componentes web son de nivel relativamente bajo, ya que se centran en la definición de elementos personalizados. Como framework, Vue aborda preocupaciones adicionales de alto nivel, como la renderización eficiente del DOM, el manejo del estado reactivo, las herramientas, el enrutamiento del lado del cliente y la renderización del lado del servidor.

Vue también es totalmente compatible con el consumo o la exportación a elementos personalizados nativos; consulta la [Guía Vue y Componentes Web](/guide/extras/web-components) para obtener más detalles.

<!-- ## TODO ¿Cómo se compara Vue con React? -->

<!-- ## TODO ¿Cómo se compara Vue con Angular? -->
