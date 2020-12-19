---
badges:
- breaking
---

# 커스텀 엘리먼트 Interop(Custom Elements Interop) <migrationbadges badges="$frontmatter.badges"></migrationbadges>

# 개요

- **BREAKING:** 커스텀 엘리먼트 허용목록(whitelisting)은 이제 템플릿 컴파일 중에 수행되며, 런타임 구성 대신 컴파일러 옵션을 통해 구성해야 합니다.
- **BREAKING:** 특별한 `is` prop 사용은 예약된 `<component>` 태그로만 제한됩니다.
- **NEW:** 네이티브 HTML 파싱 제한을 해결하기 위해, 네이티브 엘리먼트에 `is`가 사용된 2.x 사용사례를 지원하는 새로운 `v-is` 디렉티브가 있습니다.

## 자율 커스텀 엘리먼트(Autonomous Custom Elements)

Vue 외부에서 정의된 커스텀 엘리먼트를 추가하려면 (예: Web Components API 사용), Vue에 이를 커스텀 엘리먼트로 취급하도록 '지시(instruct)'해야 합니다. 다음 템플릿을 예로 들어보겠습니다.

```html
<plastic-button></plastic-button>
```

### 2.x 문법

Vue 2.x에서는 `Vue.config.ignoredElements`를 통해 태그를 커스텀 엘리먼트로 허용목록에 추가하였습니다:

```js
// Vue가 Vue외부에서 정의된 커스텀 엘리먼트를 무시하게 됩니다.
// (예: Web Components APIs 사용)

Vue.config.ignoredElements = ['plastic-button']
```

### 3.x 문법

**Vue 3.0에서는 템플릿 컴파일 중에 수행됩니다.** 컴파일러가 `<plastic-button>`을 커스텀 엘리먼트로 처리하도록 지시하려면 다음을 수행하십시오:

- 빌드 단계를 사용하는 경우: `isCustomElement`옵션을 Vue 템플릿 컴파일러에 전달합니다. `vue-loader`를 사용하는 경우, `vue-loader`의 `compilerOptions`옵션을 통해 전달해야 합니다:

    ```js
    // 웹팩 config 내부
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
        options: {
          compilerOptions: {
            isCustomElement: tag => tag === 'plastic-button'
          }
        }
      }
      // ...
    ]
    ```

- 즉석(on-the-fly) 템플릿 컴파일을 사용하는 경우, `app.config.isCustomElement`를 통해 전달합니다.

    ```js
    const app = Vue.createApp({})
    app.config.isCustomElement = tag => tag === 'plastic-button'
    ```

    런타임 구성은 런타임 템플릿 컴파일에만 영향을 미칩니다. 사전 컴파일된 템플릿에는 영향을 주지 않습니다.

## 커스텀 내장 엘리먼트(Customized Built-in Elements)

커스텀 엘리먼트의 사양은 내장된 엘리먼트에 `is` 속성을 추가하여 [Customized Built-in Element](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example)로 사용하는 방법을 제공합니다.

```html
<button is="plastic-button">Click Me!</button>
```

Vue의 특별한 `is` props는 브라우저에서 보편적으로 사용할 수 있게 되기 전에, 기본 속성(native attribute)이 수행하는 작업을 시뮬레이션하는 것입니다. 그러나 2.x에서는 `plastic-button`이라는 이름의 Vue 컴포넌트를 렌더링하는 것으로 해석되었습니다. 이것은 위에서 언급한 Customized Built-in Elements의 기본 사용법을 차단합니다.

3.0에서는 `is` prop에 대한 Vue의 특수한 처리를 `<component>`태그로만 제한합니다.

- `<component>`태그에 사용하면 2.x에서와 정확히 동일하게 작동합니다.

- 일반 컴포넌트에서 사용하면, 일반 prop처럼 작동합니다:

    ```html
    <foo is="bar" />
    ```

    - 2.x 동작: `bar` 컴포넌트를 렌더링합니다.
    - 3.x 동작: `foo` 컴포넌트를 렌더링하고 `is` prop를 전달합니다.

- 일반 엘리먼트(plain element)에서 사용되는 경우 `is`옵션으로 `createElement` 호출에 전달되고 기본 속성(native attribute)으로 렌더링됩니다. 이것은 customized built-in elements의 사용을 지원합니다.

    ```html
    <button is="plastic-button">Click Me!</button>
    ```

    - 2.x 동작: `plastic-button` 컴포넌트를 렌더링합니다.

    - 3.x 동작: 호출하여 네이티브 버튼(native button)을 렌더링합니다.

        ```js
        document.createElement('button', { is: 'plastic-button' })
        ```

## In-DOM 템플릿 구문분석 해결방법을 위한 `v-is` (<code>v-is</code> for In-DOM Template Parsing Workarounds)

> Note: 이 섹션은 Vue 템플릿이 페이지의 HTML에 직접 작성된 경우에만 영향을 줍니다. in-DOM 템플릿을 사용할 때, 템플릿은 기본 HTML 구문분석 규칙을 따릅니다. `<ul>`, `<ol>`, `<table>` 및 `<select>`와 같은 일부 HTML 요소에는 내부에 표시할 수 있는 요소에 대한 제한이 있으며, `<li>`, `<tr>` 및 `<option>`과 같은 일부요소는 다른 특정 요소안에 나타납니다.

### 2.x 문법

Vue2에서는 네이티브 태그(native tag)에 `is` prop를 사용하여, 이러한 제한사항을 해결하는 것이 좋습니다:

```html
<table>
  <tr is="blog-post-row"></tr>
</table>
```

### 3.x 문법

`is`의 동작 변경으로, 다음과 같은 경우를 해결하기 위한 새로운 디렉티브 `v-is`를 소개합니다:

```html
<table>
  <tr v-is="'blog-post-row'"></tr>
</table>
```

:::warning `v-is` 는 동적 2.x `:is` 바인딩과 같은 기능을 합니다. 따라서 등록된 이름으로 컴포넌트를 렌더링하려면 해당 값이 자바스크립트 문자열 리터럴이어야합니다:

```html
<!-- 올바르지 않은 사용법, 아무것도 렌더링 되지 않습니다. -->
<tr v-is="blog-post-row"></tr>

<!-- 올바른 사용법 -->
<tr v-is="'blog-post-row'"></tr>
```

:::

## 마이그레이션 방법

- `config.ignoredElements`를 `vue-loader`의 `compilerOptions`(빌드 단계 포함) 또는 `app.config.isCustomElement`(즉석 템플릿 컴파일 포함)로 대체합니다.
- `is` 사용이 있는 모든 비-`<component>` 태그를 `<component is="...">` (SFC 템플릿의 경우) 또는 `v-is`(in-DOM 템플릿의 경우)로 변경합니다.
