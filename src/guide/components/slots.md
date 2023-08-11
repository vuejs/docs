# Slot {#slots}

> Si assume che tu abbia già letto le [Basi dei componenti](/guide/essentials/component-basics). Leggi prima quello se sei nuovo al concetto di componente.

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-component-slots" title="Lezione gratuita sugli slot"/>

## Contenuto e outlet degli slot {#slot-content-and-outlet}

Abbiamo imparato che i componenti possono accettare props, che possono essere valori JavaScript di qualsiasi tipo. Ma cosa succede con il contenuto del template? In alcuni casi, potremmo voler passare un frammento di template a un componente figlio e lasciare che il componente figlio renda il frammento all'interno del suo stesso template.

Ad esempio, potremmo avere un componente `<FancyButton>` che supporta l'utilizzo come segue:

```vue-html{2}
<FancyButton>
  Cliccami! <!-- contenuto slot -->
</FancyButton>
```

Ed il template di `<FancyButton>` sarà:

```vue-html{2}
<button class="fancy-btn">
  <slot></slot> <!-- outlet slot -->
</button>
```

L'elemento `<slot>` è un **outlet per slot** che indica dove il **contentuto dello slot** fornito dal genitore dovrebbe essere renderizzato.

![diagramma slot](./images/slots.png)

<!-- https://www.figma.com/file/LjKTYVL97Ck6TEmBbstavX/slot -->

E il DOM renderizzato alla fine:

```html
<button class="fancy-btn">Cliccami!</button>
```

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNpdUdlqAyEU/ZVbQ0kLMdNsXabTQFvoV8yLcRkkjopLSQj596oTwqRvnuM9y9UT+rR2/hs5qlHjqZM2gOch2m2rZW+NC/BDND1+xRCMBuFMD9N5NeKyeNrqphrUSZdA4L1VJPCEAJrRdCEAvpWke+g5NHcYg1cmADU6cB0A4zzThmYckqimupqiGfpXILe/zdwNhaki3n+0SOR5vAu6ReU++efUajtqYGJQ/FIg5w8Wt9FlOx+OKh/nV1c4ZVNqlHE1TIQQ7xnvCN13zkTNalBSc+Jw5wiTac2H1WLDeDeDyXrJVm9LWG7uE3hev3AhHge1cYwnO200L4QljEnd1bCxB1g82UNhe+I6qQs5kuGcE30NrxeaRudzOWtkemeXuHP5tLIKOv8BN+mw3w==)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNpdUdtOwzAM/RUThAbSurIbl1ImARJf0ZesSapoqROlKdo07d9x0jF1SHmIT+xzcY7sw7nZTy9Zwcqu9tqFTYW6ddYH+OZYHz77ECyC8raFySwfYXFsUiFAhXKfBoRUvDcBjhGtLbGgxNAVcLziOlVIp8wvelQE2TrDg6QKoBx1JwDgy+h6B62E8ibLoDM2kAAGoocsiz1VKMfmCCrzCymbsn/GY95rze1grja8694rpmJ/tg1YsfRO/FE134wc2D4YeTYQ9QeKa+mUrgsHE6+zC+vfjoz1Bdwqpd5iveX1rvG2R1GA0Si5zxrPhaaY98v5WshmCrerhVi+LmCxvqPiafUslXoYpq0XkuiQ1p4Ax4XQ2BSwdnuYP7p9QlvuG40JHI1lUaenv3o5w3Xvu2jOWU179oQNn5aisNMvLBvDOg==)

</div>

Con gli slot, il componente `<FancyButton>` è responsabile di rendere l'elemento `<button>` esterno (e il suo stile), mentre il contenuto interno è fornito dal componente genitore.

Un altro modo per comprendere gli slot è confrontarli con le funzioni JavaScript:

```js
// componente genitore che passa il contenuto dello slot
FancyButton('Cliccami!')

// FancyButton rende il contenuto dello slot nel proprio template
function FancyButton(slotContent) {
  return `<button class="fancy-btn">
      ${slotContent}
    </button>`
}
```

