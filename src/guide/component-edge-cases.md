# Gestion des cas limites

> Cette page suppose que vous avez déjà lu les [Principes de base des composants](component-basics.md). Lisez-le d'abord si vous n'êtes pas familier avec les composants.

:::tip Note
Toutes les fonctionnalités de cette page documentent la gestion des cas rares, c'est-à-dire des situations inhabituelles qui nécessitent parfois de contourner un peu les règles de Vue. Notez cependant qu'ils présentent tous des inconvénients ou des situations où ils pourraient être dangereux. Celles-ci sont notées dans chaque cas, alors gardez-les à l'esprit lorsque vous décidez d'utiliser chaque fonctionnalité.
:::

## Contrôle des mises à jour

Grâce au système Reactivity de Vue, il sait toujours quand mettre à jour (si vous l'utilisez correctement). Cependant, il existe des cas extrêmes où vous voudrez peut-être forcer une mise à jour, malgré le fait qu'aucune donnée réactive n'a changé. Ensuite, il existe d'autres cas où vous voudrez peut-être empêcher les mises à jour inutiles.

### Forcer une mise à jour

Si vous avez besoin de forcer une mise à jour dans Vue, dans 99,99% des cas, vous avez fait une erreur quelque part. Par exemple, vous avez besoin d'un un état qui n'est pas suivi par le système de réactivité de Vue, par exemple avec une propriété `data` ajoutée après la création du composant.

Cependant, si vous avez exclu ce qui précède et que vous vous trouvez dans cette situation extrêmement rare de devoir forcer manuellement une mise à jour, vous pouvez le faire avec [`$ forceUpdate`](../api/instance-methods.html#forceupdate).

### Composants statiques économe avec `v-once`

Le rendu des éléments HTML simples est très rapide dans Vue, mais vous pouvez parfois avoir un composant contenant ** beaucoup ** de contenu statique. Dans ces cas, vous pouvez vous assurer qu'il n'est évalué qu'une seule fois puis mis en cache en ajoutant la directive `v-once` à l'élément racine, comme ceci:

```js
app.component('terms-of-service', {
  template: `
    <div v-once>
      <h1>Terms of Service</h1>
      ... a lot of static content ...
    </div>
  `
})
```

:::tip
Encore une fois, essayez de ne pas abuser de ce pattern. Bien que pratique dans ces rares cas où vous devez afficher beaucoup de contenu statique, ce n'est tout simplement pas nécessaire à moins que vous ne remarquiez réellement un rendu lent - en plus, cela pourrait causer beaucoup de confusion plus tard. Par exemple, imaginez un autre développeur qui n'est pas familier avec `v-once` ou qui le manque simplement dans le template. Ils peuvent passer des heures à essayer de comprendre pourquoi le template ne se met pas à jour correctement.
:::
