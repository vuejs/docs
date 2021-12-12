# Adding Data

For now, our component renders some static data. Try to change a number 3 in the code to something different to see how the rendered result changes.

How to make it dynamic? We need to create our first _reactive_ property `colorsNumber`

<div class="options-api">

```js
data() {
  return {
    colorsNumber: 3
  }
}
```

</div>

<div class="composition-api">

```js
import { ref } from 'vue'
const colorsNumber = ref(3)
```

</div>

Now, we can use it in our template instead of a static number:

```html
<h2>Number of colors: {{ colorsNumber }}</h2>
```

Try to change the `colorsNumber` and check how it immediately updates the rendered HTML.
