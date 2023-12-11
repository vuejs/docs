# Template Syntax {#template-syntax}

Vue verwendet eine HTML-basierte Template-Syntax, die es Ihnen ermöglicht, das gerenderte DOM deklarativ an die Daten der zugrunde liegenden Komponenteninstanz zu binden. Alle Vue-Templates sind syntaktisch gültiges HTML, das von Spec-kompatiblen Browsern und HTML-Parsern geparst werden kann.

Unter der Haube kompiliert Vue die Vorlagen in hochoptimierten JavaScript-Code. In Kombination mit dem Reaktivitätssystem kann Vue auf intelligente Weise die minimale Anzahl von Komponenten ermitteln, die neu gerendert werden müssen, und die minimale Menge an DOM-Manipulationen anwenden, wenn sich der Zustand der App ändert.

Wenn Sie mit den Konzepten des virtuellen DOM vertraut sind und die rohe Kraft von JavaScript bevorzugen, können Sie anstelle von Vorlagen auch [direkt Renderfunktionen](/guide/extras/render-function.html) schreiben, mit optionaler JSX-Unterstützung. Beachten Sie jedoch, dass diese Funktionen nicht das gleiche Maß an Kompilierzeit-Optimierung genießen wie Vorlagen.

## Text Interpolation {#text-interpolation}

Die einfachste Form der Datenbindung ist die Textinterpolation unter Verwendung der "Mustache"-Syntax (doppelte geschweifte Klammern):

```vue-html
<span>Message: {{ msg }}</span>
```

Der Mustache-Tag wird durch den Wert der Eigenschaft `msg` der entsprechenden Komponenteninstanz ersetzt. Es wird auch aktualisiert, wenn sich die Eigenschaft "msg" ändert.

## Raw HTML {#raw-html}

Die doppelten Schnurrbärte interpretieren die Daten als reinen Text, nicht als HTML. Um echtes HTML auszugeben, müssen Sie die Richtlinie [`v-html`](/api/built-in-directives.html#v-html) verwenden:

```vue-html
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

<script setup>
  const rawHtml = '<span style="color: red">This should be red.</span>'
</script>

<div class="demo">
  <p>Verwendung der Textinterpolation: {{ rawHtml }}</p>
  <p>Using v-html directive: <span v-html="rawHtml"></span></p>
</div>

Hier stoßen wir auf etwas Neues. Das `v-html` Attribut, das Sie sehen, wird **Direktive** genannt. Direktiven werden mit dem Präfix "v-" versehen, um anzuzeigen, dass es sich um spezielle Attribute handelt, die von Vue bereitgestellt werden, und wie Sie vielleicht schon erraten haben, wenden sie ein spezielles reaktives Verhalten auf das gerenderte DOM an. Hier sagen wir im Grunde "halte das innere HTML dieses Elements mit der Eigenschaft `rawHtml` der aktuellen aktiven Instanz auf dem neuesten Stand".

Der Inhalt des `span` wird durch den Wert der `rawHtml`-Eigenschaft ersetzt, interpretiert als einfaches HTML - Datenbindungen werden ignoriert. Beachten Sie, dass Sie `v-html` nicht verwenden können, um Template-Teilbereiche zu komponieren, da Vue keine String-basierte Template-Engine ist. Stattdessen werden Komponenten als grundlegende Einheit für die Wiederverwendung und Komposition der Benutzeroberfläche bevorzugt.

:::warning Sicherheitswarnung
Das dynamische Rendern von beliebigem HTML auf Ihrer Website kann sehr gefährlich sein, da es leicht zu [XSS-Schwachstellen](https://en.wikipedia.org/wiki/Cross-site_scripting) führen kann. Verwenden Sie `v-html` nur für vertrauenswürdige Inhalte und **niemals** für vom Benutzer bereitgestellte Inhalte.
:::

## Attribut Bindungen {#attribute-bindings}

Schnurrbärte können nicht innerhalb von HTML-Attributen verwendet werden. Verwenden Sie stattdessen ein [`v-bind`](/api/built-in-directives.html#v-bind):

```vue-html
<div v-bind:id="dynamicId"></div>
```

Die `v-bind` Direktive weist Vue an, das `id` Attribut des Elements mit der `dynamicId` Eigenschaft der Komponente synchron zu halten. Wenn der gebundene Wert `null` oder `undefined` ist, dann wird das Attribut aus dem gerenderten Element entfernt.

### Kurzschrift {#shorthand}

Weil `v-bind` so häufig verwendet wird, hat es eine eigene Kurzsyntax:

```vue-html
<div :id="dynamicId"></div>
```

Attribute, die mit `:` beginnen, sehen vielleicht etwas anders aus als normales HTML, aber es ist in der Tat ein gültiges Zeichen für Attributnamen und alle von Vue unterstützten Browser können es korrekt parsen. Darüber hinaus erscheinen sie nicht im endgültigen gerenderten Markup. Die Shorthand-Syntax ist optional, aber Sie werden sie wahrscheinlich zu schätzen wissen, wenn Sie später mehr über ihre Verwendung erfahren.

> Für den Rest des Leitfadens werden wir die Shorthand-Syntax in Code-Beispielen verwenden, da dies die häufigste Verwendung für Vue-Entwickler ist.

### Boolesche Attribute {#boolean-attributes}

[Boolesche Attribute](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes) sind Attribute, die durch ihr Vorhandensein in einem Element wahre oder falsche Werte anzeigen können. Zum Beispiel ist [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) eines der am häufigsten verwendeten booleschen Attribute.

`v-bind` funktioniert in diesem Fall ein wenig anders:

```vue-html
<button :disabled="isButtonDisabled">Button</button>
```

Das Attribut `disabled` wird einbezogen, wenn `isButtonDisabled` einen [wahrheitsgemäßen Wert](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) hat. Es wird auch eingeschlossen, wenn der Wert ein leerer String ist, um die Konsistenz mit `<button disabled="">` zu wahren. Für andere [falsche Werte](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) wird das Attribut weggelassen.

### Dynamic binding of multiple attributes {#dynamically-binding-multiple-attributes}

Wenn Sie ein JavaScript-Objekt haben, das mehrere Attribute repräsentiert und wie folgt aussieht:

<div class="composition-api">

```js
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper'
    }
  }
}
```

</div>

Sie können sie an ein einzelnes Element binden, indem Sie `v-bind` ohne ein Argument verwenden:

```vue-html
<div v-bind="objectOfAttrs"></div>
```

## JavaScript-Ausdrücke verwenden {#using-javascript-expressions}

Bisher haben wir in unseren Templates nur an einfache Property Keys gebunden. Aber Vue unterstützt die volle Leistung von JavaScript-Ausdrücken innerhalb aller Datenbindungen:

```vue-html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

