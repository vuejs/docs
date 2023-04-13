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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNplUUtOwzAUvMojCBWkpqE/PiFUggWnyMZNnCgisS3bQa2qLto16+64Q1VRqRItZ3BuhO2gKoWdZzwzb549c54Y67yV2PGdQEQ8YxIEliUbhSQrGOUSXhCJps+llJRAwmkBrY7X4Iy5FZLAq93ap4HEBcuRxBoBBA21JQDUh1pXS7WrFupQrapl9Q5qr7bqoLYQnLkuqI3a64tFtQSt+VLfWr0G1zX+UAbNApoKvONAp+38KWc2O+0zrpeJciTEY+gkRu+OJQkde6/zRU6lNzpW2alNtVKf/6qYJnXYaQn7BkJOc3PsHPNhZuIjmlPuw3mSJA8Gj1H0mnJaktiHPCMYcTflKM4wkZf97jDGaRvOB724f9+D3vBCg5vBLU6Sq9pNeYx1HKEEW4KhOM5I6sOQTaB7zSaWLRBPM2LJhs01c0rhw90vHZVcmHKMZkRirrm5/Vq7ijP/AfAC1Pk=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNplUUtOwzAQvcqQChWkpqE/PiFUggWnyMZNnCgisS3HQa2qLto16+64Q1VRqRItZ3BuhO1AlILkhefNvDdvZubWI2Pd1wJbruXlAU+YGPskyRjlAp4RCWZPhRCUQMRpBu2u08A0re0TAJ/gqSGEOEJFKmCu0YAqFYKJyF2Yn2gtfKKe59T9VCBwxlIksIoAvEa1AQDku9yUK7kvl/JYrstV+QbyIHfyKHfgndk2yK08qMSyXIGq+ZRfqnoDtq35vvCaxhXkOXVDq2P9GUrv4tTPpDIepCjPH3wr0vX2RBDfMnmln6dUOOPayl5uy7X8+GdFO6nETk2YHeRilupvt9b/3WRKuQutKIrudTxBwUvMaUFCF9KEYMTtmKMwUbu+GPRGIY470Br2w8FdH/qjcxVcD29wFF1WbMpDrOSIOo4BGArDhMQujNgUeldsatAM8TghBmzQbN2nUBe9/YGDgufaHKMJEZgrrDqtGcVafAOd4+dU)

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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp9UktO3EAQvUphFJFIeCYMTD6Og0QWkXKH2fTYbcuK3d3qbieMEFIC20hsInbsOABCIEZ8hitUX4ELcAWqbRiZkWDV7udX9eq96p1gS6ner5oHURCbRBfKguG2VpsjUVRKagvfmUgm32prpYBMywpWev0O5otX5uSt39zIiv9IOuQO9kiO+60UidDF8kqVzHK6AcSd1g0AgEd44vZw6v7ijTt0e+4f4DWe4w2eE2Fk4+44LzWJjWICjJ2U/OsoSGQpdZRMmBgFm6/0XwIalQqfmnTt9VupBfG4P7cTrAYLOfmQn7sdt7kmJTOG5so8PxxbP5b/T+ZMKa2X8j5b9nOVJsLGF3325g1gx9e3PmE5y7Iv/j5myc9cy1qkEZSF4EyHuWZpwYV9u742THm+Cssbg3T98wAGwzd0+bDxkWfZu7Za6pRTOyEFbwDF0rQQeQRDtQ1r79V2g1ZM54VowE5Z6HVqE8GnRziptfHDKVkIyzVhu83LaKxQdgvPxme3FIaApzjFS5y5P35jtLcZnrp9959WNgPaGh14hhfuEOi4cgeAt55KJVd4gmduH8LQJzgP8O7o+H560N3b7gNu7ztd)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp9Ultq3DAU3cqNQ0kL45lmkunDdQPpR6F78I/Glo2pLQlZbmcYAm3yW8hPyV/+uoAQEjo0zXQL0ha6gW6hV3JiNEOIMUj3cF/nHC2CQyGGn1oaREHcpLIU6iBhZS24VPCesHT+rlWKM8glr2FnOPIwW7bTJx9+pg2v6YfUS/awu2SAhNGZK8hoTtpKwcKiKccujDLVRLDwBw/WGh8lDP941G+KgaK1qIiiGAHEXqkD8NPn+sIc66X5qm/NmTk230D/1tf6Vl9jRqJin5Tr+WCfuBGEQaPmFX2bBCmvuIzSOWFJcPDIhC3AbbHwvonPZtStvDE+HvWMgkGwobe1aZ3wtPMnrUjT4F65zQ+nyq7l5FZxU3FlR1mmXfb6FKei44XXYd/g3hjLE7bzPH9j4ylJPxaStyyLoCoZJTIsJMlKtO7p3u4ko8UAtvfH2d7rMYwnTzB4sf+S5vmzrprLjGI7hl47QJAsK1kRwUTMYPe5mDm0JrIomQO9stDOafGBvLqD01Y2djnBS6aoRKx7HI4Karfx/Kx2W2EI+lIv9S+9Ml+sY+jbSl+aE/MdLVsBuoaHvtI/zRngcWNOQf+xqVhyoy/0lTmBMLQK9gL+Pf/xb3nq+3b0H1yjU0g=)

