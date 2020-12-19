---
title: Data Option
badges:
- breaking
---

# {{ $frontmatter.title }} <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

- **BREAKING**: `data` 컴포넌트 옵션 선언은 더이상 일반 자바스크립트 `object`를 허용하지 않으며, `function` 선언을 해야합니다.

- **BREAKING**: mixin 또는 extends에서 여러 `data` 반환 값을 병합할 때, 병합은 deep이 아니라 shallow입니다. (root-level의 속성만 병합됨.)

## 2.x 구문

2.x에서 개발자는 `object` 또는 `function`을 사용하여 `data`옵션을 정의할 수 있습니다.

예시:

```html
<!-- 객체 선언 -->
<script>
  const app = new Vue({
    data: {
      apiKey: 'a1b2c3'
    }
  })
</script>

<!-- 함수 선언 -->
<script>
  const app = new Vue({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  })
</script>
```

이는 공유 상태를 갖는 루트 인스턴스 측면에서 약간의 편의를 제공하였지만, 루트 인스턴스에서만 가능하다는 사실로 인해 혼란을 야기하였습니다.

## 3.x 변경점

3.x에서 `data`옵션은 `object`를 반환하는 `function`만 허용하도록 표준화되었습니다.

위의 예제를 사용하면 가능한 코드 구현이 하나뿐입니다:

```html
<script>
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  }).mount('#app')
</script>
```

## Mixin 병합 동작 변경

또한, 컴포넌트의 `data()`와 해당 mixin 또는 extends 기반이 병합되면, 병합은 *shallowly(얕게)* 수행됩니다:

```js
const Mixin = {
  data() {
    return {
      user: {
        name: 'Jack',
        id: 1
      }
    }
  }
}

const CompA = {
  mixins: [Mixin],
  data() {
    return {
      user: {
        id: 2
      }
    }
  }
}
```

Vue 2.x에서 `$data` 결과는 다음과 같습니다:

```json
{
  user: {
    id: 2,
    name: 'Jack'
  }
}
```

3.0에서 결과는 다음과 같습니다:

```json
{
  user: {
    id: 2
  }
}
```

## 마이그레이션 방법

객체 선언에 의존하는 사용자의 경우 다음을 권장합니다:

- 공유 데이터를 외부 객체에서 추출하여 `data`의 속성으로 사용
- 새 공유 객체를 가리키도록 공유 데이터에 대한 참조를 다시 작성

mixin의 깊은 병합(deep merge)에 의존하는 사용자의 경우, mixin의 깊은 병합이 매우 암시적이고 코드 로직의 이해도와 디버깅이 더 어렵게 만들 수 있기 때문에, 이러한 의존성을 피하기 위해 코드를 리펙토링하는 것이 좋습니다.
