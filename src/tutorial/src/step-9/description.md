# Cykl życia i odnośniki do szablonów {#lifecycle-and-template-refs}

Do tej pory Vue obsługiwało za nas wszystkie aktualizacje DOM, dzięki reaktywności i deklaratywnemu renderowaniu. Jednak nieuchronnie pojawią się przypadki, w których będziemy musieli ręcznie pracować z DOM.

Możemy użyć **template ref** - tj. odniesienia do elementu w szablonie - <a target="_blank" href="/api/built-in-special-attributes.html#ref">używając specjalnego atrybutu `ref`</a>:

```vue-html
<p ref="pElementRef">hello</p>
```

<div class="composition-api">

Aby uzyskać dostęp do referencji, musimy zadeklarować<span class="html"> i udostępnić</span> referencję o pasującej nazwie:

<div class="sfc">

```js
const pElementRef = ref(null)
```

</div>
<div class="html">

```js
setup() {
  const pElementRef = ref(null)

  return {
    pElementRef
  }
}
```

</div>

Zauważ, że ref jest inicjowany wartością `null`. Dzieje się tak, ponieważ element jeszcze nie istnieje, gdy wykonywana jest funkcja <span class="sfc">`<script setup>`</span><span class="html">`setup()`</span>. Szablon ref jest dostępny dopiero po **zamontowaniu** komponentu.

Aby uruchomić kod po zamontowaniu, możemy użyć funkcji `onMounted()`:

<div class="sfc">

```js
import { onMounted } from 'vue'

onMounted(() => {
  // komponent jest już zamontowany.
})
```

</div>
<div class="html">

```js
import { onMounted } from 'vue'

createApp({
  setup() {
    onMounted(() => {
      // komponent jest już zamontowany.
    })
  }
})
```

</div>
</div>

<div class="options-api">

Element będzie widoczny w `this.$refs` jako `this.$refs.pElementRef`. Jednak dostęp do niego można uzyskać dopiero po **zamontowaniu** komponentu.

Aby uruchomić kod po zamontowaniu, możemy użyć opcji `mounted`:

<div class="sfc">

```js
export default {
  mounted() {
    // komponent jest już zamontowany.
  }
}
```

</div>
<div class="html">

```js
createApp({
  mounted() {
    // komponent jest już zamontowany.
  }
})
```

</div>
</div>

Nazywa się to **lifecycle hook** - pozwala nam zarejestrować wywołanie zwrotne, które będzie wywoływane w określonych momentach cyklu życia komponentu. Istnieją inne hook'i, takie jak  <span class="options-api">`created` i `updated`</span><span class="composition-api">`onUpdated` i `onUnmounted`</span>. Sprawdź <a target="_blank" href="/guide/essentials/lifecycle.html#lifecycle-diagram">diagram cyklu życia komponentu</a> aby uzyskać więcej informacji.

Teraz spróbuj dodać <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span> hook, następnie odwołaj się do `<p>` poprzez użycie <span class="options-api">`this.$refs.pElementRef`</span><span class="composition-api">`pElementRef.value`</span> i wykonaj na nim kilka bezpośrednich operacji DOM (np. zmieniając jego `textContent`).
