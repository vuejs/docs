# List Rendering

<VideoLesson href="https://vueschool.io/lessons/list-rendering-in-vue-3?friend=vuejs" title="Learn how to render lists on Vue School">Learn how to render list with a free Vue School lesson</VideoLesson>

## Mapping an Array to Elements with `v-for`

We can use the `v-for` directive to render a list of items based on an array. The `v-for` directive requires a special syntax in the form of `item in items`, where `items` is the source data array and `item` is an **alias** for the array element being iterated on:

```html
<ul id="array-rendering">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
```

```js
Vue.createApp({
  data() {
    return {
      items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
  }
}).mount('#array-rendering')
```

Result:

<common-codepen-snippet title="v-for with Array" slug="VwLGbwa" tab="js,result" :preview="false" />

Inside `v-for` blocks we have full access to parent scope properties. `v-for` also supports an optional second argument for the index of the current item.

```html
<ul id="array-with-index">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

```js
Vue.createApp({
  data() {
    return {
      parentMessage: 'Parent',
      items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
  }
}).mount('#array-with-index')
```

Result:

<common-codepen-snippet title="v-for with Array and index" slug="wvaEdBP" tab="js,result" :preview="false" />

You can also use `of` as the delimiter instead of `in`, so that it is closer to JavaScript's syntax for iterators:

```html
<div v-for="item of items"></div>
```

## `v-for` with an Object

You can also use `v-for` to iterate through the properties of an object.

```html
<ul id="v-for-object" class="demo">
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```

```js
Vue.createApp({
  data() {
    return {
      myObject: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      }
    }
  }
}).mount('#v-for-object')
```

Result:

<common-codepen-snippet title="v-for with Object" slug="NWqLjqy" tab="js,result" :preview="false" />

You can also provide a second argument for the property's name (a.k.a. key):

```html
<li v-for="(value, name) in myObject">
  {{ name }}: {{ value }}
</li>
```

<common-codepen-snippet title="v-for with Object and key" slug="poJOPjx" tab="js,result" :preview="false" />

And another for the index:

```html
<li v-for="(value, name, index) in myObject">
  {{ index }}. {{ name }}: {{ value }}
</li>
```

<common-codepen-snippet title="v-for with Object key and index" slug="abOaWdo" tab="js,result" :preview="false" />

:::tip Note
When iterating over an object, the order is based on the enumeration order of `Object.keys()`, which isn't guaranteed to be consistent across JavaScript engine implementations.
:::

## Maintaining State

When Vue is updating a list of elements rendered with `v-for`, by default it uses an "in-place patch" strategy. If the order of the data items has changed, instead of moving the DOM elements to match the order of the items, Vue will patch each element in-place and make sure it reflects what should be rendered at that particular index.

This default mode is efficient, but **only suitable when your list render output does not rely on child component state or temporary DOM state (e.g. form input values)**.

To give Vue a hint so that it can track each node's identity, and thus reuse and reorder existing elements, you need to provide a unique `key` attribute for each item:

```html
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

It is recommended to provide a `key` attribute with `v-for` whenever possible, unless the iterated DOM content is simple, or you are intentionally relying on the default behavior for performance gains.

Since it's a generic mechanism for Vue to identify nodes, the `key` also has other uses that are not specifically tied to `v-for`, as we will see later in the guide.

:::tip Note
Don't use non-primitive values like objects and arrays as `v-for` keys. Use string or numeric values instead.
:::

