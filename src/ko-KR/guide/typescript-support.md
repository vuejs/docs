# TypeScript 지원

> [Vue CLI](https://cli.vuejs.org)는 TypeScript 도구화 지원을 포함하여 제공됩니다.

## NPM 패키지 공식 선언

정적 타입 시스템은 어플리케이션이 증가함에 따라 잠재적인 런타임 오류를 방지하는데 도움이 될 수 있습니다. 이것이 바로 Vue 3이 TypeScript로 작성된 이유입니다. 이것은 Vue와 함께 TypeScript를 사용하기 위해 추가 도구가 필요하지 않다는 것을 의미합니다.

## 권장 설정

```js
// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    // this enables stricter inference for data properties on `this`
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node"
  }
}
```

component 메소드에서 `this`의 타입 체크를 활용하려면 `strict: true` (또는 최소한 `strict` 플래그의 일부인 `noImplicitThis: true`)를 포함해야합니다. 그렇지 않으면 항상 `any`  타입으로 처리됩니다.

[TypeScript compiler options docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html)에서 자세한 내용을 확인하세요

## 개발 도구화

### 프로젝트 생성

[Vue CLI](https://github.com/vuejs/vue-cli)는 TypeScript를 사용하여 새로운 프로젝트를 생성할 수 있습니다. 시작하려면:

```bash
# 1. Install Vue CLI, if it's not already installed
npm install --global @vue/cli

# 2. Create a new project, then choose the "Manually select features" option
vue create my-project-name

# If you already have a Vue CLI project without TypeScript, please add a proper Vue CLI plugin:
vue add typescript
```

컴포넌트의 `script` 부분의 언어가 TypeScript로 되어있는지 확인하세요:

```html
<script lang="ts">
  ...
</script>
```

### 에디터 서포트

TypeScript를 이용해 Vue를 개발한다면, TypeScript를 위한 기본적인 기능을 지원하는 [Visual Studio Code](https://code.visualstudio.com/)를 강력하게 권장합니다. [싱글 파일 컴포넌트](./single-file-components.html)(SFCs)를 사용하는 경우  [Vetur extension](https://github.com/vuejs/vetur)를 사용해보세요. 싱글 파일 컴포넌트 내부 및 기타 여러가지 기능에서 TypeScript 추론을 제공합니다.

또한 [WebStorm](https://www.jetbrains.com/webstorm/)도 TypeScript와 Vue를 위한 기본적인 기능을 제공합니다.

## Vue components 정의

TypeScript에서 Vue component내의 타입을 올바르게 추론하려면, 전역 메서드 `defineComponent`를 통해 component를 정의 해야합니다:

```ts
import { defineComponent } from 'vue'

const Component = defineComponent({
  // type inference enabled
})
```

## Options API와 함께 사용하기

TypeScript는 타입을 명시적으로 정의하지 않고도 대부분의 타입을 추론할 수 있어야 합니다. 예를들어, `count` 프로퍼티를 가진 component가 있는 경우, 문자열 관련 메서드를 호출하려고 하면 에러가 발생합니다:

```ts
const Component = defineComponent({
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    const result = this.count.split('') // => Property 'split' does not exist on type 'number'
  }
})
```

복잡한 타입의 인터페이스를 가지고 있는 경우, [type assertion](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions)을 사용하여 캐스팅 할 수 있습니다:

```ts
interface Book {
  title: string
  author: string
  year: number
}

const Component = defineComponent({
  data() {
    return {
      book: {
        title: 'Vue 3 Guide',
        author: 'Vue Team',
        year: 2020
      } as Book
    }
  }
})
```

### 반환 타입 어노테이팅

Vue의 선언 파일의 순환 특성(circular nature)때문에 TypeScript는 computed를 추론하는데 어려움을 겪을 수 있습니다. 이러한 이유로 computed 속성의 반환 유형에 주석을 추가해야합니다.

```ts
import { defineComponent } from 'vue'

const Component = defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    // needs an annotation
    greeting(): string {
      return this.message + '!'
    }

    // in a computed with a setter, getter needs to be annotated
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase();
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase();
      },
    },
  }
})
```

### 어노테이팅 Props

Vue에서 `type`이 정의된 props에 대해 런타임 유효성 검사를 수행합니다. TypeScript에게 타입을 제공하려면, `PropType`을 사용하여 constructor를 다음과 같이 캐스팅 해야 합니다:

```ts
import { defineComponent, PropType } from 'vue'

interface ComplexMessage {
  title: string
  okMessage: string
  cancelMessage: string
}
const Component = defineComponent({
  props: {
    name: String,
    success: { type: String },
    callback: {
      type: Function as PropType<() => void>
    },
    message: {
      type: Object as PropType<ComplexMessage>,
      required: true,
      validator(message: ComplexMessage) {
        return !!message.title
      }
    }
  }
})
```

validator가 타입 추론을 하지 못하거나 멤버 자동완성이 효과가 없는 경우, 전달인자에 예상되는 타입을 어노테이팅 하는 것이 문제를 해결하는 데 도움이 될 수 있습니다.

## Composition API와 함께 사용하기

`setup()` 함수에서 `props` component 옵션의 타입을 추론 하기 때문에 `props` 파라미터에 입력 할 필요가 없습니다.

```ts
import { defineComponent } from 'vue'

const Component = defineComponent({
  props: {
    message: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const result = props.message.split('') // correct, 'message' is typed as a string
    const filtered = props.message.filter(p => p.value) // an error will be thrown: Property 'filter' does not exist on type 'string'
  }
})
```

### `ref`s 작성

Refs는 초기 값에서 타입을 추론합니다:

```ts
import { defineComponent, ref } from 'vue'

const Component = defineComponent({
  setup() {
    const year = ref(2020)

    const result = year.value.split('') // => Property 'split' does not exist on type 'number'
  }
})
```

때때로 우리는 ref의 내부 값을 복잡한 유형을 정해야할 수도 있습니다. ref를 호출하여 기본적인 추론을 재정의할 때, 단순히 일반적인 전달인자를 전달하여 이를 수행할 수 있습니다.

```ts
const year = ref<string | number>('2020') // year's type: Ref<string | number>

year.value = 2020 // ok!
```

::: tip 
제너릭 타입을 알 수 없는 경우,  `ref`를 `Ref<T>`으로 캐스팅 하는 것을 권장합니다 
:::

### `reactive` 작성

`reactive` 프로퍼티를 입력할 때, 다음과 같은 인터페이스를 사용할 수 있습니다:

```ts
import { defineComponent, reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const book = reactive<Book>({ title: 'Vue 3 Guide' })
    // or
    const book: Book = reactive({ title: 'Vue 3 Guide' })
    // or
    const book = reactive({ title: 'Vue 3 Guide' }) as Book
  }
})
```

### `computed` 작성

Computed 값들은 반환된 값에서 자동으로 타입을 추론합니다.

```ts
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CounterButton',
  setup() {
    let count = ref(0)

    // read-only
    const doubleCount = computed(() => count.value * 2)

    const result = doubleCount.value.split('') // => Property 'split' does not exist on type 'number'
  }
})
```
