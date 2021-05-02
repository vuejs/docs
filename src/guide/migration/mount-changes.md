---
title: 'Mount API changes'
badges:
  - breaking
---

# 이제 Mount된 어플리케이션은 엘리먼트를 대체하지 않습니다<MigrationBadges :badges="$frontmatter.badges" />

## 개론

Vue 2.x에서는 `template` 을 가진 어플리케이션을 마운트할 때 렌더링되는 컨텐츠가 마운트하는 엘리먼트를 대체하였습니다. 이제 Vue 3.x에서는 렌더링되는 어플리케이션은 엘리먼트의 자식으로써 추가됩니다. 즉, 엘리먼트의 `innerHTML` 를 대치합니다.

## 2.x 문법

Vue 2.x에서는 HTML 요소 선택자를 `new Vue()` 나 `$mount`에 전달하였습니다:

```js
new Vue({
  el: '#app',
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

// or
const app = new Vue({
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

app.$mount('#app')
```

페이지를  `div`  엘리먼트에 전달된 선택자를 이용해 마운트 하는 경우(예시의 경우는 `id="app"` 의 경우):

```html
<body>
  <div id="app">
    Some app content
  </div>
</body>
```

렌더링 결과 해당  `div`  (`id="app"` 인 div)가 렌더링된 어플리케이션 컨텐츠로 대치됩니다.

```html
<body>
  <div id="rendered">Hello Vue!</div>
</body>
```

## 3.x Syntax

 Vue 3.x에서는 어플리케이션을 마운트하는 경우, 렌더링 된 컨텐츠가 `mount`  의 인자로 전달된 요소의 `innerHTML`  을 대치합니다.

```js
const app = Vue.createApp({
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

app.mount('#app')
```

 `id="app"` 을 가진 `div` 에 어플리케이션을 마운트 하는 경우 아래와 같은 결과가 나옵니다:

```html
<body>
  <div id="app" data-v-app="">
    <div id="rendered">Hello Vue!</div>
  </div>
</body>
```

## See also

- [`mount` API](/api/application-api.html#mount)
