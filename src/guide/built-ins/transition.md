<script setup>
import Basic from './transition-demos/Basic.vue'
import SlideFade from './transition-demos/SlideFade.vue'
import CssAnimation from './transition-demos/CssAnimation.vue'
import NestedTransitions from './transition-demos/NestedTransitions.vue'
import JsHooks from './transition-demos/JsHooks.vue'
import BetweenElements from './transition-demos/BetweenElements.vue'
import BetweenComponents from './transition-demos/BetweenComponents.vue'
</script>

# Transition {#transition}

Vue oferuje dwa wbudowane komponenty, które mogą pomóc w pracy z przejściami i animacjami w odpowiedzi na zmiany stanu:

- `<Transition>` służący do stosowania animacji, gdy element lub komponent jest dodawany lub usuwany z DOM. Jest to omówione na tej stronie.

- `<TransitionGroup>` służący do stosowania animacji, gdy element lub komponent jest wstawiany, usuwany lub przemieszczany w liście `v-for`. Jest to omówione w [następnym rozdziale](/guide/built-ins/transition-group).

Oprócz tych dwóch komponentów możemy również stosować animacje w Vue używając innych technik, takich jak przełączanie klas CSS lub animacje sterowane stanem poprzez wiązanie stylów. Te dodatkowe techniki są omówione w rozdziale [Techniki Animacji](/guide/extras/animation).

## Komponent `<Transition>` {#the-transition-component}

`<Transition>` jest wbudowanym komponentem: oznacza to, że jest dostępny w szablonie każdego komponentu bez konieczności jego rejestracji. Może być używany do zastosowania animacji wejścia i wyjścia na elementach lub komponentach przekazanych do niego przez domyślny slot. Wejście lub wyjście może być wyzwolone przez jedno z następujących:

- Renderowanie warunkowe poprzez `v-if`
- Wyświetlanie warunkowe poprzez `v-show`
- Przełączanie komponentów dynamicznych poprzez specjalny element `<component>`
- Zmiana specjalnego atrybutu `key`

Oto przykład najbardziej podstawowego użycia:

```vue-html
<button @click="show = !show">Przełącz</button>
<Transition>
  <p v-if="show">witaj</p>
</Transition>
```

```css
/* wyjaśnimy działanie tych klas w następnej kolejności! */
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

[Pełny przykład na Playground](https://play.vuejs.org/#eNpVkEFuwyAQRa8yZZNWqu1sunFJ1N4hSzYUjRNUDAjGVJHluxcCipIV/OG/pxEr+/a+TwuykfGogvYEEWnxR2H17F0gWCHgBBtMwc2wy9WdsMIqZ2OuXtwfHErhlcKCb8LyoVoynwPh7I0kzAmA/yxEzsKXMlr9HgRr9Es5BTue3PlskA+1VpFTkDZq0i3niYfU6anRmbqgMY4PZeH8OjwBfHhYIMdIV1OuferQEoZOKtIJ328TgzJhm8BabHR3jeC8VJqusO8/IqCM+CnsVqR3V/mfRxO5amnkCPuK5B+6rcG2fydshks=)

</div>
<div class="options-api">

[Pełny przykład na Playground](https://play.vuejs.org/#eNpVkMFuAiEQhl9lyqlNuouXXrZo2nfwuBeKs0qKQGBAjfHdZZfVrAmB+f/M/2WGK/v1vs0JWcdEVEF72vQWz94Fgh0OMhmCa28BdpLk+0etAQJSCvahAOLBnTqgkLA6t/EpVzmCP7lFEB69kYRFAYi/ROQs/Cij1f+6ZyMG1vA2vj3bbN1+b1Dw2lYj2yBt1KRnXRwPudHDnC6pAxrjBPe1n78EBF8MUGSkixnLNjdoCUMjFemMn5NjUGacnboqPVkdOC+Vpgus2q8IKCN+T+suWENwxyWJXKXMyQ5WNVJ+aBqD3e6VSYoi)

</div>

:::tip
`<Transition>` obsługuje tylko pojedynczy element lub komponent jako zawartość swojego slotu. Jeśli zawartością jest komponent, musi on również posiadać tylko jeden element główny.
:::

Gdy element w komponencie `<Transition>` jest wstawiany lub usuwany, dzieje się co następuje:

1. Vue automatycznie wykryje, czy element docelowy ma zastosowane przejścia lub animacje CSS. Jeśli tak, szereg [klas przejścia CSS](#transition-classes) zostanie dodanych / usuniętych w odpowiednich momentach.

2. Jeśli istnieją nasłuchiwacze [hooków JavaScript](#javascript-hooks), zostaną one wywołane w odpowiednich momentach.

3. Jeśli nie wykryto przejść / animacji CSS i nie dostarczono hooków JavaScript, operacje DOM dotyczące wstawienia i/lub usunięcia zostaną wykonane w następnej klatce animacji przeglądarki.

## Przejścia oparte na CSS {#css-based-transitions}

### Klasy przejścia {#transition-classes}

Istnieje sześć klas stosowanych dla przejść wejścia / wyjścia.

![Diagram Przejścia](./images/transition-classes.png)

<!-- https://www.figma.com/file/rlOv0ZKJFFNA9hYmzdZv3S/Transition-Classes -->

1. `v-enter-from`: Stan początkowy dla wejścia. Dodawany przed wstawieniem elementu, usuwany jedną klatkę po wstawieniu elementu.

2. `v-enter-active`: Stan aktywny dla wejścia. Stosowany podczas całej fazy wchodzenia. Dodawany przed wstawieniem elementu, usuwany gdy przejście/animacja się kończy. Ta klasa może być używana do zdefiniowania czasu trwania, opóźnienia i krzywej łagodności dla przejścia wejścia.

3. `v-enter-to`: Stan końcowy dla wejścia. Dodawany jedną klatkę po wstawieniu elementu (w tym samym czasie, gdy `v-enter-from` jest usuwany), usuwany gdy przejście/animacja się kończy.

4. `v-leave-from`: Stan początkowy dla wyjścia. Dodawany natychmiast po wywołaniu przejścia wyjścia, usuwany po jednej klatce.

5. `v-leave-active`: Stan aktywny dla wyjścia. Stosowany podczas całej fazy wychodzenia. Dodawany natychmiast po wywołaniu przejścia wyjścia, usuwany gdy przejście/animacja się kończy. Ta klasa może być używana do zdefiniowania czasu trwania, opóźnienia i krzywej łagodności dla przejścia wyjścia.

6. `v-leave-to`: Stan końcowy dla wyjścia. Dodawany jedną klatkę po wywołaniu przejścia wyjścia (w tym samym czasie, gdy `v-leave-from` jest usuwany), usuwany gdy przejście/animacja się kończy.

`v-enter-active` i `v-leave-active` dają nam możliwość określenia różnych krzywych łagodności dla przejść wejścia / wyjścia, czego przykład zobaczymy w następnych sekcjach.

### Nazwane przejścia {#named-transitions}

Przejście może zostać nazwane za pomocą właściwości `name`:

```vue-html
<Transition name="fade">
  ...
