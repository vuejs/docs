# Attributs Spéciaux

## key

- **Devrait être:** `number | string`

  L'attribut spécial `key` est principalement utilisé comme un indice pour l'algorithme du DOM virtuel de Vue pour identifier les VNodes lors de la comparaison de la nouvelle liste de nœuds avec l'ancienne. Sans clés, Vue utilise un algorithme qui minimise le mouvement des éléments et essaie de patcher/réutiliser les éléments du même type sur place autant que possible. Avec les clés, il réorganisera les éléments en fonction du changement d'ordre des clés, et les éléments avec des clés qui ne sont plus présentes seront toujours supprimés/détruits.

  Les enfants du même parent commun doivent avoir des **clés uniques**. Les clés dupliquées entraîneront des erreurs de rendu.
  
  Le cas d'utilisation le plus courant est de le combiné avec `v-for`:

  ```html
  <ul>
    <li v-for="item in items" :key="item.id">...</li>
  </ul>
  ```

  Il peut également être utilisé pour forcer le remplacement d'un élément/composant au lieu de le réutiliser. Cela peut être utile lorsque vous souhaitez:

  - Déclenchez correctement les hooks de cycle de vie d'un composant
  - Déclencher les transitions

  Par exemple:

  ```html
  <transition>
    <span :key="text">{{ text }}</span>
  </transition>
  ```

  Lorsque `text` change, le `<span> `sera toujours remplacé au lieu d'être corrigé, donc une transition sera déclenchée.

## ref

- **Devrait être:** `string | Function`

  `ref` est utilisé pour enregistrer une référence à un élément ou à un composant enfant. La référence sera enregistrée sous l'objet `$refs` du composant parent. S'il est utilisé sur un élément simple du DOM, la référence sera cet élément; s'il est utilisé sur un composant enfant, la référence sera l'instance du composant:

  ```html
  <!-- vm.$refs.p sera le nœud DOM -->
  <p ref="p">hello</p>

  <!-- vm.$refs.child sera l'instance du composant enfant -->
  <child-component ref="child"></child-component>

  <!-- Lorsqu'il est lié dynamiquement, nous pouvons définir ref comme une fonction de callback, en passant l'élément ou l'instance de composant explicitement -->
  <child-component :ref="(el) => child = el"></child-component>
  ```

  Une note importante sur le timing d'enregistrement des ref: parce que les refs eux-mêmes sont créés à la suite de la fonction de rendu, vous ne pouvez pas y accéder sur le rendu initial - ils n'existent pas encore! `$refs` est également non réactif, vous ne devez donc pas essayer de l'utiliser dans des modèles pour la liaison de données.

- **Voir aussi:** [Child Component Refs](../guide/component-template-refs.html)

## is

- **Devrait être:** `string | Object (objet d'options du composant)`

Utiliser pour les [composants dynamique](../guide/component-dynamic-async.html).

Par exemple:

```html
<!-- Le composant change quand currentView change -->
<component :is="currentView"></component>
```

- **Voir aussi:**
  - [Dynamic Components](../guide/component-dynamic-async.html)
  - [DOM Template Parsing Caveats](../guide/component-basics.html#dom-template-parsing-caveats)
