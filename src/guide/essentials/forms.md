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

# Прив'язування елементів форми {#form-input-bindings}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-inputs-vue-devtools-in-vue-3" title="Безкоштовний урок по взаємодії з користувачем на Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-inputs-in-vue" title="Безкоштовний урок по взаємодії з користувачем на Vue.js"/>
</div>

Коли ми маємо справу з формами на фронтенді, нам часто потрібно синхронізувати стан елементів введення форми з відповідним станом у JavaScript. Вручну підключати зв'язки значень і змінювати слухачів подій може бути громіздким:

```vue-html
<input
  :value="text"
  @input="event => text = event.target.value">
```

Директива `v-model` допомагає нам спростити вищезазначене:

```vue-html
<input v-model="text">
```

Крім того, `v-model` можна використовувати для входів різних типів, елементів `<textarea>` і `<select>`. Він автоматично розширюється до різних пар властивостей і подій DOM на основі елемента, у якому він використовується:

- `<input>` з текстовими типами та елементами `<textarea>` використовують властивість `value` та подію `input`;
- `<input type="checkbox">` і `<input type="radio">` використовують властивість `checked` і подію `change`;
- `<select>` використовує `value` як властивість і `change` як подію.

::: tip Примітка
`v-model` ігноруватиме початкові атрибути `value`, `checked` або `selected`, знайдені в будь-яких елементах форми. Він завжди розглядатиме поточний зв’язаний стан JavaScript як джерело правди. Вам слід оголосити початкове значення на стороні JavaScript, використовуючи <span class="options-api">параметр `data`</span><span class="composition-api">API реактивності</span>.
:::

## Основне використання {#basic-usage}

### Текст {#text}

```vue-html
<p>Повідомлення: {{ message }}</p>
<input v-model="message" placeholder="Відредагуй мене" />
```

<div class="demo">
  <p>Повідомлення: {{ message }}</p>
  <input v-model="message" placeholder="Відредагуй мене" />
</div>

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9kE1qwzAQha8yaOMWYmsfnEDvoY3rjBMH6wdJdhdGUOgBCl102yuUNlmUNj2DfKOOSAilhaykeXp8em9GdmNMMfTI5qx0tW2NB4e+N0uhWmm09TCCxQYCNFZLyMiaCSVUrZXzING5ao2wSJ6rLLsWquRHDAFo8ChNV3mkCaA0y/gSv+Pb9Bx3dH7Fz7iPh3iYHucwjmdaCCVPAYQvW2V6D0Mu9Qq7hWAni2BA2Bo3uluhJT0+JeZ0T7xdfI3v00P8APog4ffk5oQr+TkNm7Fju1xWptg6raj/mDKK04MTjDIlJWnUOs2Cbbw3bs65a+q0ta0rtF1zuhW2V76VWKCT+a3Vdw4tgQWb/WJwEge0uUVFsdFeYv6x/uMmbBAqsPADYVKxug==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9kF9KxDAQxq8y5GUVts17qQveIy91O7vbpflDklahFAQPIPjgq1cQ3X0QXc+Q3siJ3S6iIIRkvsnkl5mvY5fGpG2DLGO5W9rK+IVQeGO09VDiqmhqD51QAGXhi7PzMQaw6BurJgUg0blijRnMZmOqjwdttHJ+ApPwKE1deCQFkJtFeAqf4WV4DDs6P8J72IdDOAz3GXTdhIW+z7mJ731eKdN4aBOpS6wvBDuWCAaEXeJG1yVayoeHyBxuibcLz+F1uAtvQB9E/J6qOeFyfuqGzVkl49SJLEy6dVqRI9/jieOFE4x6GqcTjCyLWrCN98ZlnLvVMvq4dam2a05RahvlK4kpOplcWX3t0BJYsPkPBqdkizaxqKhttP8xf5X+4U6Os/4L1hO1kQ==)

</div>