</Transition>
```

Dla nazwanego przejścia, jego klasy przejścia będą poprzedzone jego nazwą zamiast `v`. Na przykład, zastosowana klasa dla powyższego przejścia będzie `fade-enter-active` zamiast `v-enter-active`. CSS dla przejścia fade powinien wyglądać następująco:

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

### Przejścia CSS {#css-transitions}

`<Transition>` jest najczęściej używany w połączeniu z [natywnymi przejściami CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions), jak widać w podstawowym przykładzie powyżej. Właściwość CSS `transition` jest skrótem, który pozwala nam określić wiele aspektów przejścia, w tym właściwości, które powinny być animowane, czas trwania przejścia oraz [krzywe łagodności](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function).

Oto bardziej zaawansowany przykład, który pokazuje przejścia wielu właściwości, z różnymi czasami trwania i krzywymi łagodności dla wejścia i wyjścia:

```vue-html
<Transition name="slide-fade">
  <p v-if="show">witaj</p>
</Transition>
```

```css
/*
  Animacje wejścia i wyjścia mogą używać różnych
  czasów trwania i funkcji czasowych.
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

[Pełny przykład na Playground](https://play.vuejs.org/#eNqFkc9uwjAMxl/F6wXQKIVNk1AX0HbZC4zDDr2E4EK0NIkStxtDvPviFQ0OSFzyx/m+n+34kL16P+lazMpMRBW0J4hIrV9WVjfeBYIDBKzhCHVwDQySdFDZyipnY5Lu3BcsWDCk0OKosqLoKcmfLoSNN5KQbyTWLZGz8KKMVp+LKju573ivsuXKbbcG4d3oDcI9vMkNiqL3JD+AWAVpoyadGFY2yATW5nVSJj9rkspDl+v6hE/hHRrjRMEdpdfiDEkBUVxWaEWkveHj5AzO0RKGXCrSHcKBIfSPKEEaA9PJYwSUEXPX0nNlj8y6RBiUHd5AzCOodq1VvsYfjWE4G6fgEy/zMcxG17B9ZTyX8bV85C5y1S40ZX/kdj+GD1P/zVQA56XStC9h2idJI/z7huz4CxoVvE4=)

</div>
<div class="options-api">

[Pełny przykład na Playground](https://play.vuejs.org/#eNqFkc1uwjAMgF/F6wk0SmHTJNQFtF32AuOwQy+hdSFamkSJ08EQ776EbMAkJKTIf7I/O/Y+ezVm3HvMyoy52gpDi0rh1mhL0GDLvSTYVwqg4cQHw2QDWCRv1Z8H4Db6qwSyHlPkEFUQ4bHixA0OYWckJ4wesZUn0gpeainqz3mVRQzM4S7qKlss9XotEd6laBDu4Y03yIpUE+oB2NJy5QSJwFC8w0iIuXkbMkN9moUZ6HPR/uJDeINSalaYxCjOkBBgxeWEijnayWiOz+AcFaHNeU2ix7QCOiFK4FLCZPzoALnDXHt6Pq7hP0Ii7/EGYuag9itR5yv8FmgH01EIPkUxG8F0eA2bJmut7kbX+pG+6NVq28WTBTN+92PwMDHbSAXQhteCdiVMUpNwwuMassMP8kfAJQ==)

</div>

### Animacje CSS {#css-animations}

[Natywne animacje CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) są stosowane w ten sam sposób co przejścia CSS, z tą różnicą, że `*-enter-from` nie jest usuwane natychmiast po wstawieniu elementu, ale przy zdarzeniu `animationend`.

Dla większości animacji CSS możemy po prostu zadeklarować je w klasach `*-enter-active` i `*-leave-active`. Oto przykład:

```vue-html
<Transition name="bounce">
  <p v-if="show" style="text-align: center;">
    Witaj, oto tekst z efektem odbijania!
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

[Pełny przykład na Playground](https://play.vuejs.org/#eNqNksGOgjAQhl9lJNmoBwRNvCAa97YP4JFLbQZsLG3TDqzG+O47BaOezCYkpfB9/0wHbsm3c4u+w6RIyiC9cgQBqXO7yqjWWU9wA4813KH2toUpo9PKVEZaExg92V/YRmBGvsN5ZcpsTGGfN4St04Iw7qg8dkTWwF5qJc/bKnnYk7hWye5gm0ZjmY0YKwDlwQsTFCnWjGiRpaPtjETG43smHPSpqh9pVQKBrjpyrfCNMilZV8Aqd5cNEF4oFVo1pgCJhtBvnjEAP6i1hRN6BBUg2BZhKHUdvMmjWhYHE9dXY/ygzN4PasqhB75djM2mQ7FUSFI9wi0GCJ6uiHYxVsFUGcgX67CpzP0lahQ9/k/kj9CjDzgG7M94rT1PLLxhQ0D+Na4AFI9QW98WEKTQOMvnLAOwDrD+wC0Xq/Ubusw/sU+QL/45hskk9z8Bddbn)

</div>
<div class="options-api">

[Pełny przykład na Playground](https://play.vuejs.org/#eNqNUs2OwiAQfpWxySZ66I8mXioa97YP4LEXrNNKpEBg2tUY330pqOvJmBBgyPczP1yTb2OyocekTJirrTC0qRSejbYEB2x4LwmulQI4cOLTWbwDWKTeqkcE4I76twSyPcaX23j4zS+WP3V9QNgZyQnHiNi+J9IKtrUU9WldJaMMrGEynlWy2em2lcjyCPMUALazXDlBwtMU79CT9rpXNXp4tGYGhlQ0d7UqAUcXOeI6bluhUtKmhEVhzisgPFPKpWhVCTUqQrt6ygD8oJQajmgRhAOnO4RgdQm8yd0tNzGv/D8x/8Dy10IVCzn4axaTTYNZymsSA8YuciU6PrLL6IKpUFBkS7cKXXwQJfIBPyP6IQ1oHUaB7QkvjfUdcy+wIFB8PeZIYwmNtl0JruYSp8XMk+/TXL7BzbPF8gU6L95hn8D4OUJnktsfM1vavg==)

</div>

### Niestandardowe klasy przejścia {#custom-transition-classes}

Możesz również określić niestandardowe klasy przejścia, przekazując następujące właściwości do `<Transition>`:

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

Zastąpią one konwencjonalne nazwy klas. Jest to szczególnie przydatne, gdy chcesz połączyć system przejść Vue z istniejącą biblioteką animacji CSS, taką jak [Animate.css](https://daneden.github.io/animate.css/):

```vue-html
<!-- zakładając, że Animate.css jest dołączone na stronie -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
 <p v-if="show">witaj</p>
</Transition>
```

<div class="composition-api">

[Pełny przykład na Playground](https://play.vuejs.org/#eNqNUctuwjAQ/BXXF9oDsZB6ogbRL6hUcbSEjLMhpn7JXtNWiH/vhqS0R3zxPmbWM+szf02pOVXgSy6LyTYhK4A1rVWwPsWM7MwydOzCuhw9mxF0poIKJoZC0D5+stUAeMRc4UkFKcYpxKcEwSenEYYM5b4ixsA2xlnzsVJ8Yj8Mt+LrbTwcHEgxwojCmNxmHYpFG2kaoxO0B2KaWjD6uXG6FCiKj00ICHmuDdoTjD2CavJBCna7KWjZrYK61b9cB5pI93P3sQYDbxXf7aHHccpVMolO7DS33WSQjPXgXJRi2Cl1xZ8nKkjxf0dBFvx2Q7iZtq94j5jKUgjThmNpjIu17ZzO0JjohT7qL+HsvohJWWNKEc/NolncKt6Goar4y/V7rg/wyw9zrLOy)

</div>
<div class="options-api">

[Pełny przykład na Playground](https://play.vuejs.org/#eNqNUcFuwjAM/RUvp+1Ao0k7sYDYF0yaOFZCJjU0LE2ixGFMiH9f2gDbcVKU2M9+tl98Fm8hNMdMYi5U0tEEXraOTsFHho52mC3DuXUAHTI+PlUbIBLn6G4eQOr91xw4ZqrIZXzKVY6S97rFYRqCRabRY7XNzN7BSlujPxetGMvAAh7GtxXLtd/vLSlZ0woFQK0jumTY+FJt7ORwoMLUObEfZtpiSpRaUYPkmOIMNZsj1VhJRWeGMsFmczU6uCOMHd64lrCQ/s/d+uw0vWf+MPuea5Vp5DJ0gOPM7K4Ci7CerPVKhipJ/moqgJJ//8ipxN92NFdmmLbSip45pLmUunOH1Gjrc7ezGKnRfpB4wJO0ZpvkdbJGpyRfmufm+Y4Mxo1oK16n9UwNxOUHwaK3iQ==)

</div>

### Używanie przejść i animacji razem {#using-transitions-and-animations-together}

Vue musi podpiąć nasłuchiwanie zdarzeń, aby wiedzieć, kiedy przejście się zakończyło. Może to być `transitionend` lub `animationend`, w zależności od zastosowanych reguł CSS. Jeśli używasz tylko jednego z nich, Vue automatycznie wykryje odpowiedni typ.

Jednak w niektórych przypadkach możesz chcieć użyć obu na tym samym elemencie, na przykład mając animację CSS wyzwalaną przez Vue wraz z efektem przejścia CSS po najechaniu myszką. W takich przypadkach musisz jawnie zadeklarować typ, którym Vue ma się zajmować, przekazując prop `type` z wartością `animation` lub `transition`:

```vue-html
<Transition type="animation">...</Transition>
```

### Zagnieżdżone przejścia i jawne czasy trwania przejść {#nested-transitions-and-explicit-transition-durations}

Mimo że klasy przejść są stosowane tylko do bezpośredniego elementu potomnego w `<Transition>`, możemy tworzyć przejścia dla elementów zagnieżdżonych używając zagnieżdżonych selektorów CSS:

```vue-html
<Transition name="nested">
  <div v-if="show" class="outer">
    <div class="inner">
      Witaj
    </div>
  </div>
</Transition>
```

```css
/* reguły celujące w zagnieżdżone elementy */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}

