# Semantics

## 폼(Forms)

폼을 생성할 때, 다음과 같은 요소를 사용할 수 있습니다: `<form>`, `<label>`, `<input>`, `<textarea>`, and `<button>`

레이블 요소는 일반적으로 입력 필드의 상단 또는 왼쪽에 배치됩니다:

```html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      :type="item.type"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
    />
  </div>
  <button type="submit">Submit</button>
</form>
```


<p class="codepen" data-height="368" data-theme-id="light" data-default-tab="js,result" data-user="mlama007" data-slug-hash="YzwpPYZ" style="height: 368px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Simple Form">
  <span>See the Pen <a href="https://codepen.io/mlama007/pen/YzwpPYZ">
  Simple Form</a> by Maria (<a href="https://codepen.io/mlama007">@mlama007</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


폼 요소 속성에 `autocomplete='on'`을 포함하면, 폼의 모든 입력 요소에 해당 속성이 적용됩니다. 또한 각각의 입력 요소에 [자동 완성 속성 값](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)을 다르게 설정할 수도 있습니다.

### 레이블(Labels)

모든 폼 입력 요소의 목적을 설명하는 레이블을 제공해야 합니다. `for` 와 `id` 를 연결하여 제공:

```html
<label for="name">Name</label>
<input type="text" name="name" id="name" v-model="name" />
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="mlama007" data-slug-hash="wvMrGqz" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Form Label">
  <span>See the Pen <a href="https://codepen.io/mlama007/pen/wvMrGqz">
  Form Label</a> by Maria (<a href="https://codepen.io/mlama007">@mlama007</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

크롬 개발자 도구에서 이 요소를 검사하고 요소 탭 내의 접근성 탭을 열면,  입력 요소가 이 레이블에서 이름에 어떻게 접근하는지 알 수 있습니다.

![Chrome Developer Tools showing input accessible name from label](/images/AccessibleLabelChromeDevTools.png)

:::주의: 다음과 같이 입력 필드를 감싸는 레이블을 봤을 수 있지만:

```html
<label>
  Name:
  <input type="text" name="name" id="name" v-model="name">
</label>
```

레이블을 일치하는 id로 명확하게 설정하는 것이 보조 기술에 의해 더 잘 지원됩니다. :::

#### aria-label

[`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) 을 통해서 보조 기술이 접근 가능한 이름을 input 요소에게 줄 수 있습니다.

```html
<label for="name">Name</label>
<input
  type="text"
  name="name"
  id="name"
  v-model="name"
  :aria-label="nameLabel"
/>
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="mlama007" data-slug-hash="jOWGqgz" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Form ARIA label">
  <span>See the Pen <a href="https://codepen.io/mlama007/pen/jOWGqgz">
  Form ARIA label</a> by Maria (<a href="https://codepen.io/mlama007">@mlama007</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

크롬 개발자 도구에서 이 요소를 검사하여 <a><code>aria-label</code></a>이 어떻게 변경되었는지 확인해보세요:

![Chrome Developer Tools showing input accessible name from aria-label](/images/AccessibleARIAlabelDevTools.png)

#### aria-labelledby

<a><code>aria-labelledby</code></a>를 사용하는 것은 `aria-label`의 사용과 유사하며, 화면에 레이블 텍스트가 보이는 경우 사용할 것으로 예상합니다. 다른 요소들의 <br><code>id</code>에 의해 구성되며, 여러 `id`를 연결할 수 있습니다:

```html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">Billing</h1>
  <div class="form-item">
    <label for="name">Name:</label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
    />
  </div>
  <button type="submit">Submit</button>
