# Semantics

## Forms

When creating a form, we can use the following elements: `<form>`, `<label>`, `<input>`, `<textarea>`, and `<button>`

Labels are typically placed on top or to the left of the form fields:

``` html
<form action="/dataCollectionLocation" method="post" autocomplete='on'>
  <div>
    <label for="first-name">First Name:</label>
    <input type="text" id="first-name" name="first-name">
  </div>
  <div>
    <label for="last-name">Last Name:</label>
    <input type="text" id="last-name" name="last-name">
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" autocomplete='off'>
  </div>
  <button type="submit">Submit</button>
</form>
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="fd22db5b1b6612a6c0b25cf3dcaaea8f" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="a11y- simple-form">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/fd22db5b1b6612a6c0b25cf3dcaaea8f">
  a11y- simple-form</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Notice how you can include `autocomplete='on'` on the form element and it will apply to all inputs in your form. You can also set different [values for autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for each input.

### Labels

Provide labels to describe the purpose of all form control; linking `for` and `id`. Placeholders are used to provide an example of required data format:

```html
  <label for="name">Name</label>
  <input type="text" name="name" id="name" placeholder="Evan You">
```

<p class="codepen" data-height="200" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="0f44e79afa8b2f6cb3314096f6ad93b2" style="height: 200px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="a11y-label-1">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/0f44e79afa8b2f6cb3314096f6ad93b2">
  a11y-label-1</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

If you inspect this element in your chrome developer tools and open the accessibility tab, you will see how the input gets its name from the label:

![Chrome Developer Tools showing input accessible name](/images/AccessibilityChromeDeveloperTools.png)>

:::warning Warning:
Though you might have seen labels wrapping the input fields like this:

```html
<label>
  Name:
  <input type="text" name="name" id="name" placeholder="Evan You">
</label>
```

Explicitly setting the labels with an matching id is better supported by assistive technology.
:::

You can also give the input an accessible name with [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute).

```html
<label for="name">Name</label>
<input type="text" name="name" id="name" aria-label="This label will take over the accessible name">
```

Feel free to inspect this element in your Chrome developer tools to see how the accessible name has changed.

<p class="codepen" data-height="194" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="3890595fe21b7479e1c7ea00fd6aabee" style="height: 194px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="a11y-label-2">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/3890595fe21b7479e1c7ea00fd6aabee">
  a11y-label-2</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Instructions

When adding instructions for your input fields, make sure to link it correctly to the input.
You can provide additional instructions and bind multiple ids inside an [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute). This allows for more flexible design.

```html
  <label id="date-label" for="date" aria-labelledby="date-label date-instructions">Date of Birth:</label>
  <input type="date" name="date" id="date">
  <p id="date-instructions"> MM/DD/YYYY </p>
```

Alternatively, you can attach the instructions to the input with [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute):

```html
  <label id="date-label" for="date">Date of Birth:</label>
  <input type="date" name="date" id="date" aria-describedby="date-instructions">
  <p id="date-instructions"> MM/DD/YYYY </p>
```

<p class="codepen" data-height="359" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="45f000a6515d053998217d19177a9375" style="height: 359px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="a11y-label-instructions">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/45f000a6515d053998217d19177a9375">
  a11y-label-instructions</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Hiding Content

Usually it is not recommended to visually hide labels, even if the input has an accessible name. However, if the functionality of the input can be understood with surrounding content, then we can hide the visual label.

Let's look at this search field:

``` html
<form role="search">
  <label for="search" class="hiddenVisually">Search: </label>
  <input type="text" name="search" id="search">
  <button type="submit">Search</button>
</form>
```

We can do this because the search button will help visual users identify the purpose of the input field.

We can use CSS to visually hide elements but keep them available for assistive technology:

```css
.hiddenVisually {
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

<p class="codepen" data-height="184" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="fb83744e4a031ab942e8c9a8db37e734" style="height: 184px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="a11y-forms-hide">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/fb83744e4a031ab942e8c9a8db37e734">
  a11y-forms-hide</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Adding `aria-hidden="true"` will hide the element from assistive technology but leave it visually available for other users. Do not use it on focusable elements, purely on decorative, duplicated or offscreen content.

```html
<p>This is not hidden from screen readers.</p>
<p aria-hidden="true">This is hidden from screen readers.</p>
```

### Buttons

When using buttons inside a form, you must set the type to prevent submitting the form.
You can also use an input to create buttons:

```html
<form action="">
  <!-- Buttons -->
  <button type="button">Cancel</button>
  <button type="submit">Submit</button>
  

  <!-- Input buttons -->
  <input type="button" value="Cancel">
  <input type="submit" value="Submit">
</form>
```

<p class="codepen" data-height="288" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="3a63a14d3e58f5ce41b73348f4febbce" style="height: 288px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="a11y-form-buttons">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/3a63a14d3e58f5ce41b73348f4febbce">
  a11y-form-buttons</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

You can use this technique to create functional images.

- Input fields
  - These images will act as a submit type button on forms
  
  ```html
  <form role="search">
    <label for="search" class="hiddenVisually">Search: </label>
    <input type="text" name="search" id="search">
    <input type="image" src="https://img.icons8.com/search" alt="Search">
  </form>
  ```

- Icons
  
```html
<form role="search">
  <label for="search" class="hiddenVisually">Search: </label>
  <input type="text" name="search" id="search">
  <button type="submit">
    <i class="fas fa-search" aria-hidden="true"></i>
    <span class="visually-hidden">Search</span>
  </button>
</form>
````

<p class="codepen" data-height="291" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="c35de452525cfdd34dd7028bc4351ff0" style="height: 291px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="a11y-forms-functional-imgs">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/c35de452525cfdd34dd7028bc4351ff0">
  a11y-forms-functional-imgs</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
