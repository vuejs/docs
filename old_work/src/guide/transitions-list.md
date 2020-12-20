# 리스트 트랜지션

지금까지 다음과 같은 트랜지션을 다루었습니다.

- 개별 노드들
- 한번에 하나만 렌더링 되는 여러 노드

그렇다면 `v-for`를 사용하여 동시에 렌더링 하고자 하는 항목의 전체 목록이 있는 경우는 어떨까요? 이 경우 우리는 `<transition-group>` 컴포넌트를 사용합니다. 예를 들어보기 전에 이 컴포넌트에 대해 알아야 할 몇 가지 중요한 사항이 있습니다.

- `<transition>`, 과 달리, 실제 요소인 `<span>`을 렌더링합니다. `tag` 속성으로 렌더링 된 요소를 변경할 수 있습니다.
- [트랜지션 모드](/guide/transitions-enterleave#transition-modes)를 사용할 수 없습니다. 더 이상 상호 배타적인 엘리먼트를 번갈아 사용하지 않습니다.
- 내부의 엘리먼트는  고유한 `key` 속성을 **항상 가져야 합니다 **
- CSS 트랜지션 클래스는 그룹 / 컨테이너 자체가 아닌 내부 엘리먼트에 적용됩니다.

### 리스트의 진입 / 진출 트랜지션

이제 이전에 사용한 것과 같은 CSS 클래스를 사용하여 진입 / 진출의 간단한 예제를 살펴 보겠습니다.

```html
<div id="list-demo">
  <button @click="add">추가</button>
  <button @click="remove">삭제</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" :key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>
```

```js
const Demo = {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10
    }
  },
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.items.length)
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove() {
      this.items.splice(this.randomIndex(), 1)
    }
  }
}

Vue.createApp(Demo).mount('#list-demo')
```

```css
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="e1cea580e91d6952eb0ae17bfb7c379d" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Transition List">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/e1cea580e91d6952eb0ae17bfb7c379d">   Transition List</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

이 예제에는 한 가지 문제점이 있습니다. 항목을 추가하거나 제거 할 때 항목이 원활하게 트랜지션되는 대신 새 위치에 즉시 변경됩니다. 나중에 해결할 것입니다.

### 리스트 이동 트랜지션

`<transition-group>` 컴포넌트는 멋진 기능을 제공합니다. 리스트에 항목이 추가 제어될때의  진입과 진출 트랜지션 뿐만이 아니라, 목록상에서 위치가 변경될때에도 트랜지션을 제공합니다. 단지 아이템이 이동할때 사용될 **&nbsp;`v-move`클래스**만  추가하면 됩니다. 다른 클래스와 마찬가지로 접두어는 제공된 `name` 속성 값과 일치하며 `move-class` 속성을 사용하여 클래스를 수동으로 지정할 수도 있습니다.

이 클래스는 다음과 같이 트랜지션 타이밍과 easing curve을 지정하는 데 유용합니다.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js"></script>

<div id="flip-list-demo">
  <button @click="shuffle">셔플</button>
  <transition-group name="flip-list" tag="ul">
    <li v-for="item in items" :key="item">
      {{ item }}
    </li>
  </transition-group>
</div>
```

```js
const Demo = {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  methods: {
    shuffle() {
      this.items = _.shuffle(this.items)
    }
  }
}

Vue.createApp(Demo).mount('#flip-list-demo')
```

```css
.flip-list-move {
  transition: transform 0.8s ease;
}
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="049211673d3c185fde6b6eceb8baebec" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Transition-group example">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/049211673d3c185fde6b6eceb8baebec">   Transition-group example</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

이것은 마술처럼 보일지 모르겠지만 Vue는 [FLIP](https://aerotwist.com/blog/flip-your-animations/)이라는 간단한 애니메이션 기법을 사용하여 변형을 사용하여 이전 위치에서 새로운 위치로 요소를 부드럽게 트랜지션합니다.

이 기술을 이전 구현과 결합하여 가능한 모든 변경 사항을 목록에 적용 할 수 있습니다!

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>

<div id="list-complete-demo" class="demo">
  <button @click="shuffle">셔플</button>
  <button @click="add">추가</button>
  <button @click="remove">삭제</button>
  <transition-group name="list-complete" tag="p">
    <span v-for="item in items" :key="item" class="list-complete-item">
      {{ item }}
    </span>
  </transition-group>
</div>
```

```js
const Demo = {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10
    }
  },
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.items.length)
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove() {
      this.items.splice(this.randomIndex(), 1)
    },
    shuffle() {
      this.items = _.shuffle(this.items)
    }
  }
}

Vue.createApp(Demo).mount('#list-complete-demo')
```

```css
.list-complete-item {
  transition: all 0.8s ease;
  display: inline-block;
  margin-right: 10px;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="373b4429eb5769ae2e6d097fd954fd08" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Transition-group example">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/373b4429eb5769ae2e6d097fd954fd08">   Transition-group example</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

::: tip 한 가지 중요한 사실은 이러한 FLIP 트랜지션은 `display: inline` 으로 설정된 요소로는 작동하지 않는다는 것입니다. 또는 `display: inline-block` 을 사용하거나 flex 컨텍스트에 요소를 배치 할 수 있습니다. :::

이러한 FLIP 애니메이션은 단일 축으로 제한되지 않습니다. 다차원 그리드의 항목을 [매우 쉽게](https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-list-move-transitions) 트랜지션 할 수 있습니다.

TODO: example

### 스태거링 목록 트랜지션

JavaScript 트랜지션과 통신함으로써 목록 내 각 항목의 데이터 속성을 이용해 트랜지션을 스태거(stagger) 되도록 할 수 있습니다.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.4/gsap.min.js"></script>

<div id="demo">
  <input v-model="query" />
  <transition-group
    name="staggered-fade"
    tag="ul"
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <li
      v-for="(item, index) in computedList"
      :key="item.msg"
      :data-index="index"
    >
      {{ item.msg }}
    </li>
  </transition-group>
</div>
```

```js
const Demo = {
  data() {
    return {
      query: '',
      list: [
        { msg: '세종대왕' },
        { msg: '이순신' },
        { msg: '정약용' },
        { msg: '김구' },
        { msg: '유관순' }
      ]
    }
  },
  computed: {
    computedList() {
      var vm = this
      return this.list.filter(item => {
        return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
      })
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: '1.6em',
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="c2fc5107bd3025ceadea049b3ee44ec0" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Staggered Lists">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/c2fc5107bd3025ceadea049b3ee44ec0">   Staggered Lists</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

## 트랜지션 재사용

트랜지션은 Vue의 컴포넌트 시스템을 통해 재사용 할 수 있습니다. 재사용 할 수있는 트랜지션을 만드려면 루트에 `<transition>` 또는 `<transition-group>` 컴포넌트를 놓은 다음 자식을 트랜지션 컴포넌트에 전달하면됩니다.

TODO: refactor to Vue 3

다음은 템플릿 컴포넌트를 사용하는 예입니다.

```js
Vue.component('my-special-transition', {
  template: '\
    <transition\
      name="very-special-transition"\
      mode="out-in"\
      @before-enter="beforeEnter"\
      @after-enter="afterEnter"\
    >\
      <slot></slot>\
    </transition>\
  ',
  methods: {
    beforeEnter(el) {
      // ...
    },
    afterEnter(el) {
      // ...
    }
  }
})
```

[함수형 컴포넌트](render-function.html#Functional-Components)는 특히 이 작업에 적합합니다.

```js
Vue.component('my-special-transition', {
  functional: true,
  render: function(createElement, context) {
    var data = {
      props: {
        name: 'very-special-transition',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // ...
        },
        afterEnter(el) {
          // ...
        }
      }
    }
    return createElement('transition', data, context.children)
  }
})
```

## 동적 트랜지션

맞습니다, Vue의 트랜지션도 데이터 기반입니다! 동적 변환의 가장 기본적인 예제는 `name` 속성을 동적 속성에 바인딩합니다.

```html
<transition :name="transitionName">
  <!-- ... -->
