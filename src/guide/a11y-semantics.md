# Semantics

## Forms

When creating a form, you can use the following elements: `<form>`, `<label>`, `<input>`, `<textarea>`, and `<button>`

Labels are typically placed on top or to the left of the form fields:

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

Notice how you can include `autocomplete='on'` on the form element and it will apply to all inputs in your form. You can also set different [values for autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for each input.

### Labels

Provide labels to describe the purpose of all form control; linking `for` and `id`:

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

If you inspect this element in your chrome developer tools and open the Accessibility tab inside the Elements tab, you will see how the input gets its name from the label:

![Chrome Developer Tools showing input accessible name from label](/images/AccessibleLabelChromeDevTools.png)

:::warning Warning:
Though you might have seen labels wrapping the input fields like this:

```html
<label>
  Name:
  <input type="text" name="name" id="name" v-model="name" />
</label>
```

Explicitly setting the labels with a matching id is better supported by assistive technology.
:::

#### aria-label

You can also give the input an accessible name with [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute).

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

Feel free to inspect this element in Chrome DevTools to see how the accessible name has changed:

![Chrome Developer Tools showing input accessible name from aria-label](/images/AccessibleARIAlabelDevTools.png)

#### aria-labelledby

Using [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute) is similar to `aria-label` expect it is used if the label text is visible on screen. It is paired to other elements by their `id` and you can link multiple `id`s:

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

![Chrome Developer Tools showing input accessible name from aria-labelledby](/images/AccessibleARIAlabelledbyDevTools.png)

#### aria-describedby

[aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute) is used the same way as `aria-labelledby` expect provides a description with additional information that the user might need. This can be used to describe the criteria for any input:

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

You can see the description by inspecting Chrome DevTools:

![Chrome Developer Tools showing input accessible name from aria-labelledby and description with aria-describedby](/images/AccessibleARIAdescribedby.png)

### Placeholder

Avoid using placeholders as they can confuse many users.

One of the issues with placeholders is that they don't meet the [color contrast criteria](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) by default; fixing the color contrast makes the placeholder look like pre-populated data in the input fields. Looking at the following example, you can see that the Last Name placeholder which meets the color contrast criteria looks like pre-populated data:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="mlama007" data-slug-hash="PoZJzeQ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Form Placeholder">
  <span>See the Pen <a href="https://codepen.io/mlama007/pen/PoZJzeQ">
  Form Placeholder</a> by Maria (<a href="https://codepen.io/mlama007">@mlama007</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

It is best to provide all the information the user needs to fill out forms outside any inputs.

### Instructions

When adding instructions for your input fields, make sure to link it correctly to the input.
You can provide additional instructions and bind multiple ids inside an [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute). This allows for more flexible design.

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

Alternatively, you can attach the instructions to the input with [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute):

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

### Hiding Content

Usually it is not recommended to visually hide labels, even if the input has an accessible name. However, if the functionality of the input can be understood with surrounding content, then we can hide the visual label.

Let's look at this search field:

```html
<form role="search">
  <label for="search" class="hidden-visually">Search: </label>
  <input type="text" name="search" id="search" v-model="search" />
  <button type="submit">Search</button>
</form>
```

We can do this because the search button will help visual users identify the purpose of the input field.

We can use CSS to visually hide elements but keep them available for assistive technology:

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

Adding `aria-hidden="true"` will hide the element from assistive technology but leave it visually available for other users. Do not use it on focusable elements, purely on decorative, duplicated or offscreen content.

```html
<p>This is not hidden from screen readers.</p>
<p aria-hidden="true">This is hidden from screen readers.</p>
```

### Buttons

When using buttons inside a form, you must set the type to prevent submitting the form.
You can also use an input to create buttons:

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

#### Functional Images

You can use this technique to create functional images.

- Input fields

  - These images will act as a submit type button on forms

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

- Icons

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
