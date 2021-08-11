# Creating a Vue Application

## The Application Instance

Every Vue application starts by creating a new **application instance** with the `createApp` function:

```js
const app = Vue.createApp({
  /* options */
})
```

The application instance is used to register 'globals' that can then be used by components within that application. We'll discuss that in detail later in the guide but as a quick example:

```js
const app = Vue.createApp({})
app.component('SearchInput', SearchInputComponent)
app.directive('focus', FocusDirective)
app.use(LocalePlugin)
```

Most of the methods exposed by the application instance return that same instance, allowing for chaining:

```js
Vue.createApp({})
  .component('SearchInput', SearchInputComponent)
  .directive('focus', FocusDirective)
  .use(LocalePlugin)
```

You can browse the full application API in the [API reference](../api/application-api.html).

## The Root Component

The options passed to `createApp` are used to configure the **root component**. That component is used as the starting point for rendering when we **mount** the application.

An application needs to be mounted into a DOM element. For example, if we want to mount a Vue application into `<div id="app"></div>`, we should pass `#app`:

```js
const RootComponent = {
  /* options */
}
const app = Vue.createApp(RootComponent)
const vm = app.mount('#app')
```

Unlike most of the application methods, `mount` does not return the application. Instead it returns the root component instance.

Although not strictly associated with the [MVVM pattern](https://en.wikipedia.org/wiki/Model_View_ViewModel), Vue's design was partly inspired by it. As a convention, we often use the variable `vm` (short for ViewModel) to refer to a component instance.

While all the examples on this page only need a single component, most real applications are organized into a tree of nested, reusable components. For example, a Todo application's component tree might look like this:

```
Root Component
└─ TodoList
   ├─ TodoItem
   │  ├─ DeleteTodoButton
   │  └─ EditTodoButton
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics
```

Each component will have its own component instance, `vm`. For some components, such as `TodoItem`, there will likely be multiple instances rendered at any one time. All of the component instances in this application will share the same application instance.

We'll talk about [the component system](component-basics.html) in detail later. For now, just be aware that the root component isn't really any different from any other component. The configuration options are the same, as is the behavior of the corresponding component instance.
