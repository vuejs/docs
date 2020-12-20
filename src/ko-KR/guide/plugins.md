# 플러그인

플러그인은 일반적으로 Vue에 전역 수준의 기능을 추가하는 self-contained 코드입니다.  `객체` 또는`함수`를 `install()`메소드를 통해 제공합니다.

플러그인에 대해 엄격하게 정의 된 범위는 없습니다. 일반적으로 플러그인이 유용한 시나리오는 다음과 같습니다.

1. 약간의 전역 메소드 또는 속성 추가, 예. [vue-custom-element](https://github.com/karol-f/vue-custom-element).

2. 하나 이상의 글로벌 에셋 추가 : 디렉티브 / 필터 / 트랜지션 등. (예. [vue-touch](https://github.com/vuejs/vue-touch)).

3. 글로벌 mixin으로 일부 컴포넌트 옵션 추가(예. [vue-router](https://github.com/vuejs/vue-router)).

4. 일부 전역 인스턴스 메서드를 `config.globalProperties`에 연결하여 추가.

5. 가지고 있는 API를 제공하면서 동시에 위의 일부 조합을 주입하는 라이브러리 (예. [vue-router](https://github.com/vuejs/vue-router)).

## 플러그인 작성하기

나만의 Vue.js 플러그인을 만드는 방법을 더 잘 이해하기 위해 `국제화(i18n)` 준비 문자열을 표시하는 간단한 플러그인을 만들어 보겠습니다

이 플러그인은 애플리케이션에 추가 될 때마다 `install` 메소드가 객체 인 경우 호출됩니다. `function`인 경우 함수 자체가 호출됩니다. 두 경우 모두 Vue의 <code>createApp</code>에서 생성 된 `app`객체와 사용자가 전달한 옵션 두 개의 매개 변수를 받습니다.

플러그인 객체를 설정하는 것 부터 시작하겠습니다. 로직(logic)을 포함하고 분리하기 위해 아래와 같이 별도의 파일로 생성하고 export 하는 것이 좋습니다.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // 플러그인 코드는 여기에
  }
}
```

전체 애플리케이션에서 사용할 수 있는 키를 translate하는 함수를 만들기 때문에 `app.config.globalProperties`를 사용하여 노출합니다.

이 함수는 `key` 문자열을 받으며 사용자가 보낸 옵션에서 translate 된 문자열을 조회하는 데 사용합니다.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = key => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, i18n)
    }
  }
}
```

사용자가 플러그인을 사용할 때 `options`에 translate 된 키가 포함 된 객체를 전달한다고 가정합니다. `$translate` 함수는 `greetings.hello`의 문자열을 가져 와서 사용자가 설정한 configuration을 살펴보고 translate 된 값을 반환합니다 (이 경우 `반가워요!`)

예:

```js
greetings: {
  hello: '반가워요!',
}
```

또한 플러그인을 사용하면 `inject`를 사용하여 플러그인 사용자에게 함수 또는 속성을 제공 할 수 있습니다. 예를 들어 애플리케이션이 translate 객체를 사용하기 위해 `options`에 접근 하도록 허용 할 수 있습니다.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = key => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, i18n)
    }

    app.provide('i18n', options)
  }
}
```

플러그인 사용자는 이제 컴포넌트에 `inject['i18n']`을 수행하고 객체에 액세스 할 수 있습니다.

또한 `app` 객체에 접근 할 수 있으므로 `mixin` 및 `directive` 사용과 같은 다른 모든 기능을 플러그인에서 사용할 수 있습니다. `createApp` 및 애플리케이션 인스턴스에 대해 자세히 알아 보려면 [Application API 문서](/ko-KR/api/application-api.html)를 확인하세요.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = (key) => {
      return key.split('.')
        .reduce((o, i) => { if (o) return o[i] }, i18n)
    }

    app.provide('i18n', options)

    app.directive('my-directive', {
      mounted (el, binding, vnode, oldVnode) {
        // 로직들 ...
      }
      ...
    })

    app.mixin({
      created() {
        // 로직들 ...
      }
      ...
    })
  }
}
```

## 플러그인 사용하기

`createApp()`을 사용하여 Vue 앱을 초기화 한 후 `use()` 메서드를 호출하여 애플리케이션에 플러그인을 추가 할 수 있습니다.

데모 목적으로 [플러그인 작성하기](#writing-a-plugin) 섹션에서 만든 `i18nPlugin`을 사용합니다

`use()` 메서드는 두 개의 매개 변수를 사용합니다. 첫 번째는 설치할 플러그인입니다 (이 경우 `i18nPlugin`).

또한 같은 플러그인을 두 번 이상 사용하지 못하기 때문에 같은 플러그인에서 여러 번 호출하면 플러그인이 한 번만 설치됩니다.

두 번째 매개 변수는 선택 사항이며 각 플러그인에 따라 다릅니다. 데모 `i18nPlugin`의 경우 translate 된 문자열이있는 객체입니다.

::: info 
`Vuex` 또는 `Vue Router`와 같은 써드파티 플러그인을 사용하는 경우 항상 설명서를 확인하여 특정 플러그인이 두 번째 매개 변수내용을 확인하세요 
:::

```js
import { createApp } from 'vue'
import Root from './App.vue'
import i18nPlugin from './plugins/i18n'

const app = createApp(Root)
const i18nStrings = {
  greetings: {
    hi: '안녕!'
  }
}

app.use(i18nPlugin, i18nStrings)
app.mount('#app')
```

커뮤니티에서 기여한 많은 플러그인 및 라이브러리 컬렉션을 [awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries)에서 확인하세요.