/* ... pozostałe niezbędne CSS pominięto */
```

Możemy nawet dodać opóźnienie przejścia dla zagnieżdżonego elementu podczas wejścia, co tworzy rozłożoną w czasie sekwencję animacji wejścia:

```css{3}
/* opóźnienie wejścia zagnieżdżonego elementu dla efektu rozłożenia w czasie */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}
```

Jednakże, tworzy to niewielki problem. Domyślnie komponent `<Transition>` próbuje automatycznie ustalić, kiedy przejście się zakończyło, nasłuchując **pierwszego** zdarzenia `transitionend` lub `animationend` na głównym elemencie przejścia. W przypadku zagnieżdżonego przejścia, pożądanym zachowaniem powinno być oczekiwanie, aż zakończą się przejścia wszystkich wewnętrznych elementów.

W takich przypadkach możesz określić jawny czas trwania przejścia (w milisekundach) używając propa `duration` w komponencie `<transition>`. Całkowity czas trwania powinien odpowiadać sumie opóźnienia i czasu trwania przejścia elementu wewnętrznego:

```vue-html
<Transition :duration="550">...</Transition>
```

<NestedTransitions />

[Pełny przykład na Playground](https://play.vuejs.org/#eNqVVd9v0zAQ/leO8LAfrE3HNKSFbgKmSYMHQNAHkPLiOtfEm2NHttN2mvq/c7bTNi1jgFop9t13d9995ziPyfumGc5bTLJkbLkRjQOLrm2uciXqRhsHj2BwBiuYGV3DAUEPcpUrrpUlaKUXcOkBh860eJSrcRqzUDxtHNaNZA5pBzCets5pBe+4FPz+Mk+66Bf+mSdXE12WEsdphMWQiWHKCicoLCtaw/yKIs/PR3kCitVIG4XWYUEJfATFFGIO84GYdRUIyCWzlra6dWg2wA66dgqlts7c+d8tSqk34JTQ6xqb9TjdUiTDOO21TFvrHqRfDkPpExiGKvBITjdl/L40ulVFBi8R8a3P17CiEKrM4GzULIOlFmpQoSgrl8HpKFpX3kFZu2y0BNhJxznvwaJCA1TEYcC4E3MkKp1VIptjZ43E3KajDJiUMBqeWUBmcUBUqJGYOT2GAiV7gJAA9Iy4GyoBKLH2z+N0W3q/CMC2yCCkyajM63Mbc+9z9mfvZD+b071MM23qLC69+j8PvX5HQUDdMC6cL7BOTtQXCJwpas/qHhWIBdYtWGgtDWNttWTmThu701pf1W6+v1Hd8Xbz+k+VQxmv8i7Fv1HZn+g/iv2nRkjzbd6npf/Rkz49DifQ3dLZBBYOJzC4rqgCwsUbmLYlCAUVU4XsCd1NrCeRHcYXb1IJC/RX2hEYCwJTvHYVMZoavbBI09FmU+LiFSzIh0AIXy1mqZiFKaKCmVhiEVJ7GftHZTganUZ56EYLL3FykjhL195MlMM7qxXdmEGDPOG6boRE86UJVPMki+p4H01WLz4Fm78hSdBo5xXy+yfsd3bpbXny1SA1M8c82fgcMyW66L75/hmXtN44a120ktDPOL+h1bL1HCPsA42DaPdwge3HcO/TOCb2ZumQJtA15Yl65Crg84S+BdfPtL6lezY8C3GkZ7L6Bc1zNR0=)

Jeśli to konieczne, możesz również określić osobne wartości dla czasów trwania wejścia i wyjścia, używając obiektu:

```vue-html
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

