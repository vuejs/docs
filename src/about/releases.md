---
outline: deep
---

<script setup>
import { onMounted } from 'vue'

let version = $ref()

onMounted(async () => {
  const res = await fetch('https://api.github.com/repos/vuejs/core/releases?per_page=1')
  version = (await res.json())[0].name
})
</script>

# Lanzamientos

<p v-if="version">
La última versión estable actual de Vue es <strong>{{ version }}</strong>.
</p>
<p v-else>
Comprobando la última versión...
</p>

Un registro completo de los cambios de las versiones anteriores está disponible en [GitHub](https://github.com/vuejs/core/blob/main/CHANGELOG.md).

## Ciclo de Lanzamiento

Vue no tiene un ciclo de lanzamiento fijo.

- Los lanzamientos de parches se publican según sea necesario.

- Los lanzamientos menores siempre contienen nuevas características, con un marco de tiempo típico de 3 a 6 meses entre ellos. Los lanzamientos menores siempre pasan por una fase beta de prelanzamiento.

- Los lanzamientos mayores se anunciarán con anticipación y pasarán por una fase de discusión inicial y fases alfa/beta previas al lanzamiento.

## Casos Extremos de Versionado Semántico

Los lanzamientos de Vue siguen [Versionado Semántico](https://semver.org/) con algunos pocos casos extremos.

### Definiciones de TypeScript

Podemos enviar cambios incompatibles a las definiciones de TypeScript entre versiones **menores**. Esto es porque:

1. A veces, TypeScript en sí incluye cambios incompatibles entre versiones menores, y es posible que tengamos que ajustar tipos para soportar versiones más recientes de TypeScript.

2. Ocasionalmente, es posible que necesitemos adoptar funciones que solo están disponibles en una versión más reciente de TypeScript, elevando la versión mínima requerida de TypeScript.

Si estás usando TypeScript, puedes usar un rango de versionado semántico (SemVer) que bloquee la versión menor actual y actualizarla manualmente cuando se lance una nueva versión menor de Vue.

### Compatibilidad del Código Compilado con Runtime Anteriores

Una versión **menor** más nueva del compilador de Vue puede generar código que no sea compatible con el runtime de Vue de una versión menor anterior. Por ejemplo, el código generado por el compilador de Vue 3.2 puede no ser totalmente compatible si lo consume el runtime de Vue 3.1.

Esto es solo una inquietud para los autores de librerías porque, en las aplicaciones, la versión del compilador y la versión del runtime son siempre las mismas. Una discrepancia de versión puede ocurrir solo si envías el código del componente Vue precompilado como un paquete y un consumidor lo utiliza en un proyecto que use una versión anterior de Vue. Como resultado, es posible que tu paquete deba declarar explícitamente una versión menor mínima requerida de Vue.

## Lanzamientos Preliminares

Las versiones menores generalmente pasan por un número no fijo de versiones beta. Los lanzamientos mayores pasarán por una fase alfa y una fase beta.

Los lanzamientos preliminares están destinados a pruebas de integración/estabilidad, y para que los primeros usuarios proporcionen comentarios sobre características inestables. No utilice versiones preliminares en producción. Todos los lanzamientos preliminares se consideran inestables y pueden llevar cambios importantes consigo; por lo tanto, indica siempre las versiones exactas cuando utilices lanzamientos preliminares.

## Obsolescencias

Es posible que periódicamente dejemos de usar funciones que tengan reemplazos nuevos y mejores en versiones menores. Las funciones obsoletas seguirán funcionando y se eliminarán en la próxima versión mayor después de que entren en estado de obsolescencia.

## RFC

Las nuevas características con cambios sustanciales e importantes de la API en Vue pasarán por el proceso de **Solicitud de Comentarios** (Request for Comments, RFC). El proceso de RFC tiene como objetivo proporcionar una ruta coherente y controlada para que las nuevas funciones ingresen al framework y brindar a los usuarios la oportunidad de participar y ofrecer comentarios en el proceso de diseño.

El proceso de RFC se lleva a cabo en el repositorio [vuejs/rfcs](https://github.com/vuejs/rfcs) en GitHub.

## Características Experimentales

Algunas características se envían y documentan en una versión estable de Vue, pero son marcadas como experimentales. Las características experimentales suelen ser características que tienen una discusión de RFC asociada con la mayoría de los problemas de diseño resueltos en papel, pero aún carecen de comentarios del uso en el mundo real.

El objetivo de las características experimentales es permitir que los usuarios proporcionen comentarios al probarlas en un entorno de producción, sin tener que usar una versión inestable de Vue. Las características experimentales en sí mismas se consideran inestables y solo deben usarse de manera controlada, con la expectativa de que la característica pueda cambiar entre cualquier tipo de versión.
