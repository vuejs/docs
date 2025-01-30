# Teleport {#teleport}

 <VueSchoolLink href="https://vueschool.io/lessons/vue-3-teleport" title="Darmowa lekcja Vue.js o Teleport"/>

`<Teleport>` jest wbudowanym komponentem, który pozwala nam "teleportować" część szablonu komponentu do węzła DOM, który istnieje poza hierarchią DOM tego komponentu.

## Podstawowe użycie {#basic-usage}

Czasami możemy napotkać następujący scenariusz: część szablonu komponentu logicznie do niego należy, ale z wizualnego punktu widzenia powinna być wyświetlana gdzie indziej w strukturze DOM, poza aplikacją Vue.

Najczęstszym przykładem tego jest budowanie modalu pełnoekranowego. Idealnie byłoby, gdyby przycisk modalu i sam modal znajdowały się w tym samym komponencie, ponieważ oba są powiązane ze stanem otwarcia/zamknięcia modalu. Oznacza to jednak, że modal będzie renderowany obok przycisku, głęboko zagnieżdżony w hierarchii DOM aplikacji. Może to powodować trudności przy pozycjonowaniu modalu za pomocą CSS.

Rozważmy następującą strukturę HTML.

```vue-html
<div class="outer">
  <h3>Przykład użycia Vue Teleport</h3>
  <div>
    <MyModal />
  </div>
</div>
```

A tutaj jest implementacja `<MyModal>`:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true">Otwórz modal</button>

  <div v-if="open" class="modal">
    <p>Witaj z poziomu modalu!</p>
    <button @click="open = false">Zamknij</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      open: false
    }
  }
}
</script>

<template>
  <button @click="open = true">Otwórz modal</button>

  <div v-if="open" class="modal">
    <p>Witaj z poziomu modalu!</p>
    <button @click="open = false">Zamknij</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

</div>

Komponent zawiera `<button>` do wyzwalania otwarcia modalu oraz `<div>` z klasą `.modal`, który będzie zawierał treść modalu i przycisk do samodzielnego zamknięcia.

Podczas używania tego komponentu w początkowej strukturze HTML, pojawia się kilka potencjalnych problemów:

- `position: fixed` umieszcza element względem okna przeglądarki tylko wtedy, gdy żaden z elementów nadrzędnych nie ma ustawionej właściwości `transform`, `perspective` lub `filter`. Jeśli na przykład zamierzamy animować nadrzędny `<div class="outer">` za pomocą transformacji CSS, zaburzy to układ modalu!

- `z-index` modalu jest ograniczony przez jego elementy nadrzędne. Jeśli istnieje inny element, który nachodzi na `<div class="outer">` i ma wyższy `z-index`, przykryje on nasz modal.

`<Teleport>` zapewnia przejrzyste rozwiązanie tych problemów, pozwalając nam wyrwać się z zagnieżdżonej struktury DOM. Zmodyfikujmy `<MyModal>`, aby używał `<Teleport>`:

```vue-html{3,8}
<button @click="open = true">Otwórz modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Witaj z poziomu modalu!</p>
    <button @click="open = false">Zamknij</button>
  </div>
</Teleport>
```

Właściwość `to` w `<Teleport>` przyjmuje selektor CSS w formie ciągu znaków lub bezpośrednio węzeł DOM. W tym przypadku mówimy Vue, aby "**teleportował** ten fragment szablonu **do** znacznika **`body`**".

Możesz kliknąć przycisk poniżej i sprawdzić znacznik `<body>` za pomocą narzędzi deweloperskich swojej przeglądarki:

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<div class="demo">
  <button @click="open = true">Otwórz modal</button>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="open" class="demo modal-demo">
        <p style="margin-bottom:20px">Witaj z poziomu modalu!</p>
        <button @click="open = false">Zamknij</button>
      </div>
    </Teleport>
  </ClientOnly>
</div>

<style>
.modal-demo {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background-color: var(--vt-c-bg);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
</style>

Możesz połączyć `<Teleport>` z [`<Transition>`](./transition), aby stworzyć animowane modale - zobacz [przykład tutaj](/examples/#modal).

:::tip
Element docelowy `to` teleportu musi już istnieć w DOM w momencie, gdy komponent `<Teleport>` jest montowany. Idealnie byłoby, gdyby był to element znajdujący się poza całą aplikacją Vue. Jeśli elementem docelowym jest inny element renderowany przez Vue, musisz upewnić się, że ten element zostanie zamontowany przed `<Teleport>`.
:::

## Używanie z komponentami {#using-with-components}

`<Teleport>` zmienia tylko strukturę wyrenderowanego DOM - nie wpływa na logiczną hierarchię komponentów. Oznacza to, że jeśli `<Teleport>` zawiera komponent, ten komponent pozostanie logicznym elementem podrzędnym komponentu nadrzędnego zawierającego `<Teleport>`. Przekazywanie propsów i emitowanie zdarzeń będzie działać tak samo jak wcześniej.

Oznacza to również, że wstrzykiwanie (injection) z komponentu nadrzędnego działa zgodnie z oczekiwaniami, a komponent potomny będzie zagnieżdżony pod komponentem nadrzędnym w Vue Devtools, zamiast być umieszczonym w miejscu, do którego została przeniesiona właściwa zawartość.

## Wyłączanie Teleport {#disabling-teleport}

W niektórych przypadkach możemy chcieć warunkowo wyłączyć `<Teleport>`. Na przykład, możemy chcieć renderować komponent jako nakładkę (overlay) na komputerach stacjonarnych, ale w linii na urządzeniach mobilnych. `<Teleport>` obsługuje właściwość `disabled`, którą można dynamicznie przełączać:

```vue-html
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

Stan `isMobile` może być dynamicznie aktualizowany poprzez wykrywanie zmian w media queries.

## Wiele Teleportów do tego samego celu {#multiple-teleports-on-the-same-target}

Częstym przypadkiem użycia byłby wielokrotnego użytku komponent `<Modal>`, z możliwością aktywacji wielu instancji w tym samym czasie. W tego typu scenariuszu, wiele komponentów `<Teleport>` może montować swoją zawartość do tego samego elementu docelowego. Kolejność będzie prostym dołączaniem – później zamontowane elementy zostaną umieszczone za wcześniej zamontowanymi w elemencie docelowym.

Biorąc pod uwagę następujące zastosowanie::

```vue-html
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>
```

Wyrenderowany rezultat będzie następujący:

```html
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

---

**Powiązane**

- [Dokumentacja API `<Teleport>`](/api/built-in-components#teleport)
- [Obsługa Teleportów w SSR](/guide/scaling-up/ssr#teleports)