### Kwestie wydajnościowe {#performance-considerations}

Możesz zauważyć, że pokazane powyżej animacje używają głównie właściwości takich jak `transform` i `opacity`. Te właściwości są wydajne w animacji, ponieważ:

1. Nie wpływają na układ dokumentu podczas animacji, więc nie wyzwalają kosztownych obliczeń układu CSS przy każdej klatce animacji.

2. Większość nowoczesnych przeglądarek może wykorzystywać sprzętową akcelerację GPU podczas animowania właściwości `transform`.

W porównaniu, właściwości takie jak `height` lub `margin` będą wyzwalać przeliczanie układu CSS, przez co są znacznie bardziej kosztowne w animacji i powinny być używane z rozwagą.

## Hooki JavaScript {#javascript-hooks}

Możesz wpięć się w proces przejścia za pomocą JavaScriptu, nasłuchując zdarzeń na komponencie `<Transition>`:

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
// wywoływane zanim element zostanie wstawiony do DOM.
// użyj tego, aby ustawić stan "enter-from" elementu
function onBeforeEnter(el) {}

// wywoływane jedną klatkę po wstawieniu elementu.
// użyj tego, aby rozpocząć animację wejścia.
function onEnter(el, done) {
  // wywołaj callback done, aby zasygnalizować koniec przejścia
  // opcjonalne, jeśli używane w połączeniu z CSS
  done()
}