Il contenuto dello slot non è limitato solo al testo. Può essere qualsiasi contenuto di template valido. Ad esempio, possiamo passare più elementi o addirittura altri componenti:

```vue-html
<FancyButton>
  <span style="color:red">Cliccami!</span>
  <AwesomeIcon name="plus" />
</FancyButton>
```

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNp1UmtOwkAQvspQYtCEgrx81EqCJibeoX+W7bRZaHc3+1AI4QyewH8ewvN4Aa/gbgtNIfFf5+vMfI/ZXbCQcvBmMYiCWFPFpAGNxsp5wlkphTLwQjjdPlljBIdMiRJ6g2EL88O9pnnxjlqU+EpbzS3s0BwPaypH4gqDpSyIQVcBxK3VFQDwXDC6hhJdlZi4zf3fRKwl4aDNtsDHJKCiECqiW8KTYH5c1gEnwnUdJ9rCh/XeM6Z42AgN+sFZAj6+Ux/LOjFaEK2diMz3h0vjNfj/zokuhPFU3lTdfcpShVOZcJ+DZgHs/HxtCrpZlj34eknoOlfC8jSCgnEkKswVSRlyczkZzVLM+9CdjtPJ/RjGswtX3ExvMcuu6mmhUnTruOBYAZKkKeN5BDO5gdG13FRoSVTOeAW2xkLPY3UEdweYWqW9OCkYN6gctq9uXllx2Z09CJ9dJwzBascI7nBYihWDldUGMqEgdTVIq6TQqCEMfUpNSD+fX7/fH+3b7P8AdGP6wA==)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNptUltu2zAQvMpGQZEWsOzGiftQ1QBpgQK9g35oaikwkUiCj9aGkTPkBPnLIXKeXCBXyJKKBdoIoA/tYGd3doa74tqY+b+ARVXUjltp/FWj5GC09fCHKb79FbzXCoTVA5zNFxkWaWdT8/V/dHrAvzxrzrC3ZoBG4SYRWhQs9B52EeWapihU3lWwyxfPDgbfNYq+ejEppcLjYHrmkSqAOqMmAOB3L/ktDEhV4+v8gMR/l1M7wxQ4v+3xZ1Nw3Wtb8S1TTXG1H3cCJIO69oxc5mLUcrSrXkxSi1lxZGT0//CS9Wg875lzJELE/nLto4bko69dr31cFc8auw+3JHvSEfQ7nwbsHY9HwakQ4kes14zfdlYH1VbQS4XMlp1lraRMPl6cr1rsZnB6uWwvvi9hufpAxZfLryjEp5GtbYs0TlGICTCsbaXqKliZDZx/NpuEDsx2UiUwo5VxT6Dkv73BPFgXxRktlUdL2Jh6OoW8O3pX0buTsoTgaCNQcDjoGwk3wXkQ2tJLGzSYYI126KAso0uTSc8Pjy9P93k2d6+NyRKa)

</div>

Utilizzando gli slot, il nostro `<FancyButton>` è più flessibile e riutilizzabile. Ora possiamo utilizzarlo in diversi luoghi con contenuti interni diversi, ma tutti con lo stesso stile elegante.

Il meccanismo degli slot dei componenti Vue è ispirato dall'elemento [nativo `<slot>` dei Web Component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot), ma con funzionalità aggiuntive che vedremo più avanti.

## Ambito di rendering {#render-scope}

Il contenuto dello slot ha accesso all'ambito dei dati del componente genitore, poiché è definito nel genitore. Ad esempio:

