---
outline: deep
---

# Suspense {#suspense}

:::warning Funkcja Eksperymentalna
`<Suspense>` jest funkcją eksperymentalną. Nie ma gwarancji, że osiągnie status stabilny, a API może ulec zmianie zanim to nastąpi.
:::

`<Suspense>` jest wbudowanym komponentem służącym do orkiestracji asynchronicznych zależności w drzewie komponentów. Może wyrenderować stan ładowania podczas oczekiwania na rozwiązanie wielu zagnieżdżonych asynchronicznych zależności w drzewie komponentów.

## Zależności Asynchroniczne {#async-dependencies}

Aby wyjaśnić problem, który `<Suspense>` próbuje rozwiązać i jak współdziała z tymi asynchronicznymi zależnościami, wyobraźmy sobie następującą hierarchię komponentów:

```
<Suspense>
└─ <Dashboard>
   ├─ <Profile>
   │  └─ <FriendStatus> (komponent z asynchronicznym setup())
   └─ <Content>
      ├─ <ActivityFeed> (asynchroniczny komponent)
      └─ <Stats> (asynchroniczny komponent)
```

W drzewie komponentów znajduje się wiele zagnieżdżonych komponentów, których renderowanie zależy od wcześniejszego rozwiązania zasobów asynchronicznych. Bez `<Suspense>`, każdy z nich będzie musiał obsłużyć własne stany ładowania / błędu i załadowania. W najgorszym przypadku możemy zobaczyć trzy wskaźniki ładowania na stronie, z treścią wyświetlaną w różnych momentach.

Komponent `<Suspense>` daje nam możliwość wyświetlania stanów ładowania / błędu na najwyższym poziomie, podczas gdy czekamy na rozwiązanie tych zagnieżdżonych zależności asynchronicznych.

Istnieją dwa typy zależności asynchronicznych, na które `<Suspense>` może czekać:

1. Komponenty z asynchronicznym hookiem `setup()`. Dotyczy to komponentów używających `<script setup>` z wyrażeniami `await` na najwyższym poziomie.

2. [Komponenty Asynchroniczne](/guide/components/async).

### `async setup()` {#async-setup}

Hook `setup()` komponentu Composition API może być asynchroniczny:

```js
export default {
  async setup() {
    const res = await fetch(...)
    const posts = await res.json()
    return {
      posts
    }
  }
}
```

Jeśli używasz `<script setup>`, obecność wyrażeń `await` na najwyższym poziomie automatycznie sprawia, że komponent staje się zależnością asynchroniczną:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

### Komponenty asynchroniczne {#async-components}

Komponenty asynchroniczne są domyślnie **"suspensible"** (obsługiwane przez Suspense). Oznacza to, że jeśli w łańcuchu komponentów nadrzędnych znajduje się `<Suspense>`, będą one traktowane jako zależność asynchroniczna tego `<Suspense>`. W tym przypadku stan ładowania będzie kontrolowany przez `<Suspense>`, a własne opcje komponentu dotyczące ładowania, błędów, opóźnień i limitów czasu będą ignorowane.

Komponent asynchroniczny może zrezygnować z kontroli przez `Suspense` i zawsze samodzielnie kontrolować swój stan ładowania, określając `suspensible: false` w swoich opcjach.

## Stan ładowania {#loading-state}

Komponent `<Suspense>` posiada dwa sloty: `#default` oraz `#fallback`. Oba sloty pozwalają tylko na **jeden** bezpośredni węzeł podrzędny. Węzeł w slocie domyślnym jest wyświetlany, jeśli to możliwe. Jeśli nie, zamiast niego zostanie wyświetlony węzeł ze slotu fallback.

```vue-html
<Suspense>
  <!-- komponent z zagnieżdżonymi zależnościami asynchronicznymi -->
  <Dashboard />

  <!-- stan ładowania przez slot #fallback -->
  <template #fallback>
    Ładowanie...
  </template>
</Suspense>
```

Podczas początkowego renderowania, `<Suspense>` wyrenderuje zawartość domyślnego slotu w pamięci. Jeśli podczas tego procesu zostaną napotkane jakiekolwiek zależności asynchroniczne, przejdzie w stan **oczekiwania**. W stanie oczekiwania wyświetlana będzie zawartość fallback. Gdy wszystkie napotkane zależności asynchroniczne zostaną rozwiązane, `<Suspense>` przejdzie w stan **rozwiązany** i zostanie wyświetlona rozwiązana zawartość domyślnego slotu.

Jeśli podczas początkowego renderowania nie napotkano żadnych zależności asynchronicznych, `<Suspense>` przejdzie bezpośrednio w stan rozwiązany.

Po przejściu w stan rozwiązany, `<Suspense>` powróci do stanu oczekiwania tylko wtedy, gdy główny węzeł slotu `#default` zostanie zastąpiony. Nowe zależności asynchroniczne zagnieżdżone głębiej w drzewie **nie** spowodują powrotu `<Suspense>` do stanu oczekiwania.

