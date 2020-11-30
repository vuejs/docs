# Props

> 이 페이지는 여러분이 이미 [컴포넌트 기초](component-basics.md)를 읽었다고 가정하고 쓴 내용입니다. 컴포넌트가 처음이라면 기초 문서를 먼저 읽으시기 바랍니다.

## Prop 타입

이제까지는 문자열 배열로 나열 된 prop만 보았습니다:

```js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```

일반적으로 모든 prop가 특정 유형의 값이 되기를 원할 것입니다. 이 경우 속성의 이름과 값에 각각 prop 이름과 타입이 포함된 객체로 prop를 나열할 수 있습니다.

```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // 또는 다른 생성자
}
```

이는 컴포넌트를 문서화할 뿐만 아니라, 잘못된 타입이 전달하는 경우 브라우저의 자바스크립트 콘솔에서 사용자에게 경고합니다. 아래에서 [타입 체크와 기타 prop 검증](#prop-validation)에 대해 자세히 알아볼 수 있습니다.

## 정적/동적 Prop 전달

지금까지 다음과 같이 prop가 정적 값을 전달하는 것을 확인했습니다:

```html
<blog-post title="Vue와 떠나는 여행"></blog-post>
```

또는 다음과 같이 `v-bind`나 약어인 `:` 문자를 사용하여 prop에 동적인 값을 전달하였습니다.

```html
<!-- 변수의 값을 동적으로 할당 -->
<blog-post :title="post.title"></blog-post>

<!-- 복잡한 표현을 포함한 동적 값 할당 -->
<blog-post :title="post.title + ' by ' + post.author.name"></blog-post>
```

위의 두 가지 예시에서 문자열 값을 전달하지만 실제로 *어떤(any)* 타입의 값도 prop에 전달할 수 있습니다.

### 숫자형(Number) 전달

```html
<!-- `42`는 정적이지만 Vue에게 이 값이 문자열이 아니라 -->
<!-- 자바스크립트 표현식임을 알리기위해 v-bind가 필요합니다. -->
<blog-post :likes="42"></blog-post>

<!-- 변수 값에 동적으로 할당합니다. -->
<blog-post :likes="post.likes"></blog-post>
```

### 논리 자료형(Boolean) 전달

```html
<!-- 값이 없는 prop를 포함하면 `true`를 의미합니다. -->
<blog-post is-published></blog-post>

<!-- `false`는 정적이지만 Vue에게 이 값이 문자열이 아닌 -->
<!-- 자바스크립트 표현식임을 알리려면 v-bind가 필요합니다. -->
<blog-post :is-published="false"></blog-post>

<!-- 변수 값에 동적으로 할당합니다. -->
<blog-post :is-published="post.isPublished"></blog-post>
```

### 배열 전달

```html
<!-- 배열이 정적이지만 Vue에게 이 값이 문자열이 아닌 -->
<!-- 자바스크립트 표현식임을 알리려면 v-bind가 필요합니다. -->
<blog-post :comment-ids="[234, 266, 273]"></blog-post>

<!-- 변수 값에 동적으로 할당합니다. -->
<blog-post :comment-ids="post.commentIds"></blog-post>
```

### 객체 전달

```html
<!-- 객체가 정적이지만 Vue에게 이 값이 문자열이 아니라 -->
<!-- 자바스크립트 표현식임을 알리려면 v-bind가 필요합니다. -->
<blog-post
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
></blog-post>

<!-- 변수 값에 동적으로 할당합니다. -->
<blog-post :author="post.author"></blog-post>
```

### 객체의 속성 전달

객체의 모든 속성을 prop로 전달하려면 전달인자없이 `v-bind`를 사용할 수 있습니다(`:prop-name` 대신 `v-bind`를 사용). 예를들어 `post`객체가 주어지면:

```js
post: {
  id: 1,
  title: 'Vue와 떠나는 여행'
}
```

아래와 같이 작성하는 것은:

```html
<blog-post v-bind="post"></blog-post>
```

다음과 동일합니다:

```html
<blog-post v-bind:id="post.id" v-bind:title="post.title"></blog-post>
```

## 단방향 데이터 흐름

모든 props는 자식 속성과 부모 속성 사이에 **아래로 단방향 바인딩(one-way-down binding)**을 형성합니다. 부모 속성이 업데이트되면 자식으로 흐르지만 반대 방향은 아닙니다. 이렇게하면 하위 컴포넌트가 실수로 앱의 데이터 흐름을 이해하기 힘들게 만드는 상위 컴포넌트 상태 변경을 방지할 수 있습니다.

또한, 부모 컴포넌트가 업데이트될 때마다 자식 컴포넌트의 모든 prop들이 최신 값으로 새로고침됩니다. 즉, 하위 컴포넌트에서 prop를 변경하려고 시도해서는 **안됩니다**. 그렇게하면 Vue는 콘솔에서 경고합니다.

일반적으로 prop를 변경하려는 2가지 경우가 있습니다:

1. **prop는 초기 값을 전달하는데 사용됩니다. 하위 컴포넌트는 나중에 prop값을 로컬 data속성으로 사용하려고 합니다**. 이 경우 prop를 초기 값으로 사용하는 로컬 data 속성을 정의하는 것이 가장 좋습니다.

```js
props: ['initialCounter'],
data() {
  return {
    counter: this.initialCounter
  }
}
```

1. **prop는 변환해야 하는 원시 값으로 전달됩니다.** 이 경우 prop의 값을 사용하여 computed 속성을 정의하는 것이 가장 좋습니다.

```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

::: tip Note 자바스크립트의 객체와 배열은 참조로 전달되므로 prop가 배열 또는 객체인 경우 하위 컴포넌트 내부의 객체 또는 배열 자체를 변경하면 상위 상태에 영향을 **줄 것입니다**. :::

## Prop 유효성 검사

컴포넌트는 이미 보아왔던 타입과 같은 prop에 대한 요구사항을 지정할 수 있습니다. 요구사항이 충족되지 않으면, Vue는 브라우저의 자바스크립트 콘솔에서 경고합니다. 이는 다른 사람이 사용하도록 의도된 컴포넌트를 개발할 때 특히 유용합니다.

prop 유효성 검사를 지정하려면 문자열 배열 대신 `props`값에 대한 유효성 검사가 있는 객체를 제공할 수 있습니다. 예를 들어:

```js
app.component('my-component', {
  props: {
    // 기본 타입 체크 (`null`과 `undefined`는 모든 타입 유효성 검사를 통과합니다.)
    propA: Number,
    // 여러 타입 허용
    propB: [String, Number],
    // 문자열 필수
    propC: {
      type: String,
      required: true
    },
    // 기본 값을 갖는 숫자형
    propD: {
      type: Number,
      default: 100
    },
    // 기본 값을 갖는 객체 타입
    propE: {
      type: Object,
      // 객체나 배열의 기본 값은 항상 팩토리 함수로부터 반환되어야 합니다.
      default: function() {
        return { message: 'hello' }
      }
    },
    // 커스텀 유효성 검사 함수
    propF: {
      validator: function(value) {
        // 값이 꼭 아래 세 문자열 중 하나와 일치해야 합니다.
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    },
    // 기본 값을 갖는 함수
    propG: {
      type: Function,
      // 객체나 배열과 달리 아래 표현은 팩토리 함수가 아닙니다. 기본 값으로 사용되는 함수입니다.
      default: function() {
        return 'Default function'
      }
    }
  }
})
```

prop 유효성 검사가 실패하면 Vue는 콘솔에 경고를 출력합니다 (개발 빌드를 사용하는 경우).

::: tip Note props는 컴포넌트 인스턴스가 생성되기 **전에** 유효성 검사를 하므로 인스턴스 속성(예: `data`, `computed` 등)은 `default`나 `validator` 함수 내에서 사용할 수 없습니다. :::

### 타입 체크

`type`은 다음 기본 생성자(native constructor) 중 하나일 수 있습니다:

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

또한, `type`에는 커스텀 생성자가 될 수도 있으며, assertion은 `instanceof` 확인으로 수행됩니다. 예를 들어 다음과 같이 생성자 함수가 존재하는 경우:

```js
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
```

아래와 같이 사용하면:

```js
app.component('blog-post', {
  props: {
    author: Person
  }
})
```

`author` prop의 값이 `new Person`으로 생성되었는지 확인합니다.

## Prop 대소문자 구분 (camelCase vs kebab-case)

HTML 속성명은 대소문자를 구분하지 않으므로, 브라우저는 모든 대문자를 소문자로 해석합니다. 즉, DOM내 템플릿을 사용할 때 camelCase된 prop명은 kebab-case(하이픈으로 구분)된 해당 항목을 사용해야 합니다:

```js
const app = Vue.createApp({})

app.component('blog-post', {
  // JavaScript에서의 camelCase
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

```html
<!-- HTML에서의 kebab-case -->
<blog-post post-title="hello!"></blog-post>
```

다시 말하지만, 문자열 리터럴을 사용하는 경우 이 제한이 적용되지 않습니다.
