# Accesibilidad

La accesibilidad web (también conocida como a11y) se refiere a la práctica de crear sitios web que pueden ser utilizados por cualquier persona, ya sea una persona con una discapacidad, una conexión lenta, un hardware obsoleto o roto, o simplemente alguien en un entorno desfavorable. Por ejemplo, añadir subtítulos a un video ayudaría tanto a los usuarios sordos y con problemas de audición como a los usuarios que se encuentran en un entorno ruidoso y no pueden escuchar su teléfono. Del mismo modo, asegurarse de que el texto no tiene un contraste demasiado bajo ayudará tanto a los usuarios con problemas de visión como a los usuarios que intentan usar su teléfono bajo la luz del sol.

¿Estás listo para empezar pero no sabes por dónde?

Consulta la [Guía de planificación y gestión de la accesibilidad web](https://www.w3.org/WAI/planning-and-managing/) proporcionada por la [World Wide Web Consortium (W3C)](https://www.w3.org/)

## Ignorar un Enlace

Debes agregar un enlace en la parte superior de cada página que vaya directamente al área de contenido principal para que los usuarios puedan saltarse el contenido que se repite en varias páginas web.

Por lo general, esto se hace en la parte superior de `App.vue`, ya que será el primer elemento enfocable en todas tus páginas:

```vue-html
<ul class="skip-links">
  <li>
    <a href="#main" ref="skipLink">Ir al contenido principal</a>
  </li>
</ul>
```

Para ocultar el enlace a menos que esté enfocado, puedes añadir el siguiente estilo:

```css
.skipLink {
  white-space: nowrap;
  margin: 1em auto;
  top: 0;
  position: fixed;
  left: 50%;
  margin-left: -72px;
  opacity: 0;
}
.skipLink:focus {
  opacity: 1;
  background-color: white;
  padding: 0.5em;
  border: 1px solid black;
}
```

Una vez que un usuario cambia de ruta, devuelve el foco al enlace de saltar el contenido. Esto se puede lograr llamando al foco en la referencia de la plantilla del enlace de salto (suponiendo que usas `vue-router`):

<div class="options-api">

```vue
<script>
export default {
  watch: {
    $route() {
      this.$refs.skipLink.focus()
    }
  }
}
</script>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const skipLink = ref()

watch(
  () => route.path,
  () => {
    skipLink.value.focus()
  }
)
</script>
```

</div>

[Lee la documentación en Saltar enlace al contenido principal](https://www.w3.org/WAI/WCAG21/Techniques/general/G1.html)

## Estructura del Contenido

Una de las piezas más importantes de la accesibilidad es asegurarte de que el diseño pueda soportar una aplicación accesible. El diseño debe considerar no solo el contraste de color, la selección de fuentes, el tamaño del texto y el idioma, sino también cómo se estructura el contenido en la aplicación.

### Títulos

Los usuarios pueden navegar por una aplicación a través de los títulos. Tener títulos descriptivos para cada sección de tu aplicación facilita a los usuarios predecir el contenido de cada sección. Cuando se trata de títulos, hay un par de prácticas de accesibilidad recomendadas:

- Añade los títulos en su orden de clasificación: `<h1>` - `<h6>`
- No omitas los títulos dentro de una sección
- Usa etiquetas de títulos reales en lugar de textos con estilos para dar la apariencia visual de los títulos

[Más información sobre los títulos](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html)

```vue-html
<main role="main" aria-labelledby="main-title">
  <h1 id="main-title">Título principal</h1>
  <section aria-labelledby="section-title">
    <h2 id="section-title"> Título de sección </h2>
    <h3>Subtítulo de sección</h3>
    <!-- Contenido -->
  </section>
  <section aria-labelledby="section-title">
    <h2 id="section-title"> Título de sección </h2>
    <h3>Subtítulo de sección</h3>
    <!-- Contenido -->
    <h3>Subtítulo de sección</h3>
    <!-- Contenido -->
  </section>
</main>
```

### Puntos de Referencia

Los [puntos de referencia](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role) proporcionan acceso programático a las secciones de una aplicación. Los usuarios que dependen de la tecnología de asistencia pueden navegar a cada sección de la aplicación y saltarse el contenido. Puedes usar los [roles ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) para ayudarte a conseguirlo.

| HTML            | Rol ARIA             | Objetivos del punto de referencia                                                                                                    |
| --------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| header          | role="banner"        | Encabezado principal: título de la página                                                                                            |
| nav             | role="navigation"    | Colección de enlaces para navegar por el documento o por los documentos relacionados                                                 |
| main            | role="main"          | El contenido principal o central del documento.                                                                                      |
| footer          | role="contentinfo"   | Información sobre el documento principal: notas a pie de página/derechos de autor/enlaces a la declaración de privacidad             |
| aside           | role="complementary" | Apoya el contenido principal, pero está separado y es significativo en su propio contenido                                           |
| _Not available_ | role="search"        | Esta sección contiene la funcionalidad de búsqueda de la aplicación                                                                  |
| form            | role="form"          | Colección de elementos asociados al formulario                                                                                       |
| section         | role="region"        | Contenido que es relevante y al que los usuarios probablemente querrán navegar. Se debe proporcionar una etiqueta para este elemento |

:::tip Tip:
Se recomienda utilizar elementos HTML de referencia con atributos de roles de referencia redundantes para maximizar la compatibilidad con [navegadores antiguos que no admiten elementos semánticos de HTML5](https://caniuse.com/#feat=html5semantic).
:::

[Más información sobre los puntos de referencia](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles)

## Formularios Semánticos

Al crear un formulario, puedes utilizar los siguientes elementos: `<form>`, `<label>`, `<input>`, `<textarea>`, y `<button>`

Las etiquetas generalmente se colocan en la parte superior o a la izquierda de los campos del formulario:

```vue-html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      :type="item.type"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
    />
  </div>
  <button type="submit">Enviar</button>
</form>
```

<!-- <common-codepen-snippet title="Simple Form" slug="dyNzzWZ" :height="368" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

Observa cómo puedes incluir `autocomplete='on'` en el elemento del formulario y se aplicará a todas las entradas de texto en tu formulario. También puedes establecer diferentes [valores para el atributo de autocompletar](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) por cada entrada de texto.

### Etiquetas

Proporciona etiquetas para describir el propósito de todos los controles del formulario; conecta `for` y `id`:

```vue-html
<label for="name">Nombre</label>
<input type="text" name="name" id="name" v-model="name" />
```

<!-- <common-codepen-snippet title="Form Label" slug="XWpaaaj" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

Si inspeccionas este elemento en tus herramientas de desarrollo de Chrome y abres la pestaña Accesibilidad dentro de la pestaña Elementos, verás cómo la entrada de texto obtiene su nombre de la etiqueta:

![Las herramientas de desarrollo de Chrome muestran el nombre accesible de la etiqueta](./images/AccessibleLabelChromeDevTools.png)

:::warning Advertencia:
Aunque es posible que hayas visto etiquetas que envuelven los campos de entrada de texto de esta manera:

```vue-html
<label>
  Nombre:
  <input type="text" name="name" id="name" v-model="name" />
</label>
```

Establecer explícitamente las etiquetas con un identificador coincidente es más compatible con la tecnología de asistencia.
:::

#### `aria-label`

También puedes dar a la entrada un nombre accesible con [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label).

```vue-html
<label for="name">Nombre</label>
<input
  type="text"
  name="name"
  id="name"
  v-model="name"
  :aria-label="nameLabel"
/>
```

<!-- <common-codepen-snippet title="Form ARIA label" slug="NWdvvYQ" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

No dudes en inspeccionar este elemento en Chrome DevTools para ver cómo ha cambiado el nombre accesible:

![Las herramientas de desarrollo de Chrome muestran el nombre accesible de aria-label](./images/AccessibleARIAlabelDevTools.png)

#### `aria-labelledby`

Usar [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) es similar a `aria-label`, excepto que se usa si el texto de la etiqueta está visible en la pantalla. Se empareja con otros elementos por su `id` y se pueden enlazar múltiples `id`s:

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">Facturación</h1>
  <div class="form-item">
    <label for="name">Nombre:</label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
    />
  </div>
  <button type="submit">Enviar</button>
</form>
```

<!-- <common-codepen-snippet title="Form ARIA labelledby" slug="MWJvvBe" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

![Las herramientas de desarrollo de Chrome muestran el nombre accesible de aria-labelledby](./images/AccessibleARIAlabelledbyDevTools.png)

#### `aria-describedby`

[aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) se usa de la misma manera que `aria-labelledby`, excepto que proporciona una descripción con información adicional que el usuario podría necesitar. Puede utilizarse para describir los criterios de cualquier entrada:

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">Facturación</h1>
  <div class="form-item">
    <label for="name">Nombre completo:</label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
      aria-describedby="nameDescription"
    />
    <p id="nameDescription">Por favor, ingrese el nombre y apellido.</p>
  </div>
  <button type="submit">Enviar</button>
</form>
```

<!-- <common-codepen-snippet title="Form ARIA describedby" slug="gOgxxQE" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

Puedes ver la descripción inspeccionando en Chrome DevTools:

![Las herramientas de desarrollo de Chrome muestran el nombre accesible de aria-labelledby y la descripción con aria-describedby](./images/AccessibleARIAdescribedby.png)

### Marcador de Posición (Placeholder)

Evita utilizar placeholders, ya que pueden confundir a muchos usuarios.

Uno de los problemas con los placeholders es que no cumplen los [criterios de contraste de color](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) de forma predeterminada; fijar el contraste de color hace que el placeholder se vea como datos rellenados previamente en los campos de entrada. Al observar el siguiente ejemplo, puedes ver que el placeholder Apellido, que cumple con los criterios de contraste de color, se ve como un dato rellenado previamente:

![Placeholder accesible](./images/AccessiblePlaceholder.png)

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      type="text"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
      :placeholder="item.placeholder"
    />
  </div>
  <button type="submit">Enviar</button>
</form>
```

```css
/* https://www.w3schools.com/howto/howto_css_placeholder.asp */

#lastName::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  opacity: 1; /* Firefox */
}

#lastName:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: black;
}

#lastName::-ms-input-placeholder {
  /* Microsoft Edge */
  color: black;
}
```

Lo mejor es proporcionar toda la información que el usuario necesita para completar los formularios fuera de cualquier entrada.

### Instrucciones

Al agregar instrucciones para tus campos de entrada, asegúrate de vincularlos correctamente a la entrada. Puedes proporcionar instrucciones adicionales y vincular múltiples ids dentro de un [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby). Esto permite un diseño más flexible.

```vue-html
<fieldset>
  <legend>Usando aria-labelledby</legend>
  <label id="date-label" for="date">Fecha actual:</label>
  <input
    type="date"
    name="date"
    id="date"
    aria-labelledby="date-label date-instructions"
  />
  <p id="date-instructions">MM/DD/YYYY</p>
