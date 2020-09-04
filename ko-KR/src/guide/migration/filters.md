---
badges:
- 제거됨
---

# Filters <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

Filters는 Vue 3.0에서 제거되며 더 이상 지원되지 않습니다.

## 2.x 구문

2.x 버전에서는 텍스트 형식화(common text formatting)을 할 수 있는 filters를 사용할 수 있었습니다.

예시:

```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ accountBalance | currencyUSD }}</p>
</template>

<script>
  export default {
    props: {
      accountBalance: {
        type: Number,
        required: true
      }
    },
    filters: {
      currencyUSD(value) {
        return '$' + value
      }
    }
  }
</script>
```

위의 방식은 편리해 보이지만, 중괄호 보간법 안의 표현식이 "그냥 자바스크립트"라는 전제를 깨는 맞춤형 구문이 필요하고, 이는 filters를 배우고 적용하는데에 비용이 들게 합니다.

## 3.x 변경

3.x 버전에서는 filter는 삭제되었고 더 이상 지원되지 않습니다. 대신에 method 호출이나 computed properties로 대체하는 것이 권장됩니다.

다음은 filters대신에 computed properties를 적용해 구현한 예시입니다.

```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ accountInUSD }}</p>
</template>

<script>
  export default {
    props: {
      accountBalance: {
        type: Number,
        required: true
      }
    },
    computed: {
      accountInUSD() {
        return '$' + this.accountBalance
      }
    }
  }
</script>
```

## 마이그레이션 방법

filters 대신 methods나 computed properties를 사용하는 것을 권장합니다.
