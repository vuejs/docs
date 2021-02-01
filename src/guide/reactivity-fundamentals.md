# Fondamentaux de la réactivité

## Declarer un état réactif

Pour créer un état réactif à partir d'un objet JavaScript, nous pouvons utiliser une méthode `reactive`:

```js
import { reactive } from 'vue'

// état réactif
const state = reactive({
  count: 0
})
```

`reactive` est l'équivalent de l'API `Vue.observable()` dans Vue 2.x, renommée pour éviter toute confusion avec les observables RxJS. Ici, l'état renvoyé est un objet réactif. La conversion réactive est "profonde" - elle affecte toutes les propriétés imbriquées de l'objet passé.

Le cas d'utilisation essentiel de l'état réactif dans Vue est que nous pouvons l'utiliser pendant le rendu. Grâce au suivi des dépendances, la vue se met automatiquement à jour lorsque l'état réactif change.

C'est l'essence même du système de réactivité de Vue. Lorsque vous retournez un objet depuis `data()` dans un composant, il est rendu réactif en interne par `reactive()`. Le template est compilé dans une [fonction de rendu](render-function.html) qui utilise ces propriétés réactives.

Vous pouvez en savoir plus sur `reactive` dans la section [Base de l'API Reactivity](../api/basic-reactivity.html)

## Création de valeurs réactives autonomes en tant que `refs`

Imaginez le cas où nous avons une valeur primitive autonome (par exemple, string) et nous voulons la rendre réactive. Bien sûr, nous pourrions créer un objet avec une seule propriété égale à notre string et le passer à `reactive`. Vue a une méthode qui fera la même chose pour nous - c'est une `ref`:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref` retournera un objet réactif et mutable qui sert de **réf**érence réactive à la valeur interne qu'il contient - c'est de là que vient le nom. Cet objet contient la seule propriété nommée `value`:

```js
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

### Accès dans une ref

Lorsqu'une ref est retournée en tant que propriété dans le contexte de rendu (l'objet renvoyé par [setup ()](composition-api-setup.html)) et accédée dans le template, elle accède automatiquement à la valeur interne. Il n'est pas nécessaire d'ajouter `.value` dans le template:

```vue-html
<template>
  <div>
    <span>{{ count }}</span>
    <button @click="count ++">Increment count</button>
  </div>
</template>

<script>
  import { ref } from 'vue'
  export default {
    setup() {
      const count = ref(0)
      return {
        count
      }
    }
  }
</script>
```

### Accès dans les objets réactifs

Lorsqu'une `ref` est accédée ou mutée en tant que propriété d'un objet `reactive`, il _unwrap_ automatiquement la valeur interne afin qu'elle se comporte comme une propriété normale:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

Si une nouvelle ref est attribuée à une propriété liée à une ref existante, elle remplacera l'ancienne ref:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
console.log(count.value) // 1
```

Le déballage des refs se produit uniquement lorsqu'elles sont imbriqué dans un objet _reactive_. Aucun déballage n'est effectué lorsque la ref est accédée à partir d'un `Array` ou d'un type de collection natif comme [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map):

```js
const books = reactive([ref('Vue 3 Guide')])
// besoin de .value ici
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// besoin de .value ici
console.log(map.get('count').value)
```

## Destructuration des états réactifs

Lorsque nous voulons utiliser quelques propriétés d'un gros objet `reactive`, il peut être tentant d'utiliser la [destructuaration de ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) pour obtenir les propriétés que nous voulons:

```js
import { reactive } from 'vue'

const book = reactive({
  author: 'Vue Team',
  year: '2020',
  title: 'Vue 3 Guide',
  description: 'You are reading this book right now ;)',
  price: 'free'
})

let { author, title } = book
```

Malheureusement, avec une telle déstructuration, la réactivité des deux propriétés serait perdue. Dans un tel cas, nous devons convertir notre objet _reactive_ en un ensemble de refs. Ces refs conserveront la connexion réactive à l'objet source:

```js
import { reactive, toRefs } from 'vue'

const book = reactive({
  author: 'Vue Team',
  year: '2020',
  title: 'Vue 3 Guide',
  description: 'You are reading this book right now ;)',
  price: 'free'
})

let { author, title } = toRefs(book)

//nous devons utiliser .value comme title est une ref maintenant
title.value = 'Vue 3 Detailed Guide'
console.log(book.title) // 'Vue 3 Detailed Guide'
```

Vous pouvez en savoir plus sur `refs` dans la section de l'[API des refs](../api/refs-api.html#ref)

## Empêcher la mutation des objets réactifs avec `readonly`

Parfois, nous voulons suivre les modifications de l'objet réactif (`ref` ou `reactive`) mais nous voulons également éviter de le changer à partir d'un certain endroit de l'application. Par exemple, lorsque nous avons un objet réactif fourni avec [provide](component-provide-inject.html) nous voulons éviter de le muter là où il est injecté. Pour ce faire, nous pouvons créer un proxy en lecture seule vers l'objet d'origine:

```js
import { reactive, readonly } from 'vue'

const original = reactive({ count: 0 })

const copy = readonly(original)

// la mutation de l'original déclenchera les observateurs se basant sur la copie
original.count++

// la mutation de la copie échouera et en resultera un avertissement
copy.count++ // warning: "Set operation on key 'count' failed: target is readonly."
```
