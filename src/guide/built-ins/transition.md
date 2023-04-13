<script setup>
import Basic from './transition-demos/Basic.vue'
import SlideFade from './transition-demos/SlideFade.vue'
import CssAnimation from './transition-demos/CssAnimation.vue'
import NestedTransitions from './transition-demos/NestedTransitions.vue'
import JsHooks from './transition-demos/JsHooks.vue'
import BetweenElements from './transition-demos/BetweenElements.vue'
import BetweenComponents from './transition-demos/BetweenComponents.vue'
</script>

# Перехід {#transition}

Vue пропонує два вбудовані компоненти, які можуть допомогти працювати з переходами та анімацією в залежності від зміни стану:

- `<Transition>` для застосування анімації, коли елемент або компонент входить і виходить з DOM. Про це йдеться на цій сторінці.

- `<TransitionGroup>` для застосування анімації, коли елемент або компонент вставляється в список `v-for`, видаляється з нього або переміщується всередині нього. Це описано в [наступному розділі](/guide/built-ins/transition-group).

Окрім цих двох компонентів, ми також можемо застосовувати анімацію у Vue за допомогою інших методів, таких як перемикання класів CSS або керована станом анімація за допомогою прив’язки стилів. Ці додаткові методи описано в розділі [методи анімації](/guide/extras/animation).

## Компонент `<Transition>` {#the-transition-component}

`<Transition>` є вбудованим компонентом: це означає, що він доступний у будь-якому шаблоні компонента без необхідності його реєстрації. Його можна використовувати для застосування анімацій входу та виходу до елементів або компонентів, переданих йому через слот за промовчанням. Вхід або вихід може бути ініційований одним із таких способів:

- Умовний рендерінг через `v-if`
- Умовне відображення через `v-show`
- Перемикання динамічних компонентів через спеціальний елемент `<component>`
- Зміна спеціального атрибута `key`

Ось приклад найпростішого використання:

```vue-html
<button @click="show = !show">Переключити</button>
<Transition>
  <p v-if="show">Привіт</p>
</Transition>
```

```css
/* ми пояснимо, що ці класи роблять далі! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

<Basic />

<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNpVkEFKxDAUhq/y7GYUnHY2bmpm0Du4zCaGVwy2SUheK0MpyHgHt95BGBhE8QrpjUymZRhXyf/z/x/vvT67tzbvWszKjHnplCXwSK3dcK0aaxxBDw4rGKBypoFFjC645loa7WP0ybzAOgUuybV4xTUrJkrsR0HY2FoQRgXAHlsio+FO1ko+r3k2ty/Sy7NN+Aj78TXsw3f4Cj/j27gLB1ZMpQnw4IT2itSso2OhW6pqZiXGbyQcwuf4Pu5YkbaIoeJfjxVnU0XpaVunb94tURO6pZCkOrw+OjWKDmcH+kSjE6sEY4VUtIVVfuMBhcdbrocEPbHS0c5JZCbK3CxhNVXi2Y5jZMMfsyaZFQ==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNpVkEFqwzAQRa8y1aqF2s6mG1cJ7R269EZ1xlTUkYQ0dhtCoKR36LZ3KARCaekV5BtVtpzggNDM//AfM7Nh98akbYMsZ9yVVhpaFApfjbYES6xEUxNsCgWwFCQur2IPYJEaq44KwD3plxzINhidbV/CFx7PTtwgCFemFoRBAfDHhkgruCtrWT7PC9ZjYA4XfS3Ywn/6fffm9/7Hf/vf7r3b+QPPYigCHqxQTpIcdXAMtImsRlbP+AuEg//qProdz0yMZWc5nk2mCtLRuu7btE1QEdpElCRbvB6cGkWLoxP3pxMrB21EKWkNs/TGAQqHt8MNJqzK6tWURDpSxmQOsxgJZxvGYNt/cbWc7A==)

</div>

:::tip
`<Transition>` підтримує лише один елемент або компонент як вміст свого слота. Якщо вміст є компонентом, компонент також повинен мати лише один кореневий елемент.
:::

Коли елемент у компоненті `<Transition>` вставляється або видаляється, відбувається наступне:

1. Vue автоматично перевяє, чи застосовано цільовому елементу CSS переходи або анімацію. Якщо це так, кілька [класів переходу CSS](#transition-classes) буде додано/видалено у відповідний час.

2. Якщо є слухачі для [хуків JavaScript](#javascript-hooks), ці хуки викликатимуться у відповідний час.

3. Якщо переходів/анімацій CSS не виявлено та не вказано хуки JavaScript, операції DOM для вставки та/або видалення виконуватимуться в наступному кадрі анімації браузера.

## Переходи на основі CSS {#css-based-transitions}

### Перехідні класи {#transition-classes}

Існує шість класів, які застосовуються для переходів входу/виходу.

![Діаграма переходу](./images/transition-classes.png)

<!-- https://www.figma.com/file/rlOv0ZKJFFNA9hYmzdZv3S/Transition-Classes -->

1. `v-enter-from`: Початковий стан для входу. Додається перед вставленням елемента, видаляється через один кадр після вставлення елемента.

2. `v-enter-active`: активний стан для входу. Застосовується протягом всієї фази введення. Додається перед вставленням елемента, видаляється після завершення переходу/анімації. Цей клас можна використовувати для визначення тривалості, затримки та кривої послаблення для початкового переходу.

3. `v-enter-to`: Кінцевий стан для входу. Додається один кадр після вставки елемента (одночасно видаляється `v-enter-from`), видаляється після завершення переходу/анімації.

4. `v-leave-from`: Початковий стан для виходу. Додається негайно, коли запускається вихідний перехід, видаляється після одного кадру.

5. `v-leave-active`: Активний стан для виходу. Застосовується протягом усього періоду виходу. Додається негайно, коли запускається вихідний перехід. Видаляється, коли перехід/анімація завершується. Цей клас можна використовувати для визначення тривалості, затримки та кривої послаблення для вихідного переходу.

6. `v-leave-to`: Кінцевий стан для виходу. Додається з наступним кадром після запуску вихідного переходу (одночасно видаляється `v-leave-from`), видаляється після завершення переходу/анімації.

`v-enter-active` та `v-leave-active` дають нам можливість вказати різні криві послаблення для переходів входу/виходу, приклади яких ми побачимо в наступних розділах.

### Іменовані переходи {#named-transitions}

Перехід можна назвати за допомогою реквізиту `name`:

```vue-html
<Transition name="fade">
  ...
