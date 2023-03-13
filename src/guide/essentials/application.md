# Erstellen einer Vue-Anwendung {#creating-a-vue-application}

## Die Anwendungsinstanz {#the-application-instance}

Jede Vue Anwendung beginnt mit der Erstellung einer neuen **Anwendungsinstanz** mit der Funktion [`createApp`](/api/application#createapp).

```js
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
})
```

## Die Wurzel-Komponente {#the-root-component}

Das Objekt, das wir an `createApp` übergeben, ist in Wirklichkeit eine Komponente. Jede App benötigt eine "Wurzelkomponente", die andere Komponenten als ihre Kinder enthalten kann.

Wenn Sie Komponenten aus einer einzigen Datei verwenden, importieren wir normalerweise die Stammkomponente aus einer anderen Datei:

```js
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)
```

Während viele Beispiele in diesem Handbuch nur eine einzige Komponente benötigen, sind die meisten realen Anwendungen in einem Baum aus verschachtelten, wiederverwendbaren Komponenten organisiert. Der Komponentenbaum einer Todo-Anwendung könnte zum Beispiel wie folgt aussehen:

```
App (root component)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```

In späteren Abschnitten des Leitfadens werden wir erörtern, wie mehrere Komponenten definiert und zusammengesetzt werden können. Vorher werden wir uns darauf konzentrieren, was innerhalb einer einzelnen Komponente geschieht.

## Mounting the App {#mounting-the-app}

An application instance won't render anything until its `.mount()` method is called. It expects a "container" argument, which can either be an actual DOM element or a selector string:

```html
<div id="app"></div>
```

```js
app.mount('#app')
```

The content of the app's root component will be rendered inside the container element. The container element itself is not considered part of the app.

The `.mount()` method should always be called after all app configurations and asset registrations are done. Also note that its return value, unlike the asset registration methods, is the root component instance instead of the application instance.

### In-DOM Root Component Template {#in-dom-root-component-template}

When using Vue without a build step, we can write our root component's template directly inside the mount container:

```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```

```js
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```

Vue will automatically use the container's `innerHTML` as the template if the root component does not already have a `template` option.

## App Configurations {#app-configurations}

The application instance exposes a `.config` object that allows us to configure a few app-level options, for example, defining an app-level error handler that captures errors from all descendant components:

```js
app.config.errorHandler = (err) => {
  /* handle error */
}
```

The application instance also provides a few methods for registering app-scoped assets. For example, registering a component:

```js
app.component('TodoDeleteButton', TodoDeleteButton)
```

This makes the `TodoDeleteButton` available for use anywhere in our app. We will discuss registration for components and other types of assets in later sections of the guide. You can also browse the full list of application instance APIs in its [API reference](/api/application).

Make sure to apply all app configurations before mounting the app!

## Multiple application instances {#multiple-application-instances}

You are not limited to a single application instance on the same page. The `createApp` API allows multiple Vue applications to co-exist on the same page, each with its own scope for configuration and global assets:

```js
const app1 = createApp({
  /* ... */
})
app1.mount('#container-1')

const app2 = createApp({
  /* ... */
})
app2.mount('#container-2')
```

If you are using Vue to enhance server-rendered HTML and only need Vue to control specific parts of a large page, avoid mounting a single Vue application instance on the entire page. Instead, create multiple small application instances and mount them on the elements they are responsible for.
