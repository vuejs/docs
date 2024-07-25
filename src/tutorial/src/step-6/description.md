# Renderowanie warunkowe {#conditional-rendering}

Możemy użyć dyrektywy `v-if` do warunkowego renderowania elementu:

```vue-html
<h1 v-if="awesome">Vue is awesome!</h1>
```

`<h1>` będzie renderowane tylko jeśli wartość `awesome` to [truthy].(https://developer.mozilla.org/en-US/docs/Glossary/Truthy). Jeśli `awesome` zmieni się na wartość [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy), zostanie usunięty z drzewa DOM.

Możemy również użyć `v-else` i `v-else-if` do oznaczenia innych części warunku:

```vue-html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

Obecnie demo pokazuje oba `<h1>` w tym samym czasie, a przycisk nic nie robi. Spróbuj dodać do nich dyrektywy `v-if` i `v-else` i zaimplementuj metodę `toggle()`, abyśmy mogli używać przycisku do przełączania się między nimi.

Więcej szczegółów na temat `v-if`: <a target="_blank" href="/guide/essentials/conditional.html">Przewonik - Renderowanie warunkowe</a>