<span id="vmodel-ime-tip"></span>
::: tip Примітка
Для мов, для яких потрібен [IME](https://en.wikipedia.org/wiki/Input_method) (китайська, японська, корейська тощо), ви помітите, що `v-model` не оновлюється під час створення IME. Якщо ви також хочете реагувати на ці оновлення, використовуйте власний `input` слухач подій і зв'язування `value` замість використання `v-model`.
:::

### Багаторядковий текст {#multiline-text}

```vue-html
<span>Багаторядкове повідомлення:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="додайте кілька рядків"></textarea>
```

<div class="demo">
  <span>Багаторядкове повідомлення:</span>
  <p style="white-space: pre-line;">{{ multilineText }}</p>
  <textarea v-model="multilineText" placeholder="додайте кілька рядків"></textarea>
</div>

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9kc1OwkAQx19lshc0oe29FhLfYy+1DFDS/cjuApqmifFsQrz4HAThIAi+wvaNnOXDGE287fxn5jf/ma3ZrdbxbIosZZktTKkdWHRT3eeyFFoZBzUYHEIDQ6MEdKi0wyWXhZLWgUBr8xFCL9RcdTrXXGbJCUMAChwKXeUOQ+Qyq3PZ9y9+6d/8sn3yh/axXfi13/qDX/kN+M/waF9JOvgPv/Mbv/f7dpESNLQeIRqse6iwx9l8XDqMKFNgCtpgVJUSbzjr1/W3s6bJkrAMNTq8d7nBHGaRUAOsiHCu4gzIZYFjVQ3QkH40sCaf7+SSfG3J0659JqNLuHgmaUWzsuTCpSkhOC/Muux0wEjkOp5YJenENZcA/JywnKVwVIJGhw0xZ2PntE2TxA6L8DETGyszSugVm6l0pcAYrYjujJpbNATmrPuDkZA4QxMZlLQKmv+Yv0r/cAO24bJhzRfQ4eOX)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9kdFqwjAUhl8l5MYNbHvfdcLeIzeZPWqlTUOSqqMUxq4Hsps9hzi9mE73CqdvtBO1Y2wwCMk5f5I/X86p+Z3W4awCHvPEDk2m3UAoWOjSOJbCSFa5Y7VQjKXSyavrc8yYAVcZ1WWMFWCtHEPMer2z1PiFJhpJ9G1MiYNC59KBz1xitVQDfMEVvuGqfcJj+9gucYM7POIatww/fdC+knTED9zjFg94aJcxmfqrJxPNrHvI4Vbw+SRzENDOkFC0gSDPFNwIPqjrDpE1TRLp80UHCycNSDYLijKFnBwupwRnRDmESZmnYEg/AWyI850oiWtHTPv2mUBXrGMmaU1vJVHnS6/45PJh3udZ4QsbFFKHU1sqKvqpguKyYQWPu5oKTl3xueAT57SNo8iOhr5VUxuWZhxRFJpKuayAEGwR3JtybsGQseD9Hx4RiTMwgQFFXwHzn+evo398u6by5gvB5edu)

</div>

Зауважте, що інтерполяція всередині `<textarea>` не працюватиме. Замість цього використовуйте `v-model`.

```vue-html
<!-- погано -->
<textarea>{{ text }}</textarea>

<!-- добре -->
<textarea v-model="text"></textarea>
```

### Прапорець {#checkbox}

Один прапорець, логічне значення:

```vue-html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

<div class="demo">
  <input type="checkbox" id="checkbox-demo" v-model="checked" />
  <label for="checkbox-demo">{{ checked }}</label>
</div>

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY2hlY2tlZCA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2hlY2tib3hcIiB2LW1vZGVsPVwiY2hlY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJjaGVja2JveFwiPnt7IGNoZWNrZWQgfX08L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2hlY2tlZDogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2hlY2tib3hcIiB2LW1vZGVsPVwiY2hlY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJjaGVja2JveFwiPnt7IGNoZWNrZWQgfX08L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

Ми також можемо прив'язати кілька прапорців до одного масиву або значення [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set):

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
<div>Вибрані імена: {{ checkedNames }}</div>

<input type="checkbox" id="olha" value="Ольга" v-model="checkedNames">
<label for="olha">Ольга</label>

<input type="checkbox" id="dariia" value="Дарія" v-model="checkedNames">
<label for="dariia">Дарія</label>

<input type="checkbox" id="victoria" value="Вікторія" v-model="checkedNames">
<label for="victoria">Вікторія</label>
```

<div class="demo">
  <div>Вибрані імена: {{ checkedNames }}</div>

  <input type="checkbox" id="olha" value="Ольга" v-model="checkedNames">
  <label for="olha">Ольга</label>
  
  <input type="checkbox" id="dariia" value="Дарія" v-model="checkedNames">
  <label for="dariia">Дарія</label>
  
  <input type="checkbox" id="victoria" value="Вікторія" v-model="checkedNames">
  <label for="victoria">Вікторія</label>
