# Liaisons des champs de formulaire

## Usage Basique

Vous pouvez utiliser la directive `v-model` pour créer des liaisons de données bidirectionnelles sur les éléments input, textarea, et select d'un formulaire. Il choisit automatiquement la bonne façon de mettre à jour l'élément en fonction du type d'entrée. Bien qu'un peu magique, `v-model` est essentiellement du sucre syntaxique pour mettre à jour les données lors des évènements de saisie utilisateur sur les champs de formulaires, ainsi que quelques traitements spéciaux pour certains cas particuliers.

::: tip Note
`v-model` ignorera les attributs initiaux `value`, `checked` ou `selected` trouvés sur tous les éléments de formulaire. Il traitera toujours les données d'instance active courante comme seule source de vérité. Vous devez déclarer la valeur initiale du côté JavaScript, dans l'option `data` de votre composant.
:::

`v-model` utilise en interne différentes propriétés et émet différents événements pour différents éléments d'entrée:

- les éléments text et textarea utilisent la propriété `value` et l'événement `input`;
- les checkbox et les boutons radio utilisent la propriété `checked` et l'événement `change`;
- les champs select utilisent la propriété `value` et l'événement `change`.

<span id="vmodel-ime-tip"></span>
::: tip Note
Pour les langues qui nécessitent une [IME](https://en.wikipedia.org/wiki/Input_method) (Chinois, Japonnais, Koréen etc.), vous remarquerez que `v-model` n'est pas mis à jour pendant la composition IME. Si vous souhaitez également prendre en charge ces mises à jour, utilisez plutôt l'événement `input`.
:::

### Texte

```html
<input v-model="message" placeholder="edit me" />
<p>Message is: {{ message }}</p>
```

<common-codepen-snippet title="Handling forms: basic v-model" slug="eYNPEqj" :preview="false" />

### Texte multiligne

```html
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br />
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

<common-codepen-snippet title="Handling forms: textarea" slug="xxGyXaG" :preview="false" />

L'interpolation sur les textareas ne fonctionnera pas. Utilisez plutôt `v-model`.

```html
<!-- mauvais -->
<textarea>{{ text }}</textarea>

<!-- bon -->
<textarea v-model="text"></textarea>
```

### Checkbox

Simple checkbox, valeur booléenne:

```html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

<common-codepen-snippet title="Handling forms: checkbox" slug="PoqyJVE" :preview="false" />

Checkbox multiple, liés au même tableau:

```html
<div id="v-model-multiple-checkboxes">
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label>
  <br />
  <span>Checked names: {{ checkedNames }}</span>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      checkedNames: []
    }
  }
}).mount('#v-model-multiple-checkboxes')
```

<common-codepen-snippet title="Handling forms: multiple checkboxes" slug="bGdmoyj" :preview="false" />

### Radio

```html
<div id="v-model-radiobutton">
  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>
  <br />
  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
  <br />
  <span>Picked: {{ picked }}</span>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      picked: ''
    }
  }
}).mount('#v-model-radiobutton')
```

<common-codepen-snippet title="Handling forms: radiobutton" slug="MWwPEMM" :preview="false" />

### Select

Simple select:

```html
<div id="v-model-select" class="demo">
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      selected: ''
    }
  }
}).mount('#v-model-select')
```

<common-codepen-snippet title="Handling forms: select" slug="KKpGydL" :preview="false" />

:::tip Note
Si la valeur initiale de votre expression `v-model` ne correspond à aucune des options, l'élément `<select> `sera rendu dans un état "non sélectionné". Sur iOS, cela empêchera l'utilisateur de sélectionner le premier élément car iOS ne déclenche pas d'événement de modification dans ce cas. Il est donc recommandé de fournir une option désactivée avec une valeur vide, comme illustré dans l'exemple ci-dessus.
:::

Select multiple (liés à un tableau):

```html
<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<br />
<span>Selected: {{ selected }}</span>
```

<common-codepen-snippet title="Handling forms: select bound to array" slug="gOpBXPz" tab="html,result" :preview="false" />

Options dynamiques rendues avec `v-for`:

```html
<div id="v-model-select-dynamic" class="demo">
  <select v-model="selected">
    <option v-for="option in options" :value="option.value">
      {{ option.text }}
    </option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      selected: 'A',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ]
    }
  }
}).mount('#v-model-select-dynamic')
```

<common-codepen-snippet title="Handling forms: select with dynamic options" slug="abORVZm" :preview="false" />

## Liaisons de la propriété `value`

Pour les options radio, checkbox et select, les valeurs de liaison `v-model` sont généralement des chaînes statiques (ou des booléens pour la checkbox):

```html
<!-- `picked` est une chaîne de caractère "a" quand le bouton est coché -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` est soit true ou false -->
<input type="checkbox" v-model="toggle" />

<!-- `selected` sera une chaine de caractères "abc" quand la première option sera sélectionnée -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

Mais parfois, nous pouvons vouloir lier la valeur à une propriété dynamique sur l'instance active courante. Nous pouvons utiliser `v-bind` pour y parvenir. De plus, l'utilisation de `v-bind` nous permet de lier la valeur d'entrée à des valeurs qui ne sont pas des chaines de caractères.

### Checkbox

```html
<input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
```

```js
// lorsque c'est coché:
vm.toggle === 'yes'
// lorsque que c'est décoché:
vm.toggle === 'no'
```

:::tip Tip
Les attributs `true-value` et `false-value` n'affectent pas l'attribut `value`, car les navigateurs n'incluent pas de cases non cochées dans les soumissions de formulaires. Pour garantir que l'une des deux valeurs est soumise dans un formulaire (par exemple, «oui» ou «non»), utilisez plutôt des boutons radio.
:::

### Radio

```html
<input type="radio" v-model="pick" v-bind:value="a" />
```

```js
// quand c'est coché:
vm.pick === vm.a
```

### Options de select 

```html
<select v-model="selected">
  <!-- objet littéral inline  -->
  <option :value="{ number: 123 }">123</option>
</select>
```

```js
// qund c'est sélectionné:
typeof vm.selected // => 'object'
vm.selected.number // => 123
```

## Modificateurs

### `.lazy`

Par défaut, `v-model` synchronise l'entrée avec les données après chaque événement` input` (à l'exception de la composition IME comme [indiqué ci-dessus](#vmodel-ime-tip)). Vous pouvez ajouter le modificateur `lazy` à la place pour synchroniser après les événements `change`:

```html
<!-- synchronisé après "change" au lieu de "input" -->
<input v-model.lazy="msg" />
```

### `.number`

Si vous voulez que l'entrée utilisateur soit automatiquement typée sous forme de nombre, vous pouvez ajouter le modificateur `number` à vos entrées de formulaires gérées par `v-model`:

```html
<input v-model.number="age" type="number" />
```

Ceci est souvent utile, car même avec `type ="number"`, la valeur des éléments d'entrée HTML renvoie toujours une chaîne de caractère. Si la valeur ne peut pas être analysée avec `parseFloat()`, alors la valeur d'origine est retournée.

### `.trim`

Si vous voulez que les espaces blancs de l'entrée utilisateur soient supprimés automatiquement, vous pouvez ajouter le modificateur `trim` à vos entrées gérées par `v-model`:

```html
<input v-model.trim="msg" />
```

## `v-model` with Components

> Si vous n'êtes pas encore familiarisé avec les composants de Vue, vous pouvez ignorer cela pour le moment

Les types d'saisie intégrés au HTML ne répondront pas toujours à vos besoins. Heureusement, les composants Vue vous permettent de créer des entrées réutilisables avec un comportement entièrement personnalisé. Ces entrées fonctionnent même avec `v-model`! Pour en savoir plus, lisez la section [entrées personnalisées](./component-basics.html#using-v-model-on-components) dans le guide des composants.
