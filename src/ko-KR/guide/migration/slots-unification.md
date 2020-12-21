---
badges:
- breaking
---

# 슬롯 통합(Slots Unification) <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

이 변경사항은 3.x의 일반 슬롯, 범위 슬롯을 통합합니다.

업데이트 되면서 무엇이 바뀌었는지 한눈에 보여줍니다:

- 이제 `this.$slots`가 슬롯을 함수로 표현합니다.
- **BREAKING**: `this.$scopedSlots`가 삭제되었습니다.

더 많은 정보를 알고 싶다면, 읽으십시오!

## 2.x 문법

`h`와 같은 렌더링 함수를 사용할 때, 2.x는 컨텐츠 노드에서 `slot` 데이터 속성을 정의하는데 사용되었습니다.

```js
// 2.x 문법
h(LayoutComponent, [
  h('div', { slot: 'header' }, this.header),
  h('div', { slot: 'content' }, this.content)
])
```

또한, 범위 슬롯을 참조할 때, 다음 구문을 사용하여 참조할 수 있습니다:

```js
// 2.x 문법
this.$scopedSlots.header
```

## 3.x 문법

3.x에서 슬롯은 객체인 현재 노드의 자식으로 정의됩니다:

```js
// 3.x 문법
h(LayoutComponent, {}, {
  header: () => h('div', this.header),
  content: () => h('div', this.content)
})
```

프로그래밍 방식으로 범위가 지정된 슬롯을 참조해야하는 경우, 이제 `$slots`옵션으로 통합됩니다.

```js
// 2.x 문법
this.$scopedSlots.header

// 3.x 문법
this.$slots.header()
```

## 마이그레이션 방법

대부분의 변경사항은 이미 2.6에서 출시되었습니다. 결과적으로 마이그레이션은 한 단계로 수행될 수 있습니다:

1. 3.x에서 모든 `this.$scopedSlots` 항목을 `this.$slots`로 변경합니다.
2. 모든 `this.$slots.mySlot` 항목을 `this.$slots.mySlot()`으로 변경합니다.
