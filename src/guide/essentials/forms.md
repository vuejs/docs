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

# Binding per gli Input dei Form {#form-input-bindings}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-inputs-vue-devtools-in-vue-3" title="Lezione Gratuita sugli Input dell'utente con Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-inputs-in-vue" title="Lezione Gratuita sugli Input dell'utente con Vue.js"/>
</div>

Quando si gestiscono i form nel frontend, spesso è necessario sincronizzare lo stato degli elementi di input del form con il corrispondente stato in JavaScript. Può risultare laborioso collegare manualmente i binding dei valori e i listeners degli eventi di change degli input:

```vue-html
<input
  :value="text"
  @input="event => text = event.target.value">
```

La direttiva `v-model` ci aiuta a semplificare il tutto come segue:

```vue-html
<input v-model="text">
```

Inoltre, `v-model` può essere utilizzata su diversi tipi di input, elementi `<textarea>` e `<select>`. Si espande automaticamente in diverse coppie di proprietà DOM ed eventi in base all'elemento su cui viene utilizzata:

- Gli `<input>` di tipo testo e gli elementi `<textarea>` utilizzano la proprietà `value` e l'evento `input`;
- Gli `<input type="checkbox">` e gli `<input type="radio">` utilizzano la proprietà `checked` e l'evento `change`;
- Gli elementi `<select>` utilizzano `value` come prop e `change` come evento.

::: tip Nota
`v-model` ignorerà gli attributi iniziali `value`, `checked` o `selected` trovati su qualsiasi elemento del form. Considererà sempre lo stato JavaScript collegato come unica fonte di verità. Dovresti dichiarare il valore iniziale tramite JavaScript, usando <span class="options-api">l'opzione [`data`](/api/options-state.html#data)</span><span class="composition-api">le [reactivity APIs](/api/reactivity-core.html#reactivity-api-core)</span>.
:::

## Utilizzo di Base {#basic-usage}

### Text {#text}

```vue-html
<p>Il messaggio è: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
```

<div class="demo">
  <p>Il messaggio è: {{ message }}</p>
  <input v-model="message" placeholder="edit me" />
</div>

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNo9jUEOgyAQRa8yYUO7aNkbNOkBegM2RseWRGACoxvC3TumxuX/+f+9ql5Ez31D1SlbpuyJoSBvNLjoA6XMUCHjAg2WnAJomWoXXZxSLAwBSxk/CP2xuWl9d9GaP0YAEhgDrSOjJABLw/s8+NJBrde/NWsOpWPrI20M+yOkGdfeqXPiFAhowm9aZ8zS4+wPv/RGjtZcJtV+YpNK1g==)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNo9jdEKwjAMRX8l9EV90L2POvAD/IO+lDVqoetCmw6h9N/NmBuEJPeSc1PVg+i2FFS90nlMnngwEb80JwaHL1sCQzURwFm258u2AyTkkuKuACbM2b6xh9Nps9o6pEnp7ggWwThRsIyiADQNz40En3uodQ+C1nRHK8HaRyoMy3WaHYa7Uf8To0CCRvzMwWESH51n4cXvBNTd8Um1H0FuTq0=)

</div>

