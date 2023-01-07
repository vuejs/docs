# Reglas de Prioridad D: Utilizar con Precaución

Algunas características de Vue existen para acomodar casos excepcionales o migraciones fluidas desde una base de código heredada. Sin embargo, cuando se usan en exceso, pueden hacer que tu código sea más difícil de mantener o incluso convertirse en una fuente de errores. Estas reglas arrojan luz sobre las características potencialmente arriesgadas, describiendo cuándo y por qué deben evitarse.

## Selectores de elementos con `ámbito`

**Deben evitarse los selectores de elementos con `ámbito`.**

Elige los selectores de clase en lugar de los selectores de elementos en estilos con `ámbito`, ya que un gran número de selectores de elementos son lentos.

::: details Explicación detallada
Para delimitar los estilos, Vue añade un atributo único a los elementos del componente, como `data-v-f3f3eg9`. Entonces los selectores se modifican para que sólo se seleccionen los elementos que coincidan con este atributo (por ejemplo, `button[data-v-f3f3eg9]`).

El problema es que un gran número de selectores de atributos de elementos (por ejemplo, `button[data-v-f3f3eg9]`) serán considerablemente más lentos que los selectores de atributos de clase (por ejemplo, `.btn-close[data-v-f3f3eg9]`), por lo que se deben preferir los selectores de clase siempre que sea posible.
:::

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```vue-html
<template>
  <button>×</button>
</template>

<style scoped>
button {
  background-color: red;
}
</style>
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```vue-html
<template>
  <button class="btn btn-close">×</button>
</template>

<style scoped>
.btn-close {
  background-color: red;
}
</style>
```

</div>

## Comunicación implícita padre-hijo

**Se debería preferir la utilización de props y eventos para la comunicación entre componentes padre-hijo, en lugar de `this.$parent` o la mutación de props.**

Una aplicación Vue ideal es de pocos props y muchos eventos. Seguir esta convención hace que tus componentes sean mucho más fáciles de entender. Sin embargo, hay casos extremos en los que la mutación de props o `this.$parent` puede simplificar dos componentes que ya están profundamente acoplados.

El problema es que también hay muchos casos _simples_ en los que estos patrones pueden ofrecer comodidad. Cuidado: no te dejes seducir cambiando la simplicidad (ser capaz de entender el flujo de tu estado) por la comodidad a corto plazo (escribir menos código).

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  template: '<input v-model="todo.text">'
})
```

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  methods: {
    removeTodo() {
      this.$parent.todos = this.$parent.todos.filter(
        (todo) => todo.id !== vm.todo.id
      )
    }
  },

  template: `
    <span>
      {{ todo.text }}
      <button @click="removeTodo">
        ×
      </button>
    </span>
  `
})
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  emits: ['input'],

  template: `
    <input
      :value="todo.text"
      @input="$emit('input', $event.target.value)"
    >
  `
})
```

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  emits: ['delete'],

  template: `
    <span>
      {{ todo.text }}
      <button @click="$emit('delete')">
        ×
      </button>
    </span>
  `
})
```

</div>
