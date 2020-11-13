# 믹스인

## 기초

믹스인(Mixins)은 Vue 컴포넌트에 재사용 가능한 기능을 배포합니다. 믹스인 객체는 모든 컴포넌트의 옵션을 포함할 수 있습니다. 컴포넌트가 믹스인을 사용하면, 믹스인의 모든 옵션이 컴포넌트의 자체 옵션으로 "혼합"됩니다.

예시:

```js
// mixin 객체 정의
const myMixin = {
  created() {
    this.hello()
  },
  methods: {
    hello() {
      console.log('hello from mixin!')
    }
  }
}

// mixin을 사용할 어플리케이션 정의
const app = Vue.createApp({
  mixins: [myMixin]
})

app.mount('#mixins-basic') // => "hello from mixin!"
```

## 옵션 병합

믹스인과 컴포넌트 자신은 중복되는 옵션을 가지고 있는 경우에는 적절한 방법을 사용해서 "병합"됩니다.

예를 들어 data 객체가 충돌하는 경우에는 컴포넌트의 data 객체가 우선순위를 갖으면서 재귀적으로 병합됩니다.

```js
const myMixin = {
  data() {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

const app = Vue.createApp({
  mixins: [myMixin],
  data() {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created() {
    console.log(this.$data) // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

같은 이름의 훅 함수는 모두 호출될 수 있게 배열에 병합됩니다. 믹스인 훅은 컴포넌트 자체의 훅이 호출되기 **전에** 호출됩니다.

```js
const myMixin = {
  created() {
    console.log('mixin hook called')
  }
}

const app = Vue.createApp({
  mixins: [myMixin],
  created() {
    console.log('component hook called')
  }
})

// => "mixin hook called"
// => "component hook called"
```

`methods`, `components`, `directives`같은 객체 값을 요구하는 옵션은 같은 객체에 병합됩니다. 이러한 객체에 충돌하는 키가 있을 경우에는 컴포넌트의 옵션이 우선순위를 갖습니다.

```js
const myMixin = {
  methods: {
    foo() {
      console.log('foo')
    },
    conflicting() {
      console.log('from mixin')
    }
  }
}

const app = Vue.createApp({
  mixins: [myMixin],
  methods: {
    bar() {
      console.log('bar')
    },
    conflicting() {
      console.log('from self')
    }
  }
})

const vm = app.mount('#mixins-basic')

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```

## 전역 믹스인

믹스인을 Vue 어플리케이션에 전역으로 적용할 수도 있습니다.

```js
const app = Vue.createApp({
  myOption: 'hello!'
})

// `myOption` 사용자 정의 옵션을 위한 핸들러 주입
app.mixin({
  created() {
    const myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

app.mount('#mixins-global') // => "hello!"
```

사용에 주의하세요! 믹스인을 전역으로 적용하면, 이후에 해당 어플리케이션에서 만드는 자식 컴포넌트와 같은 **모든** 컴포넌트 인스턴스에 영향을 끼칩니다.

```js
const app = Vue.createApp({
  myOption: 'hello!'
})

// `myOption` 사용자 정의 옵션을 위한 핸들러 주입
app.mixin({
  created() {
    const myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

// `myOption`을 자식 컴포넌트에도 삽입
app.component('test-component', {
  myOption: 'hello from component!'
})

app.mount('#mixins-global')

// => "hello!"
// => "hello from component!"
```

대부분의 경우에는 위 예제같이 사용자 정의 옵션 병합 방법에만 이용하는 게 좋습니다. 중복 적용을 피하기 위해 [플러그인](plugins.html)으로 제공하는 것도 좋은 방법입니다.

## 사용자 정의 옵션 병합 방법

사용자 정의 옵션이 병합될 때 기존 값을 덮어쓰는 기본 방법을 사용합니다. 사용자 정의 로직을 사용해 사용자 정의 옵션을 병합하려면, `app.config.optionMergeStrategies`에 함수에 추가해야 합니다.

```js
const app = Vue.createApp({})

app.config.optionMergeStrategies.customOption = (toVal, fromVal) => {
  // return 병합된 값
}
```

해당 함수는 첫 번째와 두 번째 인자로 각각 부모와 자식 인스턴스에 정의한 옵션의 값을 전달받습니다. 믹스인을 사용할 때 매개변수에 무엇이 있는지 확인해보겠습니다.

```js
const app = Vue.createApp({
  custom: 'hello!'
})

app.config.optionMergeStrategies.custom = (toVal, fromVal) => {
  console.log(fromVal, toVal)
  // => "goodbye!", undefined
  // => "hello", "goodbye!"
  return fromVal || toVal
}

app.mixin({
  custom: 'goodbye!',
  created() {
    console.log(this.$options.custom) // => "hello!"
  }
})
```

보시다시피, 콘솔에는 먼저 믹스인에서 `toVal`와 `fromVal`이 출력되고 그 다음 `app`에서 출력됩니다. `fromVal`는 존재한다면 항상 반환되는데, 그래서 `this.$options.custom`가 마지막으로 `hello!`설정되는 것입니다. 이번에는 *항상 자식 인스턴스의 값을 반환*하는 방법으로 변경해봅시다.

```js
const app = Vue.createApp({
  custom: 'hello!'
})

app.config.optionMergeStrategies.custom = (toVal, fromVal) => toVal || fromVal

app.mixin({
  custom: 'goodbye!',
  created() {
    console.log(this.$options.custom) // => "goodbye!"
  }
})
```

## 지침

Vue 2에서는 믹스인은 컴포넌트 로직을 재사용할 수 있게 만드는 주 도구였습니다. 하지만, 몇 가지 문제가 있었습니다.

- 믹스인은 충돌이 잘 발생했습니다. 각 기능의 속성이 같은 컴포넌트에 병합되었기 때문에, 속성 이름 충돌을 피하고 디버깅을 하기 위해 다른 모든 기능에 대해 알아야 했습니다.

- 재사용성이 제한됐었습니다. 논리를 변경하기 위해 매개 변수를 믹스 인에 전달할 수 없으므로 논리를 추상화할 때 유연성이 떨어졌습니다.

이 문제를 해결하기 위해서 우리는 논리적인 우려를 바탕으로 코드를 정리하는 새로운 방법인 [Composition API](composition-api-introduction.html)를 추가했습니다.