</div>

Завдяки слотам, наш `<FancyButton>` є більш гнучким і придатним для повторного використання. Тепер ми можемо використовувати його в різних місцях з різним внутрішнім вмістом, але всі з однаковим стильним оформленням.

Механізм слотів у Vue був натхненний [нативним елементом `<slot>` Веб Компонента](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot), але з додатковими можливостями, які ми побачимо пізніше.

## Область візуалізації {#render-scope}

Вміст слота має доступ до області даних батьківського компонента, оскільки він визначений у батьківському компоненті. Наприклад:

```vue-html
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

Тут обидві інтерполяції <span v-pre>`{{ message }}`</span> відображатимуть однаковий вміст.

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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqNUUtOwzAQvcrgTTek2SNTCa7A1huKjBSpSaxkgoQQEoU7wIo7lEBEoJ8zjG/UGVuqmq7ijWee5828eX5SV85NHxqrLpSu76rMIdQWGzczRZa7skK4aeZ5htcNYlnAfVXmMJmmx6DQJ6bQaeQzkxO0uVvcouUMQJ8lCVBLPf3Tzr9Q75f+lXbU+jdGVxz3wHBHv9Tx3dKWS/+EsfHvUgtJEhsNxKQBGzuAgzWHy3HNZ/RBX0FNR9/C14OdmaDTw47qXJ0aIn4OPZhH0fjo7KVRdag3StxCfq0XpTgHfAzSJ63oR9QFyaI+bDjKI4P8E7GbhHHsid7nPW6z7OA=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqNUUtOwzAQvcrgTTek2VehElyBrTdtcaVIiWMlEwSqKlG4A6y4QwlEhE97hsmNOuNIVdNVpEgZP8978+Z5pa6dG9+XRk1UVCzy2OFU2zh1WY5wW87TGG9KxMzCMs9SGI3DU1CII20BtDUPnnJnlrMyQVgJushYxxqLxaQDoCcpyFpb/qLwOJoPaFKXzNDwCSC6CAKgihr6pX37RE27aZ9pT1X7wuiW6wYYrumbav5XtOPWH2H8t6/SC0HQCfW2CT02dAAXf1xuholP6Y0+vJuaPoUf9UJjQhQed1SX6jxReYp+BvPOND46c6VV4fu1krSQb4skk+QkXo30Tlv6Enfesrj3Gw7KSCO/RKcmZTf2zO/6AD+eAeE=)

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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp9U8tq20AU/ZWLvMimsZqNKa5qaNf9BG1UeUwEkmbQjEPTEEiaNlAoJKtkl0W+wHkbJ9Y33PmjnJHsWMoLwcB9nMe9M9rxvirV3RoLr+8FOi4SZUgLM1aDME8yJQtD3yItvkfbcmxoVMiM1rr+KuWga2Ee+DUWKARGZCqNjEBEFKyaqxiZZZ06myIaimKRR2VzY8Dn9sD+Jn7gkm/5hvjCxTwlnvOE7/iSJ2T3kSntnj1BcsbTwAdwQe431F/oDcUoGqdLIyipAR/zBWgn9pD4mu/tEYF5H7wlpNx5xSWh4cGeOFl70A18t50VwSHZf85oCfyU5436+2ZGUppq+NC4z1GdQeI/QWUPJv66oWegnWPaCc9wwo89JTe2/eMWgC3BOJydviHqwtYFNKreB699ke4NtLHDZIviNNL6S+jFMjdRkosi9JZKz69Pp9JQHmUC7XUNvXgbSD+Za2GCDIxt/PP+RkfwtLFX9OraS70GJvAxT3sH1XvVZjutB66baacG/5AFrK4bqfq0oX6SlmkypE4cx5/rhlimsuhTp9frLTIjLGldJ79Enz52P4msSu9WP0gl4u0+AkU3W64=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp9U81u00AQfpWRc+iFxvQSIWMiwZlH8MU4G9WSvbvybqqWqlJLoRISEpzaGweeIOU3Co2fYfaN+NbOj90CSmRpvvnm+2bG49PgudbDo5kIoiA2WZVrO05kXmpVWXqRGvEyPVEzS9NKlbQ3DHeQL9pLJFEixXFDn4hpOissnXo0U9CQQloTtQB15Hx8lkj843BrisCKUhepFYiI4h2/iYFs8jQ4FOlEVGscmcODMX9xl+4N8R3X/JN/EN/6mBfEK57zL/7Kc3IXQGp37q4BLnkRhyhci4cd9wd+69l2hnrMn/gWsnN3Rfydf7uPBOUL6Naw8s9vXBMId+7a27rLYRzqnsAVufe+0Rr1C1518v9vZqqUbYZPrP95qc+w+EBwOUcT7/zQS8iuMO2cl3iiH3dDfmz31i8AW0Lj6OzmH6Y+7L2ATjZ4FPTvwB9Pv3aSH1FWpMY8S4JMSZvmUlRJsHG6//pMoSzJtBSgtzlwcRuAt831auISiv36+/wOI95u7C9+be6hX6cmDjFPfwfNvRp7UrQDt+TNpb9SFVrdt0pHdKCPyagin9Agy7KnLSFThaoiGoxGozUyxZL2Tf5aRPR4+ESUDdx+II1JcPYHdf9vqQ==)

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

Зверніть увагу, що на вираз поширюються [синтаксичні обмеження](/guide/essentials/template-syntax#directives) аргументів динамічних директив.

## Обмежені слоти {#scoped-slots}

Як зазначено в розділі [область візуалізації](#render-scope), вміст слота не має доступу до стану в дочірньому компоненті.

Проте є випадки, коли може бути корисно, якщо вміст слота може використовувати дані як з батьківської, так і з дочірньої областей. Щоб досягти цього, нам потрібен спосіб, за допомогою якого дочірній компонент передає дані в слот під час їх рендерингу.

Фактично, ми можемо зробити саме це - ми можемо передати атрибути до виводу так само як передати атрибути до компонента:

```vue-html
<!-- шаблон <MyComponent> -->
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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp9kEGqwjAQhq8yZNPNey1vW+KDx1sLHiAbqWMp2CQk06KUgHgID+LKnVdob+TEilQRV8lM5v/z/dOJP2vTtkGRC+kLV1kCj9TYX6Wr2hpHMN/9G75p1ARrZ2pI0mzSi+JEaZmNatZxQVjbzZIwViSnDu233xiaKRGPhTPWK8FTAIq6Dh7NlHBLEAI8NQvTsEUIcV5OIdhBZo9PxZd4AXyTrjDaE5QOkSpdztH7ZYkwg6S/DPv+3J+G43D4FIwRVlV7Z5cREvJIzdleXJWA/IbOTz8cly15etxNNnpM6cMVU3mWeQ==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqFkEFqhEAQRa9S9MYEEiVb6QRC1gM5QG9Ea0TQ7qa7lAkihBwiB8kqu1xBb5RqjeIMgQFB61v9f7/fi2dr465FkQrpc1dZelK6aqxxBIe3F8NfGjXB0ZkGojjZaeFYpDSA0niaDxR4zNqaoA9qvu75dBFgbxiEQWl+ZLLl8kDY2DojDBPJ/Q26e18belQivF6dsV4J3uJ46nvYxJjwRDAMcCbmpmWLgeMA5B6CHWSyhYo7cQF41st/mEVG2c3tSuiQWqfXCaB0iFTp8oDeZyWmEI0/0/v4PX5Nn9PH3N7cw9Uy+NpF1f3xygAGaSDlPi4ylIB0xuVfD1wRW/L20meyeOyJh1+VRbqv)

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

