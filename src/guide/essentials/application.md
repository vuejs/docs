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

## Montage der App {#mounting-the-app}

Eine Anwendungsinstanz rendert nichts, bis ihre Methode `.mount()` aufgerufen wird. Sie erwartet ein "container"-Argument, das entweder ein tatsächliches DOM-Element oder ein Selektor-String sein kann:

```html
<div id="app"></div>
```

```js
app.mount('#app')
```

Der Inhalt der Stammkomponente der Anwendung wird innerhalb des Containerelements gerendert. Das Container-Element selbst wird nicht als Teil der App betrachtet.

Die Methode `.mount()` sollte immer aufgerufen werden, nachdem alle Anwendungskonfigurationen und Asset-Registrierungen abgeschlossen sind. Beachten Sie auch, dass ihr Rückgabewert, im Gegensatz zu den Asset-Registrierungsmethoden, die Instanz der Stammkomponente ist und nicht die Instanz der Anwendung.

### In-DOM-Wurzel-Komponentenvorlage {#in-dom-root-component-template}

Wenn wir Vue ohne Build-Schritt verwenden, können wir das Template unserer Root-Komponente direkt in den Mount-Container schreiben:

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
