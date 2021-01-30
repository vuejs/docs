# Template Refs

> Cette section utilise la syntaxe des [composants à fichier unique](single-file-component.html) pour les exemples de code

> Ce guide suppose que vous avez déjà lu l '[introduction du Composition API](composition-api-introduction.html) et les [Fondamentaux de la réactivité](reactivity-fundamentals.html). Lisez cela d'abord si vous êtes nouveau dans le composition API.

Lors de l'utilisation du Composition API, le concept de [refs réactifs](reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs) et [template refs](component-template-refs.html) sont unifiés. Afin d'obtenir une référence à un élément dans le template ou à une instance de composant, nous pouvons déclarer une ref comme d'habitude et la retourner depuis [setup ()](composition-api-setup.html):

```html
<template>
  <div ref="root">Ceci est un élément racine</div>
</template>

<script>
  import { ref, onMounted } from 'vue'

  export default {
    setup() {
      const root = ref(null)

      onMounted(() => {
        // l'élément DOM sera affecté à la référence après le rendu initial
        console.log(root.value) // <div>eci est un élément racine</div>
      })

      return {
        root
      }
    }
  }
</script>
```

Ici, nous exposons `root` sur le contexte de rendu et le lions à la div comme sa référence via `ref="root"`. Dans l'algorithme de correction du DOM virtuel, si la clé `ref` d'un VNode correspond à une référence dans le contexte de rendu, l'élément ou l'instance de composant correspondant du VNode sera affecté à la valeur de cette référence. Ceci est effectué pendant le processus de montage/patch du DOM virtuel, de sorte que les refs de template ne recevront des valeurs assignées qu'après le rendu

Refs used as templates refs behave just like any other refs: they are reactive and can be passed into (or returned from) composition functions.

## Usage avec JSX

```js
export default {
  setup() {
    const root = ref(null)

    return () =>
      h('div', {
        ref: root
      })

    // avec JSX
    return () => <div ref={root} />
  }
}
```

## Usage à l'interieur de `v-for`

Les refs de template du composition API n'ont pas de traitement spécial lorsqu'elles sont utilisées à l'intérieur de `v-for`. Au lieu de cela, utilisez des refs de fonction pour effectuer une gestion personnalisée:

```html
<template>
  <div v-for="(item, i) in list" :ref="el => { if (el) divs[i] = el }">
    {{ item }}
  </div>
</template>

<script>
  import { ref, reactive, onBeforeUpdate } from 'vue'

  export default {
    setup() {
      const list = reactive([1, 2, 3])
      const divs = ref([])

      // assurez-vous de réinitialiser les refs avant chaque mise à jour
      onBeforeUpdate(() => {
        divs.value = []
      })

      return {
        list,
        divs
      }
    }
  }
</script>
```