Фактично, це дуже близько до того, як компілюються обмежені слоти та як ви б використовували обмежені слоти у користувацьких [функціях візуалізації](/guide/extras/render-function).

Зверніть увагу, як `v-slot="slotProps"` відповідає сигнатурі функції слота. Як і з аргументами функції, ми можемо використовувати деструктуризацію у `v-slot`:

```vue-html
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

### Іменовані обмежені слоти {#named-scoped-slots}

Іменовані обмежені слоти працюють аналогічно – властивості слота доступні як значення директиви `v-slot`: `v-slot:name="slotProps"`. При використанні скорочення це виглядає так:

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

Передача реквізитів у іменований слот:

```vue-html
<slot name="header" message="привіт"></slot>
```

Зауважте, що `name` слота не буде включено до реквізитів, оскільки його зарезервовано, тому остаточний `headerProps` буде `{ message: 'привіт' }`.

Якщо ви змішуєте іменовані слоти з обмеженим слотом за промовчанням, вам потрібно використовувати явний тег `<template>` для слота за промовчанням. Спроба розмістити директиву `v-slot` безпосередньо в компоненті призведе до помилки компіляції. Це зроблено для того, щоб уникнути будь-якої двозначності щодо обсягу реквізитів слота за промовчанням. Наприклад:

```vue-html
<!-- Цей шаблон не скомпілюється -->
<template>
  <MyComponent v-slot="{ message }">
    <p>{{ message }}</p>
    <template #footer>
      <!-- повідомлення належить до слота за промовчанням і тут недоступне -->
      <p>{{ message }}</p>
    </template>
  </MyComponent>