```vue-html
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

Qui entrambe le interpolazioni <span v-pre>`{{ message }}`</span> renderanno lo stesso contenuto.

Il contenuto dello slot **non** ha accesso ai dati del componente figlio. Le espressioni nei template Vue possono accedere solo all'ambito in cui sono definite, in linea con l'ambito lessicale di JavaScript. In altre parole:

> Le espressioni nel template genitore hanno accesso solo all'ambito del genitore; le espressioni nel template figlio hanno accesso solo all'ambito del figlio.

## Contenuto di fallback {#fallback-content}

Ci sono casi in cui è utile specificare un contenuto di fallback (cioè predefinito) per uno slot, da renderizzare solo quando non viene fornito alcun contenuto. Ad esempio, in un componente `<SubmitButton>`:

```vue-html
<button type="submit">
  <slot></slot>
</button>
```

Potremmo voler renderizzare il testo "Invia" all'interno del `<button>` se il genitore non fornisce alcun contenuto per lo slot. Per fare di "Invia" il contenuto di fallback, possiamo inserirlo tra i tag `<slot>`:

```vue-html{3}
<button type="submit">
  <slot>
    Submit <!-- contenuto fallback -->
  </slot>
</button>
```

Ora, quando usiamo `<SubmitButton>` in un componente genitore, senza fornire alcun contenuto per lo slot:

```vue-html
<SubmitButton />
```

Verrà renderizzato il contenuto di fallback, "Invia":

```html
<button type="submit">Submit</button>
```

Ma se forniamo del contenuto:

```vue-html
<SubmitButton>Save</SubmitButton>
```

Allora il contenuto fornito verrà renderizzato al suo posto:

```html
<button type="submit">Save</button>
```

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNp1kMsKwjAQRX9lzMaNbfcSC/oL3WbT1ikU8yKZFEX8d5MGgi2YVeZxZ86dN7taWy8B2ZlxP7rZEnikYFuhZ2WNI+jCoGa6BSKjYXJGwbFufpNJfhSaN1kflTEgVFb2hDEC4IeqguARpl7KoR8fQPgkqKpc3Wxo1lxRWWeW+Y4wBk9x9V9d2/UL8g1XbOJN4WAntodOnrecQ2agl8WLYH7tFyw5olj10iR3EJ+gPCxDFluj0YS6EAqKR8mi9M3Td1ifLxWShcU=)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNp1UEEOwiAQ/MrKxYu1d4Mm+gWvXChuk0YKpCyNxvh3lxIb28SEA8zuDDPzEucQ9mNCcRAymqELdFKu64MfCK6p6Tu6JCLvoB18D9t9/Qtm4lY5AOXwMVFu2OpkCV4ZNZ51HDqKhwLAQjIjb+X4yHr+mh+EfbCakF8AclNVkCJCq61ttLkD4YOgqsp0YbGesJkVBj92NwSTIrH3v7zTVY8oF8F4SdazD7ET69S5rqXPpnigZ8CjEnHaVyInIp5G63O6XIGiIlZMzrGMd8RVfR0q4lIKKV+L+srW+wNTTZq3)

</div>

## Slot con nome {#named-slots}

Ci sono momenti in cui è utile avere più slot in un singolo componente. Ad esempio, in un componente `<BaseLayout>` con il seguente template:

```vue-html
<div class="container">
  <header>
    <!-- We want header content here -->
  </header>
  <main>
    <!-- We want main content here -->
  </main>
  <footer>
    <!-- We want footer content here -->
  </footer>
</div>
```

Per questi casi, l'elemento `<slot>` ha un attributo speciale, `name`, che può essere usato per assegnare un ID univoco a diversi slot in modo da poter determinare dove il contenuto deve essere renderizzato:

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

Un outlet `<slot>` senza `name` ha implicitamente il nome "default".

In un componente genitore che utilizza `<BaseLayout>`, abbiamo bisogno di un modo per passare più frammenti di contenuto slot, ognuno destinato a un diverso slot. Ecco dove entrano in gioco gli **slot con nome**.

Per passare uno slot con nome, dobbiamo utilizzare un elemento `<template>` con la direttiva `v-slot`, e quindi passare il nome dello slot come argomento a`v-slot`:

```vue-html
<BaseLayout>
  <template v-slot:header>
    <!-- contenuto per l'header dello slot -->
  </template>
