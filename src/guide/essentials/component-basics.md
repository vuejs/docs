# Основи компонентів {#components-basics}

Компоненти дозволяють нам розділити інтерфейс користувача на незалежні частини, які можна багаторазово використовувати, і думати про кожну частину окремо. Зазвичай програму організовують у дерево вкладених компонентів:

![Component Tree](./images/components.png)

<!-- https://www.figma.com/file/qa7WHDQRWuEZNRs7iZRZSI/components -->

Це дуже схоже на те, як ми вкладаємо рідні HTML-елементи, але Vue реалізує власну модель компонентів, яка дозволяє нам інкапсулювати власний вміст і логіку в кожному компоненті. Vue також чудово працює з рідними вебкомпонентами. Якщо вас цікавить зв'язок між компонентами Vue і рідними вебкомпонентами, [читайте деталі тут](/guide/extras/web-components.html).

## Оголошення компонента {#defining-a-component}

Коли використовується етап збірки, як правило, ми визначаємо кожен компонент Vue у спеціальному файлі за допомогою розширення `.vue`, відомого як [однофайловий компонент](/guide/scaling-up/sfc.html) (скорочено SFC, скорочено від (англ.) Single File Component):

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Ви натиснули на мене {{ count }} разів.</button>
</template>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">Ви натиснули на мене {{ count }} разів.</button>
</template>
```

</div>

Якщо не використовується етап збірки, компонент Vue можна визначити як звичайний об'єкт JavaScript, що містить параметри Vue:

<div class="options-api">

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      Ви натиснули на мене {{ count }} разів.
    </button>`
}
```

</div>
<div class="composition-api">

```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `
    <button @click="count++">
      Ви натиснули на мене {{ count }} разів.
    </button>`
  // or `template: '#my-template-element'`
}
```

</div>

Тут шаблон вбудовано як рядок JavaScript, який Vue збиратиметься на льоту. Ви також можете використовувати ID селектор, який вказує на елемент (зазвичай рідні елементи `<template>`) — Vue використовуватиме його вміст як джерело шаблону.

Наведений вище приклад визначає один компонент і експортує його як стандартний експорт файлу `.js`, але ви можете використовувати іменовані експорти для експорту кількох компонентів з одного файлу.

## Використання компонента {#using-a-component}

:::tip
Ми використовуватимемо синтаксис SFC для решти цього посібника - концепції навколо компонентів однакові, незалежно від того, використовуєте ви крок збірки чи ні. У розділі [Приклади](/examples/) показано використання компонентів в обох сценаріях.
:::

Щоб використовувати дочірній компонент, нам потрібно імпортувати його в батьківський компонент. Якщо припустити, що ми розмістили наш компонент лічильника у файлі під назвою `ButtonCounter.vue`, компонент буде виділено в стандартний експорт файлу:

<div class="options-api">

```vue
<script>
import ButtonCounter from './ButtonCounter.vue'

export default {
  components: {
    ButtonCounter
  }
}
</script>

<template>
  <h1>Ось дочірній компонент!</h1>
  <ButtonCounter />
</template>
```

Щоб показати імпортований компонент у нашому шаблоні, нам потрібно [зареєструвати](/guide/components/registration.html) його за допомогою параметра `components`. Після цього компонент буде доступний як тег із використанням ключа, під яким він зареєстрований.

</div>

<div class="composition-api">

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>Ось дочірній компонент!</h1>
  <ButtonCounter />
</template>
```

За допомогою `<script setup>` імпортовані компоненти автоматично стають доступними для шаблону.

</div>

Також можна глобально зареєструвати компонент, зробивши його доступним для всіх компонентів даного додатку без необхідності його імпорту. Плюси та мінуси глобальної та локальної реєстрації обговорюються в спеціальному розділі [Реєстрація компонентів](/guide/components/registration.html).

Компоненти можна повторно використовувати скільки завгодно разів:

```vue-html
<h1>Тут багато дочірніх компонентів!</h1>
<ButtonCounter />
<ButtonCounter />
<ButtonCounter />
```

