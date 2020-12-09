# Provide / inject

> This page assumes you've already read the [Components Basics](component-basics.md). Read that first if you are new to components.

Usually, when we need to pass data from the parent to child component, we use [props](component-props.md). Imagine the structure where you have some deeply nested components and you only need something from the parent component in the deep nested child. In this case, you still need to pass the prop down the whole component chain which might be annoying.

For such cases, we can use the `provide` and `inject` pair. Parent components can serve as dependency provider for all its children, regardless how deep the component hierarchy is. This feature works on two parts: parent component has a `provide` option to provide data and child component has an `inject` option to start using this data.

![Provide/inject scheme](/images/components_provide.png)

For example, if we have a hierarchy like this:

```
Root
└─ TodoList
   ├─ TodoItem
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics
```

If we want to pass the length of todo-items directly to `TodoListStatistics`, we would pass the prop down the hierarchy: `TodoList` -> `TodoListFooter` -> `TodoListStatistics`. With provide/inject approach, we can do this directly:

```js
const app = Vue.createApp({})

app.component('todo-list', {
  data() {
    return {
      todos: ['Feed a cat', 'Buy tickets']
    }
  },
  provide: {
    user: 'John Doe'
  },
  template: `
    <div>
      {{ todos.length }}
      <!-- rest of the template -->
    </div>
  `
})

app.component('todo-list-statistics', {
  inject: ['user'],
  created() {
    console.log(`Injected property: ${this.user}`) // > Injected property: John Doe
  }
})
```

However, this won't work if we try to provide some component instance property here:

```js
app.component('todo-list', {
  data() {
    return {
      todos: ['Feed a cat', 'Buy tickets']
    }
  },
  provide: {
    todoLength: this.todos.length // this will result in error `Cannot read property 'length' of undefined`
  },
  template: `
    ...
  `
})
```

To access component instance properties, we need to convert `provide` to be a function returning an object

```js
app.component('todo-list', {
  data() {
    return {
      todos: ['Feed a cat', 'Buy tickets']
    }
  },
  provide() {
    return {
      todoLength: this.todos.length
    }
  },
  template: `
    ...
  `
})
```

This allows us to more safely keep developing that component, without fear that we might change/remove something that a child component is relying on. The interface between these components remains clearly defined, just as with props.

In fact, you can think of dependency injection as sort of “long-range props”, except:

- parent components don’t need to know which descendants use the properties it provides
- child components don’t need to know where injected properties are coming from

## Working with reactivity

In the example above, if we change the list of `todos`, this change won't be reflected in the injected `todoLength` property. This is because `provide/inject` bindings are _not_ reactive by default. We can change this behavior by passing a `ref` property or `reactive` object to `provide`. In our case, if we wanted to react to changes in the ancestor component, we would need to assign a Composition API `computed` property to our provided `todoLength`:

```js
app.component('todo-list', {
  // ...
  provide() {
    return {
      todoLength: Vue.computed(() => this.todos.length)
    }
  }
})

app.component('todo-list-statistics', {
  inject: ['todoLength'],
  created() {
    console.log(`Injected property: ${this.todoLength.value}`) // > Injected property: 5
  }
})
```

In this, any change to `todos.length` will be reflected correctly in the components, where `todoLength` is injected. Read more about `computed` in the [Computed and Watch section](reactivity-computed-watchers.html#computed-values) and `reactive` provide/inject in the [Composition API section](composition-api-provide-inject.html#reactivity).