</BaseLayout>
```

La direttiva `v-slot` ha un abbreviazione dedicata, `#`, quindi `<template v-slot:header>` può essere abbreviato semplicemente come `<template #header>`. Pensalo come "renderizza questo frammento di template nello slot 'header' del componente figlio".

![diagramma slot con nomi](./images/named-slots.png)

<!-- https://www.figma.com/file/2BhP8gVZevttBu9oUmUUyz/named-slot -->

Ecco il codice che passa il contenuto per tutti e tre gli slot a `<BaseLayout>` utilizzando la sintassi abbreviata:

```vue-html
<BaseLayout>
  <template #header>
    <h1>Qui potrebbe esserci un titolo</h1>
  </template>

  <template #default>
    <p>Un paragrafo per il contenuto principale</p>
    <p>Un altro.</p>
  </template>

  <template #footer>
    <p>Qua ci sono delle info di contatto</p>
  </template>
</BaseLayout>
```

Quando un componente accetta sia uno slot predefinito che slot con nomi, tutti i nodi di primo livello non `<template>` sono implicitamente considerati contenuto per lo slot predefinito. Pertanto, il codice sopra può essere scritto anche come:

```vue-html
<BaseLayout>
  <template #header>
    <h1>Qui potrebbe esserci un titolo</h1>
  </template>

  <!-- implicit default slot -->
  <p>Un paragrafo per il contenuto principale</p>
  <p>Un altro.</p>

  <template #footer>
    <p>Qua ci sono delle info di contatto</p>
  </template>
</BaseLayout>
```

Ora, tutto ciò che è contenuto all'interno degli elementi `<template>` sarà passato agli slot corrispondenti. L'HTML renderizzato finale sarà:

```html
<div class="container">
  <header>
    <h1>Qui potrebbe esserci un titolo</h1>
  </header>
  <main>
    <p>Un paragrafo per il contenuto principale</p>
    <p>Un altro.</p>
  </main>
  <footer>
    <p>Qua ci sono delle info di contatto</p>
  </footer>
</div>
```

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNp9UsFuwjAM/RWrHLgMOi5o6jIkdtphn9BLSF0aKU2ixEVjiH+fm8JoQdvRfu/5xS8+ZVvvl4cOsyITUQXtCSJS5zel1a13geBdRvyUR9cR1MG1MF/mt1YvnZdW5IOWVVwQtt5IQq4AxI2cau5ccZg1KCsMlz4jzWrzgQGh1fuGYIcgwcs9AmkyKHKGLyPykcfD1Apr2ZmrHUN+s+U5Qe6D9A3ULgA1bCK1BeUsoaWlyPuVb3xbgbSOaQGcxRH8v3XtHI0X8mmfeYToWkxmUhFoW7s/JvblJLERmj1l0+T7T5tqK30AZWSMb2WW3LTFUGZXp/u8o3EEVrbI9AFjLn8mt38fN9GIPrSp/p4/Yoj7OMZ+A/boN9KInPeZZpAOLNLRDAsPZDgN4p0L/NQFOV/Ayn9x6EZXMFNKvQ4E5YwLBczW6/WlU3NIi6i/sYDn5Qu2qX1OF51MsvMPkrIEHg==)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNp9UkFuwjAQ/MoqHLiUpFxQlaZI9NRDn5CLSTbEkmNb9oKgiL934wRwQK3ky87O7njGPicba9PDHpM8KXzlpKV1qWVnjSP4FB6/xcnsCRpnOpin2R3qh+alBig1HgO9xkbsFcG5RyvDOzRq8vkAQLSury+l5lNkN1EuCDurBCFXAMWdH2pGrn2YtShqdCPOnXa5/kKH0MldS7BFEGDFDoEkKSwybo8rskjjaevo4L7Wrje8x4mdE7aFxjiglkWE1GxQE9tLi8xO+LoGoQ3THLD/qP2/dGMMxYZs8DP34E2HQUxUBFI35o+NfTlJLOomL8n04frXns7W8gCVEt5/lElQkxpdmVyVHvP2yhBo0SHThx5z+TEZvl1uMlP0oU3nH/kRo3iMI9Ybes960UyRsZ9pBuGDeTqpwfBAvn7NrXF81QUZm8PSHjl0JWuYVVX1PhAqo4zLYbZarUak4ZAWXv5gDq/pG3YBHn50EEkuv5irGBk=)