</Transition>
```

Для іменованого переходу класи переходів будуть мати префікс свого імені замість `v`. Наприклад, застосований клас для вищезгаданого переходу буде `fade-enter-active` замість `v-enter-active`. CSS для переходу fade має виглядати так:

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

### Переходи CSS {#css-transitions}

`<Transition>` найчастіше використовується в поєднанні з [власними переходами CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions), як показано в базовому прикладі вище. Властивість CSS `transition` — це скорочення, яке дозволяє нам указати кілька аспектів переходу, включаючи властивості, які мають бути анімовані, тривалість переходу та [криві послаблення](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function).

Ось більш розширений приклад переходу між кількома властивостями з різною тривалістю та кривими послаблення для входу та виходу:

```vue-html
<Transition name="slide-fade">
  <p v-if="show">Привіт</p>
</Transition>
```

```css
/*
  Анімації входу та виходу можуть по-різному використовувати
  функції тривалості та часу.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```

<SlideFade />

<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqFkc1Kw0AQx19lzMUWm6YqgtQo+g4ePOSyjRNcTHaXzaR+lILUB/Dm1VeQQrGI1VfYvJGzTbE9FLwkM8N/f7/9GAUXxnSHFQb9IC5TKw1BiVSZs0TJwmhLMAKLGYwhs7qAXY7uJipRqVYlR2/0HZz6QItshe1ExVFD4fXcEBYmF4S+o3hQEWkF52ku09vTJFit3vH/JDhzb25WP7mZ+3KfblE/1xM3hxbX327qPty7W/D0BfaAm4Wb+xCHl8N2HDVwFgHEl1aoUpJkmRIFelUurzHMxDWyyGc4ZWAYymy1D+//YfvcTevXehJH/gY4FK1ZPIijzROpuKSH3JfdNT9ERWhDkZIcIow8hP4QfRB5Dr3uYQkoSgx1RSeJGnvWJiJHMcR/EMclpNVApuEAHyXa1n6Hh0f+c9yB/fY2bLMz/46dbT7SG65M26LflP64V62Dnrn3VABtRCrpoQ+9RsJPvryGYPwLaDTl1Q==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqFkU1Kw0AUx6/yzKrFpmkVodRp0Tu4cJHNNHnBwXwMk5fYWgpSD+DOrVeQQrGI1StMbuRMo22FgjDMvPdn+P3fx9S5lLJdFuj0HZYHSkga+imOZaYIQox4ERNM/RQg5MQbzToGUEiFSn8zgPwmu+sDqQJrZWYfc5nDvC3XJISJjDmhzYiNCqIshYsgFsHtwHcsBgZwZF/fGeoXvawe9FJ/6He9rh6ruV5Bw8SfeqHf9KteG/UJjsEka72yn8znjdhkXg03RgDsSvE0FySMWcoTtFaxCNGNeIjGqC6aSShdEf3UYf2/jPtKL6rnas48WaO8HcsIzNvvKGU5TWIbtnd8F1NC5fKARIn1yGiL6AOPY+i0T3NAnqObFXS+GdtfRIy8xH8QvRyCYiQCd4T3AlWj2zLimb16Leg2D2HryiKVJa1DfpTteUWZSuyKTWjbvW6cdOTYUgEyyQNBkz50ahOz8s0YnNk3+MXprA==)

</div>

### CSS анімації {#css-animations}

[Рідні анімації CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) застосовуються так само, як переходи CSS, з тією різницею, що `*-enter-from` видаляється не відразу після вставки елемента, а після події `animationend`.

Для більшості анімацій CSS ми можемо просто оголосити їх у класах `*-enter-active` і `*-leave-active`. Ось приклад:

```vue-html
<Transition name="bounce">
  <p v-if="show" style="text-align: center;">
    Привіт ось якийсь стрибучий текст!
  </p>
</Transition>
```

```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
```

<CssAnimation />

<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqNks9K9DAUxV/lWvhQ4etMFWbTqaLv4LKbWG412KYhSasyDOgM7ly79R0UZRAdX+HmjbyZDjorEQI3f37ncHKTSXSs9aBrMUqjzBZGagcWXasPcyVr3RgHEzBYwhRK09Swzeh2rnJVNMoyet5cwkEAdpxpcTdX2bB3YT0vHNa6Eg7DymWnrXONgqOiksXFQR6t1Vuh5tEhPdKLv6EXeqc3+vBzP6NFNuxFbACQnRihrHSSTZSokS1Om1YVyOJwzoSGLpbl2juPwLrrKnC1MGdSxa7RKewn+moMDq9cLCp5plIoUDk0428bAHrkJAt68g9+9h9o6W/9PfgZby79HS2APv2Nn9MrfdCSnmnJZxz8jbGZn2+twwxDF0P9yc0b2XCzKypbReTpoL9LvMoSi8LJDmESDAQ/hQjqFNaMVJAMRnacq+mPsELR4d+E/GIdGou9wdEFXpeGG2o3sJVB8q+vAC5coWxMnYItRIU7yS6LAVgOMPqF2xvsjzbQveQ39hvkwT9p1Zlo+gU5TgDR)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqNUsFq20AQ/ZWJoJBAZSkBX2QlpP/Qoy4bZZwukVbLaqQ6hEBq01vPveYfWlJMaNxfmP2jjrS261MoCO3O7HuPt2/2Pvpg7aTvMMqivC2dtnRRGFzYxhFc41x1FcF9YQCuFanjk7AHcEidM7sKoP3UfM6AXIeh8zAs8pMvT/a6UhDWtlKEQ0X5VUfUGLgsK13enhfRIAPncDSsRXTBT/zsH/mZf/MLv/qVX/I6TwJJBADyj06ZVpMWEaNqFImrpjMlCjkYyS30sZ5vtYsIWrqrBlyt3I02MTU2g7PULmZAuKBYVfrGZFCiIXSzvQwAP4mTNf/w3/3yPfDGf/HfwC+lufFfeQ38xz/6Ff/iV97wT97ImRh/EdjSr462ZhIbbCf/fEsjTw5TMfloUbaTcJd49BKrknSPIXJldK0GdgZbjDaQTqbtbIx8R6xQ9fh/RJloj67FIHB5i3dzJ4G2B7BRIH23GzoNV5g3rs6gLVWFx+mJkLejn76BO52cTQ+gp+lb2D0wvKQxmejhLxgOBKg=)

</div>

### Користувацькі класи переходу {#custom-transition-classes}

Ви також можете вказати користувацькі класи переходів, передавши наступні реквізити до `<Transition>`:

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

Вони замінять звичайні назви класів. Це особливо корисно, коли ви хочете поєднати систему переходів Vue з існуючою бібліотекою анімації CSS, такою як [Animate.css](https://daneden.github.io/animate.css/):

```vue-html
<!-- припустимо, що Animate.css включено на сторінку -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">Привіт</p>
</Transition>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqNUcFKAzEQ/ZWYS/XQDQVPNS31CwTxGChpmrWp2SQkk6qUgtR/8Oo/CIUiir+Q/SOz3bV6NJdkZt57mTezxpfOFaso8RDTILxygIKE6MbMqMpZD2iNvCzRBpXeVqiXoT1mmBHWhAxd2Hs0agCn4KM8Y4aSViXzcwCycpqDbCKgswhgDZoIrcTdiOGOfdLcDI/Ta9rVT2mXPtJ7+qyf623aU9KSsgBC9MZzExQom7VRPoZXMuuIGMBWfaF5CDIw3BalAen7XIBaybaWoTy7yv1Mp91jjo4Z4HP+w9WSZ9L/uTMbjZBXEa7V7QJalUPLuWmHVn1VdnYbm1/Z5D691S/1lpJm0BlEfq3lBCV/B2dogEfdPCfdShheALgwJETMzTIUQts4LzX3shC2InzJH4hWs0C6BgsRAjkvBsXgmKmUabIMXxx2dvgAb74Bo7bGfA==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqNUVFKAzEQvUrMl350Q8GvmpZ6AkH8XChpNrWp2SQkk1opBal38Nc7CIUiilfI3shkt61+CiEz8ybzZl5mja+tLZZB4AGmnjtpYVRqsbLGAarEjAUFaF1qhCoG7Pyi8xFyAoLTxwghPzePAwQuiA7ZZJOudCg58aYARG0VA5EjoNMAYDQacyX5w7DEmQYN0Vm2JR7Ft7hrnuMufsaP+NW8NNu4p6QrSgQI0TvHtJcgTeLOfTWrReLhwYOpe1wx74UvcZcUGoTrMQ5yKbpcesq0rNM8k8nBqdAJAVaxY60SLBX9v3ZqgubiJsCtvJ9Dx9KOnIa2aNmTs4PcLPM7idzH9+a12VJiO2XkV1oCKPn7cZp6eFLZHcu6XVWJ5wDWDwjhlV74gisTqpliThTc1IQt2IooOfXkMGDBvSeXRb/on5Ba6oyW+KrdWdsAb34AQl7KUw==)

</div>

### Використання переходів і анімації разом {#using-transitions-and-animations-together}

Vue потрібно приєднати слухачів подій, щоб знати, коли перехід закінчився. Це може бути `transitionend` або `animationend`, залежно від типу застосованих правил CSS. Якщо ви використовуєте лише один або інший, Vue може автоматично визначити правильний тип.

Однак, у деяких випадках ви можете мати обидва на одному елементі, наприклад мати анімацію CSS, ініційовану Vue, разом із ефектом переходу CSS при наведенні. У цих випадках вам доведеться явно оголосити тип, про який Vue має піклуватися, передавши реквізит `type` зі значенням `animation` або `transition`:

```vue-html
<Transition type="animation">...</Transition>
```

### Вкладені переходи та явні тривалості переходів {#nested-transitions-and-explicit-transition-durations}

Хоча класи переходу застосовуються лише до прямого дочірнього елемента в `<Transition>`, ми можемо використовувати переходи у вкладених елементах за допомогою вкладених селекторів CSS:

```vue-html
<Transition name="nested">
  <div v-if="show" class="outer">
    <div class="inner">
      Привіт
    </div>
  </div>
</Transition>
```

```css
/* правила, спрямовані на вкладені елементи */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}

