# API Render Function {#render-function-apis}

## h() {#h}

Crea nodi del DOM virtuale (vnodes).

- **Tipo**

  ```ts
  // firma completa
  function h(
    type: string | Component,
    props?: object | null,
    children?: Children | Slot | Slots
  ): VNode

  // omissione delle props
  function h(type: string | Component, children?: Children | Slot): VNode

  type Children = string | number | boolean | VNode | null | Children[]

  type Slot = () => Children

  type Slots = { [name: string]: Slot }
  ```

  > I types sono semplificati per una migliore leggibilità.

- **Dettagli**

  Il primo argomento può essere una stringa (per elementi nativi) o una definizione di componente Vue. Il secondo argomento sono le props da passare, e il terzo argomento sono i figli.

  Quando si crea un vnode di componente, i figli devono essere passati come funzioni slot. Può essere passata una singola funzione slot se il componente si aspetta solo lo slot predefinito. In caso contrario, gli slot devono essere passati come un oggetto di funzioni slot.

  Per comodità, l'argomento delle props può essere omesso quando il figlio non è un oggetto di slot.

- **Esempio**

  Creare elementi nativi:

  ```js
  import { h } from 'vue'

  // tutti gli argomenti tranne il type sono opzionali
  h('div')
  h('div', { id: 'foo' })

  // sia attributi che proprietà possono essere utilizzati nelle props
  // Vue sceglie automaticamente il modo giusto per assegnarlo
  h('div', { class: 'bar', innerHTML: 'hello' })

  // 'class' e 'style' supportano valori di tipo oggetto/array
  // come nei template
  h('div', { class: [foo, { bar }], style: { color: 'red' } })

  // i listener degli eventi dovrebbero essere passati come onXxx
  h('div', { onClick: () => {} })

  // i figli possono essere una stringa
  h('div', { id: 'foo' }, 'hello')

  // le props possono essere omesse quando non ce ne sono
  h('div', 'hello')
  h('div', [h('span', 'hello')])

  // l'array dei figli può contenere vnodes e stringhe miste
  h('div', ['hello', h('span', 'hello')])
  ```

  Creazione di componenti:

  ```js
  import Foo from './Foo.vue'

  // passaggio di props
  h(Foo, {
    // equivalente a some-prop="ciao"
    someProp: 'ciao',
    // equivalente a @update="() => {}"
    onUpdate: () => {}
  })

  // passaggio di un singolo slot predefinito
  h(Foo, () => 'default slot')

  // passaggio di slot con nome
  // notare che `null` è richiesto per evitare
  // che l'oggetto slots sia trattato come props
  h(MyComponent, null, {
    default: () => 'default slot',
    foo: () => h('div', 'foo'),
    bar: () => [h('span', 'one'), h('span', 'two')]
  })
  ```

