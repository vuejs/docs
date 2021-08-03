# Effect Scope API <Badge text="3.2+" />

:::info
Effect scope is an advanced API primarily intended for library authors. For details on how to leverage this API, please consult its corresponding [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md).
:::

## `effectScope`

Creates an effect scope object which can capture the reactive effects (e.g. computed and watchers) created within it so that these effects can be disposed together.

**Typing:**

```ts
function effectScope(detached?: boolean): EffectScope

interface EffectScope {
  run<T>(fn: () => T): T | undefined // undefined if scope is inactive
  stop(): void
}
```

**Example:**

```js
const scope = effectScope()

scope.run(() => {
  const doubled = computed(() => counter.value * 2)

  watch(doubled, () => console.log(doubled.value))

  watchEffect(() => console.log('Count: ', doubled.value))
})

// to dispose all effects in the scope
scope.stop()
```

## `getCurrentScope`

Returns the current active [effect scope](#effectscope) if there is one.

**Typing:**

```ts
function getCurrentScope(): EffectScope | undefined
```

## `onScopeDispose`

Registers a dispose callback on the current active [effect scope](#effectscope). The callback will be invoked when the associated effect scope is stopped.

This method can be used as a non-component-coupled replacement of `onUnmounted` in reusable composition functions, since each Vue component's `setup()` function is also invoked in an effect scope.

**Typing:**

```ts
function onScopeDispose(fn: () => void): void
```
