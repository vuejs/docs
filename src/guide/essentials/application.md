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

Vue wird automatisch das `innerHTML` des Containers als Template verwenden, wenn die Wurzelkomponente nicht bereits eine `template` Option hat.

## App-Konfigurationen {#app-configurations}

Die Anwendungsinstanz stellt ein `config`-Objekt zur Verfügung, mit dem wir einige Optionen auf Anwendungsebene konfigurieren können, z. B. die Definition eines Fehlerbehandlungsprogramms auf Anwendungsebene, das Fehler von allen untergeordneten Komponenten auffängt:

```js
app.config.errorHandler = (err) => {
  /* handle error */
}
```

Die Anwendungsinstanz bietet auch einige Methoden für die Registrierung von Assets, die unter die Anwendung fallen. Zum Beispiel die Registrierung einer Komponente:

```js
app.component('TodoDeleteButton', TodoDeleteButton)
```

Dadurch wird der "ToDeleteButton" überall in unserer Anwendung verfügbar. Wir werden die Registrierung für Komponenten und andere Arten von Assets in späteren Abschnitten des Handbuchs besprechen. Sie können auch die vollständige Liste der Anwendungsinstanz-APIs in der [API-Referenz](/api/application) einsehen.

Stellen Sie sicher, dass Sie alle Anwendungskonfigurationen anwenden, bevor Sie die Anwendung installieren!

## Mehrere Anwendungsinstanzen {#multiple-application-instances}

Sie sind nicht auf eine einzige Anwendungsinstanz auf der gleichen Seite beschränkt. Die `createApp` API erlaubt die Koexistenz mehrerer Vue Anwendungen auf der gleichen Seite, jede mit ihrem eigenen Bereich für Konfiguration und globale Assets:

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

Wenn Sie Vue zur Verbesserung von servergerendertem HTML verwenden und Vue nur zur Steuerung bestimmter Teile einer großen Seite benötigen, sollten Sie es vermeiden, eine einzelne Vue-Anwendungsinstanz auf der gesamten Seite zu mounten. Erstellen Sie stattdessen mehrere kleine Anwendungsinstanzen und binden Sie sie in die Elemente ein, für die sie verantwortlich sind.
