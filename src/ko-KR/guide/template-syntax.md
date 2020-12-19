# 템플릿 문법

Vue.js는 렌더링 된 DOM을 컴포넌트 인스턴스의 데이터에 선언적으로 바인딩할 수 있는 HTML 기반 템플릿 구문을 사용합니다. 모든 Vue.js 템플릿은 스펙을 호환하는 브라우저 및 HTML 파서로 구문 분석할 수 있는 유효한 HTML입니다.

내부적으로 Vue는 템플릿을 가상 DOM 렌더링 함수로 컴파일합니다. 반응형 시스템과 결합된 Vue는 앱 상태가 변경될 때 다시 렌더링할 최소한의 컴포넌트를 지능적으로 파악하여 DOM 조작을 최소화합니다.

가상 DOM 개념에 익숙하고 JavaScript 본래의 기능을 선호한다면, 템플릿 대신 [렌더 함수를 직접 작성](render-function.html)할 수 있으며, 선택사항으로 JSX를 지원합니다.

## 보간법(Interpolation)

### 문자열

데이터 바인딩의 가장 기본 형태는 “Mustache”(이중 중괄호 구문)기법을 사용한 문자열 보간법(text interpolation)입니다.

```html
<span>메시지: {{ msg }}</span>
```

Mustache 태그는 해당 컴포넌트 인스턴스의 `msg` 속성 값으로 대체됩니다. 또한 `msg` 속성이 변경될 때 마다 갱신됩니다.

