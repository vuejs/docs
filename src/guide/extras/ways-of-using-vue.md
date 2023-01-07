# Formas de Usar Vue

Creemos que no hay una historia de "talla única" para la web. Por ello, Vue está diseñado para ser flexible y ser adoptado de forma progresiva. Dependiendo de su caso de uso, Vue se puede utilizar de diferentes maneras para lograr el equilibrio óptimo entre la complejidad del stack, la experiencia del desarrollador y el rendimiento final.

## Script Independiente

Vue puede ser utilizado como un archivo de script autónomo; ¡no se requiere ningún paso de compilación! Si tienes un framework de backend que ya renderiza la mayor parte del HTML, o tu lógica de frontend no es lo suficientemente compleja como para justificar un paso de construcción, esta es la forma más fácil de integrar Vue en tu stack. Puedes pensar en Vue como un reemplazo más declarativo de jQuery en estos casos.

Vue también proporciona una distribución alternativa llamada [petite-vue](https://github.com/vuejs/petite-vue) que está optimizada específicamente para mejorar progresivamente el HTML existente. Tiene un conjunto de características más pequeño, pero es extremadamente ligero y utiliza una implementación que es más eficiente en escenarios sin pasos de compilación.

## Componentes Web Embebidos

Puedes utilizar Vue para [construir Componentes Web estándar](/guide/extras/web-components) que pueden ser embebidos en cualquier página HTML, independientemente de cómo sean renderizados. Esta opción permite aprovechar Vue de una forma completamente agnóstica para el consumidor: los componentes web resultantes pueden ser embebidos en aplicaciones heredadas, HTML estático, o incluso aplicaciones construidas con otros frameworks.

## Aplicación de una Sola Página (SPA)

Algunas aplicaciones requieren una rica interactividad, una gran profundidad de sesión y una lógica de estado no trivial en el frontend. La mejor manera de construir este tipo de aplicaciones es utilizar una arquitectura en la que Vue no sólo controla toda la página, sino que también maneja las actualizaciones de los datos y la navegación sin tener que recargar la página. Este tipo de aplicación se suele denominar Aplicación de una Sola Página (SPA).

Vue proporciona librerías de base y [soporte integral de herramientas](/guide/scaling-up/tooling) con una increíble experiencia para el desarrollador a la hora de construir SPAs modernas, incluyendo:

- Enrutador del lado del cliente
- Cadena de herramientas de construcción increíblemente rápida
- Soporte para IDE
- Herramientas de desarrollo del navegador
- Integraciones de TypeScript
- Utilidades para testing

Las SPA suelen requerir que el backend exponga los puntos finales de la API, pero también puedes combinar Vue con soluciones como [Inertia.js](https://inertiajs.com) para obtener las ventajas de las SPA y mantener un modelo de desarrollo centrado en el servidor.

## Fullstack / SSR

Las SPA puras del lado del cliente son problemáticas cuando la aplicación es sensible al SEO y a los nuevos retos del contenido. Esto se debe a que el navegador recibirá una página HTML en gran parte vacía, y tiene que esperar hasta que se cargue el JavaScript antes de renderizar nada.

Vue proporciona APIs de primera clase para "renderizar" una aplicación Vue en cadenas HTML en el servidor. Esto permite que el servidor devuelva el HTML ya renderizado, permitiendo a los usuarios finales ver el contenido inmediatamente mientras se descarga el JavaScript. A continuación, Vue "hidratará" la aplicación en el lado del cliente para hacerla interactiva. Esto se denomina [Renderizado del Lado del Servidor (SSR)](/guide/scaling-up/ssr) y mejora en gran medida las métricas de Core Web Vital como el [Tiempo de Despliegue del Contenido más Extenso (LCP)](https://web.dev/lcp/).

Existen frameworks de mayor nivel basados en Vue y construidos sobre este paradigma, como [Nuxt](https://v3.nuxtjs.org/), que permiten desarrollar una aplicación fullstack utilizando Vue y JavaScript.

## JAMStack / SSG

El renderizado del lado del servidor se puede hacer por adelantado si los datos requeridos son estáticos. Esto significa que podemos pre-renderizar una aplicación completa en HTML y servirla como archivos estáticos. Esto mejora el rendimiento del sitio y hace que el despliegue sea mucho más sencillo, ya que no necesitamos renderizar dinámicamente las páginas en cada petición. Vue todavía puede hidratar tales aplicaciones para proporcionar una rica interactividad en el cliente. Esta técnica se conoce comúnmente como Generación de Sitios Estáticos (SSG), también conocida como [JAMStack](https://jamstack.org/what-is-jamstack/).

Hay dos tipos de SSG: de una sola página y de varias páginas. Ambos favorecen la pre-renderización del sitio en HTML estático, la diferencia es que:

- Después de la carga inicial de la página, un SSG de una sola página "hidrata" la página en una SPA. Esto requiere más carga inicial de JS y coste de hidratación, pero las navegaciones posteriores serán más rápidas, ya que sólo se necesita actualizar parcialmente el contenido de la página en lugar de recargar toda la página.

- Un SSG multipágina carga una nueva página en cada navegación. La ventaja es que se puede enviar un mínimo de JS ¡o ningún JS si la página no requiere ninguna interacción! Algunos frameworks SSG multipágina como [Astro](https://astro.build/) también admiten la "hidratación parcial", que permite utilizar componentes Vue para crear "islas" interactivas dentro del HTML estático.

Los SSG de una sola página son más adecuados si se espera una interactividad no trivial, sesiones de gran duración o persistencia de elementos/estado a través de las navegaciones. De lo contrario, los SSG multipágina serían la mejor opción.

El equipo de Vue también mantiene un generador de sitios estáticos llamado [VitePress](https://vitepress.vuejs.org/), que hace funcionar este sitio web que estás leyendo ahora mismo. VitePress soporta ambos tipos de SSG. [Nuxt](https://v3.nuxtjs.org/) también soporta SSG. Incluso puedes mezclar SSR y SSG para diferentes rutas en la misma aplicación Nuxt.

## Más Allá de la Web

Aunque Vue está diseñado principalmente para la construcción de aplicaciones web, no se limita en absoluto al navegador. Puedes:

- Construir aplicaciones de escritorio con [Electron](https://www.electronjs.org/) o [Tauri](https://tauri.studio/en/)
- Construir aplicaciones móviles con [Ionic Vue](https://ionicframework.com/docs/vue/overview)
- Construir aplicaciones de escritorio y móviles desde el mismo código base con [Quasar](https://quasar.dev/)
- Utiliza la [Custom Renderer API](/api/custom-renderer) de Vue para crear renderizadores personalizados orientados a [WebGL](https://troisjs.github.io/) o incluso [el terminal](https://github.com/ycmjason/vuminal).
