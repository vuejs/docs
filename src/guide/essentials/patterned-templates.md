# Branching on One Value {#branching-on-one-value}

::: warning RFC Reference Implementation
This page documents the **Draft reference implementation** of [RFC #823](https://github.com/vuejs/rfcs/pull/823). Patterned templates are proposed syntax, not an accepted or released Vue feature. Trying these examples requires the compiler and language-tools reference branches linked from the RFC. The syntax and implementation can change as the RFC is discussed.
:::

A loading screen often renders different content for the states of one request. With `v-if`, each branch repeats the value it inspects. The proposed `v-match` directive groups those branches around a single expression:

```vue
<script setup lang="ts">
type RequestState =
  | { status: 'loading' }
  | { status: 'success'; title: string }
  | { status: 'error'; message: string }

defineProps<{ request: RequestState }>()
</script>

<template>
  <template v-match="request">
    <p v-when="{ status: 'loading' }">Loading…</p>
    <h1 v-when="{ status: 'success', const title }">{{ title }}</h1>
    <p v-when="{ status: 'error', const message }">{{ message }}</p>
  </template>
</template>
```

`v-match` evaluates `request` once. Its direct children use `v-when` to describe the values they accept. Vue checks them in source order and renders the first matching branch. There is no fallthrough.

The `<template>` host adds no HTML element. You can also put `v-match` on an ordinary element to keep a wrapper around the selected branch. An unmatched runtime value renders no branch, even if type checking was skipped or the value differs from its declared type.

Use `v-if` when branches test unrelated conditions. `v-match` is intended for branches that inspect the same value.

## Choosing a Pattern {#choosing-a-pattern}

The value of `v-when` is a pattern, rather than a JavaScript condition:

| Pattern | Meaning |
| --- | --- |
| `'ready'`, `42`, `true`, `null`, `undefined` | Match that value. `null` and `undefined` are distinct. |
| `Status.Ready`, `fallbackStatus` | Compare with a value from the surrounding scope. |
| `_` | Accept any value without naming it. |
| `const result` | Accept any value and bind it as `result`. |
| `{ status: 'success', const title }` | Require the listed properties and bind `title`. Extra properties are allowed. |
| `[const first, const second]` | Require an array with exactly two elements. |
| `'idle' \| 'loading'` | Accept either alternative. |
| `({ status: 'success' }) as success` | Bind the whole value after matching its pattern. |

Primitive comparisons use strict equality; a value pattern evaluating to `NaN` matches `NaN`. Value patterns support identifiers and member access. Calls and arbitrary expressions are not patterns: assign their result to a script binding, or use a guard.

Object patterns are open: `{ status: 'success' }` accepts an object with that property even when it has additional properties. A listed property must exist, including when its pattern is `_` or `undefined`. In the reference implementation, presence uses JavaScript `in` semantics and can therefore find inherited properties. This choice remains an open RFC question.

Array patterns require actual arrays. They do not match sets, other iterables, or objects with a `length` property. To accept different values, use `|`; an array pattern describes array structure.

## Naming Values Inside a Branch {#naming-values-inside-a-branch}

`const` introduces a binding. `{ const title }` is shorthand for `{ title: const title }`. An explicit property pattern can give the value a different name:

```vue-html
<template v-match="request">
  <h1 v-when="{ status: 'success', title: const heading }" :title="heading">
    {{ heading }}
  </h1>
  <p v-when="_">No title available.</p>
</template>
```

Bindings are available to the branch element's props, directives, event handlers, children, and guard. They are not available in sibling branches or outside the match. Their types follow the matched pattern. In a success branch, both `request` and an `as` binding have the success variant's type. A nested `v-match` starts with the type available in its enclosing branch.

Bindings cannot be reassigned, but objects they refer to are not deeply frozen. Binding names must be unique within a pattern. The initial grammar supports `const`, and rejects `let`, `var`, and bindings inside `|` alternatives. To name a whole alternative, put `as` outside it, as in `('idle' | 'loading') as pending`.

## Keeping the Remaining Values {#keeping-the-remaining-values}

A trailing `...` accepts the remainder without binding or reading it. `...const name` also copies it into a branch binding:

```vue-html
<template v-match="items">
  <p v-when="[]">No items.</p>
  <template v-when="[const first, ...const remaining]">
    <h2>{{ first }}</h2>
    <p>{{ remaining.length }} more items</p>
  </template>
</template>
```

Without rest, an array pattern requires exactly the listed length. With rest, it accepts that length or longer. `[const first, ...const remaining]` accepts every nonempty array; `remaining` can be empty. `[...const items]` accepts every array.

Object rest excludes every listed key, including keys whose patterns are literals or wildcards:

```vue-html
<template v-match="message">
  <MessageCard
    v-when="{ kind: 'message', const text, ...const metadata }"
    :text="text"
    v-bind="metadata"
  />
  <template v-when="_"></template>
</template>
```

`metadata` contains the remaining own enumerable string and symbol properties. It does not contain `kind`, `text`, inherited properties, or non-enumerable properties. Copies are shallow, preserve the identities of nested values, and leave the source unchanged. They may be recreated when rendering updates.

The checker preserves a tuple's tail: matching `[const first, ...const tail]` against `[string, number, boolean]` gives `tail` the type `[number, boolean]`. An array subject such as `string[]` produces `string[]`. Rest copies are mutable containers even when the source is readonly.

Rest must appear last, at most once per object or array pattern, with no trailing comma. Use `...const remaining`, not `...remaining`. To inspect a bound remainder further, use a nested match.

## Adding a Condition After Matching {#adding-a-condition-after-matching}

A guard adds a normal JavaScript condition after a pattern:

```vue-html
<template v-match="request">
  <RetryButton
    v-when="{ status: 'error', const error } if (error.retriable)"
    :error="error"
  />
  <ErrorMessage v-when="{ status: 'error', const error }" :error="error" />
  <template v-when="_"></template>
</template>
```

The guard runs only after its pattern matches and its bindings, including rest, have been initialized. If it is false, matching continues to the next branch. Use a guard instead of putting `v-if` on the same element as `v-when`.

## Covering Every Case {#covering-every-case}

The reference language-tools checker requires every `v-match` to cover its subject type. Missing cases are errors in the editor and cause `vue-tsc --noEmit` to fail. No directive modifier, ESLint rule, or optional strictness setting is needed.

```vue
<script setup lang="ts">
defineProps<{ status: 'loading' | 'success' | 'error' }>()
</script>

<template>
  <!-- Error on status: the 'error' case is not covered. -->
  <template v-match="status">
    <p v-when="'loading'">Loading…</p>
    <p v-when="'success'">Done.</p>
  </template>
</template>
```

Add an `'error'` arm, or add a final unguarded `_` arm. Enumerating all cases makes a future addition to the union require another branch. A fallback intentionally accepts future values. An empty arm, such as `<template v-when="_"></template>`, expresses intentional empty rendering and still counts toward coverage.

Coverage follows the complete pattern. `{ status: 'success', data: null }` only covers successful values with `null` data. Covering a tag does not cover the rest of that variant unless all its other subpatterns also accept every value. Nested objects and tuples are checked by their combinations, and array rest follows the same length rules as rendering. Optional properties retain an absent-property case.

Guards never contribute to coverage, even when they look constant or complementary. A guarded error branch still needs an unguarded error branch or a fallback. Comparing against a runtime variable with a union type does not cover every member of that union; a statically known singleton value, such as an enum member, can cover its value.

Open-ended types such as `string`, `number`, `any`, and `unknown`, and generic constraints that do not establish a covered space, require an unguarded catch-all. If the checker cannot prove coverage, use `_` or an unconditional binding. A `never` subject has no values and is already covered.

Remember that `ref<RequestState>()` includes `undefined` before it is initialized. Handle `undefined` as well as the declared request variants, or use a fallback. The editor and `vue-tsc` also warn when a pattern cannot match any remaining value; guarded arms do not make later structurally identical arms unreachable.

The template compiler checks syntax and structure without a TypeScript program. Running a build without template type checking does not verify exhaustiveness. Type checking never removes the runtime path that renders nothing when no arm matches.

## Placing Branches {#placing-branches}

Every `v-when` must be a direct child of its `v-match` host. The host warns about other direct content and empty matches. Put text and other conditional rendering inside an arm. An unguarded top-level `_`, including `(_)`, must be last and unique. A guarded `_ if (...)` is an ordinary guarded branch.

`v-when` cannot share an element with `v-if`, `v-else-if`, `v-else`, `v-for`, or another `v-match`. Put those directives on a nested element or an outer wrapper. Pattern bindings remain available to a loop or a slot inside the arm.

Both directives use their long names, with no arguments or modifiers. The RFC defers shorthand selection; `v-case`, `.default`, and symbol shorthands are not part of this reference implementation.
