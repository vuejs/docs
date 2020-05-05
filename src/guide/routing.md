# Routing

## Official Router

For most Single Page Applications, it's recommended to use the officially-supported [vue-router library](https://github.com/vuejs/vue-router). For more details, see vue-router's [documentation](https://router.vuejs.org/).

## Simple Routing from Scratch

If you only need very simple routing and do not wish to involve a full-featured router library, you can do so by dynamically rendering a page-level component like this:

``` js
const NotFoundComponent = { template: '<p>Page not found</p>' }
const HomeComponent = { template: '<p>Home page</p>' }
const AboutComponent = { template: '<p>About page</p>' }

const routes = {
  '/': HomeComponent,
  '/about': AboutComponent
}

const SimpleRouterApp = {
  data: () => ({
    currentRoute: window.location.pathname
  }),

  computed: {
    CurrentComponent () {
      return routes[this.currentRoute] || NotFoundComponent
    }
  },

  render () {
    return Vue.h(this.CurrentComponent)
  }
}

Vue.createApp(SimpleRouterApp).mount('#app')
```

Combined with the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API), you can build a very basic but fully-functional client-side router. To see that in practice, check out [this example app](https://github.com/phanan/vue-3.0-simple-routing-example).

## Integrating 3rd-Party Routers

If there's a 3rd-party router you prefer to use, such as [Page.js](https://github.com/visionmedia/page.js) or [Director](https://github.com/flatiron/director), integration is [similarly straightforward](https://github.com/phanan/vue-3.0-simple-routing-example/compare/master...pagejs). Here's a [complete example](https://github.com/phanan/vue-3.0-simple-routing-example/tree/pagejs) using Page.js.