<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNqVUltOAjEU3cq1P2qUqf6SkfjYRn+GoQjIdCZtB00IiUKM/36wAFeADyJRwS3c2ZG3M0AEjMZk0sw9bc/pPed22UmSeJ1UsjLzTaibia0I1YySWFs4Ta2N1VmcKis11HUcwbbHV1B3dVsoAKHkVX6pJutB2rbQdWgYE5OSyppyAcAqqYN6QtHn86U6FVZGSTuw0lXWbxxW8CEbZH3ARxzhM46yPs4AX3CW3WXD7BqntN4CvuEMP/CT1imOCexnQ3za8jkR5ESrDfF/gT5fPorts8KhUhQkXsvEitzL2xPzDSPYsmHByCNXC9awNjFlzk09dMa1jBfrc05/niahZiQ9aaJSVceXhqxtEcv+Nw5OYEfqkpaqJjWZ9wvn2tEN3oXx1MpGniuj8FOqtcAGO7uL/rS0qVaLymVOTGU4KGoS+TNiAL+aPwKOw3YzvDgSLCfZ2xMs3wbAe5wApeqSn2Q3lO0A3+cQUOaUNo6h2y3UodcDmooRvroB8HIFXkisJdn7AsrSMWw=)

</div>
<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNqVks1OAjEUhV/l2o0aYKpbMhB/XqMbGIuATGfSFlxMJlGIce+CB/AJ8IdIVPAV7ryRtzMTIxBJ3DS9p+05vf2asNM49kZDyerMN4HuxRaMtMO4KVQvjCNt4WxobaTOo6GyUkNHRyHse3xNdQb7Qvm8cKCzVFgZxoOWla6yfve4iY/ZJBsDPuEMX3CWjXEF+Iqr7D6bZje4pPEO8B1X+IlfNC5xTuI4m+Lzns/JIDdavw7/l+jzn0uxKiv6q4Wt2OubSNELJEIBiHLBCFaHXHEadehqwbrWxqbOuekEru2+8SJ9yWnmaQrqhdKTJqy1dXRt6GH65FL95cFJHEld01JdSC31Ls+NrVu+zjYVKqVWtmj8jTMBLTuQliALcEIFkTIWAmcADbfj4OhwB1AAv51Hwkkw6AVXDcHys5WKYPkyAD7gAoih47zIbonkBD9KCYgwscU5JEkZmqZAf2CGbw63lyfwImKDW/oN00cYNw==)

</div>

Зауважте, що під час натискання кнопок кожна з них підтримує власний окремий `count`. Це тому, що кожного разу, коли ви використовуєте компонент, створюється новий його **екземпляр**.

У SFC рекомендується використовувати `PascalCase` назви тегів для дочірніх компонентів, щоб відрізнити їх від рідних елементів HTML. Хоча рідні імена тегів HTML не чутливі до регістру, Vue SFC є скомпільованим форматом, тому ми можемо використовувати в ньому імена тегів з урахуванням регістру. Ми також можемо використовувати `/>`, щоб закрити тег.

Якщо ви створюєте свої шаблони безпосередньо в DOM (наприклад, як вміст рідного елемента `<template>`), шаблон підлягатиме стандартному синтаксичному аналізу HTML браузером. У таких випадках вам потрібно буде використовувати `kebab-case` і явні закривальні теги для компонентів:

```vue-html
<!-- якщо цей шаблон написаний у DOM -->
<button-counter></button-counter>
<button-counter></button-counter>
<button-counter></button-counter>
```