- **Guarda anche** [Guide - Render Functions - Creating VNodes](/guide/extras/render-function#creating-vnodes)

## mergeProps() {#mergeprops}

`mergeProps()` unisce più oggetti props con una gestione speciale per alcune di esse.

- **Tipo**

  ```ts
  function mergeProps(...args: object[]): object
  ```

- **Dettagli**

  `mergeProps()` supporta la fusione di più oggetti props con una gestione speciale per le seguenti props:

  - `class`
  - `style`
  - listener degli eventi `onXxx` - i listener multipli con lo stesso nome saranno uniti in un array.

  Se non hai bisogno della logica dei merge e desideri delle semplici sovrascritture, puoi usare in alternativa lo spread operator (nativo degli oggetti).

- **Esempio**

  ```js
  import { mergeProps } from 'vue'

  const one = {
    class: 'foo',
    onClick: handlerA
  }

  const two = {
    class: { bar: true },
    onClick: handlerB
  }

  const merged = mergeProps(one, two)
  /**
   {
     class: 'foo bar',
     onClick: [handlerA, handlerB]
   }
   */
  ```

## cloneVNode() {#clonevnode}

Clona un vnode.

- **Tipo**

  ```ts
  function cloneVNode(vnode: VNode, extraProps?: object): VNode
  ```

- **Dettagli**

  Restituisce un vnode clonato, con extraProps opzionali da unire all'originale.

  I vnode dovrebbero essere considerati immutabili una volta creati, e non dovresti modificare le proprietà di un vnode esistente. Al contrario, clonalo con proprietà diverse o aggiuntive.

  I vnode hanno proprietà interne speciali, quindi clonarli non è semplice come utilizzare lo spread operator. `cloneVNode()` gestisce gran parte della logica interna.

- **Esempio**

  ```js
  import { h, cloneVNode } from 'vue'

  const original = h('div')
  const cloned = cloneVNode(original, { id: 'foo' })
  ```

## isVNode() {#isvnode}

Verifica se un valore è un vnode.

- **Tipo**

  ```ts
  function isVNode(value: unknown): boolean
  ```

## resolveComponent() {#resolvecomponent}

Per risolvere manualmente un componente registrato tramite il nome.

- **Tipo**

  ```ts
  function resolveComponent(name: string): Component | string
  ```

- **Dettagli**

  **Nota: non hai bisogno di questo se puoi importare direttamente il componente.**

  `resolveComponent()` deve essere chiamato all'interno<span class="composition-api"> di `setup()` o</span> della funzione di renderizzazione per risolvere il contesto corretto del componente.

  Se il componente non viene trovato, verrà emesso un avviso durante l'esecuzione e verrà restituita la stringa del nome.

- **Esempio**

  <div class="composition-api">

  ```js
  const { h, resolveComponent } = Vue

  export default {
    setup() {
      const ButtonCounter = resolveComponent('ButtonCounter')

      return () => {
        return h(ButtonCounter)
      }
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  const { h, resolveComponent } = Vue

  export default {
    render() {
      const ButtonCounter = resolveComponent('ButtonCounter')
      return h(ButtonCounter)
    }
  }
  ```

  </div>

- **Guarda anche** [Guide - Render Functions - Components](/guide/extras/render-function#components)

## resolveDirective() {#resolvedirective}

Per risolvere manualmente una direttiva registrata per nome.

- **Tipo**

  ```ts
  function resolveDirective(name: string): Directive | undefined
  ```

- **Dettagli**

  **Note: you do not need this if you can import the component directly.**

  `resolveDirective()` deve essere chiamato all'interno<span class="composition-api"> di `setup()` o</span> della funzione di render per risolvere dal contesto corretto del componente.

  Se la direttiva non viene trovata, verrà emesso un avviso runtime e la funzione restituirà `undefined`.

- **Guarda anche** [Guide - Render Functions - Custom Directives](/guide/extras/render-function#custom-directives)

## withDirectives() {#withdirectives}

Per aggiungere direttive personalizzate alle vnodes.

- **Tipo**

  ```ts
  function withDirectives(
    vnode: VNode,
    directives: DirectiveArguments
  ): VNode

  // [Directive, value, argument, modifiers]
  type DirectiveArguments = Array<
    | [Directive]
    | [Directive, any]
    | [Directive, any, string]
    | [Directive, any, string, DirectiveModifiers]
  >
  ```

- **Dettagli**

  Incorpora un vnode esistente con direttive personalizzate. Il secondo argomento è un array di direttive personalizzate. Ogni direttiva personalizzata è rappresentata anche come un array nella forma `[Directive, value, argument, modifiers]`. Gli elementi finali dell'array possono essere omessi se non necessari.

- **Esempio**

  ```js
  import { h, withDirectives } from 'vue'

  // direttiva custom
  const pin = {
    mounted() {
      /* ... */
    },
    updated() {
      /* ... */
    }
  }

  // <div v-pin:top.animate="200"></div>
  const vnode = withDirectives(h('div'), [
    [pin, 200, 'top', { animate: true }]
  ])
  ```

- **Guarda anche** [Guide - Render Functions - Custom Directives](/guide/extras/render-function#custom-directives)

## withModifiers() {#withmodifiers}

Per aggiungere i modificatori [`v-on`](/guide/essentials/event-handling#event-modifiers) nativi a una funzione gestore degli eventi.

- **Tipo**

  ```ts
  function withModifiers(fn: Function, modifiers: string[]): Function
  ```

- **Esempio**

  ```js
  import { h, withModifiers } from 'vue'

  const vnode = h('button', {
    // equivalente di v-on:click.stop.prevent
    onClick: withModifiers(() => {
      // ...
    }, ['stop', 'prevent'])
  })
  ```

- **Guarda anche** [Guida - Render Functions - Event Modifiers](/guide/extras/render-function#event-modifiers)
