# 상태 트랜지션

Vue의 트랜지션 시스템은 진입, 진출 및 목록을 애니메이션으로 만드는 많은 간단한 방법을 제공하지만 데이터 자체에 대한 애니메이션은 어떻게 해야할까요?

- 숫자와 계산
- 색 표시
- SVG노드 위치
- 엘리먼트들의 크기 및 기타 속성

이들 모두는 이미 원시 숫자로 저장되었거나, 숫자로 변환 될 수 있습니다. 그렇게 하면, Vue의 반응형 및 컴포넌트 시스템을 결합하여, 상태변화를 써드파티 라이브러리를 사용해 트윈 상태로 애니메이션화 할 수 있습니다.

## Watchers를 이용한 상태 애니메이션

Watchers는 아무런 숫자 타입에서 다른 타입으로의 변화를 애니메이션화 하는 것을 허용합니다. 처음에는 꽤 복잡해 보일 수 있으니 [GreenSock](https://greensock.com/) 예제를 사용하여 살펴 보겠습니다.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js"></script>

<div id="animated-number-demo">
  <input v-model.number="number" type="number" step="20" />
  <p>{{ animatedNumber }}</p>
</div>
```

```js
const Demo = {
  data() {
    return {
      number: 0,
      tweenedNumber: 0
    }
  },
  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(0)
    }
  },
  watch: {
    number(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue })
    }
  }
}

Vue.createApp(Demo).mount('#animated-number-demo')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="22903bc3b53eb5b7817378ecb985ce96" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Transitioning State 1">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/22903bc3b53eb5b7817378ecb985ce96">   Transitioning State 1</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

숫자를 변경할 때, input 아래에 변경되는 애니메이션이 보여집니다.

## 동적 상태 트랜지션

Vue의 트랜지션 컴포넌트와 마찬가지로 데이터 백업 상태 트랜지션을 실시간으로 업데이트 할 수 있으므로 프로토 타이핑에 특히 유용합니다! 간단한 SVG 폴리곤을 사용해도, 변수를 조금씩 사용하기 전까지는 생각하기 어려운 많은 효과를 얻을 수 있습니다.

<p class="codepen" data-height="500" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="a8e00648d4df6baa1b19fb6c31c8d17e" data-preview="true" style="height: 493px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Updating SVG">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/a8e00648d4df6baa1b19fb6c31c8d17e">   Updating SVG</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

## 컴포넌트를 이용한 트랜지션 구성

여러 상태 트랜지션을 관리하면 Vue 인스턴스 또는 컴포넌트의 복잡성을 빠르게 높일 수 있습니다. 다행히도 많은 애니메이션을 전용 하위 컴포넌트로 추출 할 수 있습니다. 이전 예제의 숫자를 이용하는 애니메이션을 사용해 보겠습니다.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js"></script>

<div id="app">
  <input v-model.number="firstNumber" type="number" step="20" /> +
  <input v-model.number="secondNumber" type="number" step="20" /> = {{ result }}
  <p>
    <animated-integer :value="firstNumber"></animated-integer> +
    <animated-integer :value="secondNumber"></animated-integer> =
    <animated-integer :value="result"></animated-integer>
  </p>
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      firstNumber: 20,
      secondNumber: 40
    }
  },
  computed: {
    result() {
      return this.firstNumber + this.secondNumber
    }
  }
})

app.component('animated-integer', {
  template: '<span>{{ fullValue }}</span>',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tweeningValue: 0
    }
  },
  computed: {
    fullValue() {
      return Math.floor(this.tweeningValue)
    }
  },
  methods: {
    tween(newValue, oldValue) {
      gsap.to(this.$data, {
        duration: 0.5,
        tweeningValue: newValue,
        ease: 'sine'
      })
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.tween(newValue, oldValue)
    }
  },
  mounted() {
    this.tween(this.value, 0)
  }
})

app.mount('#app')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="e9ef8ac7e32e0d0337e03d20949b4d17" data-preview="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="State Transition Components">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/e9ef8ac7e32e0d0337e03d20949b4d17">   State Transition Components</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

이제 자식 컴포넌트들과 함께 다양한 상태를 구성 할 수 있습니다. Vue의 [기본 제공 트랜지션 시스템](transitions.html)에서 제공하는 트랜지션 방법과 함께 이 페이지에서 다룬 트랜지션 방법을 조합하여 사용 할 수 있습니다. 두 방법을 함께 사용하는 것에는 거의 제한사항이 없습니다.

데이터 시각화, 물리 효과, 캐릭터 애니메이션 및 상호작용에 어떻게 무궁무진 하게 사용 할 수 있는지 알 수 있습니다.

## 디자인에 생명을 불어넣기

애니메이션을 추가하는 것은 생명을 불어 넣는 일 입니다. 불행하게도 디자이너가 만든 아이콘, 로고 및 마스코트들은 이미지나 정적 SVG입니다. 그래서 Github의 octocat, Twitter의 새 및 기타 로고들은 살아있는 것들과 유사하지만 살아 움직이지는 못합니다.

Vue가 도와줄 수 있습니다. SVG는 단순한 데이터일 뿐이므로 놀라거나, 생각할 때, 경고할때 어떻게 할 지 예시가 필요합니다. 그 다음 Vue는 데이터들을 트랜지션하여 환영페이지, 로딩 표시기, 알림을 감정적이고 매력적으로 만들 수 있습니다.

Sarah Drasner는 타이밍과 인터랙션 중심의 상태 변화를 조합하여 아래의 데모를 만들었습니다.

<p data-height="400" data-theme-id="light" data-slug-hash="YZBGNp" data-default-tab="result" data-user="sdras" data-embed-version="2" data-pen-title="Vue-controlled Wall-E" class="codepen">See the Pen <a href="https://codepen.io/sdras/pen/YZBGNp/">Vue-controlled Wall-E</a> by Sarah Drasner (<a href="https://codepen.io/sdras">@sdras</a>) on <a href="https://codepen.io">CodePen</a>.</p> <script async="" src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