<span id="vmodel-ime-tip"></span>
::: tip Nota
Per le lingue che richiedono un [IME](https://en.wikipedia.org/wiki/Input_method) (Cinese, Giapponese, Coreano, ecc.), noterai che `v-model` non viene aggiornato durante la composizione IME. Se vuoi rispondere anche a questi aggiornamenti, utilizza il tuo listener dell'evento `input` e il binding del `value` invece di usare `v-model`.
:::

### Multiline text {#multiline-text}

```vue-html
<span>Il messaggio su più righe è:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="aggiungi più righe"></textarea>
```

<div class="demo">
  <span>Il messaggio su più righe è:</span>
  <p style="white-space: pre-line;">{{ multilineText }}</p>
  <textarea v-model="multilineText" placeholder="aggiungi più righe"></textarea>
</div>

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNo9jktuwzAMRK9CaON24XrvKgZ6gN5AG8FmGgH6ECKdJjB891D5LYec9zCb+SH6Oq9oRmN5roEEGGWlyeWQqFSBDSoeYYdjLQk6rXYuuzyXzAIJmf0fwqF1Prru02U7PDQq0CCYKHrBlsQy+Tz9rlFCDBnfdOBRqfa7twhYrhEPzvyfgmCvnxlHoIp9w76dmbbtDe+7HdpaBQUv4it6OPepLBjV8Gw5AzpjxlOJC1a9+2WB1IZQRGhWVqsdXgb1tfDcbvYbJDRqLQ==)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNo9jk2OwyAMha9isenMIpN9hok0B+gN2FjBbZEIscDpj6LcvaZpKiHg2X6f32L+mX+uM5nO2DLkwNK7RHeesoCnE85RYHEJwKPg1/f2B8gkc067AhipFDxTB4fDVlrro5ce237AKoRGjihUldjCmPqjLgkxJNoxEEqnrtp7TTEUeUT6c+Z2CUKNdgbdxZmaavt1pl+Wj3ldbcubUegumAnh2oyTp6iE95QzoDEGukzRU9Y6eg9jDcKRoFKLUm27E5RXxTu7WZ89/G4E)

</div>

Nota che l'interpolazione all'interno di `<textarea>` non funzionerà. Utilizza `v-model` al suo posto.

```vue-html
<!-- sbagliato -->
<textarea>{{ text }}</textarea>

<!-- corretto -->
<textarea v-model="text"></textarea>
```

### Checkbox {#checkbox}

Checkbox singola con valore booleano:

```vue-html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

<div class="demo">
  <input type="checkbox" id="checkbox-demo" v-model="checked" />
  <label for="checkbox-demo">{{ checked }}</label>
</div>

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNpVjssKgzAURH/lko3tonVfotD/yEaTKw3Ni3gjLSH/3qhUcDnDnMNk9gzhviRkD8ZnGXUgmJFS6IXTNvhIkCHiBAWm6C00ddoIJ5z0biaQL5RvVNCtmwvFhFfheLuLqqIGQhvMQLgm4tqFREDfgJ1gGz36j2Cg1TkvN+sVmn+JqnbtrjDDiAYmH09En/PxphTebqsK8PY4wMoPslBUxQ==)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNpVjtEKgzAMRX8l9Gl72Po+OmH/0ZdqI5PVNnSpOEr/fVVREEKSc0kuN4sX0X1KKB5Cfbs4EDfa40whMljsTXIMWXsAa9hcrtsOEJFT9DsBdG/sPmgfwDHhJpZl1FZLycO6AuNIzjAuxGrwlBj4R/jUYrVpw6wFDPbM020MFt0uoq2a3CycadFBH+Lpo8l5jwWlKLle1QcljwCi/AH7gFic)

</div>

Possiamo collegare anche più checkbox allo stesso array o valore [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set):

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
<div>Nomi selezionati: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
```

<div class="demo">
  <div>Nomi selezionati: {{ checkedNames }}</div>

  <input type="checkbox" id="demo-jack" value="Jack" v-model="checkedNames">
  <label for="demo-jack">Jack</label>

  <input type="checkbox" id="demo-john" value="John" v-model="checkedNames">
  <label for="demo-john">John</label>

  <input type="checkbox" id="demo-mike" value="Mike" v-model="checkedNames">
  <label for="demo-mike">Mike</label>
</div>

