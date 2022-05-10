# Tworzenie applikacji Vue

## Instancja aplikacji

Każda aplikacja Vue rozpoczyna się od utworzenia nowej  **instancjiaplikacji** za pomocą funkcji [`createApp`](/api/application#createapp):

```js
import { createApp } from 'vue'

const app = createApp({
  /* opcje komponentu głównego */
})
```

## Komponent główny

Obiekt, który przekazujemy do `createApp` jest w rzeczywistości komponentem. Każda aplikacja wymaga "komponentu głównego", który może zawierać inne komponenty jako swoje dzieci.

Jeśli używasz komponentów jednoplikowych, zazwyczaj importujesz komponent główny z innego pliku:

```js
import { createApp } from 'vue'
// zaimportuj główny komponent aplikacji z pojedynczego pliku komponentu.
import App from './App.vue'

const app = createApp(App)
```

Chociaż w wielu przykładach w tym podręczniku wystarczy jeden komponent, większość rzeczywistych aplikacji jest zorganizowana w drzewo zagnieżdżonych komponentów wielokrotnego użytku. Na przykład drzewo komponentów aplikacji Todo może wyglądać następująco:

```
App (root component)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```

W dalszej części podręcznika omówimy, jak definiować i komponować wiele komponentów. Zanim to nastąpi, skupimy się na tym, co dzieje się wewnątrz pojedynczego komponentu.

## Montowanie aplikacji

Instancja aplikacji nie będzie renderować niczego, dopóki nie zostanie wywołana jej metoda `.mount()`. Oczekuje ona argumentu "container", który może być albo rzeczywistym elementem DOM, albo łańcuchem elementów:

```html
<div id="app"></div>
```

```js
app.mount('#app')
```

Zawartość głównego komponentu aplikacji będzie renderowana wewnątrz elementu kontenera. Sam element kontenera nie jest uważany za część aplikacji.

Metoda `.mount()` powinna być zawsze wywoływana po wykonaniu wszystkich konfiguracji aplikacji i rejestracji zasobów. Należy również pamiętać, że jej wartością zwrotną, w przeciwieństwie do metod rejestracji zasobów, jest instancja komponentu głównego, a nie instancja aplikacji.

### Szablon komponentu głównego w DOM

Gdy używamy Vue bez kroku generowania kodu, możemy napisać szablon naszego komponentu głównego bezpośrednio w kontenerze montującym:

```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```

```js
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```

Vue automatycznie użyje `innerHTML` kontenera jako szablonu, jeśli komponent główny nie ma jeszcze opcji `template`.

## Konfiguracje aplikacji

Instancja aplikacji udostępnia obiekt `.config`, który pozwala nam skonfigurować kilka opcji na poziomie aplikacji, na przykład zdefiniować obsługę błędów na poziomie aplikacji, która przechwytuje błędy ze wszystkich komponentów potomnych:

```js
app.config.errorHandler = (err) => {
/* obsługa błędów */
}
```

Instancja aplikacji udostępnia również kilka metod służących do rejestrowania zasobów przypisanych do aplikacji. Na przykład, rejestracja komponentu:

```js
app.component('TodoDeleteButton', TodoDeleteButton)
```

Dzięki temu przycisk `TodoDeleteButton` będzie mógł być używany w dowolnym miejscu naszej aplikacji. Rejestrowanie komponentów i innych typów zasobów omówimy w dalszej części przewodnika. Możesz również przejrzeć pełną listę funkcji API instancji aplikacji w jej [referencje API](/api/application).

Upewnij się, że zastosowałeś wszystkie konfiguracje aplikacji przed jej zamontowaniem!

## Wiele instancji aplikacji

Nie jesteś ograniczony do jednej instancji aplikacji na tej samej stronie. API `createApp` pozwala wielu aplikacjom Vue współistnieć na tej samej stronie, każda z własnym zakresem konfiguracji i aktywów globalnych:

```js
const app1 = createApp({
  /* ... */
})
app1.mount('#container-1')

const app2 = createApp({
  /* ... */
})
app2.mount('#container-2')
```

Jeśli używasz Vue do wzbogacenia HTML renderowanego przez serwer i potrzebujesz Vue tylko do kontrolowania określonych części dużej strony, unikaj montowania pojedynczej instancji aplikacji Vue na całej stronie. Zamiast tego należy utworzyć wiele małych instancji aplikacji i zamontować je na elementach, za które są odpowiedzialne.
