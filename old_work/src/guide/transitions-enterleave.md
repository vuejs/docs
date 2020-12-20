# 진입 / 진출 트랜지션

Vue는 항목이 DOM에 삽입, 갱신 또는 제거 될 때 트랜지션 효과를 적용하는 다양한 방법을 제공합니다. 여기에는 다음과 같은 도구가 포함됩니다.

- CSS 트랜지션 및 애니메이션을 위한 클래스를 자동으로 적용합니다.
- [Animate.css](https://animate.style/)와 같은 써드파티 CSS 애니메이션 라이브러리 통합
- 트랜지션 훅 중에 JavaScript를 사용하여 DOM을 직접 조작
- JavaScript 써드파티 애니메이션 라이브러리 통합

이 페이지에서는 진입, 진출 및 목록 트랜지션만 다루지만 다음 섹션에서는 [트랜지션 상태 관리](transitions-state.html)를 볼 수 있습니다.

## 단일 엘리먼트 / 컴포넌트 트랜지션

Vue는 `트랜지션`을 감싸는 컴포넌트를 제공하므로 다음과 같은 상황에서 모든 엘리먼트 또는 컴포넌트에 대한 진입 / 진출 트랜지션을 추가 할 수 있습니다.

- 조건부 랜더링 (`v-if` 사용)
- 조건부 출력 (`v-show` 사용)
- 동적 컴포넌트
- 컴포넌트 루트 노드

간단한 예제를 살펴보겠습니다.

```html
<div id="demo">
  <button @click="show = !show">
    Toggle
  </button>

  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```js
const Demo = {
  data() {
    return {
      show: true
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="3466d06fb252a53c5bc0a0edb0f1588a" data-preview="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Simple Transition Component">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/3466d06fb252a53c5bc0a0edb0f1588a">   Simple Transition Component</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

`transition` 컴포넌트로 싸여진 엘리먼트가 삽입되거나 제거 될 때 발생합니다.

1. Vue는 대상 엘리먼트에 CSS 트랜지션 또는 애니메이션이 적용되었는지 여부를 자동으로 감지합니다. 그렇다면 CSS 트랜지션 클래스가 적절한 타이밍에 추가 / 제거됩니다.

2. 트랜지션 컴포넌가 [JavaScript 훅](#javascript-hooks)를 제공하면, 훅은 적절한 타이밍에 호출됩니다.

3. CSS 트랜지션 / 애니메이션이 감지되지 않고 JavaScript 훅이 제공 되지 않으면 삽입 또는 제거를 위한 DOM 작업이 다음 프레임에서 즉시 실행됩니다  (참고: 이는 Vue의 `nextTick` 개념과는 다른 브라우저 애니메이션 프레임입니다).

### 트랜지션 클래스

진입 / 진출 트랜지션에는 6가지 클래스가 적용 됩니다.

1. `v-enter-from`: enter의 시작 상태. 엘리먼트가 삽입되기 전에 적용되고 한 프레임 후에 제거됩니다.

2. `v-enter-active`: enter의 활성 상태. 전체 진입 단계 동안 적용됩니다. 엘리먼트가 삽입되기 전에 적용됩니다. 트랜지션 / 애니메이션이 완료되면 제거됩니다. 이 클래스는 진입 트랜지션에서 duration, delay, easing curve를 정의 하는데 사용 될 수 있습니다.

3. `v-enter-to`: **2.1.8 이상 버전에서 지원합니다.**진입 상태의 끝에서 실행됩니다. 엘리먼트가 삽입된 후(동시에`v-enter-from` 가 제거됨) 트랜지션/애니메이션이 끝나면 제거되는 하나의 프레임을 추가했습니다.

4. `v-leave-from`: leave를 위한 시작 상태. 진출 트랜지션이 트리거 될 때 적용되고 한 프레임 후에 제거됩니다.

5. `v-leave-active`: leave의 활성 상태. 전체 진출 상태에서 적용됩니다. 진출 트랜지션이 트리거되면 적용되고 트랜지션 / 애니메이션이 완료되면 제거됩니다. 이 클래스는 진출 트랜지션에서 duration, delay, easing curve를 정의 하는데 사용 될 수 있습니다.

6. `v-leave-to`: **2.1.8 이상 버전에서 지원합니다.** 진출 상태 끝에서 실행됩니다. 진출 트랜지션이 트리거되고  (동시에 `v-leave-from` 가 제거됨) 트랜지션 / 애니메이션이 끝나면 제거되는 하나의 프레임을 추가 했습니다.

![Transition Diagram](/images/transition.png)

각 클래스에는 트랜지션 이름이 접두어로 붙습니다. 여기서 `v-` 접두어는 이름없이 `<transition>` 를 사용할 때의 기본 값 입니다. 예를 들어 `<transition name="my-transition">` 을 사용하면, `v-enter-from` 클래스는 `my-transition-enter-from` 클래스로 대체됩니다.

`v-enter-active` 와 `v-leave-active` 는 진입 / 진출 트랜지션을 위한 다른 easing curves를 지정할 수 있는 기능을 제공합니다. 다음 섹션에서 예제를 확인 할 수 있습니다.

### CSS 트랜지션

가장 일반적인 트랜지션 유형 중 하나는 CSS 트랜지션을 사용합니다. 다음은 간단한 예제 입니다.

```html
<div id="demo">
  <button @click="show = !show">
    Toggle render
  </button>

  <transition name="slide-fade">
    <p v-if="show">안녕</p>
  </transition>
</div>
```

```js
const Demo = {
  data() {
    return {
      show: true
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

```css
/* 진입/진출 애니메이션은 다른 durantion 및 */
/* 타이밍 기능을 사용 할 수 있습니다.   */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```

<p class="codepen" data-height="300" data-theme-id="39028" data-preview="true" data-default-tab="css,result" data-user="Vue" data-slug-hash="0dfa7869450ef43d6f7bd99022bc53e2" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Different Enter and Leave Transitions">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/0dfa7869450ef43d6f7bd99022bc53e2">   Different Enter and Leave Transitions</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

### CSS 애니메이션

CSS 애니메이션은 CSS 트랜지션과 같은 방식으로 적용됩니다.  차이점은 엘리먼트가 삽입 된 직후에 `v-enter-from`가 즉시 제거되지 않지만`animationend` 이벤트에 있습니다.

다음은 간결함을 위해 접두사가 붙은 CSS 규칙을 생략 한 예입니다.

```html
<div id="example-2">
  <button @click="show = !show">Toggle show</button>
  <transition name="bounce">
    <p v-if="show">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis
      enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi
      tristique senectus et netus.
    </p>
  </transition>
</div>
```

```js
const Demo = {
  data() {
    return {
      show: true
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```

<p class="codepen" data-height="300" data-theme-id="39028" data-preview="true" data-default-tab="html,result" data-user="Vue" data-slug-hash="8627c50c5514752acd73d19f5e33a781" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS Animation Transition Example">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/8627c50c5514752acd73d19f5e33a781">   CSS Animation Transition Example</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

### 사용자 지정 트랜지션 클래스

다음 속성을 제공하여 사용자 정의 트랜지션 클래스를 지정할 수도 있습니다.

- `enter-from-class`
- `enter-active-class`
- ``enter-to-class` (2.1.8+)`
- `leave-from-class`
- `leave-active-class`
- ``leave-to-class` (2.1.8+)`

이것들은 원본 클래스 명을 오버라이드 합니다. 이는 Vue의 트랜지션 시스템을 [Animate.css](https://daneden.github.io/animate.css/)와 같은 기존 CSS 애니메이션 라이브러리와 결합하려는 경우 특히 유용합니다.

예제 입니다.

```html
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.0/animate.min.css"
  rel="stylesheet"
  type="text/css"
/>

<div id="demo">
  <button @click="show = !show">
    Toggle render
  </button>

  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__bounceOutRight"
  >
    <p v-if="show">안녕</p>
  </transition>
</div>
```

```js
const Demo = {
  data() {
    return {
      show: true
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

### 트랜지션과 애니메이션을 함께 사용하기

Vue는 트랜지션이 종료 된 시점을 알기 위해 이벤트 리스너를 연결해야합니다. 적용된 CSS 규칙의 유형에 따라 `transitionend`또는 `animationend` 가 될 수 있습니다. 둘 중 하나만 사용하는 경우 Vue는 올바른 유형을 자동으로 감지 할 수 있습니다.

그러나 어떤 경우에는 같은 엘리먼트 (예: Vue에 의해 트리거 된 CSS 애니메이션)와 함께 호버에 대한 CSS 트랜지션 효과를 둘 다 가질 수도 있습니다. 이러한 경우,`type` 속성에서 Vue가 지켜 볼 타입을 명시적으로 선언해야 합니다. 값은 `animation` 또는 `transition` 입니다.

### 명시적 트랜지션 지속 시간

<!-- TODO: validate and provide an example -->

대부분의 경우 Vue는 트랜지션이 완료를 자동으로 감지할 수 있습니다. 기본적으로 Vue는 루트 트랜지션 엘리먼트에서 첫 번째 `transitionend` 또는 `animationend`  이벤트를 기다립니다. 그러나 이것은 항상 이상적인 것은 아닙니다. 예를 들어, 중첩 된 내부 엘리먼트가 루트 트랜지션 엘리먼트보다 지연된 트랜지션 또는 더 긴 트랜지션 기간을 갖는 다른 엘리먼트와 함께 진행하는 트랜지션 시퀀스를 가질 수 있습니다.

이 경우, `<transition>`  컴포넌트에 `duration` 속성을 사용하여 명시적인 트랜지션 지속 시간(밀리 초)을 지정할 수 있습니다.

```html
<transition :duration="1000">...</transition>
```

진입과 진출 기간에도 명시적인 값을 지정할 수 있습니다.

```html
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

### JavaScript 훅

속성에서 JavaScript 훅을 정의할 수 있습니다.

```html
<transition
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"
  @enter-cancelled="enterCancelled"
  @before-leave="beforeLeave"
  @leave="leave"
  @after-leave="afterLeave"
  @leave-cancelled="leaveCancelled"
  :css="false"
>
  <!-- ... -->
</transition>
```

```js
// ...
methods: {
  // --------
  // 진입
  // --------

  beforeEnter(el) {
    // ...
  },
  // done 콜백은 CSS와 함께 사용할 때 선택 사항입니다.
  enter(el, done) {
    // ...
    done()
  },
  afterEnter(el) {
    // ...
  },
  enterCancelled(el) {
    // ...
  },

  // --------
  // 진출
  // --------

  beforeLeave(el) {
    // ...
  },
  // done 콜백은 CSS와 함께 사용할 때 선택 사항입니다.
  leave(el, done) {
    // ...
    done()
  },
  afterLeave(el) {
    // ...
  },
  // leaveCancelled은 v-show와 함께 사용됩니다.
  leaveCancelled(el) {
    // ...
  }
}
```

이러한 훅은 CSS 트랜지션 / 애니메이션과 조합하여 사용하거나, 자체적으로 사용 할 수 있습니다.

JavaScript 전용 트랜지션을 하는 경우 **&nbsp;`enter` 및 `leave`  훅에서 `done`  콜백이 필요합니다.** 그렇지 않으면 동기적으로 호출되고 트랜지션 즉시 완료됩니다. Vue가 CSS 탐지를 건너 뛸 수 있도록 JavaScript 전용 트랜지션에  `:css="false"` 를 명시적으로 추가하는 것도 좋은 생각입니다. 이것은 조금 더 효율적일 뿐만 아니라 CSS 규칙이 실수로 트랜지션을 방해하는 것을 방지합니다.

[GreenSock](https://greensock.com/)를 사용하여 JavaScript 트랜지션의 예제를 살펴봅시다.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.4/gsap.min.js"></script>

<div id="demo">
  <button @click="show = !show">
    Toggle
  </button>

  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    :css="false"
  >
    <p v-if="show">
      Demo
    </p>
  </transition>
</div>
```

```js
const Demo = {
  data() {
    return {
      show: false
    }
  },
  methods: {
    beforeEnter(el) {
      gsap.set(el, {
        scaleX: 0.8,
        scaleY: 1.2
      })
    },
    enter(el, done) {
      gsap.to(el, {
        duration: 1,
        scaleX: 1.5,
        scaleY: 0.7,
        opacity: 1,
        x: 150,
        ease: 'elastic.inOut(2.5, 1)',
        onComplete: done
      })
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.7,
        scaleX: 1,
        scaleY: 1,
        x: 300,
        ease: 'elastic.inOut(2.5, 1)'
      })
      gsap.to(el, {
        duration: 0.2,
        delay: 0.5,
        opacity: 0,
        onComplete: done
      })
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-preview="true" data-default-tab="js,result" data-user="Vue" data-slug-hash="68ce1b8c41d0a6e71ff58df80fd85ae5" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="JavaScript Hooks Transition">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/68ce1b8c41d0a6e71ff58df80fd85ae5">   JavaScript Hooks Transition</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

## 최초 렌더링 시 트랜지션

노드의 초기 렌더에 트랜지션을 적용하고 싶다면 `appear` 속성을 추가 할 수 있습니다

```html
<transition appear>
  <!-- ... -->
</transition>
```

## 엘리먼트 간 트랜지션

[컴포넌트 사이의 트랜지션](#transitioning-between-components)에 대해서는 나중에 설명하지만  `v-if`/`v-else`를 사용하여 원본 엘리먼트 사이를 트랜지션 할 수도 있습니다. 가장 일반적인 두 엘리먼트 트랜지션 중 하나는 목록 컨테이너와 빈 목록을 설명하는 메시지 사이에 사용됩니다.

```html
<transition>
  <table v-if="items.length > 0">
    <!-- ... -->
  </table>
  <p v-else>죄송합니다, 아이템을 찾을 수 없습니다.</p>
</transition>
```

`v-if`를 사용하거나 단일 엘리먼트를 동적 속성에 바인딩하여 원하는 만큼의 엘리먼트 간에 트랜지션이 가능합니다. 예를 들어:

<!-- TODO: rewrite example and put in codepen example -->

```html
<transition>
  <button v-if="docState === 'saved'" key="saved">
    Edit
  </button>
  <button v-if="docState === 'edited'" key="edited">
    Save
  </button>
  <button v-if="docState === 'editing'" key="editing">
    Cancel
  </button>
</transition>
```

다음과 같이 쓸 수도 있습니다.

```html
<transition>
  <button :key="docState">
    {{ buttonMessage }}
  </button>
</transition>
```

```js
// ...
computed: {
  buttonMessage() {
    switch (this.docState) {
      case 'saved': return 'Edit'
      case 'edited': return 'Save'
      case 'editing': return 'Cancel'
    }
  }
}
```

### 트랜지션 모드

아직 한 가지 문제가 있습니다. 아래 버튼을 클릭 해보십시오:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="Rwrqzpr" data-preview="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Transition Modes Button Problem">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/Rwrqzpr">   Transition Modes Button Problem</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

“on”버튼과 “off”버튼 사이를 트랜지션 할 때 두 버튼이 렌더링됩니다 - 다른 트랜지션이 진행되는 동안 하나의 트랜지션이 트랜지션됩니다. 이것은 `<transition>`의 기본 동작입니다 - 진입 / 진출이 동시에 발생합니다.

트랜지션 항목이 서로의 위에 절대적으로 배치되는 경우 훌륭하게 작동합니다

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="abdQgLr" data-preview="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Transition Modes Button Problem- positioning">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/abdQgLr">   Transition Modes Button Problem- positioning</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

가끔 동시에 진입 / 진출 되는 것이 필요한 것이 아니거나, 복잡한 진입 / 진출 상태를 조정해야 할 때가 있습니다. 그래서 Vue는 **트랜지션 모드** 라는 유용한 도구를 제공합니다.

- `in-out`: 처음에는 새로운 엘리먼트가 트랜지션되고, 완료되면 현재 엘리먼트가 트랜지션됩니다.
- `out-in`: 현재 엘리먼트가 먼저 트랜지션되고, 완료되면 새로운 요소가 바뀝니다.

::: 팁 `out-in`은 대부분의 경우에 사용 되는 상태 라는 것을 깨닫게 될 것 입니다 :) :::

이제 `out-in` 으로 on/off 버튼의 트랜지션을 업데이트 해 보겠습니다.

```html
<transition name="fade" mode="out-in">
  <!-- ... the buttons ... -->
</transition>
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="ZEQmdvq" data-preview="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Transition Modes Button Problem- solved">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/ZEQmdvq">   Transition Modes Button Problem- solved</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

단순한 속성 추가를 통해 특수 스타일을 추가하지 않고 원래의 트랜지션을 수정했습니다.

이 기능을 사용하여 아래 예제의 카드들 보다 더 다양한 움직임을 만들 수 있습니다. 실제로 진입 / 진출간에 트랜지션되는 두 엘리먼트 이지만, 시작 상태와 끝 상태가 도일하게 크기가 조정 되기 때문에 수평적으로 0이 되어 보입니다. 하나의 fluid한 이동처럼 보일 수 있습니다. 이런 유형의 수정은 현실감 있는 UI microinteractions에 매우 유용할 수 있습니다.

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="76e344bf057bd58b5936bba260b787a8" data-preview="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Transition Modes Flip Cards">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/76e344bf057bd58b5936bba260b787a8">   Transition Modes Flip Cards</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

## 컴포넌트 간 트랜지션

컴포넌트 사이의 트랜지션은 더욱 간단합니다. 우리는 `key` 속성이 필요 없습니다. 대신, 우리는 [동적 컴포넌트](components.html#Dynamic-Components)를 래핑합니다.

```html
<div id="demo">
  <input v-model="view" type="radio" value="v-a" id="a"><label for="a">A</label>
  <input v-model="view" type="radio" value="v-b" id="b"><label for="b">B</label>
  <transition name="component-fade" mode="out-in">
    <component :is="view"></component>
  </transition>
</div>
```

```js
const Demo = {
  data() {
    return {
      view: 'v-a'
    }
  },
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

```css
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="WNwVxZw" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Transitioning between components">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/WNwVxZw">   Transitioning between components</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>
