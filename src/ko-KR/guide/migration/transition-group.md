---
title: 트랜지션 그룹 루트 엘리먼트
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## 개요

`<transition-group>`는 더이상 루트 엘리먼트를 렌더링 하지 않습니다. 하지만 여전히 `tag` prop을 통해 만들수 있습니다. 

## 2.x 문법

Vue 2에서는, `<transition-group>` 는 다른 커스텀 컴포넌트 처럼 루트 엘리먼트가 필요했습니다. 기본 값으로 `<span>`을 사용하지만 `tag` prop을 통해 커스터마이밍 할수 있었습니다. 

```html
<transition-group tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</transition-group>
```

## 3.x 문법

Vue 3에서는  [fragment가 지원됩니다.](/ko-KR/guide/migration/fragments.html) 따라서 컴포넌트들은 더이상루트 노드가 _필요하지_ 않습니다. 따라서  `<transition-group>` 은 더이상 기본 루트 태그를 가지지 않습니다. 

- 위의 예와 같이 Vue 2 코드에 이미 `tag` prop이 정의되어 있으면 모든 것이 예전과 동일하게 동작합니다. 
- If you didn't have one defined _and_ your styling or other behaviors relied on the presence of the `<span>` root element to work properly, simply add `tag="span"` to the `<transition-group>`:
- 제대로 작동하기 위해 `<span>` 루트 엘리먼트가 있어야만 하는 스타일이나 동작이 있다면, 그냥 `<transition-group>`에 `tag="span"`을 추가하면됩니다.

```html
<transition-group tag="span">
  <!-- -->
</transition-group>
```

## 더 보기

- [몇몇 트랜지션 클래스가 이름을 가지게 되었습니다.](/ko-KR/guide/migration/transition.html)
