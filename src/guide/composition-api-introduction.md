# Composition API: Introduction

## Why Composition API?

Reaching this far in the documentation, we are assuming that you are already familiar with both the basics of writing Vue code as well as the basics of creating components. If you’re not, you might want to first read through [Vue Introduction](introduction.md) and [Components Basics](component-basics.md) first before reading further.

Creating Vue components is a powerful technique that allows us to extract repeatable parts of the interface coupled with its functionality into reusable pieces of code. This alone can get our application pretty far in terms of maintainability and flexibility. However, our collective experience has proved that this alone might not be enough, especially when your application is getting really big – think several hundreds of components. When dealing with such large applications, sharing and reusing code becomes especially important.

Let’s imagine that in our app, we have a view where we want to show a list of repositories of a certain user. On top of that, we want to apply search, and filtering capabilities. Don’t worry if this sounds complicated as we won’t be going into many implementation details as those are not the point here. Our component that is handling this view could look like this:

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
    }, // 2
    updateFilters () { ... }, // 3
  },
  mounted () {
    this.getUserRepositories() // 1
  }
}
```

As you can see, this component has several responsibilities:

1. Getting repositories from a presumedly external API for that user name and refreshing it whenever the user changes
2. Filtering repositories based on a `searchQuery` text
3. Filtering repositories based on a `filters` object

The above way of building components, enforces code that is organized by option types within the component itself (data, computed, methods, watch), which is OK in most cases. However, usually when our components grow the list of **logical concerns** is also growing. This can lead to components that are hard to read and understand, especially to someone that hasn’t originally written it.

![Vue Option API: Code grouped by option type](https://user-images.githubusercontent.com/499550/62783021-7ce24400-ba89-11e9-9dd3-36f4f6b1fae2.png)

Please consider this colourful example on the side for second or two as it presents a larger component with its **logical concerns** grouped by colours.

Such fragmentation is exactly what makes it difficult to understand and maintain a complex component. The forced separation via options obscures the underlying logical concerns. In addition, when working on a single logical concern we have to constantly "jump" around option blocks to find the parts related to that concern.

It would be much nicer if we could collocate code related to the same logical concern. And this is exactly what the Composition API enables us to do.

## Basics of Composition API

Now that we know the **why** we can get to the **how**. To start working with the Compsition API we first need a place where we can actually use it. In a Vue component, we call this place the `setup`.

### Introducing `setup`

The `setup` component option is completely **new** and is executed **before** the component is created, once the `props` have been resolved. It serves as the entry point for when we want to use the Compositon API.

Because the component instance is not yet created when `setup` is executed, there is no `this` context that you might have expected. This means that you are **not** able to access any properties declared in the component like **local state**, **computed properties** or **methods**. The exception here are `props`.

The `setup` option should be a function that accepts `props` and `context` which we will talk about later. Additionally, everything that we return from `setup` will be exposed to the rest of our component as well as the component's template. This means that any property that we return will be accessible within the components **computed properties**, **methods,** **lifecycle hooks,** and other places.

Let’s add the `setup` to our component:

```js
// src/components/UserRepositories.vue

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
	props: {
		user: { type: String }
	},
	setup (props) {
		console.log(props) // { user: '' }

		return {} // anything returned here will be available in the "rest" of the component
	},
	// the "rest" of the component
}
```

Knowing all that let’s start with extracting the (1) logical concern:

> 1. Getting repositories from a presumedly external API for that user name and refreshing it whenever the user changes

We will start with the most obvious parts:

- The list of repositories
- The function that is updating the list of repositories
- Returning both the list and the function so it can be accessed by other component options

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

This would by our starting point, except it wouldn’t yet be working as one would except, because our `repositories` variable is not reactive. This means from the user perspective, the `repositories` list would always stay `[]`. We have to change that!

### Introducing `ref`

In Vue 3.0 we can make any variable reactive anywhere we want. To allow that, Vue is exporting a function called `ref`. We can use it to create reactive variables like this:

```js
import { ref } from 'vue'

const counter = ref(0)
```

Underneath `ref` takes the argument that we passed in and returns it wrapped in an object under the `value` property. This is a required step that allows you to track the changes within the `value`. Whenever we want to read the value or change it, we need to access it through the `.value` property as shown in the code example below:

```js
import { ref } from 'vue'

const counter = ref(0)

console.log(counter) // { value: 0 }
console.log(counter.value) // 0

