# Composants intégrés

## component

- **Propriétés:**

  - `is` - `string | Component`

- **Usage:**

  Un "meta composant" pour le rendu dynamique des composants. Le composant réel qui est rendu est déterminé par la propriété `is`. Une propriété `is` en tant que chaîne de caractère peut être soit un nom de balise HTML, soit un nom de composant.

- **Exemple:**

  ```html
  <!-- un composant dynamique contrôlé par -->
  <!-- la propriété `componentId` sur le vm -->
  <component :is="componentId"></component>

  <!-- peut également rendre un composant enregistré ou un composant passé comme propriété -->
  <component :is="$options.components.child"></component>

  <!-- peut référencer des composants par une chaîne de caractères -->
  <component :is="condition ? 'FooComponent' : 'BarComponent'"></component>

  <!-- peut être utilisé pour rendre des éléments HTML natifs -->
  <component :is="href ? 'a' : 'span'"></component>
  ```

- **Voir aussi:** [Dynamic Components](../guide/component-dynamic-async.html)

## transition

- **Propriétés:**

  - `name` - `string` Utilisé pour générer automatiquement les noms de classe CSS de transition. par exemple `name: 'fade'` va s'auto-étendre à `.fade-enter`, `.fade-enter-active`, etc.
  - `appear` - `boolean`, S'il faut appliquer la transition au rendu initial. La valeur par défaut est `false`.
  - `persisted` - `boolean`. Si true, indique qu'il s'agit d'une transition qui n'insère/ne supprime pas réellement l'élément, mais bascule le statut show/hidden à la place. Les hooks de transition sont injectés, mais seront ignorés par le moteur de rendu. Au lieu de cela, une directive personnalisée peut contrôler la transition en appelant les hooks injectés (par exemple `v-show`).
  - `css` - `boolean`. S'il faut appliquer des classes de transition CSS. La valeur par défaut est `true`. Si défini sur `false`, ne déclenchera que les hooks JavaScript enregistrés via les événements du composant.
  - `type` - `string`. Spécifie le type d'événements de transition à attendre pour déterminer le moment de la fin de la transition. Les valeurs disponibles sont `"transition"` et `"animation"`. Par défaut, il détectera automatiquement le type qui a une durée plus longue.
  - `mode` - `string` Contrôle la séquence de synchronisation des transitions d'entrée/sortie. Les modes disponibles sont `"out-in"` et `"in-out"`; par défaut, simultané.
  - `duration` - `number | { enter: number, leave: number }`. Spécifie la durée de la transition. Par défaut, Vue attend le premier événement `transitionend` ou` animationend` sur l'élément de transition racine.
  - `enter-from-class` - `string`
  - `leave-from-class` - `string`
  - `appear-class` - `string`
  - `enter-to-class` - `string`
  - `leave-to-class` - `string`
  - `appear-to-class` - `string`
  - `enter-active-class` - `string`
  - `leave-active-class` - `string`
  - `appear-active-class` - `string`

- **Événements:**

  - `before-enter`
  - `before-leave`
  - `enter`
  - `leave`
  - `appear`
  - `after-enter`
  - `after-leave`
  - `after-appear`
  - `enter-cancelled`
  - `leave-cancelled` (`v-show` seulement)
  - `appear-cancelled`

- **Usage:**

  `<transition>` sert d'effets de transition pour un élément/composnat **unique**.  Le `<transition>` applique uniquement le comportement de transition au contenu enveloppé à l'intérieur; il n'affiche pas un élément DOM supplémentaire, ni n'apparaît dans la hiérarchie des composants inspectés.
  ```html
  <!-- simple élément -->
  <transition>
    <div v-if="ok">Contenu basculé</div>
  </transition>

  <!-- composant dynamique -->
  <transition name="fade" mode="out-in" appear>
    <component :is="view"></component>
  </transition>

  <!-- hooking d'événement -->
  <div id="transition-demo">
    <transition @after-enter="transitionComplete">
      <div v-show="ok">Contenu basculé</div>
    </transition>
  </div>
  ```

  ```js
  const app = Vue.createApp({
    ...
    methods: {
      transitionComplete (el) {
        // pour passé 'el' cet élément DOM comme argument, quelque chose...
      }
    }
    ...
  })

  app.mount('#transition-demo')
  ```