</template>
```

Використання явного тегу `<template>` для слота за промовчанням допомагає зрозуміти, що властивість `message` недоступна в іншому слоті:

```vue-html
<template>
  <MyComponent>
    <!-- Використовуйте явний слот за промовчанням -->
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>

    <template #footer>
      <p>Ось трохи контактної інформації</p>
    </template>
  </MyComponent>
</template>
```

### Приклад гарного списку {#fancy-list-example}

Можливо, вам цікаво, що було б гарним варіантом використання для обмежених слотів. Ось приклад: уявіть компонент `<FancyList>`, який рендерить список елементів - він може інкапсулювати логіку для завантаження віддалених даних, використання даних для відображення списку або навіть розширені функції, такі як розбиття на сторінки або нескінченне прокручування. Однак ми хочемо, щоб він був гнучким щодо того, як виглядає кожен елемент, і залишив стиль кожного елемента батьківському компоненту, який його використовує. Отже, бажане використання може виглядати так:

```vue-html
<FancyList :api-url="url" :per-page="10">
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <p>автор: {{ username }} | {{ likes }} вподобайок</p>
    </div>
  </template>
</FancyList>
```

Усередині `<FancyList>` ми можемо кілька разів візуалізувати той самий `<slot>` з різними даними елемента (зверніть увагу, що ми використовуємо `v-bind`, щоб передати об’єкт як реквізити слота):

```vue-html
<ul>
  <li v-for="item in items">
    <slot name="item" v-bind="item"></slot>
  </li>
