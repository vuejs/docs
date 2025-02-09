# Render Function APIs {#render-function-apis}

## h() {#h}

Tworzy wirtualne węzły DOM (vnodes).

- **Typ**

  ```ts
  // pełne oznaczenie
  function h(
    type: string | Component,
    props?: object | null,
    children?: Children | Slot | Slots
  ): VNode

  // Pomijanie propsów
  function h(type: string | Component, children?: Children | Slot): VNode

  type Children = string | number | boolean | VNode | null | Children[]

  type Slot = () => Children

  type Slots = { [name: string]: Slot }
  ```

  > Typy zostały uproszczone w celu zwiększenia czytelności.

- **Szczegóły**

  Pierwszy argument może być ciągiem znaków (dla elementów natywnych) lub definicją komponentu Vue. Drugi argument to właściwości, które mają zostać przekazane, a trzeci argument to elementy podrzędne.

  Podczas tworzenia vnode komponentu elementy podrzędne muszą zostać przekazane jako funkcje slotów. Pojedyncza funkcja slotu może zostać przekazana, jeśli komponent oczekuje tylko domyślnego slotu. W przeciwnym razie sloty muszą zostać przekazane jako obiekt funkcji slotów.

  Dla wygody argument props można pominąć, jeśli elementy podrzędne nie są obiektami slotów.

- **Przykład**

  Tworzenie elementów natywnych:

  ```js
  import { h } from 'vue'

  // wszystkie argumenty poza typem są opcjonalne
  h('div')
  h('div', { id: 'foo' })

  // atrybuty i właściwości mogą być używane w rekwizytach
  // Vue automatycznie wybiera właściwy sposób ich przypisania
  h('div', { class: 'bar', innerHTML: 'hello' })

  // klasa i styl mają ten sam obiekt / tablicę
  // obsługa wartości jak w szablonach
  h('div', { class: [foo, { bar }], style: { color: 'red' } })

  // nasłuchiwacze zdarzeń powinni być przekazywani jako onXxx
  h('div', { onClick: () => {} })

  // dzieci mogą być ciągiem znaków
  h('div', { id: 'foo' }, 'hello')

  // właściwości można pominąć, gdy nie ma żadnych właściwości
  h('div', 'hello')
  h('div', [h('span', 'hello')])

  // tablica dzieci może zawierać mieszane węzły wirtualne i ciągi znaków
  h('div', ['hello', h('span', 'hello')])
  ```

  Tworzenie komponentów:

  ```js
  import Foo from './Foo.vue'

  // przekazywanie propsów
  h(Foo, {
    // odpowiednik some-prop="hello"
    someProp: 'hello',
    // odpowiednik @update="() => {}"
    onUpdate: () => {}
  })

  // przekazywanie pojedynczego domyślnego slotu
  h(Foo, () => 'default slot')

  // przekazywanie nazwanych slotów
  // zauważ, że `null` jest wymagane, aby uniknąć
  // traktowania obiektu slotów jako rekwizytów
  h(MyComponent, null, {
    default: () => 'default slot',
    foo: () => h('div', 'foo'),
    bar: () => [h('span', 'one'), h('span', 'two')]
  })
  ```

