# 이벤트 핸들링

<div class="vueschool"><a target="_blank" rel="sponsored noopener" title="Learn how to handle events on Vue School" href="https://vueschool.io/lessons/vuejs-user-events?friend=vuejs">어떻게 이벤트 핸들링을 다루는지 배웁니다</a></div>

## 이벤트 청취

`v-on`디렉티브는 `@`기호로, DOM 이벤트를 듣고 트리거 될 때와 JavaScript를 실행할 때 사용합니다. <br>`v-on:click="methodName"` 나 줄여서 `@click="methodName"`으로 사용합니다.

예시:

```html
<div id="basic-event">
  <button @click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      counter: 1
    }
  }
}).mount('#basic-event')
```

결과:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="xxGadPZ" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Event handling: basic">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/xxGadPZ">   Event handling: basic</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

## 메소드 이벤트 핸들러

많은 이벤트 핸들러의 로직은 더 복잡할 것이므로, JavaScript를`v-on`  속성 값으로 보관하는 것은 간단하지 않습니다. 그게 `v-on`이 호출하고자 하는 메소드의 이름을 받는 이유입니다.

예시:

```html
<div id="event-with-method">
  <!-- `greet`는 메소드 이름으로 아래에 정의되어 있습니다 -->
  <button @click="greet">Greet</button>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      name: 'Vue.js'
    }
  },
  methods: {
    greet(event) {
      // 메소드 안에서 사용하는 `this` 는 Vue 인스턴스를 가리킵니다.
      alert('Hello ' + this.name + '!')
      // `event` 는 네이티브 DOM 이벤트입니다
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
}).mount('#event-with-method')
```

결과:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="jOPvmaX" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Event handling: with a method">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/jOPvmaX">   Event handling: with a method</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

## 인라인 메소드 핸들러

메소드 이름을 직접 바인딩 하는 대신에, 인라인 JavaScript 구문에 메소드를 사용할 수도 있습니다:

```html
<div id="inline-handler">
  <button @click="say('hi')">Say hi</button>
  <button @click="say('what')">Say what</button>
</div>
```

```js
Vue.createApp({
  methods: {
    say(message) {
      alert(message)
    }
  }
}).mount('#inline-handler')
```

결과:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="WNvgjda" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Event handling: with an inline handler">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/WNvgjda">   Event handling: with an inline handler</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

때로 인라인 명령문 핸들러에서 원본 DOM 이벤트에 액세스 해야할 수도 있습니다.  특별한 `$event`를 사용해 메소드에 전달할 수 있습니다:

