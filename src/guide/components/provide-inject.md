# Надавання / введення {#provide-inject}

> На цій сторінці передбачається, що ви вже прочитали [основи компонентів](/guide/essentials/component-basics). Прочитайте це спочатку, якщо ви новачок у компонентах.

## Прокидання реквізитів {#prop-drilling}

Зазвичай, коли нам потрібно передати дані від батьківського до дочірнього компонента, ми використовуємо [реквізити](/guide/components/props). Однак уявіть випадок, коли у нас є велике дерево компонентів, а глибоко вкладеному компоненту потрібне щось із компонента-предка. Маючи лише атрибути, ми мали б передати один і той самий атрибут по всьому батьківському ланцюжку:

![діаграма прокидання реквізитів](./images/prop-drilling.png)

<!-- https://www.figma.com/file/baI7BcyWw9apxsI4tZqLLA/prop-drilling-(Copy) -->

Зауважте, хоча компонент `<Footer>` може взагалі не піклуватися про ці атрибути, йому все одно потрібно оголосити та передати їх, щоб `<DeepChild>` міг отримати до них доступ. Якщо є довший батьківський ланцюг, більше компонентів буде задіяно на цьому шляху. Це називається «прокиданням реквізиту», і мати справу з ним точно нецікаво.

Ми можемо вирішити прокидання реквізитів за допомогою `provide` і `inject`. Батьківський компонент може служити **постачальником залежностей** для всіх своїх нащадків. Будь-який компонент у нащадковому дереві, незалежно від того, наскільки він глибокий, може **надавати** залежності, пропоновані компонентами в його батьківському ланцюжку.

![Схема надавання / введення](./images/provide-inject.png)

<!-- https://www.figma.com/file/ipsCQpV1evpFwKfmVFSkdy/provide%2Finject-(Copy) -->

## Надавання {#provide}

<div class="composition-api">