</div>

Ancora una volta, potrebbe aiutare a comprendere meglio gli slot con nomi usando l'analogia delle funzioni JavaScript:

```js
// passaggio di frammenti slot multipli con nomi diversi
BaseLayout({
  header: `...`,
  default: `...`,
  footer: `...`
})

// <BaseLayout> li renderizza in posizioni diverse
function BaseLayout(slots) {
  return `<div class="container">
      <header>${slots.header}</header>
      <main>${slots.default}</main>
      <footer>${slots.footer}</footer>
    </div>`
}
```

## Nomi di slot dinamici {#dynamic-slot-names}

[Gli argomenti dinamici delle direttive](/guide/essentials/template-syntax.md#dynamic-arguments) funzionano anche su `v-slot`, consentendo la definizione di nomi di slot dinamici:

```vue-html
<base-layout>
  <template v-slot:[nomeDinamicoSlot]>
    ...
  </template>

  <!-- con abbreviazione -->
  <template #[nomeDinamicoSlot]>
    ...
  </template>
</base-layout>
```

Tieni presente che l'espressione è soggetta ai [vincoli di sintassi](/guide/essentials/template-syntax#directives) degli argomenti dinamici delle direttive.

## Slot con lo 'scope' {#scoped-slots}

Come discusso in [Render Scope](#render-scope), il contenuto dello slot non ha accesso allo stato nel componente figlio.

Tuttavia, ci sono casi in cui potrebbe essere utile se il contenuto di uno slot può utilizzare dati sia dallo scope del genitore che dallo scope del figlio. Per ottenere ciò, abbiamo bisogno di un modo per far sì che il figlio possa passare dati a uno slot quando lo sta rendendo.

Infatti, possiamo fare esattamente questo: possiamo passare attributi a un punto di inserimento per uno slot, proprio come facciamo per le props di un componente:

```vue-html
<!-- template di <MyComponent> -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

Ricevere le props dello slot è un po' diverso quando si utilizza un singolo slot predefinito rispetto all'utilizzo di slot con nomi. Mostreremo prima come ricevere le props utilizzando un singolo slot predefinito, utilizzando `v-slot` direttamente sul tag del componente figlio:

```vue-html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

![diagramma degli slot con scope](./images/scoped-slots.svg)

<!-- https://www.figma.com/file/QRneoj8eIdL1kw3WQaaEyc/scoped-slot -->

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNp9kMEKgzAMhl8l9OJlU3aVOhg7C3uAXsRlTtC2tFE2pO++dA5xMnZqk+b/8/2dxMnadBxQ5EL62rWWwCMN9qh021vjCMrn2fBNoya4OdNDkmarXhQnSstsVrOOC8LedhVhrEiuHca97wwVSsTj4oz1SvAUgKJpgqWZEj4IQoCvZm0Gtgghzss1BDvIbFkqdmID+CNdbbQnaBwitbop0fuqQSgguWPXmX+JePe1HT/QMtJBHnE51MZOCcjfzPx04JxsydPzp2Szxxo7vABY1I/p)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNqFkNFqxCAQRX9l8CUttAl9DbZQ+rzQD/AlJLNpwKjoJGwJ/nvHpAnusrAg6FzHO567iE/nynlCUQsZWj84+lBmGJ31BKffL8sng4bg7O0IRVllWnpWKAOgDF7WBx2em0kTLElt975QbwLkhkmIyvCS1TGXC8LR6YYwVSTzH8yvQVt6VyJt3966oAR38XhaFjjEkvBCECNcia2d2CLyOACZQ7CDrI6h4kXcAF7lcg+za6h5et4JPdLkzV4B9B6RBtOfMISmxxqKH9TarrGtATxMgf/bDfM/qExEUCdEDuLGXAmoV06+euNs2JK7tyCrzSNHjX9aurQf)

