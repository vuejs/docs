# Priority B Rules: Strongly Recommended {#priority-b-rules-strongly-recommended}

These rules have been found to improve readability and/or developer experience in most projects. Your code will still run if you violate them, but violations should be rare and well-justified.

## Component files {#component-files}

**Whenever a build system is available to concatenate files, each component should be in its own file.**

This helps you to more quickly find a component when you need to edit it or review how to use it.

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
app.component('TodoList', {
  // ...
})

app.component('TodoItem', {
  // ...
})
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```
components/
|- TodoList.js
|- TodoItem.js
```

```
components/
|- TodoList.vue
|- TodoItem.vue
```

</div>

## Single-file component filename casing {#single-file-component-filename-casing}

**Filenames of [Single-File Components](/guide/scaling-up/sfc) should either be always PascalCase or always kebab-case.**

PascalCase works best with autocompletion in code editors, as it's consistent with how we reference components in JS(X) and templates, wherever possible. However, mixed case filenames can sometimes create issues on case-insensitive file systems, which is why kebab-case is also perfectly acceptable.

<div class="style-example style-example-bad">
<h3>Bad</h3>

```
components/
|- mycomponent.vue
```

```
components/
|- myComponent.vue
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```
components/
|- MyComponent.vue
```

```
components/
|- my-component.vue
```

</div>

## Base component names {#base-component-names}

**Base components (a.k.a. presentational, dumb, or pure components) that apply app-specific styling and conventions should all begin with a specific prefix, such as `Base`, `App`, or `V`.**

::: details Detailed Explanation
These components lay the foundation for consistent styling and behavior in your application. They may **only** contain:

- HTML elements,
- other base components, and
- 3rd-party UI components.

But they'll **never** contain global state (e.g. from a [Pinia](https://pinia.vuejs.org/) store).

Their names often include the name of an element they wrap (e.g. `BaseButton`, `BaseTable`), unless no element exists for their specific purpose (e.g. `BaseIcon`). If you build similar components for a more specific context, they will almost always consume these components (e.g. `BaseButton` may be used in `ButtonSubmit`).

Some advantages of this convention:

- When organized alphabetically in editors, your app's base components are all listed together, making them easier to identify.

- Since component names should always be multi-word, this convention prevents you from having to choose an arbitrary prefix for simple component wrappers (e.g. `MyButton`, `VueButton`).

- Since these components are so frequently used, you may want to simply make them global instead of importing them everywhere. A prefix makes this possible with Webpack:

  ```js
  const requireComponent = require.context(
    './src',
    true,
    /Base[A-Z]\w+\.(vue|js)$/
  )
  requireComponent.keys().forEach(function (fileName) {
    let baseComponentConfig = requireComponent(fileName)
    baseComponentConfig =
      baseComponentConfig.default || baseComponentConfig
    const baseComponentName =
      baseComponentConfig.name ||
      fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
    app.component(baseComponentName, baseComponentConfig)
  })
  ```

  :::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

```
components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue
```

```
components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
```

</div>

## Tightly coupled component names {#tightly-coupled-component-names}

**Child components that are tightly coupled with their parent should include the parent component name as a prefix.**

If a component only makes sense in the context of a single parent component, that relationship should be evident in its name. Since editors typically organize files alphabetically, this also keeps these related files next to each other.

::: details Detailed Explanation
You might be tempted to solve this problem by nesting child components in directories named after their parent. For example:

```
components/
|- TodoList/
   |- Item/
      |- index.vue
      |- Button.vue
   |- index.vue
```

or:

```
components/
|- TodoList/
   |- Item/
      |- Button.vue
   |- Item.vue
|- TodoList.vue
```

This isn't recommended, as it results in:

- Many files with similar names, making rapid file switching in code editors more difficult.
- Many nested sub-directories, which increases the time it takes to browse components in an editor's sidebar.
  :::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue
```

```
components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

```
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

</div>

## Order of words in component names {#order-of-words-in-component-names}

**Component names should start with the highest-level (often most general) words and end with descriptive modifying words.**

::: details Detailed Explanation
You may be wondering:

> "Why would we force component names to use less natural language?"

In natural English, adjectives and other descriptors do typically appear before the nouns, while exceptions require connector words. For example:

- Coffee _with_ milk
- Soup _of the_ day
- Visitor _to the_ museum

You can definitely include these connector words in component names if you'd like, but the order is still important.

Also note that **what's considered "highest-level" will be contextual to your app**. For example, imagine an app with a search form. It may include components like this one:

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

