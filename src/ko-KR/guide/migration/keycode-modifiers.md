---
badges:
- breaking
---

# 키 코드 수식어(KeyCode Modifiers) <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

변경내용:

- **BREAKING**: `v-on`에 숫자를 사용한 키 입력 수식어는 더이상 지원되지 않습니다.
- **BREAKING**: `config.keyCodes`는 더이상 지원되지 않습니다.

## 2.x 구문

Vue 2에서는 `v-on` 메서드를 수정하는 방식으로 `키 코드(keyCode)`를 지원했습니다.

```html
<!-- 키 코드(keyCode) 사용 -->
<input v-on:keyup.13="submit" />

<!-- 별칭 사용 -->
<input v-on:keyup.enter="submit" />
```

또한, 전역 `config.keyCodes` 옵션을 통해 사용자 정의 별칭을 설정할 수 있었습니다.

```js
Vue.config.keyCodes = {
  f1: 112
}
```

```html
<!-- 키 코드(keyCode) 사용 -->
<input v-on:keyup.112="showHelpText" />

<!-- 커스텀 별칭 사용 -->
<input v-on:keyup.f1="showHelpText" />
```

## 3.x 구문

[`KeyboardEvent.keyCode`를 더이상 사용하지 않기로 한 후,](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) Vue 3에서 이 기능을 유지하는 것은 의미 없는 일이 되었습니다. 이에 따라 수식어로 사용하고 싶은 키에 케밥 케이스(kebab-case) 형식 키 이름을 사용하기를 권장합니다.

```html
<!-- Vue 3에서 v-on에 키 수식어 사용 -->
<input v-on:keyup.delete="confirmDelete" />
```

즉, `config.keyCodes` 옵션 역시 사용되지 않으며, 더이상 관련 내용을 지원하지 않을 것임을 의미합니다.

## 마이그레이션 방법

코드 전반에 `키 코드(keyCode)`를 사용하는 경우, 케밥 케이스(kebab-case) 형식 키 이름으로 변환하기를 권장합니다.
