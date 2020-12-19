# 폼 입력 바인딩

## 기본 사용법

`v-model` 디렉티브를 사용하여 input, textarea, select 요소들에 양방향 데이터 바인딩을 생성할 수 있습니다. v-model 디렉티브는 `input type` 요소를 변경하는 올바른 방법을 자동으로 선택합니다. 약간 이상하지만, `v-model`은 기본적으로 사용자 입력 이벤트에 대한 데이터를 업데이트하는 “syntax sugar”이며, 일부 경우에는 특별한 주의를 해야합니다.

::: tip Note 
`v-model`은 모든 form 엘리먼트의 초기 `value`와 `checked` 그리고 `selected` 속성을 무시합니다. 항상 Vue 인스턴스 데이터를 원본 소스로 취급합니다. 컴포넌트의 `data` 옵션 안에 있는 JavaScript에서 초기값을 선언해야합니다. 
:::

`v-model`은 내부적으로 서로 다른 속성을 사용하고 서로 다른 입력 요소에 대해 서로 다른 이벤트를 전송합니다 :

- `text` 와 `textarea` 태그는 value속성과 input이벤트를 사용합니다.
- 체크박스들과 라디오버튼들은 `checked` 속성과 `change` 이벤트를 사용합니다.
- Select 태그는 `value` 를 prop으로, `change`를 이벤트로 사용합니다.

<span id="vmodel-ime-tip"></span> ::: tip Note [IME](https://en.wikipedia.org/wiki/Input_method) (중국어, 일본어, 한국어 등)가 필요한 언어의 경우 IME 중 `v-model`이 업데이트 되지 않습니다. 이러한 업데이트를 처리하려면 `input` 이벤트를 대신 사용하십시오. :::

### 문자열

```html
<input v-model="message" placeholder="여기를 수정해보세요" />
<p>메시지: {{ message }}</p>
```

<common-codepen-snippet title="Handling forms: basic v-model" slug="eYNPEqj" :preview="false" />


### 여러 줄을 가진 문장

```html
<span>여러 줄을 가지는 메시지:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br />
<textarea v-model="message" placeholder="여러줄을 입력해보세요"></textarea>
```

<common-codepen-snippet title="Handling forms: textarea" slug="xxGyXaG" :preview="false" />


textarea의 텍스트 보간은 작동하지 않습니다. 대신 `v-model`를 사용하십시오.

```html
<!-- bad -->
<textarea>{{ text }}</textarea>

<!-- good -->
<textarea v-model="text"></textarea>
```

### 체크박스

하나의 체크박스는 단일 boolean 값을 가집니다:

```html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="PoqyJVE" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Handling forms: checkbox">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/PoqyJVE">   Handling forms: checkbox</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

여러개의 체크박스에 동일한 배열을 바인딩할 수 있습니다:

```html
<div id="v-model-multiple-checkboxes">
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label>
  <br />
  <span>Checked names: {{ checkedNames }}</span>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      checkedNames: []
    }
  }
}).mount('#v-model-multiple-checkboxes')
```

<common-codepen-snippet title="Handling forms: multiple checkboxes" slug="bGdmoyj" :preview="false" />


### 라디오

```html
<div id="v-model-radiobutton">
  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>
  <br />
  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
  <br />
  <span>Picked: {{ picked }}</span>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      picked: ''
    }
  }
}).mount('#v-model-radiobutton')
```

<common-codepen-snippet title="Handling forms: radiobutton" slug="MWwPEMM" :preview="false" />


### 셀렉트

단일 셀렉트:

```html
<div id="v-model-select" class="demo">
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      selected: ''
    }
  }
}).mount('#v-model-select')
```

<common-codepen-snippet title="Handling forms: select" slug="KKpGydL" :preview="false" />


:::tip Note 
`v-model` 표현식의 초기 값이 어떤 옵션에도 없으면, `<select>` 엘리먼트는 "선택없음"("unselected") 상태로 렌더링됩니다. iOS에서는 이 경우 변경 이벤트가 발생하지 않아 사용자가 첫 번째 항목을 선택할 수 없게됩니다. 따라서 위 예제처럼 사용하지 않는 옵션에 빈 값을 넣는 것이 좋습니다. 
:::

다중 셀렉트 (배열이 바인딩됨):

```html
<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<br />
<span>Selected: {{ selected }}</span>
```

<common-codepen-snippet title="Handling forms: select bound to array" slug="gOpBXPz" tab="html,result" :preview="false" />

`v-for` 를 이용한 동적 옵션 렌더링:

```html
<div id="v-model-select-dynamic" class="demo">
  <select v-model="selected">
    <option v-for="option in options" :value="option.value">
      {{ option.text }}
    </option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      selected: 'A',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ]
    }
  }
}).mount('#v-model-select-dynamic')
```

<common-codepen-snippet title="Handling forms: select with dynamic options" slug="abORVZm" :preview="false" />

## 값 바인딩하기

라디오, 체크박스 및 셀렉트 옵션의 경우, `v-model` 바인딩 값은 보통 정적인 문자열(또는 체크 박스의 boolean) 입니다.

```html
<!-- `picked` 는 선택시 문자열 "a" 입니다 -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` 는 true 또는 false 입니다 -->
<input type="checkbox" v-model="toggle" />

<!-- `selected` 는 "ABC" 선택시 "abc" 입니다 -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

그러나 때로는 현재 활성 인스턴스의 동적 속성에 값을 바인딩하려고 할 때, `v-bind`를 사용할 수 있습니다. 또한, `v-bind`를 사용하면 입력 값을 문자열이 아닌 값에 바인딩 할 수 있습니다.

### 체크박스

```html
<input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
```

```js
// 체크된 경우:
vm.toggle === 'yes'
// 체크되지 않은 경우:
vm.toggle === 'no'
```

:::tip Tip 
브라우저는 폼 전송(form submission) 시 체크되지 않은 박스를 포함하지 않기 때문에, `true-value` 와 `false-value` 속성은 입력의 `value` 특성에 영향을 주지 않습니다. 두 값("예" 또는 "아니오") 중 하나가 폼을 통해 전송되려면 라디오를 대신 사용하십시오. 
:::

### 라디오

```html
<input type="radio" v-model="pick" v-bind:value="a" />
```

```js
// 체크된 경우:
vm.pick === vm.a
```

### 셀렉트 옵션

```html
<select v-model="selected">
  <!-- 인라인 객체 리터럴 -->
  <option :value="{ number: 123 }">123</option>
