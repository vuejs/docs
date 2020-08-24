# 개요

Vue는 특히 변화에 대응하여 트랜지션 및 애니메이션 작업에 도움되는 몇 가지 추상화를 제공합니다. 추상화 중 일부는 다음과 같습니다.

- 내장 되어 있는 `<transition>` 컴포넌트를 사용하여 DOM에 진입/진출 되는 JS 및 CSS 컴포넌트에 대한 훅(Hooks)
- 트랜지션 중에 순서를 조정할 수 있게 하는 트랜지션 모드
- `<transition-group>` 컴포넌트 엘리먼트를 사용하여 성능을 높이기 위해 내부적으로 적용된 FLIP 기술과 함께 여러 엘리먼트가 바로 업데이트되는 경우의 훅(Hooks).
- `watchers`를 사용하여 애플리케이션에서의 다른 트랜지션 상태

이 가이드의 다음 3가지 섹션에서 모든 내용을 다룰 것 입니다. 유용한 API 제공 뿐만 아니라, 앞서 살펴본 클래스 및 스타일 선언을 사용하여 여러 예제에서 간단하게 애니메이션 및 트랜지션을 적용 할 수 있습니다.

이 다음 섹션에서는 몇 가지 웹 애니메이션 및 트랜지션의 기본 사항을 살펴보고 좀 더 알아보기 위해 몇 가지 리소스에 연결해야 합니다. 웹 애니메이션에 이미 익숙하고, 웹 애니메이션 원리가 Vue의 일부 원리와 어떻게 작동하는지 알고 있다면이 다음 섹션을 건너 뛰어도됩니다. 깊게 알아보기 전에 웹 애니메이션 기본 사항에 대해 조금더 알고 싶은 사람은 계속 살펴봐도 됩니다.

## 클래스 기반 애니메이션 / 트랜지션

`<transition>`컴포넌트는 다른 컴포넌트들의 진입 / 진출에 유용합니다. 조건부 클래스를 추가하여 컴포넌트를 마운트(mounting) 하지 않고 애니메이션을 할성화 할 수 있습니다.

```html
<div id="demo">
  하지 말아야 할 일을 하려면 버튼을 눌러주세요<br />

  <div :class="{ shake: noActivated }">
    <button @click="noActivated = true">눌러주세요</button>
    <span v-if="noActivated">이런</span>
  </div>
</div>
```

```css
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
```

```js
const Demo = {
  data() {
    return {
      noActivated: false
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="css,result" data-user="Vue" data-slug-hash="ff45b91caf7a98c8c9077ad8ab539260" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Create animation with a class">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/ff45b91caf7a98c8c9077ad8ab539260">   Create animation with a class</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

# 스타일 바인딩과 트랜지션

일부 트랜지션 효과는 인터렉션(interaction)이 발생하는 동안 엘리먼트에 스타일을 바인딩하는 것과 같이 값을 보간(interpolating)하여 적용 할 수 있습니다. 예를 들면 다음과 같습니다.

```html
<div id="demo">
  <div
    @mousemove="xCoordinate"
    :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
    class="movearea"
  >
    <h3>화면에서 마우스를 이동시켜보세요...</h3>
    <p>x: {{x}}</p>
  </div>
