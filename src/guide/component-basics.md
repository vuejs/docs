# Components Basics

// TODO link to comparison w/ web components

## Base Example

Here's an example of a Vue component:

```js
// Create a Vue application
const app = Vue.createApp({})

// Define a new global component called button-counter
app.component('button-counter', {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
})
```

Components are reusable instances with a name: in this case, `<button-counter>`. We can use this component as a custom element inside a root instance:

```vue-html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```

```js
app.mount('#components-demo')
```

<!-- <common-codepen-snippet title="Component basics" slug="abORVEJ" tab="js,result" :preview="false" /> -->

Since components are reusable instances, they accept the same options as a root instance, such as `data`, `computed`, `watch`, `methods`, and lifecycle hooks.

## Reusing Components

Components can be reused as many times as you want:

```vue-html
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

<!-- <common-codepen-snippet title="Component basics: reusing components" slug="rNVqYvM" tab="result" :preview="false" /> -->

Notice that when clicking on the buttons, each one maintains its own, separate `count`. That's because each time you use a component, a new **instance** of it is created.

## Organizing Components

It's common for an app to be organized into a tree of nested components:

![Component Tree](/images/components.png)

For example, you might have components for a header, sidebar, and content area, each typically containing other components for navigation links, blog posts, etc.

To use these components in templates, they must be registered so that Vue knows about them. There are two types of component registration: **global** and **local**. So far, we've only registered components globally, using the `component` method of our app:

```js
const app = Vue.createApp({})

app.component('my-component-name', {
  // ... options ...
})
```

Globally registered components can be used in the template of any component within the app.

That's all you need to know about registration for now, but once you've finished reading this page and feel comfortable with its content, we recommend coming back later to read the full guide on [Component Registration](component-registration.md).

## Passing Data to Child Components with Props

Earlier, we mentioned creating a component for blog posts. The problem is, that component won't be useful unless you can pass data to it, such as the title and content of the specific post we want to display. That's where props come in.

Props are custom attributes you can register on a component. To pass a title to our blog post component, we can include it in the list of props this component accepts, using the `props` option:

```js
const app = Vue.createApp({})

app.component('blog-post', {
  props: ['title'],
  template: `<h4>{{ title }}</h4>`
})

app.mount('#blog-post-demo')
```

When a value is passed to a prop attribute, it becomes a property on that component instance. The value of that property is accessible within the template, just like any other component property.

A component can have as many props as you like and, by default, any value can be passed to any prop.

Once a prop is registered, you can pass data to it as a custom attribute, like this:

```vue-html
<div id="blog-post-demo" class="demo">
  <blog-post title="My journey with Vue"></blog-post>
  <blog-post title="Blogging with Vue"></blog-post>
  <blog-post title="Why Vue is so fun"></blog-post>
</div>
```

<!-- <common-codepen-snippet title="Component basics: passing props" slug="PoqyOaX" tab="result" :preview="false" /> -->

In a typical app, however, you'll likely have an array of posts in `data`:

```js
const App = {
  data() {
    return {
      posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' }
      ]
    }
  }
}

const app = Vue.createApp(App)

app.component('blog-post', {
  props: ['title'],
  template: `<h4>{{ title }}</h4>`
})

app.mount('#blog-posts-demo')
```

Then want to render a component for each one:

```vue-html
<div id="blog-posts-demo">
  <blog-post
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
  ></blog-post>
</div>
```

Above, you'll see that we can use `v-bind` to dynamically pass props. This is especially useful when you don't know the exact content you're going to render ahead of time.

That's all you need to know about props for now, but once you've finished reading this page and feel comfortable with its content, we recommend coming back later to read the full guide on [Props](component-props.html).

## Listening to Child Components Events

As we develop our `<blog-post>` component, some features may require communicating back up to the parent. For example, we may decide to include an accessibility feature to enlarge the text of blog posts, while leaving the rest of the page its default size.

In the parent, we can support this feature by adding a `postFontSize` data property:

```js
const App = {
  data() {
    return {
      posts: [
        /* ... */
      ],
      postFontSize: 1
    }
  }
}
```

Which can be used in the template to control the font size of all blog posts:

```vue-html
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
    ></blog-post>
  </div>