// wywoływane, gdy przejście wejścia zostało zakończone.
function onAfterEnter(el) {}

// wywoływane, gdy przejście wejścia zostało anulowane przed ukończeniem.
function onEnterCancelled(el) {}

// wywoływane przed hookiem leave.
// W większości przypadków powinieneś po prostu użyć hooka leave
function onBeforeLeave(el) {}

// wywoływane, gdy rozpoczyna się przejście wyjścia.
// użyj tego, aby rozpocząć animację wyjścia.
function onLeave(el, done) {
  // wywołaj callback done, aby zasygnalizować koniec przejścia
  // opcjonalne, jeśli używane w połączeniu z CSS
  done()
}

// wywoływane, gdy przejście wyjścia zostało zakończone i
// element został usunięty z DOM.
function onAfterLeave(el) {}

// dostępne tylko przy przejściach v-show
function onLeaveCancelled(el) {}
```

</div>
<div class="options-api">

```js
export default {
  // ...
  methods: {
    // wywoływane zanim element zostanie wstawiony do DOM.
    // użyj tego, aby ustawić stan "enter-from" elementu
    onBeforeEnter(el) {},

    // wywoływane jedną klatkę po wstawieniu elementu.
    // użyj tego, aby rozpocząć animację.
    onEnter(el, done) {
      // wywołaj callback done, aby zasygnalizować koniec przejścia
      // opcjonalne, jeśli używane w połączeniu z CSS
      done()
    },

    // wywoływane, gdy przejście wejścia zostało zakończone.
    onAfterEnter(el) {},

    // wywoływane, gdy przejście wejścia zostało anulowane przed ukończeniem.
    onEnterCancelled(el) {},

    // wywoływane przed hookiem leave.
    // W większości przypadków powinieneś po prostu użyć hooka leave.
    onBeforeLeave(el) {},

    // wywoływane, gdy rozpoczyna się przejście wyjścia.
    // użyj tego, aby rozpocząć animację wyjścia.
    onLeave(el, done) {
      // wywołaj callback done, aby zasygnalizować koniec przejścia
      // opcjonalne, jeśli używane w połączeniu z CSS
      done()
    },

    // wywoływane, gdy przejście wyjścia zostało zakończone i
    // element został usunięty z DOM.
    onAfterLeave(el) {},

    // dostępne tylko przy przejściach v-show
    onLeaveCancelled(el) {}
  }
}
```

</div>

Te hooki mogą być używane w połączeniu z przejściami/animacjami CSS lub samodzielnie.

Podczas używania przejść opartych tylko na JavaScripcie, zwykle dobrym pomysłem jest dodanie propa `:css="false"`. Jawnie informuje to Vue, aby pominęło automatyczne wykrywanie przejść CSS. Poza tym, że jest to nieco bardziej wydajne, zapobiega to również przypadkowemu interferowaniu reguł CSS z przejściem:

```vue-html{3}
<Transition
  ...
  :css="false"
>
  ...
