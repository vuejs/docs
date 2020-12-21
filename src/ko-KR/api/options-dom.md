# DOM

## template

- **타입:** `string`

- **상세:**

  컴포넌트 인스턴스의 마크업으로 사용할 문자열 템플릿입니다. 템플릿은 마운트 된 엘리먼트를 **대체** 합니다. 템플릿에 컨텐츠 배포 슬롯(content distribution slots)이 없는 경우, 마운트 된 엘리먼트의 기존 마크업은 무시됩니다.
  문자열이 `#`로 시작하면 `querySelector`로 사용되며, 선택한 엘리먼트의 innerHTML을 템플릿 문자열로 사용합니다. 이렇게 하면 일반적인 `<script type="x-template">` 트릭을 사용하여 템플릿을 포함시킬 수 있습니다.

  :::tip Note
  보안적 측면에서 신뢰할 수 있는 Vue 템플릿만 사용해야 합니다. 사용자 생성 콘텐츠(user-generated content)를 템플릿으로 사용하면 안됩니다.
  :::

  :::tip Note
  Vue 옵션에 렌더 함수가 있으면, 템플릿은 무시됩니다.
  :::

- **참고:**
  - [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)
  - [Content Distribution with Slots](../guide/component-basics.html#content-distribution-with-slots)

## render

- **타입:** `Function`

- **상세:**

  JavaScript의 완전한 프로그래밍 기능을 활용할 수 있도록 하는 문자열 템플릿의 대안입니다..

- **사용법:**

  ```html
  <div id="app" class="demo">
    <my-title blog-title="A Perfect Vue"></my-title>
  </div>
  ```

  ```js
  const app = Vue.createApp({})

  app.component('my-title', {
    render() {
      return Vue.h(
        'h1', // tag name,
        this.blogTitle // tag content
      )
    },
    props: {
      blogTitle: {
        type: String,
        required: true
      }
    }
  })

  app.mount('#app')
  ```

  :::tip Note
   `render` 함수는 `template`옵션이나 마운팅 엘리먼트의 DOM 내부 HTML 템플릿(in-DOM HTML template)에서 컴파일 된 렌더링 함수보다 높은 우선 순위를 가집니다.
  :::

- **참고:** [Render Functions](../guide/render-function.html)
