# 문서 스타일 가이드

이 가이드는 문서 작성에 사용할 수 있는 다양한 디자인 요소에 대한 개요를 제공합니다.

## 경고(Alerts)

VuePress는 경고 상자(alert boxes)를 만드는 사용자 지정 컨테이너 플러그인을 제공합니다. 4가지 유형이 있습니다:

- **정보(Info)**: 중립적인 정보를 제공합니다.
- **팁(Tip)**: 긍정적이고 격려적인 정보를 제공합니다.
- **경고(Warning)**: 낮음에서 보통으로 사용자가 알아야 할 정보를 제공합니다.
- **위험(Danger)**: 부정적이고 사용자에게 위험이 높은 정보를 제공합니다.

**마크다운 예제**

```
::: info
이 사이트에서 더 많은 정보를 찾을 수 있습니다.
:::

::: tip
이것은 기억해야 할 좋은 팁입니다!
:::

::: warning
이것은 주의해야 할 사항입니다.
:::

::: danger DANGER
이것은 우리가 권장하지 않는 것입니다. 자신의 책임하에 사용하십시오.
:::
```

**렌더링 된 마크다운**

::: info 
이 사이트에서 더 많은 정보를 찾을 수 있습니다. 
:::

::: tip 
이것은 기억해야 할 좋은 팁입니다! 
:::

::: warning 
이것은 주의해야 할 사항입니다. 
:::

::: danger DANGER 
이것은 우리가 권장하지 않는 것입니다. 자신의 책임하에 사용하십시오. 
:::

## 코드 블록

VuePress는 Prism을 사용하여 코드 블록의 시작 백틱(backticks)에 언어를 추가하여 언어 구분 강조표시(language syntax highlighting)를 제공합니다:

**마크다운 예제**

```
```js
export default {
  name: 'MyComponent'
}
```
```

**렌더링 된 결과**

```js
export default {
  name: 'MyComponent'
}
```

### 라인 하이라이트(Line Highlighting)

코드 블록에 하이라이트를 추가하려면 중괄호 안에 줄 번호를 추가해야합니다.

#### 단일 라인(Single Line)

**마크다운 예제**

```
```js{2}
export default {
  name: 'MyComponent',
  props: {
    type: String,
    item: Object
  }
}
```
```

**렌더링 된 마크다운**

```js{2}
export default {
  name: 'MyComponent',
  props: {
    type: String,
    item: Object
  }
}
```

#### 라인 그룹(Group of Lines)

```
```js{4-5}
export default {
  name: 'MyComponent',
  props: {
    type: String,
    item: Object
  }
}
```
```

```js{4-5}
export default {
  name: 'MyComponent',
  props: {
    type: String,
    item: Object
  }
}
```

#### 여러 섹션

```
```js{2,4-5}
export default {
  name: 'MyComponent',
  props: {
    type: String,
    item: Object
  }
}
```
```

```js{2,4-5}
export default {
  name: 'MyComponent',
  props: {
    type: String,
    item: Object
  }
}
```