[v-once 디렉티브](../api/directives.html#v-once)를 사용하여 데이터가 변경되어도 갱신되지 않는 일회성 보간을 수행할 수 있습니다. 다만, 이런 경우 같은 노드의 바인딩에도 영향을 미친다는 점을 유의해야 합니다.

```html
<span v-once>결코 변하지 않을 것입니다: {{ msg }}</span>
```

### 원시 HTML

이중 중괄호는 데이터를 HTML이 아닌 일반 텍스트로 해석합니다. 실제 HTML을 출력하려면 [`v-html` 디렉티브](../api/directives.html#v-html)를 사용해야 합니다.

```html
<p>이중 중괄호 사용: {{ rawHtml }}</p>
<p>v-html 디렉티브 사용: <span v-html="rawHtml"></span></p>
```


<common-codepen-snippet title="Rendering v-html" slug="yLNEJJM" :preview="false" />


`span`의 내용은 일반 HTML로 해석되는 `rawHtml` 속성 값으로 대체됩니다. 이 때 데이터 바인딩은 무시됩니다. Vue는 문자열 기반 템플릿 엔진이 아니기 때문에 템플릿을 구성하는 데에 `v-html` 디렉티브를 사용할 수 없다는 점을 유의해야 합니다. UI 재사용 및 구성의 기본 단위로 <code>v-html</code> 디렉티브 대신 컴포넌트를 사용하는 것을 추천합니다.

::: tip 
웹사이트에서 임의의 HTML을 동적으로 렌더링하면 [XSS 취약점](https://en.wikipedia.org/wiki/Cross-site_scripting)(https://en.wikipedia.org/wiki/Cross-site_scripting)으로 쉽게 이어질 수 있고 이는 매우 위험할 소지가 있습니다. HTML 보간법은 반드시 신뢰할 수 있는 콘텐츠에서만 사용하고 사용자가 제공한 콘텐츠에서는 **절대** 사용하면 안 됩니다. 
:::

### 속성

Mustaches(이중 중괄호 구문)는 HTML 속성에 사용할 수 없습니다. 대신 [`v-bind` 디렉티브](../api/#v-bind)를 사용하세요.

```html
<div v-bind:id="dynamicId"></div>
```

단순히 존재가 `참(true)`임을 의미하는 boolean 속성의 경우, `v-bind` 디렉티브는 조금 다르게 작동합니다.

```html
<button v-bind:disabled="isButtonDisabled">Button</button>
```

만약, `isButtonDisabled`의 값이 `null` 또는 `undefined`라면 `disabled` 속성은 렌더링 된`<button>`엘리먼트에 포함되지 않습니다.

### JavaScript 표현식 사용

지금까지는 간단한 속성 키들을 템플릿에 바인딩했습니다. 그러나 실제로 Vue.js는 모든 데이터 바인딩 내에서 JavaScript 표현식 기능을 전부 지원합니다.

```html
{{ number + 1 }} {{ ok ? 'YES' : 'NO' }} {{ message.split('').reverse().join('')
}}

<div v-bind:id="'list-' + id"></div>
```

위 표현식들은 활성 Vue 인스턴스 데이터 범위 내에서 JavaScript로 계산됩니다. 각 바인딩은 **하나의 단일 표현식**만 포함해야 하는 제한이 있습니다. 따라서 다음과 같이 작성하면 **안 됩니다.**

```html
<!-- 아래는 문장입니다. 표현식이 아닙니다. -->
{{ var a = 1 }}

<!-- 조건문은 작동하지 않습니다. 삼항 연산자를 사용해야 합니다. -->
{{ if (ok) { return message } }}
```

## 디렉티브

디렉티브는 `v-`로 시작하는 특수한 속성입니다. 디렉티브 속성 값은 단일 **JavaScript 표현식**이 됩니다. (나중에 설명할 `v-for`와 `v-on`은 예외입니다.) 디렉티브의 역할은 표현식의 값이 변경될 때 발생하는 부수 효과(side effects)들을 반응적으로 DOM에 적용하는 것입니다. 아래 예제에서 살펴보겠습니다.

```html
<p v-if="seen">이제 저를 볼 수 있어요.</p>
```

여기서 `v-if` 디렉티브는 표현식 `seen` 값의 참, 거짓 여부를 바탕으로 `<p>` 엘리먼트를 삽입하거나 제거합니다.

### 전달인자

일부 디렉티브는 디렉티브명 뒤에 콜론(:)으로 표기되는 전달인자를 가질 수 있습니다. 예를 들어, `v-bind` 디렉티브는 반응적으로 HTML 속성을 갱신하는 데 사용합니다.

```html
<a v-bind:href="url"> ... </a>
```

여기서 `href`는 전달인자로, `v-bind` 디렉티브가 표현식 `url`의 값을 엘리먼트의 `href` 속성에 바인딩하도록 지시합니다.

또 다른 예로는 DOM 이벤트를 수신하는 `v-on` 디렉티브가 있습니다.

```html
<a v-on:click="doSomething"> ... </a>
```

여기서는 수신할 이벤트명이 전달인자입니다. 이벤트 핸들링에 대해서도 좀 더 자세히 살펴볼 것입니다.

### 동적 전달인자

JavaScript 표현식을 대괄호로 묶어 디렉티브 전달인자로 사용할 수도 있습니다.

```html
<!--
후술된 "동적 전달인자 형식의 제약" 부분에서 설명한 바와 같이 전달인자 형식에 몇 가지 제약이 있다는 점에 주의해 주세요.
-->
<a v-bind:[attributeName]="url"> ... </a>
```

여기서 `attributeName`은 JavaScript 표현식으로 동적 변환되며, 변환된 결과는 전달인자의 최종값으로 사용됩니다. 예를 들어, 여러분의 컴포넌트 인스턴스에 값이 `"href"`인 데이터 속성 `attributeName`이 있다면, 이 바인딩은 `v-bind:href`와 같습니다.

이와 유사하게, 동적인 이벤트명에 핸들러를 바인딩할 때 동적 전달인자를 활용할 수 있습니다.

```html
<a v-on:[eventName]="doSomething"> ... </a>
```

위 예제에서 `eventName`의 값이 `"focus"` 라면, `v-on:[eventName]`은 `v-on:focus`와 같습니다.

### 수식어

수식어는 점으로 표기되는 특수 접미사로, 디렉티브를 특별한 방법으로 바인딩해야 함을 나타냅니다. 예를 들어, `.prevent` 수식어는 `v-on` 디렉티브가 트리거된 이벤트에서 `event.preventDefault()`를 호출하도록 지시합니다.

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

나중에 [`v-on`](events.md#event-modifiers)과 [`v-model`](forms.md#modifiers)을 살펴볼 때 수식어의 다른 예를 만나볼 것입니다.

## 약어

`v-` 접두어는 템플릿에서 Vue 특정 속성을 식별하기 위한 시각적 신호 역할을 합니다. 이 기능은 Vue.js를 사용하여 기존 마크업에 동적인 동작을 적용할 때 유용하지만, 일부 자주 사용되는 디렉티브에 대해 장황하다고 느껴질 수 있습니다. 동시에 Vue.js가 모든 템플릿을 관리하는 [SPA](https://en.wikipedia.org/wiki/Single-page_application)를 구축하게 되면 `v-` 접두어의 필요성이 줄어듭니다. 따라서 가장 자주 사용되는 두 개의 디렉티브 `v-bind`와 `v-on`에 대한 특별한 약어를 제공합니다.

### `v-bind` 약어

```html
<!-- 전체 문법 -->
<a v-bind:href="url"> ... </a>

<!-- 약어 -->
<a :href="url"> ... </a>

<!-- 동적 전달인자와 함께 쓴 약어 -->
<a :[key]="url"> ... </a>
```

### `v-on` 약어

```html
<!-- 전체 문법 -->
<a v-on:click="doSomething"> ... </a>

<!-- 약어 -->
<a @click="doSomething"> ... </a>

<!-- 동적 전달인자와 함께 쓴 약어 -->
<a @[event]="doSomething"> ... </a>
```

위 예제들이 일반적인 HTML과 조금 다르게 보일 수 있으나, 속성명에 쓴 `:`과 `@`은 유효한 문자이며, Vue를 지원하는 모든 브라우저가 이를 올바르게 구문 분석할 수 있습니다. 또한 최종 렌더링 된 마크업에는 나타나지 않습니다. 약어는 전적으로 선택사항이지만, 사용법에 점차 익숙해지면 편할 것입니다.

> 다음 페이지부터 예제에 약어를 쓸 것입니다. Vue 개발자 여러분의 보편적인 사용법이기 때문입니다.

### 주의사항

#### 동적 전달인자 값의 제약

동적 전달인자는 `null`을 제외하고 string으로 변환되어야 합니다. 특수 값 `null`을 사용하면 명시적으로 바인딩을 제거할 수 있습니다. 그 외 <code>null</code>이나 string이 아닌 값은 경고를 출력합니다.

#### 동적 전달인자 형식의 제약

동적 전달인자 형식에는 일부 문자상의 제약이 있습니다. HTML 속성명에 공백이나 따옴표와 같은 특정 문자가 유효하지 않기 때문입니다. 다음 예시는 잘못된 경우입니다.

```html
<!-- 컴파일러 경고가 발생합니다. -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

복잡한 표현식은 Vue의 가장 기본적인 부분 중 하나인 [computed 속성](computed.html)으로 대체하는 것이 좋습니다. [computed 속성](computed.html)은 곧 다룰 것입니다.

in-DOM 템플릿(HTML 파일 내에 템플릿을 직접 작성한 경우)을 쓰면 브라우저가 강제로 속성명을 소문자로 만들어 버리므로 속성명에 대문자를 넣지 않도록 합니다.

```html
<!--
in-DOM 템플릿에서는 이 부분이 v-bind:[someattr]로 변환됩니다. 인스턴스에 "someattr" 속성이 없는 경우, 이 코드는 동작하지 않습니다.
-->
<a v-bind:[someAttr]="value"> ... </a>
```

#### JavaScript 표현식

템플릿 표현식은 샌드박스 처리되며 `Math`나 `Date`처럼 [전역으로 사용 가능한 것](https://github.com/vuejs/vue-next/blob/master/packages/shared/src/globalsWhitelist.ts#L3)에서만 접근할 수 있습니다. 템플릿 표현식에서 사용자 정의 전역에 접근하려 하지 마십시오.
