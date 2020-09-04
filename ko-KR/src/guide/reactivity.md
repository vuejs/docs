# 깊은 반응성

이제 심층 분석을 할 시간입니다! Vue의 가장 뚜렷한 기능 중 하나는 눈에 잘 띄지 않는 반응성 시스템입니다. Model은 proxy된 JavaScript 객체입니다. 객체를 수정하면 화면(view)이 업데이트됩니다. 반응성 시스템은 상태관리를 간단하고 직관적으로 만듭니다. 하지만, 일반적인 문제를 피하기 위해 어떻게 작동하는지 이해하는 것도 중요합니다. 이 섹션에서는, Vue의 반응성 시스템에 대한 낮은 수준의 세부정보 중 일부를 파헤질 것입니다.

## 반응성이란?

이 용어는 요즘 프로그래밍에서 꽤 많이 등장합니다만, 사람들이 말하는 반응성이란 무엇일까요? 반응성은 선언적 방식으로 변화에 적응할 수 있는 프로그래밍 패러다임입니다. 일반적으로 보여줄 수 있는 예는 Excel 스프레드 시트입니다.

```html
<video width="550" height="400" controls>
  <source src="/images/reactivity-spreadsheet.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

첫 번째 셀에 숫자 2를, 두 번째 셀에 숫자 3을 입력하고 SUM을 요청하면, 스프레드시트가 결과를 제공합니다. 놀라울게 없습니다. 그러나 첫 번째 숫자를 변경하면, SUM 결과 값도 자동으로 변경됩니다.

JavaScript는 일반적으로 이와 같이 작동하지 않지만, 비슷한 것을 작성해보겠습니다:

```js
var val1 = 2
var val2 = 3
var sum = val1 + val2

// sum
// 5

val1 = 3

