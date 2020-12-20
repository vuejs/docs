# 운영 배포

::: info
다음에 소개하는 팁들은 모두 [Vue CLI](https://cli.vuejs.org)를 사용하면 모두 적용되어 있습니다. 이 섹션은 직접 빌드를 설정할때만 필요한 내용입니다. 
:::

## 운영 모드 활성화 하기 

개발 중에 Vue는 흔한 오류와 함정을 피하는데 도움이되는 많은 경고를 제공합니다. 그러나 이러한 경고 문자열은 운영에서 필요없고, 앱 자체의 크기도 커지게 합니다. 또한 이러한 경고 확인 중 일부는 [운영 모드](https://cli.vuejs.org/guide/mode-and-env.html#modes) 에서 불필요한  런타임 비용이 발생하기도 합니다. 

### 빌드 도구 없이 

빌드 도구없이 스크립트 태그를 통해 Vue를 직접 포함하는 전체 빌드(Full build)시에는 minified된 운영 버전을 사용해야합니다. [Installation guide](/ko-KR/guide/installation.html#cdn)에서 확인해 보세요 


### 빌드 도구를 사용할때 

Webpack 또는 Browserify와 같은 빌드 도구를 사용할 때 운영 모드는 Vue의 소스 코드 내의 `process.env.NODE_ENV` 에 의해 결정되며 기본 상태는 개발 모드입니다. 두 빌드 도구 모두 Vue의 운영 모드를 활성화하기 위해 이 변수를 덮어 쓰는 방법을 제공하며 빌드 중에 경고가 minifier에 의해 제거됩니다. Vue CLI에는이 기능이 미리 구성되어 있지만 수행 방법을 아는 것이 좋습니다:

#### Webpack
Webpack 4 이상에서는  `mode` 옵션을 사용할수 있습니다:


```js
module.exports = {
  mode: 'production'
}
```

#### Browserify

- `NODE_ENV` 환경 변수를` "production"`으로 설정하고, 번들링 명령을 실행하십시오. 이 옵션은  `vueify`에게 hot-reload 및 개발 관련 코드를 포함하지 않도록 지시합니다.

- 번들에 전역 [envify] (https://github.com/hughsk/envify) 변환을 적용합니다. 이를 통해 minifier는 env 변수 조건 블록에 래핑 된 Vue의 소스 코드에서 모든 경고를 제거 할 수 있습니다.
  ```bash
  NODE_ENV=production browserify -g envify -e main.js | uglifyjs -c -m > build.js
  ```

- 또는 gulp에서 [envify](https://github.com/hughsk/envify) 를 사용하세요: 

  ```js
  // Use the envify custom module to specify environment variables
  const envify = require('envify/custom')

  browserify(browserifyOptions)
    .transform(vueify)
    .transform(
      // Required in order to process node_modules files
      { global: true },
      envify({ NODE_ENV: 'production' })
    )
    .bundle()
  ```

- 또는 grunt와 [grunt-browserify](https://github.com/jmreidy/grunt-browserify), [envify](https://github.com/hughsk/envify) 를 사용하세요:

  ```js
  // Use the envify custom module to specify environment variables
  const envify = require('envify/custom')

  browserify: {
    dist: {
      options: {
        // Function to deviate from grunt-browserify's default order
        configure: (b) =>
          b
            .transform('vueify')
            .transform(
              // Required in order to process node_modules files
              { global: true },
              envify({ NODE_ENV: 'production' })
            )
            .bundle()
      }
    }
  }
  ```

#### Rollup

다음 플러그인을 사용하세요 [@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace):

```js
const replace = require('@rollup/plugin-replace')

rollup({
  // ...
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    })
  ]
}).then(...)
```

## 사전 템플릿 컴파일 

in-DOM 템플릿 또는 in-JavaScript 템플릿 문자열을 사용하는 경우 템플릿에서 렌더링 기능으로의 컴파일이 그때 그때  수행됩니다. 이는 일반적으로 대부분의 경우 충분히 빠르지만 애플리케이션이 성능에 민감한 경우에는 피하는 것이 좋습니다.

The easiest way to pre-compile templates is using [Single-File Components](/ko-KR/guide/single-file-component.html) - the associated build setups automatically performs pre-compilation for you, so the built code contains the already compiled render functions instead of raw template strings.

템플릿을 사전 컴파일하는 가장 쉬운 방법은 [싱글 파일 컴포넌트](/ko-KR/guide/single-file-component.html)를 사용하는 것입니다. 관련 빌드 설정이 자동으로 사전 컴파일을 수행하므로 빌드된 코드에는 Raw 템플릿 문자열 대신 이미 컴파일 된 렌더링 함수를 포함합니다. 

Webpack을 사용 중이고 JavaScript와 템플릿 파일을 분리하는 것을 선호하는 경우 [vue-template-loader](https://github.com/ktsn/vue-template-loader)를 사용하면 템플릿 파일도 JavaScript로 변환됩니다. 빌드 단계에서 함수를 렌더링합니다.

## 컴포넌트 CSS 추출하기

싱글 파일 컴포넌트를 사용하는 경우 컴포넌트 내부의 CSS는 JavaScript를 통해 `<style>` 태그로 동적으로 삽입됩니다. 이는 런타임 비용이 적게 나마 발생하고, 서버측 렌더링을 사용하는 경우 "스타일이 지정되지 않은 콘텐츠 반짝임"이  발생합니다. 모든 컴포넌트의 CSS를 별도의 단일 파일로 추출하면 이러한 문제를 피할 수 있으며 CSS 축소(minification) 및 캐싱도 향상됩니다.


수행 방법을 보려면 각 빌드 도구 설명서를 참조하십시오:

- [Webpack + vue-loader](https://vue-loader.vuejs.org/en/configurations/extract-css.html) (`vue-cli` 웹펙 템플릿이 이 방식으로 설정되어 있습니다)
- [Browserify + vueify](https://github.com/vuejs/vueify#css-extraction)
- [Rollup + rollup-plugin-vue](https://rollup-plugin-vue.vuejs.org/)

## 런타임 에러 추적

컴포넌트 런타임 오류가 발생하면 전역 `app.config.errorHandler` config 함수로 (설정된 경우)로 전달됩니다.  Vue를 위한 [공식 통합](https://sentry.io/for/vue)을 제공하는 [Sentry](https://sentry.io)와 같은 오류 추적 서비스와 함께 이 후크를 활용하는 것이 좋습니다.
