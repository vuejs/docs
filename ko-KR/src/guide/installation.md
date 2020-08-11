# 설치방법

## 릴리즈 노트

최신 베타 버전: 3.0.0-rc.5

각 버전에 대한 자세한 릴리즈 정보는 [GitHub](https://github.com/vuejs/vue-next/releases)에서 보실 수 있습니다.

## Vue Devtools

> 현재 베타 버전

> Vue 3 용 Vue Devtools를 사용하기 위해서는 최소 `vue@^3.0.0-rc.1`이 필요합니다.

Vue를 사용할 때, 브라우저에 [Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools) 를 설치 하는것이 좋습니다. Vue 앱을 보다 사용자 친화적인 인터페이스에서 검사하고 디버깅할 수 있습니다.

[크롬 확장 프로그램](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)

[파이어폭스 애드온](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

[독립형 일렉트론 앱](https://github.com/vuejs/vue-devtools/blob/dev/packages/shell-electron/README.md)

## CDN

프로토 타이핑또는 학습 목적이라면, 아래 코드로 최신 버전을 사용할 수 있습니다.

```html
<script src="https://unpkg.com/vue@next"></script>
```

프로덕션 환경인 경우 새 버전에서 예상치 못한 오류를 방지하려면 특정 버전의 빌드 파일을 추가하는것을 추천합니다.

## NPM

Vue를 사용하여 대규모 애플리케이션을 구축할 때 NPM를 이용한 설치를 권장하고 있습니다. NPM은 [Webpack](https://webpack.js.org/) 또는 [Browserify](http://browserify.org/)와 같은 모듈 번들러와 잘 작동합니다. Vue는 [싱글 파일 컴포넌트](../guide/single-file-component.html)를 만들기 위한 도구도 제공합니다.

```bash
# latest stable
$ npm install vue@next
```

## CLI

Vue.js는 단일 페이지 애플리케이션를 빠르게 구축할 수 있는 [공식 CLI](https://github.com/vuejs/vue-cli)를 제공합니다. 최신 프론트엔드 워크 플로우를 위해 사전 구성된 빌드 설정을 제공합니다. 핫 리로드, 저장시 린트 체크 및 프로덕션 준비가 된 빌드로 시작하고 실행하는데 몇 분 밖에 걸리지 않습니다. 상세한 내용은 [Vue CLI 문서](https://cli.vuejs.org)에서 찾아보실 수 있습니다.

::: tip CLI는 Node.js 및 관련 빌드 도구에 대한 사전 지식을 전제로 하고 있습니다. Vue 또는 프런트엔드 빌드 도구를 처음 사용하는 경우 CLI를 사용하기 전에 빌드 도구없이 <a href="./">가이드</a>를 읽어 보시기 바랍니다. :::

Vue 3의 경우 `npm`에서`@vue/cli@next`로 제공되는 Vue CLI v4.5를 사용해야 합니다. 업그레이드하려면 최신 버전의 `@vue/cli`를 전역으로 다시 설치해야 합니다.

```bash
yarn global add @vue/cli@next
# OR
npm install -g @vue/cli@next
```

그런 다음 프로젝트에서 입력하세요.

```bash
vue upgrade --next
```

## Vite

[Vite](https://github.com/vitejs/vite)는 네이티브 ES 모듈을 가져오는 방식으로 코드의 빠른 제공을 가능하게 하는 Web 개발 빌드 도구입니다.

Vue 프로젝트에서 터미널에 다음 명령을 실행하여 Vite로 빠르게 설정할 수 있습니다.

NPM:

```bash
$ npm init vite-app <project-name>
$ cd <project-name>
$ npm install
$ npm run dev
```

Yarn:

```bash
$ yarn create vite-app <project-name>
$ cd <project-name>
$ yarn
$ yarn dev
```

## 다른 빌드 방법

[NPM 패키지 `dist/` 디렉토리](https://cdn.jsdelivr.net/npm/vue@3.0.0-rc.1/dist/)에는 Vue.js의 다양한 빌드 방법이 있습니다. 사용 사례에 따라 어떤 `dist` 파일을 사용해야 하는지에 대한 설명입니다.

### 번들러 없는 CDN

#### `vue(.runtime).global(.prod).js`:

- 브라우저에서 직접 사용하기 위하여 `<script src="...">`를 통해 Vue를 전역 노출
- 브라우저에서 템플릿 컴파일:
    - `vue.global.js`는 컴파일러와 런타임을 모두 포함하는 "전체" 빌드 파일로 템플릿 컴파일을 지원합니다.
    - `vue.runtime.global.js`는 런타임만 포함되며, 빌드단계에서 미리 템플릿을 컴파일해야 합니다.
- Vue의 내부 코어 패키지를 인라인합니다. 즉, 다른 파일에 의존하지 않는 단일 파일입니다. 동일한 코드 인스턴스를 확보하기 위해서 파일에서 연관된 모든 파일을 가져와야 합니다.
- 하드코딩 된 prod/dev 브랜치를 포함하고 있으며 prod 은 미리 압축되어있습니다. 프로덕션 작업 시 `*.prod.js`를 사용합니다.

::: tip Note 전역 빌드는 [UMD](https://github.com/umdjs/umd) 빌드가 아닙니다. [IIFEs](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)로 구축되어있으며 `<script src="...">`를 통해 직접 사용하기 위한 것입니다. :::

#### vue(.runtime).esm-browser(.prod).js:

- 네이티브 ES 모듈 가져오기를 통한 사용 ( 브라우저에서 `<script type="module">`를 사용)
- 전역 빌드와 같은 런타임 컴파일 종속성 인라인 및 하드코딩된 prod/dev 동작을 공유합니다.

### 번들러 포함

#### vue(.runtime).esm-bundler.js:

- `webpack`, `rollup`, `parcel`과 같은 번들러와 함께 사용합니다.
- prod/dev를 분기를 `process.env.NODE_ENV guards`로 남겨둡니다. (번들러로 교체해야 함)
- minified 빌드를 제공하지 않습니다. (번들링 후 나머지 코드와 함께 사용)
- 종속성 가져오기 (예. `@vue/runtime-core`, `@vue/runtime-compiler`)
    - 가져온 종속성도 esm-bundler 빌드이며 차례로 해당 종속성을 가져옵니다. (예. @vue/runtime-core imports @vue/reactivity)
    - 즉, 이러한 종속성의 다양한 인스턴스가 발생하지 않고 이러한 종속성을 개별적으로 install/import **할 수 있지만**, 모두 같은 버전인지 확인해야합니다.
- 브라우저 내 템플릿 컴파일:
    - `vue.runtime.esm-bundler.js`**(기본값)**는 런타임 전용이며 모든 템플릿을 미리 컴파일해야 합니다. 번들러의 기본 항목은 (`package.json`의 모듈 필드를 통해) 템플릿을 사용하는 경우 일반적으로 템플릿(예 : `*.vue` 파일)이 사전에 컴파일되기 때문입니다.
    - `vue.esm-bundler.js`: 런타임 컴파일러를 포함합니다. 번들러를 사용하고 있지만, 여전히 런타임 템플릿 컴파일이 필요한 경우 이를 사용합니다. (예: DOM 템플릿 또는 인라인 문자열을 통한 JavaScript 템플릿) 이 파일에 vue의 별칭을 지정하도록 번들러를 구성해야 합니다.

### 서버사이드 렌더링

- `vue.cjs(.prod).js`:
    - `require()`를 통하여 Node.js 서버측 렌더링에 사용
    - 앱을 `target: 'node'`로 webpack에 번들 하고 `vue`를 적절하게 구체화하는 빌드입니다. 이것이 로드될 빌드 입니다.
    - dev/prod 파일은 미리 빌드되어 있지만  `process.env.NODE_ENV`에 따라 자동으로 적절한 파일이 필요합니다.

## 런타임 + 컴파일러와 런타임(Runtime-only)의 차이

클라이언트에서 템플릿을 컴파일해야 하는 경우 (예를 들어, 템플릿 옵션에 문자열을 전달하거나 해당 DOM의 HTML을 템플릿으로 사용하여 요소에 마운트하는 경우) 컴파일러가 필요하므로 전체빌드가 필요합니다.

```js
// 이건 컴파일러가 필요합니다.
Vue.createApp({
  template: '<div>{{ hi }}</div>'
})

// 이건 작동하지 않습니다.
Vue.createApp({
  render() {
    return Vue.h('div', {}, this.hi)
  }
})
```

`vue-loader`를 사용하는 경우 `*.vue` 파일 내의 템플릿이 빌드시 JavaScript로 사전 컴파일됩니다. 최종 번들 컴파일러는 정말 필요하지 않기 때문에 런타임 전용 빌드를 사용할 수 있습니다.
