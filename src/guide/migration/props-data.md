---
badges:
  - removed
---

# `propsData` <MigrationBadges :badges="$frontmatter.badges" />

## 개론

`propsData` 옵션은 Vue 인스턴트가 생성되고 제거되기까지 props를 전달하기 위해 사용됩니다. Vue 3 어플리케이션에서 props를 root 컴포넌트에 전달하기 위해서는 [createApp](/api/global-api.html#createapp) 의 두 번째 argument를 사용하세요.



## 2.x 문법

2.x 버전에서 우리는 아래와 같은 방법으로 Vue 인스턴스가 생성되는 과정에 props를 전달할 수 있었습니다.

```js
const Comp = Vue.extend({
  props: ['username'],
  template: '<div>{{ username }}</div>'
})

new Comp({
  propsData: {
    username: 'Evan'
  }
})
```

## 3.x 업데이트

`propsData`  옵션은 이제 제거되었습니다. 만약 root 컴포넌트 생성 과정에서 props를 전달할 필요가 있는 경우, `createApp` 의 두 번째 argument를 이용하세요: 

The `propsData` option has been removed. If you need to pass props to the root component instance during its creation, you should use the second argument of `createApp`:

```js
const app = createApp(
  {
    props: ['username'],
    template: '<div>{{ username }}</div>'
  },
  { username: 'Evan' }
)
```
