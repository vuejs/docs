# Lebenszyklus-Haken {#lifecycle-hooks}

Jede Vue-Komponenteninstanz durchläuft eine Reihe von Initialisierungsschritten, wenn sie erstellt wird - zum Beispiel muss sie die Datenbeobachtung einrichten, das Template kompilieren, die Instanz in das DOM einbinden und das DOM aktualisieren, wenn sich Daten ändern. Auf dem Weg dorthin werden auch Funktionen ausgeführt, die als Lifecycle Hooks bezeichnet werden und den Benutzern die Möglichkeit geben, ihren eigenen Code in bestimmten Phasen hinzuzufügen.

## Registrierung von Lebenszyklus-Hooks {#registering-lifecycle-hooks}

Zum Beispiel, die <span class="composition-api">`onMounted`</span><span class="options-api">`mounted`</span> Hook kann verwendet werden, um Code auszuführen, nachdem die Komponente das erste Rendering abgeschlossen und die DOM-Knoten erstellt hat:

<div class="composition-api">

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  mounted() {
    console.log(`das Bauteil ist nun montiert.`)
  }
}
```

</div>

Es gibt auch andere Hooks, die in verschiedenen Phasen des Lebenszyklus der Instanz aufgerufen werden, wobei die am häufigsten verwendeten sind <span class="composition-api">[`onMounted`](/api/composition-api-lifecycle.html#onmounted), [`onUpdated`](/api/composition-api-lifecycle.html#onupdated), and [`onUnmounted`](/api/composition-api-lifecycle.html#onunmounted).</span><span class="options-api">[`mounted`](/api/options-lifecycle.html#mounted), [`updated`](/api/options-lifecycle.html#updated), and [`unmounted`](/api/options-lifecycle.html#unmounted).</span>

<div class="options-api">

Alle Lifecycle-Hooks werden mit ihrem `this`-Kontext aufgerufen, der auf die aktuell aktive Instanz zeigt, die sie aufruft. Dies bedeutet, dass Sie die Verwendung von Pfeilfunktionen bei der Deklaration von Lifecycle-Hooks vermeiden sollten, da Sie sonst nicht in der Lage sind, über "this" auf die Komponenteninstanz zuzugreifen.

</div>

<div class="composition-api">

Beim Aufruf von `onMounted` assoziiert Vue automatisch die registrierte Callback-Funktion mit der aktuell aktiven Komponenteninstanz. Dies erfordert, dass diese Hooks **synchron** während der Einrichtung der Komponente registriert werden. Zum Beispiel, tun Sie dies nicht:

```js
setTimeout(() => {
  onMounted(() => {
    // this won't work.
  })
}, 100)
```

Beachten Sie, dass dies nicht bedeutet, dass der Aufruf lexikalisch innerhalb von `setup()` oder `<script setup>` platziert werden muss. `onMounted()` kann in einer externen Funktion aufgerufen werden, solange der Aufrufstapel synchron ist und aus `setup()` stammt.

</div>

## Lebenszyklus-Diagramm {#lifecycle-diagram}

Im Folgenden finden Sie ein Diagramm für den Lebenszyklus einer Instanz. Sie müssen im Moment nicht alles verstehen, aber wenn Sie mehr lernen und bauen, wird es eine nützliche Referenz sein.

![Diagramm des Lebenszyklus einer Komponente](./images/lifecycle.png)

<!-- https://www.figma.com/file/Xw3UeNMOralY6NV7gSjWdS/Vue-Lifecycle -->

In der <span class="composition-api">[API-Referenz für Lebenszyklus-Hooks](/api/composition-api-lifecycle.html)</span> inden Sie Einzelheiten zu allen Lebenszyklus-Hooks und ihren jeweiligen Anwendungsfällen.
