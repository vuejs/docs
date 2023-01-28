# Seguridad

## Reporte de Vulnerabilidades

Cuando se informa una vulnerabilidad, inmediatamente se convierte en nuestra principal preocupación, y un colaborador de tiempo completo lo deja todo para trabajar en ella. Para informar de una vulnerabilidad, envía un correo electrónico a [security@vuejs.org](mailto:security@vuejs.org).

Si bien el descubrimiento de nuevas vulnerabilidades es raro, también recomendamos usar siempre las últimas versiones de Vue y librerías oficiales complementarias para garantizar que tu aplicación permanezca lo más segura posible.

## Regla No. 1: Nunca Utilizar Plantillas No Confiables

La regla de seguridad más fundamental al usar Vue es **nunca usar contenido que no sea de confianza como plantilla de componentes**. Hacerlo es equivalente a permitir la ejecución arbitraria de JavaScript en tu aplicación y, lo que es peor, podrías provocar vulneraciones en el servidor si el código se ejecuta durante la renderización del lado del servidor. Un ejemplo de tal uso:

```js
Vue.createApp({
  template: `<div>` + userProvidedString + `</div>` // NUNCA HAGAS ESTO
}).mount('#app')
```

Las plantillas de Vue se compilan en JavaScript, y las expresiones dentro de las plantillas se ejecutarán como parte del proceso de renderización. Aunque las expresiones se evalúan en un contexto de renderización específico, debido a la complejidad de los posibles entornos de ejecución global, no es práctico que un framework como Vue te proteja por completo de la posible ejecución de código malicioso sin incurrir en una sobrecarga de rendimiento poco realista. La forma más sencilla de evitar esta categoría de problemas es asegurarte de que el contenido de tus plantillas de Vue sean siempre de confianza y estén totalmente controladas por ti.

## Lo que Hace Vue para Protegerte

### Contenido HTML

Tanto si se utilizan plantillas como funciones de renderizado, el contenido se escapa automáticamente. Esto significa que en esta plantilla:

```vue-html
<h1>{{ userProvidedString }}</h1>
```

Si `userProvidedString` contiene:

```js
'<script>alert("hi")</script>'
```

entonces se escaparía al siguiente HTML:

```vue-html
&lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;
```

evitando así la inyección de script. Este escape se realiza mediante API nativas del navegador, como `textContent`, por lo que una vulnerabilidad solo puede existir si el navegador en sí es vulnerable.

### Vinculación de Atributos

Del mismo modo, los enlaces de atributos dinámicos también se escapan automáticamente. Eso significa que en esta plantilla:

```vue-html
<h1 :title="userProvidedString">
  Hola
</h1>
```

Si `userProvidedString` contiene:

```js
'" onclick="alert(\'Hola\')'
```

entonces se escaparía al siguiente HTML:

```vue-html
&quot; onclick=&quot;alert('Hola')
```

evitando así el cierre del atributo `title` para inyectar HTML nuevo y arbitrario. Este escape se realiza mediante las API nativas del navegador, como `setAttribute`, por lo que una vulnerabilidad solo puede existir si el navegador en sí es vulnerable.

## Peligros Potenciales {#peligros-potenciales}

En cualquier aplicación web, permitir que el contenido no desinfectado proporcionado por el usuario se ejecute como HTML, CSS o JavaScript es potencialmente peligroso, por lo que debe evitarse siempre que sea posible. Sin embargo, hay ocasiones en las que cierto riesgo puede ser aceptable.

Por ejemplo, los servicios como CodePen y JSFiddle permiten que se ejecute el contenido proporcionado por el usuario, pero está en un contexto en el que esto se espera y está aislado hasta cierto punto dentro de iframes. En los casos en que una característica importante requiere inherentemente algún nivel de vulnerabilidad, depende de tu equipo sopesar la importancia de la característica frente a los peores escenarios que permite la vulnerabilidad.

### Inyección de HTML {#inyeccion-de-html}

Como aprendiste antes, Vue escapa automáticamente el contenido HTML, evitando que accidentalmente inyectes HTML ejecutable en tu aplicación. Sin embargo, **en los casos en los que sepas que el HTML es seguro**, puedes renderizar explícitamente el contenido HTML:

- Usando una plantilla:

  ```vue-html
  <div v-html="userProvidedHtml"></div>
  ```

- Usando una función de renderizado:

  ```js
  h('div', {
    innerHTML: this.userProvidedHtml
  })
  ```

- Usando una función de renderizado con JSX:

  ```jsx
  <div innerHTML={this.userProvidedHtml}></div>
  ```

:::warning Advertencia:
El HTML proporcionado por el usuario nunca se puede considerar 100% seguro a menos que esté en un iframe aislado o en una parte de la aplicación donde solo el usuario que escribió ese HTML pueda estar expuesto a él. Además, permitir que los usuarios escriban sus propias plantillas de Vue conlleva peligros similares.
:::

### Inyección de URL {#inyeccion-de-url}

En una URL como esta:

```vue-html
<a :href="userProvidedUrl">
  Hazme clic
</a>
```

