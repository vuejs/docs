# Слоти {#slots}

> Ця сторінка передбачає, що ви вже прочитали [Основи компонентів](/guide/essentials/component-basics). Прочитайте це спочатку, якщо ви новачок у компонентах.

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-component-slots" title="Безкоштовний урок про слоти Vue.js"/>

## Вміст та вивід слота {#slot-content-and-outlet}

Ми дізналися, що компоненти можуть приймати властивості, якими можуть бути значення JavaScript будь-якого типу. Але як щодо вмісту шаблону? У деяких випадках ми можемо захотіти передати фрагмент шаблону в дочірній компонент і дозволити дочірньому компоненту відтворити фрагмент у своєму власному шаблоні.

Наприклад, у нас може бути компонент `<FancyButton>`, який підтримує наступне використання:

```vue-html{2}
<FancyButton>
  Натисніть мене! <!-- вміст слота -->
</FancyButton>
```

Шаблон `<FancyButton>` виглядає так:

```vue-html{2}
<button class="fancy-btn">
  <slot></slot> <!-- вивід слота -->
</button>
```

Елемент `<slot>` — це вивід слота, який вказує, де має наданий батьком **вміст слота** відтворюватися.

![Діаграма слота](./images/slots.png)

<!-- https://www.figma.com/file/75OMLip2mV2aUBRZwx0CCU/slot-(Copy) -->

І остаточний відрендерений DOM:

```html
<button class="fancy-btn">Натисніть мене!</button>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9Us1O3DAQfpWpUUUrrZOysP1JU6T20KfwJZs4aWhiW2OHgtAe2HPP3HgHhEBC4ucZnDdinKBVAImb55v5vpn5xifspzHRYSdZwlKbY20cWOk6sy9U3RqNDn5nKj/+1TmnFZSoW9iO4gkWyNtCpfHIJh4FTramyZykCCCdVA8AgD/3F/3a3/Sn/r4/69f9f/B3/trf+2tI33EO/tLfUeK0XwPV3PoHqr4AzgNfuHQ6AEFpvGnIZmycm7eZiQ6sVrTZSegqnhJWsAQGJGA0fYgF++OcsUkc2zIPKx3YSGMV0yvCTrm6lZG0LV+i/mclkrBgs4lGTOChRI5SFRIlvqX5ovSVbpBdCbWiVV74HI703NrleJe8yaz9IVgZ6vnSKcGGPFllG+3i/Y2rN/6yP/NXr1wNpo5iz/0czmndcROe0UZ/NDDXjcYEtsqy/B7iZZb/rVB3qkigqZXMkFeYFbVU7sPuzqKQ1Qy29ubF7rc5zBfvKfi890WW5ceRrZEMSUBpJQfAZEVRqyqBhTmCnU/maEDbDKtaDeCExkOfzibw9QnOO7RhOKNr5SQSRp7SLx1WYatH2WsbbQ==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9Us1O3DAQfpWpUUUrrZOysP1JU6T20KfwxZs4aWhiW7ZDF604sOeeufUdECoSUqHP4LxRxw5dZUFC8sHzzcw3M9/MmnzWOjntBclIbgvTaHfMZNNpZRx85bI4+9I7pyRURnWwn6QTLKTtMwnApFjFhFJUvG8drANaKGSRQjqbwXqH65xJfHm6rYeGE51uuRNoAeST6AgA+F/+atj42+HC3w+Xw2b4Cf7O3/h7fwP5C0rBX/s7dFwMG8CYP/4vRl8BpSGfuXzaOEJ5ui1IZmScl3ZcJydWSdQiTsAeHJYRHGHsgxGcOtiMfHNO2yxNbVUEKU5sokyd4i8xvXRNJxJhO7o06ocVBokZmU04UgRPhaFGyFIYYZ7jfBT6hDfQBlFxlEf7CWvdlXY57qBoubWfGKlCPF06yUj0o1S2VS493qp666+HS//7iapB1JFsV8+4TuvO2vBNtvz/j6JVJoO9qqo+BnvJi++1Ub0sM2gbKbihteFlg2fz6vBgUYp6BntH8/Lwwxzmi5dovD16J6rq9ZitDAqSgcQ7i4DmZdnIOoOFXsHBG72KaMdN3cgITtJoqNPjcb5/gIve2NCcVo10wiA2XmkchZz/AxZWLcg=)

</div>

Завдяки слотам, `<FancyButton>` відповідає за візуалізацію зовнішнього `<button>` (та його гарного стилю), тоді як внутрішній вміст надається батьківським компонентом.

Ще один спосіб зрозуміти слоти – порівняти їх із функціями JavaScript:

```js
// батьківський компонент передає вміст слота
FancyButton('Натисніть мене!')