</ul>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqFU81u00AQfpXBFUoqJXaatlBMGokLJw4cEJemB8dem1Xt9cpeR4RgiVL1CgegnBASD4DaqoXSNO0rrN+IWf8lkQo9OPHM+Jtv5/t2JtoTzvVRQjRT68V2RLmAmIiE9weMBjyMBDy1mD1+RmMBbhQG0NCNOqOAjQHrGQUSMRgIEnDfEgQjgN4cbXHaTiJ/e6Dh70ADk5OozS2PYGatM9Dy7xFR4WGF4isWJzAMnXELkphEzApIC3y6R2JIawyiHDoC27fiGAEKt1DDKu9Pii6Qpj1DDTcv1bCACAth8lieZu/ldfbOBERVrIiEtypRkqcgT+WNvJZn+Jwg6A/+Xy427xl4qGoqY1mWuYYYLxUxjMXYJxDbIScOZnR1MJgonBsy0Y7pG2JCR98iwWOVtEM/jExY2egOt7bWMZXmlqgmfa2lLbn1b5snEBEX0tLkwtgBs0OG1vEo5DFsg0NcyshzFTV3GqWhjRY0Kisbu6tzlLJBobBvc6coGAZk+/JCXmUHcpp9yD7LK3mNQmZHKOMZijiV53Imz0H+VjbgM0MrjuWvPD3LPkL+1UxeZIcDhhO8oAEJE9FsrsJ2v9Aop9VHlp8QJN8p9C/cN6EhPykuUM5BbtwVti7aY091uilaj5zZIQ5Wma+AX4rzgPyJhfwSmNDtQNrCwcQiw3dssI8sJ6qnvCy4XqKgy/2+IYeabZodqbl+4BluMDjIDhE7k8dzljVkUWPsorUtjDodFPN/S5f41bXzKYza1MXbfa/QxSfME68WtkN+vV1pXderq+vTpXZuGJVLBpQVci9uYuyHAtSQ9SYiZkiZU8dGvRRl556Rn/iOPQBI/MJiQGViXARVb4sxRz1ZyEi+DQDcchzKPBM2+esyNbTsPS8KE+aYCGXEitpeZDmUMNFcX9t0iNdS++OsP+pCd/M+Bg82HhLXXc3xufg4esm92B9vQE0SWJFHmbLrVt4V13WrdvV6pn8BofMiMg==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqNVMFu00AQ/ZXBFUorJXbaUigmjcSFE0fEpe7BidfpqvZ6tV5XDSESpeoVDkA5ISQ+ALVVC6Vp2l9Y/xGz69hOpEogJU5mdt+8mXkzHlnPObf3M2K5ViftC8pl12M05omQ8MJn/eFLmkoIRRJDw3Yqj4Y0PAbgMXJgLgck9LNIwkh7+wlGYITJ1C0cUAfT5thj+Ok4FSMaksQ88iVBC6BTc/uctjIRbXkWPj0LXE5Ei/sDgp7VtmeZ+4go8bBE8S8ejqCXBMMmZCkRzI9JEyK6R1IkLzGICug+9CM/TRGgcXNneMq7oyIKjMcdhy8cVbCYSB9h6lSd5+/Vbf4Oax5VrIiEt9oxIx+DOld36lZd4PcMQX/w93o+eMfBpMqqnMW21AqgvXCIZiqHEYG0n3ASoMfWiRXtDxMmWyl9Q1xo25skflaIFCXChaVHa73NzXV0FZLoIF2raS1ovTAe9ynORcJR7O3GTK5GExqlUI2dpr4S+NJfXinnQRCZCVZaALr5OsBO4cBc8GFwcZIxSYIa6jiQH6ordZMfqUn+If+sbtQttjU/waZeYEsn6lJN1SWo31oU/E5RmFP1y7in+Ucwt6bqKj8uIqZEvqIxSTK5jDRb3TotuUtT2+QGW7Bd61+MhQsN9UnTgpYUjKI3yFIwYXid6ARnAunzY+xJORUa+KVIDdRPPDDT4cJa2xTtSdws6cma5TsGOUSmMx1XXRd8r3EJF2N+Qx5d6iQ/0WX+wDzu0DjKjxE7Vac10yoyleWUPW+it91e+b8NzaJyRiMK+y0a4io8MJ2yI8IGcnduldTX+4Wwbbuc84guhAsTMdtIoKwYjvm1TaNEgi66WlvE9CgLKtupNmgWueOYjP+xNABZVKof4fC3zHlLDjn2l+E7zawOzrsfBJQNXNjgBzNXz+/vDQQOa+AilBFftAbCDyi+BpfXVzcCMmjqZQvWn67B2sZDNB4/ekLCcMXgjRhY+ox7Pj5ORUUS+2JAmZbvXt6lMAzLcNUuj/8CKBs8Fg==)