Дивіться [застереження щодо аналізу шаблону DOM](#dom-template-parsing-caveats) для отримання додаткової інформації.

## Передавання реквізитів {#passing-props}

Якщо ми створюємо блог, нам, швидше за все, знадобиться компонент, який представлятиме публікацію блогу. Ми хочемо, щоб усі публікації в блозі мали однаковий візуальний макет, але мали різний вміст. Такий компонент не буде корисним, якщо ви не зможете передати йому дані, наприклад назву та вміст конкретної публікації, яку ми хочемо показати. Ось тут і з’являється реквізит.

Реквізити — це власні атрибути, які можна зареєструвати в компоненті. Щоб передати заголовок до нашого компонента допису в блозі, ми повинні оголосити його в списку реквізитів, які приймає цей компонент, використовуючи <span class="options-api">параметр [`props`](/api/options-state.html#props)</span><span class="composition-api">макрос [`defineProps`](/api/sfc-script-setup.html#defineprops-defineemits)</span>:

<div class="options-api">

```vue
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title']
}
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

Коли значення передається до реквізитного атрибута, воно стає властивістю цього екземпляра компонента. Значення цієї властивості доступне в шаблоні та в контексті `this` компонента, як і будь-яка інша властивість компонента.

</div>
<div class="composition-api">

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

`defineProps` — це макрос часу компіляції, який доступний лише всередині `<script setup>` і не потребує явного імпорту. Оголошені властивості автоматично показуються в шаблоні. `defineProps` також повертає об’єкт, який містить усі властивості, передані компоненту, щоб ми могли отримати до них доступ у JavaScript, якщо потрібно:

```js
const props = defineProps(['title'])
console.log(props.title)
```

Також до вашої уваги: [Типізація реквізитів компонента](/guide/typescript/composition-api.html#typing-component-props) <sup class="vt-badge ts" />

Якщо ви не використовуєте `<script setup>`, реквізити слід оголошувати за допомогою параметра `props`, а об’єкт props буде передано до `setup()` як перший аргумент:

```js
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

</div>

Компонент може мати скільки завгодно реквізитів, і за замовчуванням будь-яке значення можна передати будь-якому реквізиту.

Після того, як реквізит зареєстровано, ви можете передати йому дані як спеціальний атрибут, наприклад:

```vue-html
<BlogPost title="Моя подорож з Vue" />
<BlogPost title="Ведення блогу з Vue" />
<BlogPost title="Чому Vue такий чудовий" />
```

Однак у типовій програмі ви, ймовірно, матимете масив публікацій у своєму батьківському компоненті:

<div class="options-api">

```js
export default {
  // ...
  data() {
    return {
      posts: [
        { id: 1, title: 'Моя подорож з Vue' },
        { id: 2, title: 'Ведення блогу з Vue' },
        { id: 3, title: 'Чому Vue такий чудовий' }
      ]
    }
  }
}
```

</div>
<div class="composition-api">

```js
const posts = ref([
  { id: 1, title: 'Моя подорож з Vue' },
  { id: 2, title: 'Ведення блогу з Vue' },
  { id: 3, title: 'Чому Vue такий чудовий' }
])
```

</div>

Потім показати компонент для кожного за допомогою `v-for`:

```vue-html
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
 />
```

<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9UslOwzAQ/ZWRLwGpTcRyikIl+AJOXDCH0LgQaGzLdgsoqoTgwBGJM3eu7PvyC84fMU6aKCyqFDl+43lv7DeTk1Up/fGIkZBEuq9SaXqUp5kUysDaUOysC21goEQGnh/UAUfwKAegnB2WqQkbxKOhgdxF+wL5nHGjwyoAjZRDk45bk9jEc/P1uWJmpHiNACTmInuzxgA5pEkICx0wqRmyEDx7aT+Lc7Bf9tPe4/YY/49gn2ADLzct0qYutqgX9gE5D/bDfjiJG/uG5LvidAZ9qUW/wux3zMZUKE7stX21z/YFirPi1F3F3jqIIrXGVrUpMS74RUFjNgLDMjmMDXPIRG2vqBl3B0KtUOIcgZRXzlDiMgHCfXY0PfPTxEUdJSwvWsdLUBF6UdNCLBUFTV3SIVXPu1ks/T0tOM5D2Qw6PcCSTTMpwf47TMmuMVKHQaAHfTcUe9oXaifAna9G3KQZ85nOuttKHGimUJiSqbGlRoDBMVNdxXjCFFOzNH+l/tGtvcWntMf0x1z/N6xSCawGm17pk4etmtUegGh3uZfn1SzAZBIFiH96OfkGoHw7nw==)

</div>
<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9UstOwzAQ/JWVLwGpTcTjFIVK8AU9cWk4lNZpUxrbst0iFEVC9MARiTN3rrzKu+UXnD9inbSlQNVTvLMz4+ysU7IvhDscUOKTQLVkLDQoqgeiFrI4EVxqSEHSCDKIJE/AQaqzaB30eafOlZ71XG8OWEekAYSsxRkSBIIK9qzVRsM2UojbPmxVQMe6T31wzI2Z5ldgvszUPOHxHL/PYF7gEK0gq/yItpdE12aM7LGZmIkV35sPlD3mo5XCnSXhLfI+kYckyC/MnXk3r+YN8st8ZK83D7ZEeciONkMWeGU2mAoWmiai39TUVjqYz1yMq4fViMu9kNiBIWbl4CGxTAD/hJ7Nem7ctqiV+MVPzfGiKAW1YBEoXhV4i3tJhZQbqCZN4fYUZ7i+tHCbNfBKHwrEYrgNW4ekq7VQvuepqGVX1FMulx0PT64cMB0n1KUqqR5LfqqoROOQFPHNPDwEh1RWJWVtKqlc5/mH+s/X2mK4GY6y/GhWPMM2jWJG65ILtdFwinictTsBCLq7tTQtlw1ZFnhY/w4w+wYlFCOy)

