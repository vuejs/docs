# Props

> 이 페이지는 여러분이 이미 [컴포넌트 기초](component-basics.md)를 읽었다고 가정하고 쓴 내용입니다. 컴포넌트가 처음이라면 기초 문서를 먼저 읽으시기 바랍니다.

## Prop 타입

이제까지는 string array 형태로 리스팅된 prop 들을 사용하였습니다:

```js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```

하지만 일반적으로 대부분의 prop은 특정한 타입과 값을 가지길 바라며 설계될 것입니다. 이러한 경우, prop을 object로 정의함으로써 각 속성들이 이름과 타입을 포함하도록 할 수 있습니다:

```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // 혹은 임의의 다른 모든 생성자
}
```

이는 컴포넌트를 문서화 할 뿐만 아니라, 잘못된 타입이 전달되었을 때 유저의 브라우저 자바스크립트 콘솔에 잘못된 타입에 대한 warning을 발생시킵니다. 해당 페이지의 아래에서 [타입 체크와 prop 검증](#prop-validation) 에 대해서 보다 자세히 다룹니다.

## 정적/동적 Prop 전달

이제까지는 아래와 같은 형태로 prop에 정적인 값을 전달하였습니다:

```html
<blog-post title="Vue와 떠나는 여행"></blog-post>
```

혹은, `v-bind`를 이용하거나 이의 축약형인 `:`를 이용하여 prop에 동적인 값을 전달하였습니다.

```html
<!-- 변수의 값을 동적으로 할당 -->
<blog-post :title="post.title"></blog-post>

<!-- 복잡한 표현을 포함한 동적 값 할당 -->
<blog-post :title="post.title + ' by ' + post.author.name"></blog-post>
```

위 두 경우 모두 string 값을 전달하긴 하지만, 실제로는 *아무 타입*이나 prop에 전달될 수 있습니다.

### 숫자형(Number) 전달

```html
<!-- `42`는 정적인 값임에도 불구하고, 우리는 v-bind를 사용하여 -->
<!-- Vue에 해당 값이 string이 아닌 자바스크립트 표현임을 전달하여야 합니다. -->
<blog-post :likes="42"></blog-post>

<!-- 동적으로 변수의 값을 할당하는 경우는 아래와 같습니다. -->
<blog-post :likes="post.likes"></blog-post>
```

### 논리 자료형(Boolean) 전달

```html
<!-- 아무 값도 없는 prop는 `true`를 전달합니다. -->
<blog-post is-published></blog-post>

<!-- `false` 는 정적인 값임에도 불구하고, 우리는 v-bind를 사용하여 -->
<!-- Vue에 해당 값이 string이 아닌 자바스크립트 표현임을 전달하여야 합니다.          -->
<blog-post :is-published="false"></blog-post>

<!-- 동적으로 변수의 값을 할당하는 경우는 아래와 같습니다. -->
<blog-post :is-published="post.isPublished"></blog-post>
```

### 배열(Array) 전달

```html
<!-- 아래 Array는 정적인 값임에도 불구하고, 우리는 v-bind를 사용하여 -->
<!-- Vue에 해당 값이 string이 아닌 자바스크립트 표현임을 전달하여야 합니다. -->
<blog-post :comment-ids="[234, 266, 273]"></blog-post>

<!-- 동적으로 변수의 값을 할당하는 경우는 아래와 같습니다. -->
<blog-post :comment-ids="post.commentIds"></blog-post>
```

### 오브젝트(Object) 전달

```html
<!-- 전달하는 Object가 정적인 값임에도 불구하고, 우리는 v-bind를 사용하여 -->
<!-- Vue에 해당 값이 string이 아닌 자바스크립트 표현임을 전달하여야 합니다.            -->
<blog-post
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
></blog-post>

<!-- 동적으로 변수의 값을 할당하는 경우는 아래와 같습니다. -->
<blog-post :author="post.author"></blog-post>
```

### Object의 프로퍼티 전달하기

오브젝트의 모든 속성을 prop으로 전달하고자 하는 경우, 전달 인자 없이 `v-bind`를 사용함으로써 (즉, `:prop-name` 대신 `v-bind`를 사용하여) 모든 속성을 전달할 수 있습니다. 예를 들어, 아래와 같이 `post`라는 오브젝트를 전달하는 경우:

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

모든 prop들은 부모와 자식 요소 사이에 **단방향 데이터 흐름**의 형태를 가져야 합니다: 즉, 부모의 속성이 업데이트 되면 자식 요소가 따라 업데이트되지만, 반대 방향으로의 변화는 일어나지 않습니다. 이러한 구조는 자식 요소 컴포넌트가 의도치 않게 부모의 상태를 변경하여 앱의 데이터 흐름을 이해하기 어렵게 만드는 일을 방지합니다.

또한, 부모 컴포넌트가 업데이트될 때 마다 자식 요소의 모든 prop들이 최신 값으로 새로고침됩니다. 이는 곧 사용자가 prop을 자식 컴포넌트 안에서 수정해서는 **안된다는 것**이기도 합니다. 만약 변경이 일어나는 경우, Vue는 콘솔에 경고를 출력합니다.

아래 두 경우가 주로 prop을 직접 변경하고 싶을 수 있는 상황의 예시입니다:

1. **prop은 초기값만 전달하고, 자식 컴포넌트는 그 초기값을 로컬 데이터 속성으로 활용하고 싶은 경우**. 해당 경우에는 로컬 데이터 속성을 따로 선언하고 그 속성의 초기값으로써 prop을 사용하는 것이 가장 바람직합니다.

```js
props: ['initialCounter'],
data() {
  return {
    counter: this.initialCounter
  }
}
```

1. **전달된 prop의 형태를 바꾸어야 하는 경우**. <br>해당 경우에는 computed 속성을 사용하는 것이 가장 바람직합니다.

```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

::: 팁 - 자바스크립트 오브젝트나 배열을 prop으로 전달하는 경우, 객체를 복사하는 것이 아니라 참조하게 됩니다. 즉, 전달받은 오브젝트나 배열를 수정하게 되는 경우, 자식 요소가 부모 요소의 상태에 **영향을 주게**됩니다. :::

## Prop 유효성 검사

앞에서 본 것 처럼, 컴포넌트는 prop들에 대해 타입과 같은 필수 조건을 특정할 수 있습니다. 만약 조건이 충족되지 않는 경우, Vue는 브라우저의 자바스크립트 콘솔에 경고를 출력합니다. 이는 특히 다른 사람들도 사용할 컴포넌트를 개발할 때 유용합니다.

Prop의 유효성 검사를 설정하기 위해서는 `props`를 문자열 배열 대신 필요조건을 담은 오브젝트로써 선언합니다. 예를 들어:

```js
app.component('my-component', {
  props: {
    // 기본 타입 체크 (`null`과 `undefined`는 모든 타입을 허용합니다.)
    propA: Number,
    // 여러 타입 허용
    propB: [String, Number],
    // 필수 문자열
    propC: {
      type: String,
      required: true
    },
    // 기본값을 갖는 숫자형
    propD: {
      type: Number,
      default: 100
    },
    // 기본값을 갖는 오브젝트
    propE: {
      type: Object,
      // 오브젝트나 배열의 기본값은 항상 팩토리 함수로부터 반환되어야 합니다.
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
    // 기본값을 갖는 함수
    propG: {
      type: Function,
      // 오브젝트나 배열과 달리, 아래 표현은 팩토리 함수가 아니라
      // 함수를 기본값으로 사용하는 것입니다.
      default: function() {
        return 'Default function'
      }
    }
  }
})
```

prop 유효성 검사가 실패하는 경우, Vue는 콘솔에 경고를 출력합니다. (개발용 빌드를 사용하고 있는 경우)

::: 팁 - prop들은 컴포넌트 인스턴스가 생성되기 **전에** 검증됩니다. 즉, 인스턴스의 프로퍼티(e.g. `data`, `computed` 등)들은 `default` 나 `validator` 함수 내에서 사용될 수 없습니다. :::

### 타입 체크

`type`은 아래의 native생성자 중 하나가 될 수 있습니다:

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

또한, `type` 에는 커스텀 생성자가 사용될 수도 있습니다. 확인은 `instanceof` 를 통해 이루어집니다. 예를 들어, 아래와 같은 생성자 함수가 선언되어 있을 때:

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

`author` prop이 `new Person`으로 생성된 값인지 확인할 수 있습니다.

## Prop 대소문자 구분 (camelCase vs kebab-case)

HTML 어트리뷰트는 대소문자 구분이 없기 때문에 브라우저는 대문자를 소문자로 변경하여 읽습니다. 그렇기 때문에 카멜 케이스(대소문자 혼용)로 prop의 이름을 정한 경우에 DOM 템플릿 안에서는 케밥 케이스(하이픈으로-연결된-구조)를 사용하여야 올바르게 동작합니다.

```js
const app = Vue.createApp({})

app.component('blog-post', {
  // JavaScript에서의 camelCase 사용
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

```html
<!-- HTML에서의 kebab-case 사용 kebab-case  -->
<blog-post post-title="hello!"></blog-post>
```

물론, string 템플릿을 사용하는 경우에는 제한은 적용되지 않습니다.
