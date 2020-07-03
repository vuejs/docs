# Teleport

Vue encourages us to build our UIs by encapsulating UI and related behavior into components. We can nest them inside one another to build a tree that makes up an application UI.

However, sometimes a part of a component's template belongs into this component logically, while from a technical point of view, it would be preferable to move this part of the template somewhere else in the DOM, outside of Vue app. For example, due to styling requirements, we want to move `<p id="content">` from it's deeply nested position to the `<div>` with `id="endofbody"`

```html
<body>
  <div id="app" class="demo">
    <h3>Move the #content with the portal component</h3>
    <div>
      <p id="content">
        This should be moved to #endofbody.
      </p>
      <span>This content should be nested</span>
    </div>
  </div>
  <div id="endofbody"></div>
</body>
```

To do so, we can use Vue's built-in `<teleport>` component:

```html
<body>
  <div id="app" class="demo">
    <h3>Move the #content with the portal component</h3>
    <div>
      <teleport to="#endofbody">
        <p id="content">
          This should be moved to #endofbody.
        </p>
      </teleport>
      <span>This content should be nested</span>
    </div>
  </div>
  <div id="endofbody"></div>
</body>
```

As a result, we will have `teleport` content moved in the rendered DOM tree:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="WNrXYXd" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Teleport">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/WNrXYXd">
  Teleport</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

As you can see, all of the children of `<teleport>` will be appended to `<div id="endofbody">`.

## Using with Vue components

If `<teleport>` contains a Vue component, it will remain a logical child component of the `<teleport>`'s parent:

```js
const app = Vue.createApp({
  template: `
    <h1>Root instance</h1>
    <parent-component />
  `
})

app.component('parent-component', {
  template: `
    <h2>This is a parent component</h2>
    <teleport to="#endofbody">
      <child-component name="John" />
    </teleport>
  `
})

app.component('child-component', {
  props: ['name'],
  template: `
    <div>Hello, {{ name }}</div>
  `
})
```

In this case, even when `child-component` is rendered in the different place, it will remain a child of `parent-component` and will receive a `name` prop from it.

This also means that injections from a parent component work as expected, and that the child component will be nested below the parent component in the Vue Devtools, instead of being placed where the actual content moved to.

## Using multiple teleports on the same target

A common use case scenario would be a reusable `<Modal>` component of which there might be multiple instances active at the same time. For this kind of scenario, multiple `<teleport>` components can mount their content to the same target element. The order will be a simple append - later mounts will be located after earlier ones within the target element.

```html
<teleport to="#modals">
  <div>A</div>
</teleport>
<teleport to="#modals">
  <div>B</div>
</teleport>

<!-- result-->
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

You can check `<teleport>` component options in the [API reference](../api/built-in-components.html#teleport)
