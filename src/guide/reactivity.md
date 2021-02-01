# Reactivité en profondeur

Il est maintenant temps d'entrer plus en profondeur! L'une des caractéristiques les plus distinctes de Vue est le système de réactivité discret. Les modèles sont des objets _Proxy_ JavaScript. Lorsque vous les modifiez, la vue est mise à jour. Cela rend la gestion des états simple et intuitive, mais il est également important de comprendre son fonctionnement pour éviter certains pièges courants. Dans cette section, nous allons approfondir certains des détails de niveau inférieur du système de réactivité de Vue.

<VideoLesson href="https://www.vuemastery.com/courses/vue-3-reactivity/vue3-reactivity" title="Learn how how reactivity works in depth with Vue Mastery">Regardez une vidéo gratuite sur la réactivité en profondeur sur Vue Mastery (EN)</VideoLesson>

## Qu'est-ce-que la réactivité ?

Ce terme revient assez souvent dans la programmation de nos jours, mais que veulent dire les gens quand ils en parlent? La réactivité est un paradigme de programmation qui nous permet de nous adapter aux changements de manière déclarative. L'exemple canonique que les gens montrent généralement, car c'est un excellent exemple, est une feuille de calcul Excel.

<video width="550" height="400" controls>
  <source src="/images/reactivity-spreadsheet.mp4" type="video/mp4">
  Votre navigateur ne prend pas en charge la balise vidéo.
</video>

Si vous mettez le numéro deux dans la première cellule et le numéro 3 dans la seconde et que vous demandez la somme, la feuille de calcul vous la donnera. Pas de surprises là-bas. Mais si vous mettez à jour ce premier numéro, le SUM se met également à jour automatiquement.

JavaScript ne fonctionne généralement pas comme ça - Si nous devions écrire quelque chose de comparable en JavaScript:

```js
var val1 = 2
var val2 = 3
var sum = val1 + val2

// sum
// 5

val1 = 3

// sum
// 5
```

Si nous mettons à jour la première valeur, la somme n'est pas ajustée.

Alors, comment ferions-nous cela en JavaScript?

- Détecter quand il y a un changement dans l'une des valeurs
- Suivre la fonction qui la change
- Déclenchez la fonction pour qu'elle puisse mettre à jour la valeur finale

## Comment Vue suit ces changements

Lorsque vous passez un objet JavaScript simple à une application ou à une instance de composant comme option `data`, Vue parcourra toutes ses propriétés et les convertira en [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) n utilisant un gestionnaire avec des getters et des setters. Il s'agit d'une fonctionnalité réservée à ES6, mais nous proposons une version de Vue 3 qui utilise l'ancien `Object.defineProperty` pour prendre en charge les navigateurs IE. Les deux ont la même API de surface, mais la version Proxy est plus mince et offre des performances améliorées.

<div class="reactivecontent">
  <common-codepen-snippet title="Proxies and Vue's Reactivity Explained Visually" slug="zYYzjBg" tab="result" theme="light" :height="500" :team="false" user="sdras" name="Sarah Drasner" :editable="false" :preview="false" />
</div>

Cela a été assez rapide et nécessite une certaine connaissance des [Proxys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) pour comprendre! Alors allons-y pas à pas. Il existe de nombreuses publications sur les proxys, mais ce que vous devez vraiment savoir, c'est qu'un **Proxy est un objet qui englobe un autre objet ou une autre fonction et vous permet de l'intercepter.**

On l'utilise comme ça `new Proxy(target, handler)`

```js
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, prop) {
    return target[prop]
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// tacos
```

D'accord, pour l'instant, nous emballons simplement cet objet et le retournons. Cool, mais pas encore très utile. Mais attention, nous pouvons également intercepter cet objet pendant que nous l'enveloppons dans le proxy. Cette interception s'appelle un piège ou "trap".

```js
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, prop) {
    console.log('intercepté!')
    return target[prop]
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// intercepté!
// tacos
```

Au-delà d'un console log, nous pourrions faire tout ce que nous souhaitons. Nous pourrions même _ne pas_ renvoyer la valeur réelle si nous le voulions. C'est ce qui rend les proxys si puissants pour créer des API.

De plus, il existe une autre fonctionnalité que nous offrent les proxys. Plutôt que de simplement renvoyer la valeur comme ceci: `target[prop]`, nous pourrions aller plus loin et utiliser une fonctionnalité appelée `Reflect`, qui nous permet de faire correctement la liaison `this`. Cela ressemble à ceci:

```js{7}
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, prop, receiver) {
    return Reflect.get(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// tacos
```

Nous avons mentionné précédemment que pour avoir une API qui met à jour une valeur finale lorsque quelque chose change, nous allons devoir définir de nouvelles valeurs lorsque quelque chose change. Nous faisons cela dans le handler, dans une fonction appelée `track`, où nous passons `target` et `key`.

