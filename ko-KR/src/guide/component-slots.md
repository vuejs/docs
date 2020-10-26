# Slots

> 이 페이지는 여러분이 이미 [컴포넌트 기초](component-basics.md)를 읽었다고 가정하고 쓴 내용입니다. 컴포넌트가 처음이라면 기초 문서를 먼저 읽으시기 바랍니다.

## Slot 컨텐츠

Vue는 [Web Components spec draft](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md)에서 영감을 받아 만든 컨텐츠 배포 API인 `<slot>`을 이용해 컨텐츠를 각 요소에 배포할 수 있도록 했습니다.

이를 이용하면 아래와 같이 컴포넌트를 구성할 수 있습니다:

```html
<todo-button>
  Add todo
</todo-button>
```

이 경우, `<todo-button>`의 템플릿 안에는 아래와 같은 코드가 필요합니다:

```html
<!-- todo-button component template -->
<button class="btn-primary">
  <slot></slot>
</button>
```

이제 컴포넌트가 렌더될 때 `<slot></slot>` 부분이 "Add Todo"로 대치됩니다.

```html
<!-- todo-button component template -->
<button class="btn-primary">
  Add todo
</button>
```

문자열은 시작일 뿐입니다! 슬롯은 HTML을 포함한 어떠한 템플릿 코드라도 포함할 수 있습니다:

```html
<todo-button>
  <comment></comment>
  <i class="fas fa-plus">
  Add todo
</i></todo-button>
```

심지어는 컴포넌트를 포함시킬 수도 있습니다:

```html
<todo-button>
  <!-- 아이콘을 추가하기 위해 컴포넌트를 사용 -->
  <font-awesome-icon name="plus"></font-awesome-icon>
  Add todo
</todo-button>
```

만약 `<todo-button>` 컴포넌트의 템플릿이 `<slot>` 코드를 가지고 있지 **않다면**, 태그 내부에 위치한 모든 컨텐츠는 무시됩니다.

```html
<!-- todo-button 컴포넌트 템플릿 -->

<button class="btn-primary">
  Create a new item
</button>
```

```html
<todo-button>
  <!-- 아래의 텍스트는 렌더링되지 않습니다 -->
  Add todo
</todo-button>
```

## 렌더 스코프

다음과 같이 slot 내부에 데이터를 사용하고 싶은 경우:

```html
<todo-button>
  Delete a {{ item.name }}
</todo-button>
```

해당 slot은 나머지 템플릿과 같은 인스턴스의 속성과 같은 접근 권한을 갖습니다. (즉, 같은 "스코프"를 갖습니다.)

 <img src="https://github.com/narusas/docs-next/blob/master/images/slot.png?raw=true" alt="Slot explanation diagram" class="">

이 slot은 `<todo-button>` 의 스코프에 접근할 수 **없습니다**. 예를 들어, 아래와 같이 `action`에 접근하고자 하는 경우, 코드가 정상적으로 동작하지 않습니다.

```html
&lt;todo-button action="delete"&gt;
  Clicking here will {{ action }} an item
  &lt;!--
    `action`은 &lt;todo-button&gt; 내부에서 정의된 것이 아니라 전달받은 것이기 때문에 위의 `action`은 undefined가 됩니다.
  --&gt;
&lt;/todo-button&gt;
```

아래와 같은 규칙을 기억하세요:

> 부모 템플릿에 있는 모든 요소는 부모 스코프에서 컴파일되고, 자식 템플릿에 있는 모든 요소는 자식 스코프에서 컴파일됩니다.

## Fallback 컨텐츠

Slot에 컨텐츠가 주어지지 않는 경우, (default 같은) fallback을 특정하는 것이 유용한 경우가 있습니다. 예를 들어,  `<submit-button>`라는 컴포넌트가 있을 때

```html
<button type="submit">
  <slot></slot>
</button>
```

일반적으로 "Submit"이라는 텍스트가 `<button>` 내부에 있기를 원할 수 있습니다. "Submit" 텍스트를 fallback 컨텐츠로 만들기 위해서 `<slot>`  태그 내부에 텍스트를 위치할 수 있습니다.

```html
<button type="submit">
  <slot>Submit</slot>
</button>
```

이제 `<submit-button>` 내부의 slot에 아무런 컨텐츠도 제공하지 않는 경우에:

```html
<submit-button></submit-button>
```

아래와 같이 fallback 컨텐츠로써 "Submit"을 렌더합니다:

