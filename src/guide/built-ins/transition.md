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

Vue offre due componenti integrati che possono aiutare a lavorare con le transizioni e le animazioni in risposta a cambiamenti di stato:

- `<Transition>` per applicare animazioni quando un elemento, o un componente, sta entrando o uscendo dal DOM. Questo è l' argomento trattato in questa pagina.

- `<TransitionGroup>` per applicare animazioni quando un elemento, o un componente, viene inserito, rimosso o spostato all'interno di un elenco `v-for`. Questo argomento è trattato nel [prossimo capitolo](/guide/built-ins/transition-group).

Oltre a questi due componenti, possiamo anche applicare animazioni in Vue utilizzando altre tecniche, come l'alternanza di classi CSS (toggling) o le animazioni guidate dallo stato tramite binding degli stili. Queste tecniche aggiuntive sono trattate nel capitolo [Tecniche di Animazione](/guide/extras/animation).

## Il Componente `<Transition>` {#the-transition-component}

`<Transition>` è un componente integrato: ciò significa che è disponibile nel template di qualsiasi componente senza doverlo registrare. Può essere utilizzato per applicare animazioni di entrata e uscita su elementi, o componenti, passati attraverso il suo slot predefinito. L'entrata o l'uscita possono essere innescate da uno dei seguenti casi:

- Rendering condizionale tramite `v-if`
- Visualizzazione condizionale tramite `v-show`
- Toggling di componenti dinamici tramite l'elemento speciale `<component>`
- Modificando l'attributo speciale `key`

Questo è un esempio dell'utilizzo più basilare:

```vue-html
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">ciao</p>
</Transition>
```

```css
/* spiegheremo cosa fanno queste classi in seguito!*/
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

[Prova nel Playground](https://play.vuejs.org/#eNpVkEFuwyAQRa8yZZNWqu1sunFJ1N4hSzYUjRNUDAjGVJHluxcCipIV/OG/pxEr+/a+TwuykfGogvYEEWnxR2H17F0gWCHgBBtMwc2wy9WdsMIqZ2OuXtwfHErhlcKCb8LyoVoynwPh7I0kzAmA/yxEzsKXMlr9HgRr9Es5BTue3PlskA+1VpFTkDZq0i3niYfU6anRmbqgMY4PZeH8OjwBfHhYIMdIV1OuferQEoZOKtIJ328TgzJhm8BabHR3jeC8VJqusO8/IqCM+CnsVqR3V/mfRxO5amnkCPuK5B+6rcG2fydshks=)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNpVkMFuAiEQhl9lyqlNuouXXrZo2nfwuBeKs0qKQGBAjfHdZZfVrAmB+f/M/2WGK/v1vs0JWcdEVEF72vQWz94Fgh0OMhmCa28BdpLk+0etAQJSCvahAOLBnTqgkLA6t/EpVzmCP7lFEB69kYRFAYi/ROQs/Cij1f+6ZyMG1vA2vj3bbN1+b1Dw2lYj2yBt1KRnXRwPudHDnC6pAxrjBPe1n78EBF8MUGSkixnLNjdoCUMjFemMn5NjUGacnboqPVkdOC+Vpgus2q8IKCN+T+suWENwxyWJXKXMyQ5WNVJ+aBqD3e6VSYoi)

</div>

:::tip
`<Transition>` supporta solo un singolo elemento, o componente, come contenuto del suo slot. Se il contenuto è un componente, anche il componente deve avere un solo elemento radice.
:::

Quando un elemento in un componente `<Transition>` viene inserito o rimosso, ecco cosa succede:

1. Vue rileverà automaticamente se l'elemento target ha transizioni o animazioni CSS applicate. Se si, un numero di [classi di transizione CSS](#transition-classes) saranno aggiunte/rimosse nei momenti appropriati.

2. Se ci sono listener per gli [hook JavaScript](#javascript-hooks), questi hook verranno chiamati nei momenti appropriati.

3. Se non vengono rilevate transizioni/animazioni CSS e non vengono forniti hook JavaScript, le operazioni DOM per l'inserimento e/o la rimozione verranno eseguite nel prossimo frame di animazione del browser.

## Transizioni basate su CSS {#css-based-transitions}

### Classi di Transizione {#transition-classes}

Ci sono sei classi applicate per le transizioni di entrata / uscita.

![Diagramma Transizioni](./images/transition-classes.png)

<!-- https://www.figma.com/file/rlOv0ZKJFFNA9hYmzdZv3S/Transition-Classes -->

1. `v-enter-from`: Stato iniziale per l'entrata. Aggiunta prima che l'elemento venga inserito, rimossa un frame dopo che l'elemento è inserito.

2. `v-enter-active`: Stato attivo per l'entrata. Applicata durante l'intera fase di entrata. Aggiunto prima che l'elemento venga inserito, rimosso quando la transizione/animazione finisce. Questa classe può essere utilizzata per definire la durata, il ritardo e la curva di easing per la transizione di entrata.

3. `v-enter-to`: Stato finale per l'entrata. Viene aggiunta un frame dopo che l'elemento è inserito (nello stesso istante in cui `v-enter-from` viene rimosso), rimossa quando la transizione/animazione finisce.

4. `v-leave-from`: Stato iniziale per l'uscita. Aggiunta immediatamente quando viene innescata una transizione di uscita, rimossa dopo un frame.

5. `v-leave-active`: Stato attivo per l'uscita. Applicata durante l'intera fase di uscita. Aggiunta immediatamente quando inizia una transizione di uscita, rimossa quando la transizione/animazione finisce. Questa classe può essere utilizzata per definire la durata, il ritardo e la curva di easing per la transizione di uscita.

6. `v-leave-to`: Stato finale per l'uscita. Aggiunta un frame dopo che viene innescata una transizione di uscita (nello stesso istante in cui `v-leave-from` viene rimossa), rimossa quando la transizione/animazione finisce.

`v-enter-active` e `v-leave-active` ci danno la possibilità di specificare curve di easing diverse per le transizioni di entrata / uscita, come vedremo in un esempio nelle sezioni seguenti.

### Named Transitions {#named-transitions}

Si può assegnare un nome ad una transizione tramite la prop `name`:

```vue-html
<Transition name="fade">
  ...
