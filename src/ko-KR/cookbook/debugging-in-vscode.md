# VS Code에서 디버깅 하기

크기에 상관없이 어플리케이션을 개발하다 보면 이게 왜 오류가 발생하는지 알아내야 합니다. 이 문서에서는 vs code 사용자가 브라우저에서 어떻게 디버깅을 할수 있는지 알아 보겠습니다.

이 문서는 vs code에서 [Vue CLI](https://github.com/vuejs/vue-cli)로 만들어진 어플리케이션을 브라우저에서 동작시키는 것처럼 디버깅하는 방법을 알려줍니다.

## 앞서 준비할 것

우선 vs code를 설치하고 , 원하는 브라우저를 선택하여 설치합니다. 그리고 최신버전의 디버거 플러그인을 설치한후 활성화 합니다:

- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
- [Debugger for Firefox](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-firefox-debug)

[Vue CLI Guide](https://cli.vuejs.org/)의 설명에 따라 [vue-cli](https://github.com/vuejs/vue-cli)를 설치한후 프로젝트를 생성합니다. 생성된 디렉토리에서 vs code을 엽니다.

### 브라우저에서 소스코드 보기

VS Code에서 vue 컴포넌트를 디버깅하려면 먼저 생성된 Webpack 구성을 업데이트하며 소스맵(Sourcemap)을 빌드해야합니다. 브라우저에서 보이는 압축된 파일의 내용과 실제 소스를 연결하여 디버깅 하기 위해 필요한 과정입니다. 이 과정을 통해 나중에 웹팩을 통행 최적화된 파일도 소스와 매핑하여 볼수 있습니다.

Vue CLI 2 사용자: `config/index.js`에 `devtool` 속성을 설정합니다:

```json
devtool: 'source-map',
```

Vue CLI 3 사용자: `config/index.js`에 `devtool` 속성을 설정합니다:

```js
module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
}
```

### VS Code에서 애플리케이션 시작하기

::: info
여기서는 포트가 `8080`이라고 가정합니다. 예를 들어 `8080`을 사용하는 상태에서 Vue CLI가 자동으로 다른 포트를 선택하는 경우 기에 따라 구성을 수정하십시오. 
:::

Activity Bar에서 디버깅 아이콘을 클릭하여 디버그 뷰를 표시한 다음, 톱니바퀴 아이콘을 클릭하여 launch.json 파일을 구성하고 **Chrome/Firefox: Launch**환경을 선택합니다. 생성된 launch.json의 내용을 해당 구성으로 변경합니다:

![Add Chrome Configuration](/images/config_add.png)

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "vuejs: chrome",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    },
    {
      "type": "firefox",
      "request": "launch",
      "name": "vuejs: firefox",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "pathMappings": [{ "url": "webpack:///src/", "path": "${webRoot}/" }]
    }
  ]
}
```

## 중단점 설정

1.  `data` 함수가 문자열을 반환하는 **src/components/HelloWorld.vue**의 `90번째 라인`에 중단점을 설정합니다.

![Breakpoint Renderer](/images/breakpoint_set.png)

2.  루트 폴더에서 선호하는 terminal을 열고 Vue CLI를 사용하여 앱을 serve합니다:

```
npm run serve
```

3.  Debug view로 이동하여, **'vuejs: chrome/firefox'** 구성을 선택한다음, F5를 누르거나 녹색 재생버튼을 클릭합니다.

4.  이제 새 브라우저 인스턴스가 `http://localhost:8080`를 열면 중단점이 적중됩니다.

![Breakpoint Hit](/images/breakpoint_hit.png)

## 대체 패턴

### Vue Devtools

복잡성에 따라 다른 디버깅 방법이 있습니다. 가장 인기있고 간단한 방법은 [Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)과 [Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)에서 제공하는 우수한 Vue.js devtools를 사용하는 것입니다. devtools로 작업할 때 데이터 속성을 실시간으로 편집하고 변경사항이 즉시 반영되는 것을 볼 수 있다는 것이 장점입니다. 다른 장점으로는 Vuex에 대한 시간 여행 디버깅(time travel debugging)을 수행하는 기능이 있습니다.

![Devtools Timetravel Debugger](/images/devtools-timetravel.gif)

페이지에서 Vue.js의 프로덕션/최소화 빌드(예: CDN의 표준 링크)를 사용하는 경우 devtools 검사가 기본적으로 비활성화되어 Vue 창이 표시되지 않습니다. 축소되지 않은 버전으로 전환하는 경우 페이지를 보려면 강제로 새로고침해야 할 수 있습니다.

### 간단한 디버그 문장

위의 예제에는 훌륭한 워크플로우가 있습니다. 그러나 코드에서 직접 [native debugger statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger)을 사용할 수 있는 대체 옵션이 있습니다. 이러한 방식으로 작업하기로 선택한 경우, 작업을 마쳤을 때 문장을 제거하는 것을 기억해야합니다.

```js
<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    const hello = 'Hello World!'
    debugger
    this.message = hello
  }
};
</script>
```

## 감사의 말

이 문서는 [microsoft/vscode-recipes](https://github.com/Microsoft/VSCode-recipes/tree/master/vuejs-cli)와 [Kenneth Auchenberg](https://twitter.com/auchenberg)를 기반으로 작성되었습니다.
