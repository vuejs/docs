# Computed et watch

> Cette section utilise la syntaxe des [composant à fichier unique](../guide/single-file-component.html) pour les examples

## `computed`

Prend une fonction getter et retourne un objet réactif immuable [ref](./refs-api.html#ref) pour la valeur renvoyée par le getter.

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // error
```

Alternativement, il peut prendre un objet avec les fonctions `get` et` set` pour créer un objet ref accessible en écriture.

```js
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: val => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0
```

**Typing:**

```ts
// lecture seulement (read-only)
function computed<T>(getter: () => T): Readonly<Ref<Readonly<T>>>

// accessible en écriture
function computed<T>(options: { get: () => T; set: (value: T) => void }): Ref<T>
```

## `watchEffect`

Exécute une fonction immédiatement tout en suivant de manière réactive ses dépendances et la réexécute chaque fois que les dépendances sont modifiées.

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```

**Typing:**

```ts
function watchEffect(
  effect: (onInvalidate: InvalidateCbRegistrator) => void,
  options?: WatchEffectOptions
): StopHandle

interface WatchEffectOptions {
  flush?: 'pre' | 'post' | 'sync' // default: 'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

interface DebuggerEvent {
  effect: ReactiveEffect
  target: any
  type: OperationTypes
  key: string | symbol | undefined
}

type InvalidateCbRegistrator = (invalidate: () => void) => void

type StopHandle = () => void
```

**Voir aussi**: [`watchEffect` guide](../guide/reactivity-computed-watchers.html#watcheffect)

## `watch`

L'API `watch` est l'équivalent exact de l'API Options [this.$watch](./instance-methods.html#watch) (et l'option correspondant [watch](./options-data.html#watch)). `watch` nécessite d'observer une source de données spécifique et applique les effets secondaires dans une fonction de callback distincte. Il est également paresseux par défaut - c'est-à-dire que le callback n'est appelé que lorsque la source surveillée a changé.

- comparée à [watchEffect](#watcheffect), `watch` nous permet de:

  - Effectuer l'effet secondaire paresseusement ("lazy");
  - Être plus précis sur l'état qui doit déclencher la réexécution de l'observateur;
  - Accédez à la fois à la valeur précédente et actuelle de l'état surveillé.

### Observer une seule source

Une source de données d'un "watcher" peut être soit une fonction getter qui renvoie une valeur, soit directement une [ref](./refs-api.html#ref):

```js
// observer un getter
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// observer directement une ref
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

### Observer plusieurs sources

Un observateur peut également regarder plusieurs sources en même temps à l'aide d'un array:

```js
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})
```

### Comportement partagé `watchEffect`

`watch` partage des comportement avec [`watchEffect`](#watcheffect) en terme de [stoppage manuel](../guide/reactivity-computed-watchers.html#stopping-the-watcher), d'[invalidation des effets secondaires](../guide/reactivity-computed-watchers.html#side-effect-invalidation) (avec `onInvalidate` passé au callback comme troisième argument), de [flush timing](../guide/reactivity-computed-watchers.html#effect-flush-timing) et de [debogage](../guide/reactivity-computed-watchers.html#watcher-debugging).

**Typing:**

```ts
// observation d'une seule source
function watch<T>(
  source: WatcherSource<T>,
  callback: (
    value: T,
    oldValue: T,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options?: WatchOptions
): StopHandle

// observation de plusieurs sources
function watch<T extends WatcherSource<unknown>[]>(
  sources: T
  callback: (
    values: MapSources<T>,
    oldValues: MapSources<T>,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options? : WatchOptions
): StopHandle

type WatcherSource<T> = Ref<T> | (() => T)

type MapSources<T> = {
  [K in keyof T]: T[K] extends WatcherSource<infer V> ? V : never
}

// voir le typage de `watchEffect` pour les options partagéees
interface WatchOptions extends WatchEffectOptions {
  immediate?: boolean // default: false
  deep?: boolean
}
```

**Voir aussi**: [`watch` guide](../guide/reactivity-computed-watchers.html#watch)