// FancyButton рендерить вміст слота у власному шаблоні
function FancyButton(slotContent) {
  return `<button class="fancy-btn">
      ${slotContent}
    </button>`
}
```

Вміст слота не обмежується лише текстом. Це може бути будь-який дійсний вміст шаблону. Наприклад, ми можемо передати кілька елементів або навіть інші компоненти:

```vue-html
<FancyButton>
  <span style="color:red">Натисніть мене!</span>
  <AwesomeIcon name="plus" />
</FancyButton>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9U11O3DAQvsoQVNFKm6QsbH/SFIk+VOod8uJNnDQ0sS3bAVZopRZeK/FS8cZbD4AQqKtStlewr9AL9AodJ9tVWARP9nyZ+cbzzZcjb1eIYL+hXuTFKpWl0KCobsROwspacKnhPWHp5F2jNWeQS17DRhD2MFe8sUzePaCK1/RD2kvuYYvkOOxaYRMMNK1FRTTFCCDuUbcAgDk3F/bYzOwXc2vP7LH9CuaXuTa35hoTEh33n/MQSawEYaD0pKJvEy/lFZdROiEs8XYe4V8DfCoW/ifpjxd2rVaax+FyHG/gdar4NRHBnuIMRT5yRcnig0q8CFrEYaiNixPvo9ZCRWGo8tQJtqcCLosQb4FsmC5rGlBV+2PJDxSVSJx4gx5HiOA+lb6kLKOSysc4V1Lv8TraacKmOMrKyp1f7i5u3FkkrYhSKHHu8v2xdgq3M+tYVVw71dzKuuy7grVuaFeE12BJ0CnUrQzW8zx/4+IxST8Vkjcsi6AqGSXSLyTJSsr0063NUUaLAaxvD7Ot10MYjp5g8GL7Jc3zZ101lzhxBIwz2gKCZFnJighG4hA2n4vDFq2JLErWgr0y3/VpVASvFnDaSOUeJ3jJNJWIoWjonHYU1G7lD3Darfk+mEszMz/N3H525kMLzs2lPbHf0H1zQAPiYa7MD3sGeNzYUzC/XSqW3JgLc2VPwPedgksB/5x//zs77Vtw+g+dwYHC)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9U11O3DAQvsoQVNFKm6QsbH/SFIk+VOod8uJNnDQ0sS3bgV2tkFp4rcRLxRtvPQBCoK5K2V7BuUIv0Ct0nCxRdouIItnzZeaz55svM2dfCO+wok7ghCqWudB7EctLwaWG94TF03eV1pxBKnkJW57fw2zZVpe8f0QVL+mHuJfcw5bJABGjk6YgoSmpCg0zi8YcWRhlWgUw6x88WCE+jhi+od/dFANNS1EQTTECCHulDYCPuTCX9YmZ11/MXX1en9RfwfwyN+bO3GBGpMN+Uw3ngzyhEoSB0tOCvo2cmBdcBvGUsMjZe+SEDcDbYuE9Sb8bv73y2vGh33XkDJxWXbckwjtQnOGYGr2i5QcVOShYyx05qLGNI+ej1kIFvq/S2Ap/oDwuMx93nqyYzkvqUVW6Y8mPFJVIHDmDHoeP4CGVrqQsoZLKxzjXUv/jtbR2atjKmnWs41ZnN26tFhdEKZQ4tfnuWFuFm551qAqurWp2aG32qmCNIZoR4dbrCO49ZkcGm2mavrHxmMSfMskrlgRQ5IwS6WaSJDm68OnO9iih2QA2d4fJzushDEdPMHix+5Km6bO2mkvsOACGtm0AQZIkZ1kAIzGB7edi0qAlkVnOGrBX5tpzKvT6qyUcV1LZywmeM00lYq3Pm1ZQu7U/yWq34bpgrszc/DSL+rM1H1pwYa7q0/obum8BaEBczLX5UZ8DLrf1GZjfNhVLbs2lua5PwXWtgp2Afy6+/52f9S14/A+D65mt)

</div>

Завдяки слотам, наш <FancyButton> є більш гнучким і придатним для повторного використання. Тепер ми можемо використовувати його в різних місцях з різним внутрішнім вмістом, але всі з однаковим стильним оформленням.