As you might notice, it's quite difficult to see which components are specific to the search. Now let's rename the components according to the rule:

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputExcludeGlob.vue
|- SearchInputQuery.vue
|- SettingsCheckboxLaunchOnStartup.vue
|- SettingsCheckboxTerms.vue
```

Since editors typically organize files alphabetically, all the important relationships between components are now evident at a glance.

You might be tempted to solve this problem differently, nesting all the search components under a "search" directory, then all the settings components under a "settings" directory. We only recommend considering this approach in very large apps (e.g. 100+ components), for these reasons:

- It generally takes more time to navigate through nested sub-directories, than scrolling through a single `components` directory.
- Name conflicts (e.g. multiple `ButtonDelete.vue` components) make it more difficult to quickly navigate to a specific component in a code editor.
- Refactoring becomes more difficult, because find-and-replace often isn't sufficient to update relative references to a moved component.
  :::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

</div>

## Self-closing components {#self-closing-components}

**Components with no content should be self-closing in [Single-File Components](/guide/scaling-up/sfc), string templates, and [JSX](/guide/extras/render-function#jsx-tsx) - but never in in-DOM templates.**

Components that self-close communicate that they not only have no content, but are **meant** to have no content. It's the difference between a blank page in a book and one labeled "This page intentionally left blank." Your code is also cleaner without the unnecessary closing tag.

Unfortunately, HTML doesn't allow custom elements to be self-closing - only [official "void" elements](https://www.w3.org/TR/html/syntax.html#void-elements). That's why the strategy is only possible when Vue's template compiler can reach the template before the DOM, then serve the DOM spec-compliant HTML.

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<!-- In Single-File Components, string templates, and JSX -->
<MyComponent></MyComponent>
```

```vue-html
<!-- In in-DOM templates -->
<my-component/>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<!-- In Single-File Components, string templates, and JSX -->
<MyComponent/>
```

```vue-html
<!-- In in-DOM templates -->
<my-component></my-component>
```

</div>

## Component name casing in templates {#component-name-casing-in-templates}

**In most projects, component names should always be PascalCase in [Single-File Components](/guide/scaling-up/sfc) and string templates - but kebab-case in in-DOM templates.**

PascalCase has a few advantages over kebab-case:

- Editors can autocomplete component names in templates, because PascalCase is also used in JavaScript.
- `<MyComponent>` is more visually distinct from a single-word HTML element than `<my-component>`, because there are two character differences (the two capitals), rather than just one (a hyphen).
- If you use any non-Vue custom elements in your templates, such as a web component, PascalCase ensures that your Vue components remain distinctly visible.

Unfortunately, due to HTML's case insensitivity, in-DOM templates must still use kebab-case.

Also note that if you've already invested heavily in kebab-case, consistency with HTML conventions and being able to use the same casing across all your projects may be more important than the advantages listed above. In those cases, **using kebab-case everywhere is also acceptable.**

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<!-- In Single-File Components and string templates -->
<mycomponent/>
```

```vue-html
<!-- In Single-File Components and string templates -->
<myComponent/>
```

```vue-html
<!-- In in-DOM templates -->
<MyComponent></MyComponent>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<!-- In Single-File Components and string templates -->
<MyComponent/>
```

```vue-html
<!-- In in-DOM templates -->
<my-component></my-component>
```

OR

```vue-html
<!-- Everywhere -->
<my-component></my-component>
```

</div>

## Component name casing in JS/JSX {#component-name-casing-in-js-jsx}

**Component names in JS/[JSX](/guide/extras/render-function#jsx-tsx) should always be PascalCase, though they may be kebab-case inside strings for simpler applications that only use global component registration through `app.component`.**

::: details Detailed Explanation
In JavaScript, PascalCase is the convention for classes and prototype constructors - essentially, anything that can have distinct instances. Vue components also have instances, so it makes sense to also use PascalCase. As an added benefit, using PascalCase within JSX (and templates) allows readers of the code to more easily distinguish between components and HTML elements.

However, for applications that use **only** global component definitions via `app.component`, we recommend kebab-case instead. The reasons are:

- It's rare that global components are ever referenced in JavaScript, so following a convention for JavaScript makes less sense.
- These applications always include many in-DOM templates, where [kebab-case **must** be used](#component-name-casing-in-templates).
  :::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
app.component('myComponent', {
  // ...
})
```

```js
import myComponent from './MyComponent.vue'
```

```js
export default {
  name: 'myComponent'
  // ...
}
```

```js
export default {
  name: 'my-component'
  // ...
}
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
app.component('MyComponent', {
  // ...
})
```

```js
app.component('my-component', {
  // ...
})
```

```js
import MyComponent from './MyComponent.vue'
```

```js
export default {
  name: 'MyComponent'
  // ...
}
```

</div>

## Full-word component names {#full-word-component-names}

**Component names should prefer full words over abbreviations.**

The autocompletion in editors make the cost of writing longer names very low, while the clarity they provide is invaluable. Uncommon abbreviations, in particular, should always be avoided.

<div class="style-example style-example-bad">
<h3>Bad</h3>

```
components/
|- SdSettings.vue
|- UProfOpts.vue
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

</div>

## Prop name casing {#prop-name-casing}

**Prop names should always use camelCase during declaration. When used inside in-DOM templates, props should be kebab-cased. Single-File Components templates and [JSX](/guide/extras/render-function#jsx-tsx) can use either kebab-case or camelCase props. Casing should be consistent - if you choose to use camelCased props, make sure you don't use kebab-cased ones in your application**

<div class="style-example style-example-bad">
<h3>Bad</h3>

<div class="options-api">

```js
props: {
  'greeting-text': String
}
```

</div>

<div class="composition-api">

```js
const props = defineProps({
  'greeting-text': String
})
```

</div>

```vue-html
// for in-DOM templates
<welcome-message greetingText="hi"></welcome-message>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