</div>
```

Now let's add a button to enlarge the text right before the content of every post:

```js
app.component('blog-post', {
  props: ['title'],
  template: `
    <div class="blog-post">
      <h4>{{ title }}</h4>
      <button>
        Enlarge text
      </button>
    </div>
  `
})
```

The problem is, this button doesn't do anything:

```vue-html
<button>
  Enlarge text
</button>
```

When we click on the button, we need to communicate to the parent that it should enlarge the text of all posts. To solve this problem, component instances provide a custom events system. The parent can choose to listen to any event on the child component instance with `v-on` or `@`, just as we would with a native DOM event:

```vue-html
<blog-post ... @enlarge-text="postFontSize += 0.1"></blog-post>
```

Then the child component can emit an event on itself by calling the built-in [**`$emit`** method](../api/component-instance.html#emit), passing the name of the event:

```vue-html
<button @click="$emit('enlargeText')">
  Enlarge text
</button>
```

Thanks to the `@enlarge-text="postFontSize += 0.1"` listener, the parent will receive the event and update the value of `postFontSize`.

<!-- <common-codepen-snippet title="Component basics: emitting events" slug="KKpGyrp" tab="result" :preview="false" /> -->

We can list emitted events in the component's `emits` option:

```js
app.component('blog-post', {
  props: ['title'],
  emits: ['enlargeText']
})
```

This will allow you to check all the events that a component emits and optionally [validate them](component-custom-events.html#validate-emitted-events).

### Emitting a Value With an Event

It's sometimes useful to emit a specific value with an event. For example, we may want the `<blog-post>` component to be in charge of how much to enlarge the text by. In those cases, we can pass a second parameter to `$emit` to provide this value:

```vue-html
<button @click="$emit('enlargeText', 0.1)">
  Enlarge text