Механізм слотів у Vue був натхненний [нативним елементом `<slot>` Веб Компонента](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot), але з додатковими можливостями, які ми побачимо пізніше.

## Область візуалізації {#render-scope}

Вміст слота має доступ до області даних батьківського компонента, оскільки він визначений у батьківському компоненті. Наприклад:

```vue-html
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

Тут обидві інтерполяції <span v-pre>`{{ message }}`<span> відображатимуть однаковий вміст.

Вміст слота **не має** доступу до даних дочірнього компонента. Вирази в шаблонах Vue можуть отримати доступ лише до області, у якій вони визначені, відповідно до лексичного діапазону JavaScript. Іншими словами:

> Вирази в батьківському шаблоні мають доступ лише до батьківської області; вирази в дочірньому шаблоні мають доступ лише до дочірньої області.

## Резервний вміст {#fallback-content}

Бувають випадки, коли для слота корисно вказати резервний вміст (тобто, вміст за замовчуванням), який буде відображатися лише тоді, коли вміст не надано. Наприклад, у компоненті `<SubmitButton>`:

```vue-html
<button type="submit">
  <slot></slot>
</button>
```

Ми можемо захотіти, щоб текст «Надіслати» відображався всередині `<button>`, якщо батьківський елемент не надав вмісту слота. Щоб «Надіслати» резервний вміст, ми можемо розмістити його між тегами `<slot>`:

```vue-html{3}
<button type="submit">
  <slot>
    Надіслати <!-- резервний вміст -->
  </slot>
</button>
```

Тепер, коли ми використовуємо `<SubmitButton>` у батьківському компоненті, не надаючи вмісту для слота:

```vue-html
<SubmitButton />
```

Це відобразить резервний вміст, «Надіслати»:

```html
<button type="submit">Надіслати</button>
```

Але якщо ми надаємо контент:

```vue-html
<SubmitButton>Зберегти</SubmitButton>
```

Тоді замість цього буде відображено наданий вміст:

```html
<button type="submit">Зберегти</button>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNqNUs1OAjEQfpXaCxd2eycrib6C114Aiy6hP2lnMYaQiL6DnnwHRIn4xzPMvpHTrjGAieHU6deZrzPfN1N+4lw+qRTv8CIMfOmABQWV60pTamc9sLOqr0s4rQCsYUNvNWvlYhuM5S1pCtHUUyVdQGk37oGiG2PFUZYxXOIa33FT3+C6nte3uMFlfUfoguI1I3iFr7iic4lflPoWKz7r+5jLsqwh2mlGJOzQDyj4oHB+GHkXH/ApdbPC51hf7MxMBYX4nZG3eSNWpnsuHwVrSM5pau7nIUjeYQmJGAkW75JfArjQESIMB1HFUcitvxAU5b4yUGqVq6CzvrdXQXkilry9xSEInCifeWXOlVf+P8691D+8kXYmzYxG2fc2rsaunf1Gf7h26ljykPIlj8YDvYaxjUuQ2gR8xAW+RKGT+tGIZNZBdkugpWrYYth8uyf97BtyLjNU)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNqNUktOwzAQvYrxppsm3lehElyBrTf9uNCqsS17UkBVJQp3gBV3KIWK8usZJjdi7EDVFAlVipTx88wbz3sz5SfWppNC8RbPfM8NLbSlHubWOGBnRTcfwmkBYDQbOJOzRip2wVDYkJoxqdVVLOmrQacYA5sGtGeIRysNvlUBrEYZkJnU9GVi25oOoHI77oCiE2PZUZIwXOIa33FT3uC6nJe3uMFleUfoguI1I3iFr7ii/xK/KPUtVHyW9yGXJUlFVJtGROzQBhR8UDg/jLyND/gUX7PC51Cf1USjgkxsZ+RNXqmd5B2bjrzR5EQUS/5ceMm38klOioez5BcA1reE8INesGHkU+POBUWpKzQMc5UqnyddZy69ckQseXOHQxA4US5xSveVU+4/zr3UP7y/PtIo+8sRtqpuZ7fSH66tOpbcx3zJg/FAt35swhLEZwI+4gJfgtBR/WBENOsguyXQUlVsIaza7kk/+wbf70hG)

</div>

## Іменовані слоти {#named-slots}

Бувають випадки, коли корисно мати кілька виводів в одному компоненті. Наприклад, у компоненті `<BaseLayout>` із таким шаблоном:

```vue-html
<div class="container">
  <header>
    <!-- Тут нам потрібен вміст заголовка -->
  </header>
  <main>
    <!-- Тут нам потрібен основний вміст -->
  </main>
  <footer>
    <!-- Тут ми хочемо вміст нижнього колонтитула -->
  </footer>
</div>
```

Для цих випадків елемент `<slot>` має спеціальний атрибут `name`, за допомогою якого можна призначити унікальний ідентифікатор різним слотам, щоб ви могли визначити, де має відтворюватися вміст:

```vue-html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

Вивід `<slot>` без `name` неявно має назву "default".

У батьківському компоненті, що використовує `<BaseLayout>`, нам потрібен спосіб передати кілька фрагментів вмісту слота, кожен з яких націлений на інший вивід слота. Ось де з'являються **іменовані** слоти.

Щоб передати іменований слот, нам потрібно використати елемент `<template>` з директивою `v-slot`, а потім передати назву слота як аргумент `v-slot`:

```vue-html
<BaseLayout>
  <template v-slot:header>
    <!-- вміст для слота заголовка -->
  </template>
</BaseLayout>
```

`v-slot` має спеціальне скорочення `#`, тому `<template v-slot:header>` можна скоротити до просто `<template #header>`. Подумайте про це як про «відобразити цей фрагмент шаблону в слоті 'header' дочірнього компонента».

![діаграма іменованих слотів](./images/named-slots.png)

<!-- https://www.figma.com/file/VE5SL2VDXfKSXPwWqZgYpq/named-slot-(Copy) -->

Ось код, який передає вміст для всіх трьох слотів у `<BaseLayout>` за допомогою скороченого синтаксису:

```vue-html
<BaseLayout>
  <template #header>
    <h1>Тут може бути назва сторінки</h1>
  </template>

  <template #default>
    <p>Абзац для основного змісту.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Ось трохи контактної інформації</p>
  </template>
</BaseLayout>
```

Коли компонент приймає як слот за замовчуванням, так і іменовані слоти, усі вузли верхнього рівня, які не є `<template>`, неявно розглядаються як вміст для слота за замовчуванням. Отже, вищесказане також можна записати так:

```vue-html
<BaseLayout>
  <template #header>
    <h1>Тут може бути назва сторінки</h1>
  </template>

  <!-- неявний слот за замовчуванням -->
  <p>Абзац для основного змісту.</p>
  <p>І ще один.</p>

  <template #footer>
    <p>Ось трохи контактної інформації</p>
  </template>
</BaseLayout>
```

Тепер усе всередині елементів `<template>` буде передано до відповідних слотів. Остаточний відтворений HTML буде таким:

```html
<div class="container">
  <header>
    <h1>Тут може бути назва сторінки</h1>
  </header>
  <main>
    <p>Абзац для основного змісту.</p>
    <p>І ще один.</p>
  </main>
  <footer>
    <p>Ось трохи контактної інформації</p>
  </footer>
</div>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9U8tu00AU/ZUrZ9FNY9NNhIyJBGs+wRvXmRBXtmc0MwmUKlJLoRISEqzaHQu+IOUZhSbfMPNHnLGTxk6gsmT5nnvvOfflM++ZEP5kzLzQi1QqM6FJMT0W/bjMCsGlpueJYi+SUz7WNJS8oAM/2EIu9SAuo6DORRYMzQqRJ5rBIoq2wZUNZOOnzoglAybXODyjo775ai/tWzJ3ZmV+mZ9kbp1t5mSWZmZ+m29mRvYCyMqe22uACzOPAiSuyYOG+p7egA2Tcb4pBC7RN5/NLWhn9orMD/PHfiIwX4B3BSn3/m5WhIA7e+1k7aUfBW46W4Irsh9coSvkz82y4X+4mCHnumo+1u5xVF8g8ZGgco4i3rumF6BdotuZWeCNeuwNubbtOzcATAmFo7Kb/4g6s7WAhtc79OoVd4tE+CeKlziCM5cTrx0q9kKqEIdh1c6OvZHWQoVBoIap2/+J8rl8GeDLl+NSZwXzmSq6x5K/UkyCOPYOGxwBwAmTXclK7J7Jhzh3Qvd4He00LqdopX2T7pzbYxhkE0rzRKmnsZfyUidZ6bQ3Q9u9RJVzTWVSMITXPsTizAHfz7mVExVgbOfvxjciovvl/0Ov9u3rNXKiAP2011n9ekqf5nXDdfBme8dcotSu5iKkI/GaFM+zAXXSNH1SB6Q85zKkTq/XWyNDDKmrsjcspEf+Y1ZUMIaNoioRb/oXR2WiEw==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9U0tu2zAQvcqAXmQTS83GKFTVQLvuEbhRZLpWIJEESbtJgwBJ0wYoUKBdJbsuegKnX8ONfQbyRhlKsi3ZSWBD0LyZeW9+OiWvpAwmY0YiEutUZdL0Kc8KKZSB14lmb5ITMTYwVKKAvSDcQD5pj3IAytlxGT5gw2ScGzj1aCqQgzNudFQB0KDz9hnl+I/DtSgahhUyTwxDCyDexJc2Iis/dEYsGTBV4+gZHfTtD3fpPoC9s0v71/4Be+ttOwO7sFP7z/60U3AXiCzdubtGcG5ncYiJNXnYUN/Rq3vbCMq+/WZvkXbqrsD+tv/dV0DmC+RdopR//rJLwIA7d+1l3WUQh7JFcAXusy90ifkzu2j4ny5mKIQpm6fG/zzVd5T4AqhyjkV88k3PkXaB3U7tHJ9Yj7sB37b76AeAU8LCsbKbR0S92VpAw0v2SXUh3SKRwZEWHK+nXDKtHZqS9dopwUvxNiUjY6SOwlAPU38+RzoQ6m2Ib4Eac5MVLGC66B4q8U4zhcSU7Dc4QgQnTHUV47h7pp7i3Ard4V1dILbSPmn/HbTHMMgmkOaJ1i8pSQU3Sca99mpo25eoc2GAJwXD8MqHsXjmCK/n3MqJC2Rs52/HNyLi9fIf0Kt8u3qNnDjEftrrLD89bU7yquEqeLW9Q6Gw1K4RMoIDeQxa5NkAOmmavqgCUpELFUGn1+vVyBCH1NXZexbBs+A5K0q4+tZLEXJ2D1Emtg4=)

</div>

Знову ж таки, це може допомогти вам краще зрозуміти іменовані слоти за допомогою аналогії функції JavaScript:

```js
// передача кількох фрагментів слота з різними іменами
BaseLayout({
  header: `...`,
  default: `...`,
  footer: `...`
})

// <BaseLayout> відображає їх у різних місцях
function BaseLayout(slots) {
  return `<div class="container">
      <header>${slots.header}</header>
      <main>${slots.default}</main>
      <footer>${slots.footer}</footer>
    </div>`
}
```

## Динамічні назви слотів {#dynamic-slot-names}

[Аргументи динамічних директив](/guide/essentials/template-syntax.md#dynamic-arguments) також спрацюють з `v-slot`, що дозволяє визначати динамічні назви слотів:

```vue-html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- зі скороченням -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

