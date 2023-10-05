# Berechnete Eigenschaften {#computed-properties}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/computed-properties-in-vue-3" title="Free Vue.js Computed Properties Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-computed-properties-in-vue-with-the-composition-api" title="Free Vue.js Computed Properties Lesson"/>
</div>

## Grundlegendes Beispiel {#basic-example}

Vorlageninterne Ausdrücke sind sehr praktisch, aber sie sind für einfache Operationen gedacht. Wenn Sie zu viel Logik in Ihre Vorlagen einbauen, können diese aufgebläht und schwer zu pflegen werden. Zum Beispiel, wenn wir ein Objekt mit einem verschachtelten Array haben:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
```

</div>

Und wir wollen unterschiedliche Meldungen anzeigen, je nachdem, ob `Autor` bereits einige Bücher hat oder nicht:

```vue-html
<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
```

An diesem Punkt wird die Vorlage ein wenig unübersichtlich. Wir müssen sie eine Sekunde lang betrachten, um zu erkennen, dass sie eine Berechnung in Abhängigkeit von `author.books` durchführt. Noch wichtiger ist, dass wir uns wahrscheinlich nicht wiederholen wollen, wenn wir diese Berechnung mehr als einmal in die Vorlage aufnehmen müssen.

Aus diesem Grund wird für komplexe Logik, die reaktive Daten enthält, die Verwendung einer **berechneten Eigenschaft** empfohlen. Hier ist das gleiche Beispiel, umstrukturiert:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // a computed getter
    publishedBooksMessage() {
      // `this` points to the component instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}
```

```vue-html
<p>Has published books:</p>
<span>{{ publishedBooksMessage }}</span>
```

