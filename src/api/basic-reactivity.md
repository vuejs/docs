# Basic Reactivity APIs

> Cette section utilise la syntaxe des [composant à fichier unique](../guide/single-file-component.html) pour les examples

## `reactive`

Retourne une copie réactive de l'objet.

```js
const obj = reactive({ count: 0 })
```

La conversion ractive est "profonde"—elle affecte toutes les propriétés imbriquées. Dans l'implémentation basée sur le [Proxy ES2015](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), le proxy renvoyé n'est **pas** égal à l'objet d'origine. Il est recommandé de travailler exclusivement avec le proxy réactif et d'éviter de s'appuyer sur l'objet original.

**Typing:**

```ts
function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
```

## `readonly`

Prend un objet (réactif ou non) ou un [ref](./refs-api.html#ref) et renvoie un proxy en lecture seule à l'original. Un proxy en lecture seule est profond: toute propriété imbriquée accédée sera également en lecture seule.


```js
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // fonctionne pour le suivi de la réactivité
  console.log(copy.count)
})

// la mutation de l'original déclenchera les observateurs se basant sur la copie
original.count++

// la mutation de la copie échouera et vous aurez un message d'avertissement
copy.count++ // Attention!
```

## `isProxy`

Vérifie si un objet est un proxy créé par [`reactive`](#reactive) ou [`readonly`](#readonly).

## `isReactive`

Vérifie si un objet est un proxy reactif créé par [`reactive`](#reactive).

```js
import { reactive, isReactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      name: 'John'
    })
    console.log(isReactive(state)) // -> true
  }
}
```

Il renvoie également `true` si le proxy est créé par [`readonly`](#readonly), mais encapsule un autre proxy créé par [`reactive`](#reactive).

```js{7-15}
import { reactive, isReactive, readonly } from 'vue'
export default {
  setup() {
    const state = reactive({
      name: 'John'
    })
    // readonly proxy créé à partir d'un objet simple
    const plain = readonly({
      name: 'Mary'
    })
    console.log(isReactive(plain)) // -> false

    // readonly proxy crée à partir d'un proxy reactif
    const stateCopy = readonly(state)
    console.log(isReactive(stateCopy)) // -> true
  }
}
```

## `isReadonly`

Vérifie si un objet est un proxy en lecture seule créé par[`readonly`](#readonly).

## `toRaw`

Renvoie l'objet brut (raw) et original d'un proxy [`reactive`](#reactive) ou [`readonly`](#readonly). Il s'agit d'un moyen qui peut être utilisé pour lire temporairement sans entraîner de surcharge d'accès/suivi du proxy ou d'écrire sans déclencher de modifications. Il n'est **pas** recommandé de conserver une référence persistante à l'objet d'origine. Utiliser avec précaution.


```js
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```

## `markRaw`

Marque un objet pour qu'il ne soit jamais converti en proxy. Renvoie l'objet lui-même.

```js
const foo = markRaw({})
console.log(isReactive(reactive(foo))) // false

// fonctionne également lorsqu'il est imbriqué dans d'autres objets réactifs
const bar = reactive({ foo })
console.log(isReactive(bar.foo)) // false
```

::: warning
`markRaw` et les API shallowXXX ci-dessous vous permettent de désactiver de manière sélective la conversion reactive/readonly profonde par défaut et d'incorporer des objets bruts (raw) sans proxy dans votre graphe d'état. Ils peuvent être utilisés pour diverses raisons:

- Certaines valeurs ne doivent tout simplement pas être rendues réactives, par exemple une instance de classe tierce complexe ou un objet composant Vue.

- Ignorer la conversion de proxy peut améliorer les performances lors du rendu de grandes listes avec des sources de données immuables.

Ils sont considérés comme avancés car la désactivation brute est uniquement au niveau de la racine, donc si vous définissez un objet raw imbriqué et non marqué dans un objet réactif, puis y accédez à nouveau, vous récupérez la version proxy. Cela peut conduire à des **risques d'identité** - c'est-à-dire effectuer une opération qui repose sur l'identité d'objet mais en utilisant à la fois la version raw et la version proxy du même objet:

```js
const foo = markRaw({
  nested: {}
})

const bar = reactive({
  // bien que `foo` soit marqué raw, foo.nested ne l'est pas
  nested: foo.nested
})

console.log(foo.nested === bar.nested) // false
```

Les risques d'identité sont en général rares. Cependant, pour utiliser correctement ces API tout en évitant en toute sécurité les risques d'identité, il faut une solide compréhension du fonctionnement du système de réactivité.
:::

## `shallowReactive`


Crée un proxy réactif qui suit la réactivité de ses propres propriétés mais n'effectue pas de conversion réactive profonde des objets imbriqués (expose les valeurs raw).

```js
const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})

// la mutation des propres propriétés de state est reactive
state.foo++
// ...mais ne convertis pas les objets imbriqués
isReactive(state.nested) // false
state.nested.bar++ // non-reactive
```

## `shallowReadonly`

Crée un proxy qui crée ses propres propriétés en lecture seule, mais n'effectue pas de conversion profonde en lecture seule des objets imbriqués (expose les valeurs brutes)

```js
const state = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2
  }
})

// Tenter de muter les propres propriétés de state echouera
state.foo++
// ...mais fonctionne sur des objets imbriqués
isReadonly(state.nested) // false
state.nested.bar++ // works
```