In questo caso, l'array `checkedNames` conterrà sempre i valori delle caselle attualmente selezionate.

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNqVkUtqwzAURbfy0CTtoNU8KILSWaHdQNWBIj8T1fohyybBeO+RbOc3i2e+vHvuMWggHyG89x2SLWGtijokaDF1gQunbfAxwQARaxihjt7CJlc3wgmnvGsTqAOqBqsfabGFXSm+/P69CsfovJVXckhog5EJcwJgle7558yBK+AWhuFxaRwZLbVCZ0K70CVIp4A7Qabi3h8FAV3l/C9Vk797abpy/lrim/UVmkt/Gc4HOv+EkXs0UPt4XeCFZHQ6lM4TZn9w9+YlrjFPCC/kKrPVDd6Zv5e4wjwv8ELezIxeX4qMZwHduAs=)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNqVUc1qxCAQfpXBU3tovS9WKL0V2hdoenDjLGtjVNwxbAl592rMpru3DYjO5/cnOLLXEJ6HhGzHxKmNJpBsHJ6DjwQaDypZgrFxAFqRenisM0BEStFdEEB7xLZD/al6PO3g67veT+XIW16Cr+kZEPbBKsKMAIQ2g3yrAeBqwjjeRMI0CV5kxZ0dxoVEQL8BXxo2C/f+3DAwOuMf1XZ5HpRNhX5f4FPvNdqLfgnOBK+PsGqPFg4+rgmyOAWfiaK5o9kf3XXzArc0zxZZnJuae9PhVfPHAjc01wRZnP/Ngq8/xaY/yMW74g==)

</div>

### Radio {#radio}

```vue-html
<div>Scelto: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

<div class="demo">
  <div>Scelto: {{ picked }}</div>

  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>

  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
</div>

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNqFkDFuwzAMRa9CaHE7tNoDxUBP0A4dtTgWDQiRJUKmHQSG7x7KhpMMAbLxk3z/g5zVD9H3NKI6KDO02RPDgDxSbaPvKWWGGTJ2sECXUw+VrFY22timODCQb8/o4FhWPqrfiNWnjUZvRmIhgrGn0DCKAjDOT/XfCh1gnnd+WYwukwJYNj7SyMBXwqNVuXE+WQXeiUgRpZyaMJaR5BX11SeHQfTmJi1dnNiE5oQBupR3shbC6LX9Posvpdyz/jf1OksOe85ayVqIR5bR9z+o5Qbc6oCk)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNqNkEEOAiEMRa/SsFEXyt7gJJ5AFy5ng1ITIgLBMmomc3eLOONSEwJ9Lf//pL3YxrjqMoq1ULdTspGa1uMjhkRg8KyzI+hbD2A06fmi1gAJKSc/EkC0pwuaNcx2Hme1OZSHLz5KTtYMhNfoNGEhUsZ2zf6j7vuPEQyDkmVSBPzJ+pgJ6Blx04qkjQ2tAGsYgkcuO+1yGXF6oeU1GHTM1Y1bsoY5fUQH55BGZcMKJd/t31l0L+WYdaj0V9Zb2bDim6XktAcxvADR+YWb)

</div>

### Select {#select}

Select singola:

```vue-html
<div>Selezionato: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

<div class="demo">
  <div>Selezionato: {{ selected }}</div>
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNp1j7EOgyAQhl/lwmI7tO4Nmti+QJOuLFTPxASBALoQ3r2H2jYOjvff939wkTXWXucJ2Y1x37rBBvAYJlsLPYzWuAARHPaQoHdmhILQQmihW6N9RhW2ATuoMnQqirPQvFw9ZKAh4GiVDEgTAPdW6hpeW+sGMf4VKVEz73Mvs8sC5stoOlSVYF9SsEVGiLFhMBq6wcu3IsUs1YREEvFUKD1udjAaebnS+27dHOT3g/yxy+nHywM08PJ3KksfXwJ2dA==)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNp1j1ELgyAUhf/KxZe2h633cEHbHxjstReXdxCYSt5iEP333XIJPQSinuN3jjqJyvvrOKAohAxN33oqa4tf73oCjR81GIKptgBakTqd4x6gRxp6uymAgAYbQl1AlkVvXhaeeMg8NbMg7LxRhKwAZPDKlvBK8WlKXTDPnFzOI7naMF46p9HcarFxtVgBRpyn1lnQbVBvwwWjMgMyycTToAr47wZnUeaR3mfL6sC/H/iPnc/vXS9gIfP0UTH/ACgWeYE=)

