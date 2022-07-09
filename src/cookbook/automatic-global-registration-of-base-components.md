# Automatic Global Registration of Base Components

## Base Example

Many of your components will be relatively generic, possibly only wrapping an element like an input or a button. We sometimes refer to these as [base components](../style-guide/#base-component-names-strongly-recommended) and they tend to be used very frequently across your components.

The result is that many components may include long lists of base components:

```js
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import BaseInput from './BaseInput.vue'
export default {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}
```

Just to support relatively little markup in a template:

```html
<BaseInput v-model="searchText" @keydown.enter="search" />
<BaseButton @click="search">
  <BaseIcon name="search" />
</BaseButton>
```

Fortunately, if you're using webpack (or [Vue CLI](https://github.com/vuejs/vue-cli), which uses webpack internally), you can use `require.context` to globally register only these very common base components. Here's an example of the code you might use to globally import base components in your app's entry file (e.g. `src/main.js`):

```js
import { createApp } from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import App from './App.vue'

const app = createApp(App)

const requireComponent = require.context(
  // The relative path of the components folder
  './components',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  app.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})

app.mount('#app')
```
