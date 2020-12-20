# 라우팅

## 공식 라우터

대부분의 단일 페이지 애플리케이션의 경우, 공식적으로 지원되는 [vue-router 라이브러리](https://github.com/vuejs/vue-router)를 사용하는 것이 좋습니다. 자세한 내용은 vue-router의 [문서](https://router.vuejs.org/)를 참조하십시오.

## 단순한 라우팅 시작하기

매우 단순한 라우팅만 필요하고 완전한 기능을 갖춘 라우터 라이브러리를 사용하지 않으려면 다음과 같이 페이지 수준 컴포넌트를 동적으로 렌더링하면 됩니다.

```js
const NotFoundComponent = { template: '<p>Page not found</p>' }
const HomeComponent = { template: '<p>Home page</p>' }
const AboutComponent = { template: '<p>About page</p>' }

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
}

Vue.createApp(SimpleRouter).mount('#app')
```

[History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API)와 결합하면 매우 기본적이면서도 완전한 기능을 갖춘 클라이언트측 라우터를 구축할 수 있습니다. 실제로 이를 확인하려면, [예제 앱](https://github.com/phanan/vue-3.0-simple-routing-example)을 확인하십시오.

## 써드파티 라우터 목록

만약 [Page.js](https://github.com/visionmedia/page.js)나 [Director](https://github.com/flatiron/director)같은 써드파티 라우터를 사용하는 것을 선호한다면, 통합하는 것도 [쉽습니다](https://github.com/phanan/vue-3.0-simple-routing-example/compare/master...pagejs). Page.js를 사용한 [완벽한 예제](https://github.com/phanan/vue-3.0-simple-routing-example/tree/pagejs)를 소개합니다.
