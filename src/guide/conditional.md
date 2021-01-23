# Rendu Conditionnel

## `v-if`

La directive `v-if` est utilisée pour rendre conditionnellement un bloc. Le bloc ne sera rendu que si l'expression de la directive renvoie une valeur de vérité.

```html
<h1 v-if="awesome">Vue est magnifique!</h1>
```

Il est également possible d'ajouter un "bloc else" avec `v-else`:

```html
<h1 v-if="awesome">Vue est magnifique!</h1>
<h1 v-else>Oh non 😢</h1>
```

### Groupes conditionnels avec `v-if` sur `<template>`

Puisque `v-if` est une directive, elle doit être attachée à un seul élément. Mais que faire si nous voulons basculer entre plusieurs éléments? Dans ce cas, nous pouvons utiliser `v-if` sur un élément `<template>`, qui sert de wrapper invisible. Le résultat final rendu n'inclura pas l'élément `<template>`.

```html
<template v-if="ok">
  <h1>Titre</h1>
  <p>Paragraphe 1</p>
  <p>Paragraphe 2</p>
</template>
```

### `v-else`

Vous pouvez utiliser la directive `v-else` pour indiquer un" bloc else "pour `v-if`:

```html
<div v-if="Math.random() > 0.5">
  Là, vous me voyez!
</div>
<div v-else>
  Là, non
</div>
```

Un élément `v-else` doit immédiatement suivre un élément `v-if` ou `v-else-if` - sinon il ne sera pas reconnu.

### `v-else-if`

Le `v-else-if`, comme son nom l'indique, sert de bloc" else if "pour `v-if`. Il peut également être enchaîné plusieurs fois:

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

Similaire à `v-else`, un élément `v-else-if` doit immédiatement suivre un élément `v-if` ou `v-else-if` .

## `v-show`

Une autre option pour afficher conditionnellement un élément est la directive `v-show`. L'utilisation est en grande partie la même:

```html
<h1 v-show="ok">Hello!</h1>
```

La différence est qu'un élément avec `v-show` sera toujours rendu et restera dans le DOM; `v-show` bascule uniquement la propriété CSS `display` de l'élément.

`v-show` ne prend pas en charge l'élément `<template> `, ni ne fonctionne avec` v-else`.

## `v-if` vs `v-show`

`v-if` est un rendu conditionnel" réel "car il garantit que les écouteurs d'événements et les composants enfants à l'intérieur du bloc conditionnel sont correctement détruits et recréés pendant les basculements.

`v-if` est également **paresseux**: si la condition est fausse lors du rendu initial, elle ne fera rien - le bloc conditionnel ne sera rendu que lorsque la condition deviendra vraie pour la première fois.

En comparaison, `v-show` est beaucoup plus simple - l'élément est toujours rendu quelle que soit la condition initiale, avec un basculement basé sur CSS.

De manière générale, `v-if` a des coûts de basculement plus élevés tandis que `v-show` a des coûts de rendu initiaux plus élevés. Préférez donc `v-show` si vous avez besoin de basculer quelque chose très souvent, et préférez `v-if` si la condition est peu susceptible de changer à l'exécution.

## `v-if` avec `v-for`

::: tip Note
L'utilisation conjointe de `v-if` et` v-for` n'est **pas recommandée**. oir le [guide de style](../style-guide/#avoid-v-if-with-v-for-essential) pour plus d'informations.
:::

Lorsque `v-if` et `v-for` sont tous deux utilisés sur le même élément, `v-if` sera évalué en premier. Voir le [guide de rendu de liste](list#v-for-with-v-if) pour plus de détails.
