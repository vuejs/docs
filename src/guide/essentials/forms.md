---
outline: deep
---

<script setup>
import { ref } from 'vue'
const message = ref('')
const multilineText = ref('')
const checked = ref(false)
const checkedNames = ref([])
const picked = ref('')
const selected = ref('')
const multiSelected = ref([])
</script>

# Powiązania danych wejściowych formularza

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-inputs-vue-devtools-in-vue-3" title="Free Lesson on User Inputs with Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-inputs-in-vue" title="Free Lesson on User Inputs with Vue.js"/>
</div>

Kiedy mamy do czynienia z formularzami na frontendzie, często musimy synchronizować stan elementów wejściowych formularza z odpowiadającym im stanem w JavaScript. Ręczne tworzenie wiązań wartości i nasłuchiwanie zdarzeń zmiany może być kłopotliwe:

```vue-html
<input
  :value="text"
  @input="event => text = event.target.value">
```

The `v-model` directive helps us simplify the above to:

```vue-html
<input v-model="text">
```

Dodatkowo, `v-model` może być używany na elementach wejściowych różnych typów, `<textarea>` i `<select>`. Automatycznie rozszerza się na różne pary właściwości DOM i zdarzeń, w zależności od elementu, na którym jest użyty:

- Elementy `<input>` z typami tekstowymi i `<textarea>` używają właściwości `value` i zdarzenia - `<input type="checkbox">` i `<input type="radio">` używają właściwości `checked` i zdarzenia `change`;
- `<select>` używa `value` jako prop i `change` jako event.

::: tip Note
`v-model` będzie ignorował początkowe `value`, `checked` or `selected` atrybutów znalezionych na dowolnych elementach formularza. Będzie on zawsze traktował bieżący związany stan JavaScript jako źródło prawdy. Wartość początkową należy zadeklarować po stronie JavaScript, używając <span class="options-api">funkcję `data` </span><span class="composition-api">reaktywność API</span>.
:::

## Podstawowe uycie

### Tekst

```vue-html
<p>Wiadomością jest: {{ message }}</p>
<input v-model="message" placeholder="edytuj mnie" />
```

<div class="demo">
  <p>Wiadomością jest: {{ message }}</p>
  <input v-model="message" placeholder="edytuj mnie" />
</div>

<div class="composition-api">