Зверніть увагу, що на вираз поширюються [синтаксичні обмеження](/guide/essentials/template-syntax.html#directives) аргументів динамічних директив.

## Обмежені слоти {#scoped-slots}

Як зазначено в розділі [область візуалізації](#render-scope), вміст слота не має доступу до стану в дочірньому компоненті.

Проте є випадки, коли може бути корисно, якщо вміст слота може використовувати дані як з батьківської, так і з дочірньої областей. Щоб досягти цього, нам потрібен спосіб, за допомогою якого дочірній компонент передає дані в слот під час їх рендерингу.

Фактично, ми можемо зробити саме це - ми можемо передати атрибути до виводу так само як передати атрибути до компонента:

```vue-html
<!-- <MyComponent> template -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

Отримання реквізитів слотів дещо відрізняється при використанні одного слота за замовчуванням порівняно з використанням іменованих слотів. Ми збираємося показати, як отримати реквізити, використовуючи спочатку один слот за замовчуванням завдяки `v-slot` безпосередньо в тегу дочірнього компонента:

```vue-html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

![діаграма обмежених слотів](./images/scoped-slots.svg)

<!-- https://www.figma.com/file/zWaGeuSbwolYlz8LArwW8h/scoped-slot-(Copy) -->

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9kcFOwzAMhl/FymWXNRHXqkNCnCfxALmMziud1iSKvQKqKiEeggfhxI1X2N4IZ52mUtBOif/Yn2P/nboLQbd7VLkqqIx1YCDkfbi1rm6CjwzL13svN4eOYRN9AzNtRloqnllXmKFa6iRgbMJuxZgiLsaENqOd54VV6XiIPpBVkgVguevgImrGF4a+h19i6feC6PuUX4w/IYTCXJqquRr+njWroLfknUzXnZqcH6RpDiclaTJBiq16Yg6UG0ObMo21Je1jZeSmozSuG9RITfYY/TNhFLBV8xHDiNhizCK6NUaM15iT1D/chJUxexllsut/jCq9I4YqInLtqiUSrSqEBcwO38e3w9fh8/hxfL/mkWxzXbdnG4q0b8iTAWLThGoV5CcX5OlGnBOkZA82m4ExNqL/Abv73N4=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNqFUkFOwzAQ/MrKl4JEY3GNAhLiXIkH+BKSbUjV2Ja9CUVRJMQjeAgnbnyh/RHrpInSgkCKFO94PePZcSvurI2aGkUsEp+50tKt0mVljSNYvdwbXmnUBGtnKlhEcoaFYwulAZTGXX8gx3VabwnagGZjn48HAOaEAeiU5i+Rky4XhJXdpoShomR+g2bpt4ZulAi/B2esV4K7WJ7aFiYwItwRdB2cgJmpmaJjOYBkboIZEjmJiisxeF9WqY023mieS395ddxg0cmOEjyBUCvxRGR9LKVfZ2EsGx8ZV0heRY6Fywoj9NXy0Zlnj46JlbiacUgGG3RLhzpHh+4vzrPWH7zjYNnKWVYnEf+WWJ5SenE5unNItdNjBVA4RCp1sULv0wJjWOy/Dq/7z/3H4f3w1j+EXvnfXDmBvGyO0SUhI4hDaBztmYYSEPfJ8dY1p82U3D08DTlwzMPrvgGJpQEj)

</div>

Реквізити, передані дочірнім слотом, доступні як значення відповідної директиви `v-slot`, доступ до якої можна отримати за допомогою виразів у слоті.

Ви можете розглядати обмежений слот як функцію, яка передається дочірньому компоненту. Потім дочірній компонент викликає його, передаючи властивості як аргументи:

```js
MyComponent({
  // передаємо слот за замовчуванням, але як функцію
  default: (slotProps) => {
    return `${slotProps.text} ${slotProps.count}`
  }
})

function MyComponent(slots) {
  const greetingMessage = 'привіт'
  return `<div>${
    // виклик функції слота за допомогою пропсів!
    slots.default({ text: greetingMessage, count: 1 })
  }</div>`
}
```

In fact, this is very close to how scoped slots are compiled, and how you would use scoped slots in manual [render functions](/guide/extras/render-function.html).

Notice how `v-slot="slotProps"` matches the slot function signature. Just like with function arguments, we can use destructuring in `v-slot`:

```vue-html
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

### Named Scoped Slots {#named-scoped-slots}

Named scoped slots work similarly - slot props are accessible as the value of the `v-slot` directive: `v-slot:name="slotProps"`. When using the shorthand, it looks like this:

```vue-html
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```

Passing props to a named slot:

```vue-html
<slot name="header" message="hello"></slot>
```

Note the `name` of a slot won't be included in the props because it is reserved - so the resulting `headerProps` would be `{ message: 'hello' }`.

If you are mixing named slots with the default scoped slot, you need to use an explicit `<template>` tag for the default slot. Attempting to place the `v-slot` directive directly on the component will result in a compilation error. This is to avoid any ambiguity about the scope of the props of the default slot. For example:

```vue-html
<!-- This template won't compile -->
<template>
  <MyComponent v-slot="{ message }">
    <p>{{ message }}</p>
    <template #footer>
      <!-- message belongs to the default slot, and is not available here -->
      <p>{{ message }}</p>
    </template>
  </MyComponent>
</template>
```

Using an explicit `<template>` tag for the default slot helps to make it clear that the `message` prop is not available inside the other slot:

```vue-html
<template>
  <MyComponent>
    <!-- Use explicit default slot -->
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </MyComponent>
</template>
```

### Fancy List Example {#fancy-list-example}

You may be wondering what would be a good use case for scoped slots. Here's an example: imagine a `<FancyList>` component that renders a list of items - it may encapsulate the logic for loading remote data, using the data to display a list, or even advanced features like pagination or infinite scrolling. However, we want it to be flexible with how each item looks and leave the styling of each item to the parent component consuming it. So the desired usage may look like this:

```vue-html
<FancyList :api-url="url" :per-page="10">
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <p>by {{ username }} | {{ likes }} likes</p>
    </div>
  </template>
</FancyList>
```

Inside `<FancyList>`, we can render the same `<slot>` multiple times with different item data (notice we are using `v-bind` to pass an object as slot props):

```vue-html
<ul>
  <li v-for="item in items">
    <slot name="item" v-bind="item"></slot>
  </li>
</ul>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBGYW5jeUxpc3QgZnJvbSAnLi9GYW5jeUxpc3QudnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEZhbmN5TGlzdCA6YXBpLXVybD1cInVybFwiIDpwZXItcGFnZT1cIjEwXCI+XG4gICAgPHRlbXBsYXRlICNpdGVtPVwieyBib2R5LCB1c2VybmFtZSwgbGlrZXMgfVwiPlxuICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIj5cbiAgICAgICAgPHA+e3sgYm9keSB9fTwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJtZXRhXCI+Ynkge3sgdXNlcm5hbWUgfX0gfCB7eyBsaWtlcyB9fSBsaWtlczwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvRmFuY3lMaXN0PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZD5cbi5tZXRhIHtcbiAgZm9udC1zaXplOiAwLjhlbTtcbiAgY29sb3I6ICM0MmI4ODM7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJGYW5jeUxpc3QudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbJ2FwaS11cmwnLCAncGVyLXBhZ2UnXSlcblxuY29uc3QgaXRlbXMgPSByZWYoW10pXG5cbi8vIG1vY2sgcmVtb3RlIGRhdGEgZmV0Y2hpbmdcbnNldFRpbWVvdXQoKCkgPT4ge1xuICBpdGVtcy52YWx1ZSA9IFtcbiAgICB7IGJvZHk6ICdTY29wZWQgU2xvdHMgR3VpZGUnLCB1c2VybmFtZTogJ0V2YW4gWW91JywgbGlrZXM6IDIwIH0sXG5cdCAgeyBib2R5OiAnVnVlIFR1dG9yaWFsJywgdXNlcm5hbWU6ICdOYXRhbGlhIFRlcGx1aGluYScsIGxpa2VzOiAxMCB9XG4gIF1cbn0sIDEwMDApXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8dWw+XG4gICAgPGxpIHYtaWY9XCIhaXRlbXMubGVuZ3RoXCI+XG4gICAgICBMb2FkaW5nLi4uXG4gICAgPC9saT5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGl0ZW1zXCI+XG4gICAgICA8c2xvdCBuYW1lPVwiaXRlbVwiIHYtYmluZD1cIml0ZW1cIi8+XG4gICAgPC9saT5cbiAgPC91bD5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG4gIHVsIHtcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gICAgcGFkZGluZzogNXB4O1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgzMTVkZWcsICM0MmQzOTIgMjUlLCAjNjQ3ZWZmKTtcbiAgfVxuICBsaSB7XG4gICAgcGFkZGluZzogNXB4IDIwcHg7XG4gICAgbWFyZ2luOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gIH1cbjwvc3R5bGU+In0=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBGYW5jeUxpc3QgZnJvbSAnLi9GYW5jeUxpc3QudnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIEZhbmN5TGlzdFxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8RmFuY3lMaXN0IGFwaS11cmw9XCJ1cmxcIiA6cGVyLXBhZ2U9XCIxMFwiPlxuICAgIDx0ZW1wbGF0ZSAjaXRlbT1cInsgYm9keSwgdXNlcm5hbWUsIGxpa2VzIH1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpdGVtXCI+XG4gICAgICAgIDxwPnt7IGJvZHkgfX08L3A+XG4gICAgICAgIDxwIGNsYXNzPVwibWV0YVwiPmJ5IHt7IHVzZXJuYW1lIH19IHwge3sgbGlrZXMgfX0gbGlrZXM8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L3RlbXBsYXRlPlxuICA8L0ZhbmN5TGlzdD5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG4ubWV0YSB7XG4gIGZvbnQtc2l6ZTogMC44ZW07XG4gIGNvbG9yOiAjNDJiODgzO1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiRmFuY3lMaXN0LnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiBbJ2FwaS11cmwnLCAncGVyLXBhZ2UnXSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IFtdXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIC8vIG1vY2sgcmVtb3RlIGRhdGEgZmV0Y2hpbmdcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaXRlbXMgPSBbXG4gICAgICAgIHsgYm9keTogJ1Njb3BlZCBTbG90cyBHdWlkZScsIHVzZXJuYW1lOiAnRXZhbiBZb3UnLCBsaWtlczogMjAgfSxcbiAgICAgICAgeyBib2R5OiAnVnVlIFR1dG9yaWFsJywgdXNlcm5hbWU6ICdOYXRhbGlhIFRlcGx1aGluYScsIGxpa2VzOiAxMCB9XG4gICAgICBdXG4gICAgfSwgMTAwMClcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHVsPlxuICAgIDxsaSB2LWlmPVwiIWl0ZW1zLmxlbmd0aFwiPlxuICAgICAgTG9hZGluZy4uLlxuICAgIDwvbGk+XG4gICAgPGxpIHYtZm9yPVwiaXRlbSBpbiBpdGVtc1wiPlxuICAgICAgPHNsb3QgbmFtZT1cIml0ZW1cIiB2LWJpbmQ9XCJpdGVtXCIvPlxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgc2NvcGVkPlxuICB1bCB7XG4gICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICAgIHBhZGRpbmc6IDVweDtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMzE1ZGVnLCAjNDJkMzkyIDI1JSwgIzY0N2VmZik7XG4gIH1cbiAgbGkge1xuICAgIHBhZGRpbmc6IDVweCAyMHB4O1xuICAgIG1hcmdpbjogMTBweDtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICB9XG48L3N0eWxlPiJ9)