</div>

Зверніть увагу, як `v-bind` використовується для передачі динамічних значень реквізитів. Це особливо корисно, коли ви заздалегідь не знаєте точного вмісту, який збираєтеся показати.

Наразі це все, що вам потрібно знати про реквізити, але коли ви закінчите читати цю сторінку та відчуєте себе комфортно з її вмістом, радимо повернутися пізніше, щоб прочитати повний посібник по [реквізитах](/guide/components/props.html).

## Прослуховування подій {#listening-to-events}

Коли ми розробляємо наш компонент `<BlogPost>`, для деяких функцій може знадобитися зворотна комунікація з батьківським компонентом. Наприклад, ми можемо вирішити включити функцію доступності, щоб збільшити текст дописів блогу, залишивши решту сторінки розміру за замовчуванням.

У батьківському компоненті ми можемо впровадити цю функцію, додавши <span class="options-api">властивість даних</span><span class="composition-api">ref</span> `postFontSize`:

<div class="options-api">

```js{6}
data() {
  return {
    posts: [
      /* ... */
    ],
    postFontSize: 1
  }
}
```

</div>
<div class="composition-api">

```js{5}
const posts = ref([
  /* ... */
])

const postFontSize = ref(1)
```

</div>

Яку можна використовувати в шаблоні для керування розміром шрифту всіх публікацій блогу:

```vue-html{1,7}
<div :style="{ fontSize: postFontSize + 'em' }">
  <BlogPost
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
   />
</div>
```

Тепер давайте додамо кнопку до шаблону компонента `<BlogPost>`:

```vue{5}
<!-- BlogPost.vue, omitting <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button>Збільшити текст</button>
  </div>
</template>
```

Кнопка ще нічого не робить — ми хочемо, щоб натискання кнопки повідомляло батьківському компоненту, що він має збільшити текст усіх дописів. Щоб розв'язати цю проблему, компоненти забезпечують спеціальну систему подій. Батьківський компонент може обрати прослуховування будь-якої події в екземплярі дочірнього компонента за допомогою `v-on` або `@`, так само як ми робимо це з нативною подією DOM:

```vue-html{3}
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
 />
```

Тоді дочірній компонент може створити подію сам по собі, викликавши вбудований метод [**`emit`**](/api/component-instance.html#emit), передаючи назву події:

```vue{5}
<!-- BlogPost.vue, omitting <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Збільшити текст</button>
  </div>
</template>
```

Завдяки слухачу `@enlarge-text="postFontSize += 0.1"` батьківський компонент отримає подію та оновить значення `postFontSize`.

<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNqNU81u00AQfpWRheRWxDYBTpYbFQ6ckZC41D049ibd1t61djehxYoE7QEOSEgc4MKdKwUCoaXlFdZvxKz/6gKtGkW25+f7dmbnm8J6kOfufEYs3wpkLGiuRiGjWc6Fgocpnz7mUsFE8Axs12sdBmCHDCBkZL9KTcgkmqUKCuONOeIZYUr6tQM6KmMtBuaZRCpaW2/jgqiZYK0FkGMuordaG6AAmvgwHICiKiU+2PqjPi/fgv6tz/U3/HyB7++gf8BTLK45pA+924O+00vELPWZPjMUx/oUwV/Lo2vg93rwT5j9C7MxFcpD/Vmf6JX+CeWr8siUor8YE0laju2OzfT1iDP1hD5HpmHtrvLwgf/A64aAhiJZnkaKoAUQJHQOvlQHKdkIrQImHU2fFG6DTTJztlWhENe/e/ObOxMukMLAgLL6rkOrDft75KCJujTp+av220hlXAQ3CUsjMSWOIvuqybkoaQPuuMM2eRR0Oqr78rAx/Aq8rl1rYNUSdLIod3clZyjPShthE8B6O22FFsrR2KG1o1Qufc+Tk9hodFe6XEw9/HLFjCmaEZfIzBkL/kwSgcSh1Uym4vDQOSfCEYQlRBBxHedfqf/wtiPFVvpbc2nN/rc7ueB4GmzZ1QXbtXJIRqttsPu3bG/fSDFxGkmJExljFY4ZSyWMUGF45/6oKGpVw2IReGg3kfFMKc5gM05pvIfgW6aCtcvHryOR/qCPy/f6tHxTvtYrXIWV2YelPilfloeBV9NcOeXFH1jGon0=)

