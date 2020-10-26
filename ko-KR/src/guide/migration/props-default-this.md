---
title: Props Default 함수의 this 접근
badges:
- breaking
---

# Props Default 함수의 `this` 접근 <migrationbadges badges="$frontmatter.badges"></migrationbadges>

Props default 팩토리 함수는 더이상 `this`에 접근할 수 없습니다.

대안

- default 함수의 인자로 컴포넌트로부터 받은 원시 props가 전달됩니다.

- default 함수 안에서 [inject](../composition-api-provide-inject.md) API를 사용할 수 있습니다.

```js
import { inject } from 'vue'

export default {
  props: {
    theme: {
      default (props) {
        // `props`는 어떤 유형이나 강제된 기본값이기 전에
        // 컴포넌트에 전달된 원시값으로서,
        // 주입된 속성에 접근하기 위해 `inject`를 사용할 수도 있습니다.
        return inject('theme', 'default-theme')
      }
    }
  }
}
```
