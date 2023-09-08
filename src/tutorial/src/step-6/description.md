# Rendering Condizionale {#conditional-rendering}

Possiamo utilizzare la direttiva `v-if` per renderizzare in modo condizionale un elemento:

```vue-html
<h1 v-if="awesome">Vue è fantastico!</h1>
```

Questo elemento `<h1>` verrà renderizzato solo se il valore di `awesome` è [vero](https://developer.mozilla.org/en-US/docs/Glossary/Truthy). Se `awesome` cambia al valore [falso](https://developer.mozilla.org/en-US/docs/Glossary/Falsy), verrà rimosso dal DOM.

Possiamo anche utilizzare `v-else` e `v-else-if` per indicare altre diramazioni della condizione:

```vue-html
<h1 v-if="awesome">Vue è fantastico!</h1>
<h1 v-else>Oh no 😢</h1>
```

Attualmente, la demo mostra entrambi gli `<h1>` contemporaneamente e il pulsante non fa nulla. Prova ad aggiungere le direttive `v-if` e `v-else` e a implementare il metodo `toggle()`, in modo da poter usare il pulsante per visualizzare o uno o l'altro.

Per ulteriori dettagli sull'uso di `v-if`: <a target="_blank" href="/guide/essentials/conditional.html">Guida - Rendering Condizionale</a>
