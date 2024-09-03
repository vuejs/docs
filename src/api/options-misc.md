# Options: Misc {#options-misc}

## name {#name}

Jawnie zadeklaruj wyświetlaną nazwę dla komponentu.

- **Typ**

  ```ts
  interface ComponentOptions {
    name?: string
  }
  ```

- **Szczegóły**

  Nazwa komponentu jest używana do następujących celów:

  - Rekursywne samoodniesienie we własnym szablonie komponentu
  - Wyświetlanie w drzewie inspekcji komponentów Vue DevTools
  - Wyświetlanie w ostrzegawczych śladach komponentów

  W przypadku korzystania z komponentów jednoplikowych, komponent wywnioskuje już swoją własną nazwę z nazwy pliku. Na przykład plik o nazwie `MyComponent.vue` będzie miał wywnioskowaną nazwę wyświetlaną „MyComponent”.

  Innym przypadkiem jest to, że gdy komponent jest zarejestrowany globalnie z [`app.component`] (/api/application#app-component), globalny identyfikator jest automatycznie ustawiany jako jego nazwa.

  Opcja `name` pozwala nadpisać wywnioskowaną nazwę lub jawnie podać nazwę, gdy nie można wywnioskować żadnej nazwy (np. gdy nie są używane narzędzia kompilacji lub wbudowany komponent inny niż SFC).

  Istnieje jeden przypadek, w którym `name` jest wyraźnie wymagane: podczas dopasowywania do buforowanych komponentów w [`<KeepAlive>`](/guide/built-ins/keep-alive) poprzez jego właściwości `include / exclude`.

  :::tip
  Od wersji 3.2.34, jednoplikowy komponent używający `<script setup>` automatycznie wywnioskuje swoją opcję `name` na podstawie nazwy pliku, eliminując potrzebę ręcznego deklarowania nazwy, nawet gdy jest używana z `<KeepAlive>`.
  :::

## inheritAttrs {#inheritattrs}

Kontroluje, czy domyślne zachowanie atrybutu komponentu powinno być włączone.

- **Typ**

  ```ts
  interface ComponentOptions {
    inheritAttrs?: boolean // default: true
  }
  ```

- **Szczegóły**

  Domyślnie powiązania atrybutów zakresu nadrzędnego, które nie są rozpoznawane jako rekwizyty, będą „przechodzić”. Oznacza to, że gdy mamy komponent z jednym korzeniem, wiązania te zostaną zastosowane do elementu głównego komponentu podrzędnego jako normalne atrybuty HTML. Podczas tworzenia komponentu, który otacza element docelowy lub inny komponent, nie zawsze może to być pożądane zachowanie. Poprzez ustawienie `inheritAttrs` na `false`, to domyślne zachowanie może zostać wyłączone. Atrybuty są dostępne poprzez właściwość instancji `$attrs` i mogą być jawnie powiązane z elementem innym niż root za pomocą `v-bind`.

- **Przykład**

  <div class="options-api">

  ```vue
  <script>
  export default {
    inheritAttrs: false,
    props: ['label', 'value'],
    emits: ['input']
  }
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>
  <div class="composition-api">

  Podczas deklarowania tej opcji w komponencie, który używa `<script setup>`, można użyć makra [`defineOptions`](/api/sfc-script-setup#defineoptions):

  ```vue
  <script setup>
  defineProps(['label', 'value'])
  defineEmits(['input'])
  defineOptions({
    inheritAttrs: false
  })
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>

- **Zobacz również** [Fallthrough Attributes](/guide/components/attrs)

## components {#components}

Obiekt rejestrujący komponenty, które mają zostać udostępnione instancji komponentu.

- **Typ**

  ```ts
  interface ComponentOptions {
    components?: { [key: string]: Component }
  }
  ```

- **Przykład**

  ```js
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: {
      // skrót
      Foo,
      // rejestrowanie pod inną nazwą
      RenamedBar: Bar
    }
  }
  ```

- **Zobacz również** [Component Registration](/guide/components/registration)

## directives {#directives}

Obiekt rejestrujący dyrektywy, które mają zostać udostępnione instancji komponentu.

- **Typ**

  ```ts
  interface ComponentOptions {
    directives?: { [key: string]: Directive }
  }
  ```

- **Przykład**

  ```js
  export default {
    directives: {
      // włącza v-focus w szablonie
      focus: {
        mounted(el) {
          el.focus()
        }
      }
    }
  }
  ```

  ```vue-html
  <input v-focus>
  ```

- **Zobacz również** [Custom Directives](/guide/reusability/custom-directives)