</Transition>
```

In una transizione con nome (named transition), le classi di transizione verranno prefissate con il suo nome invece di `v`. Ad esempio, la classe applicata per la transizione sopra sarà `fade-enter-active` invece di `v-enter-active`. Il CSS per la transizione fade dovrebbe apparire così:

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

### Transizioni CSS {#css-transitions}

`<Transition>` è comunemente usata in combinazione con [transizioni CSS native](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions), come visto nell'esempio base sopra. La proprietà CSS `transition` è una scorciatoia che ci permette di specificare molti aspetti di una transizione, incluse le proprietà che dovrebbero essere animate, la durata della transizione e le [curve di easing](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function).

Ecco un esempio più avanzato che usa le transizioni per molteplici proprietà, con diverse durate e curve di easing per l'entrata e l'uscita:

```vue-html
<Transition name="slide-fade">
  <p v-if="show">ciao</p>
</Transition>
```

```css
/*
  Le animazioni di entrata e uscita possono utilizzare
  durate e funzioni di tempistica diverse.
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

[Prova nel Playground](https://play.vuejs.org/#eNqFkc9uwjAMxl/F6wXQKIVNk1AX0HbZC4zDDr2E4EK0NIkStxtDvPviFQ0OSFzyx/m+n+34kL16P+lazMpMRBW0J4hIrV9WVjfeBYIDBKzhCHVwDQySdFDZyipnY5Lu3BcsWDCk0OKosqLoKcmfLoSNN5KQbyTWLZGz8KKMVp+LKju573ivsuXKbbcG4d3oDcI9vMkNiqL3JD+AWAVpoyadGFY2yATW5nVSJj9rkspDl+v6hE/hHRrjRMEdpdfiDEkBUVxWaEWkveHj5AzO0RKGXCrSHcKBIfSPKEEaA9PJYwSUEXPX0nNlj8y6RBiUHd5AzCOodq1VvsYfjWE4G6fgEy/zMcxG17B9ZTyX8bV85C5y1S40ZX/kdj+GD1P/zVQA56XStC9h2idJI/z7huz4CxoVvE4=)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNqFkc1uwjAMgF/F6wk0SmHTJNQFtF32AuOwQy+hdSFamkSJ08EQ776EbMAkJKTIf7I/O/Y+ezVm3HvMyoy52gpDi0rh1mhL0GDLvSTYVwqg4cQHw2QDWCRv1Z8H4Db6qwSyHlPkEFUQ4bHixA0OYWckJ4wesZUn0gpeainqz3mVRQzM4S7qKlss9XotEd6laBDu4Y03yIpUE+oB2NJy5QSJwFC8w0iIuXkbMkN9moUZ6HPR/uJDeINSalaYxCjOkBBgxeWEijnayWiOz+AcFaHNeU2ix7QCOiFK4FLCZPzoALnDXHt6Pq7hP0Ii7/EGYuag9itR5yv8FmgH01EIPkUxG8F0eA2bJmut7kbX+pG+6NVq28WTBTN+92PwMDHbSAXQhteCdiVMUpNwwuMassMP8kfAJQ==)

</div>

### Animazioni CSS {#css-animations}

Le [Animazioni CSS native](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) sono applicate nello stesso modo delle transizioni CSS, con la differenza che `*-enter-from` non viene rimosso immediatamente dopo che l'elemento è inserito, ma con un evento `animationend`.

La maggior parte delle animazioni CSS può dichiarata semplicemente sotto le classi `*-enter-active` e `*-leave-active`. Ecco un esempio:

```vue-html
<Transition name="bounce">
  <p v-if="show" style="text-align: center;">
    Ciao, ecco del testo che rimbalza!
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

[Prova nel Playground](https://play.vuejs.org/#eNqNksGOgjAQhl9lJNmoBwRNvCAa97YP4JFLbQZsLG3TDqzG+O47BaOezCYkpfB9/0wHbsm3c4u+w6RIyiC9cgQBqXO7yqjWWU9wA4813KH2toUpo9PKVEZaExg92V/YRmBGvsN5ZcpsTGGfN4St04Iw7qg8dkTWwF5qJc/bKnnYk7hWye5gm0ZjmY0YKwDlwQsTFCnWjGiRpaPtjETG43smHPSpqh9pVQKBrjpyrfCNMilZV8Aqd5cNEF4oFVo1pgCJhtBvnjEAP6i1hRN6BBUg2BZhKHUdvMmjWhYHE9dXY/ygzN4PasqhB75djM2mQ7FUSFI9wi0GCJ6uiHYxVsFUGcgX67CpzP0lahQ9/k/kj9CjDzgG7M94rT1PLLxhQ0D+Na4AFI9QW98WEKTQOMvnLAOwDrD+wC0Xq/Ubusw/sU+QL/45hskk9z8Bddbn)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNqNUs2OwiAQfpWxySZ66I8mXioa97YP4LEXrNNKpEBg2tUY330pqOvJmBBgyPczP1yTb2OyocekTJirrTC0qRSejbYEB2x4LwmulQI4cOLTWbwDWKTeqkcE4I76twSyPcaX23j4zS+WP3V9QNgZyQnHiNi+J9IKtrUU9WldJaMMrGEynlWy2em2lcjyCPMUALazXDlBwtMU79CT9rpXNXp4tGYGhlQ0d7UqAUcXOeI6bluhUtKmhEVhzisgPFPKpWhVCTUqQrt6ygD8oJQajmgRhAOnO4RgdQm8yd0tNzGv/D8x/8Dy10IVCzn4axaTTYNZymsSA8YuciU6PrLL6IKpUFBkS7cKXXwQJfIBPyP6IQ1oHUaB7QkvjfUdcy+wIFB8PeZIYwmNtl0JruYSp8XMk+/TXL7BzbPF8gU6L95hn8D4OUJnktsfM1vavg==)

</div>

### Classi di Transizione Personalizzate {#custom-transition-classes}

Si possono specificare anche classi di transizione personalizzate passando le seguenti prop a `<Transition>`:

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

Queste sovrascriveranno i nomi delle classi convenzionali. Ciò è particolarmente utile quando si desidera combinare il sistema di transizione di Vue con una libreria di animazioni CSS esistente, come [Animate.css](https://daneden.github.io/animate.css/):

```vue-html
<!-- supponendo che Animate.css sia incluso nella pagina -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">ciao</p>
</Transition>
```

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNqNUctuwjAQ/BXXF9oDsZB6ogbRL6hUcbSEjLMhpn7JXtNWiH/vhqS0R3zxPmbWM+szf02pOVXgSy6LyTYhK4A1rVWwPsWM7MwydOzCuhw9mxF0poIKJoZC0D5+stUAeMRc4UkFKcYpxKcEwSenEYYM5b4ixsA2xlnzsVJ8Yj8Mt+LrbTwcHEgxwojCmNxmHYpFG2kaoxO0B2KaWjD6uXG6FCiKj00ICHmuDdoTjD2CavJBCna7KWjZrYK61b9cB5pI93P3sQYDbxXf7aHHccpVMolO7DS33WSQjPXgXJRi2Cl1xZ8nKkjxf0dBFvx2Q7iZtq94j5jKUgjThmNpjIu17ZzO0JjohT7qL+HsvohJWWNKEc/NolncKt6Goar4y/V7rg/wyw9zrLOy)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNqNUcFuwjAM/RUvp+1Ao0k7sYDYF0yaOFZCJjU0LE2ixGFMiH9f2gDbcVKU2M9+tl98Fm8hNMdMYi5U0tEEXraOTsFHho52mC3DuXUAHTI+PlUbIBLn6G4eQOr91xw4ZqrIZXzKVY6S97rFYRqCRabRY7XNzN7BSlujPxetGMvAAh7GtxXLtd/vLSlZ0woFQK0jumTY+FJt7ORwoMLUObEfZtpiSpRaUYPkmOIMNZsj1VhJRWeGMsFmczU6uCOMHd64lrCQ/s/d+uw0vWf+MPuea5Vp5DJ0gOPM7K4Ci7CerPVKhipJ/moqgJJ//8ipxN92NFdmmLbSip45pLmUunOH1Gjrc7ezGKnRfpB4wJO0ZpvkdbJGpyRfmufm+Y4Mxo1oK16n9UwNxOUHwaK3iQ==)

</div>

### Utilizzare Transizioni e Animazioni Insieme {#using-transitions-and-animations-together}

Vue ha bisogno di aggiungere un listener di eventi per sapere quando una transizione è terminata. Può essere o `transitionend` o `animationend`, a seconda del tipo di regole CSS applicate. Se stai usando solo uno o l'altro, Vue può rilevare automaticamente il tipo corretto.

Tuttavia, in alcuni casi potresti voler usare entrambi sullo stesso elemento, ad esempio avendo un'animazione CSS innescata da Vue, insieme a un effetto di transizione CSS al passaggio del mouse. In questi casi, dovrai dichiarare esplicitamente il tipo di cui vuoi che Vue si occupi passando la prop `type`, con un valore di `animation` o `transition`:

```vue-html
<Transition type="animation">...</Transition>
```

### Transizioni Annidate e Durata Esplicita della Transizione {#nested-transitions-and-explicit-transition-durations}

Sebbene le classi di transizione vengano applicate solo al diretto elemento figlio in `<Transition>`, possiamo applicare transizioni agli elementi annidati utilizzando i selettori CSS annidati:

```vue-html
<Transition name="nested">
  <div v-if="show" class="outer">
    <div class="inner">
      Ciao
    </div>
  </div>
</Transition>
```

```css
/* regole che si riferiscono agli elementi annidati */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}

