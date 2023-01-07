# Vinculación de Formularios

Usando `v-bind` y `v-on` juntos, podemos crear enlaces bidireccionales en los elementos de entrada del formulario:

```vue-html
<input :value="text" @input="onInput">
```

<div class="options-api">

```js
methods: {
  onInput(e) {
    // un manejador v-on recibe el evento nativo
    // del DOM como argumento.
    this.text = e.target.value
  }
}
```

</div>

<div class="composition-api">

```js
function onInput(e) {
  // un manejador v-on recibe el evento nativo
  // del DOM como argumento.
  text.value = e.target.value
}
```

</div>

Prueba a escribir en la caja de entrada; deberías ver el texto en `<p>` actualizándose a medida que escribes.

Para simplificar los enlaces bidireccionales, Vue proporciona una directiva, `v-model`, que es esencialmente un azúcar sintáctico para lo anterior:

```vue-html
<input v-model="text">
```

`v-model` sincroniza automáticamente el valor de `<input>` con el estado vinculado, por lo que ya no es necesario utilizar un controlador de eventos para ello.

`v-model` no sólo funciona con entradas de texto, sino también con otros tipos de entradas como checkboxes, radio buttons y select desplegables. Veremos más detalles en la <a target="_blank" href="/guide/essentials/forms.html">Guía - Vinculación de Entradas de Formularios</a>.

A continuación, trata de refactorizar el código para utilizar `v-model` en su lugar.
