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
  <VueSchoolLink href="https://vueschool.io/lessons/user-inputs-vue-devtools-in-vue-3" title="Безкоштовний урок по елементах форм із Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-inputs-in-vue" title="Безкоштовний урок по елементах форм із Vue.js"/>
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

Крім того, `v-model` можна використовувати для елементів різних типів, таких як `<textarea>` і `<select>`. Вона автоматично розширюється до різних пар властивостей і подій DOM на основі елемента, у якому ця директива використовується:

- `<input>` з текстовими типами та елементами `<textarea>` використовують властивість `value` та подію `input`;
- `<input type="checkbox">` і `<input type="radio">` використовують властивість `checked` і подію `change`;
- `<select>` використовує `value` як властивість і `change` як подію.

::: tip Примітка
`v-model` ігноруватиме початкові атрибути `value`, `checked` або `selected`, знайдені в будь-яких елементах форми. Він завжди розглядатиме поточний зв'язаний стан JavaScript як джерело правди. Вам слід оголосити початкове значення на стороні JavaScript, використовуючи <span class="options-api">параметр [`data`](/api/options-state.html#data)</span><span class="composition-api">[API реактивності](/api/reactivity-core.html#reactivity-api-core)</span>.
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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNo9zjsKwkAQBuCrDNtEC00vq+A9tpE4aiD7YHdjEwKCBxAsbL2C+ChE4xkmN3KCkmqY4eebvxJz58bbEsVEyJD53EUIGEs3UybXzvoIFXhcQQ0rbzUkHE2UUSazJkTQGMJijTDtMoMkGSoj0x/DAC8RtSsWEXkDkG5GZ/rQtT3RneebXvSghpr2MIGq6rW6lmlXQEWZG1dG2I60XWIxVeIfUQKYzXBjiyV6vtOxM9sde3e60K3d0xP4Qcc/OJ0yJ9O+jai/5PZrVQ==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNo9jksKwkAMhq8SZqMutPsyCt6jm8HGB/QxTFMRSkHwAIILt15BfCxE6xnSG5lSWwhJ/vDnSwo1t3ayzVH5SmcLt7E0CxLc2dQRhLg0eURQBAlAaMgMR20P4JByl3QKIMYsMyv0YTBoR2VTJElorweLIIxtZAhFAWg74wt/+Vaf+SH1w29+csVVffShKDoslKX2bLNPepPYnGA7jtMQo2mg/pZAgWAXuE6jEJ3M+dQw673wHnzle33gF8iBBv8Utyc47fXfqPIHThxvLA==)

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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNo9j01OwzAQha8y8iawCNmHNBL38CZKpzRS4li2W0BRJMQaqWLDOaLSLmhpuML4Rh33b+f3/ObNN5140vphuUCRisyWptIOLLqFzqWqGt0aBx0YnEEPM9M2EHE0kkqqslXWQYPWFs8Ik5C5i6J7qbLkXMMFLBw2ui4cBuUyqwuV0xcN9EOD/6DRv/sVbWhHI61pC/QfHv6brZH+aE9bOtDBr1IuDaOnEg3WvdU4keJlXjmM+afEFLTBuK4UPkqRd92NrO+zJBzDgw5fXWGwgGXctFOsueGSkgKYssR5W0/RsH8C2DDnL1My146Z9v6TQQe4MrO15l1Zcu3lLUFcDhb9Ecf9nTI=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNo9j01OwzAQha8y8qawCNmHEIl7ZGMlA42UH8uZlKIoEmKNVLHhHFFpF7Q0XGF8IyZNU8my5z173nxu1aMxd6sGVaDCOrGZoSgucW0qS5Dik25ygjYuAVJN+uZ2qgEsUmPLWQEUWNf6GQNYLCarGw/ZZIX+NVgEYWFyTTgqCmujy4g/uedv7t07D+7NbXjHBx54y3vgv7FwX2IN/MtH3vOJT24TSOjYeg4xUNNrjg+xellmhJ7cJIJiLHp5VuJ9rKK2nRGh60LfTI2Ea9IWNay8okoxl4TLq1iBUCa4rPIUrfhngJ1w/gilcB2E6eg+BLSHmVmsrcwK/TlXpozi8mHV/QOtV6EJ)

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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNpVjssKgzAURH/lko3tonVfotD/yEaTKw3Ni3gjLSH/3qhUcDnDnMNk9gzhviRkD8ZnGXUgmJFS6IXTNvhIkCHiBAWm6C00ddoIJ5z0biaQL5RvVNCtmwvFhFfheLuLqqIGQhvMQLgm4tqFREDfgJ1gGz36j2Cg1TkvN+sVmn+JqnbtrjDDiAYmH09En/PxphTebqsK8PY4wMoPslBUxQ==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNpVjtEKgzAMRX8l9Gl72Po+OmH/0ZdqI5PVNnSpOEr/fVVREEKSc0kuN4sX0X1KKB5Cfbs4EDfa40whMljsTXIMWXsAa9hcrtsOEJFT9DsBdG/sPmgfwDHhJpZl1FZLycO6AuNIzjAuxGrwlBj4R/jUYrVpw6wFDPbM020MFt0uoq2a3CycadFBH+Lpo8l5jwWlKLle1QcljwCi/AH7gFic)

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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqdkUFKxDAUhq/yyGZ0od0PnYIX8ALGRadNmWCahDQtSikMrgVhkC49Q0UEUcczvNzItONM6UrGXV7y/x8feTW50Pq8KhmZk7BIDNcWCmZLHVHJc62MhRoMy6CBzKgcZj46o5LKRMnCQrJiyQ1LL+OcFbDogydX16dUhsGO5Sl+sCzXIrbMTwBhyqsIN/iOL26NHW5dC67FL3zDLXZzqOsptWnCoK/0JN/mUpcW7J1mC0qG4FLdUgI89bMSq9ifq1iU/TM+46d7wFfs+suzXKVM7Fu/eEp2UiJeMgGZMgdKNLbDYHgekn9LpLHhfKLxhJ1bu9Y9HqWx50Rj/ziRiidWmanKxn/1h7vH738IjTy/vylnFAuDw7ZJ8wPGwPOA)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqdkU9KxDAUxq/yyEoX2v1QC17AC1gXmSbDBNMmZNIyUgqDa0EYpEvPUBFB1PEMLzcybW1LVzJCSN6/7+NHXkkutT4vck4WJNwkRmgbxRnfamUsML6iubRQxhkAo5aenPYxgOE2N9mQASRrntxydkVTvlnA9U1fr9rHX/6EwejuE8tTLanlPgMImSgi3OM7vrgdNnhwNbgav/AND9gsoCxn9lBVYdBKWievFpnOLdg7zS9i0g0u1TYmIJjPlVxTHxdU5m0bn/HTPeArNm3xLFWMy0H1ax+THkrSJZewUmZ0iSZ1GHTtbvJvCEaNEDOMJ2zcztXu8SiMwSea9MeBFCKxysxR9v6rP9w9fv8DaPLz+5v7TGBhMG6bVD+S4vdX)

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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqNkDFOxDAQRa8ychMowP3KG4l7uAnxRLJwbMtxglAUiTMgas6wIAqa5QzDjRhvlKVku5k///8nzSzuYrydRhQ7oYY22ZhhwDzGWnvbx5AyzJCwgwW6FHqo2Fppr30b/JAh2vYBDeyL5aqiN/qkLzpW19orubZxDy8Z++iajLwBKGOnml7Y+f7zTAc60vcO5nkrWxYli6ME2Wx9HDPkp4h7LVJjbNACrOEleORxatxYThu8SDd9MOhYXCtZkivZNffooAtpi9dbTMnT7X9qfizjmfpKH3S4mHkK12voj6jk+T9i+QWghpwC)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqNUEFOwzAQ/MrKl8IBco9MJP6Ri6m3koVrW8YOoCgSb0CceUNBHLiUNyw/Yl2T9NhKlr2zszNj7ShuQ7geMopWyId1NCF1vcOn4GMCjRuVbYKxdwBaJXVxWWuAiClHNyOAYNb3qFtY0Tt90TftV5WZysMXH9ks/gwSboNVCRkBSG2Gjl5Z9/H7Qjva008L4/jvCtMkmzJRhDxsXMgJ0nPAm15EpY3vBRjNwDvkclA2F2r+Smldbb1Gy81qya2mJlt1hxY2Ps7ybpbJ5sCdTk2PpVxS3+iTdmdnHsRdFR0TZbPsR0x/hRKf2Q==)

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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp1kEFqwzAQRa8yaOMW2nofFEPvoY1rKyCQJWHL3hhDmm67aLLoOZzSQmlJzjC6UUYxScgiyz//zWOYnj0799S1ks0Yb4paOQ+N9K3LhFGVs7WHHmq5gAEWta0gITQRRpjCmiaiWhZeljCP0F2S3AvD08lDBgpeVk7nXlIC4KXqMtzgL27DEkfc4X4GfX/RDANPIxNXCZ/m0D1WtpR6LtgJFOzoI8Q6r6yBUjX5iyZDl+tWEkkErsMbfod3wH8cwyv+4fgAuMct/oRl+AyrWH1RRSEeE1Y8nXTX8gw/bhXrW8XmqqCXHA+nwNPzR9hwAO3/m0Q=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp1kEFqwzAQRa8yaJMW2npvVEPv4Y0aTcGg2MKWTcEY0nTbRZNFz+GUBEJCcobRjTKKiSGLgJD05/95DNOKN2tfmhpFLGQ1LTPrkjTHT1uUDjR+qNo4aNMcQCunHh6HP0CJri7zqwKo0ODUoY5hMhlqXXj44iOjkczC4cwa5ZAVgNRZk9CKdrT2c+rpSKcY2nbkQdfJKGRCK8eHOjTPs0KjeU3FNZiKC48jhXVZkYPOKvVumNAoUyMnOUFL/00b/wN0oN5/0Z76J6ATrWnr5/7PL4L1zxaLMIxfyGjA3cIT+r1nLO8ZqxuDV3IZnIWMxo2I7gxWlp8b)

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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp1kE1OwzAQha8y8qawgJRtcCNxjroLlLjCkn9GySSALEscAXoS2LGBM5gbMU6o+JHY+Xm+9+ZporhCPJ9GLWohh7Y3SDBoGrFR3jgMPUGEXu8hwb4PDlaMrpRXvg1+KKjVLekONgU62e5OlZfVksMJLEg7tNekWQHIzkxNPuTX/PLxkJ/zW36vIcbvmJRkVZhiZXz5h+nMhU7bjRJHUAlwoyWDdglmNiCZ4Jv8KKuv55/B03+Dw68B15+XsJDVj/YsB7qf9y3A9thgB7EYb01HNzVcrNd4d6l8mi8xO0T6BLO8hZk=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp1UEGOwjAM/IqV0+5ht+y1m62076AcKmJEpLSNWreAqko8AXgJ3LjAG8KPcBuKAAkpij32eDxyI/6t/a4rFKGQ5bTQlqI4w6XNCwKFs6QyBE2cAaiEko9PnwMUSFWRDQigRINTQhXCeOJrbRf44yeDuzIDwtSahJARgFS6jtzOHd3hsnZ7d3LnEJrmrgdtK4OO040y3deh/kpzheYvFgMxFpCyV22NF2ZubknnWeQ2MrilL43tu8buqcH2+yUMZPDgnmFJq36fJ4wHBxN/mIVWNA/hZzSyy9/hEv2EaK/Jv4lw)

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
  <option v-for="option in options" :key="option.value" :value="option.value">
    {{ option.text }}
  </option>
