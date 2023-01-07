# Opciones: Composición

## provide

Proporcionar valores que puedan ser inyectados por los componentes descendientes.

- **Tipo**

  ```ts
  interface ComponentOptions {
    provide?: object | ((this: ComponentPublicInstance) => object)
  }
  ```

- **Detalles:**

  `provide` y [`inject`](#inject) se utilizan conjuntamente para permitir que un componente ancestral sirva como inyector de dependencias para todos sus descendientes, independientemente de la profundidad de la jerarquía de componentes, siempre que estén en la misma cadena padre.

  La opción `provide` debe ser un objeto o una función que devuelva un objeto. Este objeto contiene las propiedades que están disponibles para ser inyectadas en sus descendientes. Puedes utilizar símbolos como claves en este objeto.


- **Ejemplo**

  Uso básico:

  ```js
  const s = Symbol()

  export default {
    provide: {
      foo: 'foo',
      [s]: 'bar'
    }
  }
  ```

  Utilizar una función para proporcionar el estado por componente:

  ```js
  export default {
    data() {
      return {
        msg: 'foo'
      }
    }
    provide() {
      return {
        msg: this.msg
      }
    }
  }
  ```

  Tenga en cuenta que en el ejemplo anterior, el `msg` proporcionado NO será reactivo. Consulte [Trabajando con Reactividad](/guide/components/provide-inject.html#working-with-reactivity) para más detalles.

- **Ver también:** [Provide / Inject](/guide/components/provide-inject.html)

## inject

Declara propiedades para inyectar en el componente actual localizándolas desde los proveedores ancestrales.

- **Tipo**

  ```ts
  interface ComponentOptions {
    inject?: ArrayInjectOptions | ObjectInjectOptions
  }

  Tipo ArrayInjectOptions = string[]

  Tipo ObjectInjectOptions = {
    [key: string | symbol]:
      | string
      | symbol
      | { from?: string | symbol; default?: any }
  }
  ```

- **Details**

  La opción `inject` debe ser:

  - Una matriz de cadenas, o
  - Un objeto en el que las claves son el nombre del enlace local y el valor es:
    - La clave (cadena o símbolo) a buscar en las inyecciones disponibles, o
    - Un objeto donde:
      - La propiedad `from` es la clave (cadena o símbolo) a buscar en las inyecciones disponibles, y
      - La propiedad `default` se utiliza como valor de reserva. De forma similar a los valores por defecto de los props, se necesita una función de fábrica para los tipos de objetos para evitar que se compartan los valores entre múltiples instancias de componentes.

  Una propiedad inyectada será `undefined` si no se ha proporcionado ni una propiedad coincidente ni un valor por defecto.

  Tenga en cuenta que los enlaces inyectados NO son reactivos. Esto es intencionado. Sin embargo, si el valor inyectado es un objeto reactivo, las propiedades de ese objeto siguen siendo reactivas. Para más detalles, consulte [Trabajando con Reactividad](/guide/components/provide-inject.html#working-with-reactivity).

- **Ejemplo**

  Uso básico:

  ```js
  export default {
    inject: ['foo'],
    created() {
      console.log(this.foo)
    }
  }
  ```

  Usando un valor inyectado como valor por defecto para una proposición:

  ```js
  const Child = {
    inject: ['foo'],
    props: {
      bar: {
        default() {
          return this.foo
        }
      }
    }
  }
  ```

  Usando un valor inyectado como entrada de datos:

  ```js
  const Child = {
    inject: ['foo'],
    data() {
      return {
        bar: this.foo
      }
    }
  }
  ```

  Las inyecciones pueden ser opcionales con valor por defecto:

  ```js
  const Child = {
    inject: {
      foo: { default: 'foo' }
    }
  }
  ```

  Si debe inyectarse desde una propiedad con un nombre diferente, utilice `from` para indicar la propiedad de origen:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: 'foo'
      }
    }
  }
  ```

  Similar a las propiedades (props) predeterminadas, es necesario utilizar una función de fábrica para los valores no primitivos:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: () => [1, 2, 3]
      }
    }
  }
  ```

- **Ver también:** [Provide / Inject](/guide/components/provide-inject.html)

## mixins

Una matriz de objetos de opción que se mezclan en el componente actual.

- **Tipo**

  ```ts
  interface ComponentOptions {
    mixins?: ComponentOptions[]
  }
  ```

- **Detalles:**

  La opción `mixins` acepta un array de objetos mixin. Estos objetos mixin pueden contener opciones de instancia como los objetos de instancia normales, y se fusionarán con las opciones eventuales utilizando la lógica de fusión de opciones determinada. Por ejemplo, si tu mixin contiene un método llamado `created` y el propio componente también tiene uno, ambas funciones serán llamadas.

  Los hooks del mixin se llaman en el orden en que se proporcionan, y se llaman antes que los hooks propios del componente.

  :::warning Ya no se recomienda
  En Vue 2, los mixins eran el mecanismo principal para crear trozos reutilizables de la lógica del componente. Aunque los mixins siguen siendo compatibles con Vue 3, la [API de composición] (/guide/reusability/composables.html) es ahora el método preferido para la reutilización de código entre componentes.
  :::

- **Ejemplo:**

  ```js
  const mixin = {
    created() {
      console.log(1)
    }
  }

  createApp({
    created() {
      console.log(2)
    },
    mixins: [mixin]
  })

  // => 1
  // => 2
  ```

## extends

Un componente de "clase base" para extender.

- **Tipo:**

  ```ts
  interface ComponentOptions {
    extends?: ComponentOptions
  }
  ```

- **Detalles:**

  Permite que un componente extienda a otro, heredando sus opciones de componentes.

  Desde el punto de vista de la implementación, `extends` es casi idéntico a `mixins`. El componente especificado por `extends` será tratado como si fuera el primer mixin.

  Sin embargo, `extends` y `mixins` expresan intenciones diferentes. La opción `mixins` se utiliza principalmente para componer trozos de funcionalidad, mientras que `extends` se ocupa principalmente de la herencia.

  Al igual que con `mixins`, cualquier opción se fusionará utilizando la estrategia de fusión correspondiente.

- **Ejemplo:**

  ```js
  const CompA = { ... }

  const CompB = {
    extends: CompA,
    ...
  }
  ```
