# Priority C Rules: Recommended {#priority-c-rules-recommended}

Where multiple, equally good options exist, an arbitrary choice can be made to ensure consistency. In these rules, we describe each acceptable option and suggest a default choice. That means you can feel free to make a different choice in your own codebase, as long as you're consistent and have a good reason. Please do have a good reason though! By adapting to the community standard, you will:

1. Train your brain to more easily parse most of the community code you encounter
2. Be able to copy and paste most community code examples without modification
3. Often find new hires are already accustomed to your preferred coding style, at least in regards to Vue

## Component/instance options order {#component-instance-options-order}

**Component/instance options should be ordered consistently.**

This is the default order we recommend for component options. They're split into categories, so you'll know where to add new properties from plugins.

1. **Global Awareness** (requires knowledge beyond the component)

   - `name`

2. **Template Compiler Options** (changes the way templates are compiled)

   - `compilerOptions`

3. **Template Dependencies** (assets used in the template)

   - `components`
   - `directives`

4. **Composition** (merges properties into the options)

   - `extends`
   - `mixins`
   - `provide`/`inject`

5. **Interface** (the interface to the component)

   - `inheritAttrs`
   - `props`
   - `emits`

6. **Composition API** (the entry point for using the Composition API)

   - `setup`

7. **Local State** (local reactive properties)

   - `data`
   - `computed`

8. **Events** (callbacks triggered by reactive events)

   - `watch`
   - Lifecycle Events (in the order they are called)
     - `beforeCreate`
     - `created`
     - `beforeMount`
     - `mounted`
     - `beforeUpdate`
     - `updated`
     - `activated`
     - `deactivated`
     - `beforeUnmount`
     - `unmounted`
     - `errorCaptured`
     - `renderTracked`
     - `renderTriggered`

9. **Non-Reactive Properties** (instance properties independent of the reactivity system)

   - `methods`

10. **Rendering** (the declarative description of the component output)
    - `template`/`render`

## Element attribute order {#element-attribute-order}

**The attributes of elements (including components) should be ordered consistently.**

This is the default order we recommend for component options. They're split into categories, so you'll know where to add custom attributes and directives.

1. **Definition** (provides the component options)

   - `is`

2. **List Rendering** (creates multiple variations of the same element)

   - `v-for`

3. **Conditionals** (whether the element is rendered/shown)

   - `v-if`
   - `v-else-if`
   - `v-else`
   - `v-show`
   - `v-cloak`

4. **Render Modifiers** (changes the way the element renders)

   - `v-pre`
   - `v-once`

5. **Global Awareness** (requires knowledge beyond the component)

   - `id`

6. **Unique Attributes** (attributes that require unique values)

   - `ref`
   - `key`

7. **Two-Way Binding** (combining binding and events)

   - `v-model`

8. **Other Attributes** (all unspecified bound & unbound attributes)

9. **Events** (component event listeners)

   - `v-on`

10. **Content** (overrides the content of the element)
    - `v-html`
    - `v-text`

## Empty lines in component/instance options {#empty-lines-in-component-instance-options}

**You may want to add one empty line between multi-line properties, particularly if the options can no longer fit on your screen without scrolling.**

When components begin to feel cramped or difficult to read, adding spaces between multi-line properties can make them easier to skim again. In some editors, such as Vim, formatting options like this can also make them easier to navigate with the keyboard.

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
props: {
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  },

  label: String,
  icon: String
},

computed: {
  formattedValue() {
    // ...
  },

  inputClasses() {
    // ...
  }
}
```
</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
// No spaces are also fine, as long as the component
// is still easy to read and navigate.
props: {
  value: {
    type: String,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  },
  label: String,
  icon: String
},
computed: {
  formattedValue() {
    // ...
  },
  inputClasses() {
    // ...
  }
}
```

</div>

## Single-file component top-level element order {#single-file-component-top-level-element-order}

**[Single-File Components](/guide/scaling-up/sfc) should always order `<script>`, `<template>`, and `<style>` tags consistently, with `<style>` last, because at least one of the other two is always necessary.**

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<style>/* ... */</style>
<script>/* ... */</script>
<template>...</template>
```

```vue-html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>
```

```vue-html
<!-- ComponentA.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</div>
