# Introduction

## Why Composition API?

::: tip Note
Reaching this far in the documentation, you should already be familiar with both [the basics of Vue](introduction.md) and [creating components](component-basics.md).
:::

<VideoLesson href="https://www.vuemastery.com/courses/vue-3-essentials/why-the-composition-api" title="Learn how Composition API works in depth with Vue Mastery">Watch a free video about the Composition API on Vue Mastery</VideoLesson>

Creating Vue components allows us to extract repeatable parts of the interface coupled with its functionality into reusable pieces of code. This alone can get our application pretty far in terms of maintainability and flexibility. However, our collective experience has proved that this alone might not be enough, especially when your application is getting really big – think several hundreds of components. When dealing with such large applications, sharing and reusing code becomes especially important.

Let’s imagine that in our app, we have a view to show a list of repositories of a certain user. On top of that, we want to apply search and filter capabilities. Our component handling this view could look like this:

```js
// src/components/UserRepositories.vue

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  data () {
    return {
      repositories: [], // 1
      filters: { ... }, // 3
      searchQuery: '' // 2
    }
  },
  computed: {
    filteredRepositories () { ... }, // 3
    repositoriesMatchingSearchQuery () { ... }, // 2
  },
  watch: {
    user: 'getUserRepositories' // 1
  },
  methods: {
    getUserRepositories () {
      // using `this.user` to fetch user repositories
    }, // 1
    updateFilters () { ... }, // 3
  },
  mounted () {
    this.getUserRepositories() // 1
  }
}
```

This component has several responsibilities:

1. Getting repositories from a presumedly external API for that user name and refreshing it whenever the user changes
2. Searching for repositories using a `searchQuery` string
3. Filtering repositories using a `filters` object

Organizing logics with component's options (`data`, `computed`, `methods`, `watch`) works in most cases. However, when our components get bigger, the list of **logical concerns** also grows. This can lead to components that are hard to read and understand, especially for people who didn't write them in the first place.

