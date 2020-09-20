# Роутинг

## Официальный роутер

Для большинства одностраничных приложений (SPA) рекомендуется использовать официально поддерживаемую [библиотеку Vue-router](https://github.com/vuejs/vue-router). Подробная информация по её использованию содержится в [документации библиотеки](https://router.vuejs.org/ru/).

## Простой роутер с нуля

Если вам достаточно простейшего роутера и вы не хотите задействовать полновесную внешнюю библиотеку, может оказаться достаточно просто динамической отрисовки компонента уровня страницы:

```js
const NotFoundComponent = { template: '<p>Страница не найдена</p>' }
const HomeComponent = { template: '<p>Главная страница</p>' }
const AboutComponent = { template: '<p>Страница о нас</p>' }

const routes = {
  '/': HomeComponent,
  '/about': AboutComponent
}

const SimpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname
  }),
  computed: {
    CurrentComponent() {
      return routes[this.currentRoute] || NotFoundComponent
    }
  },

  render() {
    return Vue.h(this.CurrentComponent)
  }
})

Vue.createApp(SimpleRouter).mount('#app')
```

В сочетании с [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API) можно создать простейший, но вполне рабочий клиентский роутер. Для практического примера, смотрите [это демонстрационное приложение](https://github.com/phanan/vue-3.0-simple-routing-example).

## Интеграция сторонних роутеров

Если вы предпочитаете использовать сторонний роутер, как например [Page.js](https://github.com/visionmedia/page.js) или [Director](https://github.com/flatiron/director), интеграция [тоже довольна проста](https://github.com/phanan/vue-3.0-simple-routing-example/compare/master...pagejs). Вот [полный пример](https://github.com/phanan/vue-3.0-simple-routing-example/tree/pagejs) для Page.js.
