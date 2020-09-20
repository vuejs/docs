# Teleport

<div class="vueschool"><a href="https://vueschool.io/lessons/vue-3-teleport?friend=vuejs" target="_blank" rel="sponsored noopener" title="Learn how to use teleport with Vue School">Learn how to use teleport with a free lesson on Vue School</a></div>

Vue encourages us to build our UIs by encapsulating UI and related behavior into components. We can nest them inside one another to build a tree that makes up an application UI.

However, sometimes a part of a component's template belongs to this component logically, while from a technical point of view, it would be preferable to move this part of the template somewhere else in the DOM, outside of the Vue app. 

A common scenario for this is creating a component that includes a full-screen modal. In most cases, you'd want the modal's logic to live within the component, but the positioning of the modal quickly becomes difficult to solve through CSS, or requires a change in component composition.

Consider the following HTML structure.

```html
<body>
  <div style="position: relative;">
    <h3>Tooltips with Vue 3 Teleport</h3>
    <div>
      <modal-button></modal-button>
    </div>
  </div>
</body>
```

Let's take a look at `modal-button`. 

The component will have a `button` element to trigger the opening of the modal, and a `div` element with a class of `.modal`, which will contain the modal's content and a button to self-close.

```js
const app = Vue.createApp({});

app.component('modal-button', {
  template: `
    <button @click="modalOpen = true">
        Open full screen modal!
    </button>

    <div v-if="modalOpen" class="modal">
      <div>
        I'm a modal! 
        <button @click="modalOpen = false">
          Close
        </button>
      </div>
    </div>
  `,
  data() {
    return { 
      modalOpen: false
    }
  }
})
```

When using this component inside the initial HTML structure, we can see a problem - the modal is being rendered inside the deeply nested `div` and the `position: absolute` of the modal takes the parent relatively positioned `div` as reference.

Teleport provides a clean way to allow us to control under which parent in our DOM we want a piece of HTML to be rendered, without having to resort to global state or splitting this into two components.

Let's modify our `modal-button` to use `<teleport>` and tell Vue "**teleport** this HTML **to** the "**body**" tag". 

```js
app.component('modal-button', {
  template: `
    <button @click="modalOpen = true">
        Open full screen modal! (With teleport!)
    </button>

    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal! 
          (My parent is "body")
          <button @click="modalOpen = false">
            Close
          </button>
        </div>
      </div>
    </teleport>
  `,
  data() {
    return { 
      modalOpen: false
    }
  }
})
```

As a result, once we click the button to open the modal, Vue will correctly render the modal's content as a child of the `body` tag.

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="gOPNvjR" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Vue 3 Teleport">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/gOPNvjR">
  Vue 3 Teleport</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

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
