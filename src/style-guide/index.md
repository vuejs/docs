---
outline: deep
---

# Guía de estilo

:::warning Notificación de Estado
La guía de estilo está un poco desactualizada. La mayoría de los ejemplos se refieren solo en la Option API y no hay reglas con respecto al `<script setup>` ni la Composition API. Estamos planeando mejorarla en el futuro.
:::

Esta es la guía de estilo oficial específica para el código de Vue. Si usas Vue en un proyecto, esta es una excelente referencia para evitar errores, superficialidad y antipatrones. Sin embargo, creemos que ninguna guía de estilo es ideal para todos los equipos o proyectos, por lo que recomendamos desviaciones conscientes en función a la experiencia, la tecnología pertinente y los intereses individuales.

En su mayor parte, evitamos las sugerencias sobre JavaScript o HTML en general. No nos importa si usa puntos y comas o comas finales. No nos importa si su HTML usa comillas simples o comillas dobles para los valores de los atributos. Sin embargo, existirán algunas excepciones donde hemos encontrado que un patrón particular es útil en el contexto de Vue.

Finalmente, hemos dividido las reglas en cuatro categorías:

## Categorías

### Prioridad A: Esencial (Prevención de Errores)

Estas reglas ayudan a prevenir errores; apréndelas y apégate a ellas a toda costa. Pueden existir excepciones, pero deberían ser muy raras y solo las deben realizar por personas expertas tanto en JavaScript como en Vue.

- [Ver todas las reglas de Prioridad A](./rules-essential)

### Prioridad B: Muy Recomendado

Se ha encontrado que estas reglas mejoran la legibilidad y/o la experiencia del desarrollador en la mayoría de los proyectos. Tu código se ejecutará aún si no las respetas, pero las violaciones deberían ser raras y estar bien justificadas.

- [Ver todas las reglas de Prioridad B](./rules-strongly-recommended)

### Prioridad C: Recomendado

Donde existen múltiples opciones, todas igualmente buenas, se puede hacer una elección arbitraria para garantizar la coherencia. En estas reglas, describimos cada opción aceptable y sugerimos una opción predeterminada. Eso significa que puedes sentirte libre de hacer una elección diferente en tu código base, siempre que esta sea coherente y tengas una buena razón. ¡Por favor, ten al menos una buena razón! Al adaptarte al estándar de la comunidad, tu:

1. Entrenas tu cerebro para analizar más fácilmente la mayor parte del código de la comunidad que encuentres.
2. Serás capaz de copiar y pegar la mayoría de los ejemplos de código de la comunidad sin modificaciones.
3. A menudo encuentras nuevos desarrolladores acostumbrados a tu estilo de codificación preferido, al menos en lo que respecta a Vue.

- [Ver todas las reglas de Prioridad C](./rules-recommended)

### Prioridad D: usar con Precaución

Algunas características de Vue existen para adaptarse a casos extremos raros o migraciones más fluidas desde una base de código legada. Sin embargo, cuando se usan en exceso, pueden hacer que tu código sea más difícil de mantener o incluso convertirse en una fuente de errores. Estas reglas arrojan luz sobre las características potencialmente riesgosas y describen cuándo y por qué deben evitarse.

- [Ver todas las reglas de Prioridad D](./rules-use-with-caution)
