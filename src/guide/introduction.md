---
footer: false
---

# Einführung {#introduction}

:::info Sie lesen gerade die Dokumentation für Vue 3!

- Die Vue 2 Dokumentation wurde nach [v2.vuejs.org](https://v2.vuejs.org/) verschoben.
- Upgraden Sie von Vue 2? Schauen Sie sich den [Migration Guide](https://v3-migration.vuejs.org/) an.
  :::

<style src="@theme/styles/vue-mastery.css"></style>
<div class="vue-mastery-link">
  <a href="https://www.vuemastery.com/courses-path/beginner" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description">Vue lernen mit Video-Tutorials auf <span>VueMastery.com</span></p>
    <div class="logo-wrapper">
        <img alt="Vue Mastery Logo" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>

## Was ist Vue? {#what-is-vue}

Vue (pronounced /vjuː/, like **view**) ist ein JavaScript-Framework zur Erstellung von Benutzeroberflächen. Es baut auf Standard-HTML, -CSS und -JavaScript auf und bietet ein deklaratives und komponentenbasiertes Programmiermodell, das Sie bei der effizienten Entwicklung einfacher oder komplexer Benutzeroberflächen unterstützt.

Hier ist ein kleines Beispiel:

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

```vue-html
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

**Resultat**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<div class="demo">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>

Das oben genannte Beispiel demonstriert die beiden Kernfunktionen von Vue:

- **Deklaratives Rendering**: Vue erweitert den HTML-Standard um eine Template-Syntax, die es uns ermöglicht, die HTML-Ausgabe auf der Grundlage des JavaScript-Status deklarativ zu beschreiben.

- **Reaktivität**: Vue trackt automatisch JavaScript-Zustandsänderungen und aktualisiert das DOM effizient, wenn Änderungen auftreten.

Vielleicht haben Sie bereits Fragen - keine Sorge. Wir werden jedes kleine Detail im Rest der Dokumentation behandeln. Für den Moment lesen Sie bitte weiter, damit Sie ein grundlegendes Verständnis für die Möglichkeiten von Vue bekommen.

:::tip Voraussetzungen
Der Rest der Dokumentation setzt grundlegende Kenntnisse in HTML, CSS und JavaScript voraus. Wenn Sie völlig neu in der Frontend-Entwicklung sind, ist es vielleicht nicht die beste Idee, gleich in ein Framework einzusteigen - machen Sie sich mit den Grundlagen vertraut und kommen Sie dann wieder! Sie können Ihren Kenntnisstand mit [dieser JavaScript-Übersicht überprüfen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript). Frühere Erfahrungen mit anderen Frameworks sind hilfreich, aber nicht erforderlich.
:::

## Das Progressive Framework {#the-progressive-framework}

Vue ist ein Framework und Ecosystem, das die meisten der gängigen Funktionen abdeckt, die in der Frontend-Entwicklung benötigt werden. Aber das Web ist extrem vielfältig - die Dinge, die wir im Web bauen, können in Form und Umfang drastisch variieren. Aus diesem Grund ist Vue so konzipiert, dass es flexibel und schrittweise anpassbar ist. Je nach Anwendungsfall kann Vue auf unterschiedliche Weise eingesetzt werden:

- Erweitern von statischem HTML ohne Build-Schritt
- Einbettung als Webkomponenten auf einer beliebigen Seite
- Einzelseitige Bewerbung (SPA)
- Fullstack / Server-seitiges Rendering (SSR)
- Jamstack / Statische Website-Generierung (SSG)
- Für Desktop, Mobile, WebGL und sogar das Terminal

Wenn Sie diese Konzepte einschüchternd finden, machen Sie sich keine Sorgen! Für das Tutorial und den Leitfaden sind nur grundlegende HTML- und JavaScript-Kenntnisse erforderlich, und Sie sollten in der Lage sein, den Ausführungen zu folgen, ohne ein Experte auf diesem Gebiet zu sein.

Wenn Sie ein erfahrener Entwickler sind, der sich dafür interessiert, wie man Vue am besten in seinen Stack integriert, oder wenn Sie neugierig sind, was diese Begriffe bedeuten, diskutieren wir sie ausführlicher in [Arten der Verwendung von Vue](/guide/extras/ways-of-using-vue).

Trotz der Flexibilität ist das Kernwissen über die Funktionsweise von Vue für all diese Anwendungsfälle gleich. Selbst wenn Sie jetzt nur ein Anfänger sind, wird das Wissen, das Sie auf dem Weg gewonnen haben, nützlich bleiben, wenn Sie wachsen, um in Zukunft ehrgeizigere Ziele anzugehen. Wenn Sie ein Veteran sind, können Sie den optimalen Weg wählen, um Vue zu nutzen, basierend auf den Problemen, die Sie zu lösen versuchen, während Sie die gleiche Produktivität beibehalten. Aus diesem Grund nennen wir Vue "The Progressive Framework": Es ist ein Framework, das mit Ihnen wachsen und sich Ihren Bedürfnissen anpassen kann.

## Single-File-Komponenten {#single-file-components}

In den meisten Build-Tool-aktivierten Vue-Projekten werden Vue-Komponenten in einem HTML-ähnlichen Dateiformat namens **Single-File Component** erstellt (auch bekannt als `*.vue` Dateien, abgekürzt als **SFC**). Eine Vue-SFC kapselt, wie der Name schon sagt, die Logik (JavaScript), das Template (HTML) und die Stile (CSS) der Komponente in einer einzigen Datei. Hier ist das vorherige Beispiel, geschrieben im SFC-Format:

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Zählen ist: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

SFC ist ein entscheidendes Merkmal von Vue und ist der empfohlene Weg, um Vue-Komponenten zu erstellen, **wenn** Ihr Anwendungsfall ein Build-Setup rechtfertigt. Sie können mehr über das [wie und Warum von SFC](/guide/scaling-up/sfc) erfahren in seinem speziellen Bereich - aber für jetzt, nur wissen, dass Vue wird alle Build-Tools Setup für Sie behandeln.

## API-Stile {#api-styles}

Vue-Komponenten können in zwei verschiedenen API-Stilen erstellt werden: **Options API** and **Composition API**.

### Options API {#options-api}

Mit der Options-API definieren wir die Logik einer Komponente mithilfe eines Objekts von Optionen wie `data`, `methods`, und `mounted`. Die durch die Optionen definierten Eigenschaften werden innerhalb der Funktionen auf  `dies` ausgesetzt, das auf die Komponenteninstanz verweist:

```vue
<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      count: 0
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event listeners in templates.
  methods: {
    increment() {
      this.count++
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Anzahl ist: {{ count }}</button>
</template>
```

[Versuchen Sie es auf dem Spielplatz](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gcmVhY3RpdmUgc3RhdGVcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG5cbiAgLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbiAgbWV0aG9kczoge1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgIHRoaXMuY291bnQrK1xuICAgIH1cbiAgfSxcblxuICAvLyBsaWZlY3ljbGUgaG9va3NcbiAgbW91bnRlZCgpIHtcbiAgICBjb25zb2xlLmxvZyhgVGhlIGluaXRpYWwgY291bnQgaXMgJHt0aGlzLmNvdW50fS5gKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPkNvdW50IGlzOiB7eyBjb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4ifQ==)

### Composition API {#composition-api}

Mit der Composition API definieren wir die Logik einer Komponente mithilfe importierter API-Funktionen. In SFCs wird die Kompositions-API typischerweise mit [`<script setup>`](/api/sfc-script-setup). Das `setup` -Attribut ist ein Hinweis, der Vue dazu veranlasst, Compile-Time-Transformationen durchzuführen, die es uns ermöglichen, Composition API mit weniger Boilerplate zu verwenden. Zum Beispiel sind Importe und Top-Level-Variablen / Funktionen, die in `<script setup>` deklariert sind, direkt in der Vorlage verwendbar.

Hier ist die gleiche Komponente, mit genau der gleichen Vorlage, aber unter Verwendung von Composition API und  `<script setup>` statt:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG4vLyByZWFjdGl2ZSBzdGF0ZVxuY29uc3QgY291bnQgPSByZWYoMClcblxuLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbmZ1bmN0aW9uIGluY3JlbWVudCgpIHtcbiAgY291bnQudmFsdWUrK1xufVxuXG4vLyBsaWZlY3ljbGUgaG9va3Ncbm9uTW91bnRlZCgoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBUaGUgaW5pdGlhbCBjb3VudCBpcyAke2NvdW50LnZhbHVlfS5gKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b24gQGNsaWNrPVwiaW5jcmVtZW50XCI+Q291bnQgaXM6IHt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

### Was soll ich wählen? {#which-to-choose}

Both API styles are fully capable of covering common use cases. They are different interfaces powered by the exact same underlying system. In fact, the Options API is implemented on top of the Composition API! The fundamental concepts and knowledge about Vue are shared across the two styles.

The Options API is centered around the concept of a "component instance" (`this` as seen in the example), which typically aligns better with a class-based mental model for users coming from OOP language backgrounds. It is also more beginner-friendly by abstracting away the reactivity details and enforcing code organization via option groups.

The Composition API is centered around declaring reactive state variables directly in a function scope and composing state from multiple functions together to handle complexity. It is more free-form and requires an understanding of how reactivity works in Vue to be used effectively. In return, its flexibility enables more powerful patterns for organizing and reusing logic.

You can learn more about the comparison between the two styles and the potential benefits of Composition API in the [Composition API FAQ](/guide/extras/composition-api-faq).

If you are new to Vue, here's our general recommendation:

- For learning purposes, go with the style that looks easier to understand to you. Again, most of the core concepts are shared between the two styles. You can always pick up the other style later.

- For production use:

  - Go with Options API if you are not using build tools, or plan to use Vue primarily in low-complexity scenarios, e.g. progressive enhancement.

  - Go with Composition API + Single-File Components if you plan to build full applications with Vue.

You don't have to commit to only one style during the learning phase. The rest of the documentation will provide code samples in both styles where applicable, and you can toggle between them at any time using the **API Preference switches** at the top of the left sidebar.

## Still Got Questions? {#still-got-questions}

Check out our [FAQ](/about/faq).

## Pick Your Learning Path {#pick-your-learning-path}

Different developers have different learning styles. Feel free to pick a learning path that suits your preference - although we do recommend going over all of the content, if possible!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Try the Tutorial</p>
    <p class="next-steps-caption">For those who prefer learning things hands-on.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">Read the Guide</p>
    <p class="next-steps-caption">The guide walks you through every aspect of the framework in full detail.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Check out the Examples</p>
    <p class="next-steps-caption">Explore examples of core features and common UI tasks.</p>
  </a>
</div>