</div>

Le props passate allo slot dal componente figlio sono disponibili come valore della direttiva `v-slot` corrispondente, a cui si può avere accesso dalle espressioni all'interno dello slot.

Puoi pensare a uno slot con scope come a una funzione che viene passata al componente figlio. Il componente figlio la chiama poi, passando le props come argomenti:

```js
MyComponent({
  // passaggio dello slot predefinito, ma come funzione
  default: (slotProps) => {
    return `${slotProps.text} ${slotProps.count}`
  }
})

function MyComponent(slots) {
  const greetingMessage = 'ciao'
  return `<div>${
    // chiamata alla funzione dello slot con le props
    slots.default({ text: greetingMessage, count: 1 })
  }</div>`
}
```

n realtà, questo è molto simile a come gli slot con scope vengono compilati e come li useresti nelle [funzioni di renderizzazione manuali](/guide/extras/render-function).

Nota come  `v-slot="slotProps"` corrisponde alla firma della funzione dello slot. Proprio come con gli argomenti delle funzioni, possiamo usare la destrutturazione in `v-slot`:

```vue-html
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

### Slot con scope nominati {#named-scoped-slots}

Gli slot con scope nominati funzionano in modo simile: le props dello slot sono accessibili come valore della direttiva `v-slot`: `v-slot:name="slotProps"`. Utilizzando la sintassi abbreviata, appare così:

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

Passare le props a uno slot nominato:

```vue-html
<slot name="header" message="ciao"></slot>
```

Nota che il `name` di uno slot non verrà incluso nelle props perché è riservato, quindi le `headerProps` risultanti sarebbero `{ message: 'ciao' }`.

Se stai mischiando gli slot nominati con lo slot con scope predefinito, è necessario utilizzare un tag `<template>` esplicito per lo slot predefinito. Tentare di posizionare la direttiva  `v-slot` direttamente sul componente causerà un errore di compilazione. Questo per evitare qualsiasi ambiguità riguardo allo scope delle props dello slot predefinito. Ad esempio:

```vue-html
<!-- Questo template non verrà compilato -->
<template>
  <MyComponent v-slot="{ message }">
    <p>{{ message }}</p>
    <template #footer>
      <!-- message appartiene allo slot predefinito e non è disponibile qui -->
      <p>{{ message }}</p>
    </template>
  </MyComponent>
</template>
```

Utilizzare un tag `<template>` esplicito per lo slot predefinito aiuta a rendere chiaro che la prop `message` non è disponibile all'interno dell'altro slot:

```vue-html
<template>
  <MyComponent>
    <!-- Usa uno slot predefinito esplicito -->
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>

    <template #footer>
      <p>Qua ci sono delle info di contatto</p>
    </template>
  </MyComponent>
</template>
```

### Esempio di lista fantasia {#fancy-list-example}

Potresti chiederti quale potrebbe essere un buon caso d'uso per gli slot con scope. Ecco un esempio: immagina un componente `<FancyList>` che renderizza una lista di elementi. Questo componente potrebbe includere la logica per caricare dati remoti, utilizzare i dati per mostrare una lista, o anche funzionalità avanzate come la paginazione o lo scorrimento infinito. Tuttavia, vogliamo che sia flessibile rispetto all'aspetto di ciascun elemento e lasciare lo stile di ogni elemento al componente genitore che lo consuma. Quindi l'utilizzo desiderato potrebbe apparire così:

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

All'interno di `<FancyList>`, possiamo renderizzare lo stesso `<slot>` più volte con diversi dati dell'elemento (nota che stiamo usando `v-bind` per passare un oggetto come props dello slot):

```vue-html
<ul>
  <li v-for="item in items">
    <slot name="item" v-bind="item"></slot>
  </li>
