# Composition API

> Cette section utilise la syntaxe des [composant à fichier unique](../guide/single-file-component.html) pour les examples

## `setup`

Une option de composant qui est exécutée **avant** que le composant ne soit créé, une fois que les `props` sont résolus, et sert de point d'entrée pour le composition API.

- **Arguments:**

  - `{Data} props`
  - `{SetupContext} context`

- **Typing**:

```ts
interface Data {
  [key: string]: unknown
}

interface SetupContext {
  attrs: Data
  slots: Slots
  emit: (event: string, ...args: unknown[]) => void
}

function setup(props: Data, context: SetupContext): Data
```

::: tip
Pour obtenir une inférence de type pour les arguments passés à `setup ()`, l'utilisation de [defineComponent](global-api.html#definecomponent) est nécessaire.
:::

- **Exemple**

  Avec le template:

  ```vue-html
  <!-- MyBook.vue -->
  <template>
    <div>{{ readersNumber }} {{ book.title }}</div>
  </template>

  <script>
    import { ref, reactive } from 'vue'

    export default {
      setup() {
        const readersNumber = ref(0)
        const book = reactive({ title: 'Vue 3 Guide' })

        // exposer au template
        return {
          readersNumber,
          book
        }
      }
    }
  </script>
  ```

  Avec la fonction de rendu:

  ```js
  // MyBook.vue

  import { h, ref, reactive } from 'vue'

  export default {
    setup() {
      const readersNumber = ref(0)
      const book = reactive({ title: 'Vue 3 Guide' })
      // Veuillez noter que nous devons exposer explicitement la valeur de ref ici
      return () => h('div', [readersNumber.value, book.title])
    }
  }
  ```

- **Voir**: [Composition API `setup`](../guide/composition-api-setup.html)

## Lifecycle Hooks

Les ancrages de cycle de vie (lifecycle hooks) peuvent être enregistrés avec les fonctions `onX` importées directement:

```js
import { onMounted, onUpdated, onUnmounted } from 'vue'

const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
  }
}
```

Ces fonctions ne peuvent être utilisées que de manière synchrone pendant [`setup()`](#setup), car elles reposent sur l'état global interne pour localiser l'instance active actuelle (l'instance de composant sur laquelle `setup ()` est appelée). Les appeler sans instance active actuelle entraînera une erreur.

Le contexte de l'instance du composant est également défini lors de l'exécution synchrone des hooks de cycle de vie. En conséquence, les "watchers" et les propriétés "computed" créés de manière synchrone à l'intérieur des hooks sont également automatiquement supprimés lorsque le composant est démonté.

- **Correspondance entre les options de cycle de vie de l'API Options et le composition API**

  - ~~`beforeCreate`~~ -> utiliser `setup()`
  - ~~`created`~~ -> utiliser `setup()`
  - `beforeMount` -> `onBeforeMount`
  - `mounted` -> `onMounted`
  - `beforeUpdate` -> `onBeforeUpdate`
  - `updated` -> `onUpdated`
  - `beforeUnmount` -> `onBeforeUnmount`
  - `unmounted` -> `onUnmounted`
  - `errorCaptured` -> `onErrorCaptured`
  - `renderTracked` -> `onRenderTracked`
  - `renderTriggered` -> `onRenderTriggered`

- **Voir aussi**: [Composition API lifecycle hooks](../guide/composition-api-lifecycle-hooks.html)

## Provide / Inject

`provide` et `inject` active l'injection de dépendances. Les deux ne peuvent être appelés que pendant [`setup()`](#setup) avec une instance active courante.

- **Typing**:

```ts
interface InjectionKey<T> extends Symbol {}

function provide<T>(key: InjectionKey<T> | string, value: T): void

// sans valeur par defaut
function inject<T>(key: InjectionKey<T> | string): T | undefined
// avec une valeur par defaut
function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T
// avec une factory
function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: () => T,
  treatDefaultAsFactory: true
): T
```

Vue fournit une interface `InjectionKey` qui est un type générique qui hérite de ` Symbol`. Il peut être utilisé pour synchroniser le type de la valeur injectée entre le fournisseur et le consommateur:

```ts
import { InjectionKey, provide, inject } from 'vue'

const key: InjectionKey<string> = Symbol()

provide(key, 'foo') // fournir une valeur non-string entraînera une erreur

const foo = inject(key) // type de foo: string | undefined
```

Si vous utilisez des clés de string ou des symboles non typés, le type de la valeur injectée devra être explicitement déclaré:

```ts
const foo = inject<string>('foo') // string | undefined
```

- **Voir aussi**:
  - [Provide / Inject](../guide/component-provide-inject.html)
  - [Composition API Provide / Inject](../guide/composition-api-provide-inject.html)

## `getCurrentInstance`

`getCurrentInstance` permet d'accéder à une instance de composant interne. Utile pour les utilisations avancées ou pour les créateurs de librairies.

```ts
import { getCurrentInstance } from 'vue'

const MyComponent = {
  setup() {
    const internalInstance = getCurrentInstance()

    internalInstance.appContext.config.globalProperties // acceder aux globalProperties
  }
}
```

`getCurrentInstance` marche **seulement** durant [setup](#setup) ou les [Lifecycle Hooks](#lifecycle-hooks)

> Lorsque vous utilisez en dehors de [setup](#setup) ou [Lifecycle Hooks](#lifecycle-hooks), veuillez appeler `getCurrentInstance()` sur `setup` et utiliser l'instance à la place.

```ts
const MyComponent = {
  setup() {
    const internalInstance = getCurrentInstance() // ok!

    const id = useComponentId() // ok!

    const handleClick = () => {
      getCurrentInstance() // pas ok!
      useComponentId() // pas ok!

      internalInstance // ok!
    }

    onMounted(() => {
      getCurrentInstance() // ok!
    })

    return () =>
      h(
        'button',
        {
          onClick: handleClick
        },
        `uid: ${id}`
      )
  }
}

// ok aussi s'il est appelé sur un composable
function useComponentId() {
  return getCurrentInstance().uid
}
```