</select>

<div>Вибрано: {{ selected }}</div>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNplkEFOwzAQRa8y8sYglWQfpZU4B2ZRJY4UKbGtxImQIkscAQprFpygIBbdlDMMN2Jsp6GoO3/P05//Z2K3xiTjIFnG8r7oamOhl3YwG6Hq1ujOwgSdrMBB1ekWOKFcKKEKrXqPNrKwsoS1h644PvHrv6k2tqbHPLwTCsjMygebAcc3/MIDHvkKxm0zSP/1zMGt/lOv+In7c2Z3ybz/POLhnHkhRqh7SpKnsRO1IWFla5qtlaQA8pgdxptWl7JZC3YqI1gACIkFCKl0R8Asa3VqJhhkYesyTIJcHCjmNMOJjwuOggXrNP7GKGlcHVIKm5f1uMEdXeeDmu3xiN+Z91mO7Vyeesb3Wzox9wsaxqrU)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp1kEFqg0AUhq/ymI0tpLqXaaDn6HQh8QUEo4M+JSBCj9CmXXfRE6Sli2zSM0xulDeOM7gJiMz//Hz+n4N40jruOxSpkO2mKTStVYV7XTcEOW6zriQYVAWQZ5Td3bszQIPUNZVPAC2WuCHMU4jMW7Ty41pTUVdtCs9+AjAA4Z4s+GX+zMmcoxX0WdmhHb1HMIa3l+yn+TXHJXm4RX5fXs1pSX4w6cEXd5gy3/iSSdDmQLjTZUbICUA6K+gfdnWO5aMSXlOJCWDEGTKyrRsG5lhUXl0JSKcm4WE8xbCBqw8zHFsFGOeyMnFTVyVxn55aKpJ50a/Ngf/eD9sezdn8p3aP78dLZGIZ6xecxHgFvDKt1Q==)

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
<input type="radio" v-model="pick" value="перший" />
<input type="radio" v-model="pick" value="другий" />
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

Вбудовані типи введення HTML не завжди відповідають вашим потребам. На щастя, компоненти Vue дозволяють створювати багаторазові поля введення з повністю налаштованою поведінкою. Ці поля працюють навіть з `v-model`! Щоб дізнатися більше, прочитайте про [використання з `v-model`](/guide/components/v-model) у гіді по компонентах.