</div>

### Компоненти без рендерингу {#renderless-components}

Варіант використання `<FancyList>`, який ми обговорювали вище, інкапсулює як багаторазову логіку (вибірка даних, розбиття на сторінки тощо), так і візуальний вихід, делегуючи частину візуального виводу споживчому компоненту через обмежені слоти.

Якщо ми просунемо цю концепцію трохи далі, ми зможемо створити компоненти, які лише інкапсулюють логіку, а самі по собі нічого не рендерять — візуальний вихід повністю делегується споживчому компоненту з обмеженими слотами. Ми називаємо цей тип компонента **Компонент без рендерингу**.

Прикладом компонента без рендерингу може бути компонент, який інкапсулює логіку відстеження поточної позиції миші:

```vue-html
<MouseTracker v-slot="{ x, y }">
  Координати миші: {{ x }}, {{ y }}
</MouseTracker>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqNUTtqw0AQvcqwjWRQpNRCNqRIl3QJJLCNsMZBxNpdVitZQghCqpwgRU6RIoWLxGdY3Siz/mEbDC4WZt7Oe/Me07EbpcK6QhazpJzqXBko0VRqwkVeKKkN3MuqxAedTl9Rw0zLArwwOgQd3eMiiTZ8YlJjsFDz1KDrTHKkUV+Vc2nGnHXQBNBCzxlNAXBjv+zKroY3+2OX9s9+D+92CfbXLoeP4TOGjgjQ94EriNavpY+skE4S7VezgJ36PB+zA42zAKQgijCYufJRFJsG+m3yTVTyKqZSlIb8jB3Pvx7tkPYA2WGVysgPfdCbQOcEmrBO59UaC1X6gk8ObE/AZy5cSLE35fsjp7DIRSYXYZpltzUKc5eXBgVq3yO7JRayRi/YLh2RjYMgxwJ6PXuRxtnrAiTunBA3dNGGM4hbKlrOopNj9P+SNuO1)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqVkc9Og0AQxl9lshfaBMEzoSYevOnNgyZcSJlaYtkly0AhDYnx5BN48Ck8eOhB+wzLGzmUFKT+SUwImfl2v9/M7GzEeZo6RY7CE34213FKZ4GMk1RpgiuVZ3itw/k9alholYDluF/F1mgFEiCQWO4tES7CfEWwadW5Yo5ESZnXCTBCtkodSP58ty/NCWGSrkLCNiN/1ERxkq0UzQKxgdKGiu2Cb3F9Mi9mZ3bNg3kzW/NhXptHswXzbrbNU/PM5dkAdW23Adu4JqNHszDHd/vSwhbHg45e6Kdxo5DCyfQwqUbKtTxkAKUHp/YhqTjpYu6Ef/uDBGmpouGt8pSJOMEeCUDLOHNKmAE6aXiHNyO96vXb72yVS8JoaG8dy0itnTCKLgre0GWcEUrUE4tvZpioAi27w3ZtTAdWLn+j6b3xP8C/1w/gt/sGr+SVl4EAr+KgCoR7tK36E8C3+y4=)

</div>

Не зважаючи на цікаву модель, більшість із того, що можна досягти за допомогою компонентів без рендерингу, можна досягти більш ефективним способом за допомогою композиційного API, не зазнаючи накладних витрат на вкладення додаткових компонентів. Пізніше ми побачимо, як можна реалізувати ту саму функцію відстеження миші, що й [композиційна](/guide/reusability/composables).

Проте, обмежені слоти все ще корисні у випадках, коли нам потрібно інкапсулювати логіку, **а також** створити візуальне виведення, як у прикладі з `<FancyList>`.