</form>
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="mlama007" data-slug-hash="ZEQXOLP" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Form ARIA labelledby">
  <span>See the Pen <a href="https://codepen.io/mlama007/pen/ZEQXOLP">
  Form ARIA labelledby</a> by Maria (<a href="https://codepen.io/mlama007">@mlama007</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


![Chrome Developer Tools showing input accessible name from aria-label](/images/AccessibleARIAlabelDevTools.png)

#### aria-describedby

[aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute)는 `aria-labelledby`의 예상과 동일한 방식으로 사용되며, 사용자가 필요로 할 수 있는 추가적인 정보가 담긴 설명을 제공합니다. 이것은 입력에 대한 기준을 설명하는 데 사용될 수 있습니다.

```html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">Billing</h1>
  <div class="form-item">
    <label for="name">Full Name:</label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
      aria-describedby="nameDescription"
    />
    <p id="nameDescription">Please provide first and last name.</p>
  </div>
  <button type="submit">Submit</button>
</form>
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="mlama007" data-slug-hash="JjGrKyY" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Form ARIA describedby">
  <span>See the Pen <a href="https://codepen.io/mlama007/pen/JjGrKyY">
  Form ARIA describedby</a> by Maria (<a href="https://codepen.io/mlama007">@mlama007</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


크롬 개발자 도구 검사를 통해서 해당 설명을 확인할 수 있습니다:

![Chrome Developer Tools showing input accessible name from aria-labelledby and description with aria-describedby](/images/AccessibleARIAdescribedby.png)

### 자리 표시자(Placeholder)

자리 표시자는 많은 사용자에게 혼란을 줄 수 있으므로 사용을 자제해주세요.

자리 표시자의 문제 중 하나는 기본적인 [색 대비 기준](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)을 충족하지 못한다는 것입니다. 색 대비를 수정하면 자리 표시자가 입력 필드에 미리 입력된 데이터처럼 보이게 됩니다. 다음 예제를 살펴 보면, 색 대비 기준을 충족하는 Last Name 자리 표시자는 미리 입력된 데이터처럼 보이는 것을 확인할 수 있습니다.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="mlama007" data-slug-hash="PoZJzeQ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Form Placeholder">
  <span>See the Pen <a href="https://codepen.io/mlama007/pen/PoZJzeQ">
  Form Placeholder</a> by Maria (<a href="https://codepen.io/mlama007">@mlama007</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


사용자가 폼을 채우기 위해 필요한 모든 정보를 입력 요소 밖에서 제공하는 것이 가장 좋은 방법입니다.

### 지시 사항(Instructions)

입력 필드에 대한 지시 사항을 추가할 때는, 입력 요소에 올바르게 연결하세요. 추가 지시 사항을 제공하고 [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute) 내에 여러 ID를 연결할 수 있습니다. 이를 따르면 유연한 설계를 할 수 있습니다.<br><fieldset>   <legend>Using aria-labelledby</legend>   <label id="date-label" for="date">Current Date:</label>   <input     type="date"     name="date"     id="date"     aria-labelledby="date-label date-instructions"   />   <p id="date-instructions">MM/DD/YYYY</p> </fieldset>

```html
<fieldset>
  <legend>Using aria-labelledby</legend>
  <label id="date-label" for="date">Current Date:</label>
  <input
    type="date"
    name="date"
    id="date"
    aria-labelledby="date-label date-instructions"
  />
  <p id="date-instructions">MM/DD/YYYY</p>
</fieldset>
```

또는 [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute)를 사용하여 입력 요소에 지시 사항을 첨부할 수 있습니다.

```html
<fieldset>
  <legend>Using aria-describedby</legend>
  <label id="dob" for="dob">Date of Birth:</label>
  <input type="date" name="dob" id="dob" aria-describedby="dob-instructions" />
  <p id="dob-instructions">MM/DD/YYYY</p>
</fieldset>
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="mlama007" data-slug-hash="GRoMqYy" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Form Instructions">
  <span>See the Pen <a href="https://codepen.io/mlama007/pen/GRoMqYy">
  Form Instructions</a> by Maria (<a href="https://codepen.io/mlama007">@mlama007</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### 내용 감추기(Hiding Content)

일반적으로 입력 요소가 이해하기 쉬운 형태일지라도 레이블을 시각적으로 숨기는 것은 권장하지 않습니다. 그러나 입력 요소의 기능을 주변 내용으로 이해할 수 있다면, 시각적으로 레이블을 숨길 수 있습니다.

검색 영역을 확인해보세요:

```html
<form role="search">
  <label for="search" class="hidden-visually">Search: </label>
  <input type="text" name="search" id="search" v-model="search" />
  <button type="submit">Search</button>
</form>
```

화면을 보는 사용자들에게 검색 버튼이 입력 영역의 목적을 확인하는 데 도움이 되기 때문에 시각적으로 레이블을 숨길 수 있습니다.

시각적으로 요소를 숨기지만 보조 기술에서는 요소가 유지되도록 CSS를 사용할 수 있습니다.

```css
.hidden-visually {
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  height: 1px;
  width: 1px;
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
}
```


<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="mlama007" data-slug-hash="qBbpQwB" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Form Search">
  <span>See the Pen <a href="https://codepen.io/mlama007/pen/qBbpQwB">
  Form Search</a> by Maria (<a href="https://codepen.io/mlama007">@mlama007</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

#### aria-hidden="true"

`aria-hidden="true"`를 추가하면 보조 기술에서 요소가 숨겨지지만 화면을 보는 사용자는 사용할 수 있도록 남겨집니다. 포커스 가능한 요소, 단순한 장식, 중복 또는 오프스크린 콘텐츠에 사용하지 마십시오.

```html
<p>This is not hidden from screen readers.</p>
<p aria-hidden="true">This is hidden from screen readers.</p>
```

### 버튼(Buttons)

폼 내에서 버튼 요소(button)를 사용할 때, 폼 전송을 방지하기 위해 타입 속성(type)을 설정해야 합니다. 입력 요소(input)를 사용하여 버튼을 만들 수도 있습니다:

```html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <!-- Buttons -->
  <button type="button">Cancel</button>
  <button type="submit">Submit</button>

  <!-- Input buttons -->
  <input type="button" value="Cancel" />
  <input type="submit" value="Submit" />
</form>
```

<p class="codepen" data-height="467" data-theme-id="light" data-default-tab="js,result" data-user="mlama007" data-slug-hash="PoZEXoj" style="height: 467px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Form Buttons">
  <span>See the Pen <a href="https://codepen.io/mlama007/pen/PoZEXoj">
  Form Buttons</a> by Maria (<a href="https://codepen.io/mlama007">@mlama007</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

#### 기능적인 이미지(Functional Images)

이 기법을 사용해 기능적인 이미지를 만들 수 있습니다.

- 입력 영역(Input fields)

    - 이 이미지는 폼에서 전송 버튼의 역할을 수행합니다.

    ```html
    <form role="search">
      <label for="search" class="hidden-visually">Search: </label>
      <input type="text" name="search" id="search" v-model="search" />
      <input
        type="image"
        class="btnImg"
        src="https://img.icons8.com/search"
        alt="Search"
      />
    </form>
    ```

- 아이콘(Icons)

```html
<form role="search">
  <label for="searchIcon" class="hidden-visually">Search: </label>
  <input type="text" name="searchIcon" id="searchIcon" v-model="searchIcon" />
  <button type="submit">
    <i class="fas fa-search" aria-hidden="true"></i>
    <span class="hidden-visually">Search</span>
  </button>
</form>
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="mlama007" data-slug-hash="NWxXeqY" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Functional Images">
  <span>See the Pen <a href="https://codepen.io/mlama007/pen/NWxXeqY">
  Functional Images</a> by Maria (<a href="https://codepen.io/mlama007">@mlama007</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
