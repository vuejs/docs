# Refs

> Cette section utilise la syntaxe des [composant à fichier unique](../guide/single-file-component.html) pour les examples

## `ref`

Prend une valeur interne et renvoie un objet ref réactif et modifiable. L'objet ref a une seule propriété `.value` qui pointe vers la valeur interne.

**Exemple:**

```js
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

Si un objet est assigné comme une valeur ref, l'objet est rendu profondément réactif par la méthode [reactive](./basic-reactivity.html#reactive).

**Typing:**

```ts
interface Ref<T> {
  value: T
}

function ref<T>(value: T): Ref<T>
```

Parfois, nous pouvons avoir besoin de spécifier des types complexes pour la valeur interne d'une ref. Nous pouvons le faire de manière succincte en passant un argument générique lors de l'appel de `ref` pour remplacer l'inférence par défaut:

```ts
const foo = ref<string | number>('foo') // le type de foo: Ref<string | number>

foo.value = 123 // ok!
```

Si le type du générique est inconnu, il est recommandé d'effectuer un cast `ref` à `Ref<T>`:

```ts
function useState<State extends string>(initial: State) {
  const state = ref(initial) as Ref<State> // state.value -> State extends string
  return state
}
```

## `unref`

Renvoie la valeur interne si l'argument est une [`ref`](#ref), sinon renvoie l'argument lui-même. Ceci est une "sugar function" pour `val = isRef(val) ? val.value : val`.

```ts
function useFoo(x: number | Ref<number>) {
  const unwrapped = unref(x) // unwrapped est garanti d'être un number maintenant
}
```

## `toRef`

Peut être utilisé pour créer une [`ref`](#ref) pour une propriété sur un objet réactif source. La référence peut ensuite être transmise, en conservant la connexion réactive à sa propriété source.

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3
```

`toRef` est utile lorsque vous souhaitez passer la ref d'un prop à une fonction de composition:

```js
export default {
  setup(props) {
    useSomeFeature(toRef(props, 'foo'))
  }
}
```

`toRef` retournera une ref utilisable  même si la propriété source n'existe pas encore.  Cela le rend particulièrement utile lorsque vous travaillez avec des props optionnels, qui ne seraient pas repris par [`toRefs`](#torefs).

## `toRefs`

Convertit un objet réactif en un objet simple où chaque propriété de l'objet résultant est une [`ref`](#ref) pointant vers la propriété correspondante de l'objet d'origine.

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)
/*
Type de stateAsRefs:

{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// La ref et la propriété originale sont "liés"
state.foo++
console.log(stateAsRefs.foo.value) // 2

stateAsRefs.foo.value++
console.log(state.foo) // 3
```

`toRefs` est utile lorsqu'on retourne un objet réactif depuis une fonction de composition afin que le composant qui l'utilise puisse déstructurer/spread l'objet retourné sans perdre la réactivité:

```js
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // opération logique sur state

  // convertir en refs quand on le retourne
  return toRefs(state)
}

export default {
  setup() {
    // Peut destructurer sans perdre la reactivité
    const { foo, bar } = useFeatureX()

    return {
      foo,
      bar
    }
  }
}
```

`toRefs` ne générera des refs que pour les propriétés incluses dans l'objet source. Pour créer une ref pour une propriété spécifique, utilisez plutôt [`toRef`](#toref).

## `isRef`

Vérifie si une valeur est un objet ref.

## `customRef`

Crée une ref personnalisée avec un contrôle explicite sur le suivi de ses dépendances et le déclenchement des mises à jour. Il attend une _factory function_ qui reçoit les fonctions `track` et` trigger` comme arguments et doit retourner un objet avec `get` et` set`.

- Exemple utilisant un custom ref pour implémenter debounce avec `v-model`:

  ```html
  <input v-model="text" />
  ```

  ```js
  function useDebouncedRef(value, delay = 200) {
    let timeout
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            value = newValue
            trigger()
          }, delay)
        }
      }
    })
  }

  export default {
    setup() {
      return {
        text: useDebouncedRef('hello')
      }
    }
  }
  ```

**Typing:**

```ts
function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

type CustomRefFactory<T> = (
  track: () => void,
  trigger: () => void
) => {
  get: () => T
  set: (value: T) => void
}
```

## `shallowRef`

Crée une ref qui traque sa propre mutation `.value` mais ne rend pas sa valeur réactive.

```js
const foo = shallowRef({})
// la mutation de la valeur de ref est reactive
foo.value = {}
// mais la valeur ne sera pas convertie.
isReactive(foo.value) // false
```

**Voir aussi**: [Creating Standalone Reactive Values as `refs`](../guide/reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs)

## `triggerRef`

Exécute manuellement n'importe quel effet lié à [`shallowRef`](#shallowref).

```js
const shallow = shallowRef({
  greet: 'Hello, world'
})

// La console affiche "Hello, world" une seule fois au 1er passage
watchEffect(() => {
  console.log(shallow.value.greet)
})

// Ceci ne déclenchera pas l'effet car la ref est shallow
shallow.value.greet = 'Hello, universe'

// Dna la console "Hello, universe"
triggerRef(shallow)
```

**Voir aussi:** [Computed et Watch - watchEffect](./computed-watch-api.html#watcheffect)
