---
sidebar: auto
---

# 스타일 가이드

이 문서는 Vue 코드를 위한 공식 스타일 가이드입니다. Vue를 사용하여 프로젝트를 진행 중이라면 이 문서가 에러와 안티 패턴, 바이크 쉐딩(bikeshedding - 사소한 일에 대한 필요 이상의 논쟁)을 피하는 데 좋은 참고서가 될 것입니다. 하지만, 그 어떤 스타일 가이드도 모든 팀이나 프로젝트에 적합하지는 않으리라 생각합니다. 그러므로 경험과 기술 스택 및 개인적 가치에 따른 편차를 염두에 두고 이 스타일 가이드를 적용하기 바랍니다.

문서 전반에서 JavaScript나 HTML에 대한 제안을 피합니다. 세미콜론을 쓰든, 후행 쉼표(trailing commas - 문장 끝에 쉼표를 사용)를 쓰든, HTML의 속성값에 작은따옴표를 쓰든, 큰따옴표를 쓰든 상관 없습니다. 그러나, Vue 컨텍스트에서 특정 패턴이 유용하다는 점을 알게 된 몇 가지 예외가 존재합니다.

결과적으로 규칙을 다음과 같이 네 가지로 범주로 나눴습니다.

## 규칙 범주

### 우선순위 A: 필수

이 규칙은 오류를 방지하는 데 도움이 되므로 어떻게든 학습하고 준수해야 합니다. 매우 드물게 예외가 있을 수 있지만, JavaScript와 Vue에 대한 전문 지식이 있어야 적용할 수 있습니다.

### 우선순위 B: 적극 권장

대부분의 프로젝트에서 이 규칙이 가독성을 높이고 개발자 경험을 향상시킨다는 것이 밝혀졌습니다. 규칙을 어겨도 코드는 여전히 실행되겠지만, 규칙 위반은 드물어야 하며 그럴 만한 이유가 있어야 합니다.

### 우선순위 C: 권장

하나같이 좋은 선택 사항이 여러 개 존재하는 경우, 일관성을 보장하도록 임의의 선택을 할 수 있습니다. 이 규칙에서는 각각의 수용 가능 옵션을 설명하고 기본 선택을 제안합니다. 즉, 일관성이 있고 그럴 만한 이유가 있는 한, 자신의 코드베이스에서 자유롭게 다른 선택을 할 수 있음을 의미합니다. 그럴 만한 좋은 이유가 있어야 합니다! 커뮤니티 표준에 적응함으로써 다음을 수행할 수 있습니다.

1. 마주하는 대부분의 커뮤니티 코드를 보다 쉽게 분석할 수 있도록 두뇌를 훈련시킵니다.
2. 수정 없이 대부분의 커뮤니티 코드 예제를 복사하여 붙여넣을 수 있습니다.
3. 신입 사원은 적어도 Vue에 있어서 선호하는 코딩 스타일이 이미 몸에 뱄다는 것을 알게 됩니다.

### 우선순위 D: 주의 필요

Vue의 일부 특성은 예외 사항을 수용하거나 레거시 코드 기반에서 보다 원활한 마이그레이션을 하기 위해 존재합니다. 그러나, 이 특성을 남용하면 코드 유지보수가 어려워지거나 버그의 원인이 될 수도 있습니다. 이 규칙은 잠재적 위험 특성을 조명하고, 언제 그리고 왜 이 특성을 피해 써야 하는지를 설명합니다.

## 우선순위 A 규칙: 필수 <span class="hide-from-sidebar">(에러 방지)</span>

### 컴포넌트 이름에 합성어 사용 <sup data-p="a">필수</sup>

**컴포넌트 이름은 루트 컴포넌트인 `App`과 Vue에서 제공하는 내장 컴포넌트(`<transition>`, `<component>` 등)를 제외하고 항상 합성어를 사용해야 합니다.**