</div>

:::tip Nota
Se il valore iniziale della tua espressione `v-model` non corrisponde a nessuna delle opzioni, l'elemento `<select>` verrà visualizzato in uno stato "non selezionato". Su iOS, questo impedirà all'utente di selezionare la prima voce, poiché il iOS non scatena un evento di modifica in tale situazione. Per questo è consigliabile fornire un'opzione disabilitata con un valore vuoto, come mostrato nell'esempio precedente.
:::

 Select multiple (legate ad un array):

```vue-html
<div>Selezionato: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

<div class="demo">
  <div>Selezionato: {{ multiSelected }}</div>

  <select v-model="multiSelected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNp1kL2OwjAQhF9l5Ya74i7QBhMJeARKTIESIyz5Z5VsAsjyu7NOQEBB5xl/M7vaKNaI/0OvRSlkV7cGCTpNPVbKG4ehJYjQ6hMkOLXBwYzRmfLK18F3GbW6Jt3AKkM/+8Ov8rKYeriBBWmH9kiaFYBszFDtHpkSYnwVpCSL/JtDDE4+DH8uNNqulHiCSoDrLRm0UyWzAckEX61l8Xh9+psv/vbD563HCSxk8bY0y45u47AJ2D/HHyDm4MU0dC5hMZ/jdal8Gg8wJkS6A3nRew4=)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNp1UEEOgjAQ/MqmJz0oeMVKgj7BI3AgdI1NCjSwIIbwdxcqRA4mTbsznd2Z7CAia49diyIQsslrbSlMSuxtVRMofGStIRiSEkBllO32rgaokdq6XBBAgwZzQhVAnDpunB6++EhvncyAsLAmI2QEIJXuwvvaPAzrJBhH6U2/UxMLHQ/doagUmksiFmEioOCU2ho3krWVJV2VYSS9b7Xlr3/424bn1LMDA+n9hGbY0Hs2c4J4sU/dPl5a0TOAk+/b/rwsYO4Q4wdtRX7l)

</div>

Le opzioni della select possono essere rese dinamicamente con `v-for`:

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
  <option v-for="option in options" :key="option.value" :value="option.value">
    {{ option.text }}
  </option>
</select>

<div>Selezionato: {{ selected }}</div>
```

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNplkMFugzAQRH9l5YtbKYU7IpFoP6CH9lb3EMGiWgLbMguthPzvXduEJMqNYUazb7yKxrlimVFUop5arx3BhDS7kzJ6dNYTrOCxhwC9tyNIjkpllGmtmWJ0wJawg2MMPclGPl9N60jzx+Z9KQPcRfhHFch3g/IAy3mYkVUjIRzu/M9fe+O/Pvo/Hm8b3jihzDdfr8s8gwewIBzdcCZkBVBnXFheRtvhcFTiwq9ECnAkQ3Okt54Dm9TmskYJqNLR3SyS3BsYct3CRYSFwGCpusx/M0qZTydKRXWnl9PHBlPFhv1lQ6jL6MZl+xoR/gFjPZTD)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNp1kMFqxCAQhl9l8JIWtsk92IVtH6CH9lZ7COssDbgqZpJdCHn3nWiUXBZE/Mdvxv93Fifv62lE0Qo5nEPv6ags3r0LBBov3WgIZmUBdEfdy2s6AwSkMdisAAY0eCbULVSn6pCrzlPv7NDCb64AzEB4J+a+LFYHmDozYuyCpfTtqJ+b21Efz6j/gPtpn8xl7C8douaNl2xKUhaEV286QlYAMgWB6e3qNJp3JXIyJSLASErFyMUFBjbZ2xxXCWijkXJZR1kmsPF5g+s1ACybWdmkarLSpKejS0VS99Pxu3wzT8jOuF026+2arKQRywOBGJfE)