Щоб надати дані нащадкам компонента, скористайтеся функцією [`provide()`](/api/composition-api-dependency-injection.html#provide):

```vue
<script setup>
import { provide } from 'vue'

provide(/* ключ */ 'message', /* значення */ 'привіт!')
</script>
```

Якщо не використовується `<script setup>`, переконайтеся, що `provide()` викликається синхронно в `setup()`:

```js
import { provide } from 'vue'

export default {
  setup() {
    provide(/* ключ */ 'message', /* значення */ 'привіт!')
  }
}
```

Функція `provide()` приймає два аргументи. Перший аргумент називається **ключем введення**, який може бути рядком або `Symbol`. Ключ введення використовується компонентами-нащадками для пошуку потрібного значення для введення. Один компонент може викликати `provide()` кілька разів з різними ключами введення, щоб надати різні значення.

Другим аргументом є надане значення. Значення може бути будь-якого типу, включаючи реактивний стан, наприклад референція:

```js
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

Надання реактивних значень дозволяє компонентам-нащадкам, використовуючи надане значення, встановити реактивне з'єднання з компонентом-провайдером.

</div>

<div class="options-api">

Щоб надати дані нащадкам компонента, скористайтеся параметром [`provide`](/api/options-composition.html#provide):

```js
export default {
  provide: {
    message: 'привіт!'
  }
}
```

Для кожної властивості в об'єкті `provide` ключ використовується дочірніми компонентами для пошуку правильного значення для введення, тоді як значення є тим, що вводиться в кінцевому підсумку.

Якщо нам потрібно надати стан кожного екземпляра, наприклад дані, оголошені за допомогою `data()`, тоді `provide` має використовувати значення функції:

```js{7-12}
export default {
  data() {
    return {
      message: 'привіт!'
    }
  },
  provide() {
    // використовуйте синтаксис функції, щоб ми могли отримати доступ до `this`
    return {
      message: this.message
    }
  }
}
```

Однак зауважте, що це *не* робить введення реактивним. Нижче ми обговоримо, [як зробити введення реактивними](#working-with-reactivity).

</div>

## Надання на рівні програми {#app-level-provide}

Окрім надання даних у компоненті, ми також можемо надати на рівні програми:

```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* ключ */ 'message', /* значення */ 'привіт!')
```

Надавання на рівні програми доступне для всіх компонентів програми. Це особливо корисно під час написання [плагінів](/guide/reusability/plugins.html), оскільки плагіни зазвичай не можуть надавати значення за допомогою компонентів.

## Введення {#inject}

<div class="composition-api">

Щоб ввести дані, надані компонентом-предком, скористайтеся функцією [`inject()`](/api/composition-api-dependency-injection.html#inject):

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

Якщо надане значення є референцію, воно буде введено як є і *не буде* автоматично розгорнуто. Це дозволяє компоненту-приймачу зберігати реактивний зв'язок з компонентом-надавачем.

[Повний приклад реактивного надавання та введення](https://sfc.vuejs.org/#eNqFUktOwzAQvcrIm4DUxvuqICEWXMIbk0ybVI1t2W4RqiIhOAA7tlwBIZAQ3yu4N2LchLSloqySmXnvJfPmLdiJMel8hmzAhi6zpfHg0M/MsVBlZbT1sACLox4Yq+dljlDDyOoKEuIkHea0KKd5O0j5qoqiBBCKczi/bOmlGoNs9HyBcGalylfoFSyTimYy8+A1ZIVUY3RQSGNQRWKBFlOhMq2chwqdk2OEo6h2kISv5VV4CY/Lu+V1cihU+7cHSYtLej8MGg55syntSIXHykylR6oAhqUyMw/zfqVznB4J1rIEa8bNopyKIe+IrMcaH/qVNOnEaUVuLiJetAMn2ABWndgjZ2ItWOG9cQPO3SiLdk1cqu2Y01tqZ8qXFaboqv651RcOLQkL1tvQ4NSco+1bVDlZY/dp/oLu6EbZWqiaVumu93ck1nfrbr5utYffZ/IGf9fKbaV9uSzVBCks24ncDUgDW0fhnwTET0SPw334jIEKT/R8D2/hOXyEj+UtxAaER3q/Ca/hgQ676L5Wk4mkwaPI5lr1N4fIQ3c=)

Знову ж таки, якщо не використовується `<script setup>`, `inject()` має викликатися лише синхронно в `setup()`:

```js
import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  }
}
```

</div>

<div class="options-api">

Щоб ввести дані, надані компонентом-предком, скористайтеся параметром [`inject`](/api/options-composition.html#inject):

```js
export default {
  inject: ['message'],
  created() {
    console.log(this.message) // введене значення
  }
}
```

Введення обчислюються **перед** власним станом компонента, тому ви можете отримати доступ до ввдених властивостей у `data()`:

```js
export default {
  inject: ['message'],
  data() {
    return {
      // вихідні дані на основі введеного значення
      fullMessage: this.message
    }
  }
}
```

[Повний приклад надавання та введення](https://sfc.vuejs.org/#eNqNUt1KwzAUfpVDbqqwNfelCOKFD2G8qOvZ1rGmIcmmMAqiD+Cdt76CDAVRp6+QvpEnbffnhg5Kk/P7fV/OmbFTpcLpBFnEYtPTmbInQma5KrSFs2E2TqGvixyCkNeWTw2EFBJv6pQU+8lkbGEmJECvoDqJ0poIZm112fERpYtpluLRcZMIoNFOtFxaADkakwwwgsB9V7fuzc2rx+qOkHyw9Af96Iv5iiQZFnM1TiySBRA3gJyMmK8irMMaNd08UeHIFJKU1rCiDRjBiG6DJBjp87ZgQ2uViTg3/Z4XPTJhoQecbqGeSJvlGKLJu1e6uDaoqbFgtdK2ByfnFHVXo0xRo/6r56/Unb5L9SRlNYN94zrXiUy3Z7Z2HT64RsW68rDH3wDfncA2jS3u++hkcoQ9G8FF0K5FcPkvvqoPAPfkvvzyuBc6P92He3ULt6gewDvAzel+797dMwmdLbcOynrDYu6bbDIvfwCPoid7)

### Псевдонім введення \* {#injection-aliasing}

У разі використання синтаксису масиву для `inject` введені властивості відображаються в екземплярі компонента за допомогою того самого ключа. У наведеному вище прикладі властивість було надано в ключі `"message"` і введено як `this.message`. Локальний ключ такий самий, як ключ введення.

Якщо ми хочемо ввести властивість за допомогою іншого локального ключа, нам потрібно використовувати синтаксис об'єкта для опції `inject`:

```js
export default {
  inject: {
    /* локальний ключ */ localMessage: {
      from: /* ключ введення */ 'message'
    }
  }
}
```

Тут компонент знайде властивість, надану ключем `"message"`, а потім представить його як `this.localMessage`.

</div>

### Стандартні значення введення {#injection-default-values}

За промовчанням `inject` передбачає, що введений ключ надано десь у батьківському ланцюжку. Якщо ключ не надано, з'явиться попередження під час виконання.

Якщо ми хочемо, щоб введена властивість працювала з додатковими надавачами, нам потрібно оголосити значення за промовчанням, подібне до реквізитів:

<div class="composition-api">

```js
// `value` буде "значенням за промовчанням"
// якщо не було надано жодних даних, що відповідають "message".
const value = inject('message', 'значенням за промовчанням')
```

У деяких випадках може знадобитися створити значення за промовчанням шляхом виклику функції або створення екземпляра нового класу. Щоб уникнути непотрібних обчислень або побічних ефектів у випадку, якщо необов'язкове значення не використовується, ми можемо використовувати фабричну функцію для створення значення за замовчуванням:

```js
const value = inject('key', () => new ExpensiveClass())
```

</div>

<div class="options-api">

```js
export default {
  // необхідний синтаксис об'єкта
  // при оголошенні значень за замовчуванням для надавання
  inject: {
    message: {
      from: 'message', // це необов’язково, якщо для введення використовується той самий ключ
      default: 'значенням за промовчанням'
    },
    user: {
      // використовувати функцію фабрики для непримітивних значень, які є дорогими
      // для створення, або такі, які мають бути унікальними для екземпляра компонента.
      default: () => ({ name: 'Степан' })
    }
  }
}
```

</div>

## Робота з реактивністю {#working-with-reactivity}

<div class="composition-api">

Під час використання реактивних значень надавання та введення **рекомендується зберігати будь-які мутації реактивного стану всередині _надавача_, наскільки це можливо**. Це гарантує, що наданий стан і його можливі мутації розташовані в одному компоненті, що полегшує його підтримку в майбутньому.

Бувають випадки, коли нам потрібно оновити дані з компонента-приймача. У таких випадках ми рекомендуємо надати функцію, яка відповідає за зміну стану:

```vue{7-9,13}
<!-- всередині компонента провайдера -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('Північний полюс')

