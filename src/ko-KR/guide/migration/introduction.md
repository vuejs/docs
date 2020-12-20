# 시작하기

::: info 
Vue.js의 새로운 기능에 대한 정보가 필요하신가요? 그렇다면 [필수가이드](/ko-KR/guide/introduction.html)를 확인하세요. 
:::

 이번 가이드는 Vue 2 경험이 있으면서, Vue 3 변경사항 및 새로운 기능을 배우고 싶은 사용자를 주요 독자로 삼았습니다.**&nbsp;이 문서는 Vue 3를 시도하기 전 꼭 읽어야 하는 것은 아닙니다. ** 변한 것이 많아 보이지만, Vue에 관해서 알고 좋아하던 것들은 여전히 같습니다.; 그렇지만 우리는 문서화 된 변경 점에 대한 예제들과 자세한 설명을 가능한 철저하게 제공하고 싶었습니다.

- [시작하기](#quickstart)
- [주목할 만한 새로운 기능들](#notable-new-features)
- [주의해야 하는 변경사항들](#breaking-changes)
- [지원 라이브러리들](#supporting-libraries)

## 개요

<br> <iframe src="https://player.vimeo.com/video/440868720" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen=""></iframe>

[Vue Mastery](https://www.vuemastery.com/courses-path/vue3)에서 Vue 3를 배워보세요.

## <a>시작하기</a>

- CDN을 통해 시작: <code><script src="https://unpkg.com/vue@next"></script></code>

- [Codepen](https://codepen.io/yyx990803/pen/OJNoaZL)의 인브라우저 플레이그라운드에서 시작

- [CodeSandbox](https://v3.vue.new)의 인브라우저 샌드박스에서 시작

- [Vite](https://github.com/vitejs/vite)를 사용해 시작:

    ```bash
    npm init vite-app hello-vue3 # 또는 yarn create vite-app hello-vue3
    ```

- [vue-cli](https://cli.vuejs.org/)를 사용해 시작:

    ```bash
    npm install -g @vue/cli # 또는 yarn global add @vue/cli
    vue create hello-vue3
    # select vue 3 preset
    ```

## 주목할 만한 새로운 기능들

Vue 3에서 주목할 만한 새로운 기능 중 일부는 다음과 같습니다.

- [Composition API](/ko-KR/guide/composition-api-introduction.html)
- [Teleport](/ko-KR/guide/teleport.html)
- [Fragments](/ko-KR/guide/migration/fragments.html)
- [Emits 컴포넌트 옵션](/ko-KR/guide/component-custom-events.html)
- 커스텀 렌더들(custom renderers)을 생성하기 위한 [`@vue/runtime-core`의 `createRenderer` API ](https://github.com/vuejs/vue-next/tree/master/packages/runtime-core)
- [SFC Composition API의 더 쉬운 표현 (`<script setup>`)](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md) <badge text="experimental" type="warning"></badge>
- [SFC State-driven CSS 변수 (`<style vars>`)](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md) <badge text="experimental" type="warning"></badge>
- [SFC의 `<style scoped>`는 전역 규칙으로 사용하거나 특정 slot의 규칙으로 사용가능합니다. ](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)

## 주의해야 할 변경사항들

::: info INFO 
우리는 Vue 2 호환 동작과 호환되지 않는 사용에 대한 런타임 경고가있는 Vue 3용 마이그레이션 빌드 작업 중입니다. 중요한 Vue 2 앱을 마이그레이션 할 계획이라면, 원활한 환경을 위해 마이그레이션 빌드를 기다리는 것이 좋습니다. 
:::

다음은 2.x의 사용자가 주의해야 할 변경사항들로 구성됩니다.

### 전역 API

- [전역 Vue API가 애플리케이션 인스턴스를 사용하도록 변경 되었습니다.](/ko-KR/guide/migration/global-api.html)
- [글로벌 및 내부 API가 트리쉐이킹(*Treeshaking) 가능하도록 재구성되었습니다.](/ko-KR/guide/migration/global-api-treeshaking.html)

### 템플릿 디렉티브

- [`v-model` 컴포넌트의 사용법이 재정의되었습니다.](/ko-KR/guide/migration/v-model.html)
- [`<template v-for>`와 `v-for`가 아닌 노드들의 `key` 사용 방법이 변경되었습니다.](/ko-KR/guide/migration/key-attribute.html)
- [같은 요소에 `v-if`와 `v-for` 사용될 때 우선순위가 변경 되었습니다.](/ko-KR/guide/migration/v-if-v-for.html)
- [이제부터 `v-bind="object"`는 순서에 민감합니다.](/ko-KR/guide/migration/v-bind.html)
- [`v-for`내부의 `ref`는 더이상 refs 참조 배열을 자동생성하지 않습니다. ](/ko-KR/guide/migration/array-refs.html)

### 컴포넌트들

- [함수형 컴포넌트는 오직 일반 함수를 사용해서만 만들 수 있습니다.](/ko-KR/guide/migration/functional-components.html)
- [싱글 파일 컴포넌트(SFC) `<template>` 및 `함수형` 컴포넌트 옵션의 `functional` 속성은 더 이상 사용되지 않습니다.](/ko-KR/guide/migration/functional-components.html)
- [비동기 컴포넌트는 이제 생성을 위해`defineAsyncComponent` 메서드가 필요합니다.](/ko-KR/guide/migration/async-components.html)

### 렌더 함수

- [렌더함수 API가 변경되었습니다.](/ko-KR/guide/migration/render-function-api.html)
- [`$scopedSlots`속성이 제거되고 모든 슬롯이 `$slots`를 통해 함수로 노출됩니다.](/ko-KR/guide/migration/slots-unification.html)

### 커스텀 요소들

- [이제 커스텀 요소 허용이 Template 컴파일 시 수행됩니다.](/ko-KR/guide/migration/custom-elements-interop.html)
- [사용자 지정 속성 `is`의 사용은 예약어인 `<component>`태그로 제한됩니다.](/ko-KR/guide/migration/custom-elements-interop.html#customized-built-in-elements)

### 기타 소소한 변경사항들

- `destroyed` 라이프사이클 옵션의 명칭이 `unmounted`로 변경되었습니다.
- `beforeDestroy` 생명주기 옵션의 명칭이 `beforeUnmount`로 변경되었습니다.
- <a>Props <code>default</code> 팩토리 함수는 더이상 <code>this</code>에 접근할 수 없습니다.</a>
- [컴포넌트 라이프사이클에 맞게 사용자 지정 디렉티브 API가 변경 되었습니다.](/ko-KR/guide/migration/custom-directives.html)
- [`data`옵션은 항상 함수로 선언되어야 합니다.](/ko-KR/guide/migration/data-option.html)
- [이제 mixins의 `data` 옵션은 얕게 병합됩니다.](/ko-KR/guide/migration/data-option.html#mixin-merge-behavior-change)
- [속성 강제 방법이 변경되었습니다.](/ko-KR/guide/migration/attribute-coercion.html)
- [몇몇 Transition 클래스의 명칭이 변경되었습니다.](/ko-KR/guide/migration/transition.html)
- [배열에서 watch 콜백은 배열이 교체될 때만 발생합니다. <br>배열의 변경 사항에 대해 watch 콜백을 실행하려면, 반드시 `deep` 옵션을 설정해야 합니다.](/ko-KR/guide/migration/watch.html)
- 특수 디렉티브(`v-if / else-if / else`, `v-for` 또는 `v-slot`)이 없는 `<template>` 태그는 이제 일반 요소로 처리되며 내부 콘텐츠를 렌더링하는 대신 native `<template>` 요소가 됩니다
- Vue 2.x에서 애플리케이션 루트 컨테이너의 `outerHTML`은 루트 컴포넌트 템플릿으로 대체됩니다. (또는 루트 컴포넌트에 템플릿/렌더링 옵션이 없는 경우 최종적으로 템플릿에 컴파일됩니다.) Vue 3.x는 이제 애플리케이션 컨테이너의 `innerHTML`을 대신 사용합니다. 이는 컨테이너 자체가 더이상 템플릿의 일부로서 고려되지 않음을 의미합니다.

### 제거된 APIs

- [`v-on` 수정자로서의 `키코드(keyCode)` 지원](/ko-KR/guide/migration/keycode-modifiers.html)
- [$on, $off 그리고 $once 인스턴스 메소드](/ko-KR/guide/migration/events-api.html)
- [필터](/ko-KR/guide/migration/filters.html)
- [인라인 템플릿 속성](/ko-KR/guide/migration/inline-template-attribute.html)
- `$destroy` 인스턴스 메서드. 사용자는 더 이상 개별 Vue 구성 요소의 수명주기를 수동으로 관리 할 필요가 없습니다.

## 지원 라이브러리들

이제부터 우리의 모든 공식 라이브러리들과 도구들은 Vue 3를 지원합니다. 하지만 여전히 대부분은 베타 상태이며 npm에서 `next` dist 태그로 배포 됩니다. **2020년 말까지 `latest` dist 태그를 사용하도록 모든 프로젝트를 안정화하고 전환 할 계획입니다.**

### Vue CLI

<a href="https://www.npmjs.com/package/@vue/cli" target="_blank" noopener="" noreferrer=""></a><img src="https://img.shields.io/npm/v/@vue/cli">

v4.5.0부터 `vue-cli`는 새 프로젝트를 만들 때 Vue3를 사전 설정하는 기본 옵션을 제공합니다. 이제 `vue-cli`를 업그레이드하고 <code>vue create</code>를 실행하여 Vue 3프로젝트를 만들 수 있습니다.

- <a class="" href="https://cli.vuejs.org/">관련문서</a>
- [GitHub](https://github.com/vuejs/vue-cli)

### Vue Router

<a href="https://www.npmjs.com/package/vue-router/v/next" target="_blank" noopener="" noreferrer=""></a><img src="https://img.shields.io/npm/v/vue-router/next.svg">

Vue Router 4.0은 Vue 3를 지원하며, 자체적으로 많은 주의해야 할 변경사항들이 있습니다. 자세한 전문은 [README](https://github.com/vuejs/vue-router-next#vue-router-next-)를 확인하세요.

- [GitHub](https://github.com/vuejs/vue-router-next)
- [RFCs](https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3Arouter)

### Vuex

<a href="https://www.npmjs.com/package/vuex/v/next" target="_blank" noopener="" noreferrer=""></a><img src="https://img.shields.io/npm/v/vuex/next.svg">

Vuex 4.0는 3.x와 거의 동일한 API로 Vue3 지원합니다. 유일하게 주의해야 할 변경사항은 [ 플러그인 설치 방법 ](https://github.com/vuejs/vuex/tree/4.0#breaking-changes)입니다.

- [GitHub](https://github.com/vuejs/vuex/tree/4.0)

### 확장 Devtools

우리는 여러 버전의 Vue를 지원하기 위해 새로운 UI와 리팩토링된 새로운 버전의 Devtools를 개발 중입니다. 새 버전은 현재 베타 버전이며 현재는 Vue 3만 지원합니다. Vuex와 Router의 통합도 진행 중입니다.

- Chrome: [Chrome web store에서 설치](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg?hl=en)

    - Note: 베타 채널이 정식 버전의 devtools과 충돌 할 수 있으므로 베타 채널이 제대로 작동하려면 정식 버전을 일시적으로 비활성화해야 할 수 있습니다.

- Firefox: [서명된 부가기능 다운로드](https://github.com/vuejs/vue-devtools/releases/tag/v6.0.0-beta.2) (Assets의 `.xpi`파일)

### IDE 지원

[VSCode](https://code.visualstudio.com/)와 함께 Vue 3의 IDE 지원을 도와주는 공식 확장 프로그램인 [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)를 사용하는 것을 추천합니다.

### 다른 프로젝트들

프로젝트 | npm | Repo
--- | --- | ---
@vue/babel-plugin-jsx | []![rc] | [[GitHub]]
eslint-plugin-vue | []![beta] | [[GitHub]]
@vue/test-utils | []![beta] | [[GitHub]]
vue-class-component | []![beta] | [[GitHub]]
vue-loader | []![beta] | [[GitHub]]
rollup-plugin-vue | []![beta] | [[GitHub]]


[rc]: https://img.shields.io/npm/v/@vue/babel-plugin-jsx.svg
[]: https://www.npmjs.com/package/@vue/babel-plugin-jsx
[GitHub]: https://github.com/vuejs/jsx-next
[beta]: https://img.shields.io/npm/v/@vue/devtools/beta.svg
[]: https://www.npmjs.com/package/@vue/devtools/v/beta
[GitHub]: https://github.com/vuejs/vue-devtools/tree/next
[beta]: https://img.shields.io/npm/v/eslint-plugin-vue.svg
[]: https://www.npmjs.com/package/eslint-plugin-vue
[GitHub]: https://github.com/vuejs/eslint-plugin-vue
[beta]: https://img.shields.io/npm/v/@vue/test-utils/next.svg
[]: https://www.npmjs.com/package/@vue/test-utils/v/next
[GitHub]: https://github.com/vuejs/vue-test-utils-next
[beta]: https://img.shields.io/npm/v/@ant-design-vue/babel-plugin-jsx.svg
[]: https://www.npmjs.com/package/@ant-design-vue/babel-plugin-jsx
[GitHub]: https://github.com/vueComponent/jsx
[beta]: https://img.shields.io/npm/v/vue-class-component/next.svg
[]: https://www.npmjs.com/package/vue-class-component/v/next
[GitHub]: https://github.com/vuejs/vue-class-component/tree/next
