# Teleport

Vue encourages us to build our UIs by encapsulating UI and related behavior into components. We can nest them inside one another to build a tree that makes up an application UI.

However, sometimes a part of a component's template belongs into this component logically, while from a technical point of view, it would be preferable to move this part of the template somewhere else in the DOM, outside of the Vue app. 

A common scenario for this, is creating a component that includes a full-screen modal. In most cases, you'd want the modal's logic to live within the component, but the positioning of the modal quickly becomes a CSS nightmare due to the positioning of the parent elements. 

Consider the following HTML structure. The main `div#app` holds a class of `.demo`, which makes it have a `position: relative`. 

Nested deeper inside, we have yet another wrapping `div` that holds two Vue components: `modal-button` and `modal-button-teleport` which we will look at later on.

```html
<body>
  <div id="app" class="demo">
    <h3>Tooltips with Vue 3 Teleport</h3>
    <div>
      <modal-button></modal-button>
      <modal-button-teleport></modal-button-teleport>
    </div>
  </div>
</body>
```

Let's take a look first at `modal-button`. 

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
        (My parent is ".demo")
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

When using this component inside the initial HTML structure, we can quickly see the problem - the modal is being rendered inside the deeply nested `div` and the `position: absolute` of the modal takes the nested `div` as a parent reference.

Teleport provides a clean way to allow us to control under which parent in our DOM we want a piece of HTML to be rendered at.

In the following component, `modal-button-teleport`, we use `<teleport>` to tell Vue "**teleport** this HTML **to** the "**body**" tag". 

```js
app.component('modal-button-teleport', {
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

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="Vue" data-slug-hash="PoZgggm" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Vue 3 Teleport">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/PoZgggm">
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
