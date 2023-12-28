---
pageClass: api
---

# Built-in Components {#built-in-components}

:::info Registration and Usage
Built-in components can be used directly in templates without needing to be registered. They are also tree-shakeable: they are only included in the build when they are used.

When using them in [render functions](/guide/extras/render-function), they need to be imported explicitly. For example:

```js
import { h, Transition } from 'vue'

h(Transition, {
  /* props */
})
```

:::

## `<Transition>` {#transition}

Provides animated transition effects to a **single** element or component.

- **Props**

  ```ts
  interface TransitionProps {
    /**
     * Used to automatically generate transition CSS class names.
     * e.g. `name: 'fade'` will auto expand to `.fade-enter`,
     * `.fade-enter-active`, etc.
     */
    name?: string
    /**
     * Whether to apply CSS transition classes.
     * Default: true
     */
    css?: boolean
    /**
     * Specifies the type of transition events to wait for to
     * determine transition end timing.
     * Default behavior is auto detecting the type that has
     * longer duration.
     */
    type?: 'transition' | 'animation'
    /**
     * Specifies explicit durations of the transition.
     * Default behavior is wait for the first `transitionend`
     * or `animationend` event on the root transition element.
     */
    duration?: number | { enter: number; leave: number }
    /**
     * Controls the timing sequence of leaving/entering transitions.
     * Default behavior is simultaneous.
     */
    mode?: 'in-out' | 'out-in' | 'default'
    /**
     * Whether to apply transition on initial render.
     * Default: false
     */
    appear?: boolean

    /**
     * Props for customizing transition classes.
     * Use kebab-case in templates, e.g. enter-from-class="xxx"
     */
    enterFromClass?: string
    enterActiveClass?: string
    enterToClass?: string
    appearFromClass?: string
    appearActiveClass?: string
    appearToClass?: string
    leaveFromClass?: string
    leaveActiveClass?: string
    leaveToClass?: string
  }
  ```

- **Events**

  - `@before-enter`
  - `@before-leave`
  - `@enter`
  - `@leave`
  - `@appear`
  - `@after-enter`
  - `@after-leave`
  - `@after-appear`
  - `@enter-cancelled`
  - `@leave-cancelled` (`v-show` only)
  - `@appear-cancelled`

- **Example**

  Simple element:

  ```vue-html
  <Transition>
    <div v-if="ok">toggled content</div>
  </Transition>
  ```

  Forcing a transition by changing the `key` attribute:

  ```vue-html
  <Transition>
    <div :key="text">{{ text }}</div>
  </Transition>
  ```

  Dynamic component, with transition mode + animate on appear:

  ```vue-html
  <Transition name="fade" mode="out-in" appear>
    <component :is="view"></component>
  </Transition>
  ```

  Listening to transition events:

  ```vue-html
  <Transition @after-enter="onTransitionComplete">
    <div v-show="ok">toggled content</div>
  </Transition>
  ```

- **See also** [Guide - Transition](/guide/built-ins/transition)

## `<TransitionGroup>` {#transitiongroup}

Provides transition effects for **multiple** elements or components in a list.

- **Props**

  `<TransitionGroup>` accepts the same props as `<Transition>` except `mode`, plus two additional props:

  ```ts
  interface TransitionGroupProps extends Omit<TransitionProps, 'mode'> {
    /**
     * If not defined, renders as a fragment.
     */
    tag?: string
    /**
     * For customizing the CSS class applied during move transitions.
     * Use kebab-case in templates, e.g. move-class="xxx"
     */
    moveClass?: string
  }
  ```

- **Events**

  `<TransitionGroup>` emits the same events as `<Transition>`.