Diese Ausdrücke werden als JavaScript im Datenbereich der aktuellen Komponenteninstanz ausgewertet.

In Vue-Templates können JavaScript-Ausdrücke an den folgenden Stellen verwendet werden:

- Innerhalb von Textinterpolationen (Schnurrbart)
- Im Attributwert beliebiger Vue-Direktiven (spezielle Attribute, die mit `v-` beginnen)

### Nur Ausdrücke {#expressions-only}

Jede Bindung kann nur **einen einzigen Ausdruck** enthalten. Ein Ausdruck ist ein Teil des Codes, der zu einem Wert ausgewertet werden kann. Eine einfache Prüfung ist, ob er nach `return` verwendet werden kann.

Daher wird das Folgende **NICHT** funktionieren:

```vue-html
<!-- this is a statement, not an expression: -->
{{ var a = 1 }}

<!-- flow control won't work either, use ternary expressions -->
{{ if (ok) { return message } }}
```

### Aufrufen von Funktionen {#calling-functions}

Es ist möglich, innerhalb eines Bindungsausdrucks eine Methode aufzurufen, die einer Komponente zugeordnet ist:

```vue-html
<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

:::tip
Funktionen, die innerhalb von Bindungsausdrücken aufgerufen werden, werden jedes Mal aufgerufen, wenn die Komponente aktualisiert wird, daher sollten sie **keine** Nebeneffekte haben, wie z. B. das Ändern von Daten oder das Auslösen von asynchronen Operationen.
:::

### Eingeschränkter globaler Zugriff {#restricted-globals-access}

Schablonenausdrücke sind in einer Sandbox untergebracht und haben nur Zugriff auf eine [eingeschränkte Liste von Globals](https://github.com/vuejs/core/blob/main/packages/shared/src/globalsWhitelist.ts#L3). Die Liste enthält häufig verwendete eingebaute Globals wie `Math` und `Date`.

Globals, die nicht explizit in der Liste enthalten sind, z.B. vom Benutzer angehängte Eigenschaften von `window`, sind in Template-Ausdrücken nicht zugänglich. Sie können jedoch explizit zusätzliche Globals für alle Vue-Ausdrücke definieren, indem Sie sie zu [`app.config.globalProperties`](/api/application.html#app-config-globalproperties) hinzufügen.

## Direktiven {#directives}

Direktiven sind spezielle Attribute mit dem Präfix `v-`. Vue bietet eine Reihe von [eingebauten Direktiven](/api/built-in-directives.html), einschließlich `v-html` und `v-bind`, die wir oben eingeführt haben.

Es wird erwartet, dass die Werte von Direktiven-Attributen einzelne JavaScript-Ausdrücke sind (mit Ausnahme von `v-for`, `v-on` und `v-slot`, die in den jeweiligen Abschnitten später behandelt werden). Die Aufgabe einer Direktive ist es, reaktiv Aktualisierungen auf das DOM anzuwenden, wenn sich der Wert ihres Ausdrucks ändert. Nehmen Sie [`v-if`](/api/built-in-directives.html#v-if) als Beispiel:

```vue-html
<p v-if="seen">Now you see me</p>
```

Hier würde die `v-if`-Direktive das Element `p` entfernen oder einfügen, je nachdem, ob der Wert des Ausdrucks `gesehen` wahr ist.

### Argumente {#arguments}

Einige Direktiven können ein "Argument" enthalten, das durch einen Doppelpunkt nach dem Direktivennamen gekennzeichnet ist. Die Direktive "v-bind" wird zum Beispiel zur reaktiven Aktualisierung eines HTML-Attributs verwendet:

```vue-html
<a v-bind:href="url"> ... </a>