</div>

У цьому випадку масив `checkedNames` завжди міститиме значення з поточних прапорців.

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNqdkt9KwzAUxl8l5EaFrb0f3cAX8AWMF1175jLbJCRpVUpheC0IQ3bpM1REEHU+Q/pGJt2fWgVl3uWc832/fvScAh8L4eUZ4AEOVCSp0EiBzsSIMJoKLjUqkIQJKtFE8hQdWOkBYYRFnCmNoilEFxCfhCkoNHTCw9OzI8ICf82yFFtoSEUSarAVQkFM85FZmBfzWM9NZVb1EtVL826ezcpUA1QUXWpZBr6zOJJ1UyYyjfS1gCHBjXDMrwhGNLY1T6ahfedhkrmxeTBv9a15MpVr9lMeQ7J1bfAEr0Ml4RgSNOFyRxm17sBvxo3y7xBxKCntxLg3VT2vl/XdXjG2nFHr3y9ITiPNZTfKwv7q1/rGfPwjUMuz++ty2mCBv9s27uH1CfXTUHgzxZk9sqLJvhnYz9iFu47r2dNyNcFTrYUa+L6aRO40Z8rj8ty3L09mTNMUPFBpfyz5pQJpwQT3vjB828xB9iWwGCTI35jfpD+4DlsSVuLyE0OJOfQ=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNqdkt9KhEAUxl/lMFcFrd4vJvQCvUB2Matn29nUGcbRNkRYug6CJfayZzAiiGp7hvGNGnVds6DYQHTOv58fc76cnAhhZSmSMXESXzKhXC/GheBSQYBTmoYKci8GCKiiB4ftGUCiSmXcRQD+DP1LDE5phMkYzs7bfFF/zMs8jr2jm0BhJEKq0EQATsAyV6/0i36slrrUm2oN1Vq/62e90eUY8nyAh6Jw7HqkJplpFotUgboWeOyRpnHCFx4BFpiYhzNqzhkN07qsH/RbdaufdFknRxEPMOymtniPtKJCOsEQplzuKG4/7dhNuen8W0RAJWMDGfe6rJbVurrbS0bHcfv5/YRkzFdcDqWszFW/Vjf64x+Cep7Z35DTC3Ps3bbJEWFRba1RRIU1T3hsbNd4yNsWzG/Mwlv3GH6KdeyRmVIiGdt2MvVrs84Ti8sL25wsmcaKRWhhEo0mkl8lKA3YI0dfGLZJZihHEuMAJcrfmN9af3A7R5PiExtVPcs=)

</div>

### Радіокнопка {#radio}

```vue-html
<div>Вибрано: {{ picked }}</div>

<input type="radio" id="one" value="Один" v-model="picked" />
<label for="one">Один</label>

<input type="radio" id="two" value="Два" v-model="picked" />
<label for="two">Два</label>
```

<div class="demo">
  <div>Вибрано: {{ picked }}</div>

  <input type="radio" id="one" value="Один" v-model="picked" />
  <label for="one">Один</label>
  
  <input type="radio" id="two" value="Два" v-model="picked" />
  <label for="two">Два</label>
</div>

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNqNkU1OwzAQha9ieROQmngfpZG4hzdpMgGX+Ee2kwpFkTgDYs0ZCmLBppzB3IhxQwoCCdjNvHnzPWlmpBfGZEMPNKeFq60wnjjwvSm5EtJo68lILLRkIq3VkiRoTbjiqtbKeWJEfQ0NWUfLWRIewnN4CYfknKuCzTTkYONBmq7ygB0hRSOGMtyh8/HtNuzDIbzmZBwX2DQVLDriIpqFMr0n/sbAmlNbNUJzSkSDjVaA5VB1fRwt4VFKpW6gQ3FGosTm5K7aQEdabZf1clkr2HH2d6rfxfKUeh+ewv7fmcflcl76TCzY6T50Reezp7Iy2dZphY8ZI4d/DByneK2oRA3fEXtOr7w3LmfMtXV859Zl2l4yrDLbKy8kZOBkurF658AimNPVFwZDcQCbWlANWLC/Mb9Zf3AjduJqotM7uEviZw==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNqNUkFOwzAQ/MrKF0Bq43sUIvEPX9J6Cy6JbdlOCooi8QbEmTcUxIFLeYP5EeumKQgkQIrind2dGWvXPbuwNutaZDkr/NIpG0qh8cYaF0DiqmrrAL3QALIK1enZGAM4DK3TEwKwanmNMoeT+Bhf4mvcnYyVIR30o6/gR30CARtbVwEJARRSdWW8J97T+13cxl18y6HvD6owDAVPHYlIzUrbNkC4tXgumKukMoKBkgSMRgq7qm5TabpKSs0bI7Gm5ChJKT4619UCa1gZN9HLiVbwfe1v17BJ4dH1IT7H7b899+RyJH06Fvw4HzZjqknrmDeVzdbeaFrVfu7iUPCC0bTGeQtGu0xYsKsQrM8596tlWvDaZ8Zdcooy1+qgGszQN/OFMxuPjoQFm33R4JTs0M0daokO3W+a31p/6E5vgA0fqIHmPg==)