```js{7}
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, prop, receiver) {
    track(target, prop)
    return Reflect.get(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// tacos
```

Enfin, nous définissons (set) également de nouvelles valeurs lorsque quelque chose change. Pour cela, nous allons définir les modifications sur notre nouveau proxy, en déclenchant (trigger) ces modifications:

```js
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, prop, receiver) {
    track(target, prop)
    return Reflect.get(...arguments)
  },
  set(target, key, value, receiver) {
    trigger(target, key)
    return Reflect.set(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// tacos
```

Vous vous souvenez de cette liste d'il y a quelques paragraphes? Nous avons maintenant quelques réponses sur la façon dont Vue gère ces changements:

- <strike>Détecter quand il y a un changement dans l'une des valeurs</strike>: Nous n'avons plus à le faire, car les proxys nous permettent de l'intercepter
- **Suivre la fonction qui la modifie**: Nous faisons cela dans un getter dans le proxy, appelé `effect`
- **Déclenchez la fonction pour qu'elle puisse mettre à jour la valeur finale**: Nous le faisons dans un setter dans le proxy, appelé `trigger`.

L'objet mandaté est invisible pour l'utilisateur, mais sous le capot, ils permettent à Vue d'effectuer un suivi des dépendances et une notification de modification lorsque les propriétés sont accessibles ou modifiées. Depuis Vue 3, notre réactivité est désormais disponible dans un [package séparé](https://github.com/vuejs/vue-next/tree/master/packages/reactivity). Une mise en garde est que les consoles de navigateur se formatent différemment lorsque les objets de données convertis sont loggés, vous pouvez donc installer [vue-devtools](https://github.com/vuejs/vue-devtools) pour une interface plus conviviale.

### Objets proxy

Vue suit en interne tous les objets qui ont été rendus réactifs, donc il renvoie toujours le même proxy pour le même objet.

Lorsqu'un objet imbriqué est accédé à partir d'un proxy réactif, cet objet est également converti en proxy avant d'être renvoyé:

```js
const handler = {
  get(target, prop, receiver) {
    track(target, prop)
    const value = Reflect.get(...arguments)
    if (isObject(value)) {
      return reactive(value)
    } else {
      return value
    }
  }
  // ...
}
```

### Proxy vs. identité originale

L'utilisation de Proxy introduit une nouvelle mise en garde à prendre en compte: l'objet proxy n'est pas égal à l'objet d'origine en termes de comparaison d'identité (`===`). Par exemple:

```js
const obj = {}
const wrapped = new Proxy(obj, handlers)

console.log(obj === wrapped) // false
```

La version originale et la version enveloppée se comporteront de la même manière dans la plupart des cas, mais sachez qu'elles échoueront des opérations qui reposent sur des comparaisons d'identité fortes, telles que `.filter()` ou `.map()`.
Il est peu probable que cette mise en garde se produise lors de l'utilisation de l'API d'options, car tous les états réactifs sont accessibles à partir de `this` et sont déjà garantis comme des proxys.

Cependant, lorsque vous utilisez l'API de composition pour créer explicitement des objets réactifs, la meilleure pratique consiste à ne jamais conserver de référence à l'objet brut d'origine et à ne travailler qu'avec la version réactive:

```js
const obj = reactive({
  count: 0
}) // aucune référence à l'original
```

## Observateurs

Chaque instance de composant a une instance d'observateur correspondante, qui enregistre toutes les propriétés "touchées" pendant le rendu du composant en tant que dépendances. Plus tard, lorsque le setter d’une dépendance est déclenché, il en informe l’observateur, ce qui entraîne à son tour le re-rendu du composant.

<div class="reactivecontent">
  <common-codepen-snippet title="Second Reactivity with Proxies in Vue 3 Explainer" slug="GRJZddR" tab="result" theme="light" :height="500" :team="false" user="sdras" name="Sarah Drasner" :editable="false" :preview="false" />
</div>

Lorsque vous transmettez un objet à une instance de composant en tant que données, Vue le convertit en proxy. Ce proxy permet à Vue d'effectuer le suivi des dépendances et la notification des modifications lorsque les propriétés sont accessibles ou modifiées. Chaque propriété est considérée comme une dépendance.

Après le premier rendu, un composant devrait suivre une liste de dépendances &mdash; les propriétés auxquelles il a accédé lors du rendu. A l'inverse, le composant devient _abonné_ à chacune de ces propriétés. Lorsqu'un proxy intercepte un changement, la propriété notifie à tous ses composants _abonnés_ qu'ils doivent effectuer un nouveau rendu.

[//]: # 'TODO: Insert diagram'

> Si vous utilisez Vue 2.x et versions antérieures, vous pourriez être intéressé par certaines des mises en garde de détection de changement qui existent pour ces versions, [explorées plus en détail ici](change-detection.md).
