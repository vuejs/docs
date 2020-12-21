---
title: 배열 Watch
badges:
- breaking
---

# {{ $frontmatter.title }} <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

- **BREAKING**: 배열에서 watch 콜백은 배열이 교체될 때만 발생합니다. 배열의 변경 사항에 대해 watch 콜백을 실행하려면, 반드시 `deep` 옵션을 설정해야 합니다.

## 3.x 구문

[`watch` 옵션](/ko-KR/api/options-data.html#watch)을 사용하여 배열을 감시할 때, watch 콜백은 배열이 교체될 때만 발생합니다. 즉, 배열의 변경 사항에 대해 더이상 watch 콜백이 발생하지 않음을 의미합니다. 배열의 변경 사항에 대해 watch 콜백을 실행하려면, 반드시 `deep` 옵션을 설정해야 합니다.

```js
watch: {
  bookList: {
    handler(val, oldVal) {
      console.log('book list changed')
    },
    deep: true
  },
}
```

## 마이그레이션 방법

배열의 변경 사항을 감시해야 하는 경우, watch 콜백이 올바르게 동작하도록 `deep` 프로퍼티를 추가하세요.