</div>

## Binding dei Value {#value-bindings}

Per radio, checkbox e le option delle select, i valori di binding per `v-model` sono solitamente stringhe statiche (o booleani per le checkbox):

```vue-html
<!-- `picked` è una stringa "a" quando è selezionata -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` è true o false -->
<input type="checkbox" v-model="toggle" />

<!-- `selected` è una stringa "abc" quando la prima option è selezionata -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

In alcuni casi potremmo voler collegare il valore a una proprietà dinamica sull'istanza attiva corrente. Possiamo usare `v-bind` per raggiungere questo obiettivo. Inoltre, utilizzando `v-bind`, possiamo collegare il valore dell'input a valori che non sono stringhe.

### Checkbox {#checkbox-1}

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />
```

`true-value` e `false-value` sono attributi specifici di Vue che funzionano solo con `v-model`. In questo caso, il valore della proprietà `toggle` verrà impostato su `'yes'` quando la casella è selezionata, e su `'no'` quando non è selezionata. Puoi anche collegarli a valori dinamici utilizzando `v-bind`:

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```

:::tip Suggerimento
Gli attributi `true-value` e `false-value` non influenzano l'attributo `value` dell'input, poiché i browser non includono le caselle non selezionate nell'invio dei form. Per garantire che uno dei due valori venga inviato in un form (ad esempio "sì" o "no"), utilizza invece gli input radio.
:::

### Radio {#radio-1}

```vue-html
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

`pick` sarà impostato al valore di `first` quando il primo input radio è selezionato, e sarà impostato al valore di `second` quando viene selezionato il secondo.

### Opzioni delle Select {#select-options}

```vue-html
<select v-model="selected">
  <!-- oggetto letterale inline -->
  <option :value="{ number: 123 }">123</option>
</select>
```

`v-model` supporta anche il binding di valori non-stringa! Nell'esempio sopra, quando l'opzione è selezionata, `selected` sarà impostato al valore dell'oggetto letterale `{ number: 123 }`.

## Modificatori {#modifiers}

### `.lazy` {#lazy}

Di default, `v-model` sincronizza l'input con i dati dopo ogni evento `input` (con l'eccezione della composizione IME come [indicato sopra](#vmodel-ime-tip)). Aggiungendo il modificatore `lazy`, la sincronizzazione avviene dopo gli eventi `change`, anziché dopo ogni evento `input`:

```vue-html
<!-- Sincronizzati dopo "change" al posto di "input" -->
<input v-model.lazy="msg" />
```

### `.number` {#number}

Se desideri che l'input dell'utente venga automaticamente convertito in un numero, puoi aggiungere il modificatore `number` agli input gestiti da `v-model`:

```vue-html
<input v-model.number="age" />
```

Se il valore non può essere interpretato con `parseFloat()`, verrà allora utilizzato il valore originale.

Il modificatore `number` viene applicato automaticamente se l'input ha `type="number"`.

### `.trim` {#trim}

Se vuoi che gli spazi bianchi inseriti dall'utente vengano rimossi automaticamente, puoi aggiungere il modificatore `trim` agli input gestiti da `v-model`:

```vue-html
<input v-model.trim="msg" />
```

## `v-model` con i Componenti {#v-model-with-components}

> Se non sei ancora familiare con i componenti di Vue, puoi saltare questa parte per ora.

I tipi di input integrati in HTML potrebbero non soddisfare sempre le tue esigenze. Fortunatamente, i componenti Vue ti permettono di costruire input riutilizzabili con un comportamento completamente personalizzato. Questi input funzionano anche con `v-model`! Per saperne di più, leggi la sezione [Utilizzo con `v-model`](/guide/components/v-model) nella guida ai Componenti.