```html
<button type="submit">
  Submit
</button>
```

하지만 컨텐츠를 제공하는 경우에는:

```html
<submit-button>
  Save
</submit-button>
```

Fallback 컨텐츠 대신 입력한 컴포넌트가 들어갑니다.

```html
<button type="submit">
  Save
</button>
```

## 이름을 갖는 Slot

여러 개의 슬롯을 사용하는 것이 유용한 경우가 있습니다. 예를 들어, 아래와 같은 템플릿을 가진 `<base-layout>` 컴포넌트가 있다고  해 봅시다.

```html
<div class="container">
  <header>
    <!-- header 컨텐츠를 두고 싶은 곳 -->
  </header>
  <main>
    <!-- main 컨텐츠를 두고 싶은 곳 -->
  </main>
  <footer>
    <!-- footer 컨텐츠를 두고 싶은 곳 -->
  </footer>
</div>
```

이 경우, `<slot>` 엘리먼트가 특별한 attribute인 `name`을 갖도록 할 수 있습니다. 이는 각 slot의 특정한 ID로써, 각각의 컨텐츠가 원하는 곳에 렌더링되도록 하는데 사용될 수 있습니다:

```html
<div class="container">
  <header>
    <slot name="header">
  </header>
  <main>
    <slot>
  </main>
  <footer>
    <slot name="footer">
  </footer>
</div>
```

`name` 을 갖지 않는 `<slot>`은 묵시적으로 "default"라는 name을 갖습니다.

이름을 가진 slot에 컨텐츠를 제공하기 위해서는 `<template>` 엘리먼트에 `v-slot` 지시자를 사용합니다. <br>`v-slot`의 매개변수로는 각 slot의 이름을 전달합니다.

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

이제 각 `<template>` 안의 요소들은 대응되는 slot으로 전달됩니다.

렌더링된 HTML은 다음과 같습니다:

```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

([한가지 경우](#abbreviated-syntax-for-lone-default-slots)를 제외하고) **`v-slot` 은 `<template>`에만 사용할 수 있음을 참고하세요.**

## 스코프를 갖는 Slot

간혹 슬롯 컨텐츠가 자식 컴포넌트에서만 접근할 수 있는 데이터에 접근하는 것이 유용한 경우가 있습니다. 이러한 경우는 컴포넌트가 array의 요소들을 렌더링하고 각 요소들이 렌더링되는 방식을 커스터마이징 하는 경우에 주로 발생합니다.

예를 들어, todo-item들을 갖는 컴포넌트를 생각해 봅시다.

```js
app.component('todo-list', {
  data() {
    return {
      items: ['고양이 밥 주기', '우유 사기']
    }
  },
  template: `
    <ul>
      <li v-for="(item, index) in items">
        {{ item }}
      </li>
    </ul>
  `
})
```

이 때, 부모 컴포넌트에서 slot을 변경하길 원할 수 있습니다:

```html
<todo-list>
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</todo-list>
```

하지만 `<todo-list>` 컴포넌트만이`item` 요소에 대한 접근이 가능하며 부모요소에는 slot만을 제공하므로 위 코드는 정상적으로 동작하지 않습니다.

이 경우, `item`을 부모 요소로부터 제공받는 slot 컨텐츠에 사용 가능하도록 하기 위해서 `<slot>` 요소에 매개변수로써 bind 시킬 수 있습니다.

```html
&lt; ul&gt;
  &lt; li v-for="( item, index ) in items"&gt;
    &lt; slot :item="item"&gt;&lt; /slot&gt;
  &lt; /li&gt;
&lt; /ul&gt;
```

`<slot>` 엘리먼트에 연결된 매개변수를 **slot props**라고 부릅니다. 이제 부모 스코프에서 `v-slot`를 정의한 이름을 이용해 사용할 수 있습니다.

```html
<todo-list>
  <template v-slot:default="slotProps">
    <i class="fas fa-check"></i>
    <span class="green">{{ slotProps.item }}</span>
  </template>
</todo-list>
```


<img src="/images/scoped-slot.png" width="611" height="auto" style="display: block; margin: 0 auto; max-width: 100%;" loading="lazy" alt="Scoped slot diagram">

이 예제에서는 모든 slot props를 포함하는 오브젝트의 이름을 `slotProps`로 사용한 것이며, 이름은 원하는 대로 변경할 수 있습니다.

### 단일 기본 slot에 대한 축약된 문법

위와 같은 경우에, 만약 기본 slot이 *유일하게* 전달되는 컨텐츠라면 컴포넌트의 태그가 slot의 템플릿처럼 사용될 수 있습니다. <br>이는 `v-slot`을 컴포넌트에 직접 사용할 수 있게 해 줍니다.

```html
<todo-list v-slot:default="slotProps">
  <i class="fas fa-check"></i>
  <span class="green">{{ slotProps.item }}</span>
