# Przypisywanie atrybutów {#attribute-bindings}

W Vue wąsy są używane tylko do interpolacji tekstu. Aby powiązać atrybut z wartością dynamiczną, używamy dyrektywy `v-bind`:

```vue-html
<div v-bind:id="dynamicId"></div>
```

**Dyrektywa** to specjalny atrybut zaczynający się od prefiksu `v-`. Są one częścią składni szablonów Vue. Podobnie jak interpolacje tekstowe, wartości dyrektyw są wyrażeniami JavaScript, które mają dostęp do stanu komponentu. Pełne szczegóły dotyczące `v-bind` i składni dyrektyw zostały omówione w <a target="_blank" href="/guide/essentials/template-syntax.html">Przewodnik - Składnia szablonów.</a>.

Część po dwukropku (`:id`) jest „argumentem” dyrektywy. W tym przypadku atrybut `id` elementu zostanie zsynchronizowany z właściwością `dynamicId` ze stanu komponentu.

Ponieważ `v-bind` jest używany tak często, ma dedykowaną skróconą składnię:

```vue-html
<div :id="dynamicId"></div>
```

Teraz spróbuj dodać dynamiczne wiązanie `class` do `<h1>`, używając jako wartości <span class="options-api">właściwości data</span><span class="composition-api">ref</span> `titleClass`. Jeśli powiązanie jest prawidłowe, tekst powinien zmienić kolor na czerwony.
