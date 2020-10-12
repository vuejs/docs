---
title: Transition Class Change
badges:
- breaking
---

# {{ $frontmatter.title }} <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

The `v-enter` transition class has been renamed to `v-enter-from` and the `v-leave` transition class has been renamed to `v-leave-from`.

## 2.x Syntax

v2.1.8 이전에는 각 transition 방향에 대해 초기 상태와 활성 상태의 두 가지 transition 클래스를 가지고 있었습니다.

In v2.1.8, we introduced `v-enter-to` to address the timing gap between enter/leave transitions. However, for backward compatibility, the `v-enter` name was untouched:

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

This became confusing, as *enter* and *leave* were broad and not using the same naming convention as their class hook counterparts.

## 3.x Update

In order to be more explicit and legible, we have now renamed these initial state classes:

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

It's now much clearer what the difference between these states is.

![Transition Diagram](/images/transitions.svg)

The `<transition>` component's related prop names are also changed:

- `leave-class` is renamed to `leave-from-class` (can be written as `leaveFromClass` in render functions or JSX)
- `enter-class` is renamed to `enter-from-class` (can be written as `enterFromClass` in render functions or JSX)

## Migration Strategy

1. Replace instances of `.v-enter` to `.v-enter-from`
2. Replace instances of `.v-leave` to `.v-leave-from`
3. Replace instances of related prop names, as above.