counter.value++
console.log(counter.value) // 1
```

Wrapping any values inside an object might seem unnecessary at first, but is required to keep the behaviour unified across different data types in JavaScript. That’s because in JavaScript, primitive types like `Number` or `String` are passed by value, not by reference:

![Pass by reference vs pass by value](https://blog.penjee.com/wp-content/uploads/2015/02/pass-by-reference-vs-pass-by-value-animation.gif)

Having a wrapper object around any value allows us to safely pass it across our whole app without worrying about losing its reactivity somewhere along the way.

In other words, `ref` is creating a **Reactive Reference** to our value. The concept of working with **References** will be used often throughout the Composition API.

Back to our example, lets update our code to create a reactive `repositories` variable.

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

Done! Now once we call `getUserRepositories` our `repositories` list will update and that change will be reflected in our view. Let’s take a look at the whole component after those changes:

```
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

As you can see, we already moved several pieces of our 1st logical concern into the `setup` method, where they are nice and closely to each other. What’s left is calling `getUserRepositories` on `mounted` hook and setting up a watcher that will call it whenever the `user` prop will change.

We will start with the lifecycle hook.

### Lifecycle Hooks Registration inside `setup`

To make the Composition API feature complete compared to the Options API we also need a way to register lifecycle hooks inside `setup`. This is possible thanks to several new functions also exported from Vue.

**Here’s a list of how existing lifecycle hooks map into the new functions:**

- `~~beforeCreate~~` -> use `setup()`
- `~~created~~` -> use `setup()`
- `beforeMount` -> `onBeforeMount`
- `mounted` -> `onMounted`
- `beforeUpdate` -> `onBeforeUpdate`
- `updated` -> `onUpdated`
- `beforeDestroy` -> `onBeforeUnmount`
- `destroyed` -> `onUnmounted`
- `errorCaptured` -> `onErrorCaptured`

The rule of thumb here is: take the name of an existing lifecycle hook, change the first character to a capital letter and add the `on` prefix.

Those lifecycle functions accept a callback that will be executed when the hook is being called by the component.

Let’s add it to our setup function:

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

Now we need to react to the changes in the `user` prop. For that we will use the standalone `watch` function.

### Introducing standalone `watch`

Just like we set up a watcher on the `user` property inside our component using the `watch` option, we can do the same by using the `watch` function imported from Vue. It accepts 3 arguments:

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

Whenever we modify the `counter`, for example by executing `counter.value = 5` the watch will trigger and execute the callback (2nd argument) which in this case will log `'The new counter value is: 5'` inside our console.

**The above code is the equivalent of the following code when using the Options API:**

```js
export default {
  data () {
    return {
      counter: 0
    }
  },
	watch: {
    counter (newValue, oldValue) {
			console.log('The new counter value is: ' + this.counter)
		}
	}
}
```

The `watch` API is more extensive than this and you can read more about it in our [in-depth guide](), but for the sake of this introductory guide, we will ignore the other use cases.

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

You probably noticed the use of `toRefs` in the top of our `setup`. This is required if we want to ensure that whenever the `user` prop changes, our watcher will react to that change.

With those changes in place, we just moved the whole 1st logical concern into a single place. We can now do the same with the 2nd logical concern – filtering based on the `searchQuery`. For that we will need a computed property.

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

As you probably noticed, the `computed` function returns a **Reactive Reference** to the output of the getter-like callback passed as the first argument to `computed`. This **Reactive Reference** is read-only though. This means that to access the **value** of the just created computed variable, we need to use the `.value` property just like when using `ref`.

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

That was pretty easy, wasn’t it? We could do the same for other **logical concerns** but you might be already asking the question – *Isn’t this just moving the code to the  `setup` option and making it extremely big?* Well, that’s true. That’s why before we move with the other responsibilities, we will first extract the above code into standalone, **Composition Functions**. We will start with creating `useUserRepositories`:

```js
// src/composables/useUserRepositories.js

import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch, toRefs } from 'vue'

export default function useUserRepositories (user) {
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

And then do the same to the searching functionality:

```js
// src/composables/useRepositoryNameSearch.js

import { ref, onMounted, watch, toRefs } from 'vue'

export default function useRepositoryNameSearch (repositories) {
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

At this point you probably already know the drill, so let’s skip to the end and migrate the leftover filtering functionality. We don’t really need to get in depth of their implementation, since it’s not the point of this guide.

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
	setup (props) {
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
      updateFilters,
		}
	}
}
```

And we are done!

Keep in mind that we only scratched the surface of the Composition API and what it allows us to do. To keep learning more about it, take a look at the in-depth guide.