</div>

### Компоненти без рендерингу {#renderless-components}

The `<FancyList>` use case we discussed above encapsulates both reusable logic (data fetching, pagination etc.) and visual output, while delegating part of the visual output to the consumer component via scoped slots.

If we push this concept a bit further, we can come up with components that only encapsulate logic and do not render anything by themselves - visual output is fully delegated to the consumer component with scoped slots. We call this type of component a **Renderless Component**.

An example renderless component could be one that encapsulates the logic of tracking the current mouse position:

```vue-html
<MouseTracker v-slot="{ x, y }">
  Mouse is at: {{ x }}, {{ y }}
</MouseTracker>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBNb3VzZVRyYWNrZXIgZnJvbSAnLi9Nb3VzZVRyYWNrZXIudnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PE1vdXNlVHJhY2tlciB2LXNsb3Q9XCJ7IHgsIHkgfVwiPlxuICBcdE1vdXNlIGlzIGF0OiB7eyB4IH19LCB7eyB5IH19XG5cdDwvTW91c2VUcmFja2VyPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiTW91c2VUcmFja2VyLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCwgb25Vbm1vdW50ZWQgfSBmcm9tICd2dWUnXG4gIFxuY29uc3QgeCA9IHJlZigwKVxuY29uc3QgeSA9IHJlZigwKVxuXG5jb25zdCB1cGRhdGUgPSBlID0+IHtcbiAgeC52YWx1ZSA9IGUucGFnZVhcbiAgeS52YWx1ZSA9IGUucGFnZVlcbn1cblxub25Nb3VudGVkKCgpID0+IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB1cGRhdGUpKVxub25Vbm1vdW50ZWQoKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHVwZGF0ZSkpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8c2xvdCA6eD1cInhcIiA6eT1cInlcIi8+XG48L3RlbXBsYXRlPiJ9)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBNb3VzZVRyYWNrZXIgZnJvbSAnLi9Nb3VzZVRyYWNrZXIudnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIE1vdXNlVHJhY2tlclxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8TW91c2VUcmFja2VyIHYtc2xvdD1cInsgeCwgeSB9XCI+XG4gIFx0TW91c2UgaXMgYXQ6IHt7IHggfX0sIHt7IHkgfX1cblx0PC9Nb3VzZVRyYWNrZXI+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJNb3VzZVRyYWNrZXIudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICB1cGRhdGUoZSkge1xuICAgICAgdGhpcy54ID0gZS5wYWdlWFxuICAgICAgdGhpcy55ID0gZS5wYWdlWVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy51cGRhdGUpXG4gIH0sXG4gIHVubW91bnRlZCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy51cGRhdGUpXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxzbG90IDp4PVwieFwiIDp5PVwieVwiLz5cbjwvdGVtcGxhdGU+In0=)

</div>

While an interesting pattern, most of what can be achieved with Renderless Components can be achieved in a more efficient fashion with Composition API, without incurring the overhead of extra component nesting. Later, we will see how we can implement the same mouse tracking functionality as a [Composable](/guide/reusability/composables.html).

That said, scoped slots are still useful in cases where we need to both encapsulate logic **and** compose visual output, like in the `<FancyList>` example.
