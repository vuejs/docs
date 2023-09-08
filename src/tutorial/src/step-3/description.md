# Bindings Degli Attributi {#attribute-bindings}

In Vue, i mustaches sono usati solo per l'interpolazione del testo. Per legare un attributo a un valore dinamico, si usa la direttiva `v-bind`:

```vue-html
<div v-bind:id="dynamicId"></div>
```

Una **direttiva** è un attributo speciale che inizia con il prefisso `v-`. Fanno parte della sintassi del template di Vue. Come per l'interpolazione del testo, i valori delle direttive sono espressioni Javascript che hanno accesso allo stato del componente. I dettagli completi di `v-bind` sono discussi in <a target="_blank" href="/guide/essentials/template-syntax.html">Guida - La Sintassi del Template</a>.

La parte dopo i due punti (`:id`) è "l'argomento" della direttiva. In questo caso, l'attributo `id` dell'elemento sarà sincronizzato con la proprietà `dynamicId` dello stato del componente.
 
Poiché `v-bind` è usato frequentemente, ha una sintassi dedicata più breve:

```vue-html
<div :id="dynamicId"></div>
```

Ora, prova ad aggiungere un `class` binding dinamico a `<h1>`, usando <span class="composition-api">il ref</span> `titleClass` come suo valore. Se il binding è corretto, il testo dovrebbe diventare rosso.