</div>

### Поле вибору {#select}

Поле одиночного вибору:

```vue-html
<div>Вибрано: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Будь ласка, оберіть варіант</option>
  <option>А</option>
  <option>Б</option>
  <option>В</option>
</select>
```

<div class="demo">
  <div>Вибрано: {{ selected }}</div>

  <select v-model="selected">
    <option disabled value="">Будь ласка, оберіть варіант</option>
    <option>А</option>
    <option>Б</option>
    <option>В</option>
  </select>
</div>

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9kU1OwzAQha9ieROQmmRfhUrcw5s0mUKqxLZsJyyiSKVsWdAuOEeLQEIgeobJjRg3/BVUdh6/z59Gzy0/1zpqauBjntjMFNoxC67WEyGLSivjWMsMzFjHZkZVLCA0EFLITEnr0RIyBzk789BJEJwKmcSDhww0OKh0mTqgibEkL5oJrvEZt/0CN/iGuzFr229N1yWxZ/xTwod71oSVyqE8E/wTFHzvI0RpVyjJ8sKm05IMTVrWQCQRuOpv8LG/ZfiKm/4aX3AzYrjDLT71i/6+X/rogSIa/DL9MokH3aF8gnfHgtWxYH0QUCX7xWlI4q9G+IgPFYdVqqO5VZI+ofW8+Ais4NTPoBacqvez4JfOaTuOYzvL/NfNbaTMRUynyNTSFRVEYKtwatSVBUNiwUc/HLSLacCEBmQOBsx/zl/oH6/XdkJ2vHsHbxrhqQ==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9kc1Kw0AUhV/lMpsqNMk+xILvMZu0udWU/DEziUII1Lp1YbvwOVpREMU+w5038k5ji1UqhGTOnJOPy7mtuKwqv6lRhCLSE5VWZiQLvK1KZSDBaVxnBlpZACSxic/O+zOAQlOrYq8ANGY4MZiEMBj0d5378IufKDiQWRjMqyw2yAogStJmRCt6o42d05o+aRtC2x540HVR4DLuV47399B4eZlgdiHFPijFjseRsjJpWUCS6nicMaGJsxo5yQla2nt6sQ9AH7S2d/RO6yHQljb0auf2yS6c9cwWCzeMXURBjzuGj+jxlLE8ZayODK5kNziLKDg0IoYizV31Xh5X/kyXBa9l17H8NrQU3E+PloL35rQU18ZUOgwCPZ24Zc60X6qrgE++qguT5uijzr2xKm80KgZLMfzB4FlUg8pTWCSoUP3H/BX9w91vXXRf40zlgA==)

</div>

:::tip Примітка
Якщо початкове значення виразу `v-model` не відповідає жодному з варіантів, елемент `<select>` показуватиметься в стані "не вибрано". В iOS це призведе до того, що користувач не зможе вибрати перший елемент, оскільки в цьому випадку iOS не запускає подію зміни. Тому рекомендується вказати вимкнений параметр із порожнім значенням, як показано у прикладі вище.
:::

