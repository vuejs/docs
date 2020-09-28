---
badges:
- breaking
---

# `v-model` <migrationbadges :badges="$frontmatter.badges"></migrationbadges>

## 개요

변경내용:

- **BREAKING:** 커스텀 컴포넌트를 사용할때, `v-model` prop 와 event 기본 명칭이 변경 되었습니다:
    - prop: `value` -> `modelValue`;
    - event: `input` -> `update:modelValue`;
- **BREAKING:** `v-bind`의 `.sync` 수식어와 컴포넌트의 `model` 옵션이 제거되고 `v-model` 전달인자로 대체 되었습니다;
- **NEW:** 이제 동일 컴포넌트에서 다중의 `v-model` 바인딩이 가능합니다.
- **NEW:** 사용자 지정 `v-model` 수식어 를 생성하는 기능이 추가되었습니다.

더 자세한 설명은 계속 읽으십시오!

## 서론

Vue 2.0이 출시되었을때 `v-model` 디렉티브는 개발자들에게  `value` 사용자 지정 속성으로 사용하도록 하였습니다. 개발자들이 다른 목적을 위해 다른 사용자 지정 속성이 필요할때는 `v-bind.sync`를 사용해야만 했습니다. 또한 `v-model`과 `value` 사이에 데이터를 쉽게 변경할 수 없는 관계는 네이티브 요소와 사용자 지정 요소의 처리 방식에 문제가 발생했습니다.

2.2에서는 컴포넌트가 `v-model`에 사용할 사용자 지정 속성 및 이벤트를 사용자가 지정할 수 있도록 `model` 컴포넌트 옵션이 도입되었습니다. 그러나 여전히 컴포넌트에 단일`v-model`만 사용가능 합니다.

Vue 3에서는 혼동을 줄이고 개발자가 `v-model` 디렉티브를 보다 유연하게 사용할 수 있도록 양방향 데이터 바인딩을 위한 API가 표준화되고 있습니다.

## 2.x 문법

2.x에서, 컴포넌트가 `v-model`을 사용하는 것은 `value`사용자 지정 속성을 전달하고 <code>input</code> 이벤트를 emit 하는 것과 같습니다.

```html
<ChildComponent v-model="pageTitle" />

<!-- 축약된 방식은 아래와 같습니다: -->

<ChildComponent :value="pageTitle" @input="pageTitle = $event" />
```

사용자 지정 속성 또는 이벤트명을 다른이름으로 변경하려는 경우에는 `ChildComponent`에 `model` 옵션 추가가 필요 합니다:

```html
<!-- ParentComponent.vue -->

<ChildComponent v-model="pageTitle" />
```

```js
// ChildComponent.vue

export default {
  model: {
    prop: 'title',
    event: 'change'
  },
  props: {
    // 다른 목적을 위해 'value' 사용이 가능 합니다
    value: String,
    // 'value'를 대신하는 사용자 지정 속성으로 'title' 사용 합니다
    title: {
      type: String,
      default: 'Default title'
    }
  }
}
```

또한, 아래처럼 `v-model`를 축약할 수 있습니다.

```html
<ChildComponent :title="pageTitle" @change="pageTitle = $event" />
```

### `v-bind.sync` 사용

경우에 따라 우리는 사용자 지정 속성에 양방향 바인딩이 필요할 수 있다. (가끔은 `v-model` 외에 추가적으로 다른 사용자 지정 속성에 대하여). 이를 위해, `update:myPropName` 패턴으로 이벤트를 emit 하는 것이 좋습니다. 예를 들면, 이전 예제에서 `title` 사용자 지정 속성을 사용한 `ChildComponent`의 경우, 새로운 값을 할당 하려는 의도를 다음과 같이 전달할 수 있습니다:

```js
this.$emit('update:title', newValue)
```

그런 다음 부모가 원한다면 이벤트를 수신하고 로컬 데이터 속성을 업데이트 할 수 있습니다. 예를 들면 다음과 같습니다:

```html
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

편의를 위해, .sync 수식어를 이용하여 다음과 같이 축약할 수 있습니다.

```html
<ChildComponent :title.sync="pageTitle" />
```

## 3.x 문법

3.x에서 커스텀 컴포넌트의 `v-model`은 사용자 지정 옵션으로 `modelValue`를 전달하고 `update:modelValue` 이벤트를 emit 하는 것과 같습니다:

```html
<ChildComponent v-model="pageTitle" />

<!-- 축약된 방식은 아래와 같습니다: -->

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
```

### `v-model` 인자

모델명을 변경하려면 `model` 컴포넌트 옵션 대신에 앞으로는 *argument*를 `v-model`에 전달할 수 있습니다:

```html
<ChildComponent v-model:title="pageTitle" />

<!-- 축약된 방식은 아래와 같습니다: -->

<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

![v-bind anatomy](https://github.com/narusas/docs-next/blob/master/images/v-bind-instead-of-sync.png?raw=true)

이는 또한 `.sync` 수식어를 대체하는 역할을 하며 커스텀 컴포넌트에 여러 개의 `v-model`를 가질 수 있게 한다.

```html
<ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />

<!-- 축약된 방식은 아래와 같습니다: -->

<ChildComponent
  :title="pageTitle"
  @update:title="pageTitle = $event"
  :content="pageContent"
  @update:content="pageContent = $event"
/>
```

### `v-model` 수식어

2.x에서 하드 코딩된 `v-model` 외에 `.trim` 같은 수식어들은, 3.x에서는 커스텀 수식어들로 지원한다:

```html
<ChildComponent v-model.capitalize="pageTitle" />
```

[Custom Events](../component-custom-events.html#handling-v-model-modifiers)에서 커스텀 `v-model` 수식어들에 대해 자세히 알아볼 수 있습니다.

## 마이그레이션 방법

다음을 권장합니다:

- 코드베이스에서 `.sync` 사용을 확인하고 `v-model`로 변경하십시오:

    ```html
    <ChildComponent :title.sync="pageTitle" />

    <!-- 변경하면 아래와 같습니다. -->

    <ChildComponent v-model:title="pageTitle" />
    ```

- 인수가 없는 모든 `v-model`에 대해 사용자 지정 속성 및 이벤트명을 각각 `modelValue` 와 `update:modelValue`로 변경하십시오

    ```html
    <ChildComponent v-model="pageTitle" />
    ```

    ```js
    // ChildComponent.vue

    export default {
      props: {
        modelValue: String // 이전에는 `value: String`
      },
      methods: {
        changePageTitle(title) {
          this.$emit('update:modelValue', title) // 이전에는 `this.$emit('input', title)`
        }
      }
    }
    ```

## 다음 단계

새로운 `v-model` 문법에 대한 자세한 내용은 아래를 참고하세요:

- [Using `v-model` on Components](../component-basics.html#using-v-model-on-components)
- <a><code>v-model</code> arguments</a>
- [Handling `v-model` modifiers](../component-custom-events.html#v-model-arguments)