[Spróbuj w Vue Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbWVzc2FnZSA9IHJlZignJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPk1lc3NhZ2UgaXM6IHt7IG1lc3NhZ2UgfX08L3A+XG5cdDxpbnB1dCB2LW1vZGVsPVwibWVzc2FnZVwiIHBsYWNlaG9sZGVyPVwiZWRpdCBtZVwiIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Spróbuj w Vue Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogJydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPk1lc3NhZ2UgaXM6IHt7IG1lc3NhZ2UgfX08L3A+XG5cdDxpbnB1dCB2LW1vZGVsPVwibWVzc2FnZVwiIHBsYWNlaG9sZGVyPVwiZWRpdCBtZVwiIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

<span id="vmodel-ime-tip"></span>
::: tip Note
Dla języków, które wymagają [IME](https://en.wikipedia.org/wiki/Input_method) (chiński, japoński, koreański itd.), zauważysz, że `v-model` nie jest aktualizowany podczas tworzenia IME. Jeśli chcesz odpowiadać również na te aktualizacje, użyj listenera zdarzeń `input` i wiązania `value` zamiast używania `v-model`.
:::

### Tekst wielowierszowy

```vue-html
<span>Wielowierszowa wiadomość to:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="dodaj wiele lini tekstu"></textarea>
```

<div class="demo">
  <span>Wielowierszowa wiadomość to:</span>
  <p style="white-space: pre-line;">{{ multilineText }}</p>
  <textarea v-model="multilineText" placeholder="dodaj wiele lini tekstu"></textarea>
</div>

<div class="composition-api">

[Spróbuj w VUE Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbWVzc2FnZSA9IHJlZignJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxzcGFuPk11bHRpbGluZSBtZXNzYWdlIGlzOjwvc3Bhbj5cblx0PHAgc3R5bGU9XCJ3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XCI+e3sgbWVzc2FnZSB9fTwvcD5cblx0PHRleHRhcmVhIHYtbW9kZWw9XCJtZXNzYWdlXCIgcGxhY2Vob2xkZXI9XCJhZGQgbXVsdGlwbGUgbGluZXNcIj48L3RleHRhcmVhPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[Spróbuj w VUE Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogJydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxzcGFuPk11bHRpbGluZSBtZXNzYWdlIGlzOjwvc3Bhbj5cblx0PHAgc3R5bGU9XCJ3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XCI+e3sgbWVzc2FnZSB9fTwvcD5cblx0PHRleHRhcmVhIHYtbW9kZWw9XCJtZXNzYWdlXCIgcGxhY2Vob2xkZXI9XCJhZGQgbXVsdGlwbGUgbGluZXNcIj48L3RleHRhcmVhPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

Zauważ, że interpolacja wewnątrz `<textarea>` nie będzie działać. Zamiast tego należy użyć `v-model`.

```vue-html
<!-- źle -->
<textarea>{{ text }}</textarea>

<!-- dobrze -->
<textarea v-model="text"></textarea>
```

### Pole wyboru

Pojedyncze pole wyboru, wartość typu boolean:

```vue-html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

<div class="demo">
  <input type="checkbox" id="checkbox-demo" v-model="checked" />
  <label for="checkbox-demo">{{ checked }}</label>
</div>

<div class="composition-api">

[Spróbuj w VUE Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY2hlY2tlZCA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2hlY2tib3hcIiB2LW1vZGVsPVwiY2hlY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJjaGVja2JveFwiPnt7IGNoZWNrZWQgfX08L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[Spróbuj w VUE Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2hlY2tlZDogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2hlY2tib3hcIiB2LW1vZGVsPVwiY2hlY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJjaGVja2JveFwiPnt7IGNoZWNrZWQgfX08L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

Można także powiązać wiele pól wyboru z tą samą tablicą lub wartością [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set):

<div class="composition-api">

```js
const checkedNames = ref([])
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      checkedNames: []
    }
  }
}
```

</div>

```vue-html
<div>Zaznacz imiona: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
```

<div class="demo">
  <div>Zaznacz imiona: {{ checkedNames }}</div>

  <input type="checkbox" id="demo-jack" value="Jack" v-model="checkedNames">
  <label for="demo-jack">Jack</label>

  <input type="checkbox" id="demo-john" value="John" v-model="checkedNames">
  <label for="demo-john">John</label>

  <input type="checkbox" id="demo-mike" value="Mike" v-model="checkedNames">
  <label for="demo-mike">Mike</label>
</div>

W tym przypadku tablica `checkedNames` będzie zawsze zawierała wartości z aktualnie zaznaczonych pól.

<div class="composition-api">

[Spróbuj w VUE Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY2hlY2tlZE5hbWVzID0gcmVmKFtdKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5DaGVja2VkIG5hbWVzOiB7eyBjaGVja2VkTmFtZXMgfX08L2Rpdj5cblxuICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJqYWNrXCIgdmFsdWU9XCJKYWNrXCIgdi1tb2RlbD1cImNoZWNrZWROYW1lc1wiIC8+XG4gIDxsYWJlbCBmb3I9XCJqYWNrXCI+SmFjazwvbGFiZWw+XG4gXG4gIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImpvaG5cIiB2YWx1ZT1cIkpvaG5cIiB2LW1vZGVsPVwiY2hlY2tlZE5hbWVzXCIgLz5cbiAgPGxhYmVsIGZvcj1cImpvaG5cIj5Kb2huPC9sYWJlbD5cbiBcbiAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwibWlrZVwiIHZhbHVlPVwiTWlrZVwiIHYtbW9kZWw9XCJjaGVja2VkTmFtZXNcIiAvPlxuICA8bGFiZWwgZm9yPVwibWlrZVwiPk1pa2U8L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[Spróbuj w VUE Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2hlY2tlZE5hbWVzOiBbXVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5DaGVja2VkIG5hbWVzOiB7eyBjaGVja2VkTmFtZXMgfX08L2Rpdj5cblxuICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJqYWNrXCIgdmFsdWU9XCJKYWNrXCIgdi1tb2RlbD1cImNoZWNrZWROYW1lc1wiIC8+XG4gIDxsYWJlbCBmb3I9XCJqYWNrXCI+SmFjazwvbGFiZWw+XG4gXG4gIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImpvaG5cIiB2YWx1ZT1cIkpvaG5cIiB2LW1vZGVsPVwiY2hlY2tlZE5hbWVzXCIgLz5cbiAgPGxhYmVsIGZvcj1cImpvaG5cIj5Kb2huPC9sYWJlbD5cbiBcbiAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwibWlrZVwiIHZhbHVlPVwiTWlrZVwiIHYtbW9kZWw9XCJjaGVja2VkTmFtZXNcIiAvPlxuICA8bGFiZWwgZm9yPVwibWlrZVwiPk1pa2U8L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

### Radio

```vue-html
<div>Wybrane: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

<div class="demo">
  <div>Wybrane: {{ picked }}</div>

  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>

  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
</div>

<div class="composition-api">

[Spróbuj w VUE Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgcGlja2VkID0gcmVmKCdPbmUnKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5QaWNrZWQ6IHt7IHBpY2tlZCB9fTwvZGl2PlxuXG5cdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cIm9uZVwiIHZhbHVlPVwiT25lXCIgdi1tb2RlbD1cInBpY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJvbmVcIj5PbmU8L2xhYmVsPlxuXG5cdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cInR3b1wiIHZhbHVlPVwiVHdvXCIgdi1tb2RlbD1cInBpY2tlZFwiIC8+XG4gIDxsYWJlbCBmb3I9XCJ0d29cIj5Ud288L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[Spróbuj w VUE Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGlja2VkOiAnT25lJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGRpdj5QaWNrZWQ6IHt7IHBpY2tlZCB9fTwvZGl2PlxuXG5cdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cIm9uZVwiIHZhbHVlPVwiT25lXCIgdi1tb2RlbD1cInBpY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJvbmVcIj5PbmU8L2xhYmVsPlxuXG5cdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cInR3b1wiIHZhbHVlPVwiVHdvXCIgdi1tb2RlbD1cInBpY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJ0d29cIj5Ud288L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

### Select

Pojedynczy select:

```vue-html
<div>Wybrane: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

<div class="demo">
  <div>Wybrane:  {{ selected }}</div>
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>

<div class="composition-api">

[Spróbuj w VUE Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2VsZWN0ZWQgPSByZWYoJycpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8c3Bhbj4gU2VsZWN0ZWQ6IHt7IHNlbGVjdGVkIH19PC9zcGFuPlxuXG4gIDxzZWxlY3Qgdi1tb2RlbD1cInNlbGVjdGVkXCI+XG4gICAgPG9wdGlvbiBkaXNhYmxlZCB2YWx1ZT1cIlwiPlBsZWFzZSBzZWxlY3Qgb25lPC9vcHRpb24+XG4gICAgPG9wdGlvbj5BPC9vcHRpb24+XG4gICAgPG9wdGlvbj5CPC9vcHRpb24+XG4gICAgPG9wdGlvbj5DPC9vcHRpb24+XG4gIDwvc2VsZWN0PlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[Spróbuj w VUE Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0ZWQ6ICcnXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8c3Bhbj4gU2VsZWN0ZWQ6IHt7IHNlbGVjdGVkIH19PC9zcGFuPlxuICA8c2VsZWN0IHYtbW9kZWw9XCJzZWxlY3RlZFwiPlxuICAgIDxvcHRpb24gZGlzYWJsZWQgdmFsdWU9XCJcIj5QbGVhc2Ugc2VsZWN0IG9uZTwvb3B0aW9uPlxuICAgIDxvcHRpb24+QTwvb3B0aW9uPlxuICAgIDxvcHRpb24+Qjwvb3B0aW9uPlxuICAgIDxvcHRpb24+Qzwvb3B0aW9uPlxuICA8L3NlbGVjdD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

:::tip Note
Jeśli początkowa wartość wyrażenia `v-model` nie pasuje do żadnej z opcji, element `<select>` będzie renderowany w stanie "unselected". Na iOS spowoduje to, że użytkownik nie będzie mógł wybrać pierwszego elementu, ponieważ iOS nie wywołuje zdarzenia zmiany w tym przypadku. Dlatego zalecane jest zapewnienie opcji wyłączonej z pustą wartością, jak pokazano w powyższym przykładzie.
:::

Wybór wielokrotny (związany z tablicą):

```vue-html
<div>Wybrane: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

<div class="demo">
  <div>Wybrane: {{ multiSelected }}</div>

  <select v-model="multiSelected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>

<div class="composition-api">

[Spróbuj w VUE Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2VsZWN0ZWQgPSByZWYoW10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlNlbGVjdGVkOiB7eyBzZWxlY3RlZCB9fTwvZGl2PlxuXG4gIDxzZWxlY3Qgdi1tb2RlbD1cInNlbGVjdGVkXCIgbXVsdGlwbGU+XG4gICAgPG9wdGlvbj5BPC9vcHRpb24+XG4gICAgPG9wdGlvbj5CPC9vcHRpb24+XG4gICAgPG9wdGlvbj5DPC9vcHRpb24+XG4gIDwvc2VsZWN0PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuc2VsZWN0W211bHRpcGxlXSB7XG4gIHdpZHRoOiAxMDBweDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[Spróbuj w VUE Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0ZWQ6IFtdXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlNlbGVjdGVkOiB7eyBzZWxlY3RlZCB9fTwvZGl2PlxuXG4gIDxzZWxlY3Qgdi1tb2RlbD1cInNlbGVjdGVkXCIgbXVsdGlwbGU+XG4gICAgPG9wdGlvbj5BPC9vcHRpb24+XG4gICAgPG9wdGlvbj5CPC9vcHRpb24+XG4gICAgPG9wdGlvbj5DPC9vcHRpb24+XG4gIDwvc2VsZWN0PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuc2VsZWN0W211bHRpcGxlXSB7XG4gIHdpZHRoOiAxMDBweDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

Opcje wyboru mogą być dynamicznie renderowane za pomocą `v-for`:

<div class="composition-api">

```js
const selected = ref('A')

const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])
```

</div>
<div class="options-api">

```js
export default {
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
}
```

</div>

```vue-html
<select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
</select>

<div>Wybrane: {{ selected }}</div>
```

<div class="composition-api">

[Spróbuj w VUE Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2VsZWN0ZWQgPSByZWYoJ0EnKVxuXG5jb25zdCBvcHRpb25zID0gcmVmKFtcbiAgeyB0ZXh0OiAnT25lJywgdmFsdWU6ICdBJyB9LFxuICB7IHRleHQ6ICdUd28nLCB2YWx1ZTogJ0InIH0sXG4gIHsgdGV4dDogJ1RocmVlJywgdmFsdWU6ICdDJyB9XG5dKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHNlbGVjdCB2LW1vZGVsPVwic2VsZWN0ZWRcIj5cbiAgICA8b3B0aW9uIHYtZm9yPVwib3B0aW9uIGluIG9wdGlvbnNcIiA6dmFsdWU9XCJvcHRpb24udmFsdWVcIj5cbiAgICAgIHt7IG9wdGlvbi50ZXh0IH19XG4gICAgPC9vcHRpb24+XG4gIDwvc2VsZWN0PlxuXG5cdDxkaXY+U2VsZWN0ZWQ6IHt7IHNlbGVjdGVkIH19PC9kaXY+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Spróbuj w VUE Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0ZWQ6ICdBJyxcbiAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgeyB0ZXh0OiAnT25lJywgdmFsdWU6ICdBJyB9LFxuICAgICAgICB7IHRleHQ6ICdUd28nLCB2YWx1ZTogJ0InIH0sXG4gICAgICAgIHsgdGV4dDogJ1RocmVlJywgdmFsdWU6ICdDJyB9XG4gICAgICBdXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8c2VsZWN0IHYtbW9kZWw9XCJzZWxlY3RlZFwiPlxuICAgIDxvcHRpb24gdi1mb3I9XCJvcHRpb24gaW4gb3B0aW9uc1wiIDp2YWx1ZT1cIm9wdGlvbi52YWx1ZVwiPlxuICAgICAge3sgb3B0aW9uLnRleHQgfX1cbiAgICA8L29wdGlvbj5cbiAgPC9zZWxlY3Q+XG5cblx0PGRpdj5TZWxlY3RlZDoge3sgc2VsZWN0ZWQgfX08L2Rpdj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

## Value Bindings

For radio, checkbox and select options, the `v-model` binding values are usually static strings (or booleans for checkbox):

```vue-html
<!-- `picked` is a string "a" when checked -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` is either true or false -->
<input type="checkbox" v-model="toggle" />

<!-- `selected` is a string "abc" when the first option is selected -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

Czasami jednak możemy chcieć powiązać wartość z dynamiczną właściwością na bieżącej aktywnej instancji. Możemy użyć `v-bind`, aby to osiągnąć. Dodatkowo, użycie `v-bind` pozwala nam powiązać wartość wejściową z wartościami, które nie są ciągami znaków.

### Checkbox

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />
```

`true-value` i `false-value` są atrybutami specyficznymi dla Vue, które działają tylko z `v-model`. Tutaj wartość właściwości `toggle` będzie ustawiona na `'yes'` gdy pole jest zaznaczone, i ustawiona na `'no'` gdy jest odznaczone. Możesz także powiązać je z dynamicznymi wartościami używając `v-bind`:

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```

:::tip Tip
Atrybuty `true-value` i `false-value` nie wpływają na atrybut `value` wejścia, ponieważ przeglądarki nie uwzględniają niezaznaczonych pól we wnioskach formularzy. Aby zagwarantować, że w formularzu zostanie podana jedna z dwóch wartości (np. "tak" lub "nie"), należy użyć wejść radiowych.
:::

### Radio

```vue-html
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

`pick` zostanie ustawiony na wartość `first`, gdy zostanie zaznaczone pierwsze wejście radiowe, oraz na wartość `second`, gdy zostanie zaznaczone drugie.

### Select Options

```vue-html
<select v-model="selected">
  <!-- inline object literal -->
  <option :value="{ number: 123 }">123</option>
</select>
```

`v-model` obsługuje także wiązania wartości, które nie są ciągiem znaków! W powyższym przykładzie, gdy opcja zostanie wybrana, `selected` zostanie ustawiony na literalną wartość obiektu `{ liczba: 123 }`.

## Modyfikatory

### `.lazy`

Domyślnie, `v-model` synchronizuje dane wejściowe z danymi po każdym zdarzeniu `input` (z wyjątkiem kompozycji IME, jak [podano wyżej](#vmodel-ime-tip)). Możesz dodać modyfikator `lazy` aby zamiast tego synchronizować po zdarzeniach `change`:

```vue-html
<!-- zsynchronizowane po "change" zamiast "input" -->
<input v-model.lazy="msg" />
```

### `.number`

Jeśli chcesz, aby dane wejściowe użytkownika były automatycznie zamieniane na liczbę, możesz dodać modyfikator `number` do danych wejściowych zarządzanych przez `v-model`:

```vue-html
<input v-model.number="age" />
```

Jeśli wartość nie może być przetworzona przy pomocy `parseFloat()`, to zamiast niej używana jest wartość oryginalna.

Modyfikator `number` jest stosowany automatycznie, jeśli dane wejściowe mają `type="number"`.

### `.trim`

Jeśli chcesz, by białe spacje z danych wejściowych użytkownika były automatycznie obcinane, możesz dodać modyfikator `trim` do danych wejściowych zarządzanych przez `v-model`:

```vue-html
<input v-model.trim="msg" />
```

## `v-model` z Komponentami

> Jeśli nie jesteś jeszcze zaznajomiony z komponentami Vue, możesz na razie pominąć tę część.

Wbudowane w HTML typy danych wejściowych nie zawsze spełniają Twoje potrzeby. Na szczęście, komponenty Vue pozwalają na budowanie wejść wielokrotnego użytku z całkowicie spersonalizowanym zachowaniem. Te dane wejściowe działają nawet z `v-model`! Aby dowiedzieć się więcej, przeczytaj o [Użycie `v-model`](/guide/components/events.html#usage-with-v-model) w przewodniku po komponentach.
