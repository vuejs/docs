---
title: Transition 클래스 변경
badges:
- breaking
---

# {{ $frontmatter.title }} <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

`v-enter` transition 클래스는 `v-enter-from`으로 변경되었으며, `v-leave` transition 클래스는 `v-leave-from`으로 변경되었습니다.

## 2.x 구문

v2.1.8 이전에는 각 transition 방향에 대해 초기 상태와 활성 상태의 두 가지 transition 클래스를 가지고 있었습니다.

v2.1.8에서는 진입 및 진출 transition 간 시간차를 해결하기 위해 `v-enter-to`를 도입했습니다. 그러나 이전 버전과의 호환성을 위해 `v-enter`라는 명칭은 변경되지 않았습니다.

```css
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-leave,
.v-enter-to {
  opacity: 1;
}
```

*enter*와 *leave*는 클래스 훅 대응자와 동일한 명명 규칙을 사용하지 않았으며, 그 범위가 매우 넓었기 때문에 혼란이 발생하였습니다.

## 3.x 변경점

보다 명확하고 알아보기 쉽도록, 이러한 초기 상태 클래스를 다음과 같이 변경했습니다.

```css
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}
```

이제 상태들 사이의 차이점이 무엇인지 훨씬 더 분명해졌습니다.

![Transition Diagram](/images/transitions.svg)

`<transition>` 컴포넌트와 연관된 prop 명칭도 다음과 같이 변경되었습니다.

- `leave-class`가 `leave-from-class`로 변경되었습니다. (render 함수나 JSX 내부에서 `leaveFromClass`로 쓸 수 있습니다.)
- `enter-class`가 `enter-from-class`로 변경되었습니다. (render 함수나 JSX 내부에서 `enterFromClass`로 쓸 수 있습니다.)

## 마이그레이션 방법

1. `.v-enter`를 `.v-enter-from`으로 변경합니다.
2. `.v-leave`를 `.v-leave-from`으로 변경합니다.
3. transition과 연관된 prop 명칭을 위와 같이 변경합니다.
