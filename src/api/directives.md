# Directives

## v-text

- **Devrait être:** `string`

- **Détails:**

  Met à jour le [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) de l'élément. Si vous avez besoin de mettre à jour une partie de `textContent`, vous devez utiliser plutôt l'[interpolation moustache](/guide/template-syntax.html#text) 

- **Exemple:**

  ```html
  <span v-text="msg"></span>
  <!-- pareil que -->
  <span>{{msg}}</span>
  ```

- **Voir aussi:** [Data Binding Syntax - Interpolations](../guide/template-syntax.html#text)

## v-html

- **Devrait être:** `string`

- **Détails:**

  Met à jour le [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) de l'élément. **Notez que le contenu est inséré au format HTML simple - il ne sera pas compilé en tant que modèles Vue**. Si vous essayez de composer des templates en utilisant `v-html`, essayez de repenser la solution en utilisant des composants à la place.

  ::: warning
  Le rendu dynamique de HTML de façon arbitraire sur votre site Web peut être très dangereux car il peut facilement conduire à des [attaques XSS](https://en.wikipedia.org/wiki/Cross-site_scripting). N'utilisez `v-html` que sur du contenu de confiance et **jamais** sur du contenu fourni par l'utilisateur.
  :::

  Dans les [composants à fichier unique](../guide/single-file-component.html), les styles `scoped` ne s'appliqueront pas au contenu à l'intérieur de `v-html`, car ce HTML n'est pas traité par le compilateur de templates de Vue. Si vous souhaitez cibler le contenu `v-html` avec un CSS scopé, vous pouvez à la place utiliser les [modules CSS](https://vue-loader.vuejs.org/en/features/css-modules.html) ou un autre élément global `<style>` avec une stratégie de scope manuelle telle que BEM.

- **Exemple:**

  ```html
  <div v-html="html"></div>
  ```

- **Voir aussi:** [Data Binding Syntax - Interpolations](../guide/template-syntax.html#raw-html)

## v-show

- **Devrait être:** `any`

- **Usage:**

  Active/désactive la propriété CSS `display` de l'élément en fonction de la véracité de la valeur de l'expression.

  Cette directive déclenche des transitions lorsque sa condition change.

- **Voir aussi:** [Conditional Rendering - v-show](../guide/conditional.html#v-show)

## v-if

- **Devrait être:** `any`

- **Usage:**

  Affiche conditionnellement l'élément en fonction de la véracité de la valeur de l'expression. L'élément et ses directives/composants contenus sont détruits et reconstruits lors des changement d'état. Si l'élément est un élément `<template>`, son contenu sera extrait en tant que bloc conditionnel.

  Cette directive déclenche des transitions lorsque sa condition change.

  Lorsqu'ils sont utilisés ensemble, `v-if` a une priorité plus élevée que `v-for`. Nous ne recommandons pas d'utiliser ces deux directives ensemble sur un seul élément - voir le [list rendering guide](../guide/list.html#v-for-with-v-if) pour plus de détails.

- **Voir aussi:** [Conditional Rendering - v-if](../guide/conditional.html#v-if)

## v-else

- **Ne reçoit pas d'expression**

- **Restriction:** L'élément frère précédent doit avoir `v-if` ou `v-else-if`.

- **Usage:**

  Designe le "bloc else" pour `v-if` ou une chaine `v-if`/`v-else-if`.

  ```html
  <div v-if="Math.random() > 0.5">
    Là tu me vois
  </div>
  <div v-else>
    Et là non!
  </div>
  ```

- **Voir aussi:** [Conditional Rendering - v-else](../guide/conditional.html#v-else)

## v-else-if

- **Devrait être:** `any`

- **Restriction:** L'élément frère précédent doit avoir `v-if` ou `v-else-if`.

- **Usage:**

  Designe le "bloc else if" pour `v-if`. Peut être enchaîné.

  ```html
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Pas A/B/C
  </div>
  ```

- **Voir aussi:** [Conditional Rendering - v-else-if](../guide/conditional.html#v-else-if)

## v-for

- **Devrait être:** `Array | Object | number | string | Iterable`

- **Usage:**

  Affiche l'élément ou le bloc de template plusieurs fois en fonction des données source. La valeur de la directive doit utiliser la syntaxe spéciale `alias in expression` pour fournir un alias pour l'élément en cours d'itération sur:

  ```html
  <div v-for="item in items">
    {{ item.text }}
  </div>
  ```

  Vous pouvez également spécifier un alias pour l'index (ou la clé si elle est utilisée sur un objet):

  ```html
  <div v-for="(item, index) in items"></div>
  <div v-for="(value, key) in object"></div>
  <div v-for="(value, name, index) in object"></div>
  ```

  Le comportement par défaut de `v-for` essaiera de patcher les éléments sur place sans les déplacer. Pour le forcer à réorganiser les éléments, vous devez fournir un indice de classement avec l'attribut spécial `key`:

  ```html
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
  ```

  `v-for` peut également fonctionner sur des valeurs qui implémentent le [Protocole Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol), y compris `Map` et` Set` natifs.

  L'utilisation détaillée de `v-for` est expliquée dans la section du guide ci-dessous.

- **Voir aussi:**
  - [List Rendering](../guide/list.html)

## v-on

- **raccourci:** `@`

- **Devrait être:** `Function | Inline Statement | Object`

- **Argument:** `event`

- **Modificateurs:**

  - `.stop` - appelle `event.stopPropagation()`.
  - `.prevent` - appelle `event.preventDefault()`.
  - `.capture` - ajouter un écouteur d'événements en mode capture.
  - `.self` - ne déclenche le handler que si l'événement a été dispatché à partir de cet élément.
  - `.{keyAlias}` - ne déclenche le handler qu'en fonction d'une certaine touche.
  - `.once` - ne déclenche le handler au plus une fois.
  - `.left` - ne déclenche le handler qu'au click gauche de la souris.
  - `.right` - ne déclenche le handler qu'au click droit de la souris.
  - `.middle` - ne déclenche le handler qu'au click du bouton au milieu de la souris.
  - `.passive` - attache un événement du DOM avec `{ passive: true }`.

- **Usage:**

  Attache un écouteur d'événement à l'élément. Le type d'événement est indiqué par l'argument. L'expression peut être un nom de méthode, une instruction inline ou omise si des modificateurs sont présents.

  Lorsqu'il est utilisé sur un élément normal, il écoute [**les événements natif du DOM**](https://developer.mozilla.org/en-US/docs/Web/Events) seulement. Lorsqu'il est utilisé sur un composant d'élément personnalisé, il écoute les **événements personnalisés** ou "custom events" émis sur ce composant enfant.

  Lors de l'écoute d'événements natifs du DOM, la méthode reçoit l'événement natif comme seul argument. Si vous utilisez une instruction inline, l'instruction a accès à la propriété spéciale `$event` : `v-on:click="handle('ok', $event)"`.

  `v-on` prend aussi en charge la liaison à un objet de pairs événement/écouteur sans argument. Notez que lors de l'utilisation de la syntaxe d'objet, elle ne prend en charge aucun modificateur.

- **Exemple:**

  ```html
  <!-- method handler -->
  <button v-on:click="doThis"></button>

  <!-- événement dynamique -->
  <button v-on:[event]="doThis"></button>

  <!-- instruction inline -->
  <button v-on:click="doThat('hello', $event)"></button>

  <!-- raccourci -->
  <button @click="doThis"></button>

  <!-- raccourci événement dynamique -->
  <button @[event]="doThis"></button>

  <!-- stop propagation -->
  <button @click.stop="doThis"></button>

  <!-- prevent default -->
  <button @click.prevent="doThis"></button>

  <!-- prevent default sans expression -->
  <form @submit.prevent></form>

  <!-- modificateur de chaine -->
  <button @click.stop.prevent="doThis"></button>

  <!-- modificateur de touche utilisant le keyAlias -->
  <input @keyup.enter="onEnter" />

  <!-- l'événement clic sera déclenché au plus une fois -->
  <button v-on:click.once="doThis"></button>

  <!-- syntaxe d'objet -->
  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
  ```

  Écouter des événements personnalisés (custom events) sur un composant enfant (le handler est appelé lorsque "my-event" est émis sur l'enfant):

  ```html
  <my-component @my-event="handleThis"></my-component>

  <!-- instruction inline -->
  <my-component @my-event="handleThis(123, $event)"></my-component>
  ```

- **Voir aussi:**
  - [Event Handling](../guide/events.html)
  - [Components - Custom Events](../guide/component-basics.html#listening-to-child-components-events)

## v-bind

- **raccourci:** `:`

- **Devrait être:** `any (with argument) | Object (without argument)`

- **Argument:** `attrOrProp (optionnel)`

- **Modificateurs:**

  - `.camel` - transforme le nom d'attribut kebab-case en camelCase.

- **Usage:**

  Liez dynamiquement un ou plusieurs attributs ou une prop d'un composant à une expression.

  Lorsqu'il est utilisé pour lier l'attribut `class` ou `style`, il prend en charge des types de valeur supplémentaires tels que Array ou Objects. Voir la section du guide lié ci-dessous pour plus de détails.

  Lorsqu'il est utilisé pour lier une prop, la prop doit être correctement déclaré dans le composant enfant.

  Lorsqu'il est utilisé sans argument, peut être utilisé pour lier un objet contenant des paires name-value d'attribut. Notez que dans ce mode, `class` et `style` ne prennent pas en charge Array ou Objects.

- **Exemple:**

  ```html
  <!-- lier un attribut -->
  <img v-bind:src="imageSrc" />

  <!-- nom d'attribut dynamique -->
  <button v-bind:[key]="value"></button>

  <!-- raccourci -->
  <img :src="imageSrc" />

  <!-- racourci et nom d'attribut dynamique -->
  <button :[key]="value"></button>

  <!-- avec une concaténation de "string" inline -->
  <img :src="'/path/to/images/' + fileName" />

  <!-- liaison de classe -->
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]">
    <!-- liaison de style -->
    <div :style="{ fontSize: size + 'px' }"></div>
    <div :style="[styleObjectA, styleObjectB]"></div>

    <!-- lier un objet d'attributs -->
    <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

    <!-- liaison de prop. "prop" doit être déclaré dans my-component. -->
    <my-component :prop="someThing"></my-component>

    <!-- transmettre des props en commun avec un composant enfant -->
    <child-component v-bind="$props"></child-component>

    <!-- XLink -->
    <svg><a :xlink:special="foo"></a></svg>
  </div>
  ```

  Le modificateur `.camel` permet de caméliser un nom d'attribut` v-bind` lors de l'utilisation de modèles in-DOM, par ex. l'attribut SVG `viewBox`:

  ```html
  <svg :view-box.camel="viewBox"></svg>
  ```

  `.camel` n'est pas nécessaire si vous utilisez des templates strings ou compilez avec `vue-loader`/`vueify`.

- **Voir aussi:**
  - [Class and Style Bindings](../guide/class-and-style.html)
  - [Components - Props](../guide/component-basics.html#passing-data-to-child-components-with-props)

## v-model

- **Devrait être:** varie en fonction de la valeur de l'élément d'entrée du formulaire ou de la sortie des composants

- **Limité à:**

  - `<input>`
  - `<select>`
  - `<textarea>`
  - composants

- **Modificateurs:**

  - [`.lazy`](../guide/forms.html#lazy) - écouter les événements `change` au lieu de `input`
  - [`.number`](../guide/forms.html#number) - convertir une chaîne d'entrée valide en nombres
  - [`.trim`](../guide/forms.html#trim) - trimmer les input

- **Usage:**

  Crée une liaison bidirectionnelle sur un élément d'entrée de formulaire ou un composant. Pour une utilisation détaillée et d'autres remarques, consultez la section Guide ci-dessous.

- **Voir aussi:**
  - [Form Input Bindings](../guide/forms.html)
  - [Components - Form Input Components using Custom Events](../guide/component-custom-events.html#v-model-arguments)

## v-slot

- **Raccourci:** `#`

- **Devrait être:** Une expression JavaScript qui est valide dans la position de l'argument d'uyne fonction. (Supporte la destructuration dans [supported environments](../guide/component-slots.html#destructuring-slot-props)). Optionnel - seulement nécessaire si l'on s'attend à ce que des props soient transmises au slot.

- **Argument:** le nom du slot (optionel, par defaut à `default`)

- **Limité à:**

  - `<template>`
  - [compsants](../guide/component-slots.html#abbreviated-syntax-for-lone-default-slots) (pour un seul emplacement par défaut avec des props)

- **Usage:**

  Désigne les emplacements nommés ou les emplacements qui s'attendent à recevoir des props.

- **Exemple:**

  ```html
  <!-- slots nommés -->
  <base-layout>
    <template v-slot:header>
      Contenu du header
    </template>

    <template v-slot:default>
      Contenu par default
    </template>

    <template v-slot:footer>
      Contenu du footer
    </template>
  </base-layout>

  <!-- Slots nommés qui réçoivent des props -->
  <infinite-scroll>
    <template v-slot:item="slotProps">
      <div class="item">
        {{ slotProps.item.text }}
      </div>
    </template>
  </infinite-scroll>

  <!-- Slot par défaut recevant des props, avec déstructuration -->
  <mouse-position v-slot="{ x, y }">
    Mouse position: {{ x }}, {{ y }}
  </mouse-position>
  ```

  Pour plus de détails, voir les liens ci-dessous.

- **Voir aussi:**
  - [Components - Slots](../guide/component-slots.html)

## v-pre

- **Ne reçoit pas d'expression**

- **Usage:**

  Ignorer la compilation pour cet élément et tous ses enfants. Vous pouvez l'utiliser pour afficher des balises de moustache brutes. Sauter un grand nombre de nœuds sans directives sur eux peut également accélérer la compilation.

- **Exemple:**

  ```html
  <span v-pre>{{ Ceci ne sera pas compilé }}</span>
  ```

## v-cloak

- **Ne reçoit pas d'expression**

- **Usage:**

  Cette directive restera sur l'élément jusqu'à ce que l'instance de composant associée termine la compilation. Combinée avec des règles CSS telles que `[v-cloak] {display: none}`, cette directive peut être utilisée pour masquer les liaisons de moustache non compilées jusqu'à ce que l'instance du composant soit prête.

- **Exemple:**

  ```css
  [v-cloak] {
    display: none;
  }
  ```

  ```html
  <div v-cloak>
    {{ message }}
  </div>
  ```

  La `<div>` ne sera pas visible tant que la compilation n'est pas terminée.

## v-once

- **Ne reçoit pas d'expression**

- **Détails:**

  L'élément et le composant sont rendus **une seule fois**. Lors des relances ultérieures, l'élément/composant et tous ses enfants seront traités comme du contenu statique et ignorés. Cela peut être utilisé pour optimiser les performances de mise à jour.

  ```html
  <!-- simple élément -->
  <span v-once>Ceci ne changera jamais: {{msg}}</span>
  <!-- l'élément a des enfants -->
  <div v-once>
    <h1>commentaire</h1>
    <p>{{msg}}</p>
  </div>
  <!-- composant -->
  <my-component v-once :comment="msg"></my-component>
  <!-- directive `v-for` -->
  <ul>
    <li v-for="i in list" v-once>{{i}}</li>
  </ul>
  ```

- **Voir aussi:**
  - [Data Binding Syntax - interpolations](../guide/template-syntax.html#text)

## v-is

> Remarque: cette section n'affecte que les cas où les modèles Vue sont directement écrits dans le HTML de la page.

- **Devrait être:** string littéral

- **Limité à:** élément natif HTML

- **Usage:** Lors de l'utilisation de modèles dans le DOM, le modèle est soumis à des règles d'analyse HTML natives. Certains éléments HTML, tels que `<ul>`, `<ol>`, `<table>` et `<select>` ont des restrictions sur les éléments pouvant apparaître à l'intérieur, et certains éléments tels que `<li>`, `<tr>` et `<option>` ne peuvent apparaître qu'à l'intérieur de certains autres éléments. Pour contourner ce problème, nous pouvons utiliser la directive `v-is` sur ces éléments:

```html
<table>
  <tr v-is="'blog-post-row'"></tr>
</table>
```

:::warning
`v-is` fonctionne comme une liaison dynamique 2.x `: is` - donc pour afficher un composant par son nom enregistré, sa valeur doit être une chaîne JavaScript littérale:

```html
<!-- Incorrect, rien ne sera affiché -->
<tr v-is="blog-post-row"></tr>

<!-- Correct -->
<tr v-is="'blog-post-row'"></tr>
```

:::