/* ... інший необхідний CSS пропущено */
```

Ми навіть можемо додати затримку переходу до вкладеного елемента під час входу, що створює послідовність анімації входу в шаховому порядку:

```css{3}
/* затримка введення вкладеного елемента для шахового ефекту */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}
```

Однак це створює невелику проблему. За промовчанням компонент `<Transition>` намагається автоматично визначити, коли перехід завершився, прослуховуючи **першу** `transitionend` або `animationend` подію в кореневому елементі переходу. З вкладеним переходом бажана поведінка повинна чекати, поки завершаться переходи всіх внутрішніх елементів.

У таких випадках ви можете вказати тривалість переходу (у мілісекундах) за допомогою властивості `duration` компонента `<transition>`. Загальна тривалість має відповідати затримці плюс тривалість переходу внутрішнього елемента:

```vue-html
<Transition :duration="550">...</Transition>
```

<NestedTransitions />

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqVVFFu00AQvcpgPtqGJk6pglTjViB+OEA/QPLPZj2OV7V3rd110iqKhMod+OUOSJUqBOIKzo2Y9TqJE0CAEsm7szPvvXmz9jJ4XVWjeY1BFMSGa1FZMGjr6iqRoqyUtrAEjRmsINOqhCNKPUpkIrmShlJztYBLl3BsdY0niYxDj0L1tLFYVgWzSDuAeFpbqyS84oXgN5dJ0FU/cc8kuGo+Nw/rD81D86352nxff1zfN49x6Is8wLVm0ggrCCStNXMLgplMxkkAkpVIG4nGYkporoBKUjGH+VBkHR0l8oIZQ1tVW9TbxC51cyik3B0m1v2aHyTusfmy/rS+39aEVLSh2q7jcCeUAnHYs4G2xt4VbjlqFZzCqCWDJR3aKeM3M61qmUbwFBFfOryKpamQswjOx9VtGymFHOYoZrmN4Gzsoyt3QKgdGi0B9uA45700b9QQJWkYMm7FHElKFy2QzbGLemF221EErChgPDo3gMzgkKRQIx45HECKBbuDFgBURto1UQAWWLrnINxRH5IA7EiGLUxENM8nxmMfanb38fQQzaoeUqZ0Gfmlc//9sfPvpDVQVYwL6wg24CR9gcCZpPaM6kkBT7BpwUBtaBibqKEwt0qbvdb6rnbz/UXq3mk3r/90uaVxLu9L/JuUw4n+o9l/aoQ83+H+3vp3PevDQXsD7Vu6m8DaywkM3uTEgHDxAqb1DISEnMm06BndTaxnkRn5F+86FwboL5WlZEwpmeqVzUnRVKuFQZqO0luKi2ewoDMEynBsHiVnBqaIEjJxi2kL7WzsX5XReHzm7aGvXPsSB6uf5qXewA==)

Якщо необхідно, ви також можете вказати окремі значення для тривалості входу та виходу за допомогою об’єкта:

```vue-html
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