For detailed usage of the `key` attribute, please see the [`key` API documentation](../api/special-attributes.html#key).

## Array Change Detection

### Mutation Methods

Vue wraps an observed array's mutation methods so they will also trigger view updates. The wrapped methods are:

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

You can open the console and play with the previous examples' `items` array by calling their mutation methods. For example: `example1.items.push({ message: 'Baz' })`.

### Replacing an Array

Mutation methods, as the name suggests, mutate the original array they are called on. In comparison, there are also non-mutating methods, e.g. `filter()`, `concat()` and `slice()`, which do not mutate the original array but **always return a new array**. When working with non-mutating methods, you can replace the old array with the new one:

```js
example1.items = example1.items.filter(item => item.message.match(/Foo/))
```

You might think this will cause Vue to throw away the existing DOM and re-render the entire list - luckily, that is not the case. Vue implements some smart heuristics to maximize DOM element reuse, so replacing an array with another array containing overlapping objects is a very efficient operation.

## Displaying Filtered/Sorted Results

Sometimes we want to display a filtered or sorted version of an array without actually mutating or resetting the original data. In this case, you can create a computed property that returns the filtered or sorted array.

For example:

```html
<li v-for="n in evenNumbers" :key="n">{{ n }}</li>
```

```js
data() {
  return {
    numbers: [ 1, 2, 3, 4, 5 ]
  }
},
computed: {
  evenNumbers() {
    return this.numbers.filter(number => number % 2 === 0)
  }
}
```

In situations where computed properties are not feasible (e.g. inside nested `v-for` loops), you can use a method:

```html
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)" :key="n">{{ n }}</li>
</ul>
```

```js
data() {
  return {
    sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
  }
},
methods: {
  even(numbers) {
    return numbers.filter(number => number % 2 === 0)
  }
}
```

## `v-for` with a Range

`v-for` can also take an integer. In this case it will repeat the template that many times.

```html
<div id="range" class="demo">
  <span v-for="n in 10" :key="n">{{ n }} </span>
</div>
```

Result:

<common-codepen-snippet title="v-for with a range" slug="NWqLjNY" tab="html,result" />

## `v-for` on a `<template>`

Similar to template `v-if`, you can also use a `<template>` tag with `v-for` to render a block of multiple elements. For example:

```html
<ul>
  <template v-for="item in items" :key="item.msg">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## `v-for` with `v-if`

:::tip
Note that it's **not** recommended to use `v-if` and `v-for` together. Refer to [style guide](../style-guide/#avoid-v-if-with-v-for-essential) for details.
:::

When they exist on the same node, `v-if` has a higher priority than `v-for`. That means the `v-if` condition will not have access to variables from the scope of the `v-for`:

```html
<!-- This will throw an error because property "todo" is not defined on instance. -->

<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

This can be fixed by moving `v-for` to a wrapping `<template>` tag:

```html
<template v-for="todo in todos" :key="todo.name">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

## `v-for` with a Component

> This section assumes knowledge of [Components](component-basics.md). Feel free to skip it and come back later.

You can directly use `v-for` on a custom component, like any normal element:

```html
<my-component v-for="item in items" :key="item.id"></my-component>
```

However, this won't automatically pass any data to the component, because components have isolated scopes of their own. In order to pass the iterated data into the component, we should also use props:

```html
<my-component
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
></my-component>
```

The reason for not automatically injecting `item` into the component is because that makes the component tightly coupled to how `v-for` works. Being explicit about where its data comes from makes the component reusable in other situations.

Here's a complete example of a simple todo list:

```html
<div id="todo-list-example">
  <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Add a todo</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="E.g. Feed the cat"
    />
    <button>Add</button>
  </form>
  <ul>
    <todo-item
      v-for="(todo, index) in todos"
      :key="todo.id"
      :title="todo.title"
      @remove="todos.splice(index, 1)"
    ></todo-item>
  </ul>
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      newTodoText: '',
      todos: [
        {
          id: 1,
          title: 'Do the dishes'
        },
        {
          id: 2,
          title: 'Take out the trash'
        },
        {
          id: 3,
          title: 'Mow the lawn'
        }
      ],
      nextTodoId: 4
    }
  },
  methods: {
    addNewTodo() {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})

app.component('todo-item', {
  template: `
    <li>
      {{ title }}
      <button @click="$emit('remove')">Remove</button>
    </li>
  `,
  props: ['title'],
  emits: ['remove']
})

app.mount('#todo-list-example')
```

<common-codepen-snippet title="v-for with components" slug="abOaWpz" tab="js,result" :preview="false" />