/* ... altro CSS necessario omesso */
```

Possiamo anche aggiungere un ritardo di transizione all'elemento annidato durante l'ingresso, che crea una sequenza di animazione di ingresso sfalsata (staggered):

```css{3}
/* ritarda l'ingresso dell'elemento annidato per ottenere un effetto sfalsato - staggered effect */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}
```

Tuttavia, ciò crea un piccolo problema. Di default, il componente `<Transition>` cerca di capire automaticamente quando la transizione è finita, ascoltando il **primo** evento `transitionend` o `animationend` sull'elemento di transizione radice. Con una transizione annidata, il comportamento desiderato dovrebbe aspettare fino a quando le transizioni di tutti gli elementi interni sono terminate.

In questi casi puoi specificare una durata di transizione esplicita (in millisecondi) utilizzando la prop `duration` sul componente `<transition>`. La durata totale dovrebbe corrispondere al ritardo più la durata della transizione dell'elemento interno:

```vue-html
<Transition :duration="550">...</Transition>
```

<NestedTransitions />

[Prova nel Playground](https://play.vuejs.org/#eNqVVMtu2zAQ/JWtekjiRo80cIGoStCil3yADy2gC02tJCIUKZCUncDwv3cpyrbstmgLGxC53J2ZnaW0i772fbIZMMqjwnIjegcW3dA/lUp0vTYOdmCwhj3URndwRalXpSoV18pSaqu38OgTrp0Z8KZURRpQqJ42DrteMoe0AyjWg3NawRcuBX95LKOp+p1/ltHTSjeNxCINaaFkZZiywgkqqwbD/IIKl8usjECxDmmj0DqsqN4XUEklNrCJRT0RUCKXzFra6sGhOSZOqYdDodTpsHT+94xS6mNyStkHjuO6SE8KKVCks45pa92b9MtkpL6FZGSBHR26NeMvjdGDqnJ4j4ifPV7PqkqoJof7rH8dI51QcYuiaV0Od1mI7v0BoU5otAQ4g+Ocz9KCQzEq0hAz7sQGScoUlcg2OEWDMHfsKAcmJWTJvQVkFmOSQo0E5HQBFUr2BiMA6Jq0G6IAlNj55yI9UV+SAJxI4hEmJ5qPSxuwLzX7q3d7ieb0DKnWpsvD0rv/49r7dzMaqHvGhfMEB3CSvkXgTFF7Vs+kQCA4tGBhsDSMQ9RSmDtt7Flrc1en+f4i9ex0mtd/ujzSeJfPJf5NyuVE/9HsPzVCnp9wf2/995n16WK8ge6Z7iaw8XICg28tMSA8fIL10IBQ0DJVyZnR08RmFtkkvHirVligv9KOkrGiZKrXriVFa6O3Fmk62hwpHj7Als4QKMOzBZSWWVgjKqjFK1YjtLdxflWSLLsL9tAHbXyJo/1PJETL1g==)

Se necessario, puoi anche specificare valori separati per le durate di ingresso e uscita utilizzando un oggetto:

```vue-html
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