function updateLocation() {
  location.value = 'Південний полюс'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

```vue{5}
<!-- всередині компонента-приймача -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

Нарешті, ви можете обернути надане значення за допомогою [`readonly()`](/api/reactivity-core.html#readonly), якщо ви хочете переконатися, що дані, передані через `provide`, не можуть бути змінені компонентом-приймачем.

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

</div>

<div class="options-api">

Щоб введення були зв'язані реактивно із надавачем, нам потрібно надати обчислену властивість за допомогою функції [computed()](/api/reactivity-core.html#computed):

```js{10}
import { computed } from 'vue'

export default {
  data() {
    return {
      message: 'привіт!'
    }
  },
  provide() {
    return {
      // явно надати обчислювану властивість
      message: computed(() => this.message)
    }
  }
}
```

[Повний приклад реактивного надавання та введення](https://sfc.vuejs.org/#eNqNUktqIzEQvUqhTScQt/ZNJzDMYg4xmkWPuxy3sT5Ias+AaRhmDjC7bHOFEBII+V5BvlFKrbZjJyExCKRSPT1VvXpL9sWYfNEiK1jpxrYx/kSoRhptPXydNvMaJlZLyHLeRxGabQBLGGtpWo81dAMu5YXC3z2ixknVzgkpFPRgrVB5V9DTxN4dxUxd+ergMKEALPrWqnUEING56hQLyMLT6k+4CZers9Vf+iYmu7glFmP1oqlxD6J12QeEPT4BP21cPiQPt2mFolXyjTAUeJRmXnmkCKBsFPHAYiR1jfNjwQYSwVI69cgpKPnmITtiSb+RrEw+c1qR+H2NYkg4wUihVIhgJGmMBZt6b1zBuZuM4xxmLtf2lNMpt63yjcQcnRz9tPqXQ0vEgvWyDBycLhdoRxZVjRbtR5yvoG941+JQKxtbvOegb7ZS9a6NXq4GL+3hldTFy8v9ZrP1+dsJ7JaxU/t75TRqhmNfwPdsmHD249P/Tb8BhPPwGC0brmi/D3fhOjyEh9V/iBcQLun8L9yGC2p0ubYodL0BSx5JtivvngFIKVey)

Функція `computed()` зазвичай використовується в компонентах композиційного API, але також може використовуватися для доповнення певних випадків використання в опційному API. Ви можете дізнатися більше про його використання, прочитавши [основи реактивності](/guide/essentials/reactivity-fundamentals.html) і [обчислювані властивості](/guide/essentials/computed.html) із вподобанням API, встановленим як Композиційний.

:::warning Потрібна тимчасова конфігурація
Наведене вище використання вимагає налаштування `app.config.unwrapInjectedRef = true`, щоб введення автоматично розгортали обчислювані посилання. Це стане типовою поведінкою у Vue 3.3, і цю конфігурацію введено тимчасово, щоб уникнути поломки. Після 3.3 він більше не потрібен.
:::

</div>

## Робота з ключами типу Symbol {#working-with-symbol-keys}

Досі ми використовували ключі введення рядків у прикладах. Якщо ви працюєте у великій програмі з багатьма залежними надавачами або створюєте компоненти, які будуть використовуватися іншими розробниками, найкраще використовувати ключі введення типу Symbol, щоб уникнути можливих зіткнень.

Рекомендовано експортувати ключі типу Symbol в окремий файл:

```js
// keys.js
export const myInjectionKey = Symbol()
```

<div class="composition-api">

```js
// у компоненті-надавачі
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /* дані для надання */
})
```

```js
// в компоненті-приймачі
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

Дивіться також: [типізація надавання / введення](/guide/typescript/composition-api.html#typing-provide-inject) <sup class="vt-badge ts" />

</div>

<div class="options-api">

```js
// у компоненті-приймачі
import { myInjectionKey } from './keys.js'

export default {
  provide() {
    return {
      [myInjectionKey]: {
        /* дані для надання */
      }
    }
  }
}
```

```js
// в компоненті-приймачі
import { myInjectionKey } from './keys.js'

export default {
  inject: {
    injected: { from: myInjectionKey }
  }
}
```

</div>
