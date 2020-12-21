# 조건부 렌더링

## `v-if`

`v-if` 디렉티브는 조건에 따라 블록을 렌더링할 때 사용합니다. 블록은 디렉티브의 표현식이 true 값을 반환할 때만 렌더링됩니다.

```html
<h1 v-if="awesome">Vue is awesome!</h1>
```

`v-else`와 함께 “else 블록”을 추가하는 것도 가능합니다.

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

### `<template>`에 `v-if`를 갖는 조건부 그룹 만들기

`v-if`는 디렉티브이기 때문에 하나의 엘리먼트에 추가되어야 합니다. 하지만 둘 이상의 엘리먼트를 전환하려면 어떻게 해야 할까요? 이런 경우, `v-if`를 `<template>` 엘리먼트에 사용할 수 있습니다. `<template>` 엘리먼트는 눈에 보이지 않게 내부 엘리먼트를 감싸는 역할(invisible wrapper)을 하며, 최종 렌더링 결과에 포함되지 않습니다.

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### `v-else`

`v-else` 디렉티브를 사용하여 `v-if`에 대한 “else 블록”을 나타낼 수 있습니다.

```html
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```

`v-else` 엘리먼트는 반드시 `v-if` 엘리먼트나 `v-else-if` 엘리먼트 바로 뒤에 와야 합니다. 그렇지 않으면 인식되지 않습니다.

### `v-else-if`

`v-else-if` 디렉티브는 이름에서 알 수 있듯, `v-if`에 대한 “else if 블록” 역할을 합니다. 또한 여러 번 연결해 사용할 수도 있습니다.

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

`v-else`와 마찬가지로, `v-else-if` 엘리먼트는 반드시 `v-if` 엘리먼트나 `v-else-if` 엘리먼트 바로 뒤에 와야 합니다.

## `v-show`

엘리먼트를 조건에 따라 표시하기 위한 또 다른 방법으로 `v-show` 디렉티브가 있습니다. 사용 방법은 거의 동일합니다.

```html
<h1 v-show="ok">Hello!</h1>
```

둘의 차이는 `v-show`를 쓴 엘리먼트의 경우, 항상 렌더링 되어 DOM에 남아있다는 점입니다. `v-show`는 단순히 엘리먼트의 CSS `display` 속성만을 전환합니다.

`v-show`는 `<template>` 엘리먼트를 지원하지 않으며, `v-else`와 함께 쓸 수 없습니다.

## `v-if` 대 `v-show`

`v-if`는 "실제(real)" 조건부 렌더링입니다. 전환 도중 조건부 블록 내부의 이벤트 리스너 및 자식 컴포넌트들이 올바르게 제거되고 다시 생성되기 때문입니다.

또한 `v-if`는 **게으릅니다(lazy)**. 초기 렌더링 시, 조건이 거짓(false)이면 아무 작업도 하지 않습니다. 조건부 블록은 조건이 처음으로 참(true)이 될 때까지 렌더링되지 않습니다.

이에 비해 `v-show`는 훨씬 간단합니다. 엘리먼트는 CSS 기반 전환으로 초기 조건과 관계 없이 항상 렌더링됩니다. (역자 주: v-show는 엘리먼트를 DOM에 우선 렌더링하고 조건에 따라 CSS display:block/display:none 속성을 전환합니다.)

일반적으로 `v-if`는 전환 비용이 높은 반면, `v-show`는 초기 렌더링 비용이 높습니다. 그러므로 무언가를 자주 전환해야 한다면 `v-show`를 사용하는 게 좋고, 런타임 시 조건이 변경되지 않는다면 `v-if`를 사용하는 게 더 낫습니다.

## `v-if` 와 `v-for`

::: tip 
`v-if`와 `v-for`를 함께 쓰는 것은 **권장하지 않습니다**. 자세한 내용은 [스타일 가이드](../style-guide/#avoid-v-if-with-v-for-essential)를 참고하세요. 
:::

동일한 엘리먼트에 `v-if`와 `v-for`를 함께 사용할 때, `v-if`가 더 높은 우선순위를 갖습니다. 자세한 내용은 [리스트 렌더링 가이드](list#v-for-with-v-if)를 참고하세요.