</div>
```

```css
.movearea {
  transition: 0.2s background-color ease;
}
```

```js
const Demo = {
  data() {
    return {
      x: 0
    }
  },
  methods: {
    xCoordinate(e) {
      this.x = e.clientX
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="JjGezQY" data-preview="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Interpolation with style bindings">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/JjGezQY">   Interpolation with style bindings</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

이 예제에서는 마우스 움직임에 포함 된 보간법(interpolation)을 사용하여 애니메이션을 만듭니다. CSS 트랜지션은 엘리먼트에도 적용되어 엘리먼트가 업데이트하는 동안 사용할 easing의 종류를 알 수 있습니다.

## 퍼포먼스(performance)

위에 표시된 애니메이션은 `transforms`과 같은 것을 사용하고, `perspective` 같은 독특한 프로퍼티를 적용했습니다. 왜 `margin` 과 `top` 같은 프로퍼티 대신 사용한걸 까요?

퍼포먼스를 알고 있음으로써 웹에서 매우 부드러운 애니메이션을 만들 수 있습니다. 가능한 경우 엘리먼트가 하드웨어 가속을 할 수 있게 합니다. 그리고 repaints를 트리거 하지 않는 프로퍼티을 사용합니다. 이 작업을 수행 할 수 있는 몇가지 방법을 알아 보겠습니다.

### Transform과 Opacity

[CSS-Triggers](https://csstriggers.com/)와 같은 리소스를 확인하여 애니메이션을 적용하면 어떤 프로퍼티가 repaints를 트리거 하는지 확인 할 수 있습니다. 여기에서 `transform` 아래를 보면 다음과 같이 표시 됩니다.

> transform을 변경해도 geometry가 변경 되거나, painting이 트리거 되지 않기 때문에 문제가 없습니다. 이것은 GPU의 도움으로 컴포지터(compositor) 스레드에서 작업을 수행 할 수 있음을 의미합니다.

Opacity는 비슷하게 동작하기 때문에 웹 동작에 좋은 선택지가 될 수 있습니다.

### 하드웨어 가속

`perspective`, `backface-visibility`,`transform: translateZ(x)` 같은 프로퍼티들을 사용하면 브라우저에서 하드웨어 가속이 필요한지 알 수 있습니다.

엘리먼트의 하드웨어 가속을 원하는 경우 다음 프로퍼티 중 하나를 적용 할 수 있습니다 (모두 필요한 것은 아니며 하나만).

```css
perspective: 1000px;
backface-visibility: hidden;
transform: translateZ(0);
```

GreenSock과 같은 많은 JS 라이브러리는 기본적으로 하드웨어 가속을 원한다고 가정하고 적용하므로 수동으로 설정할 필요가 없습니다.

## 타이밍(Timing)

단순한 UI 트랜지션의 경우(중간에 다른 상태가 없고, 시작 상태와 끝 상태만 있는 경우) 0.1s 에서 0.4s 사이의 타이밍을 사용하는 것이 일반적이고, 대부분의 사람들은 0.25s가 최적의 타이밍 이라고 생각합니다. 이 타이밍(0.25s)을 모든 트랜지션에 사용 할 수 있을까요? 아닙니다. 더 많은 위치를 이동해야 하거나, 더 많은 단계 또는 상태 변경이 필요한 경우가 있는 경우 0.25s는 최적의 타이밍이 아닐 수 있습니다. 이런 경우 더 계획적 이여야 하며 타이밍은 더 유니크 해야 합니다. 그렇다고 해서 애플리케이션 내에서 반복되어지는 타이밍 기본값을 가질 수 없는 것은 아닙니다.

또한 진입이 진출보다 약간 더 많은 시간을 가진다면 보기에 더 좋아 보일 수 있습니다. 사용자는 일반적으로 트랜지션 진입 시 가이드(guided) 받고, 도중에 떠나고 싶어 하기 때문에 진출 까지 기다리지 못 할 수 있습니다.

## Easing

Easing은 애니메이션에서 깊이를 전달하는 중요한 방법입니다. 애니메이션을 처음 접하는 사람들이 저지르는 가장 일반적인 실수 중 하나는 진입 시`ease-in`을 사용하고 진출 시`ease-out`을 사용 하는 것 입니다. 사실 이것들은 서로 반대로 필요합니다.

이러한 상태를 트랜지션에 적용하면 다음과 같이 표시 됩니다.

```css
.button {
  background: #1b8f5a;
  /* 초기 상태에 적용, 트랜지션은 반환 상태에 적용 됩니다. */
  transition: background 0.25s ease-in;
}

.button:hover {
  background: #3eaf7c;
  /* 호버 상태에 적용, 호버가 트리거 될 때 트랜지션이 적용 됩니다. */
  transition: background 0.35s ease-out;
}
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="css,result" data-user="Vue" data-slug-hash="996a9665131e7902327d350ca8a655ac" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Transition Ease Example">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/996a9665131e7902327d350ca8a655ac">   Transition Ease Example</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

Easing은 애니메이션되는 머티리얼(material)의 질감을 전달 할 수 있습니다. 아래의 예제에서, 어떤 공이 딱딱하고 어떤 공이 부드럽다고 느끼시나요?

<p class="codepen" data-height="500" data-theme-id="39028" data-default-tab="result" data-user="sdras" data-slug-hash="zxJWBJ" data-preview="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Bouncing Ball Demo">   <span>See the Pen <a href="https://codepen.io/sdras/pen/zxJWBJ">   Bouncing Ball Demo</a> by Sarah Drasner (<a href="https://codepen.io/sdras">@sdras</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

easing을 조정하여 많은 유니크한 효과를 얻고 애니메이션을 세련되게 만들 수 있습니다. CSS를 사용하면 cubic bezier 속성을 조정하여 수정 할 수 있습니다. Lea Verou의 [this playground](https://cubic-bezier.com/#.17,.67,.83,.67)에서 확인 할 수 있습니다.

cubic-bezier ease가 제공하는 두 개의 핸들을 사용하여 간단한 애니메이션에 큰 효과를 얻을 수 있습니다. 그러나 JavaScript는 다중 핸들을 허용하기 때문에 훨씬 더 많은 차이가 있습니다.

![Ease Comparison](/images/css-vs-js-ease.svg)

bounce를 예로 들어 보겠습니다. CSS에서는 각 키 프레임을 위 아래로 선언해야 합니다. JavaScript에서는 [GreenSock API (GSAP)](https://greensock.com/)에서 `bounce`를 선언하여 모든 움직임을 쉽게 표현 할 수 있습니다(JS 라이브러리 마다 다른 유형의 기본값이 있습니다).

다음은 CSS에서 bounce에 사용 되는 코드입니다.(animate.css의 예)

```css
@keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0) scaleY(3);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0) scaleY(0.9);
  }

  75% {
    transform: translate3d(0, -10px, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, 5px, 0) scaleY(0.985);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.bounceInDown {
  animation-name: bounceInDown;
}
```

다음은 GreenSock을 사용한 JS에서 사용되는 bounce 입니다.

```js
gsap.from(element, { duration: 1, ease: 'bounce.out', y: -500 })
```

다음 섹션의 일부 예제에서 GreenSock을 사용할 것입니다. 멋진 ease를 구축하는 데 도움이 되는 훌륭한 [ease 시각화 도구](https://greensock.com/ease-visualizer)가 있습니다.

## 추가 읽을거리

- [인터페이스 애니메이션 디자인: 애니메이션을 통한 사용자 경험 향상 by Val Head](https://www.amazon.com/dp/B01J4NKSZA/)
- [Rachel Nabors의 애니메이션 작업](https://abookapart.com/products/animation-at-work)
