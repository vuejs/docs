<script setup>
import SwitchComponent from './keep-alive-demos/SwitchComponent.vue'
</script>

# KeepAlive {#keepalive}

`<KeepAlive>` jest wbudowanym komponentem, który pozwala nam warunkowo przechowywać w pamięci podręcznej instancje komponentów podczas dynamicznego przełączania między wieloma komponentami.

## Podstawowe użycie {#basic-usage}

W rozdziale Podstawy Komponentów przedstawiliśmy składnię [Komponentów Dynamicznych](/guide/essentials/component-basics#dynamic-components), używając specjalnego elementu `<component>`:

```vue-html
<component :is="activeComponent" />
```

Domyślnie, aktywna instancja komponentu zostanie odmontowana podczas przełączenia się z niego. Spowoduje to utratę wszystkich zmienionych stanów, które przechowuje. Kiedy komponent zostanie wyświetlony ponownie, zostanie utworzona nowa instancja zawierająca tylko stan początkowy.

W poniższym przykładzie mamy dwa komponenty ze stanem - A zawiera licznik, podczas gdy B zawiera wiadomość zsynchronizowaną z polem input za pomocą `v-model`. Spróbuj zaktualizować stan jednego z nich, przełącz się na inny, a następnie wróć do poprzedniego:

<SwitchComponent />

Zauważysz, że po powrocie, poprzednio zmieniony stan zostanie zresetowany.

Tworzenie nowej instancji komponentu przy przełączaniu jest zwykle przydatnym zachowaniem, ale w tym przypadku, chcielibyśmy, aby dwie instancje komponentów były zachowane nawet gdy są nieaktywne. Aby rozwiązać ten problem, możemy owinąć nasz dynamiczny komponent we wbudowany komponent `<KeepAlive>`:

```vue-html
<!-- Nieaktywne komponenty zostaną zachowane w pamięci podręcznej! -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

Teraz stan będzie zachowany podczas przełączania komponentów:

<SwitchComponent use-KeepAlive />

<div class="composition-api">

[Wypróbuj na Playground](https://play.vuejs.org/#eNqtUsFOwzAM/RWrl4IGC+cqq2h3RFw495K12YhIk6hJi1DVf8dJSllBaAJxi+2XZz8/j0lhzHboeZIl1NadMA4sd73JKyVaozsHI9hnJqV+feJHmODY6RZS/JEuiL1uTTEXtiREnnINKFeAcgZUqtbKOqj7ruPKwe6s2VVguq4UJXEynAkDx1sjmeMYAdBGDFBLZu2uShre6ioJeaxIduAyp0KZ3oF7MxwRHWsEQmC4bXXDJWbmxpjLBiZ7DwptMUFyKCiJNP/BWUbO8gvnA+emkGKIgkKqRrRWfh+Z8MIWwpySpfbxn6wJKMGV4IuSs0UlN1HVJae7bxYvBuk+2IOIq7sLnph8P9u5DJv5VfpWWLaGqTzwZTCOM/M0IaMvBMihd04ruK+lqF/8Ajxms8EFbCiJxR8khsP6ncQosLWnWV6a/kUf2nqu75Fby04chA0iPftaYryhz6NBRLjdtajpHZTWPio=)

</div>
<div class="options-api">

[Wypróbuj na Playground](https://play.vuejs.org/#eNqtU8tugzAQ/JUVl7RKWveMXFTIseofcHHAiawasPxArRD/3rVNSEhbpVUrIWB3x7PM7jAkuVL3veNJmlBTaaFsVraiUZ22sO0alcNedw2s7kmIPHS1ABQLQDEBAMqWvwVQzffMSQuDz1aI6VreWpPCEBtsJppx4wE1s+zmNoIBNLdOt8cIjzut8XAKq3A0NAIY/QNveFEyi8DA8kZJZjlGALQWPVSSGfNYJjVvujIJeaxItuMyo6JVzoJ9VxwRmtUCIdDfNV3NJWam5j7HpPOY8BEYkwxySiLLP1AWkbK4oHzmXOVS9FFOSM3jhFR4WTNfRslcO54nSwJKcCD4RsnZmJJNFPXJEl8t88quOuc39fCrHalsGyWcnJL62apYNoq12UQ8DLEFjCMy+kKA7Jy1XQtPlRTVqx+Jx6zXOJI1JbH4jejg3T+KbswBzXnFlz9Tjes/V/3CjWEHDsL/OYNvdCE8Wu3kLUQEhy+ljh+brFFu)

</div>

:::tip
Podczas używania w [szablonach w-DOM](/guide/essentials/component-basics#in-dom-template-parsing-caveats), powinien być nazywany jako `<keep-alive>`.
:::

## Include / Exclude {#include-exclude}

Domyślnie `<KeepAlive>` będzie buforować każdą instancję komponentu znajdującą się wewnątrz. Możemy dostosować to zachowanie za pomocą właściwości `include` i `exclude`. Obie właściwości mogą być ciągiem znaków rozdzielonym przecinkami, wyrażeniem regularnym `RegExp` lub tablicą zawierającą dowolny z tych typów:

```vue-html
<!-- ciąg znaków rozdzielony przecinkiem -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- wyrażenie regularne (użyte wiązanie `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- Tablica (użyte wiązanie `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

Dopasowanie jest sprawdzane względem opcji [`name`](/api/options-misc#name) komponentu, więc komponenty które mają być warunkowo buforowane przez `KeepAlive` muszą jawnie zadeklarować opcję `name`.

:::tip
Od wersji 3.2.34, komponent jednoplikowy używający `<script setup>` będzie automatycznie określać swoją opcję `name` na podstawie nazwy pliku, eliminując potrzebę ręcznego deklarowania nazwy.
:::

## Maksymalna Liczba Buforowanych Instancji {#max-cached-instances}

Możemy ograniczyć maksymalną liczbę instancji komponentów, które mogą być buforowane za pomocą właściwości `max`. Kiedy `max` jest określone, `<KeepAlive>` zachowuje się jak [pamięć podręczna LRU](<https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)>): jeśli liczba buforowanych instancji ma przekroczyć określoną maksymalną wartość, najmniej ostatnio używana buforowana instancja zostanie zniszczona, aby zrobić miejsce dla nowej.

```vue-html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

## Cykl Życia Buforowanej Instancji {#lifecycle-of-cached-instance}

Kiedy instancja komponentu jest usuwana z DOM, ale jest częścią drzewa komponentów buforowanego przez `<KeepAlive>`, przechodzi w stan **dezaktywacji** zamiast zostać odmontowana. Kiedy instancja komponentu jest wstawiana do DOM jako część buforowanego drzewa, zostaje **aktywowana**.

<div class="composition-api">

Komponent podtrzymywany przy życiu może rejestrować hooki cyklu życia dla tych dwóch stanów używając [`onActivated()`](/api/composition-api-lifecycle#onactivated) i [`onDeactivated()`](/api/composition-api-lifecycle#ondeactivated):

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // wywołane przy początkowym montowaniu
  // i za każdym razem gdy jest ponownie wstawiony z bufora
})

onDeactivated(() => {
  // wywołane gdy usunięte z DOM do bufora
  // oraz przy odmontowaniu
})
</script>
```

</div>
<div class="options-api">

Komponent podtrzymywany przy życiu może rejestrować hooki cyklu życia dla tych dwóch stanów używając hooków [`activated`](/api/options-lifecycle#activated) i [`deactivated`](/api/options-lifecycle#deactivated):

```js
export default {
  activated() {
    // wywołane przy początkowym montowaniu
    // i za każdym razem gdy jest ponownie wstawiony z bufora
  },
  deactivated() {
    // wywołane gdy usunięte z DOM do bufora
    // oraz przy odmontowaniu
  }
}
```

</div>

Należy zauważyć, że:

- <span class="composition-api">`onActivated`</span><span class="options-api">`activated`</span> jest również wywoływane przy montowaniu, a <span class="composition-api">`onDeactivated`</span><span class="options-api">`deactivated`</span> przy odmontowaniu.

- Oba hooki działają nie tylko dla głównego komponentu buforowanego przez `<KeepAlive>`, ale także dla komponentów potomnych w buforowanym drzewie.
---

**Powiązanie**

- [Dokumentacja API `<KeepAlive>`](/api/built-in-components#keepalive)