```html
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

```js
// ...
methods: {
  warn(message, event) {
    // 네이티브 이벤트에 접근 할 수 있습니다.
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

## 복합 이벤트 핸들러

다음 예시처럼 ,연산자를 사용하여 이벤트 핸들러 안에서 복합 메소드를 지정할 수 있습니다:

```html
<!-- one()과 two() 둘다 버튼 클릭 이벤트를 실행할 수 있습니다.-->
<button @click="one($event), two($event)">
  Submit
</button>
```

```js
// ...
methods: {
  one(event) {
    // 첫번째 핸들러 로직...
  },
  two(event) {
    // 두번째 핸들러 로직...
  }
}
```

## 이벤트 수식어

이벤트 핸들러 내부에서 <code>event.preventDefault()</code> 또는 <code>event.stopPropagation()</code>를 호출하는 것은 매우 보편적인 일입니다. 메소드 내에서 쉽게 이 작업을 할 수 있지만, DOM 이벤트 세부 사항을 처리하는 대신 데이터 로직에 대한 메소드만 사용할 수 있으면 더 좋습니다.

이 문제를 해결하기 위하여, Vue는 `v-on`이벤트에 <strong>이벤트 수식어</strong>를 제공합니다. 수식어는 점으로 된 접미사 입니다.

- `.stop`
- `.prevent<code></code>`
- `.capture<code></code>`
- `.self<code></code>`
- `.once<code></code>`
- `.passive<code></code>`

```html
<!-- 클릭 이벤트 전파가 중단되었습니다. -->
<a @click.stop="doThis"></a>

<!-- 제출 이벤트가 페이지를 다시 로드하지 않습니다. -->
<form @submit.prevent="onSubmit"></form>

<!-- 수정자는 체이닝이 가능합니다. -->
<a @click.stop.prevent="doThat"></a>

<!-- 단순히 수식어만 사용이 가능합니다. -->
<form @submit.prevent></form>

<!-- 캡처 모드를 사용할 때 이벤트 리스너를 사용 가능합니다.-->
<!--즉, 내부 엘리먼트를 대상으로 하는 이벤트가 해당 엘리먼트에서 처리되기 전에 여기서 처리합니다. -->
<div @click.capture="doThis">...</div>

<!-- event.target이 엘리먼트 자체인 경우에만 트리거를 처리합니다.-->
<!-- 자식 엘리먼트에서는 처리되지 않습니다.-->
<div @click.self="doThat">...</div>
```

관련 코드가 동일한 순서로 생성되므로 수식어를 사용할 때 순서를 지정하세요. 다시 말하여 `v-on:click.prevent.self`를 사용하면 <strong>모든 클릭</strong>을 막을 수 있으며 `v-on:click.self.prevent`는 엘리먼트 자체에 대한 클릭만 방지합니다.

```html
<!-- 클릭 이벤트는 최대한 한번에 트리거 됩니다.-->
<a @click.once="doThis"></a>
```

네이티브 DOM이벤트에 독점적인 다른 수식어들과  달리, `.once` 수식어는  [component events](component-custom-events.html)에서도 사용될 수 있습니다. 아직 컴포넌트에 대해서 읽지 않았더라도 걱정하시마십시오.

또한 Vue는 [`addEventListener`의  `passive` option](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters)에 해당하는 `.passive` 수식어도  제공합니다.

```html
<!-- 스크롤의 기본 이벤트를 취소할 수 없습니다. -->
<!-- 바로, `onScroll`완료되는 것을 기다리는 것을 대신합니다.  -->
<!-- 이 경우에`event.preventDefault()`를 포함하고 있습니다. -->
<div @scroll.passive="onScroll">...</div>
```

 특히 `.passive` 수식어는 모바일 환경에서 성능향상에 도움이 됩니다.

`.prevent` 수식어는 무시되고 브라우저에서 오류를 발생시키기 때문에, `.passive` 수식어와 `.prevent` 수식어를 함께 사용하지 마십시오. `.passive` 수식어는 당신이 이벤트의 기본 행동을 무시하지 *않기를*  원하는 브라우저와 상호작용한다는 사실을 기억하십시오.

## 키 수식어

키보드 이벤트를 청취할 때, 종종 공동 키 코드를 확인해야 합니다.<br>Vue에서 키 이벤트를 청취할 때 키 수식어로 `v-on` 또는 `@`를 더할 수 있습니다.

```html
<!-- 키가 'Enter'일때만 `vm.submit()`을 호출할 수 있습니다.-->
<input @keyup.enter="submit" />
```

[`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)를 통해 노출된 유효 키 이름을 케밥 케이스로 변환하여 수식어로 사용할 수 있습니다.

```html
<input @keyup.page-down="onPageDown" />
```

위의 예제에서, 핸들러는 `$event.key`  ===  <code>PageDown </code>일 때만 호출됩니다.

### 키 명령어

Vue는 가장흔히 사용되는 키에서 명령어를 제공합니다:

- `.enter`
- `.tab`
- `.delete`  (“Delete” 와 “Backspace” 키 모두를 캡처합니다)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

## 시스템 수식어 키목록

다음 수식어를 사용해 해당 수식어 키가 눌러진 경우에만 마우스 또는 키보드 이벤트 리스너를 트리거 할 수 있습니다:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

::: 참고<br>메칸토시 키보드에서, meta는 command key(⌘)입니다. 윈도우 키보드에서, meta는 윈도우키 (⊞)입니다. 마이크로시스템 키보드에서 meta는 단색의 다이아몬드(◆)로 표시됩니다. 특정 키보드의 경우,특히 MIT와 Lisp 시스템 키보드와 후속작들,Knight 키보드, space-cadet 키보드와 같은 제품에는 Meta레이블이 지정됩니다. Symbolics 키보드에서 메타는 “META” 또는 “Meta”로 표시됩니다. :::

예시:

```html
<!-- 알트 + 엔터 -->
<input @keyup.alt.enter="clear" />

<!-- 컨트롤 + 클릭 -->
<div @click.ctrl="doSomething">Do something</div>
```

::: 참고<br> <br>수식어 키는 일반 키와 다르며 `keyup` 이벤트와 함께 사용되면 이벤트가 발생할 때 수식어 키가 눌려있어야 합니다. <br>즉,`keyup.ctrl`은 `ctrl`을 누른 상태에서 키를 놓으면 트리거됩니다. `ctrl`키만 놓으면 트리거되지 않습니다.

### `.exact`수식어

`.exact` 수식어는 다른 시스템 수식어와 조합해 그 핸들러가 실행되기 위해 정확한 조합이 눌러야하는 것을 요구합니다.

```html
<!-- 아래코드는 Alt 또는 Shift와 함께 눌렀을 때도 실행됩니다.-->
<button @click.ctrl="onClick">A</button>

<!-- 아래코드는 Cntl키만 눌려져 있을 때 실행됩니다.-->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 아래 코드는 시스템 키가 눌리지 않은 상태인 경우에만 작동합니다.-->
<button @click.exact="onClick">A</button>
```

### 마우스 버튼 수식어

- `.left`
- `.right`
- `.middle`

위 수식어는 특정 마우스 버튼에 의해 트리거 된 이벤트로 핸들러를 제한합니다.

## 왜 HTML로 된 리스너를 사용하는가?

이 모든 이벤트 청취 접근 방법이 관심사의 분리(“separation of concerns”)에 대한 오래된 규칙을 어긴다고 생각할 수 있습니다. 모든 뷰 핸들러 함수와 표현식은 현재 뷰 처리 하는 ViewModel에 엄격히 바인딩 되기 때문에 유지보수가 어렵지 않습니다. 실제로 `v-on`이나 `@`를 사용하면 몇가지 이점이 있습니다:

1. HTML 템플릿을 간단히 하여 JavaScript 코드 내에서 핸들러 함수 구현을 찾는 것이 더 쉽습니다.

2. JavaScript에서 이벤트 리스너를 수동으로 연결할 필요가 없으므로 ViewModel 코드는 순수 로직과 DOM이 필요하지 않습니다. 이렇게 하면 테스트가 쉬워집니다.

3. ViewModel이 파기되면 모든 이벤트 리스너가 자동으로 제거 됩니다. 이벤트 제거에 대한 걱정이 필요없어집니다.