</Transition>
```

Przy `:css="false"` jesteśmy również w pełni odpowiedzialni za kontrolowanie, kiedy przejście się kończy. W tym przypadku callbacki `done` są wymagane dla hooków `@enter` i `@leave`. W przeciwnym razie hooki zostaną wywołane synchronicznie, a przejście zakończy się natychmiast.

Oto przykład wykorzystujący bibliotekę [GSAP](https://gsap.com/) do wykonywania animacji. Oczywiście możesz użyć dowolnej innej biblioteki animacji, na przykład [Anime.js](https://animejs.com/) lub [Motion One](https://motion.dev/):

<JsHooks />

<div class="composition-api">

[Pełny przykład na Playground](https://play.vuejs.org/#eNqNVMtu2zAQ/JUti8I2YD3i1GigKmnaorcCveTQArpQFCWzlkiCpBwHhv+9Sz1qKYckJ3FnlzvD2YVO5KvW4aHlJCGpZUZoB5a7Vt9lUjRaGQcnMLyEM5RGNbDA0sX/VGWpHnB/xEQmmZIWe+zUI9z6m0tnWr7ymbKVzAklQclvvFSG/5COmyWvV3DKJHTdQiRHZN0jAJbRmv9OIA432/UE+jODlKZMuKcErnx8RrazP8woR7I1FEryKaVTU8aiNdRfwWZTQtQwi1HAGF/YB4BTyxNY8JpaJ1go5K/WLTfhdg1Xq8V4SX5Xja65w0ovaCJ8Jvsnpwc+l525F2XH4ac3Cj8mcB3HbxE9qnvFMRzJ0K3APuhIjPefmTTyvWBAGvWbiDuIgeNYRh3HCCDNW+fQmHtWC7a/zciwaO/8NyN3D6qqap5GfVnXAC89GCqt8Bp77vu827+A+53AJrOFzMhQdMnO8dqPpMO74Yx4wqxFtKS1HbBOMdIX4gAMffVp71+Qq2NG4BCIcngBKk8jLOvfGF30IpBGEwcwtO6p9sdwbNXPIadsXxnVyiKB9x83+c3N9WePN9RUQgZO6QQ2sT524KMo3M5Pf4h3XFQ7NwFyZQpuAkML0doEtvEHhPvRDPRkTfq/QNDgRvy1SuIvpFOSDQmbkWTckf7hHsjIzjltkyhqpd5XIVNN5HNfGlW09eAcMp3J+R+pEn7L)

</div>
<div class="options-api">

[Pełny przykład na Playground](https://play.vuejs.org/#eNqNVFFvmzAQ/is3pimNlABNF61iaddt2tukvfRhk/xiwIAXsJF9pKmq/PedDTSwh7ZSFLjvzvd9/nz4KfjatuGhE0ES7GxmZIu3TMmm1QahtLyFwugGFu51wRQAU+Lok7koeFcjPDk058gvlv07gBHYGTVGALbSDwmg6USPnNzjtHL/jcBK5zZxxQwZavVNFNqIHwqF8RUAWs2jn4IffCfqQz+mik5lKLWi3GT1hagHRU58aAUSshpV2YzX4ncCcbjZDp099GcG6ZZnEh8TuPR8S0/oTJhQjmQryLUSU0rUU8a8M9wtoWZTQtIwi0nAGJ/ZB0BwKxJYiJpblFko1a8OLzbhdgWXy8WzP99109YCqdIJmgifyfYuzmUzfFF2HH56o/BjAldx/BbRo7pXHKMjGbrl1IcciWn9fyaNfC8YsIueR5wCFFTGUVAEsEs7pOmDu6yW2f6GBW5o4QbeuScLbu91WdZiF/VlvgEtujdcWek09tx3qZ+/tXAzQU1mA8mCoeicneO1OxKP9yM+4ElmLaEFr+2AecVEn8sDZOSrSzv/1qk+sgAOa1kMOyDlu4jK+j1GZ70E7KKJAxRafKzdazi26s8h5dm+NLpTeQLvP27S6+urz/7T5aaUao26TWATt0cPPsgcK3f6Q1wJWVY4AVJtcmHWhueyo89+G38guD+agT5YBf39s25oIv5arehu8krYkLAs8BeG86DfuANYUCG2NomiTrX7Msx0E7ncl0bnXT04566M4PQPykWaWw==)

</div>

## Przejścia wielokrotnego użytku {#reusable-transitions}

Przejścia mogą być używane wielokrotnie dzięki systemowi komponentów Vue. Aby stworzyć przejście wielokrotnego użytku, możemy utworzyć komponent, który opakowuje komponent `<Transition>` i przekazuje zawartość slotu:

```vue{5}
<!-- MyTransition.vue -->
<script>
// Logika hooków JavaScript...
</script>

<template>
 <!-- opakowuje wbudowany komponent Transition -->
  <Transition
    name="my-transition"
    @enter="onEnter"
    @leave="onLeave">
    <slot></slot> <!-- przekazuje zawartość slotu -->
  </Transition>
</template>

<style>
/*
 Niezbędny CSS...
 Uwaga: unikaj używania <style scoped> tutaj, ponieważ
 nie stosuje się on do zawartości slotu.
*/
</style>
```

Teraz `MyTransition` może być importowany i używany tak jak wersja wbudowana:

```vue-html
<MyTransition>
  <div v-if="show">Witaj</div>
</MyTransition>
```

## Przejście podczas pierwszego pojawienia się {#transition-on-appear}

Jeśli chcesz również zastosować przejście podczas początkowego renderowania węzła, możesz dodać prop `appear`:

```vue-html
<Transition appear>
  ...
</Transition>
```

## Przejście między elementami {#transition-between-elements}

Oprócz przełączania elementu za pomocą `v-if` / `v-show`, możemy także wykonywać przejścia między dwoma elementami używając `v-if` / `v-else` / `v-else-if`, pod warunkiem że upewnimy się, że w danym momencie wyświetlany jest tylko jeden element:

```vue-html
<Transition>
  <button v-if="docState === 'saved'">Edytuj</button>
  <button v-else-if="docState === 'edited'">Zapisz</button>
  <button v-else-if="docState === 'editing'">Anuluj</button>
