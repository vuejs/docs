# Computed Properties and Watchers

## Computed Properties

[Learn how computed properties work with a free lesson on Vue School](https://vueschool.io/lessons/vuejs-computed-properties?friend=vuejs)

In-template expressions are very convenient, but they are meant for simple operations. Putting too much logic in your templates can make them bloated and hard to maintain. For example:

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

At this point, the template is no longer simple and declarative. You have to look at it for a second before realizing that it displays `message` in reverse. The problem is made worse when you want to include the reversed message in your template more than once.

That's why for any complex logic, you should use a **computed property**.

### Basic Example

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
const vm = Vue.createApp().mount(
  {
    data() {
      return {
        message: 'Hello'
      }
    },
    computed: {
      // a computed getter
      reversedMessage() {
        // `this` points to the vm instance
        return this.message
          .split('')
          .reverse()
          .join('')
      }
    }
  },
  '#example'
)
```

Result:

<computed-1/>

Here we have declared a computed property `reversedMessage`. The function we provided will be used as the getter function for the property `vm.reversedMessage`:

```js
console.log(vm.reversedMessage) // => 'olleH'
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // => 'eybdooG'
```

You can open the sandbox(TODO) and play with the example vm yourself. The value of `vm.reversedMessage` is always dependent on the value of `vm.message`.

You can data-bind to computed properties in templates just like a normal property. Vue is aware that `vm.reversedMessage` depends on `vm.message`, so it will update any bindings that depend on `vm.reversedMessage` when `vm.message` changes. And the best part is that we've created this dependency relationship declaratively: the computed getter function has no side effects, which makes it easier to test and understand.

### Computed Caching vs Methods

You may have noticed we can achieve the same result by invoking a method in the expression:

```html
<p>Reversed message: "{{ reverseMessage() }}"</p>
```

```js
// in component
methods: {
  reverseMessage() {
    return this.message.split('').reverse().join('')
  }
}
```

Instead of a computed property, we can define the same function as a method. For the end result, the two approaches are indeed exactly the same. However, the difference is that **computed properties are cached based on their reactive dependencies.** A computed property will only re-evaluate when some of its reactive dependencies have changed. This means as long as `message` has not changed, multiple access to the `reversedMessage` computed property will immediately return the previously computed result without having to run the function again.

This also means the following computed property will never update, because `Date.now()` is not a reactive dependency:

```js
computed: {
  now() {
    return Date.now()
  }
}
```

In comparison, a method invocation will **always** run the function whenever a re-render happens.

Why do we need caching? Imagine we have an expensive computed property **A**, which requires looping through a huge array and doing a lot of computations. Then we may have other computed properties that in turn depend on **A**. Without caching, we would be executing **A**’s getter many more times than necessary! In cases where you do not want caching, use a method instead.

### Computed vs Watched Property

Vue does provide a more generic way to observe and react to data changes on a Vue instance: **watch properties**. When you have some data that needs to change based on some other data, it is tempting to overuse `watch` - especially if you are coming from an AngularJS background. However, it is often a better idea to use a computed property rather than an imperative `watch` callback. Consider this example:

```html
<div id="demo">{{ fullName }}</div>
```

```js
const vm = Vue.createApp().mount(
  {
    data() {
      return {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
      }
    },
    watch: {
      firstName(val) {
        this.fullName = val + ' ' + this.lastName
      },
      lastName(val) {
        this.fullName = this.firstName + ' ' + val
      }
    }
  },
  '#demo'
)
```

The above code is imperative and repetitive. Compare it with a computed property version:

```js
const vm = Vue.createApp().mount(
  {
    data() {
      return {
        firstName: 'Foo',
        lastName: 'Bar'
      }
    },
    computed: {
      fullName() {
        return this.firstName + ' ' + this.lastName
      }
    }
  },
  '#demo'
)
```

Much better, isn't it?

### Computed Setter

Computed properties are by default getter-only, but you can also provide a setter when you need it:

```js
// ...
computed: {
  fullName: {
    // getter
    get() {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set(newValue) {
      const names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

Now when you run `vm.fullName = 'John Doe'`, the setter will be invoked and `vm.firstName` and `vm.lastName` will be updated accordingly.

## Watchers

While computed properties are more appropriate in most cases, there are times when a custom watcher is necessary. That's why Vue provides a more generic way to react to data changes through the `watch` option. This is most useful when you want to perform asynchronous or expensive operations in response to changing data.

For example:

```html
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</div>
```

```html
<!-- Since there is already a rich ecosystem of ajax libraries    -->
<!-- and collections of general-purpose utility methods, Vue core -->
<!-- is able to remain small by not reinventing them. This also   -->
<!-- gives you the freedom to use what you're familiar with.      -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script>
  const watchExampleVM = Vue.createApp().mount(
    {
      data() {
        return {
          question: '',
          answer: 'Questions usually contain a question mark. ;-)'
        }
      },
      watch: {
        // whenever question changes, this function will run
        question(newQuestion, oldQuestion) {
          if (newQuestion.indexOf('?') > -1) {
            this.getAnswer()
          }
        }
      },
      methods: {
        getAnswer() {
          this.answer = 'Thinking...'
          axios
            .get('https://yesno.wtf/api')
            .then(response => {
              this.answer = _.capitalize(response.data.answer)
            })
            .catch(error => {
              this.answer = 'Error! Could not reach the API. ' + error
            })
        }
      }
    },
    '#watch-example'
  )
</script>
```

Result:

<computed-2 />

In this case, using the `watch` option allows us to perform an asynchronous operation (accessing an API) and sets a condition for performing this operation. None of that would be possible with a computed property.

In addition to the `watch` option, you can also use the imperative [vm.\$watch API](TODO:../api/#vm-watch).