</ul>
```

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNqFU11r20AQ/CtbhWIHZMlxkjZVHUMf2r6EUkgolCgPZ2mlHDndHXcnU9fVf++evixDP16Md9cztzszPgQftI52NQZJsLaZ4dqBRVfrTSp5pZVx8InJbH/HrYPCqApmUTx2PHCWynXcIQlDhcNKC+aQKoD1EZ0wzRe1EbdpQJ9pAIlGs9CsROpcLNOgBRBkIIAzTl9peICtyvch1BaNZBWGIPgLWmhGDKFyvoNMMGsJ4HGTGU315tCxQNOsY3/dcTTCKnSMYNs90I+HxwgAv3yjf7PpvkxJ1jE9Pmwfn95/FIvqkyGV1u0Fgs2Uxpw6kV8ADh5XKOkWlv/EBJbRDVbvfTNTQpkEzq5W25ubS2o1rfaeZBOEwYktf/fzAAYLaHo3OwdTmSlJHmmjtIVbyLHgEr/6av44642bhTAbLJs9nR9RXm6PIt75YzeIY6hU9kKtSpGTOaPDCnTZM5dlKmmjB16hqt18fg63m+7mlibaMVEjkT12enauJTC7b1WCe6Gchc81z5H2GUyi+ccdk/Bd1dRtDUpgtYQmpGXchOUbcT/UThnO/D0T/BdaUXAGD6hFTWuyI9EFEfltnkjxkKrlkm78V+hrMaRBcNgteEHhetWdJ1CW7nkSzjvFchIliqIhQIKfoAtl+kgDl51I09xbEgT8DWPuCbPlMh/reIxmz7yO2wX/k0aAWnTGAAlhKY5+vnB7TXJJJbHNJIBmuT8ggWv9o29tWfZSGlXLPCGoRGYWpaEzUbr55cV1jmXoU5xfvlvB6vo1FW+u3mJRnLf4Vms6vX97yk+ejo9UzJRcenf++O5ZURQD3fgnaX4DS1Wb6Q==)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNqNVNtq20AQ/ZWpQnECujhO0qaqY+hD25fQl4RCifKwllbKktXushcT1/W/d1bSSnYJNCCEZmbPmcuZ1S76olS6cTTKo6UpNVN2VQjWKqktfCOi3N4yY6HWsoVZmo0eD5kVAqAQ9KU7XNGaOG5h572lRAZBhTV574CJzJv7QuCzzMaMaFjaKk4sRQtgOeUmiiVO85siwncRQa6oThRpKHrO50XUnUdEwMMJw08M7mAtq20MzlAtSEtj4OyZGkweMIiq2AZKToxBgMcdxDCqVrueBfb7ZaaOQiOspZYgbL0FPBySIQD+eMeQc99/HJIsM0weqs+O258mjfZREE1jt5yCKaWiFXpSX0A/5loKmxj2m+YwT69p+7kXg0udw8nlYn19fYGufvSeZBXF0ZGmR2vwmrJKS4WiPswGWWYxzIIgs8fYH6mIJadnQXdNrdMiWAB+yJ7gsXdgLfjqcK10wtJqgmYZ+spnpGgl6up5oaa2fGKi6U8Yau9ZS6Wzpwi7WU1p7BMzaZcLbuBh0q2XM4fZXTc+uOPSGvjuWEWxlaAexr9uiIBf0qG3Uy6HxXwo9B+mn47CvbNSM+LHccDxAyvmjMA9Vdxh1WQiO0eywBVGEaN3Pj972wVxPKwOZ7BJWI2b+K5rOOVUNPbpYJNvJalwZmmahm3j7AhdSz3sPzDRS3R4SQwOCXxP4yVBzJqJarSzcY8H5mXWFfif1QVwPGjGcQWTLp7YrcLxCfyDdAuMW0cq30AOV+plcK1J+dxoXJkqR6igRCeNxjbxp3N6cX5V0Sb2K19dfFrA4uo9Gh8uP9K6Puvw3eyx9SH3IT/qPCZpiW6Y8Gq9mvekrutAN96o/V99ALPj)

</div>

### Componenti senza renderizzazione {#renderless-components}

Il caso d'uso di `<FancyList>` che abbiamo discusso in precedenza incapsula sia la logica riutilizzabile (recupero dati, paginazione, ecc.) che l'output visivo, delegando parte dell'output visivo al componente consumatore tramite gli slot con scope.

Se spingiamo un po' più avanti questo concetto, possiamo arrivare a dei componenti che incapsulano solo la logica e non renderizzano nulla da soli: l'output visivo è completamente delegato al componente consumatore tramite gli slot con scope. Chiamiamo questo tipo di componente un **Componente senza renderizzazione / renderless**.

Un esempio di componente renderless potrebbe essere uno che incapsula la logica per tracciare la posizione attuale del mouse:

```vue-html
<MouseTracker v-slot="{ x, y }">
  Il mouse è a: {{ x }}, {{ y }}