</Transition>
```

<BetweenElements />

[Pełny przykład na Playground](https://play.vuejs.org/#eNqdk8tu2zAQRX9loI0SoLLcFN2ostEi6BekmwLa0NTYJkKRBDkSYhj+9wxJO3ZegBGu+Lhz7syQ3Bd/nJtNIxZN0QbplSMISKNbdkYNznqCPXhcwwHW3g5QsrTsTGekNYGgt/KBBCEsouimDGLCvrztTFtnGGN4QTg4zbK4ojY4YSDQTuOiKwbhN8pUXm221MDd3D11xfJeK/kIZEHupEagrbfjZssxzAgNs5nALIC2VxNILUJg1IpMxWmRUAY9U6IZ2/3zwgRFyhowYoieQaseq9ElDaTRrkYiVkyVWrPiXNdiAcequuIkPo3fMub5Sg4l9oqSevmXZ22dwR8YoQ74kdsL4Go7ZTbR74HT/KJfJlxleGrG8l4YifqNYVuf251vqOYr4llbXz4C06b75+ns1a3BPsb0KrBy14Aymnerlbby8Vc8cTajG35uzFITpu0t5ufzHQdeH6LBsezEO0eJVbB6pBiVVLPTU6jQEPpKyMj8dnmgkQs+HmQcvVTIQK1hPrv7GQAFt9eO9Bk6fZ8Ub52Qiri8eUo+4dbWD02exh79v/nBP+H2PStnwz/jelJ1geKvk/peHJ4BoRZYow==)

## Tryby przejścia {#transition-modes}

W poprzednim przykładzie elementy wchodzące i wychodzące są animowane w tym samym czasie i musieliśmy ustawić im `position: absolute`, aby uniknąć problemów z układem, gdy oba elementy są obecne w DOM.

Jednak w niektórych przypadkach nie jest to możliwe lub po prostu nie jest pożądanym zachowaniem. Możemy chcieć, aby element wychodzący został najpierw zanimowany, a element wchodzący został wstawiony dopiero **po** zakończeniu animacji wyjścia. Ręczne orkiestrowanie takich animacji byłoby bardzo skomplikowane - na szczęście możemy włączyć to zachowanie, przekazując do `<Transition>` prop `mode`:

```vue-html
<Transition mode="out-in">
  ...
</Transition>
```

Oto poprzednia demonstracja z `mode="out-in"`:

<BetweenElements mode="out-in" />

`<Transition>` obsługuje również `mode="in-out"`, chociaż jest on używany znacznie rzadziej.

## Przejście między komponentami {#transition-between-components}

`<Transition>` może być również używany wokół [komponentów dynamicznych](/guide/essentials/component-basics#dynamic-components):

```vue-html
<Transition name="fade" mode="out-in">
  <component :is="activeComponent"></component>
</Transition>
```

<BetweenComponents />

<div class="composition-api">

[Pełny przykład na Playground](https://play.vuejs.org/#eNqtksFugzAMhl/F4tJNKtDLLoxWKnuDacdcUnC3SCGJiMmEqr77EkgLbXfYYZyI8/v77dinZG9M5npMiqS0dScMgUXqzY4p0RrdEZzAfnEp9fc7HuEMx063sPIZq6viTbdmHy+yfDwF5K2guhFUUcBUnkNvcelBGrjTooHaC7VCRXBAoT6hQTRyAH2w2DlsmKq1sgS8JuEwUCfxdgF7Gqt5ZqrMp+58X/5A2BrJCcOJSskPKP0v+K8UyvQENBjcsqTjjdAsAZe2ukHpI3dm/q5wXPZBPFqxZAf7gCrzGfufDlVwqB4cPjqurCChFSjeBvGRN+iTA9afdE+pUD43FjG/bSHsb667Mr9qJot89vCBMl8+oiotDTL8ZsE39UnYpRN0fQlK5A5jEE6BSVdiAdrwWtAAm+zFAnKLr0ydA3pJDDt0x/PrMrJifgGbKdFPfCwpWU+TuWz5omzfVCNcfJJ5geL8pqtFn5E07u7fSHFOj6TzDyUDNEM=)

</div>
<div class="options-api">

[Pełny przykład na Playground](https://play.vuejs.org/#eNqtks9ugzAMxl/F4tJNamGXXVhWqewVduSSgStFCkkUDFpV9d0XJyn9t8MOkxBg5/Pvi+Mci51z5TxhURdi7LxytG2NGpz1BB92cDvYezvAqqxixNLVjaC5ETRZ0Br8jpIe93LSBMfWAHRBYQ0aGms4Jvw6Q05rFvSS5NNzEgN4pMmbcwQgO1Izsj5CalhFRLDj1RN/wis8olpaCQHh4LQk5IiEll+owy+XCGXcREAHh+9t4WWvbFvAvBlsjzpk7gx5TeqJtdG4LbawY5KoLtR/NGjYoHkw+PTSjIqUNWDkwOK97DHUMjVEdqKNMqE272E5dajV+JvpVlSLJllUF4+QENX1ERox0kHzb8m+m1CEfpOgYYgpqVHOmJNpgLQQa7BOdooO8FK+joByxLc4tlsiX6s7HtnEyvU1vKTCMO+4pWKdBnO+0FfbDk31as5HsvR+Hl9auuozk+J1/hspz+mRdPoBYtonzg==)

</div>

## Dynamiczne przejścia {#dynamic-transitions}

Właściwości `<Transition>` takie jak `name` mogą być również dynamiczne! Pozwala nam to dynamicznie zastosować różne przejścia w zależności od zmiany stanu:

```vue-html
<Transition :name="transitionName">
  <!-- ... -->
