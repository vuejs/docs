# 싱글 파일 컴포넌트

## 소개

많은 Vue 프로젝트에서, 전역 컴포넌트는 `app.component()`를 사용해서 정의되고, 뒤따라 `app.mount('#app')`를 통해 모든 페이지의 body 안에 있는 컨네이너 요소로 지정됩니다.

이것은 특정 뷰(views)를 향상시키기 위해서 JavaScript를 사용하는 중소 규모의 프로젝트에서는 매우 잘 동작할 것입니다. 하지만 더 복잡한 프로젝트나 프론트 엔드가 전적으로 JavaScript에 의해 구동되는 경우 다음과 같은 단점이 명백해집니다.

- **전역 정의** 모든 컴포넌트마다 고유한 이름을 가져야만 합니다
- **문자열 템플릿** 구문 강조가 부족하고, 여러 줄의 HTML을 위해 예쁘지 않은 슬래쉬 사용해야 합니다.
- **CSS가 지원되지 않음** HTML과 JavaScript는 컴포넌트로 모듈화되지만 CSS는 제외됩니다(conspicuously left out).
- **빌드 단계가 없음** Pug(이전의 Jade)나 Babel 같은 전처리기보다 HTML과  ES5 JavaScript를 사용하는데 제한됩니다.

이 모든 문제는 `.vue` 확장자와 **싱글 파일 컴포넌트**를 사용한다면 Webpack이나 Browserify와 같은 빌드 도구로 해결할 수 있습니다.

여기에 예제 파일 `Hello.vue`가 있습니다:

<a href="https://codepen.io/team/Vue/pen/3de13b5cd0133df4ecf307b6cf2c5f94" target="_blank" rel="noopener noreferrer"></a><img src="/images/sfc.png" width="403" alt="Single-file component example (click for code as text)" style="display: block; margin: 15px auto; max-width: 100%">

이제 우리는 다음과 같은 이점을 얻습는다:

- [완벽한 구문 강조](https://github.com/vuejs/awesome-vue#source-code-editing)
- [CommonJS 모듈](https://webpack.js.org/concepts/modules/#what-is-a-webpack-module)
- [Component-scoped CSS](https://vue-loader.vuejs.org/en/features/scoped-css.html)

위에 언급한대로, 깔끔하고 기능이 많은 컴포넌트를 위해 Pug, Babel (with ES2015 modules), Stylus와 같은 전처리기를 사용할 수 있습니다.

<a href="https://codesandbox.io/s/vue-single-file-component-with-pre-processors-mr3ik?file=/src/App.vue" target="_blank" rel="noopener noreferrer"></a><img src="/images/sfc-with-preprocessors.png" width="563" alt="Single-file component with pre-processors example (click for code as text)" style="display: block; margin: 15px auto; max-width: 100%">

위의 특정한 전처리기(specific languages)는 예시일 뿐입니다. TypeScript, SCSS, PostCSS와 같은 생산성에 도움이 되는 어떤 전처리기도 쉽게 사용할수 있습니다. WebPack과 `vue-loader`를 사용한다면 CSS 모듈에 대해 최고 수준(first-class)의 지원을 제공합니다.

### 관심 사항 분리

한 가지 중요한 점은 **관심 사항 분리와 파일 형태의 분리는 동일하지 않다는 것입니다.** 모던 UI 개발에서, 코드 베이스를 서로 얽혀있는 거대한 3개의 레이어로 나누는 대신, 느슨하게 결합된 컴포넌트로 나누고 구성하는 것이 훨씬 더 합리적(sense)이라는 것을 발견했습니다. 컴포넌트 내부에서 컴포넌트의 템플릿, 로직, 스타일은 본질적으로 결합되어 있고, 이것들을 배치하면 컴포넌트를 더욱 결합력 있고 유지 관리가 용이하게 해줍니다.

싱글 파일 컴포넌트에 대한 개념이 맘에 들지 않더라도, JavaScript와 CSS를 별도의 파일로 분리하여, 핫-리로딩과 사전 컴파일 기능에 활용할 수 있습니다.

```html
<!-- my-component.vue -->
<template>
  <div>사전 컴파일 될 것이다</div>
</template>
<script src="./my-component.js"></script>
<style src="./my-component.css"></style>
```

## 시작하기

### 예제 Sandbox

지금 싱글 파일 컴포넌트를 사용해보기 원한다면 CodeSandbox에 있는 [간단한 todo app](https://codesandbox.io/s/vue-todo-list-app-with-single-file-component-vzkl3?file=/src/App.vue)을 다뤄볼 수 있습니다.

### 처음으로 JavaScript 모듈 빌드 시스템을 사용하는 사용자의 경우

`.vue` 컴포넌트를 사용한다면, 진보된(advanced) JavaScript 앱 영역에 진입하는 것입니다. 즉, 아직 사용해보지 않은 추가적인 도구를 사용하는 방법을 배워야합니다.

- **Node Package Manager (NPM)**: 레지스트리에서 패키지를 가져오는 방법에 대한 섹션 [Getting Started guide](https://docs.npmjs.com/packages-and-modules/getting-packages-from-the-registry)를 읽어야 합니다.

- **Modern JavaScript with ES2015/16**: 바벨의 [Learn ES2015 guide](https://babeljs.io/docs/en/learn)를 읽어라. 지금 당장 모든 기능을 외워야하진 않지만, 페이지를 다시 참조할 수 있도록 보관해야 합니다.

하루 동안 이러한 자료를 읽은 후, [Vue CLI](https://cli.vuejs.org/)를 살펴보는 것을 권장합니다. 소개(instructions)에 따르면 `.vue` 컴포넌트, ES2015, webpack and hot-reloading이 포함된 Vue 프로젝트가 즉시 생성할 수 있습니다.

### 진보된 사용자의 경우

CLI가 대부분의 도구 구성을 설정해주지만, 세세한 옵션에 대해 [구성 옵션(config option)](https://cli.vuejs.org/config/)을 통해 사용자 정의도 가능합니다.

처음부터 설정하려는 경우, [vue-loader](https://vue-loader.vuejs.org)를 사용하여 webpack을 수동으로 구성해야 합니다. 웹팩에 대해 더 자세히 알아보려면 <a class="" href="https://webpack.js.org/configuration/">공식 문서</a>나 <a class="" href="https://webpack.academy/p/the-core-concepts">webpack learning academy</a>를 살펴보세요.