[Versuchen Sie es auf dem Spielplatz](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXV0aG9yOiB7XG4gICAgICAgIG5hbWU6ICdKb2huIERvZScsXG4gICAgICAgIGJvb2tzOiBbXG4gICAgICAgICAgJ1Z1ZSAyIC0gQWR2YW5jZWQgR3VpZGUnLFxuICAgICAgICAgICdWdWUgMyAtIEJhc2ljIEd1aWRlJyxcbiAgICAgICAgICAnVnVlIDQgLSBUaGUgTXlzdGVyeSdcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBwdWJsaXNoZWRCb29rc01lc3NhZ2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdXRob3IuYm9va3MubGVuZ3RoID4gMCA/ICdZZXMnIDogJ05vJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHA+SGFzIHB1Ymxpc2hlZCBib29rczo8L3A+XG4gIDxzcGFuPnt7IGF1dGhvci5ib29rcy5sZW5ndGggPiAwID8gJ1llcycgOiAnTm8nIH19PC9zcGFuPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Hier haben wir eine berechnete Eigenschaft `publishedBooksMessage` deklariert.

Versuchen Sie, den Wert des Arrays `books` in der Anwendung `data` zu ändern und Sie werden sehen, wie sich `publishedBooksMessage` entsprechend ändert.

Sie können Daten an berechnete Eigenschaften in Templates binden, genau wie eine normale Eigenschaft. Vue ist sich bewusst, dass `this.publishedBooksMessage` von `this.author.books` abhängt, also wird es alle Bindungen, die von `this.publishedBooksMessage` abhängen, aktualisieren, wenn `this.author.books` sich ändert.

Siehe auch: [Typing Computed Properties](/guide/typescript/options-api.html#typing-computed-properties) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// a computed ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

[Versuchen Sie es auf dem Spielplatz](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgYXV0aG9yID0gcmVhY3RpdmUoe1xuICBuYW1lOiAnSm9obiBEb2UnLFxuICBib29rczogW1xuICAgICdWdWUgMiAtIEFkdmFuY2VkIEd1aWRlJyxcbiAgICAnVnVlIDMgLSBCYXNpYyBHdWlkZScsXG4gICAgJ1Z1ZSA0IC0gVGhlIE15c3RlcnknXG4gIF1cbn0pXG5cbi8vIGEgY29tcHV0ZWQgcmVmXG5jb25zdCBwdWJsaXNoZWRCb29rc01lc3NhZ2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBhdXRob3IuYm9va3MubGVuZ3RoID4gMCA/ICdZZXMnIDogJ05vJ1xufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPkhhcyBwdWJsaXNoZWQgYm9va3M6PC9wPlxuICA8c3Bhbj57eyBwdWJsaXNoZWRCb29rc01lc3NhZ2UgfX08L3NwYW4+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

Hier haben wir eine berechnete Eigenschaft `publishedBooksMessage` deklariert. Die Funktion "berechnet()" erwartet die Übergabe einer Getter-Funktion, und der zurückgegebene Wert ist eine **berechnete Referenz**. Ähnlich wie bei normalen Refs kann man auf das berechnete Ergebnis als `publishedBooksMessage.value` zugreifen. Berechnete Refs werden auch automatisch in Templates entpackt, so dass man sie ohne `.value` in Template-Ausdrücken referenzieren kann.

Eine berechnete Eigenschaft verfolgt automatisch ihre reaktiven Abhängigkeiten. Vue ist sich bewusst, dass die Berechnung von `publishedBooksMessage` von `author.books` abhängt, also wird es alle Bindungen, die von `publishedBooksMessage` abhängen, aktualisieren, wenn sich `author.books` ändert.

Siehe auch: [Typing Computed](/guide/typescript/composition-api.html#typing-computed) <sup class="vt-badge ts" />

</div>

## Berechnetes Caching vs. Methoden {#computed-caching-vs-methods}

Sie haben vielleicht bemerkt, dass wir das gleiche Ergebnis durch den Aufruf einer Methode im Ausdruck erreichen können:

```vue-html
<p>{{ calculateBooksMessage() }}</p>
```

<div class="options-api">

```js
// in component
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'Yes' : 'No'
  }
}
```

</div>

<div class="composition-api">

```js
// in component
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Yes' : 'No'
}
```

</div>

Anstelle einer berechneten Eigenschaft können wir die gleiche Funktion als Methode definieren. Was das Endergebnis betrifft, sind die beiden Ansätze tatsächlich genau gleich. Der Unterschied besteht jedoch darin, dass **berechnete Eigenschaften auf der Grundlage ihrer reaktiven Abhängigkeiten zwischengespeichert werden.** Eine berechnete Eigenschaft wird nur dann neu ausgewertet, wenn sich einige ihrer reaktiven Abhängigkeiten geändert haben. Das heißt, solange sich `author.books` nicht geändert hat, wird ein mehrfacher Zugriff auf `publishedBooksMessage` sofort das zuvor berechnete Ergebnis zurückgeben, ohne dass die Getter-Funktion erneut ausgeführt werden muss.

Das bedeutet auch, dass die folgende berechnete Eigenschaft nie aktualisiert wird, da "date.now()" keine reaktive Abhängigkeit ist:

<div class="options-api">

```js
computed: {
  now() {
    return Date.now()
  }
}
```

</div>

<div class="composition-api">

```js
const now = computed(() => Date.now())
```

</div>

Im Vergleich dazu wird bei einem Methodenaufruf die Funktion **immer** ausgeführt, wenn eine Neuberechnung erfolgt.

Warum brauchen wir eine Zwischenspeicherung? Stellen Sie sich vor, wir haben eine teure berechnete Eigenschaft `list`, die eine Schleife durch ein großes Array und viele Berechnungen erfordert. Dann haben wir vielleicht andere berechnete Eigenschaften, die wiederum von `list` abhängen. Ohne Zwischenspeicherung würden wir den Getter von `list` viel öfter als nötig ausführen! In Fällen, in denen Sie keine Zwischenspeicherung wünschen, verwenden Sie stattdessen einen Methodenaufruf.

## Beschreibbar Berechnet {#writable-computed}

Berechnete Eigenschaften sind standardmäßig nur Getter-Eigenschaften. Wenn Sie versuchen, einer berechneten Eigenschaft einen neuen Wert zuzuweisen, erhalten Sie eine Laufzeitwarnung. In den seltenen Fällen, in denen Sie eine "beschreibbare" berechnete Eigenschaft benötigen, können Sie eine erstellen, indem Sie sowohl einen Getter als auch einen Setter bereitstellen:

<div class="options-api">

```js
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        [this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
}
```

Wenn Sie nun `this.fullName = 'John Doe'` ausführen, wird der Setter aufgerufen und `this.firstName` und `this.lastName` werden entsprechend aktualisiert.

</div>

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

Wenn Sie nun `fullName.value = 'John Doe'` ausführen, wird der Setter aufgerufen und `firstName` und `lastName` werden entsprechend aktualisiert.

</div>

## Beste Praktiken {#best-practices}

### Getter sollten nebenwirkungsfrei sein {#getters-should-be-side-effect-free}

Es ist wichtig, daran zu denken, dass berechnete Getter-Funktionen nur reine Berechnungen durchführen und frei von Nebeneffekten sein sollten. Stellen Sie sich eine berechnete Eigenschaft als eine deklarative Beschreibung vor, die beschreibt, wie ein Wert auf der Grundlage anderer Werte abgeleitet wird - ihre einzige Aufgabe sollte die Berechnung und Rückgabe dieses Wertes sein. Später im Handbuch werden wir besprechen, wie wir Seiteneffekte in Reaktion auf Zustandsänderungen mit [watchers](./watchers).

### Mutation des berechneten Wertes vermeiden {#avoid-mutating-computed-value}

Der von einer berechneten Eigenschaft zurückgegebene Wert ist ein abgeleiteter Zustand. Betrachten Sie ihn als einen temporären Schnappschuss - jedes Mal, wenn sich der Quellzustand ändert, wird ein neuer Schnappschuss erstellt. Es ist nicht sinnvoll, einen Schnappschuss zu verändern, daher sollte ein berechneter Rückgabewert als schreibgeschützt behandelt und niemals verändert werden - aktualisieren Sie stattdessen den Quellzustand, von dem er abhängt, um neue Berechnungen auszulösen.
