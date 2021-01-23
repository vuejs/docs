# Syntaxe des Templates

Vue.js utilise une syntaxe de template basée sur HTML qui vous permet de lier de manière déclarative le DOM deja rendu aux données de l'instance de composant sous-jacent. Tous les templates Vue.js sont du HTML valide qui peut être analysé par des navigateurs conformes aux spécifications et des "parsers" HTML.

Sous le capot, Vue compile les templates en des fonctions de rendu du DOM Virtuel. Combiné avec le système de réactivité, Vue est capable de déterminer intelligemment le nombre minimal de composants à restituer et d'appliquer le minimum de manipulations du DOM lorsque l'état de l'application change.

Si vous êtes familier avec les concepts de DOM Virtuel  et que vous préférez la puissance brute de JavaScript, vous pouvez également [écrire directement des fonctions de rendu](render-function.html) au lieu de templates, avec prise en charge optionnelle de JSX.

## Interpolations

### Texte

La forme la plus basique de liaison de données est l'interpolation de texte à l'aide de la syntaxe "Moustache" (doubles accolades):

```html
<span>Message: {{ msg }}</span>
```

La balise moustache sera remplacée par la valeur de la propriété `msg` de l'instance de composant correspondante. Il sera également mis à jour chaque fois que la propriété `msg` change.

