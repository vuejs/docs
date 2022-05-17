# Lifecycle Hooks

Każda instancja komponentu Vue po utworzeniu przechodzi przez szereg kroków inicjalizacyjnych - na przykład musi ustawić obserwację danych, skompilować szablon, zamontować instancję w DOM i zaktualizować DOM, gdy dane ulegną zmianie. Po drodze uruchamia także funkcje zwane hookami cyklu życia komponentu, dając użytkownikom możliwość dodawania własnego kodu na określonych etapach.

## Rejestracja Lifecycle Hooks

Na przykład <span class="composition-api">`onMounted`</span><span class="options-api">`mounted`</span> może być być używane do uruchamiania kodu po zakończeniu przez komponent wstępnego renderowania i utworzeniu węzłów DOM:

<div class="composition-api">

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  mounted() {
    console.log(`the component is now mounted.`)
  }
}
```

</div>

Istnieją także inne hooki, które będą wywoływane na różnych etapach cyklu życia instancji, z których najczęściej używane to  <span class="composition-api">[`onMounted`](/api/composition-api-lifecycle.html#onmounted), [`onUpdated`](/api/composition-api-lifecycle.html#onupdated) i [`onUnmounted`](/api/composition-api-lifecycle.html#onunmounted).</span><span class="options-api">[`mounted`](/api/options-lifecycle.html#mounted), [`updated`](/api/options-lifecycle.html#updated) i [`unmounted`](/api/options-lifecycle.html#unmounted).</span>

<div class="options-api">

Wszystkie hooki cyklu życia są wywoływane z kontekstem `this` wskazującym na aktualnie aktywną instancję, która je wywołuje. Oznacza to, że należy unikać używania funkcji strzałek podczas deklarowania hooków cyklu życia, ponieważ nie będzie można uzyskać dostępu do instancji komponentu przez `this`, jeśli tak zrobimy.

</div>

<div class="composition-api">

Podczas wywoływania `onMounted`, Vue automatycznie kojarzy zarejestrowaną funkcję wywołania zwrotnego z bieżącą aktywną instancją komponentu. Wymaga to, aby te hooki były rejestrowane **synchronicznie** podczas konfiguracji komponentu. Na przykład, nie należy robić tego w następujący sposób:

```js
setTimeout(() => {
  onMounted(() => {
    // to nie zadziała.
  })
}, 100)
```

Zwróć uwagę, że nie oznacza to, że wywołanie musi być umieszczone we wnętrzu funkcji `setup()` lub `<script setup>`. Funkcja `onMounted()` może być wywołana w zewnętrznej funkcji tak długo jak stos wywołań jest synchroniczny i pochodzi z wnętrza `setup()`.

</div>

## Diagram cyklu życia komponentu

Poniżej znajduje się diagram cyklu życia instancji. Nie musisz teraz w pełni rozumieć wszystkiego, co się na nim dzieje, ale w miarę nauki i budowania kolejnych instancji będzie to przydatny punkt odniesienia.

![Component lifecycle diagram](./images/lifecycle.png)

<!-- https://www.figma.com/file/Xw3UeNMOralY6NV7gSjWdS/Vue-Lifecycle -->

Szczegółowe informacje na temat wszystkich hooków cyklu życia komponentu i ich przypadków użycia można znaleźć w dokumencie <span class="composition-api">[Lifecycle Hooks API reference](/api/composition-api-lifecycle.html)</span><span class="options-api">[Lifecycle Hooks API reference](/api/options-lifecycle.html)</span>.