</button>
```

Then when we listen to the event in the parent, we can access the emitted event's value with `$event`:

```vue-html
<blog-post ... @enlarge-text="postFontSize += $event"></blog-post>
```

Or, if the event handler is a method:

```vue-html
<blog-post ... @enlarge-text="onEnlargeText"></blog-post>
```

Then the value will be passed as the first parameter of that method:

```js
methods: {
  onEnlargeText(enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

### Using `v-model` on Components

Custom events can also be used to create custom inputs that work with `v-model`. Remember that:

```vue-html
<input v-model="searchText" />
```

does the same thing as:

```vue-html
<input :value="searchText" @input="searchText = $event.target.value" />
```

When used on a component, `v-model` instead does this:

```vue-html
<custom-input
  :model-value="searchText"
  @update:model-value="searchText = $event"
></custom-input>
```

::: warning
Please note we used `model-value` with kebab-case here because we are working with in-DOM templates. You can find a detailed explanation on kebab-cased vs camelCased attributes in the [DOM Template Parsing Caveats](#dom-template-parsing-caveats) section
:::

For this to actually work though, the `<input>` inside the component must:

- Bind the `value` attribute to the `modelValue` prop
- On `input`, emit an `update:modelValue` event with the new value

Here's that in action:

```js
app.component('custom-input', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  `
})
```

Now `v-model` should work perfectly with this component:

```vue-html
<custom-input v-model="searchText"></custom-input>
```

Another way of implementing `v-model` within this component is to use the ability of `computed` properties to define a getter and setter. The `get` method should return the `modelValue` property and the `set` method should emit the corresponding event:

```js
app.component('custom-input', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input v-model="value">
  `,
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
})
```

That's all you need to know about custom component events for now, but once you've finished reading this page and feel comfortable with its content, we recommend coming back later to read the full guide on [Custom Events](component-custom-events.md).

## Content Distribution with Slots

Just like with HTML elements, it's often useful to be able to pass content to a component, like this:

```vue-html
<alert-box>
  Something bad happened.
</alert-box>
```

Which might render something like:

<!-- <common-codepen-snippet title="Component basics: slots" slug="jOPeaob" :preview="false" /> -->

This can be achieved using Vue's custom `<slot>` element:

```js
app.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

As you'll see above, we use the `<slot>` as a placeholder where we want the content to go – and that's it. We're done!

That's all you need to know about slots for now, but once you've finished reading this page and feel comfortable with its content, we recommend coming back later to read the full guide on [Slots](component-slots.md).

## Dynamic Components

Sometimes, it's useful to dynamically switch between components, like in a tabbed interface:

<!-- <common-codepen-snippet title="Component basics: dynamic components" slug="oNXaoKy" :preview="false" /> -->

The above is made possible by Vue's `<component>` element with the special `is` attribute:

```vue-html
<!-- Component changes when currentTabComponent changes -->
<component :is="currentTabComponent"></component>
```

In the example above, `currentTabComponent` can contain either:

- the name of a registered component, or
- a component's options object

See [this sandbox](https://codepen.io/team/Vue/pen/oNXaoKy) to experiment with the full code, or [this version](https://codepen.io/team/Vue/pen/oNXapXM) for an example binding to a component's options object, instead of its registered name.

You can also use the `is` attribute to create regular HTML elements.

That's all you need to know about dynamic components for now, but once you've finished reading this page and feel comfortable with its content, we recommend coming back later to read the full guide on [Dynamic & Async Components](./component-dynamic-async.html).

## DOM Template Parsing Caveats

If you are writing your Vue templates directly in the DOM, Vue will have to retrieve the template string from the DOM. This leads to some caveats due to browsers' native HTML parsing behavior.

:::tip
It should be noted that the limitations discussed below only apply if you are writing your templates directly in the DOM. They do NOT apply if you are using string templates from the following sources:

- String templates (e.g. `template: '...'`)
- Single File Components
- `<script type="text/x-template">`
  :::

### Element Placement Restrictions

Some HTML elements, such as `<ul>`, `<ol>`, `<table>` and `<select>` have restrictions on what elements can appear inside them, and some elements such as `<li>`, `<tr>`, and `<option>` can only appear inside certain other elements.

This will lead to issues when using components with elements that have such restrictions. For example:

```vue-html
<table>
  <blog-post-row></blog-post-row>
</table>
```

The custom component `<blog-post-row>` will be hoisted out as invalid content, causing errors in the eventual rendered output. We can use the special [`is` attribute](/api/built-in-special-attributes.html#is) as a workaround:

```vue-html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

:::tip
When used on native HTML elements, the value of `is` must be prefixed with `vue:` in order to be interpreted as a Vue component. This is required to avoid confusion with native [customized built-in elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example).
:::

### Case Insensitivity

HTML attribute names are case-insensitive, so browsers will interpret any uppercase characters as lowercase. That means when you’re using in-DOM templates, camelCased prop names and event handler parameters need to use their kebab-cased (hyphen-delimited) equivalents:

```js
// camelCase in JavaScript

app.component('blog-post', {
  props: ['postTitle'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
})
```

```vue-html
<!-- kebab-case in HTML -->

<blog-post post-title="hello!"></blog-post>
```

That's all you need to know about DOM template parsing caveats for now - and actually, the end of Vue's _Essentials_. Congratulations! There's still more to learn, but first, we recommend taking a break to play with Vue yourself and build something fun.

Once you feel comfortable with the knowledge you've just digested, we recommend coming back to read the full guide on [Dynamic & Async Components](component-dynamic-async.html), as well as the other pages in the Components In-Depth section of the sidebar.