Vous pouvez également effectuer des interpolations ponctuelles qui ne se mettent pas à jour en cas de modification des données à l’aide de la [directive v-once](../api/directives.html#v-once), mais gardez à l'esprit que cela affectera également toutes les autres liaisons sur le même nœud:

```html
<span v-once>Ceci ne changera jamais: {{ msg }}</span>
```

### HTML Brut

Les doubles moustaches interprètent les données comme du texte brut et non comme du HTML. Pour générer du vrai HTML, vous devrez utiliser la [directive `v-html`](../api/directives.html#v-html):

```html
<p>Utilisation des moustaches: {{ rawHtml }}</p>
<p>Utilisation de la directive v-html: <span v-html="rawHtml"></span></p>
```

<common-codepen-snippet title="Rendering v-html" slug="yLNEJJM" :preview="false" />

Le contenu de `span` sera remplacé par la valeur de la propriété `rawHtml`, interprétée comme du HTML brut - les liaisons de données sont ignorées. Notez que vous ne pouvez pas utiliser `v-html` pour composer des templates partiels, car Vue n'est pas un moteur de création de templates basé sur des chaînes de caractères. Au lieu de cela, les composants sont préférés comme unité fondamentale pour la réutilisation et la composition de l'interface utilisateur.

::: tip
Le rendu dynamique de HTML arbitraire sur votre site Web peut être très dangereux car il peut facilement conduire à des [vulnérabilités XSS](https://en.wikipedia.org/wiki/Cross-site_scripting). N'utilisez l'interpolation HTML que sur du contenu de confiance et **jamais** sur le contenu fourni par l'utilisateur
:::

### Attributes
 
Les moustaches ne peuvent pas être utilisées dans les attributs HTML. Au lieu de cela, utilisez une [directive `v-bind`](../api/directives.html#v-bind):

```html
<div v-bind:id="dynamicId"></div>
```

Si la valeur liée est `null` ou `undefined`, l'attribut ne sera pas inclus dans l'élément rendu.

Dans le cas des attributs booléens, où leur simple existence implique `true`, `v-bind` fonctionne un peu différemment. Par exemple:

```html
<button v-bind:disabled="isButtonDisabled">Button</button>
```

L'attribut `disabled` sera inclus si `isButtonDisabled` a une valeur true. Il sera également inclus si la valeur est une chaîne vide, en maintenant la cohérence avec `<button disabled="">`. Pour les autres valeurs fausses, l'attribut sera omis.

### Utilisation d'expressions JavaScript

Jusqu'à présent, nous n'avons lié que des clés de propriété simples dans nos templates. Mais Vue.js prend en charge toute la puissance des expressions JavaScript dans toutes les liaisons de données:

```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

Ces expressions seront évaluées en tant que JavaScript dans la portée des données de l'instance active courante. Une restriction est que chaque liaison ne peut contenir **qu'une seule expression**, donc ce qui suit ne fonctionnera **PAS**:

```html
<!-- ceci est une déclaration, pas une expression: -->
{{ var a = 1 }}

<!-- le control flow ne fonctionnera pas non plus, utilisez des expressions ternaires -->
{{ if (ok) { return message } }}
```

## Directives

Les directives sont des attributs spéciaux avec le préfixe `v-`. Les valeurs d'attribut de directive sont censées être **une seule expression JavaScript** (à l'exception de `v-for` et `v-on`, qui seront abordées plus tard). Le travail d'une directive est d'appliquer de manière réactive des effets secondaires au DOM lorsque la valeur de son expression change. Passons en revue l'exemple que nous avons vu dans l'introduction:

```html
<p v-if="seen">Là vous me voyez</p>
```

Ici, la directive `v-if` supprimerait/insérerait l'élément `<p>` en fonction de la véracité de la valeur de l'expression `seen`.

### Arguments

Certaines directives peuvent prendre un "argument", indiqué par deux points après le nom de la directive. Par exemple, la directive `v-bind` est utilisée pour mettre à jour de manière réactive un attribut HTML:

```html
<a v-bind:href="url"> ... </a>
```

Ici, `href` est l'argument, qui indique à la directive `v-bind` de lier l'attribut `href` de l'élément à la valeur de l'expression `url`.

Un autre exemple est la directive `v-on`, qui écoute les événements DOM:

```html
<a v-on:click="doSomething"> ... </a>
```

Ici, l'argument est le nom de l'événement à écouter. Nous parlerons également plus en détail de la gestion des événements.

### Arguments Dynamiques

Il est également possible d'utiliser une expression JavaScript dans un argument de directive en l'entourant de crochets []:

```html
<!--
Notez qu'il y a des contraintes à l'expression de l'argument, comme expliqué
dans la section «Contraintes d'expression d'argument dynamique» ci-dessous.
-->
<a v-bind:[attributeName]="url"> ... </a>
```

Ici, `attributeName` sera évalué dynamiquement en tant qu'expression JavaScript, et sa valeur évaluée sera utilisée comme valeur finale de l'argument. Par exemple, si votre instance de composant a une propriété _data_ `attributeName`, dont la valeur est `"href"`, alors cette liaison sera équivalente à` v-bind: href`.

De même, vous pouvez utiliser des arguments dynamiques pour lier un gestionnaire à un nom d'événement dynamique:

```html
<a v-on:[eventName]="doSomething"> ... </a>
```

Dans cet exemple, lorsque la valeur de `eventName` est `"focus"`, `v-on:[eventName]` sera équivalent à `v-on:focus`.

### Modificateurs

Les modificateurs sont des suffixes spéciaux désignés par un point, qui indiquent qu'une directive doit être liée d'une manière spéciale. Par exemple, le modificateur `.prevent` indique à la directive `v-on` d'appeler `event.preventDefault()` sur l'événement déclenché:

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

Vous verrez d'autres exemples de modificateurs plus tard, [pour `v-on`](events.md#event-modifiers) et [pour` v-model`](forms.md#modifiers), lorsque nous explorerons ces fonctionnalités.
## Raccourcis

Le préfixe `v-` sert de repère visuel pour identifier les attributs spécifiques à Vue dans vos templates. Ceci est utile lorsque vous utilisez Vue.js pour appliquer un comportement dynamique à un balisage existant, mais peut sembler verbeux pour certaines directives fréquemment utilisées. En même temps, le besoin du préfixe `v-` devient moins important lorsque vous construisez un [SPA](https://en.wikipedia.org/wiki/Single-page_application), où Vue gère chaque template. Par conséquent, Vue fournit des raccourcis spéciaux pour deux des directives les plus souvent utilisées, `v-bind` et` v-on`:

### Raccourci `v-bind`

```html
<!-- syntaxe complète -->
<a v-bind:href="url"> ... </a>

<!-- raccourci -->
<a :href="url"> ... </a>

<!-- raccourci avec argument dynamique -->
<a :[key]="url"> ... </a>
```

### Raccourci `v-on`

```html
<!-- syntaxe complète -->
<a v-on:click="doSomething"> ... </a>

<!-- raccourci -->
<a @click="doSomething"> ... </a>

<!-- raccourci avec argument dynamique -->
<a @[event]="doSomething"> ... </a>
```

Ils peuvent sembler un peu différents du HTML normal, mais `:` et `@` sont des caractères valides pour les noms d'attributs et tous les navigateurs pris en charge par Vue peuvent l'analyser correctement. De plus, ils n'apparaissent pas dans le balisage final rendu. La syntaxe abrégée est totalement facultative, mais vous l'apprécierez probablement lorsque vous en saurez plus sur son utilisation plus tard.

> À partir de la page suivante, nous utiliserons le raccourci dans nos exemples, car c'est l'utilisation la plus courante pour les développeurs Vue.

### Mises en garde

#### Contraintes de valeur d'argument dynamique

Les arguments dynamiques doivent être évalués en une chaîne de caractère, à l'exception de `null`. La valeur spéciale `null` peut être utilisée pour supprimer explicitement la liaison. Toute autre valeur non-chaîne de caracères déclenchera un avertissement.

#### Contraintes d'expression d'argument dynamique

Les expressions d'argument dynamique ont certaines contraintes de syntaxe car certains caractères, tels que les espaces et les guillemets, ne sont pas valides dans les noms d'attributs HTML. Par exemple, ce qui suit n'est pas valide:

```html
<!-- Ceci déclenchera un avertissement du compilateur. -->
<a v-bind:['foo' + bar]="value"> ... </a>
```


Nous vous recommandons de remplacer toutes les expressions complexes par une [propriété computed](computed.html), l'une des pièces les plus fondamentales de Vue, que nous aborderons sous peu.

Lorsque vous utilisez des templates dans le DOM (templates directement écrits dans un fichier HTML), vous devez éviter de nommer les clés avec des caractères majuscules, car les navigateurs forceront les noms d'attributs en minuscules:

```html
<!--
Ceci sera converti en v-bind:[someattr] dans les templates dans le DOM
À moins que vous n'ayez une propriété "someattr" dans votre instance, votre code ne fonctionnera pas.
-->
<a v-bind:[someAttr]="value"> ... </a>
```

#### Expressions JavaScript

Les expressions de templates sont _limités en accès_ et n'ont accès qu'à une [liste blanche de _globaux_](https://github.com/vuejs/vue-next/blob/master/packages/shared/src/globalsWhitelist.ts#L3) comme `Math` et `Date`. Vous ne devez pas tenter d'accéder aux globaux définis par l'utilisateur dans les expressions de templates.