</div>
<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9U01v00AQ/SsjC8mpiG0CnCwnKkhwroTEpeaQOOt0W3vX2t0EimUJ2gMckJA4wIU7VwoEQkvLX1j/I2b9kbjQkkt25s17uzPznFv3ssxdzInlW4GMBM0USKLm2ShkNM24UJCDIDEUEAuego2l9hq6n/DZDpeqwVyvTRhFLAMIWcQZFmSYlDA0Ur1dA+RApz4M+qCoSogPtv6oL8q3oH/rC/0Njy/w/zvoH/AYpaDob0i3O6R3eonVS32uzw35RJ8h7Wt5fCXxTof4Cet+YR0WQXmkP+tTvdI/oXxVHpvr9RcTIj1kT7ZC1m3jIWfqEX1Omm4GCAdePTocGgaKpFkyVsREKpjSBfhSHSZkGFo5xA3bv6x1E2ySmussZAH+gnaUdQiwcGIuUMLQgLJ6oqHVwv4BOWxQl047+arjFqmCDbhNWDIWM+Io8kw1NZsnDeGWO2iLR8F6udULAw8bw1Pgrdu1+lbtCycdZ+6+5AxNlVcuaAB8rw9VxuTQIyYOrT2lMul7nowjY5x96XIx8/DkijlTNCUukakzEfypJAKFQ6taaqPhYXJBhCMImxJBxP80/yr9R9fI4soLbKVr5Ss+jimJKSM7gmeyt2tXc7WNU+r8g5Qqk+/Ot4KvdQpO1DglSsZS4iYmeLtj1rExxN7dUZ7XBoaiCDyMG2QyV4oz2I4SGh0g+QbB63uXL99CIf1Bn5Tv9Vn5pnytV+j6lbH+Up+WL8ujwKtlrt1u8QftKI+s)

</div>