### Considerazioni sulle Prestazioni {#performance-considerations}

Potresti notare che le animazioni mostrate sopra utilizzano principalmente proprietà come `transform` e `opacity`. Queste proprietà sono efficienti da animare perché:

1. Non influenzano l'impaginazione del documento durante l'animazione, quindi non innescano costosi calcoli del layout CSS per ogni fotogramma dell'animazione.

2. La maggior parte dei browser moderni può sfruttare l'accelerazione hardware della GPU quando anima `transform`.

In confronto, proprietà come `height` o `margin` innescano calcoli sul layout CSS, quindi sono molto più costose da animare e dovrebbero essere utilizzate con cautela. Possiamo consultare risorse come [CSS-Triggers](https://csstriggers.com/) per vedere quali proprietà innescano questi calcoli se animate.

## Hook JavaScript {#javascript-hooks}

Puoi collegarti al processo di transizione con JavaScript ascoltando gli eventi sul componente `<Transition>`:

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
// chiamato prima che l'elemento venga inserito nel DOM.
// usa questo per impostare lo stato "enter-from" dell'elemento
function onBeforeEnter(el) {}

// chiamato un frame dopo che l'elemento è stato inserito.
// usa questo per avviare l'animazione di ingresso.
function onEnter(el, done) {
  // chiama la callback done per indicare la fine della transizione
  // facoltativo se utilizzato in combinazione con CSS
  done()
}

// chiamato quando la transizione di ingresso è terminata.
function onAfterEnter(el) {}

// chiamato quando la transizione di ingresso viene annullata prima del completamento.
function onEnterCancelled(el) {}

// chiamato prima dell'hook di uscita.
//  Nella maggior parte delle volte, dovresti semplicemente usare l'hook di uscita
function onBeforeLeave(el) {}

// chiamato quando inizia la transizione di uscita.
// usa questo per avviare l'animazione di uscita.
function onLeave(el, done) {
  // chiama la callback done per indicare la fine della transizione
  // facoltativo se utilizzato in combinazione con CSS
  done()
}

// chiamato quando la transizione di uscita è terminata e l'elemento
// è stato rimosso dal DOM.
function onAfterLeave(el) {}

// disponibile solo con le transizioni v-show
function onLeaveCancelled(el) {}
```

</div>
<div class="options-api">

```js
export default {
  // ...
  methods: {
    // chiamato prima che l'elemento venga inserito nel DOM.
    // usa questo per impostare lo stato "enter-from" dell'elemento
    onBeforeEnter(el) {},

    // chiamato un frame dopo che l'elemento è stato inserito.
    // use this to start the animation.
    onEnter(el, done) {
      // chiama la callback done per indicare la fine della transizione
      // facoltativo se utilizzato in combinazione con CSS
      done()
    },

    // chiamato quando la transizione di ingresso è terminata.
    onAfterEnter(el) {},
    onEnterCancelled(el) {},

    // called before the leave hook.
    //  Nella maggior parte delle volte, dovresti semplicemente usare l'hook di uscita.
    onBeforeLeave(el) {},

    // chiamato quando inizia la transizione di uscita.
    // usa questo per avviare l'animazione di uscita.
    onLeave(el, done) {
      // chiama la callback done per indicare la fine della transizione
      // facoltativo se utilizzato in combinazione con CSS
      done()
    },

    // chiamato quando la transizione di uscita è terminata e l'elemento
    // è stato rimosso dal DOM.
    onAfterLeave(el) {},

    // disponibile solo con le transizioni v-show
    onLeaveCancelled(el) {}
  }
}
```

</div>

Questi hook possono essere utilizzati in combinazione con le transizioni/animazioni CSS, o da soli.

Quando si utilizzano transizioni solo JavaScript, è solitamente una buona idea aggiungere la prop `:css="false"`. Questo dice esplicitamente a Vue di saltare il rilevamento automatico delle transizioni CSS. Oltre ad essere leggermente più performante, ciò impedisce anche che le regole CSS interferiscano accidentalmente con la transizione:

```vue-html{3}
<Transition
  ...
  :css="false"
>
  ...
</Transition>
```

Con `:css="false"`, siamo pienamente responsabili anche del controllo di quando termina la transizione. In questo caso le callback `done` sono richieste per gli hook `@enter` e `@leave`. Altrimenti, gli hook verranno chiamati in modo sincrono e la transizione terminerà immediatamente.

Ecco una demo che utilizza la [libreria GreenSock](https://greensock.com/) per eseguire le animazioni. Puoi utilizzare, ovviamente, qualsiasi altra libreria di animazione desideri, ad esempio [Anime.js](https://animejs.com/) o [Motion One](https://motion.dev/).

<JsHooks />

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNqNVMtu2zAQ/JUti8I2YD3i1GigKmnaorcCveTQArpQFCWzlkiCpBwHhv+9Sz1qKYckJ3FnlzvD2YVO5KvW4aHlJCGpZUZoB5a7Vt9lUjRaGQcnMLyEM5RGNbDA0sX/VGWpHnB/xEQmmZIWe+zUI9z6m0tnWr7ymbKVzAklQclvvFSG/5COmyWvV3DKJHTdQiRHZN0jAJbRmv9OIA432/UE+jODlKZMuKcErnx8RrazP8woR7I1FEryKaVTU8aiNdRfwWZTQtQwi1HAGF/YB4BTyxNY8JpaJ1go5K/WLTfhdg1Xq8V4SX5Xja65w0ovaCJ8Jvsnpwc+l525F2XH4ac3Cj8mcB3HbxE9qnvFMRzJ0K3APuhIjPefmTTyvWBAGvWbiDuIgeNYRh3HCCDNW+fQmHtWC7a/zciwaO/8NyN3D6qqap5GfVnXAC89GCqt8Bp77vu827+A+53AJrOFzMhQdMnO8dqPpMO74Yx4wqxFtKS1HbBOMdIX4gAMffVp71+Qq2NG4BCIcngBKk8jLOvfGF30IpBGEwcwtO6p9sdwbNXPIadsXxnVyiKB9x83+c3N9WePN9RUQgZO6QQ2sT524KMo3M5Pf4h3XFQ7NwFyZQpuAkML0doEtvEHhPvRDPRkTfq/QNDgRvy1SuIvpFOSDQmbkWTckf7hHsjIzjltkyhqpd5XIVNN5HNfGlW09eAcMp3J+R+pEn7L)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNqNVFFvmzAQ/is3pimNlABNF61iaddt2tukvfRhk/xiwIAXsJF9pKmq/PedDTSwh7ZSFLjvzvd9/nz4KfjatuGhE0ES7GxmZIu3TMmm1QahtLyFwugGFu51wRQAU+Lok7koeFcjPDk058gvlv07gBHYGTVGALbSDwmg6USPnNzjtHL/jcBK5zZxxQwZavVNFNqIHwqF8RUAWs2jn4IffCfqQz+mik5lKLWi3GT1hagHRU58aAUSshpV2YzX4ncCcbjZDp099GcG6ZZnEh8TuPR8S0/oTJhQjmQryLUSU0rUU8a8M9wtoWZTQtIwi0nAGJ/ZB0BwKxJYiJpblFko1a8OLzbhdgWXy8WzP99109YCqdIJmgifyfYuzmUzfFF2HH56o/BjAldx/BbRo7pXHKMjGbrl1IcciWn9fyaNfC8YsIueR5wCFFTGUVAEsEs7pOmDu6yW2f6GBW5o4QbeuScLbu91WdZiF/VlvgEtujdcWek09tx3qZ+/tXAzQU1mA8mCoeicneO1OxKP9yM+4ElmLaEFr+2AecVEn8sDZOSrSzv/1qk+sgAOa1kMOyDlu4jK+j1GZ70E7KKJAxRafKzdazi26s8h5dm+NLpTeQLvP27S6+urz/7T5aaUao26TWATt0cPPsgcK3f6Q1wJWVY4AVJtcmHWhueyo89+G38guD+agT5YBf39s25oIv5arehu8krYkLAs8BeG86DfuANYUCG2NomiTrX7Msx0E7ncl0bnXT04566M4PQPykWaWw==)

</div>

## Transizioni Riutilizzabili {#reusable-transitions}

Le transizioni possono essere riutilizzate attraverso il sistema dei componenti di Vue. Per creare una transizione riutilizzabile, possiamo creare un componente che racchiude il componente `<Transition>` e passa il contenuto dello slot:

```vue{5}
<!-- MyTransition.vue -->
<script>
// Logica degli hook JavaScript...
</script>

<template>
  <!-- racchiude il componente Transition nativo -->
  <Transition
    name="my-transition"
    @enter="onEnter"
    @leave="onLeave">
    <slot></slot> <!-- passa il contenuto dello slot -->
  </Transition>
</template>

<style>
/*
  CSS necessario...
  Nota: evita di utilizzare <style scoped> qui, poiché
  non si applica al contenuto dello slot.
*/
</style>
```

Ora `MyTransition` può essere importato e utilizzato proprio come la versione nativa:

```vue-html
<MyTransition>
  <div v-if="show">Ciao</div>
</MyTransition>
```

## Transizione all'Appear {#transition-on-appear}

Se vuoi anche applicare una transizione al rendering iniziale di un nodo, puoi aggiungere la prop `appear`:

```vue-html
<Transition appear>
  ...
</Transition>
```

## Transizione tra Elementi {#transition-between-elements}

Oltre a fare un toggle per un elemento con `v-if` / `v-show`, possiamo fare anche una transizione tra due elementi utilizzando `v-if` / `v-else` / `v-else-if`, purché siamo sicuri che ci sia solo un elemento mostrato in un dato momento:

```vue-html
<Transition>
  <button v-if="docState === 'saved'">Modifica</button>
  <button v-else-if="docState === 'edited'">Salva</button>
  <button v-else-if="docState === 'editing'">Cancella</button>
</Transition>
```

<BetweenElements />

[Prova nel Playground](https://play.vuejs.org/#eNqdk8tu2zAQRX9loI0SoLLcFN2ostEi6BekmwLa0NTYJkKRBDkSYhj+9wxJO3ZegBGu+Lhz7syQ3Bd/nJtNIxZN0QbplSMISKNbdkYNznqCPXhcwwHW3g5QsrTsTGekNYGgt/KBBCEsouimDGLCvrztTFtnGGN4QTg4zbK4ojY4YSDQTuOiKwbhN8pUXm221MDd3D11xfJeK/kIZEHupEagrbfjZssxzAgNs5nALIC2VxNILUJg1IpMxWmRUAY9U6IZ2/3zwgRFyhowYoieQaseq9ElDaTRrkYiVkyVWrPiXNdiAcequuIkPo3fMub5Sg4l9oqSevmXZ22dwR8YoQ74kdsL4Go7ZTbR74HT/KJfJlxleGrG8l4YifqNYVuf251vqOYr4llbXz4C06b75+ns1a3BPsb0KrBy14Aymnerlbby8Vc8cTajG35uzFITpu0t5ufzHQdeH6LBsezEO0eJVbB6pBiVVLPTU6jQEPpKyMj8dnmgkQs+HmQcvVTIQK1hPrv7GQAFt9eO9Bk6fZ8Ub52Qiri8eUo+4dbWD02exh79v/nBP+H2PStnwz/jelJ1geKvk/peHJ4BoRZYow==)

## Modalità di Transizione {#transition-modes}

Nell'esempio precedente gli elementi che entrano ed escono vengono animati contemporaneamente, e abbiamo dovuto renderli con `position: absolute` per evitare il problema con il layout quando entrambi gli elementi sono presenti nel DOM.

Tuttavia, in alcuni casi questo non è possibile, o semplicemente non è il comportamento desiderato. Potremmo volere che l'elemento in uscita venga animato prima e che l'elemento in entrata venga inserito solo **dopo** che l'animazione di uscita sia terminata. Coordinare questo tipo di animazioni manualmente sarebbe molto complicato - fortunatamente, possiamo abilitare questo comportamento passando a `<Transition>` una prop `mode`:

```vue-html
<Transition mode="out-in">
  ...
</Transition>
```

Ecco la demo precedente con `mode="out-in"`:

<BetweenElements mode="out-in" />

`<Transition>` supporta anche `mode="in-out"`, anche se è molto meno utilizzata.

## Transizione tra Componenti {#transition-between-components}

`<Transition>`  può essere utilizzato anche con i [componenti dinamici](/guide/essentials/component-basics#dynamic-components), racchiudendoli:

```vue-html
<Transition name="fade" mode="out-in">
  <component :is="activeComponent"></component>
</Transition>
```

<BetweenComponents />

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNqtksFugzAMhl/F4tJNKtDLLoxWKnuDacdcUnC3SCGJiMmEqr77EkgLbXfYYZyI8/v77dinZG9M5npMiqS0dScMgUXqzY4p0RrdEZzAfnEp9fc7HuEMx063sPIZq6viTbdmHy+yfDwF5K2guhFUUcBUnkNvcelBGrjTooHaC7VCRXBAoT6hQTRyAH2w2DlsmKq1sgS8JuEwUCfxdgF7Gqt5ZqrMp+58X/5A2BrJCcOJSskPKP0v+K8UyvQENBjcsqTjjdAsAZe2ukHpI3dm/q5wXPZBPFqxZAf7gCrzGfufDlVwqB4cPjqurCChFSjeBvGRN+iTA9afdE+pUD43FjG/bSHsb667Mr9qJot89vCBMl8+oiotDTL8ZsE39UnYpRN0fQlK5A5jEE6BSVdiAdrwWtAAm+zFAnKLr0ydA3pJDDt0x/PrMrJifgGbKdFPfCwpWU+TuWz5omzfVCNcfJJ5geL8pqtFn5E07u7fSHFOj6TzDyUDNEM=)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNqtks9ugzAMxl/F4tJNamGXXVhWqewVduSSgStFCkkUDFpV9d0XJyn9t8MOkxBg5/Pvi+Mci51z5TxhURdi7LxytG2NGpz1BB92cDvYezvAqqxixNLVjaC5ETRZ0Br8jpIe93LSBMfWAHRBYQ0aGms4Jvw6Q05rFvSS5NNzEgN4pMmbcwQgO1Izsj5CalhFRLDj1RN/wis8olpaCQHh4LQk5IiEll+owy+XCGXcREAHh+9t4WWvbFvAvBlsjzpk7gx5TeqJtdG4LbawY5KoLtR/NGjYoHkw+PTSjIqUNWDkwOK97DHUMjVEdqKNMqE272E5dajV+JvpVlSLJllUF4+QENX1ERox0kHzb8m+m1CEfpOgYYgpqVHOmJNpgLQQa7BOdooO8FK+joByxLc4tlsiX6s7HtnEyvU1vKTCMO+4pWKdBnO+0FfbDk31as5HsvR+Hl9auuozk+J1/hspz+mRdPoBYtonzg==)

</div>

## Transizioni Dinamiche {#dynamic-transitions}

Le prop di `<Transition>` come `name` possono essere anche dinamiche! Ciò ci permette di applicare dinamicamente diverse transizioni in base al cambiamento dello stato:

```vue-html
<Transition :name="transitionName">
  <!-- ... -->
</Transition>
```

Questo può essere utile quando hai definito transizioni / animazioni CSS utilizzando le convenzioni di classe di transizione di Vue e vuoi passare da una all'altra.

Puoi anche applicare un comportamento diverso negli hook di transizione in JavaScript in base allo stato attuale del tuo componente. Infine, il modo definitivo per creare transizioni dinamiche è attraverso [componenti di transizione riutilizzabili](#reusable-transitions) che accettano prop per cambiare la natura delle transizioni da utilizzare. Potrebbe sembrare banale, ma l'unico limite è davvero la tua immaginazione.

---

**Correlati**

- [Referenza API `<Transition>`](/api/built-in-components#transition)