![Vue Option API: Code grouped by option type](https://user-images.githubusercontent.com/499550/62783021-7ce24400-ba89-11e9-9dd3-36f4f6b1fae2.png)

Example presenting a large component where its **logical concerns** are grouped by colors.

Such fragmentation is what makes it difficult to understand and maintain a complex component. The separation of options obscures the underlying logical concerns. In addition, when working on a single logical concern, we have to constantly "jump" around option blocks for the relevant code.

It would be much nicer if we could collocate code related to the same logical concern. And this is exactly what the Composition API enables us to do.

## Basics of Composition API

Now that we know the **why** we can get to the **how**. To start working with the Composition API we first need a place where we can actually use it. In a Vue component, we call this place the `setup`.

### `setup` Component Option

<VideoLesson href="https://www.vuemastery.com/courses/vue-3-essentials/setup-and-reactive-references" title="Learn how setup works with Vue Mastery">Watch a free video on setup on Vue Mastery</VideoLesson>

The new `setup` component option is executed **before** the component is created, once the `props` are resolved, and serves as the entry point for composition API's.

::: warning
Because the component instance is not yet created when `setup` is executed, there is no `this` inside a `setup` option. This means, with the exception of `props`, you won't be able to access any properties declared in the component – **local state**, **computed properties** or **methods**.
:::

The `setup` option should be a function that accepts `props` and `context` which we will talk about [later](composition-api-setup.html#arguments). Additionally, everything that we return from `setup` will be exposed to the rest of our component (computed properties, methods, lifecycle hooks and so on) as well as to the component's template.

Let’s add `setup` to our component:

```js
// src/components/UserRepositories.vue

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  setup(props) {
    console.log(props) // { user: '' }

    return {} // anything returned here will be available for the rest of the component
  }
  // the "rest" of the component
}
```

Now let’s start with extracting the first logical concern (marked as "1" in the original snippet).

> 1. Getting repositories from a presumedly external API for that user name and refreshing it whenever the user changes

We will start with the most obvious parts:

- The list of repositories
- The function to update the list of repositories
- Returning both the list and the function so they are accessible by other component options

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'

// inside our component
setup (props) {
  let repositories = []
  const getUserRepositories = async () => {
    repositories = await fetchUserRepositories(props.user)
  }

  return {
    repositories,
    getUserRepositories // functions returned behave the same as methods
  }
}
```

This is our starting point, except it's not working yet because our `repositories` variable is not reactive. This means from a user's perspective, the repository list would remain empty. Let's fix that!

### Reactive Variables with `ref`

In Vue 3.0 we can make any variable reactive anywhere with a new `ref` function, like this:

```js
import { ref } from 'vue'

const counter = ref(0)
```

`ref` takes the argument and returns it wrapped within an object with a `value` property, which can then be used to access or mutate the value of the reactive variable:

```js
import { ref } from 'vue'

const counter = ref(0)

console.log(counter) // { value: 0 }
console.log(counter.value) // 0

counter.value++
console.log(counter.value) // 1
```

Wrapping values inside an object might seem unnecessary but is required to keep the behavior unified across different data types in JavaScript. That’s because in JavaScript, primitive types like `Number` or `String` are passed by value, not by reference:

![Pass by reference vs pass by value](https://blog.penjee.com/wp-content/uploads/2015/02/pass-by-reference-vs-pass-by-value-animation.gif)

Having a wrapper object around any value allows us to safely pass it across our whole app without worrying about losing its reactivity somewhere along the way.

::: tip Note
In other words, `ref` creates a **Reactive Reference** to our value. The concept of working with **References** will be used often throughout the Composition API.
:::

Back to our example, let's create a reactive `repositories` variable:

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref } from 'vue'

// in our component
setup (props) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(props.user)
  }

  return {
    repositories,
    getUserRepositories
  }
}
```

Done! Now whenever we call `getUserRepositories`, `repositories` will be mutated and the view will be updated to reflect the change. Our component should now look like this:

```js
// src/components/UserRepositories.vue
import { fetchUserRepositories } from '@/api/repositories'
import { ref } from 'vue'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  setup (props) {
    const repositories = ref([])
    const getUserRepositories = async () => {
      repositories.value = await fetchUserRepositories(props.user)
    }

    return {
      repositories,
      getUserRepositories
    }
  },
  data () {
    return {
      filters: { ... }, // 3
      searchQuery: '' // 2
    }
  },
  computed: {
    filteredRepositories () { ... }, // 3
    repositoriesMatchingSearchQuery () { ... }, // 2
  },
  watch: {
    user: 'getUserRepositories' // 1
  },
  methods: {
    updateFilters () { ... }, // 3
  },
  mounted () {
    this.getUserRepositories() // 1
  }
}
```

We have moved several pieces of our first logical concern into the `setup` method, nicely put close to each other. What’s left is calling `getUserRepositories` in the `mounted` hook and setting up a watcher to do that whenever the `user` prop changes.

We will start with the lifecycle hook.

### Lifecycle Hook Registration Inside `setup`

To make Composition API feature-complete compared to Options API, we also need a way to register lifecycle hooks inside `setup`. This is possible thanks to several new functions exported from Vue. Lifecycle hooks on composition API have the same name as for Options API but are prefixed with `on`: i.e. `mounted` would look like `onMounted`.

These functions accept a callback that will be executed when the hook is called by the component.

Let’s add it to our `setup` function:

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted } from 'vue'

// in our component
setup (props) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(props.user)
  }

  onMounted(getUserRepositories) // on `mounted` call `getUserRepositories`

  return {
    repositories,
    getUserRepositories
  }
}
```

Now we need to react to the changes made to the `user` prop. For that we will use the standalone `watch` function.

### Reacting to Changes with `watch`

Just like how we set up a watcher on the `user` property inside our component using the `watch` option, we can do the same using the `watch` function imported from Vue. It accepts 3 arguments:

- A **Reactive Reference** or getter function that we want to watch
- A callback
- Optional configuration options

**Here’s a quick look at how it works.**

```js
import { ref, watch } from 'vue'

const counter = ref(0)
watch(counter, (newValue, oldValue) => {
  console.log('The new counter value is: ' + counter.value)
})
```

Whenever `counter` is modified, for example `counter.value = 5`, the watch will trigger and execute the callback (second argument) which in this case will log `'The new counter value is: 5'` into our console.

**Below is the Options API equivalent:**

```js
export default {
  data() {
    return {
      counter: 0
    }
  },
  watch: {
    counter(newValue, oldValue) {
      console.log('The new counter value is: ' + this.counter)
    }
  }
}
```

For more details on `watch`, refer to our [in-depth guide]().

**Let’s now apply it to our example:**

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch, toRefs } from 'vue'

// in our component
setup (props) {
  // using `toRefs` to create a Reactive Reference to the `user` property of props
  const { user } = toRefs(props)

  const repositories = ref([])
  const getUserRepositories = async () => {
    // update `props.user` to `user.value` to access the Reference value
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)

  // set a watcher on the Reactive Reference to user prop
  watch(user, getUserRepositories)

  return {
    repositories,
    getUserRepositories
  }
}
```