<!-- shorthand -->
<a :href="url"> ... </a>
```

Hier ist `href` das Argument, das der Richtlinie `v-bind` sagt, dass das Attribut `href` des Elements an den Wert des Ausdrucks `url` gebunden werden soll. In der Kurzschrift wird alles vor dem Argument (d.h. `v-bind:`) zu einem einzigen Zeichen zusammengefasst, `:`.

Ein weiteres Beispiel ist die Richtlinie "v-on", die auf DOM-Ereignisse reagiert:

```vue-html
<a v-on:click="doSomething"> ... </a>

<!-- shorthand -->
<a @click="doSomething"> ... </a>
```

Hier ist das Argument der Name des Ereignisses, auf das man hören soll: `Klick`. Für "v-on" gibt es ein entsprechendes Kürzel, nämlich das Zeichen "@". Wir werden auch über die Ereignisbehandlung im Detail sprechen.

### Dynamische Argumente {#dynamic-arguments}

Es ist auch möglich, einen JavaScript-Ausdruck in einem Richtlinienargument zu verwenden, indem man ihn mit eckigen Klammern umschließt:

```vue-html
<!--
Note that there are some constraints to the argument expression,
as explained in the "Dynamic Argument Value Constraints" and "Dynamic Argument Syntax Constraints" sections below.
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- shorthand -->
<a :[attributeName]="url"> ... </a>
```

Hier wird `Attributname` dynamisch als JavaScript-Ausdruck ausgewertet, und sein ausgewerteter Wert wird als endgültiger Wert für das Argument verwendet. Wenn Ihre Komponenteninstanz beispielsweise eine Dateneigenschaft, `Attributname`, hat, deren Wert `href` ist, dann entspricht diese Bindung `v-bind:href`.

In ähnlicher Weise können Sie dynamische Argumente verwenden, um einen Handler an einen dynamischen Ereignisnamen zu binden:

```vue-html
<a v-on:[eventName]="doSomething"> ... </a>

<!-- shorthand -->
<a @[eventName]="doSomething">
```

Wenn in diesem Beispiel der Wert von "eventName" "focus" ist, entspricht "v-on:[eventName]" dem Wert von "v-on:focus".

#### Dynamische Argumentwertbeschränkungen {#dynamic-argument-value-constraints}

Von dynamischen Argumenten wird erwartet, dass sie als Zeichenkette ausgewertet werden, mit Ausnahme von `null`. Der spezielle Wert "null" kann verwendet werden, um die Bindung explizit zu entfernen. Jeder andere Wert, der keine Zeichenkette ist, löst eine Warnung aus.

#### Dynamische Argument-Syntax-Beschränkungen {#dynamic-argument-syntax-constraints}

Dynamische Argumentausdrücke unterliegen einigen syntaktischen Einschränkungen, da bestimmte Zeichen, wie Leerzeichen und Anführungszeichen, innerhalb von HTML-Attributnamen ungültig sind. Zum Beispiel ist das Folgende ungültig:

```vue-html
<!-- This will trigger a compiler warning. -->
<a :['foo' + bar]="value"> ... </a>
```

Wenn Sie ein komplexes dynamisches Argument übergeben müssen, ist es wahrscheinlich besser, eine [berechnete Eigenschaft](./berechnet.html) zu verwenden, die wir in Kürze behandeln werden.

Bei der Verwendung von In-DOM-Templates (Templates, die direkt in eine HTML-Datei geschrieben werden) sollten Sie außerdem vermeiden, Schlüssel mit Großbuchstaben zu benennen, da die Browser Attributnamen in Kleinbuchstaben umwandeln:

```vue-html
<a :[someAttr]="value"> ... </a>
```

Die obigen Angaben werden in den In-DOM-Vorlagen in `:[someattr]` umgewandelt. Wenn Ihre Komponente eine `someAttr`-Eigenschaft anstelle von `someattr` hat, wird Ihr Code nicht funktionieren. Templates innerhalb von Single-File Components unterliegen **nicht** dieser Einschränkung.

### Modifikatoren {#modifiers}

Modifikatoren sind spezielle Postfixe, die mit einem Punkt gekennzeichnet sind und anzeigen, dass eine Direktive auf besondere Weise gebunden werden soll. Zum Beispiel weist der Modifikator `.prevent` die Direktive `v-on` an, `event.preventDefault()` für das ausgelöste Ereignis aufzurufen:

```vue-html
<form @submit.prevent="onSubmit">...</form>
```

Sie werden später weitere Beispiele für Modifikatoren sehen, [für `v-on`](./event-handling.html#event-modifiers) und [für `v-model`](./forms.html#modifiers), wenn wir diese Funktionen untersuchen.

Und schließlich ist hier die vollständige Syntax der Richtlinie visualisiert:

![directive syntax graph](./images/directive.png)

<!-- https://www.figma.com/file/BGWUknIrtY9HOmbmad0vFr/Directive -->