</transition>
```

이것은 Vue의 트랜지션 클래스 규칙을 사용하여 CSS 트랜지션 / 애니메이션을 정의하고 트랜지션하려는 경우에 유용 할 수 있습니다.

실제로 모든 트랜지션 속성은 동적으로 바인딩 될 수 있습니다. 그리고 그것은 단순한 속성이 아닙니다. 이벤트 훅은 메소드이기 때문에 컨텍스트의 모든 데이터에 접근 할 수 있습니다. 즉, 컴포넌트의 상태에 따라 JavaScript 트랜지션이 다르게 동작 할 수 있습니다.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>

<div id="dynamic-fade-demo" class="demo">
  사라지기:
  <input type="range" v-model="fadeInDuration" min="0" :max="maxFadeDuration" />
  나타나기:
  <input
    type="range"
    v-model="fadeOutDuration"
    min="0"
    :max="maxFadeDuration"
  />
  <transition
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <p v-if="show">hello</p>
  </transition>
  <button v-if="stop" @click="stop = false; show = false">
    애니메이션 시작
  </button>
  <button v-else @click="stop = true">멈춰!</button>
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      show: true,
      fadeInDuration: 1000,
      fadeOutDuration: 1000,
      maxFadeDuration: 1500,
      stop: true
    }
  },
  mounted() {
    this.show = false
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      var vm = this
      Velocity(
        el,
        { opacity: 1 },
        {
          duration: this.fadeInDuration,
          complete: function() {
            done()
            if (!vm.stop) vm.show = false
          }
        }
      )
    },
    leave(el, done) {
      var vm = this
      Velocity(
        el,
        { opacity: 0 },
        {
          duration: this.fadeOutDuration,
          complete: function() {
            done()
            vm.show = true
          }
        }
      )
    }
  }
})

app.mount('#dynamic-fade-demo')
```

TODO: example

마지막으로, 동적 트랜지션을 만드는 궁극적인 방법은 사용되는 트랜지션의 특성을 변경하기 위해 props을 받는 컴포넌트를 사용하는 것입니다. 별로인 것 처럼 들리지만, 실제로 유일한 한계는 당신의 상상력에 있습니다.