### Зауваження щодо продуктивності {#performance-considerations}

Ви можете помітити, що показані вище анімації здебільшого використовують такі властивості, як `transform` і `opacity`. Ці властивості ефективні для анімації, оскільки:

1. Вони не впливають на макет документа під час анімації, тому не запускають дорогий розрахунок макета CSS для кожного кадру анімації.

2. Більшість сучасних браузерів можуть використовувати апаратне прискорення графічного процесора під час анімації `transform`.

Для порівняння, такі властивості, як `height` або `margin`, перебудовують макет CSS, тому їхня анімація набагато дорожча, і їх слід використовувати з обережністю. Ми можемо переглянути такі ресурси, як [тригери CSS](https://csstriggers.com/), щоб побачити, які властивості перебудовують макет, якщо ми їх анімуємо.

## JavaScript хуки {#javascript-hooks}

Ви можете підключитися до процесу переходу за допомогою JavaScript, прослухавуючи події в компоненті `<Transition>`:

```html
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>
```

<div class="composition-api">

```js
// викликається перед тим, як елемент буде вставлено в DOM.
// використовуйте це, щоб встановити стан "enter-from" елемента.
function onBeforeEnter(el) {}

// викликається з наступним кадром після вставки елемента.
// використовуйте це, щоб почати анімацію виходу.
function onEnter(el, done) {
  // викликає зворотний виклик done, щоб вказати кінець переходу.
  // необов'язковий, якщо використовується в поєднанні з CSS.
  done()
}

// викликається після завершення переходу enter.
function onAfterEnter(el) {}
function onEnterCancelled(el) {}

// викликається перед виходом.
// у більшості випадків ви повинні просто використовувати хук для виходу.
function onBeforeLeave(el) {}

// викликається, коли починається вихід.
// використовуйте це для запуску анімації виходу.
function onLeave(el, done) {
  // викликає зворотний виклик done, щоб вказати кінець переходу.
  // необов'язковий, якщо використовується в поєднанні з CSS.
  done()
}

// викликається, коли вихід закінчився, і
// елемент видалено з DOM.
function onAfterLeave(el) {}

// доступно лише з переходами v-show.
function onLeaveCancelled(el) {}
```

</div>
<div class="options-api">

```js
export default {
  // ...
  methods: {
    // викликається перед тим, як елемент буде вставлено в DOM.
    // використовуйте це, щоб встановити стан "enter-from" елемента.
    onBeforeEnter(el) {},

    // викликається з наступним кадром після вставки елемента.
    // використовуйте це, щоб почати анімацію виходу.
    onEnter(el, done) {
      // викликає зворотний виклик done, щоб вказати кінець переходу.
      // необов'язковий, якщо використовується в поєднанні з CSS.
      done()
    },

    // викликається після завершення переходу enter.
    onAfterEnter(el) {},
    onEnterCancelled(el) {},

    // викликається перед виходом.
    // у більшості випадків ви повинні просто використовувати хук для виходу.
    onBeforeLeave(el) {},

    // викликається, коли починається вихід.
    // використовуйте це для запуску анімації виходу.
    onLeave(el, done) {
      // викликає зворотний виклик done, щоб вказати кінець переходу
      // необов'язковий, якщо використовується в поєднанні з CSS
      done()
    },

    // викликається, коли вихід закінчився, і
    // елемент видалено з DOM.
    onAfterLeave(el) {},

    // доступно лише з переходами v-show.
    onLeaveCancelled(el) {}
  }
}
```

</div>

Ці хуки можна використовувати в поєднанні з переходами/анімаціями CSS або окремо.

При використанні лише JavaScript переходів, як правило, гарною ідеєю буде додати властивість `:css="false"`. Це явно вказує Vue пропустити автоматичне виявлення переходів CSS. Окрім трохи більшої продуктивності, це також запобігає випадковому втручанню правил CSS у перехід:

```vue-html{3}
<Transition
  ...
  :css="false"
>
  ...
</Transition>
```

Завдяки `:css="false"` ми також несемо повну відповідальність за контроль завершення переходу. У цьому випадку зворотні виклики `done` потрібні для хуків `@enter` і `@leave`. В іншому випадку хуки будуть викликані синхронно, і перехід завершиться негайно.

Ось демонстрація використання [бібліотеки GreenSock](https://greensock.com/) для виконання анімації. Звичайно, ви можете використовувати будь-яку іншу бібліотеку анімації, наприклад [Anime.js](https://animejs.com/) або [Motion One](https://motion.dev/).

<JsHooks />

<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqNVMtu00AU/ZWLEUoixY+mRFTGLQXEDokNC5C8GdvjZIg9M5oZp6miSAg+hK+ohBD8g/NH3PGD2Czarjz33Mc59yHvnddSetuKOqET6VQxaUBTU8mrmLNSCmVgD4rmcIBciRImGDr551ppIjvcPtER81RwjTXW4gYubebUqIrOrCeveGqY4CD4G5oLRd9xQ9WUFjPYxxyaah6SIzJvEQCdkoJ+CiHwFsv5APo8goQkKTO3IZxZ+4BsB/sYUfZkc8gEp0NKI4aMWaWITcFiQ0LUMLJRQG+f2DuAEk1DmNCCaMNSj/EPlZkuvOUczmaTPom/FaUsqMFIK2ggfCT7PSVbOpYdm3tlB96LRwrfhXAeBI8R3at7YGK4kq5ahnVwIgHm/zeknu+eAUR+e4l4g2gYimHEULQAoqQyBgdznRYs3VzGTndoT+w3dq7qH/Xd8Wt9V/+uf9V/jt+P3+qfkd8mNeWwxEdFuGZWcavkOmmu0aX2QrDk6Dxjpws6ecd4YRfU4M2qejxMtUY0J4XusEY/0mdsCylO2brtNN1E7GIHti7Lu36wj8jHsLZj/6QXgcgfzANNbW4L+/T6Uu1WEpJuVkpUPAvh6fNFcnFx/tLiJVErxl0jZAiLQO4a8IZlZm1vobPXlK3WZgAkQmVUuYpkrNIhLINnCLeL6uidudP+E9wS7+OLFhx/KI2SuHPo2An7i2kbt0DsrI2ROvT9isvNyktF6Vvfq1JkVdFNDpkOzuEvgPGLBQ==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqNVNFu0zAU/ZVLEOomtUnWMTGFbgwQb0i88ACSX9zEbU0TO7Jvuk5TJQQfwldMQgj+If0jrp1kTXgYk6om99zre46Pb3wbvC7LcFOJIAlmNjWyxEumZFFqg7C0vISF0QWM3OuIKQCmxNYnM7HgVY5w69CMIz86bt4BjMDKqC4CsCt9nQCaSjTIzj12Y/dfCFzpzCaumCFDrd6IhTbinUJhfAWAVsPoveAb34n60I+pRaVSlFpRrrf6SOStIic+tAIJGXeqbMpz8SmBOJyetZ099HkA6ZKnEm8SOPF8x57QmdCj7MjGkGkl+pSo+4xZZbhbQs36hKRhEJOALj6wt4DgViQwEjm3KNNQqg8VHk3DszGcHI/u/XmrizIXSJVOUE/4QLZ3cSib4YOy4/DFI4VvEziN48eI7tT9xzE6krZbRn3IkZjW/2NSx/eAAbPofsQpQEFlHAVFALN5hTR9cJXmMl1fsMANLVzAE/dkwWX9o77bf63v6t/1r/rP/vv+W/1zFjWLfDtq8dFwZaVT3Ci5mvtpnAg3IdRyMJ4saIsO2SGeuwPyeDPwLZ6k1hK64LltMa+f6DO5gZRcdmnn5mSutyyAzUQu2v3QPmYRlTU7jg56CZhFPT8otHiTu9ewa9Wcypyn66XRlcoSePp8Oj8/P33pP2RullJNUJcJTONy68FrmeHKzUIbr4RcrrAHzLXJhJkYnsmKLoGz+BnBzUG19ME4aG6jSUHz8cVqRTeVV8LahGWBvz6cB83GHcCCFWJpkyiqVLlehqkuIpd7Veisylvn3AUS7P4CJCKmlQ==)

</div>

## Багаторазові переходи {#reusable-transitions}

Переходи можна повторно використовувати через систему компонентів Vue. Щоб створити багаторазовий перехід, ми можемо створити компонент, який обгортає компонент `<Transition>` і передає вниз вміст слота:

```vue{5}
<!-- MyTransition.vue -->
<script>
// JavaScript логіка хука...
</script>

<template>
  <!-- обернути вбудований компонент Transition -->
  <Transition
    name="my-transition"
    @enter="onEnter"
    @leave="onLeave">
    <slot></slot> <!-- передати вміст слота -->
  </Transition>
</template>

<style>
/*
  необхідний CSS...
  примітка: уникайте використання <style scoped>
  тут це не стосується вмісту слота.
*/
</style>
```

Тепер `MyTransition` можна імпортувати та використовувати так само, як і вбудовану версію:

```vue-html
<MyTransition>
  <div v-if="show">Привіт</div>
</MyTransition>
```

## Перехід появи {#transition-on-appear}

Якщо ви також хочете застосувати перехід до початкового рендерингу вузла, ви можете додати властивість `appear`:

```vue-html
<Transition appear>
  ...
</Transition>
```

## Перехід між елементами {#transition-between-elements}

Окрім перемикання елемента за допомогою `v-if` / `v-show`, ми також можемо переходити між двома елементами за допомогою `v-if` / `v-else` / `v-else-if`, якщо ми переконаємося, що в будь-який момент відображається лише один елемент:

```vue-html
<Transition>
  <button v-if="docState === 'saved'">Редагувати</button>
  <button v-else-if="docState === 'edited'">Зберегти</button>
  <button v-else-if="docState === 'editing'">Відмінити</button>
</Transition>
```

<BetweenElements />

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqdU91qE0EUfpXD3qSFbhIr3qyboM+gN8LeTHYn6dDZmWVnNlhCwFZUBK/rlaBvkKqVoG19hTNv5NmZpEmxherCwvx85/vO+c6ZWfS0qrrThkdJlJq8FpUFw21TDTMlykrXFmZQ8zHMYVzrEjoE7WQqU7lWxkKh82eWWQ6DFrTTMWzKi85uptJeICMa2lheVpJg7c6mpmIKjD2SfJBFJasnQsW1mBzYBPb71cssGuInXLgTXLpjvHSn7sR92AP3Hq/wDNxbXOJP/EXH7/ASrwB/47l7Rf8buv9OMRQHeOFO8Qe4Y9otCLbAC1wmlBRJUxIAaSGmkEtmDOUwsiqmeiwTitck32ZJeT6vmTLCCq1AsbJN1khR8LipPAb8l44aawkxjcWYEBtDBgNY2ZFFa/D6e5JLkR/egEOHF8J69BA/4zmVssBv7jV+DVakvSB0izCXht+mfk14b3mhJl7/I54FUymD/9cObPcSXxs1xC/U3AX17a7C096mLaGTPWolrdLe9pSp1A8YLbs3uguzNqYQhpBHCQgl6TQeSZ0fPm5vKh2oE5pn4hJT7o8PeJjPB7yk/bwVWFng+TZRbGS0bGwb5VHd9cjEXFlexyxvOfe2LySn4lcXgc5eV0iEUkK/u//IAGdktW7sXdT+ffp4XbFcWCqv75P3dGNdl0lYth692HlIT233b66QjdX/wBRvUdET875H8z8jEKrb)

## Режими переходу {#transition-modes}

У попередньому прикладі вхідні та вихідні елементи анімовані одночасно, і нам довелося зробити їх `position: absolute`, щоб уникнути проблеми з макетом, коли обидва елементи присутні в DOM.

Однак у деяких випадках це не варіант або просто не бажана поведінка. Ми можемо захотіти, щоб вихідний елемент анімувався спочатку, а вхідний елемент вставлявся лише **після** завершення анімації виходу. Оркеструвати таку анімацію вручну було б дуже складно – на щастя, ми можемо ввімкнути таку поведінку, передавши `<Transition>` реквізиту `mode`:

```vue-html
<Transition mode="out-in">
  ...
</Transition>
```

Ось попередня демонстрація з `mode="out-in"`:

<BetweenElements mode="out-in" />

`<Transition>` також підтримує `mode="in-out"`, хоча він використовується набагато рідше.

## Перехід між компонентами {#transition-between-components}

`<Transition>` також можна використовувати з [динамічних компонентів](/guide/essentials/component-basics#dynamic-components):

```vue-html
<Transition name="fade" mode="out-in">
  <component :is="activeComponent"></component>
</Transition>
```

<BetweenComponents />

<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqtkk1OwzAQha8yygaQ2qYbNiGt1HIDxDIbN5mCJce24klQVHXDMbgHOwpXCDdinKRt2rJBIovIP2++N+OZTbCwdlKVGERB7NJCWgKHVNp5omVuTUGwAfcslDIvD7iGLawLk8MVR1wdFPcmt4v+YhK2O488FSxPBMtekOgwhNLh0IMMiMrIDFIWGo2aYIVSP0GGaFUNZuWwqDBLdGq0IxApyQo9tRPPBrDrNpubRMdhVx3XxRvC3CpB6HcUK7FCxUvgL5balgRUW5wlQSEyaZIAqnFuMlR8cmbGd1ElVOnFrVUSzGHhUXF4xP6nw9I7LC8cHguhnSRpNGiRe/FaZMjBHss7U9JYao7tkzi+bSTdb67zODxoOovw6MEHcTh8RB07qpVfTrzvmIOwGHfQ0f5QoaiwP4SNZ9KBGIGxIpVUw3Ry6wCFw7tEbz16SPQzdMbjcWlZfXwE0y6QO96mFIy6zuynfJA2F5XJqn+S5q35bD6aL/7vmvdm9/26b2SnGRTcI9sh/iOy79wlcvsDQ75IAw==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqtkktOwzAQhq8yyqYgNUk3bEKo1HAFltmYZCpZSmzLmURUVTccg3uwo3CFcCP8avpig4QUOZ7xP99ve7yNVkolQ49RFuVdpbmiZSl4q6QmeJStWsFayxZmSeoiK52dCYozQREEpcAXJ6lxzfqGYFsKgMoopEBBXQZbj58HyG5uBTUjdnPrxQAaqdfiEAGwiviAVu8gGcwcwtjZ1Z39mcF8eTodxQSErWoYoY0ob9gzNmZqS3IuVE9AG4UPZaRZzWUZwRC3ssbGZC4M7Rpreqt1xmW0hJUl5emR+o8GhTUorgyeNBMdJy4FCNZa8ZrVaGot1USyp5gLUxv2MN06ZLz7zXSZp5PGW6RHD5PI09MrFHlHm8ZOE+sbmyLUsYeaJvpkg2zAkPQNpImYgVSs4rSBRXLXAbIO713bzon2WV3wSHpWqM9g4QtNv92WorlvzOFBn2zbHKrmQ7iS8W38HD/GLzPux/dx//166KPXnBw4IN27/iMydO4aufsBoUw7jg==)

</div>

## Динамічні переходи {#dynamic-transitions}

Реквізити `<Transition>` такі як `name` також можуть бути динамічними! Це дозволяє нам динамічно застосовувати різні переходи на основі зміни стану:

```vue-html
<Transition :name="transitionName">
  <!-- ... -->
</Transition>
```

Це може бути корисним, якщо ви визначили переходи/анімації CSS за допомогою угоди про класи переходів Vue і хочете перемикатися між ними.

Ви також можете застосувати різну поведінку в хуках переходів JavaScript на основі поточного стану вашого компонента. Нарешті, найкращим способом створення динамічних переходів є [компоненти переходів для багаторазового використання](#reusable-transitions), які приймають підказки для зміни характеру переходів, які будуть використовуватися. Це може здатися дивним, але єдиним обмеженням є ваша уява.

---

**Пов'язані**

- [Посилання на API `<Transition>`](/api/built-in-components#transition)