</Transition>
```

Może to być przydatne, gdy zdefiniowałeś przejścia/animacje CSS używając konwencji klas przejścia Vue i chcesz się między nimi przełączać.

Możesz również zastosować różne zachowania w hookach przejścia JavaScript w zależności od aktualnego stanu twojego komponentu. Ostatecznie, najlepszym sposobem tworzenia dynamicznych przejść jest użycie [komponentów przejścia wielokrotnego użytku](#reusable-transitions), które przyjmują props do zmiany charakteru używanych przejść. Może to brzmieć banalnie, ale jedynym ograniczeniem jest naprawdę tylko twoja wyobraźnia.

## Przejścia z atrybutem Key {#transitions-with-the-key-attribute}

Czasami musisz wymusić ponowne wyrenderowanie elementu DOM, aby przejście mogło wystąpić.

Weźmy na przykład ten komponent licznika:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue';
const count = ref(0);

setInterval(() => count.value++, 1000);
</script>

<template>
  <Transition>
    <span :key="count">{{ count }}</span>
  </Transition>
</template>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 1,
      interval: null 
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.count++;
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<template>
  <Transition>
    <span :key="count">{{ count }}</span>
  </Transition>
</template>
```

</div>

Gdybyśmy pominęli atrybut `key`, tylko węzeł tekstowy zostałby zaktualizowany i w związku z tym nie wystąpiłoby żadne przejście. Jednak z obecnym atrybutem `key`, Vue wie, że ma utworzyć nowy element `span` za każdym razem, gdy zmienia się `count`, a dzięki temu komponent `Transition` ma 2 różne elementy, między którymi może wykonać przejście.

<div class="composition-api">

[Pełny przykład na Playground](https://play.vuejs.org/#eNp9UsFu2zAM/RVCl6Zo4nhYd/GcAtvQQ3fYhq1HXTSFydTKkiDJbjLD/z5KMrKgLXoTHx/5+CiO7JNz1dAja1gbpFcuQsDYuxtuVOesjzCCxx1MsPO2gwuiXnzkhhtpTYggbW8ibBJlUV/mBJXfmYh+EHqxuITNDYzcQGFWBPZ4dUXEaQnv6jrXtOuiTJoUROycFhEpAmi3agCpRQgbzp68cA49ZyV174UJKiprckxIcMJA84hHImc9oo7jPOQ0kQ4RSvH6WXW7JiV6teszfQpDPGqEIK3DLSGpQbazsyaugvqLDVx77JIhbqp5wsxwtrRvPFI7NWDhEGtYYVrQSsgELzOiUQw4I2Vh8TRgA9YJqeIR6upDABQh9TpTAPE7WN3HlxLp084Foi3N54YN1KWEVpOMkkO2ZJHsmp3aVw/BGjqMXJE22jml0X93STRw1pReKSe0tk9fMxZ9nzwVXP5B+fgK/hAOCePsh8dAt4KcnXJR+D3S16X07a9veKD3KdnZba+J/UbyJ+Zl0IyF9rk3Wxr7jJenvcvnrcz+PtweItKuZ1Np0MScMp8zOvkvb1j/P+776jrX0UbZ9A+fYSTP)

</div>
<div class="options-api">

[Pełny przykład na Playground](https://play.vuejs.org/#eNp9U8tu2zAQ/JUFTwkSyw6aXlQ7QB85pIe2aHPUhZHWDhOKJMiVYtfwv3dJSpbbBgEMWJydndkdUXvx0bmi71CUYhlqrxzdVAa3znqCBtey0wT7ygA0kuTZeX4G8EidN+MJoLadoRKuLkdAGULfS12C6bSGDB/i3yFx2tiAzaRIjyoUYxesICDdDaczZq1uJrNETY4XFx8G5Uu4WiwW55PBA66txy8YyNvdZFNrlP4o/Jdpbq4M/5bzYxZ8IGydloR8Alg2qmcVGcKqEi9eOoe+EqnExXsvTVCkrBkQxoKTBspn3HFDmprp+32ODA4H9mLCKDD/R2E5Zz9+Ws5PpuBjoJ1GCLV12DASJdKGa2toFtRvLOHaY8vx8DrFMGdiOJvlS48sp3rMHGb1M4xRzGQdYU6REY6rxwHJGdJxwBKsk7WiHSyK9wFQhqh14gDyIVjd0f8Wa2/bUwOyWXwQLGGRWzicuChvKC4F8bpmrTbFU7CGL2zqiJm2Tmn03100DZUox5ddCam1ffmaMPJd3Cnj9SPWz6/gT2EbsUr88Bj4VmAljjWSfoP88mL59tc33PLzsdjaptPMfqP4E1MYPGOmfepMw2Of8NK0d238+JTZ3IfbLSFnPSwVB53udyX4q/38xurTuO+K6/Fqi8MffqhR/A==)

</div>

---

**Powiązane**

- [Dokumentacja API`<Transition>`](/api/built-in-components#transition)