</fieldset>
```

También puedes adjuntar las instrucciones a la entrada con [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby):

```vue-html
<fieldset>
  <legend>Usando aria-describedby</legend>
  <label id="dob" for="dob">Fecha de nacimiento:</label>
  <input type="date" name="dob" id="dob" aria-describedby="dob-instructions" />
  <p id="dob-instructions">MM/DD/YYYY</p>
</fieldset>
```

<!-- <common-codepen-snippet title="Form Instructions" slug="WNREEqv" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

### Ocultar Contenidos

Por lo general, no se recomienda ocultar visualmente las etiquetas, incluso si la entrada tiene un nombre accesible. Sin embargo, si la funcionalidad de la entrada se puede entender con el contenido adyacente, entonces podemos ocultar la etiqueta visual.

Veamos este campo de búsqueda:

```vue-html
<form role="search">
  <label for="search" class="hidden-visually">Buscar: </label>
  <input type="text" name="search" id="search" v-model="search" />
  <button type="submit">Buscar</button>
</form>
```

Podemos hacer esto porque el botón de búsqueda ayudará visualmente a los usuarios a identificar el propósito del campo de entrada.

Podemos usar CSS para ocultar visualmente los elementos, pero mantenerlos disponibles para la tecnología de asistencia:

```css
.hidden-visually {
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  height: 1px;
  width: 1px;
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
}
```

<!-- <common-codepen-snippet title="Form Search" slug="QWdMqWy" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

#### `aria-hidden="true"`

Agregar `aria-hidden="true"` ocultará el elemento de la tecnología de asistencia pero lo dejará visualmente disponible para otros usuarios. No lo utilices en elementos enfocables, sólo en contenidos decorativos, duplicados o fuera de pantalla.

```vue-html
<p>Esto no se oculta a los lectores de pantalla.</p>
<p aria-hidden="true">Esto está oculto para los lectores de pantalla.</p>
```

### Botones

Cuando se utilizan botones dentro de un formulario, se debe establecer el tipo para evitar el envío del formulario. También puedes utilizar una entrada para crear botones:

```vue-html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <!-- Botones -->
  <button type="button">Cancelar</button>
  <button type="submit">Enviar</button>

  <!-- Entradas de tipo botón -->
  <input type="button" value="Cancelar" />
  <input type="submit" value="Enviar" />