// sum
// 5
```

첫번째 값(val1)을 변경해도 sum 값이 변경되지 않습니다.

그렇다면 JavaScript에서 어떻게 해야할까요?

- 값 중 하나에 변화가 있을 때 감지합니다.
- 값을 변경하는 펑션을 추적합니다.
- 최종 값을 변경할 수 있도록 펑션을 트리거합니다.

## Vue가 이러한 변경 사항을 추적하는 방법

일반 JavaScript 객체를 `data`옵션으로 어플리케이션이나 컴포넌트 인스턴스에 전달할 때, Vue는 모든 속성을 살펴보고, getter와 setter가 있는 핸들러를 사용하여 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)로 변환합니다. Proxy는 ES6 전용 기능이지만, IE 브라우저를 지원하기 위해, 이전의 `Object.defineProperty`(Vue2의 반응성 방식)를 사용하는 Vue3 버전을 제공합니다. 둘 다 동일한 API를 가지고 있지만, Proxy 버전은 더 가볍고 향상된 성능을 제공합니다.

<div class="reactivecontent">   <iframe height="500" style="width: 100%;" scrolling="no" title="Proxies and Vue's Reactivity Explained Visually" src="https://codepen.io/sdras/embed/zYYzjBg?height=500&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
    See the Pen <a href="https://codepen.io/sdras/pen/zYYzjBg">Proxies and Vue's Reactivity Explained Visually</a> by Sarah Drasner
    (<a href="https://codepen.io/sdras">@sdras</a>) on <a href="https://codepen.io">CodePen</a>.
  </iframe> </div>

위의 예시는 다소 빠르고, 해당 내용을 이해하려면 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)에 대한 약간의 지식이 필요합니다. 그럼 잠깐 들어가 보겠습니다. Proxy에 대한 많은 문헌이 있지만, 실제로 알아야할 것은 **Proxy는 다른 객체나 함수를 감싸는 객체이며, 원본으로의 호출을 가로채서 처리할 수 있게 합니다.**

다음과 같이 사용합니다: `new Proxy(target, handler)`

```js
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, prop) {
    return target[prop]
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// tacos
```

좋습니다. 지금까지 그 객체를 감싸고 반환하겠습니다. 멋지지만, 아직은 유용하지 않습니다. 그러나, Proxy 안에서 감싸는 동안 동작을 가로챌 수 있습니다. 이 가로채는 행위(intercept)를 trap이라고 부릅니다.

```js
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, prop) {
    console.log(‘intercepted!’)
    return target[prop]
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// intercepted!
// tacos
```

콘솔 로그(console.log) 말고도 우리가 원하는 것은 무엇이든 할 수 있습니다. 필요한 경우 실제 값(real value)을 반환하지 *않습니다.* 이것이 API 생성에 있어 Proxy를 매우 강력하게 만드는 이유입니다.

또한 Proxy가 제공하는 또다른 기능이 있습니다. `target[prop]`과 같은 값을 반환하는 대신에 적절한 `this`바인딩을 수행할 수 있는 `Reflect` 기능을 사용하여 한 단계 더 나아갈 수 있습니다. 다음 예제를 확인해보세요:

```js{7}
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, prop, receiver) {
    return Reflect.get(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// intercepted!
// tacos
```

앞서 언급한 바에 따르면 무언가 변경될 때 최종 값을 업데이트하는 API를 사용하려면, 무언가 변경될 때 새로운 값을 설정해야합니다. 핸들러(`track`이라는 펑션)에서 작업을 수행합니다. 여기서 `target`과 `key`를 전달합니다.

```js{7}
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, prop, receiver) {
    track(target, prop)
    return Reflect.get(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// intercepted!
// tacos
```

마지막으로, 무언가 변경될 때 새로운 값을 설정합니다. 이를 위해, 변경사항을 트리거하여 새 proxy에 대한 변경사항을 설정합니다.

```js
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, prop, receiver) {
    track(target, prop)
    return Reflect.get(...arguments)
  },
  set(target, key, value, receiver) {
    trigger(target, key)
    return Reflect.set(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// intercepted!
// tacos
```

몇 단락 전의 이 목록을 기억하십니까? 이제 Vue가 이러한 변경 사항을 처리하는 방법에 대한 답변이 있습니다:

- <strike>다음 값 중 하나에 변화가 있는지 감지합니다</strike>: Proxy가 이를 가로챌 수 있도록 허용하므로, 더 이상이 작업을 수행할 필요가 없습니다.
- **변경하는 함수 추적하기**(현재 effect를 track합니다): proxy 내 getter에서 이 `effect`라 불리우는 작업을 수행합니다.<br>([역주] Get 속성에서는 현재의 effect를 track합니다.)
- **최종 값을 업데이트할 수 있도록 함수를 트리거합니다**: proxy 내 setter에서 `trigger`라 불리우는 작업을 수행합니다.<br>([역주] Set 속성에서는 이 속성에서 추적되고있는 종속성 즉, effect들을 trigger합니다.)

proxy된 객체는 사용자에게는 보이지 않지만, 내부적으로 속성들에 접근하거나 수정할 때 Vue에서 종속성-추적 및 변경-알림을 수행할 수 있습니다. Vue3에서는 [separate package](https://github.com/vuejs/vue-next/tree/master/packages/reactivity)에서 반응성을 사용할 수 있습니다. 한가지 주의해야할 점은 변환된 데이터 객체가 로깅될 때 브라우저 콘솔이 다르게 지정된다는 것입니다. 따라서, 더 검사하기 쉬운 인터페이스를 위해서 [vue-devtools](https://github.com/vuejs/vue-devtools)를 설치하는 것이 좋습니다.

### Proxy된 객체

Vue는 반응형으로 만들어진 모든 객체를 내부적으로 추적하므로, 항상 동일한 객체에 대해 동일한 proxy를 반환합니다.

반응형 프록시에서 중접된 객체에 접근하면, 해당 객체도 *또한* 반환되기 전에 프록시로 변환됩니다.

```js
const handler = {
  get(target, prop, receiver) {
    track(target, prop)
    const value = Reflect.get(...arguments)
    if (isObject(value)) {
      return reactive(value)
    } else {
      return value
    }
  }
  // ...
}
```

### Proxy vs. original identity

Proxy를 사용하면 다음 사항에 유의해야할 새로운 주의사항이 있습니다: proxy된 객체는 identity 비교(`===`)측면에서 원래의 객체와 동일하지 않습니다. 예를들면:

```js
const obj = {}
const wrapped = new Proxy(obj, handlers)

console.log(obj === wrapped) // false
```

원본 버전과 래핑(wrap)된 버전은 대부분의 경우 동일하게 작동하지만, 강력한 identity comparisions에 의존하는 `.filter()` or `.map()`같은 작업은 실패할 것입니다. 모든 반응형 상태가 `this`에서 접근되고, 이미 Proxy임을 보장하기 때문에, 옵션 API를 사용할 때는 이 경고가 나타나지 않을 것입니다.

그러나 Composition API를 사용하여 반응성 객체를 명시적으로 만들 때 가장 좋은 방법은 원래 원시 객체에 대한 참조를 가지지 않고 반응형 버전으로만 작업하는 것입니다:

```js
const obj = reactive({
  count: 0
}) // no reference to original
```

## 감시자(Watchers)

모든 컴포넌트 인스턴스는 해당 감시자 인스턴스가 있으며, 이는 컴포넌트가 종속적으로 렌더링되는 동안 "영향을 받은(touched)" 모든 속성을 기록합니다. 나중에 종속성의 setter가 트리거되면, 감시자에게 알리고 컴포넌트는 다시 렌더링됩니다.

<div class="reactivecontent">   <iframe height="500" style="width: 100%;" scrolling="no" title="Second Reactivity with Proxies in Vue 3 Explainer" src="https://codepen.io/sdras/embed/GRJZddR?height=500&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
    See the Pen <a href="https://codepen.io/sdras/pen/GRJZddR">Second Reactivity with Proxies in Vue 3 Explainer</a> by Sarah Drasner
    (<a href="https://codepen.io/sdras">@sdras</a>) on <a href="https://codepen.io">CodePen</a>.
  </iframe> </div>

객체를 컴포넌트 인스턴스에 data(option)로 전달하면, Vue는 이것을 proxy로 변환합니다. 이 proxy를 사용하면, Vue가 속성에 접근하거나 수정할 때 종속성 추적 및 변경 알림을 수행할 수 있습니다. 각 속성은 종속성으로 간주됩니다.

첫번째 렌더링 이후, 컴포넌트는 종속성 목록(렌더링 중에 접근한 속성들)을 추적했을 것입니다. 반대로, 컴포넌트는 이러한 각 속성들에 대한 구독자(subscriber)가 됩니다. proxy가 set operation을 가로채면, 속성은 구독된 모든 컴포넌트에 다시 렌더링하도록 알립니다.

> Vue 2.x 이하를 사용하는 경우 해당 버전에 존재하는 변경 감지 주의사항 중 일부에 관심이 있을 수 있습니다. [여기에서 자세히 살펴보겠습니다](change-detection.md).
