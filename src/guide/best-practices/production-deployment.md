# Implementación de Producción (Deployment)

## Desarrollo vs. Producción

Durante el desarrollo, Vue proporciona una serie de características para mejorar la experiencia de desarrollo:

- Advertencia de errores y problemas comunes
- Validación de props / eventos
- Hooks de depuración de reactividad
- Integración con herramientas de desarrollo (Devtools)

Sin embargo, estas características se vuelven inútiles en producción. Algunas de las comprobaciones de advertencia también pueden ocasionar una pequeña sobrecarga de rendimiento. Al desplegar en producción, deberíamos eliminar todas las ramas de código de desarrollo no utilizadas para reducir el tamaño de la carga útil y mejorar el rendimiento.

## Sin Herramientas de Compilación

Si estás utilizando Vue sin una herramienta de compilación cargándolo desde un CDN o un script auto-alojado, asegúrate de utilizar la compilación de producción (archivos dist que terminan en `.prod.js`) al desplegar en producción. Las compilaciones de producción se minifican previamente con todas las ramas de código de desarrollo eliminadas.

- Si usas una compilación global (accediendo a través de la global `Vue`): usa `vue.global.prod.js`.
- Si usas la compilación ESM (accediendo a través de las importaciones nativas de ESM): usa `vue.esm-browser.prod.js`.

Consulte la [guía de archivos dist](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use) para obtener más detalles.

## Con Herramientas de Compilación

Los proyectos creados a través de `create-vue` (basado en Vite) o Vue CLI (basado en webpack) están preconfigurados para compilaciones de producción.

Si utilizas una configuración personalizada, asegúrate de que:

1. `vue` resuelve a `vue.runtime.esm-bundler.js`.
2. Los [indicadores de características en tiempo de compilación](https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags) están configurados correctamente.
3. <code>process.env<wbr>.NODE_ENV</code> se reemplaza con `"production"` durante la compilación.

Referencias adicionales:

- [Guía de compilación en producción de Vite](https://vitejs.dev/guide/build.html)
- [Guía de implementación de Vite](https://vitejs.dev/guide/static-deploy.html)
- [Guía de implementación de Vue CLI](https://cli.vuejs.org/guide/deployment.html)

## Seguimiento de Errores en Tiempo de Ejecución

El [controlador de errores a nivel de aplicación](/api/application.html#app-config-errorhandler) se puede usar para informar errores a los servicios de seguimiento:

```js
import { createApp } from 'vue'

const app = createApp(...)

app.config.errorHandler = (err, instance, info) => {
  // informar de un error a los servicios de seguimiento
}
```

Servicios como [Sentry](https://docs.sentry.io/platforms/javascript/guides/vue/) y [Bugsnag](https://docs.bugsnag.com/platforms/javascript/vue/) también ofrecen integraciones oficiales para Vue.