Додатково ми можемо оголосити випромінені події за допомогою <span class="options-api">параметра [`emits`](/api/options-state.html#emits)</span><span class="composition-api">макросу [`defineEmits`](/api/sfc-script-setup.html#defineprops-defineemits)</span>:

<div class="options-api">

```vue{5}
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title'],
  emits: ['enlarge-text']
}
</script>
```

</div>
<div class="composition-api">

```vue{4}
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
defineEmits(['enlarge-text'])
</script>
```

</div>

Це документує всі події, які випромінює компонент, і додатково [їх перевіряє](/guide/components/events.html#events-validation). Це також дозволяє Vue уникнути неявного застосування їх як рідних слухачів до кореневого елемента дочірнього компонента.

<div class="composition-api">

Подібно до `defineProps`, `defineEmits` використовується лише в `<script setup>` і не потребує імпорту. Він повертає функцію `emit`, яка еквівалентна методу `emit`. Його можна використовувати для випромінювання подій у розділі `<script setup>` компонента, де `emit` недоступний безпосередньо:

```vue
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>
```

Також до вашої уваги: [Типізація випромінювань компонента](/guide/typescript/composition-api.html#typing-component-emits) <sup class="vt-badge ts" />

Якщо ви не використовуєте `<script setup>`, ви можете оголосити випромінювані події за допомогою параметра `emits`. Ви можете отримати доступ до функції `emit` як до властивості контексту `setup` (передається `setup()` як другий аргумент):

```js
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
}
```

</div>

Наразі це все, що вам потрібно знати про події спеціальних компонентів, але коли ви закінчите читати цю сторінку та відчуєте себе комфортно з її вмістом, ми рекомендуємо повернутися пізніше, щоб прочитати повний посібник щодо [власних подій](/guide/components/events).

## Передавання вмісту за допомогою слотів {#content-distribution-with-slots}

Так само як і з елементами HTML, часто корисно мати можливість передавати вміст до компонента, наприклад:

```vue-html
<AlertBox>
  Сталося щось погане.
</AlertBox>
```

Що може показати щось на зразок:

:::danger Це помилка для демонстраційних цілей
Сталося щось погане.
:::

Цього можна досягти за допомогою спеціального Vue-елемента `<slot>`:

```vue{4}
<template>
  <div class="alert-box">
    <strong>Це помилка для демонстраційних цілей</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

Як ви бачите вище, ми використовуємо `<slot>` як підмінний елемент, замість якого ми хочемо розмістити вміст – і все. Ми закінчили!

<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9Ul1q3DAQvspUfchLbLWlLMV1F9Jz6MW2tFuntiRG8tZlyUP7Vij0CCU3CIRAyO8VtDfKyOt1NgkE+0Hzzcw3M9/Mmh1Zm646xTKWuwpr6+dC16016OGoUei/mh4WaFo4SPkOiAkHQgMIrfohVKpF0TUe1hGtDOVrpb3LYP3IciI0/TmfypDhVWubwqto+XwXShZx+3C6+R3OwnW42/za/IPNn+HxF8J9uAvn5LkNF+mQOHVGmTmfSNkh246StIVNj53RNObQohgdTjDqMSIRo7GiLdg3763LOHeLKs567FKDS06vFDvt61alyrVJieaHU0jEgh3ucXACVwoTVFoqVPga57PQF7yRNgpHo+yrH9e1px1ALusVVE3h3BfBihiZlKYXbHCS23k0ejkP/0m6m3BJol6Fsze0jC0+RpXIp4TGeNhaOSfyp8oOy3P+Z6PAVcYqSUg6ld2dQWMwg7ez2exztEuDNGMG720PzjS1BFRyz5NgIeuObuaj7QfYFlLWepnBh3cjUhbV9yWaTstkx774FD/ykkrxILcDxQ6EH2NimWE54/3Ftufs5AGQ8hlb)

</div>
<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9UV1O4zAQvsqs94EXEu+uVtUqm63EnsMvSeyWQGJbY6cUoT7AGxISR0DcAAkhIX6v4N6IcdJWBSTkF883M998880J27M2nXWKZSx3FdbWg1O+s2Oh69Ya9LDXKPT/zRwmaFrYSfkaiG07Qud86KMOCrxqbVN4FSOfr0spAhA+XC/Pwk14DC/L0+UlLM/7zwWE1/ASbinzHO7SvnEzhDpzviFlu2xQlbSFTQ+c0aT7pCdfJZxgGfRIxEhhjAXb9966jHM3qaLsA5canHL6pdhpX7cqVa5NSjRHTiERC7a7xcEJnClMUGmpUOFXnB9KP/FG2oXQC1pl28jo/5Z3ALmsZ1A1hXP/BCtiZVKauWB9ktLOo9HTcbgi657CPZn6EG6+0TEGfFVVIt80NMbDEOWcyN872x/P+eNGgauMVZKQdDN2cLQyjcEMvo9Go78xLg3Sjhn8tHNwpqkloJJbmQQLWXcug9923sO2kLLW0wx+/VghZVEdTtF0WiZr9smf+ChLLpH/elgoKhB+VRPH9MeJNXFlkj1mizdaYAhM)

</div>

Наразі це все, що вам потрібно знати про слоти, але коли ви закінчите читати цю сторінку та відчуєте себе комфортно з її вмістом, рекомендуємо повернутися пізніше, щоб прочитати повний посібник про [слоти](/guide/components/slots).

## Динамічні компоненти {#dynamic-components}

Іноді корисно динамічно перемикатися між компонентами, наприклад, в інтерфейсі з вкладками:

<div class="options-api">

[Відкрийте приклад в пісочниці](https://sfc.vuejs.org/#eNqVVc1u1DAQfpVROCxITdJSxCFsK3rjyIFb04M3cXbTJnZkO9utVisBEhJHDogDT1EhEAui9BWyb8TYTrzZtltRJYo8f9/MfLHHc++oqoJpTb3IG8pE5JU6jFleVlwoeMVLCpngJQyCUAvaceDMr7lU0tmNtOlwJJJJPl1DtHLrBBAzOjOOKc1IXSiYa23CMZpRpmRkFWAK2bFLk6Zdt3haWBhVShR5/KSLElTVgnUSAtdCIOwbMopgoCEHLQ6AIiPMdtyJAPN1Gc4ZCjKiBYrN5+Zv82f1pfnW/G4uB23yuwJNtTcjr5vl6l2zvC+u7awf+Wn1dvVB5+zHndjFwlAQM3yHofuLKChaVgVRFCWAYZpPISmIlAexl9KSx57Ro2VUK8UxoC1m6mdcoBPSAjkz7MSes0Zn9MIa+8oO+HiABt8CYv1zIInCVqIe/XBwcKBBA9cyLE56WC+TIk/OEKsfshngvNsOkMC58TB8wcIwgo2FthDNhkJxnTDKdbHrBLHnqDGNHQ5D52zZC5E+XA3DHqkoSnVR6GWgGbWbLeNM+Rkp8+IiAkmY9CUVefZC20ZcpFREsFfNQPIiT+ERpbRn8gVJ8xp349NqZtQVSdOcjVGxizH7+DHqkohxznzFKwSjZV834thzGcGzzrfG/FhDQRPcXAx7Mlo+pSIr+Lk/i4DUiqMSacNO1j/Q9uMqeI4F7HWgbblYgF/QTLm692/bRT6ebHPYoCJJEmPC/yI5miqeM0WFdSfJ2VjwmqURPMp29XNX0z7C9fUmt1Njg732oonmwDa5AU939XPLP7B7+T8CWpftHTpOWz7t0TV7ydvx7AD1S1IFp5IzHM4GL24NeBrdbIw9HKdajr2JUpWMwlBmiZ6xpzLgYhziKhA1UznObypLfyT4Oe4HBI69dpAYjBCVyIaPBwKLpuI+zBuut3C7eYStdPeGvmC2jyN75mw1drw2l6uPzRUOvF+AU1YrrvF71fxA5fstBxLTuWvoAfm+3oSH5ic0392ovkTrcnvK3rX2gKRunmPS5YOaXPwD8BHE6w==)

</div>
<div class="composition-api">

[Відкрийте приклад в пісочниці](https://sfc.vuejs.org/#eNqVVctu00AU/ZWRWaSV4riliIVJEN2xZMGuZuHY42Rae8aaGaetokiAhMSSBWLBV1QIRECU/oLzR5yZcRynJYjGkuV777mPc+y5mXvHZTmYVdQLvaFKJCs1UVRX5dOIs6IUUpPnoqAkk6IgvUFgDAPvteEXQmnVxq21DTiWyZTNNiUaexs0J5JmZNGAXIhEPBFcaZJUUlKuX8ZjMjK4vV79sf5d/1p9qr/UP+ur3n7E11gdjxVQc6ST27DQculvQjf1cvWmXiJg524iH1avV+9MEvzNsBFfRHwYOIEgDQxNizKPNYVFyDBlM5LksVKjyEtpISLP+hEZV1oLJBgDv5mfCQnQXiLAnINWn+TxmOb7hHE7feS14PCMXgJr4133utNJDwm+69DrQ8Q40Zg23FJsNHINyOJVp8azJGfJGWpsibvdqaFAyHy+LgEZLKvANTVSaJgtGRIyM5jhcbKpjMatOghBnGHQpjgBAyiIp2HQ0RWm0pe5eRwYUd1bzQTXfhYXLL8MiYq58hWVLHtiYmMhUypDclheECVylpIHlNJOyJdxyioVkoflhXWXcZoyPoHjADlHuFl3EcsJ474WJYrRousbCzAvQvJoja3QHzPkNNEh4eBkvWJGZZaLc/8iJHGlBZwQD0w2r8zxaSd4jAEO10WbcTGAn9NMt3Mf3Y1LNpnuAmxJkSSJDeHFKIFQKRjXVDp4nJxNpKh4GpIH2YG5/kbaR7mu3/Zu3SDYoRdOjQaO5FZ5emCuO/iB+3r/I6GB7GbYatro6U6v/Za8vud2jl/E5eBUCY7VZ+tFTQAnMHQdjA+7yNiRN9W6VGEQqCwxu+tUDYScBHgayIprhr1IVeGPpTjH94DCkWf3SVMjgBNq+DgRGJrKf9W8Bb1T15QFowWorPexWd+7N5I7c24atxPrq9X7+hpL7gfBajSOG9yv629wvt1xINGuXe/36Pf5dnlSfyf113b9XiG63N2y83dxj6btDkfT5b1ILv4A+Kmejg==)

</div>

Це стало можливим завдяки елементу `<component>` Vue зі спеціальним атрибутом `is`:

<div class="options-api">

```vue-html
<!-- Компонент змінюється, коли змінюється поточна вкладка -->
<component :is="currentTab"></component>
```

</div>
<div class="composition-api">

```vue-html
<!-- Компонент змінюється, коли змінюється поточна вкладка -->
<component :is="tabs[currentTab]"></component>
```

</div>

У наведеному вище прикладі значення, передане в `:is`, може містити:

- рядок імені зареєстрованого компонента, АБО
- фактичний імпортований об'єкт компонента

Ви також можете використовувати атрибут `is` для створення звичайних елементів HTML.

Під час перемикання між декількома компонентами за допомогою `<component :is="...">` компонент буде демонтовано, коли з нього буде перемкнуто. Ми можемо змусити неактивні компоненти залишатися «живими» за допомогою вбудованого [компонента `<KeepAlive>`](/guide/built-ins/keep-alive.html).

## Застереження щодо аналізу шаблону DOM {#dom-template-parsing-caveats}

Якщо ви пишете свої шаблони Vue безпосередньо в DOM, Vue доведеться отримати рядок шаблону з DOM. Це призводить до деяких застережень через власну поведінку браузерів під час аналізу HTML.

:::tip
Слід зазначити, що обмеження, описані нижче, застосовуються, лише якщо ви пишете свої шаблони безпосередньо в DOM. Вони НЕ застосовуються, якщо ви використовуєте шаблони рядків із таких джерел:

- Однофайлові компоненти
- Вбудовані рядки шаблону (наприклад, `template: '...'`)
- `<script type="text/x-template">`
  :::

### Нечутливість до регістру {#case-insensitivity}

Теги HTML і назви атрибутів нечутливі до регістру, тому браузери сприйматимуть будь-які символи верхнього регістру як малі. Це означає, що коли ви використовуєте шаблони DOM, назви компонентів в PascalCase та назви реквізитів у в регістрі camelCase або назви подій `v-on` повинні використовувати свої еквіваленти у регістрі kebab (розділені дефісами):

```js
// camelCase в JavaScript
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
}
```

```vue-html
<!-- kebab-case в HTML -->
<blog-post post-title="привіт!" @update-post="onUpdatePost"></blog-post>
```

### Закривальні теги {#self-closing-tags}

Ми використовували закривальні теги для компонентів у попередніх зразках коду:

```vue-html
<MyComponent />
```

Це пояснюється тим, що синтаксичний аналізатор шаблону Vue розглядає `/>` як вказівку на закінчення будь-якого тегу, незалежно від його типу.

Однак у шаблонах DOM ми завжди повинні включати явні закривальні теги:

```vue-html
<my-component></my-component>
```

Це тому, що специфікація HTML дозволяє лише [декільком конкретним елементам](https://html.spec.whatwg.org/multipage/syntax.html#void-elements) опускати закривальні теги, найпоширенішими є `<input>` і `<img>`. Для всіх інших елементів, якщо ви опустите закривальний тег, рідний синтаксичний аналізатор HTML вважатиме, що ви не завершили відкривальний тег. Наприклад, такий фрагмент коду:

```vue-html
<my-component /> <!-- ми маємо намір закрити тег тут... -->
<span>привіт</span>
```

will be parsed as:

```vue-html
<my-component>
  <span>привіт</span>
</my-component> <!-- але браузер закриє його тут. -->
```

### Обмеження розміщення елементів {#element-placement-restrictions}

Окремі елементи HTML, як-от `<ul>`, `<ol>`, `<table>` і `<select>`, мають обмеження щодо того, які елементи можуть з’являтися в них, а певні елементи, наприклад `<li>`, `<tr>` і `<option>` можуть з'являтися лише всередині деяких інших елементів.

Це призведе до проблем під час використання компонентів з елементами, які мають такі обмеження. Наприклад:

```vue-html
<table>
  <blog-post-row></blog-post-row>
</table>
```

Спеціальний компонент `<blog-post-row>` буде видалено як недійсний вміст, що призведе до помилок в остаточному відтвореному виведенні. Ми можемо використати спеціальний атрибут [`is`](/api/built-in-special-attributes.html#is) як обхідний шлях:

```vue-html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

:::tip
При використанні в нативних елементах HTML, значення `is` має мати префікс `vue:`, щоб інтерпретуватися як компонент Vue. Це потрібно, щоб уникнути плутанини з рідними [власними вбудованими елементами](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example).
:::

Це все, що вам наразі потрібно знати про застереження щодо аналізу шаблонів DOM – і, власне, кінець _Основам_ від Vue. Щиро вітаю! Ще є чому навчитися, але спочатку ми рекомендуємо зробити перерву, щоб пограти з Vue самостійно - створіть щось веселе або перегляньте [приклади](/examples/), якщо ви ще цього не зробили.

Коли ви відчуєте себе комфортно зі знаннями, які ви щойно засвоїли, перейдіть до посібника, щоб дізнатися більше про компоненти.