</select>
```

```js
// 선택된 경우:
typeof vm.selected // => 'object'
vm.selected.number // => 123
```

## 수식어

### `.lazy`

기본적으로, `v-model`은 각 `input` 이벤트 후 입력과 데이터를 동기화 합니다. (단, [앞에서 설명](#vmodel-ime-tip)한 IME 구성은 제외됩니다.). `lazy` 수식어를 추가하여 `change`이벤트 이후에 동기화 할 수 있습니다.:

```html
<!-- "input" 대신 "change" 이후에 동기화 됩니다. -->
<input v-model.lazy="msg" />
```

### `.number`

사용자 입력이 자동으로 숫자로 형변환 되기를 원하면, `v-model`이 관리하는 input에 `number` 수식어를 추가하면 됩니다.

```html
<input v-model.number="age" type="number" />
```

`type="number"`를 사용하는 경우에 HTML 입력 요소의 값은 항상 문자열을 반영하기 때문에 종종 유용합니다. 만약, 값이 `parseFloat()`에 의해서 분석할 수 없는 경우, 원래의 값이 리턴됩니다.

### `.trim`

사용자 입력이 자동으로 숫자로 형변환 되기를 원하면, `v-model`이 관리하는 input에 `number` 수식어를 추가하면 됩니다.

```html
<input v-model.trim="msg" />
```

## 컴포넌트에서의 `v-model`

> 아직 Vue의 구성 요소에 익숙하지 않다면 지금은 넘어가도 됩니다.

HTML의 기본 제공(built-in) input type은 항상 사용자의 요구를 만족시킬 수는 없습니다. 다행히, Vue 컴포넌트는 완전히 사용자 정의된 동작의 재사용 가능한 input을 만들 수 있습니다. 이 input은 `v-model`에도 작동합니다! 자세한 내용은 컴포넌트 가이드의 [사용자 정의 입력](./component-basics.html#using-v-model-on-components)을 참조하십시오.