- **Zobacz także** [Przewodnik - Funkcje renderujące - Tworzenie węzłów wirtualnych](/guide/extras/render-function#creating-vnodes)

## mergeProps() {#mergeprops}

Scalanie wielu obiektów rekwizytów ze specjalnym traktowaniem niektórych rekwizytów.

- **Typ**

  ```ts
  function mergeProps(...args: object[]): object
  ```

- **Szczegóły**

  `mergeProps()` obsługuje scalanie wielu obiektów props ze specjalnym traktowaniem następujących props:

  - `class`
  - `style`
  - `onXxx` event listeners - wiele obiektów listener o tej samej nazwie zostanie scalonych w tablicę.

  Jeśli nie potrzebujesz zachowania scalania i chcesz prostych nadpisów, możesz użyć natywnego rozprzestrzeniania obiektów.

- **Przykład**

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

Klonuje vnode.

- **Typ**

  ```ts
  function cloneVNode(vnode: VNode, extraProps?: object): VNode
  ```

- **Szczegóły**

  Zwraca sklonowany vnode, opcjonalnie z dodatkowymi właściwościami do scalenia z oryginałem.

  Vnode powinny być uważane za niezmienne po utworzeniu i nie należy mutować właściwości istniejącego vnode. Zamiast tego należy go sklonować z innymi / dodatkowymi właściwościami.

  Vnode mają specjalne właściwości wewnętrzne, więc ich klonowanie nie jest tak proste jak rozprzestrzenianie obiektu. `cloneVNode()` obsługuje większość wewnętrznej logiki.

- **Przykład**

  ```js
  import { h, cloneVNode } from 'vue'

  const original = h('div')
  const cloned = cloneVNode(original, { id: 'foo' })
  ```

## isVNode() {#isvnode}

Sprawdza czy wartość jest vnode.

- **Typ**

  ```ts
  function isVNode(value: unknown): boolean
  ```

## resolveComponent() {#resolvecomponent}

Do ręcznego rozwiązywania zarejestrowanego komponentu według nazwy.

- **Typ**

  ```ts
  function resolveComponent(name: string): Component | string
  ```

- **Szczegóły**

  **Uwaga: nie jest to potrzebne, jeśli możesz zaimportować komponent bezpośrednio.**

  `resolveComponent()` musi zostać wywołane wewnątrz<span class="composition-api"> albo `setup()` albo</span> funkcji renderowania, aby rozwiązać z prawidłowego kontekstu komponentu.

  Jeśli komponent nie zostanie znaleziony, zostanie wyemitowane ostrzeżenie w czasie wykonywania, a ciąg nazw zostanie zwrócony.

- **Przykład**

  <div class="composition-api">

  ```js
  import { h, resolveComponent } from 'vue'

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
  import { h, resolveComponent } from 'vue'

  export default {
    render() {
      const ButtonCounter = resolveComponent('ButtonCounter')
      return h(ButtonCounter)
    }
  }
  ```

  </div>

- **Zobacz także** [Przewodnik - Funkcje renderowania - Komponenty](/guide/extras/render-function#components)

## resolveDirective() {#resolvedirective}

Do ręcznego rozwiązywania zarejestrowanej dyrektywy według nazwy.

- **Typ**

  ```ts
  function resolveDirective(name: string): Directive | undefined
  ```

- **Szczegóły**

**Uwaga: nie jest to potrzebne, jeśli możesz zaimportować dyrektywę bezpośrednio.**

`resolveDirective()` musi zostać wywołane wewnątrz<span class="composition-api"> albo `setup()` albo</span> funkcji render, aby rozwiązać z właściwego kontekstu komponentu.

Jeśli dyrektywa nie zostanie znaleziona, zostanie wyemitowane ostrzeżenie w czasie wykonywania, a funkcja zwróci `undefined`.

- **Zobacz także** [Przewodnik - Funkcje renderowania - Dyrektywy niestandardowe](/guide/extras/render-function#custom-directives)

## withDirectives() {#withdirectives}

Do dodawania niestandardowych dyrektyw do vnode'ów.

- **Typ**

  ```ts
  function withDirectives(
    vnode: VNode,
    directives: DirectiveArguments
  ): VNode

  // [Dyrektywa, wartość, argument, modyfikatory]
  type DirectiveArguments = Array<
    | [Directive]
    | [Directive, any]
    | [Directive, any, string]
    | [Directive, any, string, DirectiveModifiers]
  >
  ```

- **Szczegóły**

  Owija istniejący vnode niestandardowymi dyrektywami. Drugi argument to tablica niestandardowych dyrektyw. Każda niestandardowa dyrektywa jest również reprezentowana jako tablica w formie `[Dyrektywa, wartość, argument, modyfikatory]`. Elementy końcowe tablicy można pominąć, jeśli nie są potrzebne.

- **Przykład**

  ```js
  import { h, withDirectives } from 'vue'

  // dyrektywa niestandardowa
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

- **Zobacz także** [Przewodnik - Funkcje renderowania - Dyrektywy niestandardowe](/guide/extras/render-function#custom-directives)

## withModifiers() {#withmodifiers}

Aby dodać wbudowane [modyfikatory `v-on`](/guide/essentials/event-handling#event-modifiers) do funkcji obsługi zdarzeń.

- **Typ**

  ```ts
  function withModifiers(fn: Function, modifiers: string[]): Function
  ```

- **Przykład**

  ```js
  import { h, withModifiers } from 'vue'

  const vnode = h('button', {
    // odpowiednik v-on:click.stop.prevent
    onClick: withModifiers(() => {
      // ...
    }, ['stop', 'prevent'])
  })
  ```

- **Zobacz także** [Przewodnik - Funkcje renderowania - Modyfikatory zdarzeń](/guide/extras/render-function#event-modifiers)
