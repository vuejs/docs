# Hooks de cycle de vie

> Ce guide suppose que vous avez déjà lu l '[introduction du Composition API](composition-api-introduction.html) et les [Fondamentaux de la réactivité](reactivity-fundamentals.html). Lisez cela d'abord si vous êtes nouveau dans le composition API.

<VideoLesson href="https://www.vuemastery.com/courses/vue-3-essentials/lifecycle-hooks" title="Learn about how Lifecycle Hooks work with Vue Mastery">Regardez une vidéo gratuite sur les Hooks de cycle de vie sur Vue Mastery (EN)</VideoLesson>

Vous pouvez accéder au hook de cycle de vie d'un composant en préfixant le hook de cycle de vie avec "on".

Le tableau suivant explique comment les hooks de cycle de vie sont appelés dans [setup()](composition-api-setup.html):

| Options API       | Hook inside `setup` |
| ----------------- | ------------------- |
| `beforeCreate`    | Pas besoin\*        |
| `created`         | Pas besoin\*        |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |

:::tip
Comme `setup` est exécuté autour des hooks de cycle de vie `beforeCreate` et `created`, vous n'avez pas besoin de les définir explicitement. En d'autres termes, tout code qui serait écrit à l'intérieur de ces hooks devrait être écrit directement dans la fonction `setup`.
:::

Ces fonctions acceptent un callback qui sera exécuté lorsque le hook est appelé par le composant:

```js
// MyBook.vue

export default {
  setup() {
    // mounted
    onMounted(() => {
      console.log('Component is mounted!')
    })
  }
}
```