</form>
```

<!-- <common-codepen-snippet title="Form Buttons" slug="JjEyrYZ" :height="467" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

### Imágenes Funcionales

- Campos de entrada

  - Estas imágenes actuarán como un botón de tipo submit en los formularios

  ```vue-html
  <form role="search">
    <label for="search" class="hidden-visually">Buscar: </label>
    <input type="text" name="search" id="search" v-model="search" />
    <input
      type="image"
      class="btnImg"
      src="https://img.icons8.com/search"
      alt="Buscar"
    />
  </form>
  ```

- Iconos

```vue-html
<form role="search">
  <label for="searchIcon" class="hidden-visually">Buscar: </label>
  <input type="text" name="searchIcon" id="searchIcon" v-model="searchIcon" />
  <button type="submit">
    <i class="fas fa-search" aria-hidden="true"></i>
    <span class="hidden-visually">Buscar</span>
  </button>
</form>
```

<!-- <common-codepen-snippet title="Functional Images" slug="jOyLGqM" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

## Estándares

La Iniciativa de Accesibilidad a la Web (WAI) del World Wide Web Consortium (W3C) desarrolla estándares de accesibilidad a la web para los diferentes componentes:

- [Pautas de Accesibilidad para el agente de usuario (UAAG)](https://www.w3.org/WAI/standards-guidelines/uaag/)
  - navegadores web y reproductores multimedia, incluidos algunos aspectos de las tecnologías de asistencia
- [Pautas de Accesibilidad de las herramientas de autor (ATAG)](https://www.w3.org/WAI/standards-guidelines/atag/)
  - herramientas de autoría
- [Pautas de Accesibilidad al Contenido en la Web (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
  - contenido web: utilizado por desarrolladores, herramientas de autoría y herramientas de evaluación de la accesibilidad

### Pautas de Accesibilidad al Contenido en la Web (WCAG)

[WCAG 2.1](https://www.w3.org/TR/WCAG21/) se extiende sobre [WCAG 2.0](https://www.w3.org/TR/WCAG20/) y permite la implementación de nuevas tecnologías al abordar los cambios en la web. El W3C fomenta el uso de la versión más reciente de las WCAG al desarrollar o actualizar las políticas de accesibilidad web.

#### WCAG 2.1 Cuatro Principios Rectores Principales (abreviados como POUR):

- [Perceptible](https://www.w3.org/TR/WCAG21/#perceivable)
  - Los usuarios deben ser capaces de percibir la información que se presenta
- [Operable](https://www.w3.org/TR/WCAG21/#operable)
  - Los formularios, los controles y la navegación de la interfaz son operables
- [Comprensible](https://www.w3.org/TR/WCAG21/#understandable)
  - La información y el funcionamiento de la interfaz de usuario deben ser comprensibles para todos los usuarios.
- [Robusto](https://www.w3.org/TR/WCAG21/#robust)
  - Los usuarios deben poder acceder al contenido a medida que avanzan las tecnologías.

#### Iniciativa de Accesibilidad a la Web - Aplicaciones de Internet Enriquecidas Accesibles (WAI-ARIA)

WAI-ARIA del W3C brinda orientación sobre cómo crear contenido dinámico y controles avanzados de interfaz de usuario.

- [Aplicaciones ricas de Internet accesibles (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [Prácticas de autoría WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

## Recursos

### Documentación

- [WCAG 2.0](https://www.w3.org/TR/WCAG20/)
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [Aplicaciones ricas de Internet accesibles (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [Prácticas de autoría WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

### Tecnologías de Apoyo

- Lectores de pantalla
  - [NVDA](https://www.nvaccess.org/download/)
  - [VoiceOver](https://www.apple.com/accessibility/mac/vision/)
  - [JAWS](https://www.freedomscientific.com/products/software/jaws/?utm_term=jaws%20screen%20reader&utm_source=adwords&utm_campaign=All+Products&utm_medium=ppc&hsa_tgt=kwd-394361346638&hsa_cam=200218713&hsa_ad=296201131673&hsa_kw=jaws%20screen%20reader&hsa_grp=52663682111&hsa_net=adwords&hsa_mt=e&hsa_src=g&hsa_acc=1684996396&hsa_ver=3&gclid=Cj0KCQjwnv71BRCOARIsAIkxW9HXKQ6kKNQD0q8a_1TXSJXnIuUyb65KJeTWmtS6BH96-5he9dsNq6oaAh6UEALw_wcB)
  - [ChromeVox](https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en)
- Herramientas de zoom
  - [MAGic](https://www.freedomscientific.com/products/software/magic/)
  - [ZoomText](https://www.zoomtext.com/)
  - [Magnifier](https://support.microsoft.com/en-us/help/11542/windows-use-magnifier-to-make-things-easier-to-see)

### Testing

- Herramientas automatizadas
  - [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
  - [WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
- Herramientas de color
  - [WebAim Color Contrast](https://webaim.org/resources/contrastchecker/)
  - [WebAim Link Color Contrast](https://webaim.org/resources/linkcontrastchecker)
- Otras herramientas útiles
  - [HeadingMap](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi?hl=en…)
  - [Color Oracle](https://colororacle.org)
  - [Focus Indicator](https://chrome.google.com/webstore/detail/focus-indicator/heeoeadndnhebmfebjccbhmccmaoedlf?hl=en-US…)
  - [NerdeFocus](https://chrome.google.com/webstore/detail/nerdefocus/lpfiljldhgjecfepfljnbjnbjfhennpd?hl=en-US…)

### Usuarios

La Organización Mundial de la Salud estima que el 15% de la población mundial tiene algún tipo de discapacidad, entre el 2 y el 4% de ellas graves. Eso es un estimado de 1.000 millones de personas en todo el mundo, lo que convierte a las personas con discapacidad en el grupo minoritario más grande del mundo.

Hay una gran variedad de discapacidades, que se pueden dividir a grandes rasgos en cuatro categorías:

- _[Visual](https://webaim.org/articles/visual/)_ - Estos usuarios pueden beneficiarse del uso de lectores de pantalla, ampliación de pantalla, control de contraste de pantalla o la visualización en braille.
- _[Auditiva](https://webaim.org/articles/auditory/)_ - Estos usuarios pueden beneficiarse de subtítulos, transcripciones o videos en lenguaje de señas.
- _[Motriz](https://webaim.org/articles/motor/)_ - Estos usuarios pueden beneficiarse de una variedad de tecnologías de [asistencia para las discapacidades motrices](https://webaim.org/articles/motor/assistive): software de reconocimiento de voz, seguimiento ocular, acceso con un solo interruptor, varilla para la cabeza, interruptor para sorber y soplar, ratón con bola de seguimiento de gran tamaño, teclado adaptable u otras tecnologías de asistencia.
- _[Cognitiva](https://webaim.org/articles/cognitive/)_ - Estos usuarios pueden beneficiarse de los medios complementarios, la organización estructural del contenido y la escritura clara y sencilla.

Consulta los siguientes enlaces de WebAim para entender a los usuarios:

- [Perspectivas de Accesibilidad Web: Explore el impacto y los beneficios para todos](https://www.w3.org/WAI/perspective-videos/)
- [Historias de usuarios en la web](https://www.w3.org/WAI/people-use-web/user-stories/)
