# 자산(Assets)

## directives

- **유형:** `Object`

- **설명:**

    컴포넌트 인스턴스에서 사용할 수 있는 디렉티브들을 묶어서 제공하는 해시객체를 정의합니다.

- **Usage:**

    ```js
    const app = Vue.createApp({})

    app.component('focused-input', {
      directives: {
        focus: {
          mounted(el) {
            el.focus()
          }
        }
      },
      template: `<input v-focus>`
    })
    ```

- [커스텀 디렉티브(Custom Directives)](../guide/custom-directive.html)

## components

- **유형:** `Object`

- **설명:**

    컴포넌트 인스턴스에서 사용할 수 있는 컴포넌트들을 묶어서 제공하는 해시 객체를 정의합니다.

- **Usage:**

    ```js
    const Foo = {
      template: `<div>Foo</div>`
    }

    const app = Vue.createApp({
      components: {
        Foo
      },
      template: `<Foo />`
    })
    ```

- [컴포넌트(Components)](../guide/component-basics.html)