Existe un posible problema de seguridad si la URL no se ha "desinfectado" para evitar la ejecución de JavaScript usando `javascript:`. Hay librerías como [sanitize-url](https://www.npmjs.com/package/@braintree/sanitize-url) para ayudarte con esto, pero ten en cuenta: si alguna vez realizas la desinfección de la URL en el frontend, ya tienes un problema de seguridad. **Tu backend siempre debe desinfectar las URL proporcionadas por el usuario antes de ser guardadas en una base de datos.** Así se evita el problema para _todos_ los clientes que se conectan a tu API, incluidas las aplicaciones móviles nativas. También ten en cuenta que incluso con las URL desinfectadas, Vue no puede ayudarte a garantizar que conduzcan a destinos seguros.

### Inyección de Estilo

Mira este ejemplo:

```vue-html
<a
  :href="sanitizedUrl"
  :style="userProvidedStyles"
>
  Hazme clic
</a>
```

Supongamos que `sanitizedUrl` se ha desinfectado, por lo que definitivamente es una URL real y no JavaScript. Con `userProvidedStyles`, los usuarios maliciosos aún podrían proporcionar CSS para "hacer clic", por ejemplo, estilizando el enlace en una caja transparente sobre el botón "Iniciar sesión". Entonces, si `https://user-controlled-website.com/` está diseñada para parecerse a la página de inicio de sesión de tu aplicación, podrían haber capturado la información de inicio de sesión real de un usuario.

Es posible que puedas imaginar cómo permitir contenido proporcionado por el usuario para un elemento `<style>` crearía una vulnerabilidad aún mayor, dando a ese usuario control total sobre cómo aplicar estilo a toda la página. Es por eso que Vue evita la renderización de etiquetas de estilo dentro de las plantillas, tales como:

```vue-html
<style>{{ userProvidedStyles }}</style>
```

Para mantener a tus usuarios completamente a salvo del robo de clics, recomendamos permitir solo el control total sobre CSS dentro de un iframe aislado. Alternativamente, cuando se proporciona control de usuario a través de un enlace de estilo, recomendamos usar la [sintaxis de objeto](/guide/essentials/class-and-style.html#vinculacion-a-objetos-1) y solo permitir que los usuarios proporcionen valores para las propiedades específicas que puedan controlar con seguridad, como esta:

```vue-html
<a
  :href="sanitizedUrl"
  :style="{
    color: userProvidedColor,
    background: userProvidedBackground
  }"
>
  Hazme clic
</a>
```

### Inyección de JavaScript

Recomendamos encarecidamente que nunca se renderice un elemento `<script>` con Vue, ya que las plantillas y las funciones de renderizado nunca deberían tener efectos secundarios. Sin embargo, esta no es la única forma de incluir cadenas que se evaluarían como JavaScript en tiempo de ejecución.

Cada elemento HTML tiene atributos con valores que aceptan cadenas de JavaScript, como `onclick`, `onfocus`, y `onmouseenter`. Vincular JavaScript proporcionado por el usuario a cualquiera de estos atributos de evento es un riesgo potencial de seguridad, por lo que debe evitarse.

:::warning Advertencia:
El JavaScript proporcionado por el usuario nunca se puede considerar 100% seguro a menos que esté en un iframe aislado o en una parte de la aplicación donde solo el usuario que escribió ese JavaScript pueda estar expuesto a él.
:::

A veces recibimos informes de vulnerabilidad sobre cómo es posible realizar cross-site scripting (XSS) en las plantillas de Vue. En general, no consideramos que estos casos sean vulnerabilidades reales, porque no existe una forma práctica de proteger a los desarrolladores de los dos escenarios que permitirían XSS:

1. El desarrollador le pide explícitamente a Vue que renderice el contenido no desinfectado proporcionado por el usuario como plantillas de Vue. Esto es intrínsecamente inseguro y no hay forma de que Vue sepa el origen.

2. El desarrollador está montando Vue en una página HTML completa que contiene contenido renderizado por el servidor y proporcionado por el usuario. Este es fundamentalmente el mismo problema que el \#1, pero a veces los desarrolladores pueden hacerlo sin darse cuenta. Esto puede dar lugar a posibles vulnerabilidades en las que el atacante proporciona HTML que es seguro como HTML simple, pero inseguro como una plantilla de Vue. La mejor práctica es **nunca montar Vue en nodos que puedan contener contenido renderizado por el servidor y proporcionado por el usuario**.

## Mejores Prácticas

La regla general es que si permites que se ejecute contenido no desinfectado proporcionado por el usuario (ya sea como HTML, JavaScript o incluso CSS), podrías estar expuesto a ataques. Este consejo es válido ya sea que uses Vue, otro framework, o incluso ningún framework.

Más allá de las recomendaciones anteriores sobre [Peligros Potenciales](#peligros-potenciales), también recomendamos familiarizarse con estos recursos:

- [Hoja de trucos de seguridad HTML5](https://html5sec.org/)
- [Hoja de trucos para la prevención de Cross Site Scripting (XSS) de OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

Luego, usa lo que has aprendido para revisar también el código fuente de tus dependencias en busca de patrones potencialmente peligrosos, si alguno de ellos incluye componentes de terceros o influye de alguna manera en lo que se muestra en el DOM.

## Coordinación del Backend

Las vulnerabilidades de seguridad HTTP, como la falsificación de solicitudes entre sitios (CSRF/XSRF) y la inclusión de scripts entre sitios (XSSI), se abordan principalmente en el backend, por lo que no son una preocupación para Vue. Sin embargo, sigue siendo una buena idea comunicarte con tu equipo de backend para aprender cómo interactuar mejor con su API, por ejemplo, mediante el envío de tokens CSRF con los envíos de formularios.

## Renderizado del Lado del Servidor (SSR)

Existen algunos problemas de seguridad adicionales al usar SSR, así que asegúrate de seguir las mejores prácticas descritas en [nuestra documentación de SSR](/guide/scaling-up/ssr.html) para evitar vulnerabilidades.