- **Details**

  By default, `<TransitionGroup>` doesn't render a wrapper DOM element, but one can be defined via the `tag` prop.

  Note that every child in a `<transition-group>` must be [**uniquely keyed**](/guide/essentials/list#maintaining-state-with-key) for the animations to work properly.

  `<TransitionGroup>` supports moving transitions via CSS transform. When a child's position on screen has changed after an update, it will get applied a moving CSS class (auto generated from the `name` attribute or configured with the `move-class` prop). If the CSS `transform` property is "transition-able" when the moving class is applied, the element will be smoothly animated to its destination using the [FLIP technique](https://aerotwist.com/blog/flip-your-animations/).

- **Example**

  ```vue-html
  <TransitionGroup tag="ul" name="slide">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </TransitionGroup>
  ```

- **See also** [Guide - TransitionGroup](/guide/built-ins/transition-group)

## `<KeepAlive>` {#keepalive}

Caches dynamically toggled components wrapped inside.

- **Props**

  ```ts
  interface KeepAliveProps {
    /**
     * If specified, only components with names matched by
     * `include` will be cached.
     */
    include?: MatchPattern
    /**
     * Any component with a name matched by `exclude` will
     * not be cached.
     */
    exclude?: MatchPattern
    /**
     * The maximum number of component instances to cache.
     */
    max?: number | string
  }

  type MatchPattern = string | RegExp | (string | RegExp)[]
  ```

- **Details**

  When wrapped around a dynamic component, `<KeepAlive>` caches the inactive component instances without destroying them.

  There can only be one active component instance as the direct child of `<KeepAlive>` at any time.

  When a component is toggled inside `<KeepAlive>`, its `activated` and `deactivated` lifecycle hooks will be invoked accordingly, providing an alternative to `mounted` and `unmounted`, which are not called. This applies to the direct child of `<KeepAlive>` as well as to all of its descendants.

- **Example**

  Basic usage:

  ```vue-html
  <KeepAlive>
    <component :is="view"></component>
  </KeepAlive>
  ```

  When used with `v-if` / `v-else` branches, there must be only one component rendered at a time:

  ```vue-html
  <KeepAlive>
    <comp-a v-if="a > 1"></comp-a>
    <comp-b v-else></comp-b>
  </KeepAlive>
  ```

  Used together with `<Transition>`:

  ```vue-html
  <Transition>
    <KeepAlive>
      <component :is="view"></component>
    </KeepAlive>
  </Transition>
  ```

  Using `include` / `exclude`:

  ```vue-html
  <!-- comma-delimited string -->
  <KeepAlive include="a,b">
    <component :is="view"></component>
  </KeepAlive>

  <!-- regex (use `v-bind`) -->
  <KeepAlive :include="/a|b/">
    <component :is="view"></component>
  </KeepAlive>

  <!-- Array (use `v-bind`) -->
  <KeepAlive :include="['a', 'b']">
    <component :is="view"></component>
  </KeepAlive>
  ```

  Usage with `max`:

  ```vue-html
  <KeepAlive :max="10">
    <component :is="view"></component>
  </KeepAlive>
  ```

- **See also** [Guide - KeepAlive](/guide/built-ins/keep-alive)

## `<Teleport>` {#teleport}

Renders its slot content to another part of the DOM.

- **Props**

  ```ts
  interface TeleportProps {
    /**
     * Required. Specify target container.
     * Can either be a selector or an actual element.
     */
    to: string | HTMLElement
    /**
     * When `true`, the content will remain in its original
     * location instead of moved into the target container.
     * Can be changed dynamically.
     */
    disabled?: boolean
  }
  ```

- **Example**

  Specifying target container:

  ```vue-html
  <Teleport to="#some-id" />
  <Teleport to=".some-class" />
  <Teleport to="[data-teleport]" />
  ```

  Conditionally disabling:

  ```vue-html
  <Teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
  </Teleport>
  ```

- **See also** [Guide - Teleport](/guide/built-ins/teleport)

## `<Suspense>` <sup class="vt-badge experimental" /> {#suspense}

Used for orchestrating nested async dependencies in a component tree.

- **Props**

  ```ts
  interface SuspenseProps {
    timeout?: string | number
  }
  ```

- **Events**

  - `@resolve`
  - `@pending`
  - `@fallback`

- **Details**

  `<Suspense>` accepts two slots: the `#default` slot and the `#fallback` slot. It will display the content of the fallback slot while rendering the default slot in memory.

  If it encounters async dependencies ([Async Components](/guide/components/async) and components with [`async setup()`](/guide/built-ins/suspense#async-setup)) while rendering the default slot, it will wait until all of them are resolved before displaying the default slot.

- **See also** [Guide - Suspense](/guide/built-ins/suspense)