<div class="options-api">

```js
props: {
  greetingText: String
}
```

</div>

<div class="composition-api">

```js
const props = defineProps({
  greetingText: String
})
```

</div>

```vue-html
// for SFC - please make sure your casing is consistent throughout the project
// you can use either convention but we don't recommend mixing two different casing styles
<WelcomeMessage greeting-text="hi"/>
// or
<WelcomeMessage greetingText="hi"/>
```

```vue-html
// for in-DOM templates
<welcome-message greeting-text="hi"></welcome-message>
```

</div>

## Multi-attribute elements {#multi-attribute-elements}

**Elements with multiple attributes should span multiple lines, with one attribute per line.**

In JavaScript, splitting objects with multiple properties over multiple lines is widely considered a good convention, because it's much easier to read. Our templates and [JSX](/guide/extras/render-function#jsx-tsx) deserve the same consideration.

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo">
```

```vue-html
<MyComponent foo="a" bar="b" baz="c"/>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
```

```vue-html
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```

</div>

## Simple expressions in templates {#simple-expressions-in-templates}

**Component templates should only include simple expressions, with more complex expressions refactored into computed properties or methods.**

Complex expressions in your templates make them less declarative. We should strive to describe _what_ should appear, not _how_ we're computing that value. Computed properties and methods also allow the code to be reused.

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
{{
  fullName.split(' ').map((word) => {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
}}
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<!-- In a template -->
{{ normalizedFullName }}
```

<div class="options-api">

```js
// The complex expression has been moved to a computed property
computed: {
  normalizedFullName() {
    return this.fullName.split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
  }
}
```

</div>

<div class="composition-api">

```js
// The complex expression has been moved to a computed property
const normalizedFullName = computed(() =>
  fullName.value
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
)
```

</div>

</div>

## Simple computed properties {#simple-computed-properties}

**Complex computed properties should be split into as many simpler properties as possible.**

::: details Detailed Explanation
Simpler, well-named computed properties are:

- **Easier to test**

  When each computed property contains only a very simple expression, with very few dependencies, it's much easier to write tests confirming that it works correctly.

- **Easier to read**

  Simplifying computed properties forces you to give each value a descriptive name, even if it's not reused. This makes it much easier for other developers (and future you) to focus in on the code they care about and figure out what's going on.

- **More adaptable to changing requirements**

  Any value that can be named might be useful to the view. For example, we might decide to display a message telling the user how much money they saved. We might also decide to calculate sales tax, but perhaps display it separately, rather than as part of the final price.

  Small, focused computed properties make fewer assumptions about how information will be used, so require less refactoring as requirements change.
  :::

<div class="style-example style-example-bad">
<h3>Bad</h3>

<div class="options-api">

```js
computed: {
  price() {
    const basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}
```

</div>

<div class="composition-api">

```js
const price = computed(() => {
  const basePrice = manufactureCost.value / (1 - profitMargin.value)
  return basePrice - basePrice * (discountPercent.value || 0)
})
```

</div>

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

<div class="options-api">

```js
computed: {
  basePrice() {
    return this.manufactureCost / (1 - this.profitMargin)
  },

  discount() {
    return this.basePrice * (this.discountPercent || 0)
  },

  finalPrice() {
    return this.basePrice - this.discount
  }
}
```

</div>

<div class="composition-api">

```js
const basePrice = computed(
  () => manufactureCost.value / (1 - profitMargin.value)
)

const discount = computed(
  () => basePrice.value * (discountPercent.value || 0)
)

const finalPrice = computed(() => basePrice.value - discount.value)
```

</div>

</div>

## Quoted attribute values {#quoted-attribute-values}

**Non-empty HTML attribute values should always be inside quotes (single or double, whichever is not used in JS).**

While attribute values without any spaces are not required to have quotes in HTML, this practice often leads to _avoiding_ spaces, making attribute values less readable.

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<input type=text>
```

```vue-html
<AppSidebar :style={width:sidebarWidth+'px'}>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<input type="text">
```

```vue-html
<AppSidebar :style="{ width: sidebarWidth + 'px' }">
```

</div>

## Directive shorthands {#directive-shorthands}

**Directive shorthands (`:` for `v-bind:`, `@` for `v-on:` and `#` for `v-slot`) should be used always or never.**

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<input
  v-bind:value="newTodoText"
  :placeholder="newTodoInstructions"
>
```

```vue-html
<input
  v-on:input="onInput"
  @focus="onFocus"
>
```

```vue-html
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<input
  :value="newTodoText"
  :placeholder="newTodoInstructions"
>
```

```vue-html
<input
  v-bind:value="newTodoText"
  v-bind:placeholder="newTodoInstructions"
>
```

```vue-html
<input
  @input="onInput"
  @focus="onFocus"
>
```

```vue-html
<input
  v-on:input="onInput"
  v-on:focus="onFocus"
>
```

```vue-html
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template v-slot:footer>
  <p>Here's some contact info</p>
</template>
```

```vue-html
<template #header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```

</div>