</MouseTracker>
```

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNqNUcFqhDAQ/ZUhF12w2rO4Cz301t5aaCEX0dki1SQko6uI/96J7i4qLPQQmHmZ9+Y9ZhQvxsRdiyIVmStsZQgcUmtOUlWN0ZbgXbcOP2xe/KKFs9UNBHGyBj09kCpLFj4zuSFsTJ0T+o6yjUb35GpNRylG6CMYYJKCpwAkzWNQOcgphZG/YZoiX/DQNAttFjMrS+6LRCT2rh6HGsHiOQKtmKIIS19+qmZpYLrmXIKxM1Vo5Yj9HD0vfD7ckGGF3LDWlOyHP/idYPQCfdzldTtjscl/8MuDww78lsqHVHdTYXjwCpdKlfoS52X52qGit8oRKrRhwHYdNrrDILouPbCNVZCtgJ1n/6Xx8JYAmT8epD3fr5cC0oGLQYpkd4zpD27R0vA=)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNqVUU1rwzAM/SvCl7SQJTuHdLDDbttthw18MbW6hjW2seU0oeS/T0lounQfUDBGepaenvxO4tG5rIkoClGGra8cPUhT1c56ghcbA756tf1EDztva0iy/Ds4NCbSAEiD7diicafigeA0oFvLPAYNhWICYEE5IL00fMp8Hs0JYe0OinDIqFyIaO7CwdJGihO0KXTcLriK59NYBlUARTyMn6Hv0yHgIp7ARAvl3FXm8yCRiuu1Fv/x23JakVqtz3t5pOjNOQNoC7hPz0nHyRSzEr7Ghxppb/XlZ6JjRlzhTAlA+ypkLWwAM6c+8G2BdzP+/pPbRkOoL/KOldH2mCmtnxr247kKhAb9KuHKgLVtMEkn2knG+sIVzV9sfmy8hfB/swHKwV0oWja4lQKKjoNOivzKrf4L/JPqaQ==)

</div>

Sebbene sia un pattern interessante, gran parte di ciò che può essere ottenuto con i Renderless Components può essere realizzato in modo più efficiente utilizzando Composition API, senza incorrere nel costo aggiuntivo dell'annidamento eccessivo dei componenti. Più avanti, vedremo come possiamo implementare la stessa funzionalità di tracciamento del mouse come [Composable](/guide/reusability/composables).

Detto ciò, gli scoped slots rimangono utili nei casi in cui è necessario **sia** incapsulare la logica **che** comporre l'output visivo, come nell'esempio di `<FancyList>`.