</todo-list>
```

즉, 위 코드를 좀 더 줄여 쓸 수 있습니다. 특정되지 않은 컨텐츠가 기본 슬롯에 할당된 경우, 매개변수가 없는 `v-slot`은 기본 슬롯을 참조합니다:

```html
<todo-list v-slot="slotProps">
  <i class="fas fa-check"></i>
  <span class="green">{{ slotProps.item }}</span>
</todo-list>
```

이러한 축약형 문법은 이름을 갖는 슬롯과 함께 **사용할 수 없음을** 기억하세요. 이름을 갖는 슬롯과 혼용되는 경우 스코프가 모호해지게 됩니다:

```html
<!-- INVALID, will result in warning -->
<todo-list v-slot="slotProps">
  <todo-list v-slot:default="slotProps">
    <i class="fas fa-check"></i>
    <span class="green">{{ slotProps.item }}</span>
  </todo-list>
  <template v-slot:other="otherSlotProps">
    slotProps is NOT available here
  </template>
</todo-list>
```

여러 개의 slot이 존재하는 경우에는 *모든* slot에 대해 `<template>` 코드를 전부 작성하세요:

```html
&lt; todo-list&gt;
  &lt; template v-slot:default="slotProps"&gt;
    &lt; i class="fas fa-check"&gt;
    &lt; span class="green"&gt;{{ slotProps.item }}&lt; /span&gt;
  &lt; /template&gt;

  &lt; template v-slot:other="otherSlotProps"&gt;
    ...
  &lt; /template&gt;
&lt; /todo-list&gt;
```

### Slot Props 비구조화 할당

내부적으로 스코프를 갖는 slot은 slot의 컨텐츠를 하나로 감싸 함수의 매개변수로 전달합니다:

```js
function (slotProps) {
  // ... slot content ...
}
```

이는 곧 <code>v-slot</code>의 값이 함수 정의에 들어갈 수 있는 모든 유효한 JavaScript 표현식을 수용할 수 있음을 뜻합니다. 따라서 <a>ES2015의 비구조화 할당</a>을 활용해 특정 slot props를 사용하는 것이 가능합니다.

```html
<todo-list v-slot="{ item }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</todo-list>
```

이는 곧 `v-slot`의 값이 함수 정의에 들어갈 수 있는 모든 유효한 JavaScript 표현식을 수용할 수 있음을 뜻합니다. 따라서 <a>ES2015의 비구조화 할당</a>을 활용해 특정 slot props를 사용하는 것이 가능합니다.

```html
<todo-list v-slot="{ item: todo }">
  <i class="fas fa-check"></i>
  <span class="green">{{ todo }}</span>
</todo-list>
```

추가로, fallback을 정의하고 slot prop이 undefined일 때 활용하도록 할 수도 있습니다:

```html
<todo-list v-slot="{ item = 'Placeholder' }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</todo-list>
```

## 동적인 이름을 갖는 Slot

[Dynamic directive arguments](template-syntax.md#dynamic-arguments)는 `v-slot`, 에서도 활용이 가능하며, slot이 동적으로 이름을 갖도록 할 수 있습니다:

```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

## 이름을 갖는 Slot의 축약형

`v-on`나 `v-bind`처럼, `v-slot`도 매개변수 앞에 오는 것(`v-slot:`)을 `#`을 이용해 축약할 수 있습니다. 예를 들어, `v-slot:header`는 `#header`로 작성할 수 있습니다:

```html
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    A paragraph for the main content.</p>
    And another one.</p>
  </template>

  <template #footer>
    Here's some contact info</p>
  </template>
</base-layout>
```

하지만 다른 지시자들과 같이 축약형은 매개변수가 주어진 경우에만 유효합니다. 즉, 다음과 같은 문법은 유효하지 않습니다:

```html
<!-- This will trigger a warning -->

<todo-list #="{ item }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</todo-list>
```

축약형의 경우 위와 같이 작성하는 대신 항상 다음과 같이 이름을 명시해 주어야 합니다:

```html
<todo-list #default="{ item }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</todo-list>
```