Поле множинного вибору (прив'язано до масиву):

```vue-html
<div>Вибрано: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>А</option>
  <option>Б</option>
  <option>В</option>
</select>
```

<div class="demo">
  <div>Вибрано: {{ multiSelected }}</div>

  <select v-model="multiSelected" multiple>
    <option>А</option>
    <option>Б</option>
    <option>В</option>
  </select>
</div>

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9kU1OwzAQha9ieVOQmrhsQ1qJc9RdlGRCXcU/sp0UFEXiCNCTwI4NnMHciHHSilIEOz/Pm88zzx29MSZtG6AZzV1hhfHEgW/MgishjbaedMRCRXpSWS3JBK0TrrgqtHLRWkPhoSTzaLpYri65ytnIQQIKD9LUaw+oCMlL0S7CPryF18/H8BLew0dGuu4b0/c5i57YivbxnrSJ1CXUc06PRk6JbGovTD2C0auNF1otwlPODsezwvNfhf2PAo4/PIIiZyfTo3T+YXhvNCyPE6xIFxt3ovSbjFzNZub+mqt+SGLooFM6ZpnItUm3TitMe+jhh4LjFIMY5+IUM46a0433xmWMuaqIf7R1qbZ3DE+pbZQXElJwMrm1eufAIpjT6QkDF7Et2MSCKsGC/Y95Zv3FjVjcqKf9FwU/y/4=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9UUtOwzAQvcrIK5CapGxDqMQ56i5CM6Wp4o9sJy2KInEE6ElgxwbOYG7EJG6qUkSlKJnnefP88qZl91rHTY0sZZldmlK7GZe408o4KHCV15WDlkuAInf51XWoAQy62sgRAViscOmwSGG+CGdd/6EXPVlyVCbgUOgqd0gIICvKZub3/sO/fz/7N//pv1Jo26MedF2W9Jx+lOjhHJpIqAKrO85GImcgyGupqyBMXKVdqeTMv2TJoTxrvP7X2P9qkP3hEgJZcuKeoHVPw32BMB8dLEIw27Jw6xRuplO9ux2TGCbYhJWizzgSuY43VknKf5jhh4bljIIIvjijBfWYs7Vz2qZJYlfLfmsbGyvzmFAVm1q6UmCMVkQPRm0tGhLmbHKiQT9iGjSRQVmgQXNJ84z6R3dcL+t+ACbsz9U=)

</div>

Вибрані параметри можна динамічно показувати за допомогою `v-for`:

<div class="composition-api">

```js
const selected = ref('А')

const options = ref([
  { text: 'Один', value: 'Б' },
  { text: 'Два', value: 'В' },
  { text: 'Три', value: 'Г' }
])
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      selected: 'А',
      options: [
        { text: 'Один', value: 'Б' },
        { text: 'Два', value: 'В' },
        { text: 'Три', value: 'Г' }
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

<div>Вибрано: {{ selected }}</div>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9kkFOwzAQRa8y8iYgtck+CpU4B2ZRkgmkSmzLdgJSFIkjQGHNghMUxKKbcgZzI8ZJGgqV2Hk8T9//z7hl50qFTY0sZolJdaEsGLS1WnBRVEpqCy1ozKGDXMsKAkIDLrhIpTAeLTG1mMGZh04C9xCc/nSlsgUdxuYFF0BiFu9sDIF7cR9u63bBDJplWaO/egygm/2mnt272xwy62Pm9evebQ+ZJ2K4uCQnSTRkojRUWKxUubRIFUAyeIdmXskMyzPO9mE46wFChgCE5FITMJaF2CfjDOL+1akZ9uWkQDbbEQ69XejIWC8dDbeDlWh4unfJbZIVzcKtaTpvlGzjdu4z9jrTsLsuiTzj802Z2IwNC5tXSxWujBS00tbL87FBdklneJ8zWqSvObuxVpk4ikye+o+wMqHU1xGdQl0LW1QYoqnmV1reGtQkzFk//1GDrOsG9VyjyFCj/k/zD3qk62VpPh3rvgHztvE5)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9kkFOwzAQRa8y8qYgNck+CkicA7MIzRRSJbFlO6FSVIkjQGHNghMUxKKbcgZzI8ZxHFUgkKLIM375/j/jnl1IGXctspRleqFKac55g2splIECl3lbGeh5A1DkJj859WsAhaZVTagANFa4MFikMLMPs3loC2lK0egULkMHoAeDa+PAF/th9/Ywm0OXVy261uMMNtPXx+yzfbe7Y3L7F/n6dW/3x+QTkQG88ouhphc9WTLFpsJgLavcIFUAmU8FXVSLAqszzkJMzgaAEJ+QkKVQBIxl2YTonEE6OJk246GcFMh6P8KxiwCb0WyW+K63kvijB5fcZEXZndst/b03SruzB/uZOp3gj0SyxDEu35SJzVlZu8lGdS7jlRYNTX0YIR83yC7p+PM5o2vhas5ujZE6TRK9XLi7stKxUDcJrWLVNqasMUZdR9dK3GlUJMzZOJlBg6yrDlWksClQofpP8wf6SzfMjW2+Afca9Do=)

</div>

## Прив'язування значень {#value-bindings}

Для радіокнопок, прапорця та поля вибору прив'язування `v-model` зазвичай є статичними рядками (або логічними значеннями для прапорця):

```vue-html
<!-- `picked` - це рядок "а", якщо позначено прапорцем -->
<input type="radio" v-model="picked" value="а" />

<!-- `toggle` має значення true або false -->
<input type="checkbox" v-model="toggle" />

<!-- `selected` - це рядок "абв", коли вибрано перший параметр -->
<select v-model="selected">
  <option value="абв">АБВ</option>
</select>
```

Але іноді нам може знадобитися прив'язати значення до динамічної властивості поточного активного екземпляра. Для цього ми можемо використати `v-bind`. Крім того, використання `v-bind` дозволяє прив'язати вхідне значення до нерядкових значень.

### Прапорець {#checkbox-1}

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  true-value="так"
  false-value="ні" />
```

`true-value` і `false-value` — це специфічні атрибути Vue, які працюють лише з `v-model`. Тут значення властивості `toggle` буде встановлено на `'так'`, якщо прапорець позначено, і встановлено на `'ні'`, якщо не позначено. Ви також можете прив'язати їх до динамічних значень за допомогою `v-bind`:

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```

:::tip Підказка
Атрибути `true-value` і `false-value` не впливають на атрибут `value` вхідних даних, оскільки браузери не включають непозначені поля в результівне значення форм. Щоб гарантувати, що у формі подано одне з двох значень (наприклад, «так» або «ні»), замість цього використовуйте радіокнопку.
:::

### Радіокнопка {#radio-1}

```vue-html
<input type="radio" v-model="pick" :value="перший" />
<input type="radio" v-model="pick" :value="другий" />
```

`pick` матиме значення `перший`, коли обрано першу радіокнопку, і значення `другий`, коли другу.

### Параметри полів вибору {#select-options}

```vue-html
<select v-model="selected">
  <!-- вбудований літерал об’єкта -->
  <option :value="{ number: 123 }">123</option>
</select>
```

`v-model` також підтримує прив'язування значень нерядкових значень! У наведеному вище прикладі, коли вибрано параметр, `selected` буде встановлено на значення літералу об'єкта `{ number: 123 }`.

## Модифікатори {#modifiers}

### `.lazy` {#lazy}

За промовчанням `v-model` синхронізує введене значення з даними після кожної події `input` (за винятком введення IME, як [вказано вище](#vmodel-ime-tip)). Ви можете додати модифікатор `lazy` для синхронізації після подій `change`:

```vue-html
<!-- синхронізовано після "change" замість "input" -->
<input v-model.lazy="msg" />
```

### `.number` {#number}

Якщо ви хочете, щоб введені користувачем дані автоматично перетворювалися на числові, ви можете додати модифікатор `number` до своїх керованих полів `v-model`:

```vue-html
<input v-model.number="age" />
```

Якщо значення не можна проаналізувати за допомогою `parseFloat()`, замість нього використовується оригінальне значення.

Модифікатор `number` застосовується автоматично, якщо поле має `type="number"`.

### `.trim` {#trim}

Якщо ви хочете, щоб пробіли у введених користувачами обрізалися автоматично, ви можете додати модифікатор `trim` до своїх введених даних, керованих `v-model`:

```vue-html
<input v-model.trim="msg" />
```

## `v-model` з компонентами {#v-model-with-components}

> Якщо ви ще не знайомі з компонентами Vue, можете поки що пропустити це.

Вбудовані типи введення HTML не завжди відповідають вашим потребам. На щастя, компоненти Vue дозволяють створювати багаторазові поля введення з повністю налаштованою поведінкою. Ці поля працюють навіть з `v-model`! Щоб дізнатися більше, прочитайте про [використання з `v-model`](/guide/components/v-model.html) у гіді по компонентах.