Gdy nastąpi powrót, zawartość fallback nie zostanie natychmiast wyświetlona. Zamiast tego, `<Suspense>` wyświetli poprzednią zawartość `#default` podczas oczekiwania na rozwiązanie nowej zawartości i jej zależności asynchronicznych. To zachowanie można skonfigurować za pomocą właściwości `timeout`: `<Suspense>` przełączy się na zawartość fallback, jeśli renderowanie nowej zawartości domyślnej zajmie dłużej niż `timeout`. Wartość `timeout` równa `0` spowoduje natychmiastowe wyświetlenie zawartości fallback po zastąpieniu zawartości domyślnej.

## Zdarzenia {#events}

Komponent `<Suspense>` emituje 3 zdarzenia: `pending`, `resolve` oraz `fallback`. Zdarzenie `pending` występuje podczas wejścia w stan oczekiwania. Zdarzenie `resolve` jest emitowane, gdy nowa zawartość zostanie rozwiązana w slocie `default`. Zdarzenie `fallback` jest wyzwalane, gdy wyświetlana jest zawartość slotu `fallback`.

Zdarzenia mogą być wykorzystane, na przykład, do wyświetlenia wskaźnika ładowania przed starym DOM-em podczas ładowania nowych komponentów.

## Obsługa Błędów {#error-handling}

`<Suspense>` obecnie nie zapewnia obsługi błędów przez sam komponent - jednak możesz użyć opcji [`errorCaptured`](/api/options-lifecycle#errorcaptured) lub hooka [`onErrorCaptured()`](/api/composition-api-lifecycle#onerrorcaptured) do przechwytywania i obsługi błędów asynchronicznych w komponencie nadrzędnym względem `<Suspense>`.

## Łączenie z Innymi Komponentami {#combining-with-other-components}

Często zachodzi potrzeba używania `<Suspense>` w połączeniu z komponentami [`<Transition>`](./transition) i [`<KeepAlive>`](./keep-alive). Kolejność zagnieżdżenia tych komponentów jest istotna dla ich prawidłowego działania.

Dodatkowo, komponenty te są często używane w połączeniu z komponentem `<RouterView>` z [Vue Router](https://router.vuejs.org/).

Poniższy przykład pokazuje, jak zagnieździć te komponenty, aby wszystkie działały zgodnie z oczekiwaniami. Dla prostszych kombinacji możesz usunąć komponenty, których nie potrzebujesz:

```vue-html
<RouterView v-slot="{ Component }">
  <template v-if="Component">
    <Transition mode="out-in">
      <KeepAlive>
        <Suspense>
          <!-- główna zawartość -->
          <component :is="Component"></component>

          <!-- stan ładowania -->
          <template #fallback>
            Ładowanie...
          </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </template>
</RouterView>
```

Vue Router posiada wbudowane wsparcie dla [leniwego ładowania komponentów](https://router.vuejs.org/guide/advanced/lazy-loading.html) przy użyciu importów dynamicznych. Są one odmienne od komponentów asynchronicznych i obecnie nie będą wyzwalać `<Suspense>`. Jednakże, mogą one posiadać komponenty asynchroniczne jako komponenty potomne, które mogą wyzwalać `<Suspense>` w standardowy sposób.

## Zagnieżdżony Suspense {#nested-suspense}

Gdy mamy wiele komponentów asynchronicznych (typowe dla zagnieżdżonych lub opartych na układzie tras) jak tutaj:

```vue-html
<Suspense>
  <component :is="DynamicAsyncOuter">
    <component :is="DynamicAsyncInner" />
  </component>
</Suspense>
```

`<Suspense>` tworzy granicę, która zgodnie z oczekiwaniami rozwiąże wszystkie komponenty asynchroniczne w dół drzewa. Jednak gdy zmieniamy `DynamicAsyncOuter`, `<Suspense>` oczekuje na niego poprawnie, ale gdy zmieniamy `DynamicAsyncInner`, zagnieżdżony `DynamicAsyncInner` renderuje pusty węzeł do czasu jego rozwiązania (zamiast poprzedniego węzła lub slotu fallback).

Aby to rozwiązać, możemy użyć zagnieżdżonego suspense do obsługi aktualizacji zagnieżdżonego komponentu, na przykład:

```vue-html
<Suspense>
  <component :is="DynamicAsyncOuter">
    <Suspense suspensible> <!-- ten -->
      <component :is="DynamicAsyncInner" />
    </Suspense>
  </component>
</Suspense>
```

Jeśli nie ustawisz właściwości `suspensible`, wewnętrzny `<Suspense>` będzie traktowany jak komponent synchroniczny przez nadrzędny `<Suspense>`. Oznacza to, że ma on własny slot fallback i jeśli oba komponenty `Dynamic` zmienią się w tym samym czasie, mogą pojawić się puste węzły i wiele cykli aktualizacji podczas gdy potomny `<Suspense>` ładuje swoje własne drzewo zależności, co może być niepożądane. Gdy właściwość jest ustawiona, cała obsługa zależności asynchronicznych jest przekazywana do nadrzędnego `<Suspense>` (włącznie z emitowanymi zdarzeniami), a wewnętrzny `<Suspense>` służy wyłącznie jako dodatkowa granica dla rozwiązywania zależności i aktualizacji.

---

**Powiązane**

- [Dokumentacja API `<Suspense>`](/api/built-in-components#suspense)