You probably have noticed the use of `toRefs` at the top of our `setup`. This is to ensure our watcher will react to changes made to the `user` prop.

With those changes in place, we've just moved the whole first logical concern into a single place. We can now do the same with the second concern – filtering based on `searchQuery`, this time with a computed property.

### Standalone `computed` properties

Similar to `ref` and `watch`, computed properties can also be created outside of a Vue component with the `computed` function imported from Vue. Let’s get back to our counter example:

```js
import { ref, computed } from 'vue'

const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)

counter.value++
console.log(counter.value) // 1
console.log(twiceTheCounter.value) // 2
```

Here, the `computed` function returns a _read-only_ **Reactive Reference** to the output of the getter-like callback passed as the first argument to `computed`. In order to access the **value** of the newly-created computed variable, we need to use the `.value` property just like with `ref`.

Let’s move our search functionality into `setup`:

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch, toRefs, computed } from 'vue'

// in our component
setup (props) {
  // using `toRefs` to create a Reactive Reference to the `user` property of props
  const { user } = toRefs(props)

  const repositories = ref([])
  const getUserRepositories = async () => {
    // update `props.user` to `user.value` to access the Reference value
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)

  // set a watcher on the Reactive Reference to user prop
  watch(user, getUserRepositories)

  const searchQuery = ref('')
  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter(
      repository => repository.name.includes(searchQuery.value)
    )
  })

  return {
    repositories,
    getUserRepositories,
    searchQuery,
    repositoriesMatchingSearchQuery
  }
}
```

We could do the same for other **logical concerns** but you might be already asking the question – _Isn’t this just moving the code to the `setup` option and making it extremely big?_ Well, that’s true. That’s why before moving on with the other responsibilities, we will first extract the above code into a standalone **composition function**. Let's start with creating `useUserRepositories`:

```js
// src/composables/useUserRepositories.js

import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch } from 'vue'

export default function useUserRepositories(user) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)
  watch(user, getUserRepositories)

  return {
    repositories,
    getUserRepositories
  }
}
```

And then the searching functionality:

```js
// src/composables/useRepositoryNameSearch.js

import { ref, computed } from 'vue'

export default function useRepositoryNameSearch(repositories) {
  const searchQuery = ref('')
  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter(repository => {
      return repository.name.includes(searchQuery.value)
    })
  })

  return {
    searchQuery,
    repositoriesMatchingSearchQuery
  }
}
```

**Now having those two functionalities in separate files, we can start using them in our component. Here’s how this can be done:**

```js
// src/components/UserRepositories.vue
import useUserRepositories from '@/composables/useUserRepositories'
import useRepositoryNameSearch from '@/composables/useRepositoryNameSearch'
import { toRefs } from 'vue'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  setup (props) {
    const { user } = toRefs(props)

    const { repositories, getUserRepositories } = useUserRepositories(user)

    const {
      searchQuery,
      repositoriesMatchingSearchQuery
    } = useRepositoryNameSearch(repositories)

    return {
      // Since we don’t really care about the unfiltered repositories
      // we can expose the filtered results under the `repositories` name
      repositories: repositoriesMatchingSearchQuery,
      getUserRepositories,
      searchQuery,
    }
  },
  data () {
    return {
      filters: { ... }, // 3
    }
  },
  computed: {
    filteredRepositories () { ... }, // 3
  },
  methods: {
    updateFilters () { ... }, // 3
  }
}
```

At this point you probably already know the drill, so let’s skip to the end and migrate the leftover filtering functionality. We don’t really need to get into the implementation details as it’s not the point of this guide.

```js
// src/components/UserRepositories.vue
import { toRefs } from 'vue'
import useUserRepositories from '@/composables/useUserRepositories'
import useRepositoryNameSearch from '@/composables/useRepositoryNameSearch'
import useRepositoryFilters from '@/composables/useRepositoryFilters'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  setup(props) {
    const { user } = toRefs(props)

    const { repositories, getUserRepositories } = useUserRepositories(user)

    const {
      searchQuery,
      repositoriesMatchingSearchQuery
    } = useRepositoryNameSearch(repositories)

    const {
      filters,
      updateFilters,
      filteredRepositories
    } = useRepositoryFilters(repositoriesMatchingSearchQuery)

    return {
      // Since we don’t really care about the unfiltered repositories
      // we can expose the end results under the `repositories` name
      repositories: filteredRepositories,
      getUserRepositories,
      searchQuery,
      filters,
      updateFilters
    }
  }
}
```

And we are done!

Keep in mind that we've only scratched the surface of Composition API and what it allows us to do. To learn more about it, refer to the in-depth guide.