- **Voir aussi:** [Enter & Leave Transitions](/guide/transitions-enterleave.html#transitioning-single-elements-components)

## transition-group

- **Propriétés:**

  - `tag` - `string`, s'il n'est pas défini, effectue le rendu sans élément racine.
  - `move-class` - écrase la classe CSS appliquée pendant la transition en mouvement.
  - expose les mêmes propriétés que `<transition>` sauf `mode`.

- **Événements:**

  - expose les mêmes événements que `<transition>`.

- **Usage:**

  `<transition-group>` fournit des effets de transition pour **plusieurs** éléments/composants. Par défaut, il ne rend pas un élément DOM wrapper, mais on peut en définir un via l'attribut `tag`.

  Notez que chaque enfant d'un `<transition-group>` doit être [**à clé unique**](./special-attributes.html#key) pour que les animations fonctionnent correctement..

  `<transition-group>` prend en charge les transitions mouvantes via la propriété CSS transform. Quand la position d'un enfant à l'écran a changé après une mise à jour, une classe CSS mobile lui sera appliquée (auto-générée à partir de l'attribut `name` ou configurée avec l'attribut `move-class`). Si la propriété CSS `transform` est "transitionnable" lorsque la classe mobile est appliquée, l'élément sera animé en douceur vers sa destination en utilisant la [technique FLIP](https://aerotwist.com/blog/flip-your-animations/).

  ```html
  <transition-group tag="ul" name="slide">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </transition-group>
  ```

- **Voir aussi:** [List Transitions](/guide/transitions-list.html)

## keep-alive

- **Propriétés:**

  - `include` - `string | RegExp | Array`. Seuls les composants avec des noms correspondants seront mis en cache.
  - `exclude` - `string | RegExp | Array`. Tout composant avec un nom correspondant ne sera pas mis en cache.
  - `max` - `number | string`. Le nombre maximal d'instances de composant à mettre en cache.

- **Usage:**

  Lorsqu'il est englobé autour d'un composant dynamique, `<keep-alive>` met en cache les instances de composant inactives sans les détruire. Semblable à `<transition>`, `<keep-alive>` est un composant abstrait: il ne rend pas un élément DOM lui-même et n'apparaît pas dans l'arborescence du composant parent.

  Lorsqu'un composant est basculé dans `<keep-alive>`, ses hooks de cycle de vie `activated` et `deactivated` seront invoqués en conséquence.

  Principalement utilisé pour préserver l'état du composant ou éviter de re-rendre.

  ```html
  <!-- basique -->
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>

  <!-- plusieurs enfants conditionnels -->
  <keep-alive>
    <comp-a v-if="a > 1"></comp-a>
    <comp-b v-else></comp-b>
  </keep-alive>

  <!-- utiliser avec `<transition>` -->
  <transition>
    <keep-alive>
      <component :is="view"></component>
    </keep-alive>
  </transition>
  ```

  Notez que `<keep-alive>` est conçu pour le cas où il a un composant enfant direct qui bascule (toggle). Cela ne fonctionne pas si vous avez `v-for` à l'intérieur. Quand il y a plusieurs enfants conditionnels, comme ci-dessus, `<keep-alive>` exige qu'un seul enfant soit rendu à la fois.

- **`include` et `exclude`**

  Les propriétés `include` et `exclude` permettent aux composants d'être mis en cache conditionnellement. Les deux peuvent être une chaîne de caractères (string) délimitée par des virgules, une RegExp ou un tableau (Array):

  ```html
  <!-- string délimitée de virgule -->
  <keep-alive include="a,b">
    <component :is="view"></component>
  </keep-alive>

  <!-- regex (utilisez `v-bind`) -->
  <keep-alive :include="/a|b/">
    <component :is="view"></component>
  </keep-alive>

  <!-- Array (utilisez `v-bind`) -->
  <keep-alive :include="['a', 'b']">
    <component :is="view"></component>
  </keep-alive>
  ```

  La correspondance est d'abord vérifiée sur l'option `name` du composant, puis sur son nom d'enregistrement local (la clé dans l'option `components` du parent) si l'option `name` n'est pas disponible. La correspondance des composants anonymes ne peut pas être vérifiée.

- **`max`**

  Le nombre maximal d'instances de composant à mettre en cache. Une fois ce nombre atteint, l'instance de composant mis en cache qui a été le moins récemment accédée sera détruite avant de créer une nouvelle instance.

  ```html
  <keep-alive :max="10">
    <component :is="view"></component>
  </keep-alive>
  ```

  ::: warning
  `<keep-alive>` ne fonctionne pas avec les composants fonctionnels car ils n'ont pas d'instances à mettre en cache.
  :::

- **Voir aussi:** [Dynamic Components - keep-alive](../guide/component-dynamic-async.html#dynamic-components-with-keep-alive)

## slot

- **Propriétés:**

  - `name` - `string`, utilisé pour nommer la slot.

- **Usage:**

  `<slot>` sert de point de distribution de contenu dans les templates de composants. `<slot>` lui-même sera remplacé.

  Pour un usage plus détaillé, consultez la section du guide ci-dessous.

- **Voir aussi:** [Content Distribution with Slots](../guide/component-basics.html#content-distribution-with-slots)

## teleport

- **Propriétés:**

  - `to` - `string`. Propriété requise, doit être un sélecteur de requête valide ou un HTMLElement (s'il est utilisé dans un environnement de navigateur). Spécifie un élément cible où le contenu du `<teleport>` sera déplacé

  ```html
  <!-- ok -->
  <teleport to="#some-id" />
  <teleport to=".some-class" />
  <teleport to="[data-teleport]" />

  <!-- Erroné -->
  <teleport to="h1" />
  <teleport to="some-string" />
  ```

  - `disabled` - `boolean`.Cette propriété optionnelle peut être utilisée pour désactiver la fonctionnalité de `<teleport>`, ce qui signifie que son contenu de slot ne sera pas déplacé et sera rendu à l'endroit où vous avez spécifié le `<teleport>` dans le composant parent englobant.

  ```html
  <teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
  </teleport>
  ```

  Notez que cela déplacera les nœuds réelsdu DOM au lieu d'être détruits et recréés, et cela gardera également toutes les instances de composant actives. Tous les éléments HTML avec leur état (c'est-à-dire une vidéo en cours de lecture) conserveront leur état.

- **Voir aussi:** [Teleport component](../guide/teleport.html#teleport)