모든 HTML 엘리먼트의 이름은 한 단어이기 때문에 합성어를 사용하는 것은 기존 그리고 향후 HTML 엘리먼트와의 [충돌을 방지합니다.](http://w3c.github.io/webcomponents/spec/custom/#valid-custom-element-name)

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```js
app.component('todo', {
  // ...
})
```

```js
export default {
  name: 'Todo',
  // ...
}
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```js
app.component('todo-item', {
  // ...
})
```

```js
export default {
  name: 'TodoItem',
  // ...
}
```



### Prop 정의 <sup data-p="a">필수</sup>

**Prop은 가능한 한 상세하게 정의해야 합니다.**

커밋된 코드에서 prop은 항상 가능한 한 상세하게 정의해야 합니다. 최소한 type은 명시하도록 합니다.

::: details 자세한 설명 상세한 [prop 정의](https://vuejs.org/v2/guide/components.html#Prop-Validation)에는 두 가지 장점이 있습니다.

- 컴포넌트의 API를 문서화하여 컴포넌트가 어떻게 사용되는지 쉽게 알아볼 수 있습니다.
- 개발 중에, 컴포넌트에 잘못된 유형의 props가 전달되면 Vue가 경고를 표시하여 잠재적인 오류 원인을 파악하는 데 도움이 됩니다. :::

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```js
// 프로토타입의 경우, 괜찮습니다.
props: ['status']
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```js
props: {
  status: String
}
```

```js
// 더 나은 방법!
props: {
  status: {
    type: String,
    required: true,

    validator: value => {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].includes(value)
    }
  }
}
```



### `v-for`에 key 지정 <sup data-p="a">필수</sup>

**`v-for`는 항상 `key`와 함께 사용합니다.**

내부 컴포넌트 상태를 하위 트리로 유지하려면 `v-for`에 *항상* `key`가 필요합니다. 엘리먼트의 경우에도 에니메이션의 [객체 불변성](https://bost.ocks.org/mike/constancy/)과 같이 예측 가능한 행동을 유지하는 것이 좋습니다.

::: details 자세한 설명 할 일 목록이 있다고 가정해 봅시다.

```js
data() {
  return {
    todos: [
      {
        id: 1,
        text: 'Learn to use v-for'
      },
      {
        id: 2,
        text: 'Learn to use key'
      }
    ]
  }
}
```

다음으로, 목록을 알파벳순으로 정렬합니다. DOM을 갱신할 때 Vue는 가능한 최소한으로 DOM 변경을 수행하도록 렌더링을 최적화합니다. 이는 첫 번째 할 일 엘리먼트를 삭제한 다음 목록 끝에 다시 추가하는 것을 의미합니다.

이때 문제는 DOM에 남아있는 엘리먼트를 삭제하지 않는 것이 중요한 경우가 있다는 점입니다. 예를 들어 렌더링된 `<input>` 엘리먼트에 포커스를 유지하거나, 목록을 정렬하는 데 `<transition-group>`을 사용하고 싶을 수도 있습니다. 이런 경우, 각 항목에 고유한 key를 추가(예: `:key="todo.id"`)함으로써 Vue가 보다 예측 가능하게 작동하도록 알려줍니다.

경험상, 여러분과 여러분의 팀이 이런 예외 상황에 대해 걱정할 필요가 없게끔 *항상* 고유한 key를 추가하는 것이 더 낫습니다. 이렇게 하면 드물게 객체 불변성이 필요치 않은 성능 중심의 작업 상황에서 의식적으로 예외를 만들 수 있습니다. :::

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```html
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```



### `v-if`와 `v-for` 동시 사용 피하기 <sup data-p="a">필수</sup>

**`v-for`를 쓴 엘리먼트에 절대 `v-if`를 사용하지 마세요.**

<code>v-if</code>와 <code>v-for</code>를 함께 쓰고 싶어지는 두 가지 일반적인 사례가 있습니다.

- 목록의 항목을 필터링할 때 (예: `v-for="user in users" v-if="user.isActive"`)<br>이 경우, `users`를 활성 사용자를 반환하는 새로운 computed 속성(예: `activeUsers`)으로 대체합니다.

- 숨김 목록의 렌더링을 피할 때 (예: `v-for="user in users" v-if="shouldShowUsers"`)<br>이 경우, `v-if`를 컨테이너 엘리먼트로 옮깁니다. (예: `ul`, `ol`)

::: details 자세한 설명 Vue가 디렉티브를 처리할 때, `v-if`가 `v-for` 보다 높은 우선순위를 갖습니다. 다음 템플릿을 살펴 봅시다.

```html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

위 템플릿에서 `v-if` 디렉티브가 먼저 계산되고, 해당 처리 시점에 반복 변수인 `user`가 존재하지 않기 때문에 에러가 발생할 것입니다.

이 문제는 다음과 같이 computed 속성을 대신 반복하여 해결할 수 있습니다.

```js
computed: {
  activeUsers() {
    return this.users.filter(user => user.isActive)
  }
}
```

```html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

또는 `v-for`가 있는 `<template>` 태그로 `<li>` 엘리먼트를 감쌀 수 있습니다.

```html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

:::

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

```html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```



### 컴포넌트 스타일 범위 지정 <sup data-p="a">필수</sup>

**애플리케이션에서 최상위 `App` 컴포넌트 및 레이아웃 컴포넌트의 스타일은 전역일 수 있지만, 그 외 모든 컴포넌트에는 항상 범위가 지정된 스타일을 적용해야 합니다.**

이는 [싱글 파일 컴포넌트](../guide/single-file-component.html)에만 해당하는 내용으로 꼭 [`scoped` 속성](https://vue-loader.vuejs.org/en/features/scoped-css.html)을 사용할 필요는 *없습니다.* [CSS 모듈](https://vue-loader.vuejs.org/en/features/css-modules.html), [BEM](http://getbem.com/)과 같은 클래스 기반 전략 또는 기타 라이브러리나 컨벤션 등을 통해 스타일 범위를 지정할 수 있습니다.

**그러나, 컴포넌트 라이브러리는 `scoped` 속성 대신 클래스 기반 전략을 사용하도록 합니다.**

클래스 기반 전략은 너무 높지 않은 특수성을 지니면서도 충돌을 일으킬 가능성이 매우 낮습니다. 따라서 읽기 쉬운 클래스 이름으로 내부 스타일을 더 쉽게 재정의하게 만듭니다.

::: details 자세한 설명 대규모 프로젝트 개발, 다른 개발자와의 협업 또는 서드 파티(3rd-party) HTML/CSS(예: Auth0)를 포함한 작업을 하고 있다면, 일관된 스타일 범위를 지정해서 의도에 부합하는 컴포넌트에만 스타일을 적용할 수 있습니다.

`scoped` 속성 외에도 고유한 클래스 이름을 사용해서 서드 파티(3rd-party) CSS가 자체 HTML에 적용되지 않게 할 수 있습니다. 예를 들어, 많은 프로젝트에서 클래스 이름으로 BEM과 같은 전략 없이 `button`, `btn` 또는 `icon`을 사용하더라도 앱이나 컴포넌트별 접두사(예: `ButtonClose-icon`)를 추가하면 어느 정도 스타일 충돌을 방지할 수 있습니다. :::

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```html
<template>
  <button class="btn btn-close">×</button>
</template>

<style>
.btn-close {
  background-color: red;
}
</style>
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```html
<template>
  <button class="button button-close">×</button>
</template>

<!-- `scoped` 속성 사용 -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

```html
<template>
  <button :class="[$style.button, $style.buttonClose]">×</button>
</template>

<!-- CSS 모듈 사용 -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

```html
<template>
  <button class="c-Button c-Button--close">×</button>
</template>

<!-- BEM 방법론 사용 -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```



### 비공개 속성 이름 <sup data-p="a">필수</sup>

**모듈 범위를 지정하여 외부에서 비공개 함수에 접근할 수 없도록 합니다. 범위 지정이 불가능한 경우, plugin, mixin 등 공개 API로 여기면 안 될 사용자 정의 비공개 속성에 대해 항상 `$_` 접두사를 사용해야 합니다. 그런 다음 다른 작성자의 코드와 충돌하지 않도록 이름이 지정된 범위 또한 포함해야 합니다. (예: `$_yourPluginName_`)**

::: details 자세한 설명 Vue는 `_` 접두사로 Vue만의 비공개 속성을 정의하므로 동일한 접두사(예: `_update`)를 사용하면 인스턴스 속성을 덮어쓸 위험이 있습니다. Vue가 현재 특정 속성 이름을 사용하지 않고, 해당 내용을 점검하더라도 이후 버전에서 충돌이 발생하지 않으리란 법은 없습니다.

Vue 생태계에서 `$` 접두사는 사용자에게 노출되는 특수한 인스턴스 속성입니다. 따라서 `$` 접두사를 *비공개* 속성에 사용하는 것은 적합하지 않습니다.

대신, Vue와 충돌하지 않도록 사용자 정의 비공개 속성에 대해 두 접두사를 합친 `$_` 사용을 권장합니다. :::

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```js
const myGreatMixin = {
  // ...
  methods: {
    update() {
      // ...
    }
  }
}
```

```js
const myGreatMixin = {
  // ...
  methods: {
    _update() {
      // ...
    }
  }
}
```

```js
const myGreatMixin = {
  // ...
  methods: {
    $update() {
      // ...
    }
  }
}
```

```js
const myGreatMixin = {
  // ...
  methods: {
    $_update() {
      // ...
    }
  }
}
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```js
const myGreatMixin = {
  // ...
  methods: {
    $_myGreatMixin_update() {
      // ...
    }
  }
}
```

```js
// 더 나은 방법!
const myGreatMixin = {
  // ...
  methods: {
    publicMethod() {
      // ...
      myPrivateFunction()
    }
  }
}

function myPrivateFunction() {
  // ...
}

export default myGreatMixin
```



## 우선순위 B 규칙: 적극 권장 <span class="hide-from-sidebar">(가독성 향상을 위함)</span>

### 컴포넌트 파일 <sup data-p="b">적극 권장</sup>

**빌드 시스템을 사용하여 파일을 연결할 때, 각 컴포넌트는 자체 파일에 속해야 합니다. (.vue 파일)**

컴포넌트를 편집하거나 컴포넌트가 어떻게 사용되는지 검토할 때, 자체 파일을 이용하면 컴포넌트를 보다 빠르게 파악할 수 있습니다.

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```js
app.component('TodoList', {
  // ...
})

app.component('TodoItem', {
  // ...
})
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```
components/
|- TodoList.js
|- TodoItem.js
```

```
components/
|- TodoList.vue
|- TodoItem.vue
```



### 싱글 파일 컴포넌트 파일 명명 규칙 <sup data-p="b">적극 권장</sup>

**[싱글 파일 컴포넌트](../guide/single-file-component.html)의 파일명은 항상 파스칼 케이스(PascalCase) 또는 케밥 케이스(kebab-case)여야 합니다.**

파스칼 케이스(PascalCase)는 JS(X)와 템플릿에서 컴포넌트를 참조하는 형식과 일치하므로 자동 완성이 가능한 코드 에디터에 최적화되어 있습니다. 하지만, 대소문자가 혼합된 파일명은 때때로 대소문자를 구분하지 않는 파일 시스템에서 문제를 일으킬 수 있습니다. 따라서 케밥 케이스(kebab-case) 또한 파일명으로 온전히 허용됩니다.

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```
components/
|- mycomponent.vue
```

```
components/
|- myComponent.vue
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```
components/
|- MyComponent.vue
```

```
components/
|- my-component.vue
```



### 베이스 컴포넌트 이름 <sup data-p="b">적극 권장</sup>

**애플리케이션 고유의 스타일과 규칙을 적용하는 베이스 컴포넌트(presentational, dumb, pure로도 잘 알려진 컴포넌트)의 이름은 모두 `Base`, `App`, 또는 `V`처럼 특정 접두사로 시작해야 합니다.**

::: details 자세한 설명 베이스 컴포넌트는 애플리케이션에서 일관된 스타일과 동작을 하기 위한 토대가 됩니다. 컴포넌트는 **다음의 내용만을** 포함해야 합니다.

- HTML 엘리먼트
- 그 외 베이스 컴포넌트
- 서드 파티(3rd-party) UI 컴포넌트

그러나, 이러한 베이스 컴포넌트는 전역 상태(예: Vuex 스토어의 상태)를 **절대 포함하면 안 됩니다.**

특정 목적을 위한 엘리먼트(예: `BaseIcon`)가 아니라면, 컴포넌트 이름에는 대개 컴포넌트가 감싸고 있는 엘리먼트의 이름이 포함되는 경우가 많습니다. (예: `BaseButton`, `BaseTable`)<br>보다 구체적인 맥락에서 유사한 컴포넌트를 구현하는 경우, 구현된 컴포넌트는 대부분 이러한 베이스 컴포넌트를 사용하게 됩니다. (예: `BaseButton`은 `ButtonSubmit` 안에서 쓰일 것입니다.)

이 규칙은 아래와 같이 몇 가지 장점이 있습니다.

- 코드 에디터에서 컴포넌트 목록을 알파벳 순으로 정렬하면, 애플리케이션의 베이스 컴포넌트가 모두 함께 나열되어 쉽게 식별할 수 있습니다.

- 컴포넌트 이름은 항상 여러 단어로 구성되기 때문에 간단한 래퍼 컴포넌트의 이름에 임의의 접두사를 넣지 않아도 됩니다. (예: `MyButton`, `VueButton`)

- 이러한 컴포넌트는 매우 자주 사용되므로 import 구문으로 불러오는 대신 전역 컴포넌트로 만들고 싶을 것입니다. Webpack에서 다음과 같이 접두사를 포함하는 컴포넌트를 전역 컴포넌트로 만들 수 있습니다. (역자 주: 아래 코드는 src 폴더에서 Base로 시작하는 vue, js 파일을 필터링해 전역 컴포넌트로 한 번에 등록합니다.)

    ```js
    const requireComponent = require.context("./src", true, /Base[A-Z]\w+\.(vue|js)$/)
    requireComponent.keys().forEach(function (fileName) {
      let baseComponentConfig = requireComponent(fileName)
      baseComponentConfig = baseComponentConfig.default || baseComponentConfig
      const baseComponentName = baseComponentConfig.name || (
        fileName
          .replace(/^.+\//, '')
          .replace(/\.\w+$/, '')
      )
      app.component(baseComponentName, baseComponentConfig)
    })
    ```

:::

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

```
components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue
```

```
components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
```



### 싱글 인스턴스 컴포넌트 이름 <sup data-p="b">적극 권장</sup>

**하나의 활성 인스턴스만을 갖는 컴포넌트는 오직 하나의 인스턴스만 있을 수 있음을 표시하도록 `The` 접두사로 시작해야 합니다.**

이 말은 컴포넌트가 단일 페이지에서만 사용된다는 게 아니라, *페이지당* 한 번만 사용되어야 한다는 의미입니다. 이러한 컴포넌트는 애플리케이션 내 컨텍스트가 아니며 고유하기 때문에 어떠한 props도 허용하지 않습니다. props를 추가해야 할 필요가 생기면, <code>The</code> 접두사가 '이 컴포넌트는 실제로 *현재* 페이지당 한 번만 사용되는 재사용 가능 컴포넌트임'을 나타내는 좋은 표시가 됩니다.

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```
components/
|- Heading.vue
|- MySidebar.vue
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```
components/
|- TheHeading.vue
|- TheSidebar.vue
```



### 밀접하게 연관된 컴포넌트 이름 <sup data-p="b">적극 권장</sup>

**부모 컴포넌트와 밀접하게 연관된 자식 컴포넌트는 접두사로 부모 컴포넌트의 이름을 사용해야 합니다.**

컴포넌트가 부모 컴포넌트의 컨텍스트에서만 의미가 있는 경우, 컴포넌트 이름에서 그 관계를 분명하게 드러내야 합니다. 코드 에디터는 주로 알파벳순으로 파일을 정렬하므로 연관된 컴포넌트 파일의 순서가 나란히 유지됩니다.

::: details 자세한 설명 여러분은 다음과 같이 부모 컴포넌트의 이름을 딴 디렉토리에 자식 컴포넌트를 중첩하여 이 문제를 해결하고 싶을 수 있습니다.

```
components/
|- TodoList/
   |- Item/
      |- index.vue
      |- Button.vue
   |- index.vue
```

또는

```
components/
|- TodoList/
   |- Item/
      |- Button.vue
   |- Item.vue
|- TodoList.vue
```

이는 다음과 같은 결과를 초래하므로 권장하지 않습니다.

- 비슷한 이름의 파일이 많아 코드 에디터에서 파일을 빠르게 전환하기 어려워집니다.
- 중첩된 하위 디렉토리로 인해 코드 에디터의 사이드바에서 컴포넌트를 탐색하는 데 걸리는 시간이 늘어납니다. :::

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue
```

```
components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

```
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```



### 컴포넌트 이름의 단어 순서 <sup data-p="b">적극 권장</sup>

**컴포넌트 이름은 최상위 수준의 단어(대부분이 자주 또 일반적으로 사용하는 단어)로 시작하고 설명을 나타내는 단어로 끝나야 합니다.**

::: details 자세한 설명 여러분은 궁금해할지 모릅니다.

> "왜 컴포넌트 이름에 자연스러운 표현을 적게 사용하라고 강요할까요?"

영어에서 형용사 및 기타 서술어는 보통 명사 앞에 표기합니다. 반면, 다음과 같은 예외에서는 단어들을 이어주는 연결 단어가 필요합니다.

- 우유*와* 커피
- 수프*의* 하루
- 박물관*에* 가는 방문객

원한다면 컴포넌트 이름에 연결 단어를 포함할 수 있지만, 순서는 여전히 중요합니다.

또한 **"최상위 수준"으로 간주하는 내용은 애플리케이션과 맥락적으로 관련이 있다**는 점에 유의하세요. 예를 들어, 검색 양식이 있는 애플리케이션을 상상해 보세요. 애플리케이션은 다음과 같은 컴포넌트를 포함할 것입니다.

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

위에서 알 수 있듯, 검색에 해당하는 컴포넌트를 알아보기 매우 어렵습니다. 이제 규칙에 따라 컴포넌트의 이름을 변경해 보겠습니다.

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputExcludeGlob.vue
|- SearchInputQuery.vue
|- SettingsCheckboxLaunchOnStartup.vue
|- SettingsCheckboxTerms.vue
```

코드 에디터는 주로 알파벳순으로 파일을 정렬하므로 이제 컴포넌트 사이의 중요한 관계를 한 눈에 파악할 수 있습니다.

여러분은 "search" 디렉토리에 모든 검색 컴포넌트를 중첩한 다음, "settings" 디렉토리에 모든 설정 컴포넌트를 중첩하여 이 문제를 해결하고 싶을 수 있습니다. 아래와 같은 이유로 이런 접근 방식은 대규모 애플리케이션(예: 100개 이상의 컴포넌트가 있는 경우)에서만 권장합니다.

- 일반적으로 단일 `컴포넌트` 디렉토리를 스크롤하는 것보다 중첩된 하위 디렉토리를 탐색하는 데 더 많은 시간이 소요됩니다.
- 컴포넌트 이름 충돌(예: 다수의 `ButtonDelete.vue` 컴포넌트)로 인해 코드 에디터에서 특정 컴포넌트를 빠르게 탐색하기 어려워집니다.
- 리팩토링은 더욱 어려워집니다. 컴포넌트 이동 시, 찾아-바꾸기 기능만으로 상대 참조를 갱신하기에 충분하지 않은 경우가 많기 때문입니다. :::

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```



### Self-closing 컴포넌트 <sup data-p="b">적극 권장</sup>

**[싱글 파일 컴포넌트](../guide/single-file-component.html), 문자열 템플릿 및 [JSX](../guide/render-function.html#jsx)에서 내용이 없는 컴포넌트는 self-closing 처리해야 합니다. 하지만, DOM 템플릿에서는 그렇게 하면 안 됩니다.**

Self-close 처리된 컴포넌트는 내용이 없을 뿐만 아니라 **문자 그대로 가진 내용이 없다는 의미를 전달**합니다. 이는 책에서 그저 빈 페이지와 "이 페이지는 의도적으로 비워두었습니다."라는 라벨이 붙은 페이지의 차이라 할 수 있습니다. 여러분의 코드 또한 불필요한 닫기 태그 없이 깔끔합니다.

안타깝게도 HTML은 사용자 지정 엘리먼트의 self-closing 처리를 허용하지 않습니다. (역자 주: br, hr, img, input, source 등 [공식적으로 지정된 "void" 엘리먼트](https://www.w3.org/TR/html/syntax.html#void-elements)만 종료 태그를 생략할 수 있습니다.) 그러므로 이 규칙은 Vue의 템플릿 컴파일러가 DOM보다 먼저 템플릿에 접근한 다음, DOM 사양을 준수하는 HTML을 제공할 경우에만 적용할 수 있습니다.

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```html
<!-- 싱글 파일 컴포넌트, 문자열 템플릿, JSX에서 -->
<MyComponent></MyComponent>
```

```html
<!-- DOM 템플릿에서 -->
<my-component/>
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```html
<!-- 싱글 파일 컴포넌트, 문자열 템플릿, JSX에서 -->
<MyComponent/>
```

```html
<!-- DOM 템플릿에서 -->
<my-component></my-component>
```



### 템플릿 내부 컴포넌트 명명 규칙 <sup data-p="b">적극 권장</sup>

**대부분의 프로젝트가 그렇듯, [싱글 파일 컴포넌트](../guide/single-file-component.html)와 문자열 템플릿 안의 컴포넌트 이름은 항상 파스칼 케이스(PascalCase)여야 하며, DOM 템플릿 안의 컴포넌트 이름은 케밥 케이스(kebab-case)여야 합니다.**

파스칼 케이스(PascalCase)는 케밥 케이스(kebab-case)에 비해 몇 가지 장점이 있습니다.

- 파스칼 케이스(PascalCase)는 JavaScript에서도 사용되므로 코드 에디터가 템플릿 안에서 컴포넌트 이름을 자동 완성할 수 있습니다.
- 한-단어(single-word)로 된 HTML 엘리먼트와 비교해볼 때, `<MyComponent>`는 하나(- 하이픈)가 아닌 두 개의 문자(M, C 대문자)가 다르기 때문에 `<my-component>`에 비해 시각적으로 더 구별하기 쉽습니다.
- 템플릿에서 웹 컴포넌트처럼 Vue가 아닌 사용자 지정 엘리먼트를 함께 사용하는 경우, 파스칼 케이스(PascalCase)는 Vue 컴포넌트를 뚜렷하게 구분할 수 있도록 합니다.

안타깝게도 HTML은 대소문자를 구분하지 않습니다. 따라서 DOM 템플릿에서는 여전히 케밥 케이스(kebab-case)를 사용해야 합니다.

이미 케밥 케이스(kebab-case)에 많은 투자를 했다면, 프로젝트 전반에서 동일한 명명 규칙을 사용하고, HTML 규칙의 일관성을 유지하는 것이 위에서 설명한 장점보다 더 중요할 수 있습니다. 이런 상황에서는 **케밥 케이스(kebab-case)를 어디서나 사용하도록 허용합니다.**

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```html
<!-- 싱글 파일 컴포넌트, 문자열 템플릿에서 -->
<mycomponent/>
```

```html
<!-- 싱글 파일 컴포넌트, 문자열 템플릿에서 -->
<myComponent/>
```

```html
<!-- DOM 템플릿에서 -->
<MyComponent></MyComponent>
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```html
<!-- 싱글 파일 컴포넌트, 문자열 템플릿에서 -->
<MyComponent/>
```

```html
<!-- DOM 템플릿에서 -->
<my-component></my-component>
```

또는

```html
<!-- 어디서나 -->
<my-component></my-component>
```



### JS/JSX 내부 컴포넌트 명명 규칙 <sup data-p="b">적극 권장</sup>

**JS/[JSX](../guide/render-function.html#jsx) 안의 컴포넌트 이름은 항상 파스칼 케이스(PascalCase)여야 하지만, 단순히 `app.component`로 등록한 전역 컴포넌트만을 사용하는 간단한 애플리케이션이라면 내부 문자열이 케밥 케이스(kebab-case)일 수 있습니다.**

::: details Detailed Explanation In JavaScript, PascalCase is the convention for classes and prototype constructors - essentially, anything that can have distinct instances. Vue components also have instances, so it makes sense to also use PascalCase. As an added benefit, using PascalCase within JSX (and templates) allows readers of the code to more easily distinguish between components and HTML elements.

그러나, `app.component`를 통해 정의된 **전역 컴포넌트만을** 사용하는 애플리케이션에서는 아래와 같은 이유로 케밥 케이스(kebab-case)를 권장합니다.

- It's rare that global components are ever referenced in JavaScript, so following a convention for JavaScript makes less sense.
- These applications always include many in-DOM templates, where [kebab-case **must** be used](#component-name-casing-in-templates-strongly-recommended). :::

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```js
app.component('myComponent', {
  // ...
})
```

```js
import myComponent from './MyComponent.vue'
```

```js
export default {
  name: 'myComponent',
  // ...
}
```

```js
export default {
  name: 'my-component',
  // ...
}
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```js
app.component('MyComponent', {
  // ...
})
```

```js
app.component('my-component', {
  // ...
})
```

```js
import MyComponent from './MyComponent.vue'
```

```js
export default {
  name: 'MyComponent',
  // ...
}
```



### Full-word component names <sup data-p="b">strongly recommended</sup>

**Component names should prefer full words over abbreviations.**

The autocompletion in editors make the cost of writing longer names very low, while the clarity they provide is invaluable. Uncommon abbreviations, in particular, should always be avoided.

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```
components/
|- SdSettings.vue
|- UProfOpts.vue
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```



### Prop name casing <sup data-p="b">strongly recommended</sup>

**Prop names should always use camelCase during declaration, but kebab-case in templates and [JSX](../guide/render-function.html#jsx).**

We're simply following the conventions of each language. Within JavaScript, camelCase is more natural. Within HTML, kebab-case is.

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```js
props: {
  'greeting-text': String
}
```

```html
<WelcomeMessage greetingText="hi"/>
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```js
props: {
  greetingText: String
}
```

```html
<WelcomeMessage greeting-text="hi"/>
```



### Multi-attribute elements <sup data-p="b">strongly recommended</sup>

**Elements with multiple attributes should span multiple lines, with one attribute per line.**

In JavaScript, splitting objects with multiple properties over multiple lines is widely considered a good convention, because it's much easier to read. Our templates and [JSX](../guide/render-function.html#jsx) deserve the same consideration.

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```html
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo">
```

```html
<MyComponent foo="a" bar="b" baz="c"/>
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```html
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
```

```html
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```



### Simple expressions in templates <sup data-p="b">strongly recommended</sup>

**Component templates should only include simple expressions, with more complex expressions refactored into computed properties or methods.**

Complex expressions in your templates make them less declarative. We should strive to describe *what* should appear, not *how* we're computing that value. Computed properties and methods also allow the code to be reused.

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```html
{{
  fullName.split(' ').map((word) => {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
}}
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```html
<!-- 템플릿에서 -->
{{ normalizedFullName }}
```

```js
// 복잡한 표현식이 computed 속성으로 이동되었습니다.
computed: {
  normalizedFullName() {
    return this.fullName.split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
  }
}
```



### Simple computed properties <sup data-p="b">strongly recommended</sup>

**Complex computed properties should be split into as many simpler properties as possible.**

::: details Detailed Explanation Simpler, well-named computed properties are:

- **Easier to test**

    When each computed property contains only a very simple expression, with very few dependencies, it's much easier to write tests confirming that it works correctly.

- **Easier to read**

    Simplifying computed properties forces you to give each value a descriptive name, even if it's not reused. This makes it much easier for other developers (and future you) to focus in on the code they care about and figure out what's going on.

- **More adaptable to changing requirements**

    Any value that can be named might be useful to the view. For example, we might decide to display a message telling the user how much money they saved. We might also decide to calculate sales tax, but perhaps display it separately, rather than as part of the final price.

    Small, focused computed properties make fewer assumptions about how information will be used, so require less refactoring as requirements change. :::

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```js
computed: {
  price() {
    const basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```js
computed: {
  basePrice() {
    return this.manufactureCost / (1 - this.profitMargin)
  },

  discount() {
    return this.basePrice * (this.discountPercent || 0)
  },

  finalPrice() {
    return this.basePrice - this.discount
  }
}
```



### Quoted attribute values <sup data-p="b">strongly recommended</sup>

**Non-empty HTML attribute values should always be inside quotes (single or double, whichever is not used in JS).**

While attribute values without any spaces are not required to have quotes in HTML, this practice often leads to *avoiding* spaces, making attribute values less readable.

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```html
<input type=text>
```

```html
<AppSidebar :style={width:sidebarWidth+'px'}>
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```html
<input type="text">
```

```html
<AppSidebar :style="{ width: sidebarWidth + 'px' }">
```



### Directive shorthands <sup data-p="b">strongly recommended</sup>

**Directive shorthands (`:` for `v-bind:`, `@` for `v-on:` and `#` for `v-slot`) should be used always or never.**

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```html
<input
  v-bind:value="newTodoText"
  :placeholder="newTodoInstructions"
>
```

```html
<input
  v-on:input="onInput"
  @focus="onFocus"
>
```

```html
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```html
<input
  :value="newTodoText"
  :placeholder="newTodoInstructions"
>
```

```html
<input
  v-bind:value="newTodoText"
  v-bind:placeholder="newTodoInstructions"
>
```

```html
<input
  @input="onInput"
  @focus="onFocus"
>
```

```html
<input
  v-on:input="onInput"
  v-on:focus="onFocus"
>
```

```html
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template v-slot:footer>
  <p>Here's some contact info</p>
</template>
```

```html
<template #header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```



## 우선순위 C 규칙: 권장 <span class="hide-from-sidebar">(임의 선택과 인지 오버헤드 최소화)</span>

### 컴포넌트와 인스턴스 옵션 순서 <sup data-p="c">권장</sup>

**컴포넌트와 인스턴스 옵션의 순서는 일관성 있게 정렬되어야 합니다.**

다음은 컴포넌트 옵션에 권장되는 기본 순서입니다. 유형별로 나누어 놓았으므로 플러그인에서 추가한 속성들 역시 이에 맞추어 정렬하면 됩니다.

1. **Global Awareness** (requires knowledge beyond the component)

    - `name`

2. **Template Modifiers** (changes the way templates are compiled)

    - `delimiters`

3. **Template Dependencies** (assets used in the template)

    - `components`
    - `directives`

4. **Composition** (merges properties into the options)

    - `extends`
    - `mixins`
    - `provide`/`inject`

5. **Interface** (the interface to the component)

    - `inheritAttrs`
    - `props`
    - `emits`

6. **Composition API** (the entry point for using the Composition API)

    - `setup`

7. **Local State** (local reactive properties)

    - `data`
    - `computed`

8. **Events** (callbacks triggered by reactive events)

    - `watch`
    - Lifecycle Events (in the order they are called)
        - `beforeCreate`
        - `created`
        - `beforeMount`
        - `mounted`
        - `beforeUpdate`
        - `updated`
        - `activated`
        - `deactivated`
        - `beforeUnmount`
        - `unmounted`
        - `errorCaptured`
        - `renderTracked`
        - `renderTriggered`

9. **Non-Reactive Properties** (instance properties independent of the reactivity system)

    - `methods`

10. **Rendering** (the declarative description of the component output)

    - `template`/`render`

### Element attribute order <sup data-p="c">recommended</sup>

**The attributes of elements (including components) should be ordered consistently.**

This is the default order we recommend for component options. They're split into categories, so you'll know where to add custom attributes and directives.

1. **Definition** (provides the component options)

    - `is`

2. **List Rendering** (creates multiple variations of the same element)

    - `v-for`

3. **Conditionals** (whether the element is rendered/shown)

    - `v-if`
    - `v-else-if`
    - `v-else`
    - `v-show`
    - `v-cloak`

4. **Render Modifiers** (changes the way the element renders)

    - `v-pre`
    - `v-once`

5. **Global Awareness** (requires knowledge beyond the component)

    - `id`

6. **Unique Attributes** (attributes that require unique values)

    - `ref`
    - `key`

7. **Two-Way Binding** (combining binding and events)

    - `v-model`

8. **Other Attributes** (all unspecified bound & unbound attributes)

9. **Events** (component event listeners)

    - `v-on`

10. **Content** (overrides the content of the element)

    - `v-html`
    - `v-text`

### Empty lines in component/instance options <sup data-p="c">recommended</sup>

**You may want to add one empty line between multi-line properties, particularly if the options can no longer fit on your screen without scrolling.**

When components begin to feel cramped or difficult to read, adding spaces between multi-line properties can make them easier to skim again. In some editors, such as Vim, formatting options like this can also make them easier to navigate with the keyboard.

<div class="style-example style-example-good"><h4>좋음</h4></div>

```js
props: {
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  },

  label: String,
  icon: String
},

computed: {
  formattedValue() {
    // ...
  },

  inputClasses() {
    // ...
  }
}
```

```js
// 컴포넌트를 읽고 탐색하기 쉽다면,
// 공백이 없어도 괜찮습니다.
props: {
  value: {
    type: String,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  },
  label: String,
  icon: String
},
computed: {
  formattedValue() {
    // ...
  },
  inputClasses() {
    // ...
  }
}
```



### 싱글 파일 컴포넌트 최상위 엘리먼트 순서 <sup data-p="c">권장</sup>

**[싱글 파일 컴포넌트](../guide/single-file-component.html)는 적어도 `<script>`나 `<template>` 중 하나가 항상 필요하기 때문에 `<style>`를 마지막에 두어 `<script>`, `<template>`, `<style>` 태그를 일관성있게 정렬해야 합니다.**

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```html
<style>/* ... */</style>
<script>/* ... */</script>
<template>...</template>
```

```html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>
```

```html
<!-- ComponentA.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```



## 우선순위 D 규칙: 주의 필요 <span class="hide-from-sidebar">(잠재적 위험을 지닌 패턴)</span>

### Element selectors with `scoped` <sup data-p="d">use with caution</sup>

**Element selectors should be avoided with `scoped`.**

Prefer class selectors over element selectors in `scoped` styles, because large numbers of element selectors are slow.

::: details Detailed Explanation To scope styles, Vue adds a unique attribute to component elements, such as `data-v-f3f3eg9`. Then selectors are modified so that only matching elements with this attribute are selected (e.g. `button[data-v-f3f3eg9]`).

The problem is that large numbers of [element-attribute selectors](http://stevesouders.com/efws/css-selectors/csscreate.php?n=1000&sel=a%5Bhref%5D&body=background%3A+%23CFD&ne=1000) (e.g. `button[data-v-f3f3eg9]`) will be considerably slower than [class-attribute selectors](http://stevesouders.com/efws/css-selectors/csscreate.php?n=1000&sel=.class%5Bhref%5D&body=background%3A+%23CFD&ne=1000) (e.g. `.btn-close[data-v-f3f3eg9]`), so class selectors should be preferred whenever possible. :::

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```html
<template>
  <button>×</button>
</template>

<style scoped>
button {
  background-color: red;
}
</style>
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```html
<template>
  <button class="btn btn-close">×</button>
</template>

<style scoped>
.btn-close {
  background-color: red;
}
</style>
```



### Implicit parent-child communication <sup data-p="d">use with caution</sup>

**Props and events should be preferred for parent-child component communication, instead of `this.$parent` or mutating props.**

An ideal Vue application is props down, events up. Sticking to this convention makes your components much easier to understand. However, there are edge cases where prop mutation or `this.$parent` can simplify two components that are already deeply coupled.

The problem is, there are also many *simple* cases where these patterns may offer convenience. Beware: do not be seduced into trading simplicity (being able to understand the flow of your state) for short-term convenience (writing less code).

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  template: '<input v-model="todo.text">'
})
```

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  methods: {
    removeTodo() {
      this.$parent.todos = this.$parent.todos.filter(todo => todo.id !== vm.todo.id)
    }
  },

  template: `
    <span>
      {{ todo.text }}
      <button @click="removeTodo">
        ×
      </button>
    </span>
  `
})
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  template: `
    <input
      :value="todo.text"
      @input="$emit('input', $event.target.value)"
    >
  `
})
```

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  template: `
    <span>
      {{ todo.text }}
      <button @click="$emit('delete')">
        ×
      </button>
    </span>
  `
})
```



### Non-flux state management <sup data-p="d">use with caution</sup>

**[Vuex](https://github.com/vuejs/vuex) should be preferred for global state management, instead of `this.$root` or a global event bus.**

Managing state on `this.$root` and/or using a [global event bus](https://vuejs.org/v2/guide/migration.html#dispatch-and-broadcast-replaced) can be convenient for very simple cases, but it is not appropriate for most applications.

Vuex is the [official flux-like implementation](https://vuejs.org/v2/guide/state-management.html#Official-Flux-Like-Implementation) for Vue, and offers not only a central place to manage state, but also tools for organizing, tracking, and debugging state changes. It integrates well in the Vue ecosystem (including full [Vue DevTools](https://vuejs.org/v2/guide/installation.html#Vue-Devtools) support).

<div class="style-example style-example-bad"><h4>나쁨</h4></div>

```js
// main.js
import { createApp } from 'vue'
import mitt from 'mitt'
const app = createApp({
  data() {
    return {
      todos: [],
      emitter: mitt()
    }
  },

  created() {
    this.emitter.on('remove-todo', this.removeTodo)
  },

  methods: {
    removeTodo(todo) {
      const todoIdToRemove = todo.id
      this.todos = this.todos.filter(todo => todo.id !== todoIdToRemove)
    }
  }
})
```



<div class="style-example style-example-good"><h4>좋음</h4></div>

```js
// store/modules/todos.js
export default {
  state: {
    list: []
  },

  mutations: {
    REMOVE_TODO (state, todoId) {
      state.list = state.list.filter(todo => todo.id !== todoId)
    }
  },

  actions: {
    removeTodo ({ commit, state }, todo) {
      commit('REMOVE_TODO', todo.id)
    }
  }
}
```

```html
<!-- TodoItem.vue -->
<template>
  <span>
    {{ todo.text }}
    <button @click="removeTodo(todo)">
      X
    </button>
  </span>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  methods: mapActions(['removeTodo'])
}
</script>
```



<style lang="scss" scoped="">
$color-bgr-good: #d7efd7;
$color-bgr-bad: #f7e8e8;
$color-priority-a: #6b2a2a;
$color-priority-b: #8c480a;
$color-priority-c: #2b5a99;
$color-priority-d: #3f536d;

.style-example {
  border-radius: 7px;
  margin: 1.6em 0;
  padding: 1.6em 1.6em 1em;
  position: relative;
  border: 1px solid transparent;
  border-top-width: 5px;

  h4 {
    margin-top: 0;

    &::before {
      font-family: 'FontAwesome';
      margin-right: .4em;
    }
  }

  &-bad {
    background: $color-bgr-bad;
    border-color: darken($color-bgr-bad, 20%);
    
    h4 {
      color: darken($color-bgr-bad, 50%);
    }

    h4::before {
      content: '\f057';
    }
  }

  &-good {
    background: $color-bgr-good;
    border-color: darken($color-bgr-good, 20%);
    
    h4 {
      color: darken($color-bgr-good, 50%);
    }

    h4::before {
      content: '\f058';
    }
  }
}

.details summary {
  font-weight: bold !important;
}

h3 {
  a.header-anchor {
    // as we have too many h3 elements on this page, set the anchor to be always visible
    // to make them stand out more from paragraph texts.
    opacity: 1;
  }

  sup {
    text-transform: uppercase;
    font-size: 0.5em;
    padding: 2px 4px;
    border-radius: 3px;
    margin-left: 0.5em;

    &[data-p=a] {
      color: $color-priority-a;
      border: 1px solid $color-priority-a;
    }

    &[data-p=b] {
      color: $color-priority-b;
      border: 1px solid $color-priority-b;
    }

    &[data-p=c] {
      color: $color-priority-c;
      border: 1px solid $color-priority-c;
    }

    &[data-p=d] {
      color: $color-priority-d;
      border: 1px solid $color-priority-d;
    }
  }
}
</style> 
